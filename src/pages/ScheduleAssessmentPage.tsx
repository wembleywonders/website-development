import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import './ScheduleAssessmentPage.css';

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  assessor: string;
  type: 'online' | 'in_person';
}

interface SchedulingState {
  selectedDate: string;
  selectedTimeSlot: TimeSlot | null;
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    accommodationNeeds: string;
    preferredFormat: 'online' | 'in_person' | 'either';
  };
  step: 'selection' | 'details' | 'confirmation';
  isSubmitting: boolean;
}

const ScheduleAssessmentPage: React.FC = () => {
  const [schedulingState, setSchedulingState] = useState<SchedulingState>({
    selectedDate: '',
    selectedTimeSlot: null,
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      accommodationNeeds: '',
      preferredFormat: 'either'
    },
    step: 'selection',
    isSubmitting: false
  });

  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  // Generate mock available time slots
  useEffect(() => {
    const generateTimeSlots = () => {
      const slots: TimeSlot[] = [];
      const assessors = ['Dr. Sarah Johnson', 'Marcus Chen', 'Priya Williams', 'James Thompson'];
      const times = ['09:00', '10:30', '14:00', '15:30', '17:00'];
      
      // Generate slots for the next 14 days
      for (let i = 1; i <= 14; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        
        // Skip weekends for now
        if (date.getDay() === 0 || date.getDay() === 6) continue;
        
        times.forEach((time, timeIndex) => {
          // Randomly make some slots unavailable
          const available = Math.random() > 0.3;
          
          slots.push({
            id: `${date.toISOString().split('T')[0]}-${time}`,
            date: date.toISOString().split('T')[0],
            time,
            available,
            assessor: assessors[Math.floor(Math.random() * assessors.length)],
            type: Math.random() > 0.5 ? 'online' : 'in_person'
          });
        });
      }
      
      setAvailableSlots(slots);
    };

    generateTimeSlots();
  }, []);

  const getAvailableDates = () => {
    const dates = [...new Set(availableSlots
      .filter(slot => slot.available)
      .map(slot => slot.date))]
      .sort();
    return dates;
  };

  const getSlotsForDate = (date: string) => {
    return availableSlots
      .filter(slot => slot.date === date && slot.available)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const handleDateChange = (date: string) => {
    setSchedulingState(prev => ({
      ...prev,
      selectedDate: date,
      selectedTimeSlot: null
    }));
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSchedulingState(prev => ({
      ...prev,
      selectedTimeSlot: slot
    }));
  };

  const handlePersonalDetailsChange = (field: keyof SchedulingState['personalDetails'], value: string) => {
    setSchedulingState(prev => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [field]: value
      }
    }));
  };

  const proceedToDetails = () => {
    if (schedulingState.selectedTimeSlot) {
      setSchedulingState(prev => ({
        ...prev,
        step: 'details'
      }));
    }
  };

  const proceedToConfirmation = () => {
    if (validatePersonalDetails()) {
      setSchedulingState(prev => ({
        ...prev,
        step: 'confirmation'
      }));
    }
  };

  const validatePersonalDetails = () => {
    const { firstName, lastName, email, phone } = schedulingState.personalDetails;
    return firstName.trim() && lastName.trim() && email.trim() && phone.trim();
  };

  const handleSubmitBooking = async () => {
    setSchedulingState(prev => ({ ...prev, isSubmitting: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save booking data
    const booking = {
      id: Date.now().toString(),
      ...schedulingState.selectedTimeSlot,
      ...schedulingState.personalDetails,
      bookedAt: new Date().toISOString(),
      status: 'confirmed'
    };
    
    const savedBookings = JSON.parse(localStorage.getItem('assessmentBookings') || '[]');
    savedBookings.push(booking);
    localStorage.setItem('assessmentBookings', JSON.stringify(savedBookings));
    
    setSchedulingState(prev => ({ ...prev, isSubmitting: false }));
    
    // In a real app, would navigate to confirmation page
    alert('Assessment scheduled successfully! You will receive a confirmation email shortly.');
  };

  const goBack = () => {
    if (schedulingState.step === 'details') {
      setSchedulingState(prev => ({ ...prev, step: 'selection' }));
    } else if (schedulingState.step === 'confirmation') {
      setSchedulingState(prev => ({ ...prev, step: 'details' }));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <div className="schedule-assessment-page">
      
      <div className="schedule-container">
        {/* Hero Section */}
        <section className="schedule-hero">
          <div className="hero-content">
            <h1>Schedule Your Assessment</h1>
            <p className="hero-subtitle">
              Choose a convenient time for your Connector assessment. Our experienced assessors will guide you through the process.
            </p>
            
            <div className="assessment-info">
              <div className="info-item">
                <span className="info-icon">⏱️</span>
                <div>
                  <h3>90 Minutes</h3>
                  <p>Total duration including breaks</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">💻</span>
                <div>
                  <h3>Online or In-Person</h3>
                  <p>Choose your preferred format</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">👩‍🏫</span>
                <div>
                  <h3>Expert Assessors</h3>
                  <p>Experienced community leaders</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Progress Indicator */}
        <section className="progress-section">
          <div className="progress-steps">
            <div className={`progress-step ${schedulingState.step === 'selection' ? 'active' : schedulingState.step !== 'selection' ? 'completed' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Select Time</span>
            </div>
            <div className={`progress-step ${schedulingState.step === 'details' ? 'active' : schedulingState.step === 'confirmation' ? 'completed' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Your Details</span>
            </div>
            <div className={`progress-step ${schedulingState.step === 'confirmation' ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Confirm</span>
            </div>
          </div>
        </section>

        {/* Step 1: Time Selection */}
        {schedulingState.step === 'selection' && (
          <section className="selection-step">
            <h2>Choose Your Assessment Date & Time</h2>
            
            <div className="selection-content">
              <div className="date-selection">
                <h3>Available Dates</h3>
                <div className="dates-grid">
                  {getAvailableDates().map(date => (
                    <button
                      key={date}
                      className={`date-button ${schedulingState.selectedDate === date ? 'selected' : ''}`}
                      onClick={() => handleDateChange(date)}
                    >
                      <div className="date-day">
                        {new Date(date).toLocaleDateString('en-GB', { weekday: 'short' })}
                      </div>
                      <div className="date-number">
                        {new Date(date).getDate()}
                      </div>
                      <div className="date-month">
                        {new Date(date).toLocaleDateString('en-GB', { month: 'short' })}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {schedulingState.selectedDate && (
                <div className="time-selection">
                  <h3>Available Times for {formatDate(schedulingState.selectedDate)}</h3>
                  <div className="times-grid">
                    {getSlotsForDate(schedulingState.selectedDate).map(slot => (
                      <button
                        key={slot.id}
                        className={`time-slot ${schedulingState.selectedTimeSlot?.id === slot.id ? 'selected' : ''}`}
                        onClick={() => handleTimeSlotSelect(slot)}
                      >
                        <div className="slot-time">{formatTime(slot.time)}</div>
                        <div className="slot-format">
                          {slot.type === 'online' ? '💻 Online' : '🏢 In-Person'}
                        </div>
                        <div className="slot-assessor">with {slot.assessor}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {schedulingState.selectedTimeSlot && (
              <div className="selection-summary">
                <h3>Selected Appointment</h3>
                <div className="summary-card">
                  <div className="summary-details">
                    <p><strong>Date:</strong> {formatDate(schedulingState.selectedTimeSlot.date)}</p>
                    <p><strong>Time:</strong> {formatTime(schedulingState.selectedTimeSlot.time)}</p>
                    <p><strong>Format:</strong> {schedulingState.selectedTimeSlot.type === 'online' ? 'Online Assessment' : 'In-Person Assessment'}</p>
                    <p><strong>Assessor:</strong> {schedulingState.selectedTimeSlot.assessor}</p>
                  </div>
                  <button onClick={proceedToDetails} className="btn btn-primary">
                    Continue to Details
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Step 2: Personal Details */}
        {schedulingState.step === 'details' && (
          <section className="details-step">
            <h2>Your Contact Information</h2>
            
            <div className="details-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    value={schedulingState.personalDetails.firstName}
                    onChange={(e) => handlePersonalDetailsChange('firstName', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    value={schedulingState.personalDetails.lastName}
                    onChange={(e) => handlePersonalDetailsChange('lastName', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    value={schedulingState.personalDetails.email}
                    onChange={(e) => handlePersonalDetailsChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    value={schedulingState.personalDetails.phone}
                    onChange={(e) => handlePersonalDetailsChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="preferredFormat">Assessment Format Preference</label>
                <select
                  id="preferredFormat"
                  value={schedulingState.personalDetails.preferredFormat}
                  onChange={(e) => handlePersonalDetailsChange('preferredFormat', e.target.value as 'online' | 'in_person' | 'either')}
                >
                  <option value="either">No preference</option>
                  <option value="online">Online preferred</option>
                  <option value="in_person">In-person preferred</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="accommodationNeeds">Special Accommodation Needs</label>
                <textarea
                  id="accommodationNeeds"
                  rows={4}
                  value={schedulingState.personalDetails.accommodationNeeds}
                  onChange={(e) => handlePersonalDetailsChange('accommodationNeeds', e.target.value)}
                  placeholder="Please describe any accommodations you need for your assessment (e.g., extra time, screen reader compatibility, physical accessibility requirements)"
                />
              </div>
            </div>

            <div className="step-actions">
              <button onClick={goBack} className="btn btn-secondary">
                Back
              </button>
              <button 
                onClick={proceedToConfirmation} 
                className="btn btn-primary"
                disabled={!validatePersonalDetails()}
              >
                Review Booking
              </button>
            </div>
          </section>
        )}

        {/* Step 3: Confirmation */}
        {schedulingState.step === 'confirmation' && (
          <section className="confirmation-step">
            <h2>Confirm Your Assessment Booking</h2>
            
            <div className="confirmation-content">
              <div className="booking-summary">
                <h3>Assessment Details</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <strong>Date & Time</strong>
                    <p>{formatDate(schedulingState.selectedTimeSlot!.date)} at {formatTime(schedulingState.selectedTimeSlot!.time)}</p>
                  </div>
                  <div className="summary-item">
                    <strong>Format</strong>
                    <p>{schedulingState.selectedTimeSlot!.type === 'online' ? 'Online Assessment' : 'In-Person Assessment'}</p>
                  </div>
                  <div className="summary-item">
                    <strong>Assessor</strong>
                    <p>{schedulingState.selectedTimeSlot!.assessor}</p>
                  </div>
                  <div className="summary-item">
                    <strong>Duration</strong>
                    <p>90 minutes (including breaks)</p>
                  </div>
                </div>
              </div>

              <div className="contact-summary">
                <h3>Contact Information</h3>
                <div className="contact-details">
                  <p><strong>Name:</strong> {schedulingState.personalDetails.firstName} {schedulingState.personalDetails.lastName}</p>
                  <p><strong>Email:</strong> {schedulingState.personalDetails.email}</p>
                  <p><strong>Phone:</strong> {schedulingState.personalDetails.phone}</p>
                  {schedulingState.personalDetails.accommodationNeeds && (
                    <p><strong>Accommodations:</strong> {schedulingState.personalDetails.accommodationNeeds}</p>
                  )}
                </div>
              </div>

              <div className="important-notes">
                <h3>Important Information</h3>
                <div className="notes-list">
                  <div className="note-item">
                    <span className="note-icon">📧</span>
                    <p>You'll receive a confirmation email with detailed instructions within 24 hours</p>
                  </div>
                  <div className="note-item">
                    <span className="note-icon">🔗</span>
                    <p>For online assessments, we'll send you a secure meeting link 24 hours before your appointment</p>
                  </div>
                  <div className="note-item">
                    <span className="note-icon">📋</span>
                    <p>Please bring a valid photo ID and any documentation of accommodations needed</p>
                  </div>
                  <div className="note-item">
                    <span className="note-icon">⏰</span>
                    <p>Plan to arrive 15 minutes early (or join the online session 10 minutes early)</p>
                  </div>
                  <div className="note-item">
                    <span className="note-icon">🔄</span>
                    <p>You can reschedule up to 48 hours before your appointment by contacting us</p>
                  </div>
                </div>
              </div>

              <div className="terms-acceptance">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>I confirm that the information provided is accurate and I understand the assessment requirements</span>
                </label>
              </div>
            </div>

            <div className="step-actions">
              <button onClick={goBack} className="btn btn-secondary">
                Back to Edit
              </button>
              <button 
                onClick={handleSubmitBooking} 
                className="btn btn-primary"
                disabled={schedulingState.isSubmitting}
              >
                {schedulingState.isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </section>
        )}

        {/* Preparation Section */}
        <section className="preparation-section">
          <h2>Prepare for Your Assessment</h2>
          <p>Make the most of your time before the assessment with these resources:</p>
          
          <div className="preparation-resources">
            <Link to="/assessment-guide" className="resource-card">
              <div className="resource-icon">📖</div>
              <h3>Assessment Guide</h3>
              <p>Comprehensive preparation guide covering all assessment areas</p>
            </Link>
            
            <Link to="/practice-assessment" className="resource-card">
              <div className="resource-icon">🎯</div>
              <h3>Practice Assessment</h3>
              <p>Test your readiness with our practice version</p>
            </Link>
            
            <Link to="/practice-assessment" className="resource-card">
              <div className="resource-icon">🎭</div>
              <h3>Sample Scenarios</h3>
              <p>Work through real community leadership challenges</p>
            </Link>
            
            <Link to="/community/overview" className="resource-card">
              <div className="resource-icon">🏘️</div>
              <h3>Community Overview</h3>
              <p>Learn about Wembley's demographics and key issues</p>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>What should I bring to my assessment?</h3>
              <p>Please bring a valid photo ID (passport, driving licence, or national ID card). If you have specific accommodation needs, bring any relevant documentation. For online assessments, ensure you have a stable internet connection and a quiet space.</p>
            </div>
            
            <div className="faq-item">
              <h3>What happens if I need to reschedule?</h3>
              <p>You can reschedule your appointment up to 48 hours in advance by emailing assessment@wembley.community or calling 020 8900 1234. Please note that rescheduling with less than 48 hours notice may require you to wait for the next available slot.</p>
            </div>
            
            <div className="faq-item">
              <h3>How long will I wait for results?</h3>
              <p>You'll receive your assessment results within 5 working days via email. If successful, you'll also receive information about your next steps as a Connector, including onboarding and training details.</p>
            </div>
            
            <div className="faq-item">
              <h3>What if I don't pass the assessment?</h3>
              <p>Don't worry! You'll receive detailed feedback on areas for improvement and can retake the assessment after 3 months. We also offer additional support and preparation resources to help you succeed.</p>
            </div>
            
            <div className="faq-item">
              <h3>Are there any technical requirements for online assessments?</h3>
              <p>You'll need a device with a camera and microphone, a stable internet connection, and a modern web browser. We recommend testing your setup beforehand using the link we'll provide in your confirmation email.</p>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="support-section">
          <h2>Need Help?</h2>
          <p>Our team is here to support you through the assessment process.</p>
          
          <div className="support-options">
            <div className="support-option">
              <h3>📧 Email Support</h3>
              <p>assessment@wembley.community</p>
              <p className="support-note">Response within 24 hours</p>
            </div>
            
            <div className="support-option">
              <h3>📞 Phone Support</h3>
              <p>020 8900 1234</p>
              <p className="support-note">Monday-Friday, 9am-5pm</p>
            </div>
            
            <div className="support-option">
              <h3>💬 Live Chat</h3>
              <p>Available on our website</p>
              <p className="support-note">Monday-Friday, 10am-4pm</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ScheduleAssessmentPage;