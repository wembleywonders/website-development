import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSmartRouting } from '../hooks/useSmartRouting';
import { WelcomeBanner } from '../components/smart/WelcomeBanner';
import { useMayaStore } from '../stores/mayaStore';
import PageTemplate from '../components/PageTemplate';
import DraggableMaya from '../components/maya/DraggableMaya';
import { 
  Calendar, Clock, Users, MapPin, Star, Award, 
  Music, Palette, Lightbulb, Heart, Globe, Camera,
  Play, FileText, Coffee, Zap, Target, CheckCircle,
  Crown, Gift, Sparkles
} from 'lucide-react';
import './CommunityCalendarPage.css';

export const CommunityCalendarPage: React.FC = () => {
  const mayaStore = useMayaStore();
  const smartRouting = useSmartRouting();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Set Maya context once on component mount
    if (mayaStore?.userContext?.currentPage !== 'calendar') {
      mayaStore?.setMayaContext({
        context: 'calendar',
        data: {
          currentPage: 'calendar',
          userInterest: 'community events and programme scheduling',
          availableEvents: ['Current Events', 'Cultural Calendar', 'Programme Schedule'],
          nextSteps: ['View upcoming events', 'Book sessions', 'Join community activities']
        }
      });
    }
  }, []); // Empty dependency array - only run once on mount

  const currentEvents = [
    {
      id: 1,
      title: 'Trubble n Bass Studio Session',
      type: 'programme',
      date: '2025-09-25',
      time: '14:00 - 17:00',
      location: 'Main Studio',
      programme: 'Spring Programme',
      description: 'Professional music production workshop with industry mentors',
      spots: 8,
      price: 'Member rate',
      category: 'music',
      tierAccess: 'core'
    },
    {
      id: 2,
      title: 'Kaywana\'s Court Writing Circle',
      type: 'workshop',
      date: '2025-09-26',
      time: '10:00 - 12:00',
      location: 'Creative Space',
      programme: 'Summer Programme',
      description: 'Collaborative writing session with published authors',
      spots: 12,
      price: '£5 drop-in',
      category: 'creative',
      tierAccess: 'all'
    },
    {
      id: 3,
      title: 'Bright Sparks Pitch Practice',
      type: 'workshop',
      date: '2025-09-27',
      time: '18:30 - 20:30',
      location: 'Innovation Lab',
      programme: 'Autumn Programme',
      description: 'Practice your business pitch with feedback from entrepreneurs',
      spots: 10,
      price: 'Member rate',
      category: 'business',
      tierAccess: 'core'
    },
    {
      id: 4,
      title: 'Community Social Meetup',
      type: 'social',
      date: '2025-09-28',
      time: '19:00 - 21:00',
      location: 'Community Hub',
      programme: 'Year-round',
      description: 'Weekly social gathering with food, games, and networking',
      spots: 25,
      price: 'Free',
      category: 'social',
      tierAccess: 'all'
    }
  ];

  const culturalEvents = [
    {
      id: 'windrush',
      title: 'Windrush Day Celebration',
      period: 'June',
      description: 'Annual celebration of Caribbean heritage and community with food, music, and storytelling',
      activities: ['Heritage workshops', 'Community feast', 'Musical performances', 'Story sharing'],
      tierBenefits: {
        core: 'General admission to celebration events',
        supporter: 'VIP area access, welcome reception, special heritage tour'
      },
      category: 'heritage'
    },
    {
      id: 'bhm',
      title: 'Black History Month Programme',
      period: 'October',
      description: 'Month-long celebration of Black achievement, culture, and community contributions',
      activities: ['Historical workshops', 'Speaker series', 'Cultural exhibitions', 'Youth programmes'],
      tierBenefits: {
        core: 'Access to all public events and workshops',
        supporter: 'Private speaker dinners, exhibition previews, special documentaries'
      },
      category: 'heritage'
    },
    {
      id: 'mothers-day',
      title: 'Mother\'s Day Weekend Retreat',
      period: 'March',
      description: 'Special weekend celebrating mothers with wellness activities and family bonding',
      activities: ['Spa experiences', 'Family workshops', 'Wellness sessions', 'Coach trip adventures'],
      tierBenefits: {
        core: 'Day event participation (additional cost for spa/travel)',
        supporter: 'Full weekend package including spa day and coach trip included'
      },
      category: 'family'
    },
    {
      id: 'iwd',
      title: 'International Women\'s Day',
      period: 'March',
      description: 'Empowerment workshops, networking, and celebration of women in our community',
      activities: ['Leadership workshops', 'Business networking', 'Mentorship sessions', 'Evening celebration'],
      tierBenefits: {
        core: 'Workshop access and evening event',
        supporter: 'VIP networking lunch, 1-2-1 mentorship, gift bag'
      },
      category: 'empowerment'
    },
    {
      id: 'halloween',
      title: 'Halloween Community Night',
      period: 'October',
      description: 'Family-friendly Halloween celebration with activities for all ages',
      activities: ['Pumpkin picking trip', 'Costume competition', 'Teen horror movie night', 'Community party'],
      tierBenefits: {
        core: 'Community party and local activities',
        supporter: 'Coach trip to pumpkin farm, premium costume prizes, private teen event'
      },
      category: 'family'
    },
    {
      id: 'christmas',
      title: 'Christmas & New Year Celebrations',
      period: 'December - January',
      description: 'Multi-cultural winter celebrations bringing families together',
      activities: ['Community feast', 'Gift exchanges', 'Cultural performances', 'New Year planning'],
      tierBenefits: {
        core: 'Community feast and general celebration',
        supporter: 'Premium catering, gift exchanges, special performances, planning retreat'
      },
      category: 'family'
    }
  ];

  const seasonalProgrammes = [
    {
      season: 'Spring',
      name: 'Trubble n Bass',
      period: 'March - May',
      weeks: '8-12 weeks',
      focus: 'Music Production & Audio Engineering',
      nextStart: 'March 2026',
      color: 'emerald',
      icon: <Music className="w-6 h-6" />
    },
    {
      season: 'Summer', 
      name: 'Kaywana\'s Court',
      period: 'June - August',
      weeks: '8-12 weeks', 
      focus: 'Creative Arts & Writing',
      nextStart: 'June 2025',
      color: 'orange',
      icon: <Palette className="w-6 h-6" />
    },
    {
      season: 'Autumn',
      name: 'Bright Sparks', 
      period: 'September - November',
      weeks: '8-12 weeks',
      focus: 'Enterprise & Innovation', 
      nextStart: 'September 2025',
      color: 'blue',
      icon: <Lightbulb className="w-6 h-6" />
    }
  ];

  const yearOverview = [
    {
      phase: 'Planning Phase',
      period: 'December - February',
      description: 'Community planning, programme development, and preparation for the year ahead',
      activities: ['Community assemblies', 'Programme planning', 'Resource preparation'],
      icon: <Target className="w-5 h-5" />
    },
    {
      phase: 'Active Programmes',
      period: 'March - November', 
      description: 'Three seasonal programmes running consecutively with community events',
      activities: ['Seasonal programmes', 'Weekly meetups', 'Community trips'],
      icon: <Zap className="w-5 h-5" />
    },
    {
      phase: 'Celebration Phase',
      period: 'December',
      description: 'Connoisseurs Club celebrations and achievement recognition',
      activities: ['Achievement ceremonies', 'Community celebrations', 'Year-end reflection'],
      icon: <Star className="w-5 h-5" />
    }
  ];

  return (
    <PageTemplate
      pageTitle="Community Calendar"
      pageStrapline="What's Happening Now"
      pageGuide="Track our 32-week operational year with three seasonal programmes, community events, and our annual Connoisseurs Club celebration."
      pageType="community"
      showMaya={true}
    >
     {smartRouting && smartRouting.showWelcome && <WelcomeBanner />}



      {/* Navigation Tabs */}
      <nav className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Calendar className="w-4 h-4" />
          Current Events
        </button>
        <button 
          className={`tab-button ${activeTab === 'programmes' ? 'active' : ''}`}
          onClick={() => setActiveTab('programmes')}
        >
          <Clock className="w-4 h-4" />
          Programme Schedule
        </button>
        <button 
          className={`tab-button ${activeTab === 'cultural' ? 'active' : ''}`}
          onClick={() => setActiveTab('cultural')}
        >
          <Crown className="w-4 h-4" />
          Cultural Calendar
        </button>
        <button 
          className={`tab-button ${activeTab === 'year' ? 'active' : ''}`}
          onClick={() => setActiveTab('year')}
        >
          <Globe className="w-4 h-4" />
          32-Week Year
        </button>
        <button 
          className={`tab-button ${activeTab === 'involvement' ? 'active' : ''}`}
          onClick={() => setActiveTab('involvement')}
        >
          <Users className="w-4 h-4" />
          Get Involved
        </button>
      </nav>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div>
            {/* Current Events */}
            <section className="events-section">
              <h2>This Week's Events</h2>
              <p className="section-description">
                Join us for workshops, programme sessions, and community gatherings happening this week.
              </p>

              {/* Events Media Section */}
              <div className="media-section events-media">
                <h3>Event Highlights</h3>
                <div className="media-horizontal">
                  <div className="media-item">
                    <div className="media-preview">
                      <Music className="media-icon" />
                      <div className="media-overlay">
                        <Play className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Studio Sessions</span>
                    <p className="media-description">Live recording experiences</p>
                  </div>
                  <div className="media-item">
                    <div className="media-preview">
                      <Users className="media-icon" />
                      <div className="media-overlay">
                        <Camera className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Community Meetups</span>
                    <p className="media-description">Social networking events</p>
                  </div>
                  <div className="media-item">
                    <div className="media-preview">
                      <Lightbulb className="media-icon" />
                      <div className="media-overlay">
                        <FileText className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Innovation Labs</span>
                    <p className="media-description">Business development workshops</p>
                  </div>
                </div>
              </div>

              <div className="events-grid">
                {currentEvents.map((event) => (
                  <div key={event.id} className={`event-card ${event.category}`}>
                    <div className="event-header">
                      <div className="event-type">
                        <span className={`type-badge ${event.type}`}>{event.type}</span>
                        <span className={`tier-badge ${event.tierAccess}`}>
                          {event.tierAccess === 'core' ? 'Member rate' : event.tierAccess === 'supporter' ? 'Supporter perk' : event.price}
                        </span>
                      </div>
                    </div>
                    
                    <h3>{event.title}</h3>
                    <p className="event-programme">{event.programme}</p>
                    
                    <div className="event-details">
                      <div className="detail-row">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="detail-row">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="detail-row">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="detail-row">
                        <Users className="w-4 h-4" />
                        <span>{event.spots} spots available</span>
                      </div>
                    </div>
                    
                    <p className="event-description">{event.description}</p>
                    
                    <div className="event-actions">
                      <Link to="/membership" className="btn btn-primary">
                        Book Now
                      </Link>
                      <Link to="/programmes" className="btn btn-secondary">
                        Learn More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'programmes' && (
          <div>
            <section className="programmes-schedule-section">
              <h2>Programme Schedule</h2>
              <p className="section-description">
                Our three seasonal programmes run consecutively throughout the year, each lasting 8-12 weeks.
              </p>

              {/* Programme Schedule Media Section */}
              <div className="media-section schedule-media">
                <h3>Programme Journey</h3>
                <div className="media-masonry">
                  <div className="media-item">
                    <div className="media-preview spring">
                      <Music className="media-icon" />
                      <div className="media-overlay">
                        <Play className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Spring Recordings</span>
                    <p className="media-description">Trubble n Bass in action</p>
                  </div>
                  <div className="media-item">
                    <div className="media-preview summer">
                      <Palette className="media-icon" />
                      <div className="media-overlay">
                        <Camera className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Summer Creations</span>
                    <p className="media-description">Kaywana's Court projects</p>
                  </div>
                  <div className="media-item">
                    <div className="media-preview autumn">
                      <Lightbulb className="media-icon" />
                      <div className="media-overlay">
                        <FileText className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Autumn Innovation</span>
                    <p className="media-description">Bright Sparks developments</p>
                  </div>
                  <div className="media-item">
                    <div className="media-preview">
                      <Coffee className="media-icon" />
                      <div className="media-overlay">
                        <Camera className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Planning Sessions</span>
                    <p className="media-description">Community collaboration</p>
                  </div>
                </div>
              </div>

              <div className="programmes-timeline">
                {seasonalProgrammes.map((programme, index) => (
                  <div key={index} className={`programme-timeline-item ${programme.color}`}>
                    <div className="timeline-icon">
                      {programme.icon}
                    </div>
                    <div className="timeline-content">
                      <h3>{programme.name}</h3>
                      <div className="timeline-meta">
                        <span className="season">{programme.season}</span>
                        <span className="period">{programme.period}</span>
                        <span className="duration">{programme.weeks}</span>
                      </div>
                      <p>{programme.focus}</p>
                      <div className="next-start">
                        <strong>Next Start:</strong> {programme.nextStart}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'cultural' && (
          <div>
            <section className="cultural-calendar-section">
              <h2>Cultural Calendar</h2>
              <p className="section-description">
                Year-round celebration of heritage, family, and community milestones with special events and cultural programming.
              </p>

              {/* Cultural Events Media Section */}
              <div className="media-section cultural-media">
                <h3>Cultural Celebrations</h3>
                <div className="media-grid">
                  <div className="media-item">
                    <div className="media-preview heritage">
                      <Crown className="media-icon" />
                      <div className="media-overlay">
                        <Camera className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Heritage Events</span>
                    <p className="media-description">Celebrating our roots and history</p>
                  </div>
                  <div className="media-item">
                    <div className="media-preview family">
                      <Heart className="media-icon" />
                      <div className="media-overlay">
                        <Play className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Family Celebrations</span>
                    <p className="media-description">Special occasions and bonding</p>
                  </div>
                  <div className="media-item">
                    <div className="media-preview empowerment">
                      <Sparkles className="media-icon" />
                      <div className="media-overlay">
                        <FileText className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Empowerment Events</span>
                    <p className="media-description">Leadership and community building</p>
                  </div>
                </div>
              </div>

              <div className="cultural-events-grid">
                {culturalEvents.map((event) => (
                  <div key={event.id} className={`cultural-event-card ${event.category}`}>
                    <div className="cultural-header">
                      <h3>{event.title}</h3>
                      <div className="event-period">{event.period}</div>
                    </div>
                    
                    <p className="cultural-description">{event.description}</p>
                    
                    <div className="cultural-activities">
                      <h4>Activities Include:</h4>
                      <ul>
                        {event.activities.map((activity, idx) => (
                          <li key={idx}>
                            <CheckCircle className="w-4 h-4" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="tier-benefits">
                      <div className="tier-benefit core">
                        <h4>Core Member (£30/month)</h4>
                        <p>{event.tierBenefits.core}</p>
                      </div>
                      <div className="tier-benefit supporter">
                        <h4>Supporter Member (£45/month)</h4>
                        <p>{event.tierBenefits.supporter}</p>
                      </div>
                    </div>

                    <div className="cultural-actions">
                      <Link to="/membership" className="btn btn-primary">
                        Join for Access
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'year' && (
          <div>
            <section className="year-overview-section">
              <h2>Our 32-Week Year</h2>
              <p className="section-description">
                Three seasonal programmes plus planning periods, adapted to school holidays and community needs.
              </p>

              {/* Year Overview Media Section */}
              <div className="media-section year-media">
                <h3>Year-Round Community</h3>
                <div className="media-carousel">
                  <div className="media-item">
                    <div className="media-preview">
                      <Target className="media-icon" />
                      <div className="media-overlay">
                        <FileText className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Planning Phase</span>
                  </div>
                  <div className="media-item">
                    <div className="media-preview">
                      <Zap className="media-icon" />
                      <div className="media-overlay">
                        <Play className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Active Programmes</span>
                  </div>
                  <div className="media-item">
                    <div className="media-preview">
                      <Star className="media-icon" />
                      <div className="media-overlay">
                        <Camera className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Celebration Phase</span>
                  </div>
                  <div className="media-item">
                    <div className="media-preview">
                      <Heart className="media-icon" />
                      <div className="media-overlay">
                        <FileText className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Community Impact</span>
                  </div>
                </div>
              </div>

              <div className="year-phases">
                {yearOverview.map((phase, index) => (
                  <div key={index} className="phase-card">
                    <div className="phase-icon">
                      {phase.icon}
                    </div>
                    <div className="phase-content">
                      <h3>{phase.phase}</h3>
                      <div className="phase-period">{phase.period}</div>
                      <p>{phase.description}</p>
                      <div className="phase-activities">
                        <h4>Key Activities:</h4>
                        <ul>
                          {phase.activities.map((activity, idx) => (
                            <li key={idx}>
                              <CheckCircle className="w-4 h-4" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'involvement' && (
          <div>
            <section className="involvement-section">
              <h2>Get Involved</h2>
              <p className="section-description">
                Multiple ways to participate in our community, from drop-in sessions to full membership with cultural benefits.
              </p>

              {/* Involvement Media Section */}
              <div className="media-section involvement-media">
                <h3>Ways to Participate</h3>
                <div className="media-grid">
                  <div className="media-item">
                    <div className="media-preview">
                      <span className="media-icon">👋</span>
                      <div className="media-overlay">
                        <Play className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Drop-in Sessions</span>
                    <p className="media-description">Try before you commit</p>
                  </div>
                  <div className="media-item">
                    <div className="media-preview">
                      <span className="media-icon">🎯</span>
                      <div className="media-overlay">
                        <Camera className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Core Member</span>
                    <p className="media-description">Full programme + events access</p>
                  </div>
                  <div className="media-item">
                    <div className="media-preview">
                      <span className="media-icon">👑</span>
                      <div className="media-overlay">
                        <Sparkles className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Supporter Member</span>
                    <p className="media-description">Premium cultural experiences</p>
                  </div>
                  <div className="media-item">
                    <div className="media-preview">
                      <span className="media-icon">🌟</span>
                      <div className="media-overlay">
                        <FileText className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Community Leader</span>
                    <p className="media-description">Help shape our programmes</p>
                  </div>
                </div>
              </div>

              <div className="involvement-options">
                <div className="involvement-card explorer">
                  <div className="card-header">
                    <h3>Explorer</h3>
                    <div className="price">£5 per session</div>
                  </div>
                  <p>Try different activities without long-term commitment</p>
                  <ul>
                    <li><CheckCircle className="w-4 h-4" />Drop-in workshops</li>
                    <li><CheckCircle className="w-4 h-4" />Community events</li>
                    <li><CheckCircle className="w-4 h-4" />Basic materials provided</li>
                  </ul>
                  <Link to="/membership" className="btn btn-primary">Start Exploring</Link>
                </div>

                <div className="involvement-card member">
                  <div className="card-header">
                    <h3>Core Member</h3>
                    <div className="price">£30 per month</div>
                  </div>
                  <p>Full access to programmes with seasonal showcase events</p>
                  <ul>
                    <li><CheckCircle className="w-4 h-4" />All programme sessions</li>
                    <li><CheckCircle className="w-4 h-4" />Equipment access</li>
                    <li><CheckCircle className="w-4 h-4" />Community events</li>
                    <li><CheckCircle className="w-4 h-4" />Cultural celebrations</li>
                  </ul>
                  <Link to="/membership" className="btn btn-primary">Become a Member</Link>
                </div>

                <div className="involvement-card supporter">
                  <div className="card-header">
                    <h3>Supporter Member</h3>
                    <div className="price">£45 per month</div>
                  </div>
                  <p>Premium cultural experiences plus VIP access to special events</p>
                  <ul>
                    <li><CheckCircle className="w-4 h-4" />Everything in Core</li>
                    <li><CheckCircle className="w-4 h-4" />Coach trips included</li>
                    <li><CheckCircle className="w-4 h-4" />VIP event access</li>
                    <li><CheckCircle className="w-4 h-4" />Premium celebrations</li>
                    <li><CheckCircle className="w-4 h-4" />Guest privileges</li>
                  </ul>
                  <Link to="/membership" className="btn btn-primary">Join as Supporter</Link>
                </div>

                <div className="involvement-card leader">
                  <div className="card-header">
                    <h3>Community Builder</h3>
                    <div className="price">Sponsored placement</div>
                  </div>
                  <p>Leadership role helping run programmes while developing advanced skills</p>
                  <ul>
                    <li><CheckCircle className="w-4 h-4" />Leadership training</li>
                    <li><CheckCircle className="w-4 h-4" />Teaching experience</li>
                    <li><CheckCircle className="w-4 h-4" />Professional development</li>
                    <li><CheckCircle className="w-4 h-4" />Industry connections</li>
                  </ul>
                  <Link to="/get-started" className="btn btn-primary">Apply to Lead</Link>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Maya Integration */}
      <DraggableMaya 
        membershipTier={'visitor'} 
        pageType="community"
        pageContext={{
          title: "Community Calendar",
          section: "calendar",
          page: "calendar",
          actions: ['view_events', 'book_session', 'join_community']
        }}
      />
    </PageTemplate>
  );
};

export default CommunityCalendarPage;