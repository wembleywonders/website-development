// src/pages/CalendarPage.tsx
// UPDATED: Opportunities-focused calendar for insecure workers
// Heritage productions reframed as paid opportunities with exit pathways

import React, { useState } from 'react';
import { 
  Calendar, Clock, DollarSign, Users, Filter,
  Radio, Drama, Briefcase, Zap, MapPin, Video
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import './CalendarPage.css';

interface Opportunity {
  id: string;
  type: 'gig' | 'session' | 'production-role' | 'workshop' | 'drop-in';
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: 'online' | 'wembley' | 'flexible';
  skillsNeeded: string[];
  skillsYouGain: string[];
  compensation: string;
  commitment: 'one-off' | 'weekly' | 'project-based';
  flexibility: 'fixed' | 'flexible' | 'async';
  spotsAvailable: number;
  urgency: 'urgent' | 'open' | 'upcoming';
  exitPathways?: string[];
  project?: string;
}

interface Production {
  id: string;
  title: string;
  author: string;
  origin: string;
  type: 'radio-drama' | 'stage-performance' | 'musical-theatre';
  quarter: string;
  year: number;
  rolesNeeded: ProductionRole[];
  totalCompensationPool: string;
  rehearsalFlexibility: string;
  description: string;
}

interface ProductionRole {
  role: string;
  skills: string[];
  compensation: string;
  timeCommitment: string;
  flexibility: string;
  exitPathways: string[];
}

const CalendarPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'opportunities' | 'productions'>('opportunities');

  // This Week's Opportunities
  const opportunities: Opportunity[] = [
    {
      id: 'opp-1',
      type: 'drop-in',
      title: 'Benefits Check Drop-In',
      description: 'Get help checking what benefits and discounts you might be missing. No appointment needed.',
      date: 'Tomorrow',
      time: '2pm - 5pm',
      duration: '30 mins per person',
      location: 'wembley',
      skillsNeeded: [],
      skillsYouGain: ['Benefits navigation'],
      compensation: 'Free service',
      commitment: 'one-off',
      flexibility: 'flexible',
      spotsAvailable: 12,
      urgency: 'open'
    },
    {
      id: 'opp-2',
      type: 'gig',
      title: 'Event Photographer Needed',
      description: 'Cover the STEMgeneers Repair Café this Saturday. Bring your own phone or use our equipment.',
      date: 'Saturday',
      time: '11am - 3pm',
      duration: '4 hours',
      location: 'wembley',
      skillsNeeded: ['Basic photography'],
      skillsYouGain: ['Event photography', 'Photo editing'],
      compensation: '£60 + portfolio images',
      commitment: 'one-off',
      flexibility: 'fixed',
      spotsAvailable: 1,
      urgency: 'urgent',
      exitPathways: ['Events photography', 'Social media management'],
      project: 'STEMgeneers Repair Café'
    },
    {
      id: 'opp-3',
      type: 'session',
      title: 'Variable Income Budgeting Workshop',
      description: 'Budgeting that actually works when your hours change every week. Recording available after.',
      date: 'Wednesday',
      time: '7pm - 8:30pm',
      duration: '90 mins',
      location: 'online',
      skillsNeeded: [],
      skillsYouGain: ['Irregular income budgeting', 'Financial planning'],
      compensation: 'Free for members',
      commitment: 'one-off',
      flexibility: 'flexible',
      spotsAvailable: 25,
      urgency: 'open'
    },
    {
      id: 'opp-4',
      type: 'production-role',
      title: 'Voice Actor - "Lonely Londoners" Radio Drama',
      description: 'Multiple roles available. Record from home on your schedule. Trinidadian/Caribbean accent preferred.',
      date: 'Recording: Jan 15 - Feb 28',
      time: 'Your schedule',
      duration: '8-12 hours total',
      location: 'flexible',
      skillsNeeded: ['Clear speaking voice'],
      skillsYouGain: ['Voice acting', 'Script reading', 'Audio recording'],
      compensation: '£80-150 depending on role size',
      commitment: 'project-based',
      flexibility: 'async',
      spotsAvailable: 6,
      urgency: 'open',
      exitPathways: ['Audiobook narration', 'Voiceover work', 'Podcast hosting'],
      project: 'The Lonely Londoners'
    },
    {
      id: 'opp-5',
      type: 'gig',
      title: 'Food Photography - Recipe Archive',
      description: 'Photograph Caribbean dishes for our heritage recipe collection. Flexible scheduling.',
      date: 'Ongoing',
      time: 'Flexible',
      duration: '2-3 hours per session',
      location: 'wembley',
      skillsNeeded: ['Basic photography'],
      skillsYouGain: ['Food photography', 'Lighting', 'Photo editing'],
      compensation: '£40 per session + meal',
      commitment: 'project-based',
      flexibility: 'flexible',
      spotsAvailable: 2,
      urgency: 'open',
      exitPathways: ['Food photography', 'Restaurant marketing', 'Social media'],
      project: 'Caribbean Heritage Recipes'
    },
    {
      id: 'opp-6',
      type: 'workshop',
      title: 'Phone Repair Basics',
      description: 'Learn to fix common phone issues. Fix your own, then earn by fixing others.',
      date: 'Thursday',
      time: '6pm - 8pm',
      duration: '2 hours',
      location: 'wembley',
      skillsNeeded: [],
      skillsYouGain: ['Phone repair', 'Screen replacement', 'Battery replacement'],
      compensation: 'Free workshop + keep what you fix',
      commitment: 'one-off',
      flexibility: 'fixed',
      spotsAvailable: 8,
      urgency: 'open',
      exitPathways: ['Mobile repair technician', 'Side income from repairs']
    },
    {
      id: 'opp-7',
      type: 'gig',
      title: 'Audio Editor - Podcast Episode',
      description: 'Edit a 45-minute podcast interview. Work from home, flexible deadline.',
      date: 'Deadline: Next Friday',
      time: 'Your schedule',
      duration: '3-4 hours work',
      location: 'flexible',
      skillsNeeded: ['Basic audio editing', 'Audacity or similar'],
      skillsYouGain: ['Podcast editing', 'Audio cleanup'],
      compensation: '£45',
      commitment: 'one-off',
      flexibility: 'async',
      spotsAvailable: 1,
      urgency: 'urgent',
      exitPathways: ['Podcast production', 'Audio engineering'],
      project: 'Rayd-yo Weekly'
    },
    {
      id: 'opp-8',
      type: 'drop-in',
      title: 'CV & Portfolio Review',
      description: 'Get feedback on your CV or creative portfolio. Drop in anytime during hours.',
      date: 'Every Tuesday',
      time: '4pm - 7pm',
      duration: '20-30 mins',
      location: 'wembley',
      skillsNeeded: [],
      skillsYouGain: ['CV writing', 'Portfolio presentation'],
      compensation: 'Free service',
      commitment: 'one-off',
      flexibility: 'flexible',
      spotsAvailable: 10,
      urgency: 'open',
      exitPathways: ['Better job applications']
    }
  ];

  // Heritage Productions (reframed as paid opportunities)
  const productions: Production[] = [
    {
      id: 'prod-1',
      title: 'The Lonely Londoners',
      author: 'Sam Selvon',
      origin: '🇹🇹 Trinidad & Tobago',
      type: 'radio-drama',
      quarter: 'Q2',
      year: 2026,
      totalCompensationPool: '£1,200',
      rehearsalFlexibility: 'Record from home on your schedule',
      description: 'Radio serial following Caribbean immigrants in 1950s London. Record your parts when it suits you.',
      rolesNeeded: [
        {
          role: 'Voice Actor (Lead)',
          skills: ['Clear voice', 'Caribbean accent helpful'],
          compensation: '£120-150',
          timeCommitment: '10-12 hours over 6 weeks',
          flexibility: 'Fully flexible - record at home',
          exitPathways: ['Audiobook narration (£200-400/book)', 'Voiceover (£50-200/gig)', 'Podcast hosting']
        },
        {
          role: 'Voice Actor (Supporting)',
          skills: ['Clear voice'],
          compensation: '£60-80',
          timeCommitment: '4-6 hours over 4 weeks',
          flexibility: 'Fully flexible - record at home',
          exitPathways: ['Audiobook narration', 'Voiceover work']
        },
        {
          role: 'Audio Editor',
          skills: ['Audio editing software', 'Attention to detail'],
          compensation: '£150',
          timeCommitment: '15-20 hours over 4 weeks',
          flexibility: 'Fully flexible - work from home',
          exitPathways: ['Podcast production', 'Audio post-production', 'Radio production']
        },
        {
          role: 'Sound Designer',
          skills: ['Audio production', 'Sound effects'],
          compensation: '£200',
          timeCommitment: '20-25 hours over 6 weeks',
          flexibility: 'Mostly flexible with some collaboration sessions',
          exitPathways: ['Film/TV sound', 'Game audio', 'Advertising']
        },
        {
          role: 'Music Composer',
          skills: ['Music production', 'Understanding of Caribbean music'],
          compensation: '£250',
          timeCommitment: '15-20 hours over 4 weeks',
          flexibility: 'Fully flexible',
          exitPathways: ['Sync licensing', 'Production music', 'Scoring']
        }
      ]
    },
    {
      id: 'prod-2',
      title: 'A House for Mr Biswas',
      author: 'V.S. Naipaul',
      origin: '🇹🇹 Trinidad & Tobago',
      type: 'radio-drama',
      quarter: 'Q1',
      year: 2026,
      totalCompensationPool: '£1,500',
      rehearsalFlexibility: 'Mix of home recording and group sessions',
      description: '8-part radio drama. Larger cast = more roles at different commitment levels.',
      rolesNeeded: [
        {
          role: 'Voice Actor (Various)',
          skills: ['Clear voice', 'Indo-Caribbean accent helpful for some roles'],
          compensation: '£50-150 depending on role',
          timeCommitment: '4-15 hours depending on role',
          flexibility: 'Mix of home recording and optional group sessions',
          exitPathways: ['Audiobook narration', 'Voiceover', 'Acting']
        },
        {
          role: 'Script Adapter',
          skills: ['Writing', 'Understanding of radio drama format'],
          compensation: '£200',
          timeCommitment: '20-30 hours over 2 months',
          flexibility: 'Fully flexible with milestone deadlines',
          exitPathways: ['Screenwriting', 'Audio drama writing', 'Adaptation work']
        },
        {
          role: 'Production Assistant',
          skills: ['Organisation', 'Communication'],
          compensation: '£100',
          timeCommitment: '2-3 hours/week for 8 weeks',
          flexibility: 'Flexible with some fixed coordination tasks',
          exitPathways: ['Production management', 'Events coordination', 'Project management']
        }
      ]
    },
    {
      id: 'prod-3',
      title: 'The Dragon Can\'t Dance',
      author: 'Earl Lovelace',
      origin: '🇹🇹 Trinidad & Tobago',
      type: 'musical-theatre',
      quarter: 'Q4',
      year: 2026,
      totalCompensationPool: '£2,500',
      rehearsalFlexibility: 'Weekend rehearsals with some flexibility',
      description: 'Carnival street-theatre with live steelpan. Our biggest production - most roles and biggest payouts.',
      rolesNeeded: [
        {
          role: 'Performer (Lead)',
          skills: ['Stage presence', 'Movement', 'Some singing helpful'],
          compensation: '£200-300',
          timeCommitment: '6-8 hours/week for 10 weeks',
          flexibility: 'Weekend rehearsals, some flexibility',
          exitPathways: ['Theatre performance', 'Events entertainment', 'Corporate presenting']
        },
        {
          role: 'Performer (Ensemble)',
          skills: ['Willingness to learn', 'Movement'],
          compensation: '£100-150',
          timeCommitment: '4-5 hours/week for 8 weeks',
          flexibility: 'Weekend rehearsals',
          exitPathways: ['Theatre', 'Events', 'Dance']
        },
        {
          role: 'Steelpan Player',
          skills: ['Steelpan or willingness to learn'],
          compensation: '£150',
          timeCommitment: '3-4 hours/week for 8 weeks',
          flexibility: 'Rehearsals with some flexibility',
          exitPathways: ['Session musician', 'Events entertainment', 'Teaching']
        },
        {
          role: 'Costume Designer',
          skills: ['Sewing', 'Design sense', 'Carnival aesthetic understanding'],
          compensation: '£300 + materials budget',
          timeCommitment: '40-50 hours over 2 months',
          flexibility: 'Mostly flexible with fitting sessions',
          exitPathways: ['Costume design', 'Fashion', 'Events styling']
        },
        {
          role: 'Stage Manager',
          skills: ['Organisation', 'Communication', 'Problem-solving'],
          compensation: '£200',
          timeCommitment: '4-6 hours/week for 10 weeks',
          flexibility: 'Must attend rehearsals and performance',
          exitPathways: ['Production management', 'Events management', 'Theatre careers']
        },
        {
          role: 'Marketing/Promo',
          skills: ['Social media', 'Writing', 'Basic design'],
          compensation: '£150',
          timeCommitment: '3-4 hours/week for 8 weeks',
          flexibility: 'Fully flexible - work from anywhere',
          exitPathways: ['Social media management', 'Marketing roles', 'PR']
        }
      ]
    }
  ];

  const filterOptions = [
    { id: 'all', label: 'All Opportunities' },
    { id: 'urgent', label: '🔴 Urgent' },
    { id: 'flexible', label: '⏰ Flexible Schedule' },
    { id: 'paid', label: '💰 Paid' },
    { id: 'no-skills', label: '🆕 No Skills Required' },
    { id: 'online', label: '🏠 Work From Home' }
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'urgent') return opp.urgency === 'urgent';
    if (activeFilter === 'flexible') return opp.flexibility !== 'fixed';
    if (activeFilter === 'paid') return opp.compensation.includes('£');
    if (activeFilter === 'no-skills') return opp.skillsNeeded.length === 0;
    if (activeFilter === 'online') return opp.location === 'online' || opp.location === 'flexible';
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'gig': return <DollarSign className="type-icon" />;
      case 'session': return <Video className="type-icon" />;
      case 'production-role': return <Radio className="type-icon" />;
      case 'workshop': return <Users className="type-icon" />;
      case 'drop-in': return <MapPin className="type-icon" />;
      default: return <Calendar className="type-icon" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'gig': return 'Paid Gig';
      case 'session': return 'Session';
      case 'production-role': return 'Production Role';
      case 'workshop': return 'Workshop';
      case 'drop-in': return 'Drop-In';
      default: return type;
    }
  };

  return (
    <PageTemplate
      pageTitle="Opportunities"
      pageStrapline="Gigs, sessions, and paid roles — available now"
      pageGuide="Find ways to earn, learn, and contribute that fit YOUR schedule. Filter by what works for you."
      pageType="standard"
    >
      <div className="calendar-page">

        {/* View Toggle */}
        <div className="view-controls">
          <button 
            className={`view-btn ${viewMode === 'opportunities' ? 'active' : ''}`}
            onClick={() => setViewMode('opportunities')}
          >
            <Zap className="btn-icon" />
            This Week
          </button>
          <button 
            className={`view-btn ${viewMode === 'productions' ? 'active' : ''}`}
            onClick={() => setViewMode('productions')}
          >
            <Drama className="btn-icon" />
            Productions
          </button>
        </div>

        {viewMode === 'opportunities' ? (
          <>
            {/* Filters */}
            <div className="filter-bar">
              <Filter className="filter-icon" />
              <div className="filter-options">
                {filterOptions.map(filter => (
                  <button
                    key={filter.id}
                    className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgent Banner */}
            {opportunities.some(o => o.urgency === 'urgent') && (
              <div className="urgent-banner">
                <span className="urgent-icon">🔴</span>
                <span className="urgent-text">
                  <strong>{opportunities.filter(o => o.urgency === 'urgent').length} urgent opportunities</strong> — 
                  need someone this week
                </span>
              </div>
            )}

            {/* Opportunities Grid */}
            <section className="opportunities-section">
              <div className="opportunities-grid">
                {filteredOpportunities.map(opp => (
                  <div 
                    key={opp.id} 
                    className={`opportunity-card ${opp.urgency} ${opp.type}`}
                  >
                    <div className="opp-header">
                      <div className="opp-type">
                        {getTypeIcon(opp.type)}
                        <span>{getTypeLabel(opp.type)}</span>
                      </div>
                      {opp.urgency === 'urgent' && (
                        <span className="urgency-badge">Urgent</span>
                      )}
                    </div>

                    <h3 className="opp-title">{opp.title}</h3>
                    <p className="opp-description">{opp.description}</p>

                    <div className="opp-details">
                      <div className="detail-row">
                        <Calendar className="detail-icon" />
                        <span>{opp.date} • {opp.time}</span>
                      </div>
                      <div className="detail-row">
                        <Clock className="detail-icon" />
                        <span>{opp.duration}</span>
                      </div>
                      <div className="detail-row">
                        <MapPin className="detail-icon" />
                        <span className="location-tag">{opp.location}</span>
                        {opp.flexibility !== 'fixed' && (
                          <span className="flexibility-tag">{opp.flexibility}</span>
                        )}
                      </div>
                    </div>

                    {opp.compensation.includes('£') && (
                      <div className="opp-compensation">
                        <DollarSign className="comp-icon" />
                        <span>{opp.compensation}</span>
                      </div>
                    )}

                    {opp.skillsNeeded.length > 0 ? (
                      <div className="opp-skills">
                        <span className="skills-label">Skills needed:</span>
                        <div className="skills-tags">
                          {opp.skillsNeeded.map(skill => (
                            <span key={skill} className="skill-tag needed">{skill}</span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="opp-skills no-skills">
                        <span className="no-skills-badge">✓ No prior skills needed</span>
                      </div>
                    )}

                    {opp.skillsYouGain.length > 0 && (
                      <div className="opp-skills gain">
                        <span className="skills-label">You'll learn:</span>
                        <div className="skills-tags">
                          {opp.skillsYouGain.map(skill => (
                            <span key={skill} className="skill-tag gain">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {opp.exitPathways && opp.exitPathways.length > 0 && (
                      <div className="opp-exit">
                        <span className="exit-label">→ Exit paths:</span>
                        <span className="exit-paths">{opp.exitPathways.join(', ')}</span>
                      </div>
                    )}

                    <div className="opp-footer">
                      <span className="spots-left">
                        {opp.spotsAvailable} {opp.spotsAvailable === 1 ? 'spot' : 'spots'} available
                      </span>
                      <button className="apply-btn">
                        {opp.type === 'drop-in' ? 'Get Details' : 'Apply'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Productions View */}
            <section className="productions-section">
              <div className="productions-intro">
                <h2>Heritage Productions = Paid Opportunities</h2>
                <p>
                  We produce Caribbean literary classics as radio dramas and live performances. 
                  <strong>Every role is paid.</strong> Most can be done flexibly around your schedule.
                  And the skills you develop have real exit pathways to paid work.
                </p>
              </div>

              <div className="productions-list">
                {productions.map(production => (
                  <div key={production.id} className="production-card">
                    <div className="production-header">
                      <div className="production-meta">
                        <span className="production-quarter">{production.quarter} {production.year}</span>
                        <span className="production-origin">{production.origin}</span>
                        <span className="production-type">{production.type.replace('-', ' ')}</span>
                      </div>
                      <h3>{production.title}</h3>
                      <p className="production-author">by {production.author}</p>
                      <p className="production-description">{production.description}</p>
                      
                      <div className="production-highlights">
                        <div className="highlight">
                          <DollarSign className="highlight-icon" />
                          <span>Total pool: <strong>{production.totalCompensationPool}</strong></span>
                        </div>
                        <div className="highlight">
                          <Clock className="highlight-icon" />
                          <span>{production.rehearsalFlexibility}</span>
                        </div>
                      </div>
                    </div>

                    <div className="production-roles">
                      <h4>Roles Available ({production.rolesNeeded.length})</h4>
                      <div className="roles-grid">
                        {production.rolesNeeded.map((role, idx) => (
                          <div key={idx} className="role-card">
                            <div className="role-header">
                              <h5>{role.role}</h5>
                              <span className="role-pay">{role.compensation}</span>
                            </div>
                            <div className="role-details">
                              <p><strong>Time:</strong> {role.timeCommitment}</p>
                              <p><strong>Flexibility:</strong> {role.flexibility}</p>
                              <p><strong>Skills:</strong> {role.skills.join(', ')}</p>
                            </div>
                            <div className="role-exits">
                              <span className="exit-label">→ This leads to:</span>
                              <p>{role.exitPathways.join(' • ')}</p>
                            </div>
                            <button className="role-apply-btn">Express Interest</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Bottom CTA */}
        <section className="calendar-cta">
          <h2>Don't See What You're Looking For?</h2>
          <p>
            New opportunities are added weekly. Or tell us what skills you have — 
            we'll match you to upcoming projects.
          </p>
          <div className="cta-buttons">
            <Link to="/programmes" className="cta-btn secondary">
              <Briefcase className="btn-icon" />
              Browse Skills to Develop
            </Link>
            <Link to="/dashboard" className="cta-btn primary">
              <Users className="btn-icon" />
              Update Your Skills Profile
            </Link>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default CalendarPage;