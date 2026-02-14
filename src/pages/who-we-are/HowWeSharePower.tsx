import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSmartRouting } from '../../hooks/useSmartRouting';
import { WelcomeBanner } from '../../components/smart/WelcomeBanner';
import { useMayaStore } from '../../stores/mayaStore';
import PageTemplate from '../../components/PageTemplate';
import DraggableMaya from '../../components/maya/DraggableMaya';
import { 
  Users, Vote, Scale, Target, Crown, FileText, 
  Calendar, Award, Shield, CheckCircle, ArrowRight,
  MessageSquare, TrendingUp, UserCheck, Settings
} from 'lucide-react';
import './HowWeSharePower.css';

const HowWeSharePower: React.FC = () => {
  const mayaStore = useMayaStore();
  const smartRouting = useSmartRouting();
  const [activeSection, setActiveSection] = useState('principles');

  useEffect(() => {
    // Maya context setup for power sharing page
  }, [mayaStore]);

  const principles = [
    {
      icon: Settings,
      title: "Work Creates Voice",
      description: "People actively contributing to community projects - organizing events, creating content, managing programmes - naturally gain more influence over how those areas develop."
    },
    {
      icon: Vote,
      title: "Transparent Decision-Making", 
      description: "Major decisions happen at our Annual General Meeting with clear processes. Day-to-day choices are made by people doing the work, with accountability to the whole community."
    },
    {
      icon: FileText,
      title: "Open Financial Management",
      description: "Budgets, revenue, and spending are transparent to members. Community Investment decisions involve member input on priorities and resource allocation."
    },
    {
      icon: Crown,
      title: "Earned Leadership",
      description: "Leadership roles go to people who demonstrate commitment through contribution, with clear pathways from participation to organizing to governance responsibilities."
    }
  ];

  const decisionLevels = [
    {
      title: "Day-to-Day Operations",
      description: "People organizing workshops, managing programmes, or coordinating events make practical decisions about how to deliver what the community has agreed to support.",
      examples: ["Workshop schedules", "Event logistics", "Content creation", "Volunteer coordination"]
    },
    {
      title: "Programme Development", 
      description: "New programme ideas, changes to existing offerings, and resource allocation for activities are discussed among active participants before broader community input.",
      examples: ["Adding new workshop types", "Changing programme structure", "Equipment purchases"]
    },
    {
      title: "Major Community Decisions",
      description: "Strategic direction, significant budget changes, partnership agreements, and governance changes require formal member voting at the Annual General Meeting.",
      examples: ["Annual budget approval", "New partnership agreements", "Board elections", "Major policy changes"],
      highlighted: true
    }
  ];

  const participationLevels = [
    {
      title: "Programme Participants",
      description: "Join seasonal programmes, attend workshops, participate in community events",
      influence: "Feedback on programme content, suggestions for improvements, input on scheduling and logistics"
    },
    {
      title: "Active Contributors",
      description: "Help organize events, assist with programme delivery, contribute skills to community projects", 
      influence: "Shape how activities are delivered, propose new initiatives, mentor other participants"
    },
    {
      title: "Community Members",
      description: "Monthly membership with voting rights, priority access, and responsibility for community direction",
      influence: "Vote on major decisions, stand for board positions, access to financial information, AGM participation",
      featured: true
    },
    {
      title: "Community Organizers",
      description: "Take ongoing responsibility for programme areas, community partnerships, or organizational functions",
      influence: "Lead programme development, manage community partnerships, coordinate volunteer efforts, represent community interests"
    }
  ];

  const leadershipSteps = [
    {
      number: 1,
      title: "Show Up and Contribute",
      description: "Participate regularly in programmes, workshops, or events. Demonstrate reliability by following through on commitments and supporting other community members."
    },
    {
      number: 2, 
      title: "Take Initiative",
      description: "Propose new ideas, volunteer to coordinate activities, or take responsibility for specific community projects. Show willingness to solve problems."
    },
    {
      number: 3,
      title: "Build Community Support", 
      description: "Develop trust and respect from other community members through consistent contribution. Demonstrate ability to work collaboratively and consider different perspectives."
    },
    {
      number: 4,
      title: "Formal Leadership Role",
      description: "Stand for board positions or take ongoing responsibility for major community functions. Accountable to members through democratic processes and regular reporting."
    }
  ];

  return (
    <PageTemplate
      pageTitle="How We Share Power"
      pageStrapline="Democratic Community Governance"
      pageGuide="Democratic participation through real community work, transparent decision-making, and pathways for members to shape our direction and take leadership roles."
      pageType="community"
      showMaya={true}
    >
      {smartRouting && smartRouting.welcomeMessage && <WelcomeBanner />}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Scale className="w-5 h-5" />
            <span>Democratic Community</span>
          </div>
          <h1 className="hero-title">How We Share Power</h1>
          <p className="hero-subtitle">
            Democratic participation through real community work, transparent decision-making, 
            and pathways for members to shape our direction and take leadership roles.
          </p>
        </div>
      </section>

      <div className="page-container">
        {/* Democratic Principles */}
        <section className="democratic-principles">
          <h2 className="section-title">Our Approach to Community Democracy</h2>
          <div className="principles-explanation">
            <p>
              Power sharing happens through participation in real community work, not abstract voting 
              on predetermined options. Members influence decisions by contributing to projects, 
              organizing events, and taking responsibility for outcomes.
            </p>
          </div>
          
          <div className="principles-grid">
            {principles.map((principle, index) => (
              <div key={index} className="principle-card">
                <principle.icon className="principle-icon" />
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Decision Making Process */}
        <section className="decision-making">
          <h2 className="section-title">How Decisions Actually Get Made</h2>
          
          <div className="decision-levels">
            {decisionLevels.map((level, index) => (
              <div key={index} className={`decision-card ${level.highlighted ? 'highlighted' : ''}`}>
                <h3>{level.title}</h3>
                <p>{level.description}</p>
                <div className="decision-examples">
                  <strong>Examples:</strong> {level.examples.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AGM Process */}
        <section className="agm-process">
          <h2 className="section-title">Annual General Meeting Process</h2>
          <p className="section-subtitle">Our primary democratic decision-making forum during the Connoisseurs Club celebration</p>
          
          <div className="agm-structure">
            <div className="agm-day">
              <Calendar className="agm-day-icon" />
              <h3>Day 1: Community Celebration</h3>
              <div className="agm-activities">
                <div className="agm-activity">
                  <Award className="w-5 h-5" />
                  <div>
                    <h4>Programme Showcases</h4>
                    <p>Participants present work from Trubble n Bass, Kaywana's Court, and Bright Sparks programmes</p>
                  </div>
                </div>
                <div className="agm-activity">
                  <Users className="w-5 h-5" />
                  <div>
                    <h4>Community Recognition</h4>
                    <p>Acknowledge member contributions, volunteer efforts, and community partnerships</p>
                  </div>
                </div>
                <div className="agm-activity">
                  <TrendingUp className="w-5 h-5" />
                  <div>
                    <h4>Impact Review</h4>
                    <p>Review year's achievements through Rayd-yo content, Joystick publications, and community events</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="agm-day governance">
              <Vote className="agm-day-icon" />
              <h3>Day 2: Governance & Planning</h3>
              <div className="agm-activities">
                <div className="agm-activity">
                  <FileText className="w-5 h-5" />
                  <div>
                    <h4>Financial Transparency</h4>
                    <p>Present annual accounts, revenue sources, and expenditure breakdown with Q&A</p>
                  </div>
                </div>
                <div className="agm-activity">
                  <CheckCircle className="w-5 h-5" />
                  <div>
                    <h4>Democratic Voting</h4>
                    <p>Budget approval, board elections, major policy decisions, partnership agreements</p>
                  </div>
                </div>
                <div className="agm-activity">
                  <Target className="w-5 h-5" />
                  <div>
                    <h4>Next Year Planning</h4>
                    <p>Programme priorities, new initiatives, resource allocation, community goals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Participation Levels */}
        <section className="participation-levels">
          <h2 className="section-title">Levels of Community Participation</h2>
          
          <div className="levels-grid">
            {participationLevels.map((level, index) => (
              <div key={index} className={`level-card ${level.featured ? 'featured' : ''}`}>
                <h3>{level.title}</h3>
                <p>{level.description}</p>
                <div className="level-influence">
                  <strong>Influence:</strong> {level.influence}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Development */}
        <section className="leadership-development">
          <h2 className="section-title">Pathways to Community Leadership</h2>
          
          <div className="leadership-pathway">
            {leadershipSteps.map((step, index) => (
              <div key={index} className="pathway-stage">
                <div className="stage-number">{step.number}</div>
                <div className="stage-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
                {index < leadershipSteps.length - 1 && (
                  <ArrowRight className="pathway-arrow" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Current Governance Structure */}
        <section className="board-structure">
          <h2 className="section-title">Current Governance Structure</h2>
          <p className="section-subtitle">How leadership roles are organized and accountable to the community</p>
          
          <div className="governance-structure">
            <div className="governance-level">
              <Crown className="w-6 h-6 mb-2 text-blue-400" />
              <h3>Community Interest Company Board</h3>
              <p>
                Legally responsible for organizational compliance, financial management, and strategic direction. 
                Elected by members and accountable through annual reporting and AGM processes.
              </p>
            </div>
            
            <div className="governance-level">
              <Settings className="w-6 h-6 mb-2 text-green-400" />
              <h3>Programme Coordinators</h3>
              <p>
                Manage delivery of seasonal programmes, workshops, and community events. 
                Report to board and community on outcomes, budgets, and participant feedback.
              </p>
            </div>
            
            <div className="governance-level">
              <Users className="w-6 h-6 mb-2 text-purple-400" />
              <h3>Working Groups</h3>
              <p>
                Address specific community functions like media platforms, community partnerships, 
                or member support. Open to any community member willing to contribute.
              </p>
            </div>
          </div>
        </section>

        {/* Accountability Mechanisms */}
        <section className="accountability">
          <h2 className="section-title">How We Ensure Accountability</h2>
          
          <div className="accountability-measures">
            <div className="accountability-card">
              <FileText className="w-6 h-6 mb-3 text-blue-400" />
              <h3>Financial Transparency</h3>
              <p>
                Annual accounts published and available to all members. Regular financial updates 
                at community events. Clear processes for budget approval and expenditure oversight.
              </p>
            </div>
            
            <div className="accountability-card">
              <MessageSquare className="w-6 h-6 mb-3 text-green-400" />
              <h3>Regular Reporting</h3>
              <p>
                Programme coordinators and board members provide regular updates on activities, 
                outcomes, and challenges through community meetings and Joystick e-zine.
              </p>
            </div>
            
            <div className="accountability-card">
              <Shield className="w-6 h-6 mb-3 text-purple-400" />
              <h3>Democratic Oversight</h3>
              <p>
                Members can request information, raise concerns at AGM, and vote on leadership changes. 
                Clear processes for addressing conflicts or governance issues.
              </p>
            </div>
            
            <div className="accountability-card">
              <UserCheck className="w-6 h-6 mb-3 text-orange-400" />
              <h3>Community Feedback</h3>
              <p>
                Regular surveys, open forums, and feedback sessions ensure leadership remains 
                responsive to community needs and priorities.
              </p>
            </div>
          </div>
        </section>

        {/* How to Get Involved */}
        <section className="get-involved">
          <h2 className="section-title">How to Participate in Community Democracy</h2>
          
          <div className="involvement-options">
            <div className="involvement-card">
              <h3>Start with Participation</h3>
              <p>Join programmes, attend workshops, come to community events. See how decisions get made through contributing to real projects.</p>
              <Link to="/programmes" className="involvement-button">Explore Programmes</Link>
            </div>
            
            <div className="involvement-card">
              <h3>Become a Member</h3>
              <p>Monthly membership gives you voting rights, access to financial information, and ability to stand for leadership positions.</p>
              <Link to="/membership" className="involvement-button">Learn About Membership</Link>
            </div>
            
            <div className="involvement-card">
              <h3>Attend the AGM</h3>
              <p>Join our annual two-day celebration and governance meeting to see democratic decision-making in action.</p>
              <Link to="/calendar" className="involvement-button">View Community Calendar</Link>
            </div>
            
            <div className="involvement-card">
              <h3>Take Initiative</h3>
              <p>Propose new ideas, volunteer to coordinate activities, or join working groups addressing community needs.</p>
              <Link to="/get-started" className="involvement-button">Get Started</Link>
            </div>
          </div>
        </section>

        {/* Clear Expectations */}
        <section className="expectations">
          <h2 className="section-title">What Democratic Participation Actually Means</h2>
          
          <div className="expectations-content">
            <div className="expectation-point">
              <Shield className="w-6 h-6 mb-2 text-yellow-400" />
              <h3>Real Responsibility</h3>
              <p>
                Community democracy means taking responsibility for outcomes, not just voting on options. 
                Power comes with accountability to follow through on collective decisions.
              </p>
            </div>
            
            <div className="expectation-point">
              <Users className="w-6 h-6 mb-2 text-yellow-400" />
              <h3>Collaborative Decision-Making</h3>
              <p>
                Decisions emerge through discussion, compromise, and building consensus. 
                Your voice matters, but so do the perspectives and needs of other community members.
              </p>
            </div>
            
            <div className="expectation-point">
              <Target className="w-6 h-6 mb-2 text-yellow-400" />
              <h3>Time and Energy Investment</h3>
              <p>
                Meaningful participation requires showing up consistently, contributing to discussions, 
                and supporting collective work beyond individual interests.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Maya Integration */}
      {mayaStore && (
        <DraggableMaya 
          pageContext={{
            title: 'How We Share Power',
            section: 'community-democracy',
            page: 'power-sharing',
            actions: ['learn_democracy', 'join_governance', 'attend_agm', 'become_member']
          }}
          membershipTier={
            (() => {
              switch (mayaStore.membershipTier) {
                case 'visitor':
                  return 'visitor';
                case 'member':
                  return 'membership';
                case 'active-volunteer':
                  return 'connector';
                case 'participant':
                  return 'membership'; // or another closest allowed value
                default:
                  return 'visitor';
              }
            })()
          }
        />
      )}
    </PageTemplate>
  );
};

export default HowWeSharePower;