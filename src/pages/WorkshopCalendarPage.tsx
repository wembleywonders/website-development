// src/pages/WorkshopCalendarPage.tsx
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, Tag, Camera, Mic, BookOpen, Award } from 'lucide-react';
import PageTemplate from '../components/PageTemplate';
import DraggableMaya from '../components/maya/DraggableMaya';
import MediaSection from '../components/media/MediaSection';
import WorkshopCard from '../components/workshops/WorkshopCard';
import CalendarView from '../components/workshops/CalendarView';
import FilterPanel from '../components/workshops/FilterPanel';
import './WorkshopCalendarPage.css';

interface Workshop {
  id: string;
  title: string;
  category: '5C_Framework' | 'Cross_Platform' | 'Specialist';
  framework: 'CONNECT' | 'CREATE' | 'CULTIVATE' | 'COMPETE' | 'CELEBRATE';
  type: 'workshop' | 'programme' | 'event' | 'drop-in';
  duration: string;
  schedule: string;
  capacity: number;
  currentBookings: number;
  facilitator: string;
  requirements: string[];
  outcomes: string[];
  mediaOutputs: ('raydyo' | 'joystick' | 'portfolio' | 'showcase')[];
  staffNeeds: string[];
  shopIntegration?: string;
  description: string;
  nextSession?: Date;
  bookingUrl?: string;
  status: 'active' | 'full' | 'upcoming' | 'ended';
}

const WorkshopCalendarPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'grid' | 'calendar' | 'list'>('grid');
  const [selectedFramework, setSelectedFramework] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const workshops: Workshop[] = [
    // CONNECT Framework
    {
      id: 'gtech-podcasting',
      title: 'G-Tech Casters Podcasting 101',
      category: '5C_Framework',
      framework: 'CONNECT',
      type: 'workshop',
      duration: '4 weeks',
      schedule: 'Tuesdays 6-8pm',
      capacity: 12,
      currentBookings: 8,
      facilitator: 'Community Audio Team',
      requirements: ['Basic digital literacy', 'Own smartphone/laptop'],
      outcomes: ['Podcast episode creation', 'Audio editing skills', 'Rayd-yo submission'],
      mediaOutputs: ['raydyo', 'portfolio'],
      staffNeeds: ['Audio technician', 'Content coordinator'],
      shopIntegration: 'Recording equipment rental packages',
      description: 'Introduction to podcast creation, from concept to publication. Participants create content for Rayd-yo community radio.',
      nextSession: new Date('2025-10-01'),
      status: 'active'
    },
    {
      id: 'digital-storytelling',
      title: 'Digital Storytelling Tasters',
      category: '5C_Framework', 
      framework: 'CONNECT',
      type: 'drop-in',
      duration: '2 hour sessions',
      schedule: 'Saturdays 2-4pm monthly',
      capacity: 15,
      currentBookings: 6,
      facilitator: 'Storytelling Collective',
      requirements: ['None - all welcome'],
      outcomes: ['Digital story creation', 'Media literacy', 'Community voice development'],
      mediaOutputs: ['joystick', 'showcase'],
      staffNeeds: ['Workshop facilitator', 'Tech support volunteer'],
      description: 'Learn to tell your story through digital media. Perfect entry point for community media involvement.',
      nextSession: new Date('2025-09-28'),
      status: 'active'
    },

    // CREATE Framework
    {
      id: 'stemgeneers-coding',
      title: 'STEMgeneers Coding Labs',
      category: '5C_Framework',
      framework: 'CREATE',
      type: 'programme',
      duration: '8 weeks',
      schedule: 'Thursdays 6-9pm',
      capacity: 18,
      currentBookings: 15,
      facilitator: 'Tech Innovation Team',
      requirements: ['Basic computer skills', 'Commitment to full programme'],
      outcomes: ['Python programming', 'Web development basics', 'AI fundamentals', 'Portfolio projects'],
      mediaOutputs: ['portfolio', 'showcase', 'joystick'],
      staffNeeds: ['Lead developer', 'Assistant facilitator', 'Equipment manager'],
      shopIntegration: 'Coding starter kits, Raspberry Pi bundles',
      description: 'Comprehensive coding programme covering Python, web development, and AI basics through hands-on projects.',
      nextSession: new Date('2025-10-03'),
      status: 'active'
    },
    {
      id: 'makerspace-days',
      title: 'Makerspace Days',
      category: '5C_Framework',
      framework: 'CREATE',
      type: 'drop-in',
      duration: 'Full day',
      schedule: 'First Saturday monthly',
      capacity: 20,
      currentBookings: 12,
      facilitator: 'Makers Collective',
      requirements: ['Safety induction required'],
      outcomes: ['3D design', 'Prototyping skills', 'Maker community connection'],
      mediaOutputs: ['portfolio', 'joystick'],
      staffNeeds: ['Makerspace coordinator', 'Safety supervisor', '3D printing specialist'],
      shopIntegration: 'Maker supplies, 3D printing materials',
      description: 'Open access to makerspace facilities with guided project support and community collaboration.',
      nextSession: new Date('2025-10-05'),
      status: 'active'
    },

    // CULTIVATE Framework
    {
      id: 'elearning-creation',
      title: 'E-Learning Course Creation',
      category: '5C_Framework',
      framework: 'CULTIVATE', 
      type: 'programme',
      duration: '6 weeks',
      schedule: 'Wednesdays 7-9pm',
      capacity: 10,
      currentBookings: 7,
      facilitator: 'Education Innovation Team',
      requirements: ['Teaching/training experience preferred'],
      outcomes: ['Course design', 'Digital pedagogy', 'Platform creation', 'Assessment design'],
      mediaOutputs: ['portfolio', 'joystick'],
      staffNeeds: ['Education specialist', 'Platform administrator'],
      description: 'Learn to create and deliver effective online learning experiences for community education.',
      nextSession: new Date('2025-09-25'),
      status: 'active'
    },
    {
      id: 'community-organizing',
      title: 'Community Organising Skills',
      category: '5C_Framework',
      framework: 'CULTIVATE',
      type: 'workshop',
      duration: '3 weeks',
      schedule: 'Sundays 1-4pm',
      capacity: 16,
      currentBookings: 11,
      facilitator: 'Organizing Collective',
      requirements: ['Passion for community change'],
      outcomes: ['Campaign planning', 'Outreach strategies', 'Coalition building', 'Local action planning'],
      mediaOutputs: ['joystick', 'showcase'],
      staffNeeds: ['Experienced organizer', 'Communications coordinator'],
      description: 'Practical skills for effective community organizing and social change campaigns.',
      nextSession: new Date('2025-09-29'),
      status: 'active'
    },

    // COMPETE Framework
    {
      id: 'hackathons',
      title: 'Community Hackathons',
      category: '5C_Framework',
      framework: 'COMPETE',
      type: 'event',
      duration: '48 hours',
      schedule: 'Quarterly weekends',
      capacity: 40,
      currentBookings: 32,
      facilitator: 'Innovation Challenge Team',
      requirements: ['Basic coding knowledge helpful but not required'],
      outcomes: ['Working prototypes', 'Team collaboration', 'Pitch presentation', 'Community solutions'],
      mediaOutputs: ['showcase', 'raydyo', 'joystick'],
      staffNeeds: ['Event coordinator', 'Tech mentors', 'Catering coordinator', 'Documentation team'],
      shopIntegration: 'Hackathon starter packs, energy drinks, healthy snacks',
      description: 'Intensive collaborative events to solve local community challenges through technology and innovation.',
      nextSession: new Date('2025-10-18'),
      status: 'upcoming'
    },

    // CELEBRATE Framework  
    {
      id: 'impact-awards',
      title: 'Community Impact Awards',
      category: '5C_Framework',
      framework: 'CELEBRATE',
      type: 'event',
      duration: 'Evening event',
      schedule: 'Annual - December',
      capacity: 200,
      currentBookings: 45,
      facilitator: 'Events & Recognition Team',
      requirements: ['Community nomination or achievement'],
      outcomes: ['Community recognition', 'Impact showcasing', 'Network building', 'Inspiration sharing'],
      mediaOutputs: ['raydyo', 'joystick', 'showcase'],
      staffNeeds: ['Event manager', 'AV technician', 'Communications team', 'Volunteer coordinators'],
      shopIntegration: 'Awards ceremony tickets, celebration packages',
      description: 'Annual celebration recognizing outstanding community contributions and innovative solutions.',
      nextSession: new Date('2025-12-14'),
      status: 'upcoming'
    },

    // Cross-Platform Programmes
    {
      id: 'joystick-contributors',
      title: 'Joystick Contributor Workshops',
      category: 'Cross_Platform',
      framework: 'CREATE',
      type: 'workshop',
      duration: '4 weeks',
      schedule: 'Mondays 6:30-8:30pm',
      capacity: 12,
      currentBookings: 9,
      facilitator: 'Editorial Team',
      requirements: ['Writing samples', 'Commitment to publication'],
      outcomes: ['Editorial skills', 'Digital publishing', 'Community journalism', 'Content strategy'],
      mediaOutputs: ['joystick'],
      staffNeeds: ['Editor-in-chief', 'Design coordinator'],
      description: 'Training for community contributors to Joystick e-zine, covering writing, editing, and digital publishing.',
      nextSession: new Date('2025-09-30'),
      status: 'active'
    },
    {
      id: 'raydyo-training',
      title: 'Rayd-yo Audio Training',
      category: 'Cross_Platform',
      framework: 'CONNECT',
      type: 'programme',
      duration: '6 weeks',
      schedule: 'Fridays 7-9pm',
      capacity: 8,
      currentBookings: 6,
      facilitator: 'Radio Production Team',
      requirements: ['Voice confidence', 'Regular availability for shows'],
      outcomes: ['Live broadcasting', 'Audio production', 'Interview skills', 'Radio presenting'],
      mediaOutputs: ['raydyo'],
      staffNeeds: ['Radio producer', 'Sound engineer'],
      shopIntegration: 'Podcasting equipment, headphones',
      description: 'Comprehensive training for Rayd-yo community radio hosts and producers.',
      nextSession: new Date('2025-10-04'),
      status: 'active'
    }
  ];

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesFramework = selectedFramework === 'all' || workshop.framework === selectedFramework;
    const matchesType = selectedType === 'all' || workshop.type === selectedType;
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFramework && matchesType && matchesSearch;
  });

  return (
    <PageTemplate
      pageTitle="Workshop Calendar & Programme System"
      pageStrapline="Comprehensive 32-week calendar of workshops, programmes, and community events across our 5C Framework - Connect, Create, Cultivate, Compete, Celebrate"
      pageType="programmes"
      bannerConfig={{
        raydyo: {
          title: "Community Radio",
          subtitle: "Workshop Features",
          link: "/raydyo"
        },
        joystick: {
          title: "Digital Magazine",
          subtitle: "Programme Stories",
          link: "/joystick"
        }
      }}
    >
      <div className="workshop-calendar-content">
        
        {/* Workshop Documentation Media */}
        <MediaSection 
          allowedRoles={['staff', 'volunteer', 'facilitator']}
          contentType="workshop-documentation"
          placeholder="Document workshop sessions, participant achievements, and programme outcomes"
          layout="grid"
          autoArchive={true}
          title="Workshop Activity Feed"
          description="Live documentation of current workshops and programmes across all 5C Framework areas"
        />

        {/* Overview Statistics */}
        <section className="calendar-overview">
          <div className="overview-stats">
            <div className="stat-card">
              <span className="stat-number">{workshops.length}</span>
              <span className="stat-label">Active Programmes</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{workshops.reduce((sum, w) => sum + w.currentBookings, 0)}</span>
              <span className="stat-label">Current Participants</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">32</span>
              <span className="stat-label">Active Weeks/Year</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">5</span>
              <span className="stat-label">Framework Areas</span>
            </div>
          </div>
        </section>

        {/* Filter and View Controls */}
        <FilterPanel 
          selectedFramework={selectedFramework}
          selectedType={selectedType}
          searchTerm={searchTerm}
          onFrameworkChange={setSelectedFramework}
          onTypeChange={setSelectedType}
          onSearchChange={setSearchTerm}
          activeView={activeView}
          onViewChange={setActiveView}
        />

        {/* Main Content Area */}
        {activeView === 'grid' && (
          <section className="workshops-grid-view">
            <div className="workshops-grid">
              {filteredWorkshops.map(workshop => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}
            </div>
          </section>
        )}

        {activeView === 'calendar' && (
          <section className="workshops-calendar-view">
            <CalendarView workshops={filteredWorkshops} />
          </section>
        )}

        {activeView === 'list' && (
          <section className="workshops-list-view">
            <div className="workshops-list">
              {filteredWorkshops.map(workshop => (
                <div key={workshop.id} className="workshop-list-item">
                  <div className="workshop-list-header">
                    <h3>{workshop.title}</h3>
                    <span className={`framework-badge ${workshop.framework.toLowerCase()}`}>
                      {workshop.framework}
                    </span>
                  </div>
                  <div className="workshop-list-details">
                    <span><Clock size={16} /> {workshop.schedule}</span>
                    <span><Users size={16} /> {workshop.currentBookings}/{workshop.capacity}</span>
                    <span><MapPin size={16} /> {workshop.facilitator}</span>
                  </div>
                  <p>{workshop.description}</p>
                  <div className="workshop-list-outputs">
                    {workshop.mediaOutputs.map(output => (
                      <span key={output} className={`output-tag ${output}`}>
                        {output === 'raydyo' && <Mic size={12} />}
                        {output === 'joystick' && <BookOpen size={12} />}
                        {output === 'portfolio' && <Camera size={12} />}
                        {output === 'showcase' && <Award size={12} />}
                        {output}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Staff & Volunteer Recruitment */}
        <section className="staffing-needs">
          <h2>Current Staffing & Volunteer Opportunities</h2>
          <div className="staffing-grid">
            {workshops
              .filter(w => w.staffNeeds.length > 0)
              .map(workshop => (
                <div key={workshop.id} className="staffing-card">
                  <h4>{workshop.title}</h4>
                  <div className="staff-needs">
                    {workshop.staffNeeds.map(need => (
                      <span key={need} className="staff-need-tag">{need}</span>
                    ))}
                  </div>
                  <p>Framework: {workshop.framework}</p>
                </div>
              ))}
          </div>
        </section>

        {/* Shop Integration Opportunities */}
        <section className="shop-integration">
          <h2>Workshop Shop Integration</h2>
          <div className="shop-opportunities">
            {workshops
              .filter(w => w.shopIntegration)
              .map(workshop => (
                <div key={workshop.id} className="shop-opportunity">
                  <h4>{workshop.title}</h4>
                  <p>{workshop.shopIntegration}</p>
                  <span className="framework-connection">{workshop.framework}</span>
                </div>
              ))}
          </div>
        </section>

        {/* Content Production Pipeline */}
        <section className="content-pipeline">
          <h2>Content Production for Rayd-yo & Joystick</h2>
          <div className="pipeline-overview">
            <div className="pipeline-column">
              <h3><Mic size={20} /> Rayd-yo Content</h3>
              <ul>
                {workshops
                  .filter(w => w.mediaOutputs.includes('raydyo'))
                  .map(workshop => (
                    <li key={workshop.id}>{workshop.title}</li>
                  ))}
              </ul>
            </div>
            <div className="pipeline-column">
              <h3><BookOpen size={20} /> Joystick Content</h3>
              <ul>
                {workshops
                  .filter(w => w.mediaOutputs.includes('joystick'))
                  .map(workshop => (
                    <li key={workshop.id}>{workshop.title}</li>
                  ))}
              </ul>
            </div>
            <div className="pipeline-column">
              <h3><Award size={20} /> Showcase Content</h3>
              <ul>
                {workshops
                  .filter(w => w.mediaOutputs.includes('showcase'))
                  .map(workshop => (
                    <li key={workshop.id}>{workshop.title}</li>
                  ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Programme Outcomes Media */}
        <MediaSection 
          allowedRoles={['staff', 'volunteer', 'participant']}
          contentType="programme-outcomes"
          placeholder="Share completed projects, graduate showcases, and programme impacts"
          layout="masonry"
          autoArchive={true}
          title="Programme Success Stories"
          description="Celebrating completed projects and participant achievements across all framework areas"
        />
      </div>

      {/* Enhanced Maya Integration */}
      <DraggableMaya 
        membershipTier="visitor"
        pageType="programmes"
        pageContext={{
          title: "Workshop Calendar System",
          section: "programmes",
          contentType: "workshop-calendar"
        }}
      />
    </PageTemplate>
  );
};

export default WorkshopCalendarPage;