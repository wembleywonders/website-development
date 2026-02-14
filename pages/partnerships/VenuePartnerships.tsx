/**
 * VENUE PARTNERSHIPS
 * 
 * Infrastructure, not Instagram.
 * 
 * This page shows creators the real landscape of venue access:
 * - What spaces are actually available
 * - What they cost (or don't)
 * - What's expected in return
 * - The logistics nobody tells you about
 * 
 * PC Plus energy: "Here's how venue booking actually works."
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState } from 'react';

// ============================================================
// TYPES
// ============================================================

interface Venue {
  id: string;
  name: string;
  type: 'community' | 'commercial' | 'council' | 'partner';
  address: string;
  postcode: string;
  description: string;
  capacity: {
    seated: number;
    standing?: number;
    workshop?: number;
  };
  facilities: string[];
  accessibility: AccessibilityInfo;
  pricing: PricingInfo;
  availability: string;
  bestFor: string[];
  notSuitableFor: string[];
  bookingLead: string;
  contactMethod: 'direct' | 'via-ww' | 'online';
  wwRelationship: string;
  realTalk: string; // Honest assessment
}

interface AccessibilityInfo {
  wheelchairAccess: boolean;
  lift: boolean;
  accessibleToilet: boolean;
  hearingLoop: boolean;
  parking: boolean;
  publicTransport: string;
  notes?: string;
}

interface PricingInfo {
  type: 'free' | 'subsidised' | 'commercial' | 'negotiable';
  hourlyRate?: number;
  dayRate?: number;
  wwMemberRate?: number;
  deposit?: number;
  notes?: string;
}

interface VenueComparison {
  factor: string;
  community: string;
  commercial: string;
  council: string;
}

// ============================================================
// DATA
// ============================================================

const VENUES: Venue[] = [
  {
    id: 'park-lane-methodist',
    name: 'Park Lane Methodist Church',
    type: 'community',
    address: 'Park Lane',
    postcode: 'HA9 7RY',
    description: 'Community hall with kitchen facilities. Our primary workshop venue.',
    capacity: {
      seated: 80,
      standing: 120,
      workshop: 30
    },
    facilities: [
      'Main hall',
      'Kitchen (basic)',
      'Tables and chairs',
      'Projector available',
      'Wi-Fi',
      'Piano'
    ],
    accessibility: {
      wheelchairAccess: true,
      lift: false,
      accessibleToilet: true,
      hearingLoop: false,
      parking: true,
      publicTransport: '5 min walk from Wembley Central',
      notes: 'Ground floor access only'
    },
    pricing: {
      type: 'subsidised',
      hourlyRate: 25,
      wwMemberRate: 15,
      deposit: 50,
      notes: 'Reduced rates for regular bookings'
    },
    availability: 'Weekday evenings, Saturdays. Sunday mornings unavailable (services).',
    bestFor: ['Workshops', 'Community meetings', 'Small performances', 'Rehearsals'],
    notSuitableFor: ['Loud music after 9pm', 'Alcohol events', 'Large-scale production'],
    bookingLead: '2-4 weeks',
    contactMethod: 'via-ww',
    wwRelationship: 'Regular partner since 2021. They know us, trust us, and prioritise our bookings.',
    realTalk: 'Reliable and affordable, but acoustics are echoey and heating can be inconsistent in winter. Kitchen is basic - bring your own kettle if you need reliable hot water.'
  },
  {
    id: 'wembley-library',
    name: 'Wembley Library',
    type: 'council',
    address: 'High Road',
    postcode: 'HA9 7AJ',
    description: 'Council library with bookable meeting rooms and event space.',
    capacity: {
      seated: 40,
      workshop: 20
    },
    facilities: [
      'Meeting rooms (2)',
      'Event space',
      'Projector',
      'Wi-Fi',
      'Printing facilities',
      'Quiet study areas'
    ],
    accessibility: {
      wheelchairAccess: true,
      lift: true,
      accessibleToilet: true,
      hearingLoop: true,
      parking: false,
      publicTransport: 'Adjacent to Wembley Central station',
      notes: 'Fully accessible throughout'
    },
    pricing: {
      type: 'free',
      notes: 'Free for community groups. Commercial rates apply for private events.'
    },
    availability: 'Library hours only. Must end by 7pm most days.',
    bestFor: ['Quiet workshops', 'Reading groups', 'Digital skills sessions', 'Small meetings'],
    notSuitableFor: ['Anything noisy', 'Evening events', 'Food/drink beyond water', 'Music'],
    bookingLead: '2-6 weeks',
    contactMethod: 'online',
    wwRelationship: 'Council partner. We run PageTurners sessions here.',
    realTalk: 'Free is great, but the time restrictions are real. You will be asked to leave promptly. Good for daytime stuff, useless for evening programmes.'
  },
  {
    id: 'yellow-pavilion',
    name: 'Yellow Pavilion (Wembley Park)',
    type: 'commercial',
    address: 'Olympic Way',
    postcode: 'HA9 0PA',
    description: 'Modern event space in Wembley Park development. Professional facilities.',
    capacity: {
      seated: 100,
      standing: 200,
      workshop: 40
    },
    facilities: [
      'Professional AV',
      'High-speed Wi-Fi',
      'Catering kitchen',
      'Green room',
      'Loading bay',
      'On-site support'
    ],
    accessibility: {
      wheelchairAccess: true,
      lift: true,
      accessibleToilet: true,
      hearingLoop: true,
      parking: true,
      publicTransport: '3 min walk from Wembley Park station',
      notes: 'Fully accessible, purpose-built'
    },
    pricing: {
      type: 'commercial',
      hourlyRate: 150,
      dayRate: 800,
      wwMemberRate: 120,
      deposit: 200,
      notes: 'Negotiable for community events. Ask about off-peak rates.'
    },
    availability: 'Flexible. Avoid event days at Wembley Stadium.',
    bestFor: ['Showcases', 'Launches', 'Filming', 'Professional workshops', 'Partner events'],
    notSuitableFor: ['Regular weekly sessions (cost)', 'Informal gatherings', 'Low-budget projects'],
    bookingLead: '4-8 weeks',
    contactMethod: 'direct',
    wwRelationship: 'Occasional partner for larger events. Good relationship but transactional.',
    realTalk: 'Looks amazing, genuinely professional. But it costs real money. Use this for events that justify the spend, not because you want nice photos.'
  },
  {
    id: 'chalkhill-community',
    name: 'Chalkhill Community Centre',
    type: 'community',
    address: 'Chalkhill Road',
    postcode: 'HA9 9FX',
    description: 'Estate-based community centre. Deep local roots.',
    capacity: {
      seated: 60,
      standing: 80,
      workshop: 25
    },
    facilities: [
      'Main hall',
      'Kitchen',
      'Outdoor space',
      'Tables and chairs',
      'Basic PA system'
    ],
    accessibility: {
      wheelchairAccess: true,
      lift: false,
      accessibleToilet: true,
      hearingLoop: false,
      parking: true,
      publicTransport: '10 min bus from Wembley Central',
      notes: 'Ground floor only'
    },
    pricing: {
      type: 'subsidised',
      hourlyRate: 20,
      wwMemberRate: 12,
      deposit: 30,
      notes: 'Very affordable for genuine community use'
    },
    availability: 'Good availability. Less demand than central Wembley venues.',
    bestFor: ['Youth work', 'Community outreach', 'Informal sessions', 'Local engagement'],
    notSuitableFor: ['Events requiring central location', 'Professional filming', 'Large audiences'],
    bookingLead: '1-2 weeks',
    contactMethod: 'via-ww',
    wwRelationship: 'Growing partnership. They want more youth activity.',
    realTalk: 'Under-utilised gem. Less footfall means more flexibility. The community there is tight-knit - respect that and you\'ll be welcomed back.'
  },
  {
    id: 'michaels-cafe',
    name: "Michael's Café & Workspace",
    type: 'partner',
    address: 'High Road',
    postcode: 'HA9 7AY',
    description: 'Local café with back room available for small groups. Informal, flexible.',
    capacity: {
      seated: 15,
      workshop: 10
    },
    facilities: [
      'Back room',
      'Wi-Fi',
      'Power outlets',
      'Coffee & food on-site',
      'Relaxed atmosphere'
    ],
    accessibility: {
      wheelchairAccess: true,
      lift: false,
      accessibleToilet: false,
      hearingLoop: false,
      parking: false,
      publicTransport: 'Wembley Central, 2 min walk',
      notes: 'Step-free ground floor, but toilet not accessible'
    },
    pricing: {
      type: 'negotiable',
      notes: 'No hire fee if group buys food/drinks. Minimum spend expectations.'
    },
    availability: 'Flexible, especially off-peak hours (2-5pm weekdays)',
    bestFor: ['1-to-1 mentoring', 'Small group work', 'Informal meetups', 'Co-working'],
    notSuitableFor: ['Anything requiring privacy', 'Large groups', 'Loud activity', 'Filming'],
    bookingLead: '1 week',
    contactMethod: 'direct',
    wwRelationship: 'Friendly local business. Michael supports what we do.',
    realTalk: 'Great for coffee and conversation, not for structured workshops. Background noise is real. But it\'s free, flexible, and the food is good.'
  }
];

const VENUE_COMPARISONS: VenueComparison[] = [
  {
    factor: 'Cost',
    community: '£10-25/hour',
    commercial: '£100-200/hour',
    council: 'Often free'
  },
  {
    factor: 'Flexibility',
    community: 'High - relationships matter',
    commercial: 'Medium - contract-based',
    council: 'Low - policies and hours'
  },
  {
    factor: 'Facilities',
    community: 'Basic but functional',
    commercial: 'Professional',
    council: 'Variable'
  },
  {
    factor: 'Booking ease',
    community: 'Personal contact',
    commercial: 'Formal process',
    council: 'Online systems'
  },
  {
    factor: 'Cancellation',
    community: 'Usually understanding',
    commercial: 'Strict, with penalties',
    council: 'Policy-dependent'
  }
];

// ============================================================
// COMPONENT
// ============================================================

export const VenuePartnerships: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  
  const filteredVenues = filterType === 'all' 
    ? VENUES 
    : VENUES.filter(v => v.type === filterType);
  
  return (
    <div className="venue-partnerships">
      {/* Header */}
      <header className="venue-partnerships__header">
        <h1>Venue Partnerships</h1>
        <p>
          Real spaces with real constraints. We've done the legwork so you 
          understand what's actually available, what it costs, and what to expect.
        </p>
      </header>
      
      {/* Reality Check */}
      <section className="venue-partnerships__reality">
        <h2>🎯 The Honest Truth About Venues</h2>
        <div className="reality-grid">
          <div className="reality-card">
            <h3>Free isn't free</h3>
            <p>
              Council and community venues often have hidden costs: time restrictions, 
              facility limitations, booking complexity. Factor in your time.
            </p>
          </div>
          <div className="reality-card">
            <h3>Relationships matter</h3>
            <p>
              The best bookings come from trust built over time. Turn up early, 
              leave it cleaner than you found it, say thank you. It compounds.
            </p>
          </div>
          <div className="reality-card">
            <h3>Plan for the unsexy stuff</h3>
            <p>
              Parking, loading, key collection, heating controls, Wi-Fi passwords. 
              These derail more events than you'd think.
            </p>
          </div>
          <div className="reality-card">
            <h3>Match space to purpose</h3>
            <p>
              Don't book the expensive venue because it looks good. Book the 
              venue that serves your actual needs.
            </p>
          </div>
        </div>
      </section>
      
      {/* Comparison Table */}
      <section className="venue-partnerships__comparison">
        <h2>Venue Types Compared</h2>
        <p>Different venues work differently. Here's what to expect.</p>
        
        <div className="comparison-table">
          <div className="comparison-header">
            <div className="comparison-cell">Factor</div>
            <div className="comparison-cell">Community</div>
            <div className="comparison-cell">Commercial</div>
            <div className="comparison-cell">Council</div>
          </div>
          {VENUE_COMPARISONS.map((row, i) => (
            <div key={i} className="comparison-row">
              <div className="comparison-cell comparison-cell--label">{row.factor}</div>
              <div className="comparison-cell">{row.community}</div>
              <div className="comparison-cell">{row.commercial}</div>
              <div className="comparison-cell">{row.council}</div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Filters */}
      <section className="venue-partnerships__filters">
        <span className="filter-label">Show:</span>
        <button 
          className={filterType === 'all' ? 'active' : ''}
          onClick={() => setFilterType('all')}
        >
          All Venues
        </button>
        <button 
          className={filterType === 'community' ? 'active' : ''}
          onClick={() => setFilterType('community')}
        >
          🏠 Community
        </button>
        <button 
          className={filterType === 'commercial' ? 'active' : ''}
          onClick={() => setFilterType('commercial')}
        >
          🏢 Commercial
        </button>
        <button 
          className={filterType === 'council' ? 'active' : ''}
          onClick={() => setFilterType('council')}
        >
          🏛️ Council
        </button>
        <button 
          className={filterType === 'partner' ? 'active' : ''}
          onClick={() => setFilterType('partner')}
        >
          🤝 Partner
        </button>
      </section>
      
      {/* Venue Grid */}
      <section className="venue-partnerships__venues">
        <div className="venues-grid">
          {filteredVenues.map(venue => (
            <div 
              key={venue.id}
              className={`venue-card venue-card--${venue.type}`}
              onClick={() => setSelectedVenue(venue)}
            >
              <div className="venue-card__header">
                <span className="venue-type">
                  {venue.type === 'community' && '🏠'}
                  {venue.type === 'commercial' && '🏢'}
                  {venue.type === 'council' && '🏛️'}
                  {venue.type === 'partner' && '🤝'}
                </span>
                <h3>{venue.name}</h3>
              </div>
              
              <p className="venue-card__description">{venue.description}</p>
              
              <div className="venue-card__quick-facts">
                <span className="fact">
                  👥 {venue.capacity.workshop || venue.capacity.seated} workshop / {venue.capacity.seated} seated
                </span>
                <span className="fact">
                  💷 {venue.pricing.type === 'free' ? 'Free' : 
                      venue.pricing.wwMemberRate ? `£${venue.pricing.wwMemberRate}/hr (WW)` :
                      venue.pricing.hourlyRate ? `£${venue.pricing.hourlyRate}/hr` : 
                      'Negotiable'}
                </span>
                <span className="fact">
                  ♿ {venue.accessibility.wheelchairAccess ? 'Wheelchair accessible' : 'Limited access'}
                </span>
              </div>
              
              <div className="venue-card__best-for">
                <strong>Best for:</strong> {venue.bestFor.slice(0, 3).join(', ')}
              </div>
              
              <button className="venue-card__details">View Details →</button>
            </div>
          ))}
        </div>
      </section>
      
      {/* Venue Detail Modal */}
      {selectedVenue && (
        <div className="venue-modal" onClick={() => setSelectedVenue(null)}>
          <div className="venue-modal__content" onClick={e => e.stopPropagation()}>
            <button 
              className="close-btn"
              onClick={() => setSelectedVenue(null)}
            >
              ×
            </button>
            
            <div className="venue-detail">
              <div className="venue-detail__header">
                <span className="venue-type-large">
                  {selectedVenue.type === 'community' && '🏠'}
                  {selectedVenue.type === 'commercial' && '🏢'}
                  {selectedVenue.type === 'council' && '🏛️'}
                  {selectedVenue.type === 'partner' && '🤝'}
                </span>
                <div>
                  <h2>{selectedVenue.name}</h2>
                  <p className="address">{selectedVenue.address}, {selectedVenue.postcode}</p>
                </div>
              </div>
              
              <p className="venue-detail__description">{selectedVenue.description}</p>
              
              {/* Real Talk - The honest assessment */}
              <div className="venue-detail__real-talk">
                <h3>💬 Real Talk</h3>
                <p>{selectedVenue.realTalk}</p>
              </div>
              
              {/* Capacity */}
              <div className="venue-detail__section">
                <h3>Capacity</h3>
                <div className="capacity-grid">
                  <div className="capacity-item">
                    <span className="number">{selectedVenue.capacity.seated}</span>
                    <span className="label">Seated</span>
                  </div>
                  {selectedVenue.capacity.standing && (
                    <div className="capacity-item">
                      <span className="number">{selectedVenue.capacity.standing}</span>
                      <span className="label">Standing</span>
                    </div>
                  )}
                  {selectedVenue.capacity.workshop && (
                    <div className="capacity-item">
                      <span className="number">{selectedVenue.capacity.workshop}</span>
                      <span className="label">Workshop</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Pricing */}
              <div className="venue-detail__section">
                <h3>Pricing</h3>
                <div className="pricing-info">
                  {selectedVenue.pricing.type === 'free' ? (
                    <span className="price-tag price-tag--free">Free for community use</span>
                  ) : (
                    <>
                      {selectedVenue.pricing.hourlyRate && (
                        <span className="price-tag">£{selectedVenue.pricing.hourlyRate}/hour standard</span>
                      )}
                      {selectedVenue.pricing.wwMemberRate && (
                        <span className="price-tag price-tag--ww">£{selectedVenue.pricing.wwMemberRate}/hour WW members</span>
                      )}
                      {selectedVenue.pricing.dayRate && (
                        <span className="price-tag">£{selectedVenue.pricing.dayRate}/day</span>
                      )}
                      {selectedVenue.pricing.deposit && (
                        <span className="price-tag price-tag--deposit">£{selectedVenue.pricing.deposit} deposit</span>
                      )}
                    </>
                  )}
                  {selectedVenue.pricing.notes && (
                    <p className="pricing-notes">{selectedVenue.pricing.notes}</p>
                  )}
                </div>
              </div>
              
              {/* Facilities */}
              <div className="venue-detail__section">
                <h3>Facilities</h3>
                <ul className="facilities-list">
                  {selectedVenue.facilities.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              
              {/* Accessibility */}
              <div className="venue-detail__section">
                <h3>Accessibility</h3>
                <div className="accessibility-grid">
                  <span className={selectedVenue.accessibility.wheelchairAccess ? 'yes' : 'no'}>
                    ♿ Wheelchair: {selectedVenue.accessibility.wheelchairAccess ? 'Yes' : 'Limited'}
                  </span>
                  <span className={selectedVenue.accessibility.lift ? 'yes' : 'no'}>
                    🛗 Lift: {selectedVenue.accessibility.lift ? 'Yes' : 'No'}
                  </span>
                  <span className={selectedVenue.accessibility.accessibleToilet ? 'yes' : 'no'}>
                    🚻 Accessible toilet: {selectedVenue.accessibility.accessibleToilet ? 'Yes' : 'No'}
                  </span>
                  <span className={selectedVenue.accessibility.hearingLoop ? 'yes' : 'no'}>
                    🔊 Hearing loop: {selectedVenue.accessibility.hearingLoop ? 'Yes' : 'No'}
                  </span>
                  <span className={selectedVenue.accessibility.parking ? 'yes' : 'no'}>
                    🅿️ Parking: {selectedVenue.accessibility.parking ? 'Yes' : 'No'}
                  </span>
                </div>
                <p className="transport-info">
                  🚇 {selectedVenue.accessibility.publicTransport}
                </p>
                {selectedVenue.accessibility.notes && (
                  <p className="accessibility-notes">{selectedVenue.accessibility.notes}</p>
                )}
              </div>
              
              {/* Best For / Not Suitable */}
              <div className="venue-detail__section venue-detail__suitability">
                <div className="suitability-column">
                  <h4>✅ Best for</h4>
                  <ul>
                    {selectedVenue.bestFor.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="suitability-column">
                  <h4>❌ Not suitable for</h4>
                  <ul>
                    {selectedVenue.notSuitableFor.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Booking Info */}
              <div className="venue-detail__section">
                <h3>Booking</h3>
                <p><strong>Lead time:</strong> {selectedVenue.bookingLead}</p>
                <p><strong>Availability:</strong> {selectedVenue.availability}</p>
                <p><strong>How to book:</strong> {
                  selectedVenue.contactMethod === 'via-ww' 
                    ? 'Contact us and we\'ll arrange it' 
                    : selectedVenue.contactMethod === 'online'
                    ? 'Book directly via their online system'
                    : 'Contact venue directly'
                }</p>
              </div>
              
              {/* WW Relationship */}
              <div className="venue-detail__section venue-detail__relationship">
                <h3>Our Relationship</h3>
                <p>{selectedVenue.wwRelationship}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="venue-detail__actions">
                {selectedVenue.contactMethod === 'via-ww' ? (
                  <button className="action-primary">Request This Venue</button>
                ) : (
                  <button className="action-primary">Get Booking Details</button>
                )}
                <button className="action-secondary">Ask a Question</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* How We Help */}
      <section className="venue-partnerships__help">
        <h2>How We Support Venue Bookings</h2>
        <div className="help-grid">
          <div className="help-card">
            <span className="icon">🤝</span>
            <h3>Relationship Access</h3>
            <p>
              For partner venues, we can make introductions and vouch for you. 
              That trust took years to build.
            </p>
          </div>
          <div className="help-card">
            <span className="icon">💷</span>
            <h3>Member Rates</h3>
            <p>
              Several venues offer reduced rates for WW members. Ask us before 
              booking directly.
            </p>
          </div>
          <div className="help-card">
            <span className="icon">📋</span>
            <h3>Logistics Support</h3>
            <p>
              First time booking? We can walk you through insurance, risk 
              assessments, and the boring-but-essential stuff.
            </p>
          </div>
          <div className="help-card">
            <span className="icon">🔧</span>
            <h3>Equipment Loan</h3>
            <p>
              Some venues lack basics. We have PA equipment, projectors, and 
              supplies that members can borrow.
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="venue-partnerships__footer">
        <p>
          Venue information updated January 2026. Details change — always confirm 
          directly before booking.
        </p>
        <p className="company-info">
          Wembley Wonders CIC | Company No. 12960817
        </p>
      </footer>
    </div>
  );
};

export default VenuePartnerships;