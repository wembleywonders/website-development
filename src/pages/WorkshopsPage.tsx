import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSmartRouting } from '../hooks/useSmartRouting';
import { WelcomeBanner } from '../components/smart/WelcomeBanner';
import { useMayaStore } from '../stores/mayaStore';
import PageTemplate from '../components/PageTemplate';
import DraggableMaya from '../components/maya/DraggableMaya';
import { 
  Calendar, Clock, Users, MapPin, Star, Award, 
  Wrench, BookOpen, Lightbulb, Heart, Globe, Camera,
  Play, FileText, Coffee, Zap, Target, CheckCircle,
  AlertTriangle, Mic, PenTool, Cog, Building, Palette
} from 'lucide-react';
import './WorkshopsPage.css';

const WorkshopsPage: React.FC = () => {
  const mayaStore = useMayaStore();
  const smartRouting = useSmartRouting();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Maya context setup would go here when available
  }, [mayaStore]);

  const upcomingWorkshops = [
    {
      id: 'bid-writing-basics',
      title: 'Community Bid Writing',
      date: '2025-03-15',
      time: '10:00 AM - 1:00 PM',
      duration: '3 hours',
      instructor: 'Community Members',
      level: 'Beginner',
      memberPrice: 'Free',
      nonMemberPrice: '£15',
      maxParticipants: 8,
      spotsLeft: 3,
      description: 'Learn to write funding applications through real examples. We\'ll work on actual bids for community projects - this isn\'t theoretical training.',
      skills: ['Grant Writing', 'Project Planning', 'Budget Development', 'Research Skills'],
      equipment: 'Laptop recommended, templates provided',
      category: 'Community Skills',
      realityCheck: 'Expect to contribute to actual funding applications we submit. Skills learned through real community work.',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'podcast-production',
      title: 'Rayd-yo Content Creation',
      date: '2025-03-22',
      time: '2:00 PM - 5:00 PM',
      duration: '3 hours',
      instructor: 'Rayd-yo Team',
      level: 'All Levels',
      memberPrice: 'Free',
      nonMemberPrice: '£12',
      maxParticipants: 6,
      spotsLeft: 4,
      description: 'Create content for our community radio platform. Learn audio skills while contributing to programmes our 8,000 listeners actually hear.',
      skills: ['Audio Recording', 'Content Planning', 'Interview Techniques', 'Community Storytelling'],
      equipment: 'All equipment provided',
      category: 'Media Production',
      realityCheck: 'Content you create may be broadcast on Rayd-yo. This involves real community media work, not just practice sessions.',
      icon: <Mic className="w-5 h-5" />
    },
    {
      id: 'event-planning-basics',
      title: 'Community Event Organization',
      date: '2025-04-05',
      time: '10:00 AM - 2:00 PM',
      duration: '4 hours',
      instructor: 'Events Team',
      level: 'Beginner',
      memberPrice: '£5',
      nonMemberPrice: '£18',
      maxParticipants: 10,
      spotsLeft: 7,
      description: 'Plan and organize community events like "Wembley Wonderful Days" coach trips. Learn through preparing actual upcoming events.',
      skills: ['Event Planning', 'Budget Management', 'Risk Assessment', 'Volunteer Coordination'],
      equipment: 'Planning templates provided',
      category: 'Community Skills',
      realityCheck: 'You\'ll help plan real events that community members attend. Involves actual organizing work and follow-through commitments.',
      icon: <Calendar className="w-5 h-5" />
    }
  ];

  const workshopTypes = [
    {
      name: 'Try Before You Join',
      description: 'Sample skills from our seasonal programmes without full commitment',
      examples: 'Rayd-yo content creation, community event planning, basic electronics',
      pricing: 'Usually free for members, small fee for non-members',
      commitment: 'Single session, no follow-up required',
      icon: <Heart className="w-5 h-5" />
    },
    {
      name: 'Community Skills',
      description: 'Essential abilities for community organizing and participation',
      examples: 'Bid writing, meeting facilitation, volunteer coordination',
      pricing: 'Free to £5 for members, £10-£18 for non-members',
      commitment: 'Often leads to opportunities to use skills in real projects',
      icon: <Users className="w-5 h-5" />
    },
    {
      name: 'Programme Deep Dives',
      description: 'Advanced sessions for current programme participants',
      examples: 'Advanced audio production, specialized writing techniques',
      pricing: 'Usually free for programme participants',
      commitment: 'May include expectation to share knowledge with others',
      icon: <Target className="w-5 h-5" />
    }
  ];

  return (
    <PageTemplate
      pageTitle="Community Workshops"
      pageStrapline="Skills Through Practice"
      pageGuide="Learn specific skills through real community projects. Perfect for exploring programme content or contributing specialized abilities without full seasonal commitment."
      pageType="programmes"
      showMaya={true}
    >
      {smartRouting && smartRouting.welcomeMessage && <WelcomeBanner />}

      {/* Stats Overview */}
      <div className="workshops-stats">
        <div className="stat-item">
          <span className="stat-number">2-4</span>
          <span className="stat-label">Hours Each</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">Monthly</span>
          <span className="stat-label">Schedule</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">Real</span>
          <span className="stat-label">Community Work</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Wrench className="w-4 h-4" />
          Creative Links
        </button>
        <button 
          className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          <Calendar className="w-4 h-4" />
          Current Schedule
        </button>
        <button 
          className={`tab-button ${activeTab === 'types' ? 'active' : ''}`}
          onClick={() => setActiveTab('types')}
        >
          <BookOpen className="w-4 h-4" />
          Workshop Types
        </button>
        <button 
          className={`tab-button ${activeTab === 'membership' ? 'active' : ''}`}
          onClick={() => setActiveTab('membership')}
        >
          <Star className="w-4 h-4" />
          Membership Value
        </button>
      </nav>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div>
            {/* When Work Becomes Your Whole World - Human Version */}
            <section className="communal-autonomy-section">
              <h2>Has Work Become Your Whole World?</h2>
              <p className="section-description">
                Brings out the 'Better You'
              </p>

              <div className="autonomy-problem">
                <div className="problem-card human-problem">
                  <div className="problem-icon">
                    <Building className="w-8 h-8" />
                  </div>
                  <div className="problem-content">
                    <p>
                      You wake up, catch the train to your shift at Primark or that office in the West End, come home exhausted, and repeat. 
                      Somewhere along the way, you stopped being <em>you</em> - the person who makes your grandmother's curry recipe perfectly, 
                      who can fix anything with a paperclip, who used to write poetry. Now you're just "the shop assistant" or "admin support," 
                      even to yourself.
                    </p>
                    <p>
                      Your flat feels like a waiting room between shifts. You nod to neighbors in the hallway but don't really know them - 
                      maybe there's a language barrier, maybe you're both too tired, maybe you just assume you have nothing in common.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Break - Journey from Isolation to Connection */}
              <div className="journey-visual">
                <div className="journey-step isolation">
                  <div className="journey-icon">
                    <Building className="w-8 h-8" />
                  </div>
                  <span className="journey-label">Work Identity Only</span>
                </div>
                <div className="journey-arrow">→</div>
                <div className="journey-step transition">
                  <div className="journey-icon">
                    <Users className="w-8 h-8" />
                  </div>
                  <span className="journey-label">Community Workshop</span>
                </div>
                <div className="journey-arrow">→</div>
                <div className="journey-step connection">
                  <div className="journey-icon">
                    <Heart className="w-8 h-8" />
                  </div>
                  <span className="journey-label">Whole Self Valued</span>
                </div>
              </div>

              <div className="autonomy-solution">
                <h3>What if your whole self mattered?</h3>
                <div className="solution-grid human-solution">
                  <div className="solution-card cultural">
                    <Globe className="w-6 h-6" />
                    <h4>Your stories have power</h4>
                    <p>That recipe your mum taught you? The way you survived moving here with nothing? Your neighbors actually want to hear these stories over tea at Auntie Anansi's Kitchen, not because it's charity, but because your experience matters.</p>
                  </div>
                  
                  <div className="solution-card skills">
                    <Wrench className="w-6 h-6" />
                    <h4>You know more than you think</h4>
                    <p>You speak three languages, you've MacGyvered countless household fixes, you navigate complex family dynamics across continents. These aren't just "life skills" - they're expertise that others need. The STEM labs aren't just about learning; they're about sharing what you already know.</p>
                  </div>
                  
                  <div className="solution-card creative">
                    <Palette className="w-6 h-6" />
                    <h4>Remember who you were before survival mode?</h4>
                    <p>Maybe you sang in your church choir, wrote in journals, dreamed of starting a business. Silk Stilettos sessions aren't about becoming someone new - they're about dusting off parts of yourself that work buried.</p>
                  </div>
                  
                  <div className="solution-card community">
                    <Users className="w-6 h-6" />
                    <h4>Your neighbors aren't strangers - they're allies you haven't met yet</h4>
                    <p>That person struggling with English? You've been there. The single parent juggling everything? You get it. When you work together on community projects, those differences become superpowers, not barriers.</p>
                  </div>
                </div>
              </div>

              <div className="autonomy-message human-message">
                <div className="autonomy-icon">
                  <Heart className="w-8 h-8" />
                </div>
                <div className="autonomy-text">
                  <h3>You're not broken. You're not just surviving.</h3>
                  <p>
                    You're a whole person whose community needs exactly what you bring. Our workshops aren't about fixing you or teaching you to be someone else. 
                    They're about connecting the skills you already have with neighbors who value them, and discovering capabilities you'd forgotten you had.
                  </p>
                </div>
              </div>
            </section>

            {/* Creative Links */}
            <section className="creative-links-section">
              <h2>Creative Links</h2>
              <p className="section-description">
                Flows that go from Ideas to Impacts
              </p>

              {/* Creative Links Media Section */}
              <div className="media-section creative-links-media">
                <h3>From Your Skills to Community Outputs</h3>
                <div className="media-horizontal">
                  <div className="media-item">
                    <div className="media-preview">
                      <Lightbulb className="media-icon" />
                      <div className="media-overlay">
                        <Play className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Your Ideas</span>
                    <p className="media-description">Skills, interests, passions</p>
                  </div>
                  <div className="media-item">
                    <div className="media-preview">
                      <Wrench className="media-icon" />
                      <div className="media-overlay">
                        <Camera className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Workshop Labs</span>
                    <p className="media-description">Collaborative making spaces</p>
                  </div>
                  <div className="media-item">
                    <div className="media-preview">
                      <Star className="media-icon" />
                      <div className="media-overlay">
                        <FileText className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="media-label">Community Impact</span>
                    <p className="media-description">Visible outputs people use</p>
                  </div>
                </div>
              </div>

              <div className="impact-message">
                <div className="impact-icon">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="impact-text">
                  <h3>Your Contribution Becomes Community Value</h3>
                  <p>
                    Whatever skill you bring - cooking, coding, writing, performing - it transforms into 
                    recognizable community outputs. Every workshop session feeds into magazines, shows, 
                    products, festivals, or broadcasts that our 8,000+ community members experience.
                  </p>
                </div>
              </div>

              <div className="creative-links-grid">
                <div className="link-flow-card arts">
                  <div className="flow-header">
                    <Palette className="w-6 h-6" />
                    <h3>Silk Stilettos - Arts & Crafts Labs</h3>
                  </div>
                  <div className="flow-content">
                    <div className="flow-inputs">
                      <h4>What You Bring:</h4>
                      <ul>
                        <li>Design ideas, crafting skills</li>
                        <li>Food culture, storytelling</li>
                        <li>Fashion, visual arts</li>
                      </ul>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-outputs">
                      <h4>Community Outputs:</h4>
                      <ul>
                        <li><Link to="/programmes/techreneurs">Products for TECHreneurs shop</Link></li>
                        <li><Link to="/joystick">Joystick e-zine features</Link></li>
                        <li><Link to="/programmes">Kaywana's Court festivals</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-footer">
                    <Link to="/workshops" className="btn btn-primary">Explore Silk Stilettos</Link>
                  </div>
                </div>

                <div className="link-flow-card writing">
                  <div className="flow-header">
                    <PenTool className="w-6 h-6" />
                    <h3>Pageturners - Writing & Storytelling</h3>
                  </div>
                  <div className="flow-content">
                    <div className="flow-inputs">
                      <h4>What You Bring:</h4>
                      <ul>
                        <li>Stories, community journalism</li>
                        <li>Scriptwriting, research</li>
                        <li>Digital storytelling skills</li>
                      </ul>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-outputs">
                      <h4>Community Outputs:</h4>
                      <ul>
                        <li><Link to="/programmes">Scripts for Kaywana's Court</Link></li>
                        <li><Link to="/joystick">Joystick articles & features</Link></li>
                        <li><Link to="/raydyo">G-Tech Casters podcasts</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-footer">
                    <Link to="/workshops" className="btn btn-primary">Explore Pageturners</Link>
                  </div>
                </div>

                <div className="link-flow-card stem">
                  <div className="flow-header">
                    <Cog className="w-6 h-6" />
                    <h3>STEMgeneers - STEM & Innovation Labs</h3>
                  </div>
                  <div className="flow-content">
                    <div className="flow-inputs">
                      <h4>What You Bring:</h4>
                      <ul>
                        <li>Coding, robotics, AI interest</li>
                        <li>Repair skills, green tech</li>
                        <li>Problem-solving mindset</li>
                      </ul>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-outputs">
                      <h4>Community Outputs:</h4>
                      <ul>
                        <li><Link to="/programmes">Hackathon prototypes</Link></li>
                        <li><Link to="/programmes">Community innovation showcases</Link></li>
                        <li><Link to="/programmes">E-learning hub materials</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-footer">
                    <Link to="/workshops" className="btn btn-primary">Explore STEMgeneers</Link>
                  </div>
                </div>

                <div className="link-flow-card media">
                  <div className="flow-header">
                    <Mic className="w-6 h-6" />
                    <h3>Trubble n Bass - Media & Performance</h3>
                  </div>
                  <div className="flow-content">
                    <div className="flow-inputs">
                      <h4>What You Bring:</h4>
                      <ul>
                        <li>Audio skills, music passion</li>
                        <li>Performance, cosplay</li>
                        <li>Broadcasting interest</li>
                      </ul>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-outputs">
                      <h4>Community Outputs:</h4>
                      <ul>
                        <li><Link to="/raydyo">Rayd-yo broadcasts</Link></li>
                        <li><Link to="/programmes">Trubble n Bass events</Link></li>
                        <li><Link to="/programmes">Festival performances</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-footer">
                    <Link to="/workshops" className="btn btn-primary">Explore Trubble n Bass</Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div>
            <section className="upcoming-workshops-section">
              <h2>Current Workshop Schedule</h2>
              <p className="section-description">
                Next workshops during our active programming periods
              </p>

              <div className="workshops-grid">
                {upcomingWorkshops.map((workshop) => (
                  <div key={workshop.id} className={`workshop-card ${workshop.category.toLowerCase().replace(' ', '-')}`}>
                    <div className="workshop-header">
                      <div className="workshop-icon">
                        {workshop.icon}
                      </div>
                      <div className="workshop-meta">
                        <span className="workshop-category">{workshop.category}</span>
                        <span className="workshop-level">{workshop.level}</span>
                      </div>
                    </div>
                    
                    <h3>{workshop.title}</h3>
                    <p className="workshop-description">{workshop.description}</p>
                    
                    <div className="workshop-details">
                      <div className="detail-row">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(workshop.date).toLocaleDateString('en-GB', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="detail-row">
                        <Clock className="w-4 h-4" />
                        <span>{workshop.time} ({workshop.duration})</span>
                      </div>
                      <div className="detail-row">
                        <Users className="w-4 h-4" />
                        <span>Max {workshop.maxParticipants} participants</span>
                      </div>
                    </div>

                    <div className="reality-check">
                      <div className="reality-header">
                        <AlertTriangle className="w-4 h-4" />
                        <h4>What This Actually Means</h4>
                      </div>
                      <p className="reality-text">{workshop.realityCheck}</p>
                    </div>

                    <div className="workshop-pricing">
                      <div className="pricing-options">
                        <div className="price-option member">
                          <span className="price-label">Members:</span>
                          <span className="price-value">{workshop.memberPrice}</span>
                        </div>
                        <div className="price-option non-member">
                          <span className="price-label">Non-Members:</span>
                          <span className="price-value">{workshop.nonMemberPrice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="workshop-footer">
                      <div className="availability">
                        <span className="spots-left">{workshop.spotsLeft} spots available</span>
                      </div>
                      <Link to="/get-started" className="btn btn-primary">
                        Register Interest
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'types' && (
          <div>
            <section className="workshop-types-section">
              <h2>Types of Workshops We Offer</h2>
              <p className="section-description">
                Three distinct approaches to skills development and community participation.
              </p>

              <div className="types-grid">
                {workshopTypes.map((type, index) => (
                  <div key={index} className="type-card">
                    <div className="type-icon">
                      {type.icon}
                    </div>
                    <h3>{type.name}</h3>
                    <p>{type.description}</p>
                    <div className="type-details">
                      <div className="type-examples">
                        <strong>Examples:</strong> {type.examples}
                      </div>
                      <div className="type-pricing">
                        <strong>Pricing:</strong> {type.pricing}
                      </div>
                      <div className="type-commitment">
                        <strong>Commitment:</strong> {type.commitment}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'membership' && (
          <div>
            <section className="membership-value-section">
              <h2>Workshop Access & Membership</h2>
              <p className="section-description">
                Compare participation options and value for different commitment levels.
              </p>

              <div className="value-comparison">
                <div className="value-column members">
                  <h3>Members Get</h3>
                  <ul>
                    <li><CheckCircle className="w-4 h-4" />Free access to most workshops</li>
                    <li><CheckCircle className="w-4 h-4" />Priority booking for popular sessions</li>
                    <li><CheckCircle className="w-4 h-4" />Advanced workshops exclusive to members</li>
                    <li><CheckCircle className="w-4 h-4" />Opportunities to lead workshops sharing your skills</li>
                    <li><CheckCircle className="w-4 h-4" />Integration with seasonal programme participation</li>
                  </ul>
                  <div className="value-note">
                    <strong>Attending 2-3 workshops per year makes membership worthwhile financially, 
                    plus you get access to seasonal programmes and community events.</strong>
                  </div>
                </div>
                <div className="value-column non-members">
                  <h3>Non-Members Can</h3>
                  <ul>
                    <li><CheckCircle className="w-4 h-4" />Attend individual workshops for small fees (£10-£20)</li>
                    <li><CheckCircle className="w-4 h-4" />Try community participation before committing to membership</li>
                    <li><CheckCircle className="w-4 h-4" />Contribute specialized skills to community projects</li>
                    <li><CheckCircle className="w-4 h-4" />Access basic community skill development</li>
                  </ul>
                  <div className="membership-cta">
                    <Link to="/membership" className="btn btn-primary">Explore Membership Benefits</Link>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <section className="cta-section">
                <h2>Ready to Learn Through Real Community Work?</h2>
                <p>Choose workshops that match your interests and capacity for community contribution</p>
                <div className="cta-buttons">
                  <Link to="/get-started" className="btn btn-primary">Find Your Workshop Pathway</Link>
                  <Link to="/calendar" className="btn btn-secondary">View Full Schedule</Link>
                  <Link to="/programmes" className="btn btn-secondary">Explore Seasonal Programmes</Link>
                </div>
                <div className="cta-note">
                  <p>
                    Questions about workshop expectations or community involvement? 
                    Our pathway assessment helps match your interests with appropriate participation levels.
                  </p>
                </div>
              </section>
            </section>
          </div>
        )}
      </div>

      {/* Maya Integration */}
      {mayaStore && (
        <DraggableMaya 
          pageContext={{
            title: 'Community Workshops',
            section: 'programmes',
            page: 'workshops',
            actions: ['view_workshops', 'register_interest', 'join_membership']
          }} membershipTier={'visitor'}        />
      )}
    </PageTemplate>
  );
};

export default WorkshopsPage;