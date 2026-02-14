import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSmartRouting } from '../../hooks/useSmartRouting';
import { WelcomeBanner } from '../../components/smart/WelcomeBanner';
import { useMayaStore } from '../../stores/mayaStore';
import PageTemplate from '../../components/PageTemplate';
import DraggableMaya from '../../components/maya/DraggableMaya';
import { 
  Users, FileText, Target, Handshake, Crown, 
  Calendar, Award, Shield, CheckCircle, AlertTriangle,
  ArrowRight, Clock, BookOpen, Gavel, TrendingUp
} from 'lucide-react';
import './DirectorsPathway.css';

interface DirectorRole {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

interface PathwayStage {
  number: number;
  title: string;
  description: string;
  duration: string;
}

interface Skill {
  title: string;
  items: string[];
}

const DirectorsPathway: React.FC = () => {
  const mayaStore = useMayaStore();
  const smartRouting = useSmartRouting();

  useEffect(() => {
    // Maya context setup for directors pathway
  }, [mayaStore]);

  const directorRoles: DirectorRole[] = [
    {
      icon: FileText,
      title: "Legal Compliance",
      description: "Ensure the organization meets CIC regulations, Companies House requirements, and maintains community asset lock protections."
    },
    {
      icon: TrendingUp,
      title: "Financial Oversight", 
      description: "Approve budgets, monitor expenditure, ensure transparent financial reporting, and maintain accountability to members and regulators."
    },
    {
      icon: Target,
      title: "Strategic Direction",
      description: "Work with community members to set organizational priorities, approve new initiatives, and ensure activities align with community benefit objectives."
    },
    {
      icon: Handshake,
      title: "Community Accountability",
      description: "Report regularly to members, facilitate democratic decision-making, and ensure leadership remains responsive to community needs."
    }
  ];

  const pathwayStages: PathwayStage[] = [
    {
      number: 1,
      title: "Programme Participation",
      description: "Actively participate in seasonal programmes (Trubble n Bass, Kaywana's Court, Bright Sparks) and demonstrate reliability in following through on commitments to community projects.",
      duration: "6-12 months minimum"
    },
    {
      number: 2,
      title: "Community Organizing",
      description: "Take initiative in organizing workshops, coordinating events like \"Wembley Wonderful Days,\" or contributing to Rayd-yo/Joystick content creation and community partnerships.",
      duration: "12-18 months"
    },
    {
      number: 3,
      title: "Community Support & Mentorship", 
      description: "Demonstrate ability to work collaboratively, support other members' goals, and handle conflicts constructively. Begin mentoring newer community participants.",
      duration: "6-12 months"
    },
    {
      number: 4,
      title: "Governance Experience",
      description: "Attend board meetings as observer, participate in AGM planning, learn financial oversight, and understand legal requirements through working alongside current directors.",
      duration: "12 months"
    },
    {
      number: 5,
      title: "Community Endorsement",
      description: "Stand for election at Annual General Meeting with endorsements from community members who have worked with the candidate on multiple projects over time.",
      duration: "AGM election process"
    }
  ];

  const governanceSkills: Skill[] = [
    {
      title: "Community Facilitation",
      items: [
        "Running effective meetings and workshops",
        "Mediating conflicts and building consensus", 
        "Supporting democratic decision-making processes",
        "Facilitating community feedback and input"
      ]
    },
    {
      title: "Financial Management",
      items: [
        "Understanding charity and CIC financial regulations",
        "Budget development and expenditure monitoring",
        "Transparent financial reporting to members",
        "Grant writing and funding relationship management"
      ]
    },
    {
      title: "Strategic Planning",
      items: [
        "Long-term community needs assessment",
        "Programme development and evaluation", 
        "Partnership development with local organizations",
        "Organizational sustainability planning"
      ]
    },
    {
      title: "Legal & Compliance",
      items: [
        "Understanding CIC regulations and requirements",
        "Data protection and safeguarding responsibilities",
        "Employment law and volunteer management",
        "Community asset lock and benefit requirements"
      ]
    }
  ];

  return (
    <PageTemplate
      pageTitle="Directors Pathway"
      pageStrapline="Community Leadership Development"
      pageGuide="Developing community governance skills through practical experience, mentorship, and demonstrated commitment to collective decision-making and accountability."
      pageType="about"
      showMaya={true}
      bannerConfig={{
        raydyo: {
          title: "Rayd-yo",
          subtitle: "Governance • Leadership",
          link: "/raydyo"
        },
        joystick: {
          title: "Joystick E-zine",
          subtitle: "Board Updates • Democracy",
          link: "/joystick"
        },
        localBusiness: {
          businessName: "Community Leadership",
          offer: "Democratic governance",
          link: "/work-with-us"
        }
      }}
    >
      {smartRouting && smartRouting.showWelcome && <WelcomeBanner />}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Crown className="w-5 h-5" />
            <span>Leadership Pathway</span>
          </div>
          <h1 className="hero-title">Directors Pathway</h1>
          <p className="hero-subtitle">
            Developing community governance skills through practical experience, mentorship, 
            and demonstrated commitment to collective decision-making and accountability.
          </p>
        </div>
      </section>

      <div className="page-container">
        {/* What Directors Do */}
        <section className="what-directors-do">
          <h2 className="section-title">What Community Directors Actually Do</h2>
          <p className="section-description">
            As a Community Interest Company, our directors have legal responsibilities for organizational 
            compliance, financial oversight, and strategic direction. But they're also community members 
            accountable to other members through democratic processes.
          </p>
          
          <div className="directors-grid">
            {directorRoles.map((role, index) => (
              <div key={index} className="director-card">
                <role.icon className="director-icon" />
                <h4>{role.title}</h4>
                <p>{role.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pathway Stages */}
        <section className="pathway-stages">
          <h2 className="section-title">Pathway to Board Leadership</h2>
          <p className="section-description">Directors emerge from demonstrated community contribution and commitment over time</p>
          
          <div className="stages-container">
            {pathwayStages.map((stage, index) => (
              <div key={index} className="stage-card">
                <div className="stage-header">
                  <div className="stage-number">{stage.number}</div>
                  <h4>{stage.title}</h4>
                </div>
                <p>{stage.description}</p>
                <div className="stage-duration">
                  <Clock className="w-4 h-4" />
                  <span>{stage.duration}</span>
                </div>
                {index < pathwayStages.length - 1 && (
                  <ArrowRight className="stage-arrow" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Governance Skills */}
        <section className="governance-skills">
          <h2 className="section-title">Governance Skills Development</h2>
          <p className="section-description">Leadership capabilities developed through practical experience and mentorship</p>
          
          <div className="skills-grid">
            {governanceSkills.map((skill, index) => (
              <div key={index} className="skill-card">
                <BookOpen className="skill-icon" />
                <h4>{skill.title}</h4>
                <ul>
                  {skill.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Board Structure */}
        <section className="board-structure">
          <h2 className="section-title">Current Board Structure</h2>
          <p className="section-description">How leadership roles are organized and accountable to the community</p>
          
          <div className="board-grid">
            <div className="board-card">
              <Crown className="board-icon founder" />
              <h4>Founder Directors</h4>
              <p>
                Provide organizational continuity and strategic direction. Have deep knowledge of 
                community history and relationships with key partners like local businesses supporting events.
              </p>
            </div>
            
            <div className="board-card">
              <Users className="board-icon community" />
              <h4>Community Directors</h4>
              <p>
                Elected by members to represent community interests and provide democratic oversight. 
                Bring fresh perspectives and ensure leadership remains accountable to participants.
              </p>
            </div>
            
            <div className="board-card">
              <Shield className="board-icon advisory" />
              <h4>Advisory Positions</h4>
              <p>
                Independent advisors with relevant expertise (legal, financial, community development) 
                who provide guidance without voting rights or operational responsibilities.
              </p>
            </div>
          </div>
        </section>

        {/* Election Process */}
        <section className="election-process">
          <h2 className="section-title">How Directors Are Elected</h2>
          
          <div className="process-grid">
            <div className="process-card">
              <Calendar className="process-icon" />
              <h4>Nomination Period</h4>
              <p>
                Members nominate candidates who have demonstrated sustained community contribution. 
                Self-nomination is allowed but requires endorsements from other community members.
              </p>
            </div>
            
            <div className="process-card">
              <FileText className="process-icon" />
              <h4>Candidate Statements</h4>
              <p>
                Nominees present their vision for community direction, relevant experience, 
                and specific contributions they plan to make as directors.
              </p>
            </div>
            
            <div className="process-card">
              <Users className="process-icon" />
              <h4>Community Discussion</h4>
              <p>
                Open forums during AGM for members to ask questions, discuss candidate qualifications, 
                and share perspectives on organizational needs.
              </p>
            </div>
            
            <div className="process-card">
              <CheckCircle className="process-icon" />
              <h4>Democratic Vote</h4>
              <p>
                Members vote by secret ballot with results announced publicly. 
                New directors begin serving immediately after AGM conclusion.
              </p>
            </div>
          </div>
        </section>

        {/* Accountability Measures */}
        <section className="accountability-measures">
          <h2 className="section-title">How Directors Remain Accountable</h2>
          
          <div className="accountability-grid">
            <div className="accountability-card">
              <FileText className="accountability-icon" />
              <h4>Regular Reporting</h4>
              <p>
                Directors provide updates at community events, through Joystick e-zine, 
                and at monthly member meetings about decisions, challenges, and organizational progress.
              </p>
            </div>
            
            <div className="accountability-card">
              <Award className="accountability-icon" />
              <h4>Annual Review</h4>
              <p>
                Each director presents annual report at AGM covering their contributions, 
                lessons learned, and goals for the coming year. Members provide feedback and evaluation.
              </p>
            </div>
            
            <div className="accountability-card">
              <Gavel className="accountability-icon" />
              <h4>Transparent Decision-Making</h4>
              <p>
                Board meeting minutes are available to members. Major decisions include rationale 
                and consideration of community input received.
              </p>
            </div>
            
            <div className="accountability-card">
              <AlertTriangle className="accountability-icon" />
              <h4>Removal Process</h4>
              <p>
                Members can call special general meetings to address director performance concerns. 
                Clear processes exist for removing directors who fail to meet community standards.
              </p>
            </div>
          </div>
        </section>

        {/* Role Expectations */}
        <section className="role-expectations">
          <h2 className="section-title">What Director Roles Actually Involve</h2>
          
          <div className="expectations-grid">
            <div className="expectation-card">
              <Clock className="expectation-icon" />
              <h4>Time Commitment</h4>
              <p>
                Monthly board meetings, attendance at AGM and major community events, 
                regular communication with community members, and ongoing learning about governance responsibilities.
              </p>
            </div>
            
            <div className="expectation-card">
              <Shield className="expectation-icon" />
              <h4>Legal Responsibility</h4>
              <p>
                Directors are personally liable for organizational compliance and financial management. 
                This includes understanding CIC regulations and ensuring community benefit requirements are met.
              </p>
            </div>
            
            <div className="expectation-card">
              <Handshake className="expectation-icon" />
              <h4>Community Service</h4>
              <p>
                Board roles are volunteer positions focused on community benefit rather than personal advancement. 
                Directors work to support community goals rather than individual interests.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Interest */}
        <section className="leadership-interest">
          <h2 className="section-title">Interested in Community Leadership?</h2>
          
          <div className="leadership-grid">
            <div className="leadership-card">
              <h4>Start with Participation</h4>
              <p>Join programmes, attend workshops, volunteer at events. Leadership emerges from demonstrated community contribution.</p>
              <Link to="/programmes" className="leadership-btn">Explore Programmes</Link>
            </div>
            
            <div className="leadership-card">
              <h4>Attend Board Meetings</h4>
              <p>Board meetings are open to community members. Observe how decisions get made and governance responsibilities are handled.</p>
              <Link to="/calendar" className="leadership-btn">View Community Calendar</Link>
            </div>
            
            <div className="leadership-card">
              <h4>Join Working Groups</h4>
              <p>Contribute to specific organizational functions like event planning, media platforms, or community partnerships.</p>
              <Link to="/get-started" className="leadership-btn">Get Started</Link>
            </div>
            
            <div className="leadership-card">
              <h4>Become a Member</h4>
              <p>Membership provides voting rights and eligibility for board positions. Active participation helps you understand community needs.</p>
              <Link to="/membership" className="leadership-btn">Learn About Membership</Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="leadership-cta">
          <div className="cta-content">
            <Crown className="cta-icon" />
            <h3>Ready to Explore Community Leadership?</h3>
            <p>
              Community leadership develops through sustained participation and demonstrated commitment 
              to collective goals. The pathway requires patience, learning, and genuine investment 
              in supporting other community members' success alongside organizational sustainability.
            </p>
            
            <div className="action-buttons">
              <Link to="/get-started" className="cta-btn primary">Start Your Community Journey</Link>
              <Link to="/calendar" className="cta-btn secondary">Attend Next Community Meeting</Link>
            </div>
            
            <div className="contact-info">
              <p>
                Questions about governance roles or the pathway to leadership? 
                Current directors are available at community events or through hello@wembleywonders.org
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Maya Integration */}
      {mayaStore && (
        <DraggableMaya 
          pageContext={{
            page: 'directors-pathway',
            actions: ['learn_governance', 'explore_leadership', 'attend_meetings', 'join_programmes']
          }}
        />
      )}
    </PageTemplate>
  );
};

export default DirectorsPathway;