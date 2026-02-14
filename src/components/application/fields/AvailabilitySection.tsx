import React, { useState, useMemo } from 'react';
import { 
  Step2FormData, 
  Step2ValidationErrors, 
  InterestArea,
  Availability,
  DayOfWeek,
  AvailabilitySectionData 
} from '../../../types/application/step2Types';
import { 
  INTEREST_AREAS,
  INTEREST_CATEGORIES,
  TIME_COMMITMENT_OPTIONS,
  AVAILABILITY_OPTIONS,
  getInterestAreasByCategory,
  getAllInterestCategories
} from '../../../data/application/interestAreasData';
import { VALIDATION_RULES } from '../../../types/application/step2Types';
import './AvailabilitySection.css';

interface AvailabilitySectionProps {
  data: Partial<Step2FormData>;
  errors: Step2ValidationErrors;
  onChange: (field: keyof Step2FormData, value: any) => void;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  data,
  errors,
  onChange
}) => {
  const [selectedInterestCategory, setSelectedInterestCategory] = useState<string>('all');
  const [interestSearchTerm, setInterestSearchTerm] = useState<string>('');

  const selectedInterests = data.interestAreas || [];
  const availability = data.availability || {
    daysAvailable: [],
    timeSlots: {
      morning: false,
      afternoon: false,
      evening: false,
      weekend: false
    },
    flexibleSchedule: false,
    noticeRequired: 'immediate',
    canTravelLocally: false,
    hasReliableTransport: false
  };

  // Filter interest areas based on category and search
  const filteredInterests = useMemo(() => {
    let interests = selectedInterestCategory === 'all' 
      ? INTEREST_AREAS 
      : getInterestAreasByCategory(selectedInterestCategory);

    if (interestSearchTerm) {
      interests = interests.filter(interest => 
        interest.label.toLowerCase().includes(interestSearchTerm.toLowerCase()) ||
        interest.description.toLowerCase().includes(interestSearchTerm.toLowerCase())
      );
    }

    return interests;
  }, [selectedInterestCategory, interestSearchTerm]);

  const handleInterestToggle = (interestOption: typeof INTEREST_AREAS[0]) => {
    const existingIndex = selectedInterests.findIndex(i => i.id === interestOption.value);
    
    if (existingIndex >= 0) {
      // Remove interest
      const updated = selectedInterests.filter(i => i.id !== interestOption.value);
      onChange('interestAreas', updated);
    } else {
      // Add interest
      if (selectedInterests.length < VALIDATION_RULES.MAX_INTEREST_AREAS) {
        const newInterest: InterestArea = {
          id: interestOption.value,
          name: interestOption.label,
          description: interestOption.description,
          priority: 'medium',
          hasExperience: false
        };
        onChange('interestAreas', [...selectedInterests, newInterest]);
      }
    }
  };

  const handleInterestUpdate = (interestId: string, updates: Partial<InterestArea>) => {
    const updated = selectedInterests.map(interest => 
      interest.id === interestId ? { ...interest, ...updates } : interest
    );
    onChange('interestAreas', updated);
  };

  const handleAvailabilityChange = (field: keyof Availability, value: any) => {
    const updated = { ...availability, [field]: value };
    onChange('availability', updated);
  };

  const handleDayToggle = (day: DayOfWeek) => {
    const currentDays = availability.daysAvailable || [];
    const updated = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    handleAvailabilityChange('daysAvailable', updated);
  };

  const handleTimeSlotToggle = (slot: keyof Availability['timeSlots']) => {
    const updated = {
      ...availability.timeSlots,
      [slot]: !availability.timeSlots[slot]
    };
    handleAvailabilityChange('timeSlots', updated);
  };

  const isInterestSelected = (interestId: string) => {
    return selectedInterests.some(i => i.id === interestId);
  };

  const canAddMoreInterests = selectedInterests.length < VALIDATION_RULES.MAX_INTEREST_AREAS;

  return (
    <div className="availability-section">
      <div className="section-header">
        <h2>Interests & Availability</h2>
        <p>Tell us what interests you and when you're available to help</p>
      </div>

      {/* Interest Areas Selection */}
      <div className="interest-areas-section">
        <div className="interests-header">
          <h3>Areas of Interest</h3>
          <p>Choose {VALIDATION_RULES.MIN_INTEREST_AREAS}-{VALIDATION_RULES.MAX_INTEREST_AREAS} areas where you'd like to make a difference in the community</p>
          
          <div className="interests-counter">
            <span className={`counter ${selectedInterests.length < VALIDATION_RULES.MIN_INTEREST_AREAS ? 'insufficient' : ''}`}>
              {selectedInterests.length} / {VALIDATION_RULES.MAX_INTEREST_AREAS} areas selected
            </span>
            {selectedInterests.length < VALIDATION_RULES.MIN_INTEREST_AREAS && (
              <span className="counter-help">Select at least {VALIDATION_RULES.MIN_INTEREST_AREAS} areas</span>
            )}
          </div>
        </div>

        {errors.interestAreas && (
          <div className="error-message">{errors.interestAreas}</div>
        )}

        {/* Selected Interests Display */}
        {selectedInterests.length > 0 && (
          <div className="selected-interests-section">
            <h4>Your Selected Interests</h4>
            <div className="selected-interests-grid">
              {selectedInterests.map((interest) => (
                <div key={interest.id} className="selected-interest-item">
                  <div className="interest-header">
                    <div className="interest-name">{interest.name}</div>
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => handleInterestToggle({ value: interest.id } as any)}
                      aria-label={`Remove ${interest.name}`}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="interest-priority">
                    <label className="priority-label">Priority:</label>
                    <select
                      className="priority-select"
                      value={interest.priority}
                      onChange={(e) => handleInterestUpdate(interest.id, { priority: e.target.value as any })}
                    >
                      <option value="high">High - Most interested</option>
                      <option value="medium">Medium - Interested</option>
                      <option value="low">Low - Somewhat interested</option>
                    </select>
                  </div>

                  <div className="interest-experience">
                    <label className="experience-checkbox">
                      <input
                        type="checkbox"
                        checked={interest.hasExperience}
                        onChange={(e) => handleInterestUpdate(interest.id, { hasExperience: e.target.checked })}
                      />
                      I have experience in this area
                    </label>
                  </div>

                  {interest.hasExperience && (
                    <div className="experience-details">
                      <textarea
                        className="experience-textarea"
                        placeholder="Briefly describe your experience..."
                        value={interest.experienceDescription || ''}
                        onChange={(e) => handleInterestUpdate(interest.id, { experienceDescription: e.target.value })}
                        rows={2}
                      />
                    </div>
                  )}

                  <div className="interest-description">{interest.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interest Browser */}
        <div className="interests-browser">
          <div className="browser-controls">
            <div className="category-filter">
              <label htmlFor="interest-category-select">Filter by category:</label>
              <select
                id="interest-category-select"
                className="category-select"
                value={selectedInterestCategory}
                onChange={(e) => setSelectedInterestCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {getAllInterestCategories().map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="search-filter">
              <label htmlFor="interest-search">Search interests:</label>
              <input
                id="interest-search"
                type="text"
                className="search-input"
                placeholder="e.g. youth, elderly, environment..."
                value={interestSearchTerm}
                onChange={(e) => setInterestSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="interests-grid">
            {filteredInterests.map((interestOption) => {
              const isSelected = isInterestSelected(interestOption.value);
              const isDisabled = !isSelected && !canAddMoreInterests;
              
              return (
                <div
                  key={interestOption.value}
                  className={`interest-option ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                  onClick={() => !isDisabled && handleInterestToggle(interestOption)}
                >
                  <div className="interest-content">
                    <div className="interest-label">{interestOption.label}</div>
                    <div className="interest-desc">{interestOption.description}</div>
                    <div className="interest-category">{interestOption.category}</div>
                  </div>
                  <div className="interest-checkbox">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={isDisabled}
                      onChange={() => {}} // Handled by parent click
                      aria-label={`${isSelected ? 'Remove' : 'Add'} ${interestOption.label}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {filteredInterests.length === 0 && (
            <div className="no-interests-found">
              <p>No interest areas found matching your search.</p>
              {interestSearchTerm && (
                <button
                  type="button"
                  className="btn-clear-search"
                  onClick={() => setInterestSearchTerm('')}
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Time Commitment */}
      <div className="time-commitment-section">
        <h3>Time Commitment</h3>
        <p>How much time can you typically commit per week?</p>
        
        <div className="time-options">
          {TIME_COMMITMENT_OPTIONS.map((option) => (
            <label key={option.value} className="time-option">
              <input
                type="radio"
                name="timeCommitment"
                value={option.value}
                checked={data.timeCommitment === option.value}
                onChange={(e) => onChange('timeCommitment', e.target.value)}
              />
              <div className="time-content">
                <div className="time-label">{option.label}</div>
                <div className="time-description">{option.description}</div>
              </div>
            </label>
          ))}
        </div>
        
        {errors.timeCommitment && (
          <div className="error-message">{errors.timeCommitment}</div>
        )}
      </div>

      {/* Availability Schedule */}
      <div className="availability-schedule-section">
        <h3>When are you available?</h3>
        <p>Select the days and times when you're generally available to help</p>

        <div className="schedule-grid">
          <div className="days-section">
            <h4>Available Days</h4>
            <div className="days-grid">
              {AVAILABILITY_OPTIONS.days.map((day) => (
                <label key={day.value} className="day-option">
                  <input
                    type="checkbox"
                    checked={availability.daysAvailable.includes(day.value as DayOfWeek)}
                    onChange={() => handleDayToggle(day.value as DayOfWeek)}
                  />
                  <span>{day.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="time-slots-section">
            <h4>Preferred Time Slots</h4>
            <div className="time-slots-grid">
              {AVAILABILITY_OPTIONS.timeSlots.map((slot) => (
                <label key={slot.value} className="time-slot-option">
                  <input
                    type="checkbox"
                    checked={availability.timeSlots[slot.value as keyof Availability['timeSlots']]}
                    onChange={() => handleTimeSlotToggle(slot.value as keyof Availability['timeSlots'])}
                  />
                  <span>{slot.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {errors.availability && (
          <div className="error-message">{errors.availability}</div>
        )}

        {/* Additional Availability Options */}
        <div className="additional-options">
          <div className="flexibility-options">
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={availability.flexibleSchedule}
                onChange={(e) => handleAvailabilityChange('flexibleSchedule', e.target.checked)}
              />
              <span>I have a flexible schedule and can adapt to different times</span>
            </label>
          </div>

          <div className="notice-section">
            <h4>How much notice do you need?</h4>
            <div className="notice-options">
              {AVAILABILITY_OPTIONS.notice.map((notice) => (
                <label key={notice.value} className="notice-option">
                  <input
                    type="radio"
                    name="noticeRequired"
                    value={notice.value}
                    checked={availability.noticeRequired === notice.value}
                    onChange={(e) => handleAvailabilityChange('noticeRequired', e.target.value)}
                  />
                  <span>{notice.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="transport-section">
            <h4>Transport & Travel</h4>
            <div className="transport-options">
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={availability.canTravelLocally}
                  onChange={(e) => handleAvailabilityChange('canTravelLocally', e.target.checked)}
                />
                <span>I can travel within the local area for community work</span>
              </label>

              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={availability.hasReliableTransport}
                  onChange={(e) => handleAvailabilityChange('hasReliableTransport', e.target.checked)}
                />
                <span>I have reliable transport (car, bike, public transport pass)</span>
              </label>
            </div>

            {availability.canTravelLocally && (
              <div className="travel-distance">
                <label className="distance-label">
                  Maximum travel distance (miles):
                  <input
                    type="number"
                    className="distance-input"
                    min="1"
                    max="50"
                    value={availability.maxTravelDistance || ''}
                    onChange={(e) => handleAvailabilityChange('maxTravelDistance', 
                      e.target.value ? parseInt(e.target.value) : undefined
                    )}
                    placeholder="5"
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Contact Information */}
      <div className="emergency-contact-section">
        <h3>Emergency Contact</h3>
        <p>Please provide an emergency contact in case we need to reach someone on your behalf</p>

        <div className="contact-grid">
          <div className="form-group">
            <label className="form-label required">Emergency Contact Name</label>
            <input
              type="text"
              className={`form-input ${errors.emergencyContactName ? 'error' : ''}`}
              value={data.emergencyContactName || ''}
              onChange={(e) => onChange('emergencyContactName', e.target.value)}
              placeholder="Full name"
            />
            {errors.emergencyContactName && (
              <div className="error-message">{errors.emergencyContactName}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label required">Phone Number</label>
            <input
              type="tel"
              className={`form-input ${errors.emergencyContactPhone ? 'error' : ''}`}
              value={data.emergencyContactPhone || ''}
              onChange={(e) => onChange('emergencyContactPhone', e.target.value)}
              placeholder="07XXX XXXXXX or 020 XXXX XXXX"
            />
            {errors.emergencyContactPhone && (
              <div className="error-message">{errors.emergencyContactPhone}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label required">Relationship</label>
            <select
              className={`form-select ${errors.emergencyContactRelation ? 'error' : ''}`}
              value={data.emergencyContactRelation || ''}
              onChange={(e) => onChange('emergencyContactRelation', e.target.value)}
            >
              <option value="">Select relationship</option>
              <option value="spouse">Spouse/Partner</option>
              <option value="parent">Parent</option>
              <option value="child">Child</option>
              <option value="sibling">Sibling</option>
              <option value="friend">Friend</option>
              <option value="other_family">Other Family Member</option>
              <option value="colleague">Colleague</option>
              <option value="other">Other</option>
            </select>
            {errors.emergencyContactRelation && (
              <div className="error-message">{errors.emergencyContactRelation}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
