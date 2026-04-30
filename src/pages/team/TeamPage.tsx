import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSmartRouting } from '../../hooks/useSmartRouting';
import { WelcomeBanner } from '../../components/smart/WelcomeBanner';
import { useMayaStore } from '../../stores/mayaStore';
import PageTemplate from '../../components/PageTemplate';
import DraggableMaya from '../../components/maya/DraggableMaya';
import { 
  Users, Star, Award, Zap, Brain, Heart, Target, ArrowRight,
  Crown, Wrench, Shield, Stethoscope, Globe, Music, Drama,
  ChevronDown, ChevronUp, Filter, Lightbulb, BookOpen, Radio,
  Camera,
  Play,
  Mic,
  Trophy,
  TrendingUp,
  Code,
  Edit3,
  FileText,
  Calendar
} from 'lucide-react';
import './TeamPage.css';

interface WorkshopProgrammeFlow {
  workshop: string;
  programme: string;
  showcase: string;
  workshopIcon: React.ComponentType<any>;
  programmeIcon: React.ComponentType<any>;
  showcaseIcon: React.ComponentType<any>;
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  category: string;
  pathways: string[];
  personality: string;
  avatar: string;
  roleDescription: string;
  responsibilities: string[];
  developmentAreas: string[];
  facilitatedFlows: WorkshopProgrammeFlow[];
  specialtyColor: string;
}

const TeamPage: React.FC = () => {
  const { setMayaContext } = useMayaStore(); // ✅ Destructure only what we need
  const smartRouting = useSmartRouting();
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // ✅ FIXED: Remove mayaStore from dependency array to prevent infinite loop
  useEffect(() => {
    setMayaContext({
      context: 'team',
      data: {
        currentPage: 'Team & Facilitation',
        userInterest: 'team member roles and programme connections',
        availableFlows: ['workshop facilitation', 'programme leadership', 'showcase coordination'],
        nextSteps: ['Meet team members', 'See facilitation flows', 'Join programmes']
      }
    });
  }, []); // ✅ Empty dependency array - only run once on mount

  const filterTeam = (category: string) => {
    setActiveFilter(category);
    setExpandedCard(null);
  };

  const toggleDetails = (memberId: string) => {
    setExpandedCard(expandedCard === memberId ? null : memberId);
  };

  const teamMembers: TeamMember[] = [
    {
      id: 'ayo',
      name: 'Ayo',
      position: 'Community Integration Specialist',
      category: 'Connect',
      pathways: ['general', 'stemgeneers', 'techpreneurs'],
      personality: 'Energetic networker with infectious enthusiasm for bringing people together',
      avatar: '🌟',
      specialtyColor: '#06b6d4',
      roleDescription: 'Facilitates welcome workshops and community integration programmes. Guides new members from initial workshops through to programme participation and showcase opportunities.',
      responsibilities: [
        'Facilitates "Get Started" workshops twice weekly',
        'Leads community integration sessions',
        'Coordinates pathway planning workshops',
        'Manages new member showcase introductions'
      ],
      developmentAreas: [
        'Public speaking confidence building',
        'Leadership pathway guidance skills', 
        'Advanced networking techniques',
        'Community advocacy training'
      ],
      facilitatedFlows: [
        {
          workshop: 'Welcome & Orientation Workshops',
          programme: 'Community Integration Programme',
          showcase: 'New Member Spotlight on Rayd-yo',
          workshopIcon: Users,
          programmeIcon: Heart,
          showcaseIcon: Radio
        },
        {
          workshop: 'Networking Skills Workshops',
          programme: 'Community Connections Programme',
          showcase: 'Partnership Showcase Events',
          workshopIcon: Target,
          programmeIcon: Globe,
          showcaseIcon: Star
        }
      ]
    },
    {
      id: 'lani',
      name: 'Lani',
      position: 'Pathway Navigation Specialist',
      category: 'Connect',
      pathways: ['general', 'stemgeneers', 'techpreneurs'],
      personality: 'Calm strategist with exceptional listening skills and pathway insight',
      avatar: '🧭',
      specialtyColor: '#06b6d4',
      roleDescription: 'Guides community members through programme selection and personal development planning. Helps people understand how different workshops connect to programmes and showcase opportunities.',
      responsibilities: [
        'Individual pathway planning sessions',
        'Skills assessment workshops',
        'Progress tracking consultations',
        'Goal-setting and achievement planning'
      ],
      developmentAreas: [
        'Strategic thinking development',
        'Advanced decision-making frameworks',
        'Time management optimization',
        'Self-advocacy skill building'
      ],
      facilitatedFlows: [
        {
          workshop: 'Skills Assessment Workshops',
          programme: 'Personal Development Planning',
          showcase: 'Progress Portfolio Reviews',
          workshopIcon: Target,
          programmeIcon: BookOpen,
          showcaseIcon: Award
        },
        {
          workshop: 'Goal Setting Workshops',
          programme: 'Achievement Tracking Programme',
          showcase: 'Success Story Features',
          workshopIcon: Lightbulb,
          programmeIcon: TrendingUp,
          showcaseIcon: Star
        }
      ]
    },
    {
      id: 'chen',
      name: 'Dr. Chen',
      position: 'Technical Development Specialist',
      category: 'Create',
      pathways: ['stemgeneers'],
      personality: 'Methodical engineer who builds expertise systematically and loves problem-solving',
      avatar: '⚙️',
      specialtyColor: '#10b981',
      roleDescription: 'Leads STEM workshops and engineering project guidance. Takes participants from basic technical workshops through STEMgeneers programme to innovation showcases and competitions.',
      responsibilities: [
        'STEM workshop facilitation (coding, robotics)',
        'STEMgeneers programme leadership',
        'Technical project mentorship',
        'Innovation showcase coordination'
      ],
      developmentAreas: [
        'Advanced engineering problem-solving',
        'Technical project management',
        'Innovation methodology mastery',
        'Collaborative development leadership'
      ],
      facilitatedFlows: [
        {
          workshop: 'Coding & Programming Workshops',
          programme: 'STEMgeneers Innovation Labs',
          showcase: 'Hackathon Competitions',
          workshopIcon: Code,
          programmeIcon: Lightbulb,
          showcaseIcon: Award
        },
        {
          workshop: 'Robotics & Maker Workshops',
          programme: 'STEMgeneers Engineering Projects',
          showcase: 'Innovation Exhibition',
          workshopIcon: Wrench,
          programmeIcon: Brain,
          showcaseIcon: Trophy
        }
      ]
    },
    {
      id: 'nova',
      name: 'Nova',
      position: 'Innovation & Creativity Specialist',
      category: 'Create',
      pathways: ['stemgeneers', 'techpreneurs'],
      personality: 'Bold experimenter who turns wild ideas into working prototypes',
      avatar: '💡',
      specialtyColor: '#10b981',
      roleDescription: 'Facilitates innovation workshops and creative problem-solving sessions. Bridges STEM workshops to both STEMgeneers and TECHpreneurs programmes, leading to prototype showcases.',
      responsibilities: [
        'Innovation methodology workshops',
        'Creative problem-solving sessions',
        'Prototype development support',
        'Design thinking facilitation'
      ],
      developmentAreas: [
        'Creative confidence amplification',
        'Rapid prototyping mastery',
        'Advanced innovation frameworks',
        'Risk-taking in supportive environments'
      ],
      facilitatedFlows: [
        {
          workshop: 'Innovation & Design Workshops',
          programme: 'STEMgeneers Prototype Labs',
          showcase: 'Innovation Awards',
          workshopIcon: Lightbulb,
          programmeIcon: Brain,
          showcaseIcon: Award
        },
        {
          workshop: 'Creative Problem-Solving Workshops',
          programme: 'TECHpreneurs Innovation Track',
          showcase: 'Startup Pitch Competitions',
          workshopIcon: Target,
          programmeIcon: Zap,
          showcaseIcon: Star
        }
      ]
    },
    {
      id: 'selene',
      name: 'Selene',
      position: 'Strategy & Business Development Specialist',
      category: 'Cultivate',
      pathways: ['techpreneurs'],
      personality: 'Strategic thinker with sharp business acumen and market insight',
      avatar: '📊',
      specialtyColor: '#f59e0b',
      roleDescription: 'Leads business skills workshops and entrepreneurship development. Takes participants from business basics workshops through TECHpreneurs programme to market showcase opportunities.',
      responsibilities: [
        'Business skills workshops (strategy, planning)',
        'TECHpreneurs programme leadership',
        'Entrepreneurship mentorship',
        'Market showcase coordination'
      ],
      developmentAreas: [
        'Advanced strategic thinking',
        'Business model innovation',
        'Market research excellence',
        'Financial planning expertise'
      ],
      facilitatedFlows: [
        {
          workshop: 'Business Strategy Workshops',
          programme: 'TECHpreneurs Business Development',
          showcase: 'Business Plan Competitions',
          workshopIcon: Target,
          programmeIcon: Zap,
          showcaseIcon: Award
        },
        {
          workshop: 'Entrepreneurship Skills Workshops',
          programme: 'TECHpreneurs Startup Incubator',
          showcase: 'Community Market Stalls',
          workshopIcon: Lightbulb,
          programmeIcon: TrendingUp,
          showcaseIcon: Star
        }
      ]
    },
    {
      id: 'amara',
      name: 'Amara',
      position: 'Knowledge & Culture Specialist',
      category: 'Cultivate',
      pathways: ['general', 'pageturners'],
      personality: 'Wise storyteller who preserves wisdom and creates learning experiences',
      avatar: '📚',
      specialtyColor: '#f59e0b',
      roleDescription: 'Facilitates writing and storytelling workshops that connect to Pageturners programme and community publications. Bridges creative expression to community showcase platforms.',
      responsibilities: [
        'Creative writing workshops',
        'Storytelling and communication sessions',
        'Pageturners programme coordination',
        'Community publication showcases'
      ],
      developmentAreas: [
        'Advanced storytelling techniques',
        'Cultural preservation methods',
        'Mentorship skill development',
        'Knowledge documentation systems'
      ],
      facilitatedFlows: [
        {
          workshop: 'Creative Writing Workshops',
          programme: 'Pageturners Literary Programme',
          showcase: 'Joystick E-zine Publications',
          workshopIcon: Edit3,
          programmeIcon: BookOpen,
          showcaseIcon: FileText
        },
        {
          workshop: 'Storytelling & Performance Workshops',
          programme: 'Kaywana\'s Court Theatre',
          showcase: 'Community Performance Nights',
          workshopIcon: Drama,
          programmeIcon: Users,
          showcaseIcon: Star
        }
      ]
    },
    {
      id: 'jax',
      name: 'Jax',
      position: 'Performance & Challenge Specialist',
      category: 'Compete',
      pathways: ['general', 'competitions'],
      personality: 'Competitive motivator with infectious energy for excellence',
      avatar: '🎯',
      specialtyColor: '#ef4444',
      roleDescription: 'Organizes performance workshops, competitions, and challenge events. Creates pathways from skill-building workshops to competitive programmes and public showcases.',
      responsibilities: [
        'Performance skills workshops',
        'Competition preparation sessions',
        'Challenge event coordination',
        'Excellence recognition programmes'
      ],
      developmentAreas: [
        'Competitive excellence mindset',
        'Team performance optimization',
        'Pressure management techniques',
        'Resilience and persistence training'
      ],
      facilitatedFlows: [
        {
          workshop: 'Performance Skills Workshops',
          programme: 'Kaywana\'s Court Challenges',
          showcase: 'Community Performance Competitions',
          workshopIcon: Target,
          programmeIcon: Trophy,
          showcaseIcon: Award
        },
        {
          workshop: 'Challenge Preparation Workshops',
          programme: 'Skills Competition Programme',
          showcase: 'Regional Competition Entries',
          workshopIcon: Zap,
          programmeIcon: Brain,
          showcaseIcon: Star
        }
      ]
    },
    {
      id: 'zee',
      name: 'Zee',
      position: 'Media & Communications Specialist',
      category: 'Celebrate',
      pathways: ['media', 'communications'],
      personality: 'Charismatic storyteller who amplifies achievements and builds community voice',
      avatar: '🎤',
      specialtyColor: '#8b5cf6',
      roleDescription: 'Leads media workshops and communications training. Connects participants from media skills workshops to broadcasting programmes and community showcase platforms.',
      responsibilities: [
        'Media production workshops (podcast, video)',
        'Communications skills training',
        'Rayd-yo broadcast programme coordination',
        'Community media showcase management'
      ],
      developmentAreas: [
        'Advanced media production techniques',
        'Public speaking mastery',
        'Personal branding development',
        'Community advocacy excellence'
      ],
      facilitatedFlows: [
        {
          workshop: 'Podcast & Audio Workshops',
          programme: 'Rayd-yo Broadcasting Programme',
          showcase: 'Community Radio Shows',
          workshopIcon: Radio,
          programmeIcon: Mic,
          showcaseIcon: Star
        },
        {
          workshop: 'Media Production Workshops',
          programme: 'Community Media Programme',
          showcase: 'Festival Documentation',
          workshopIcon: Camera,
          programmeIcon: Play,
          showcaseIcon: Award
        }
      ]
    }
  ];

  const filteredMembers = teamMembers.filter(member => {
    if (activeFilter === 'all') return true;
    return member.pathways.includes(activeFilter);
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Connect': '#06b6d4',
      'Create': '#10b981', 
      'Cultivate': '#f59e0b',
      'Compete': '#ef4444',
      'Celebrate': '#8b5cf6'
    };
    return colors[category] || '#06b6d4';
  };

  const renderWorkshopFlow = (flow: WorkshopProgrammeFlow, memberColor: string) => (
    <div className="workshop-flow" key={`${flow.workshop}-${flow.programme}`}>
      <div className="flow-step workshop-step">
        <flow.workshopIcon className="flow-icon" />
        <div className="flow-content">
          <span className="flow-label">Workshop</span>
          <span className="flow-title">{flow.workshop}</span>
        </div>
      </div>
      
      <ArrowRight className="flow-arrow" />
      
      <div className="flow-step programme-step">
        <flow.programmeIcon className="flow-icon" />
        <div className="flow-content">
          <span className="flow-label">Programme</span>
          <span className="flow-title">{flow.programme}</span>
        </div>
      </div>
      
      <ArrowRight className="flow-arrow" />
      
      <div className="flow-step showcase-step">
        <flow.showcaseIcon className="flow-icon" />
        <div className="flow-content">
          <span className="flow-label">Showcase</span>
          <span className="flow-title">{flow.showcase}</span>
        </div>
      </div>
    </div>
  );

  return (
    <PageTemplate
      pageTitle="Team Members & Facilitation"
      pageStrapline="Workshop Leaders & Programme Coordinators"
      pageGuide="Meet our team members who facilitate workshops, lead programmes, and coordinate showcases. See how each specialist connects learning opportunities to community achievements."
      pageType="community"
      showMaya={true}
    >
      {smartRouting && smartRouting.hasHighConfidenceSuggestion && <WelcomeBanner />}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Our Facilitation Team</h1>
          <p className="hero-subtitle">
            Meet the specialists who guide your journey from workshops to programmes to community showcases. 
            Our team combines professional expertise with AI coordination to ensure every member gets the support they need.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">Specialist Facilitators</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20+</span>
              <span className="stat-label">Workshop Types</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Showcase Platforms</span>
            </div>
          </div>
        </div>
      </section>

      <div className="page-container">
        {/* Executive Management Team */}
        <section className="management-section">
          <h2 className="section-title">Executive Management Team</h2>
          <div className="management-grid">
            <div className="management-card">
              <div className="member-avatar">
                <Crown className="w-8 h-8" />
              </div>
              <h3 className="member-name">Judith Fontanelle</h3>
              <p className="member-position">Director of Community Engagement</p>
              <p className="member-description">
                20+ years stakeholder engagement. Oversees all workshop-to-showcase pathways 
                and ensures democratic community participation in programme development.
              </p>
            </div>
            
            <div className="management-card">
              <div className="member-avatar">
                <Wrench className="w-8 h-8" />
              </div>
              <h3 className="member-name">Claude Fontanelle</h3>
              <p className="member-position">Organiser/Tech Developer</p>
              <p className="member-description">
                Technology infrastructure and platform development. Ensures seamless connections 
                between workshop bookings, programme tracking, and showcase coordination systems.
              </p>
            </div>
            
            <div className="management-card">
              <div className="member-avatar">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="member-name">Flora Agba</h3>
              <p className="member-position">Health & Safety Advisor</p>
              <p className="member-description">
                Professional compliance across all workshops and programmes. Ensures safety standards 
                from basic workshops through to public showcase events and competitions.
              </p>
            </div>
            
            <div className="management-card">
              <div className="member-avatar">
                <Stethoscope className="w-8 h-8" />
              </div>
              <h3 className="member-name">Michael Franklin</h3>
              <p className="member-position">Healthcare Professional</p>
              <p className="member-description">
                Healthcare sector expertise. Connects health-focused workshops to professional 
                development programmes and sector-specific showcase opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Maya Technical Director */}
        <section className="maya-section">
          <div className="maya-card">
            <div className="maya-avatar">
              <Globe className="w-12 h-12" />
              <span className="ai-badge">AI</span>
            </div>
            <h2 className="maya-title">Maya</h2>
            <p className="maya-role">Technical Director & Coordination Lead</p>
            <p className="maya-description">
              AI-powered coordination between team members, tracking participant progress from workshops 
              through programmes to showcases. Maya ensures optimal pathways and manages scheduling 
              across all facilitation activities.
            </p>
            
            <div className="maya-capabilities">
              <div className="capability-card">
                <div className="capability-icon">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="capability-title">Pathway Coordination</h4>
                <p className="capability-description">
                  Manages workshop → programme → showcase flows and optimizes member progression pathways
                </p>
              </div>
              <div className="capability-card">
                <div className="capability-icon">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="capability-title">Progress Tracking</h4>
                <p className="capability-description">
                  Monitors individual progress and connects members with appropriate specialists and opportunities
                </p>
              </div>
              <div className="capability-card">
                <div className="capability-icon">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="capability-title">Team Coordination</h4>
                <p className="capability-description">
                  Coordinates between facilitators to ensure seamless handoffs and comprehensive support
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Focus Filter */}
        <section className="filter-section">
          <h2 className="section-title">Specialist Facilitators</h2>
          <p className="filter-subtitle">Each team member facilitates workshops that connect to programmes and lead to community showcases</p>
          <div className="filter-container">
            <div className="filter-icon">
              <Filter className="w-5 h-5" />
            </div>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} 
                onClick={() => filterTeam('all')}
              >
                All Facilitators
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'stemgeneers' ? 'active' : ''}`} 
                onClick={() => filterTeam('stemgeneers')}
              >
                STEMgeneers Pathway
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'techpreneurs' ? 'active' : ''}`} 
                onClick={() => filterTeam('techpreneurs')}
              >
                TECHpreneurs Pathway
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'general' ? 'active' : ''}`} 
                onClick={() => filterTeam('general')}
              >
                General Community
              </button>
            </div>
          </div>
        </section>

        {/* Team Members Grid */}
        <section className="team-section">
          <div className="team-grid">
            {filteredMembers.map((member) => (
              <div 
                key={member.id}
                className={`team-card ${expandedCard === member.id ? 'expanded' : ''}`}
                style={{ '--category-color': getCategoryColor(member.category), '--member-color': member.specialtyColor } as React.CSSProperties}
              >
                <div className="team-header">
                  <span className="team-avatar">{member.avatar}</span>
                  <div className="team-info">
                    <h3 className="team-name">{member.name}</h3>
                    <p className="team-position">{member.position}</p>
                    <div className="team-badges">
                      <span className="category-badge">{member.category} Team</span>
                      <span className="pathway-badge">{member.pathways.length} Pathways</span>
                    </div>
                  </div>
                </div>
                
                <p className="team-personality">"{member.personality}"</p>
                
                {/* Workshop to Programme Flows */}
                <div className="facilitation-flows">
                  <h4 className="flows-title">Facilitation Pathways</h4>
                  {member.facilitatedFlows.map(flow => renderWorkshopFlow(flow, member.specialtyColor))}
                </div>
                
                <button 
                  className="expand-details" 
                  onClick={() => toggleDetails(member.id)}
                  aria-expanded={expandedCard === member.id}
                >
                  {expandedCard === member.id ? (
                    <>
                      Hide Full Profile
                      <ChevronUp className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      View Full Profile
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
                
                {expandedCard === member.id && (
                  <div className="team-details">
                    <div className="role-focus">
                      <h4>Team Role & Focus</h4>
                      <p>{member.roleDescription}</p>
                    </div>
                    
                    <div className="specialties-grid">
                      <div className="specialty-section">
                        <h5>Current Responsibilities</h5>
                        <ul className="specialty-list">
                          {member.responsibilities.map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="specialty-section">
                        <h5>Development Focus Areas</h5>
                        <ul className="specialty-list">
                          {member.developmentAreas.map((area, index) => (
                            <li key={index}>{area}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="team-cta">
          <div className="cta-content">
            <h2>Ready to Work With Our Team?</h2>
            <p>Our facilitators are here to guide you from your first workshop through to community showcases and recognition.</p>
            <div className="cta-buttons">
              <Link to="/workshops" className="btn btn-primary">
                <BookOpen className="btn-icon" />
                Browse Workshops
              </Link>
              <Link to="/programmes" className="btn btn-secondary">
                <Users className="btn-icon" />
                Explore Programmes
              </Link>
              <Link to="/calendar" className="btn btn-secondary">
                <Calendar className="btn-icon" />
                View Schedule
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Maya Integration */}
      <DraggableMaya 
        membershipTier="visitor"
        pageType="community"
        pageContext={{
          title: "Team Members & Facilitation",
          section: "team",
          contentType: "facilitation-flows",
          page: 'team',
          actions: ['meet_facilitators', 'see_workshop_flows', 'join_programmes', 'contact_specialists'],
          data: {
            totalFacilitators: teamMembers.length,
            workshopTypes: 20,
            showcasePlatforms: 6
          }
        }}
      />
    </PageTemplate>
  );
};

export default TeamPage;