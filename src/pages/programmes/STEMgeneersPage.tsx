import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate';
import DraggableMaya from '../../components/maya/DraggableMaya';
import MediaSection from '../../components/media/MediaSection';
import { 
  Wrench, Cpu, Lightbulb, Users, Target, Award, CheckCircle, ArrowRight,
  Bike, Smartphone, Monitor, Speaker, Battery, Wifi, PoundSterling,
  HandHeart, Coins, Clock, Settings, Zap
} from 'lucide-react';
import './ProgrammePage.css';
import './STEMgeneersPage.css';

/**
 * STEMgeneers - Applied Technical Skills That Earn
 * =================================================
 * 
 * "You don't need Google to validate you can engineer sound. 
 * Engineer sound for Saturday's event. Get paid. Build reputation. 
 * Buy better equipment. Repeat."
 * 
 * This programme teaches applied technical skills that earn immediately
 * through community service, not waiting for a tech company to hire you.
 * Rooted in sound system culture and yard mechanic heritage.
 */

const STEMgeneersPage: React.FC = () => {

  // Heritage traditions
  const heritageRoots = [
    {
      name: "Sound System Culture",
      icon: "🔊",
      description: "Jah Shaka, Coxsone, King Tubby—they didn't wait for the music industry. They built their own infrastructure: amplifiers, speaker boxes, mixing desks. Technical skills serving community entertainment.",
      lesson: "You don't need permission to engineer. Build what the community needs."
    },
    {
      name: "The Yard Mechanic",
      icon: "🔧",
      description: "Every Caribbean community had one. The person who could fix anything—cars, electronics, appliances. They earned through usefulness, not credentials. If something broke, you called them.",
      lesson: "Technical skill + community trust = sustainable income."
    },
    {
      name: "Pre-Digital Skills",
      icon: "⚡",
      description: "Soldering, wiring, mechanical repair—these haven't become obsolete. Your grandfather's electrical skills still matter. Modern devices still have batteries, motors, and circuits.",
      lesson: "Heritage technical knowledge transfers to contemporary tech."
    }
  ];

  // Three practical pathways
  const pathways = [
    {
      name: "Wheels & Mobility",
      icon: Bike,
      color: "#10b981",
      description: "E-bikes, e-scooters, and personal electric vehicles are everywhere—but who fixes them? Be that person.",
      services: [
        { service: "Battery replacement", rate: "£100-300" },
        { service: "Motor repair/replacement", rate: "£50-150" },
        { service: "Full service & tune-up", rate: "£50-80" },
        { service: "E-bike conversion", rate: "£200-500" },
        { service: "Puncture & brake repair", rate: "£15-40" }
      ],
      marketGap: "No trusted local person between expensive Halfords and dodgy market stalls. You fill that gap.",
      heritageLink: "The yard mechanic fixed bicycles and motorbikes. You fix e-bikes and scooters."
    },
    {
      name: "Devices & Phones",
      icon: Smartphone,
      color: "#8b5cf6",
      description: "Everyone has a phone. Screens crack. Batteries die. Data gets lost. Elders need patient setup help.",
      services: [
        { service: "Screen replacement", rate: "£40-150" },
        { service: "Battery replacement", rate: "£30-70" },
        { service: "Data recovery", rate: "£30-80" },
        { service: "Elder tech setup", rate: "£25-50" },
        { service: "Custom 3D printed accessories", rate: "£15-30" }
      ],
      marketGap: "Timpson charges premium prices. Phone shops push new phones instead of repairs. Elders have nobody patient.",
      heritageLink: "Your grandmother fixed the family's electronics. You fix the family's devices."
    },
    {
      name: "Home Tech & Studio",
      icon: Monitor,
      color: "#f59e0b",
      description: "Gaming rigs, streaming setups, home studios, smart homes. Young people have the skills—we formalize the pathway to getting paid.",
      services: [
        { service: "Gaming PC build", rate: "£100-200 labour + parts" },
        { service: "Streaming setup (camera, lighting, audio)", rate: "£50-150" },
        { service: "Home recording studio", rate: "£100-300" },
        { service: "Smart home/entertainment setup", rate: "£50-150" },
        { service: "Network optimization for gaming", rate: "£40-80" }
      ],
      marketGap: "Currys is overpriced and impersonal. Young people have these skills but no formal pathway to monetize them.",
      heritageLink: "Sound system engineers built their own rigs. You build the next generation's."
    }
  ];

  // Tech Collective Pardner
  const techCollective = {
    shared: [
      "Diagnostic equipment (multimeters, oscilloscopes)",
      "Soldering stations (quality + precision)",
      "3D printer for custom parts",
      "Specialized tools (phone repair kits, bike tools)",
      "Van for mobile service"
    ],
    wholesale: [
      "Phone screens and batteries (bulk pricing)",
      "E-bike parts and batteries",
      "Electronic components",
      "3D printing filament",
      "Cables, adapters, accessories"
    ],
    example: "8 members × £50/month = £400/month pool. Rotating access for equipment purchases. After 8 months, everyone has access to £3,000+ of shared equipment."
  };

  // Cross-programme integration
  const crossProgramme = [
    { programme: "G-Tech Casters", connection: "Build streaming rigs for content creators", icon: "🎬" },
    { programme: "Trubble n Bass", connection: "Set up home recording studios for producers", icon: "🎵" },
    { programme: "Kaywana's Court", connection: "Sound and lighting for productions", icon: "🎭" },
    { programme: "Joystick / Rayd-yo", connection: "Optimize phone video capture for content", icon: "📱" },
    { programme: "Cyberstore", connection: "Sell 3D printed products at 55%", icon: "🛒" }
  ];

  // Income trajectory
  const incomeTrajectory = [
    { phase: "Months 1-3", description: "Learn foundations, practice on own devices, shadow experienced members", income: "Training phase" },
    { phase: "Months 4-6", description: "Small jobs: phone screens, basic setups, simple repairs", income: "£100-300/month" },
    { phase: "Months 6-12", description: "Build reputation, complex jobs: e-bike repair, gaming rigs", income: "£300-600/month" },
    { phase: "Year 2+", description: "Established community tech person, referrals, repeat customers", income: "£500-1000+/month part-time" }
  ];

  // Additional Wembley Wonders streams
  const additionalStreams = [
    { stream: "Rayd-yo tech tutorials", rate: "£25/episode" },
    { stream: "Kaywana's Court production tech", rate: "£50-150/event" },
    { stream: "Cyberstore 3D printed products", rate: "55% of sales" },
    { stream: "Workshop facilitation", rate: "£60/session" }
  ];

  const outcomes = [
    "Practical repair skills that earn money immediately",
    "Access to shared professional equipment worth £3,000+",
    "Community network for referrals and bulk purchasing",
    "Heritage connection to sound system and yard mechanic traditions",
    "Multiple income streams across Wembley Wonders programmes",
    "STEMgeneers certification (blockchain verified)"
  ];

  return (
    <PageTemplate
      pageTitle="STEMgeneers"
      pageStrapline="Applied Technical Skills That Earn — Be the person your community calls when something needs fixing."
      pageType="programme"
    >
      <DraggableMaya 
        membershipTier="visitor"
        pageType="programme"
        pageContext={{
          title: "STEMgeneers Programme",
          section: "programmes",
          contentType: "applied-tech"
        }}
      />

      <div className="programme-content stemgeneers-page">
        
        {/* Hero Section */}
        <section className="programme-hero stemgeneers-hero">
          <div className="hero-badge tech">
            <Wrench size={32} />
          </div>
          <h1>STEMgeneers</h1>
          <p className="hero-tagline">
            Applied Technical Skills That Earn
          </p>
          <p className="hero-quote">
            "You don't need Google to validate you can engineer. Engineer for Saturday's event. 
            Get paid. Build reputation. Repeat."
          </p>
        </section>

        {/* Heritage Roots */}
        <section className="programme-section heritage-section">
          <h2>Your Technical Heritage</h2>
          <p className="section-intro">
            Before there were tech companies, there were people who built things. Sound systems, 
            electronics repair, mechanical work—your community has always had technical skill. 
            We're formalizing what already existed.
          </p>

          <div className="heritage-grid">
            {heritageRoots.map((root, index) => (
              <div key={index} className="heritage-card">
                <span className="heritage-icon">{root.icon}</span>
                <h3>{root.name}</h3>
                <p>{root.description}</p>
                <p className="heritage-lesson"><strong>The lesson:</strong> {root.lesson}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Not Tech Jobs - Community Service */}
        <section className="programme-section reframe-section">
          <div className="reframe-card">
            <h2>This Isn't About Getting a Tech Job</h2>
            <div className="reframe-comparison">
              <div className="reframe-old">
                <h3>The Old Path</h3>
                <p>Learn to code → Get CS degree → Apply to tech companies → Hope to get hired</p>
                <ul>
                  <li>£50k+ student debt</li>
                  <li>Competing with thousands of graduates</li>
                  <li>Still face bias in hiring</li>
                  <li>May never use the skills locally</li>
                </ul>
              </div>
              <div className="reframe-new">
                <h3>The Third Path</h3>
                <p>Learn applied skills → Serve your community → Multiple income streams</p>
                <ul>
                  <li>Start earning within months</li>
                  <li>Community needs you (no competition)</li>
                  <li>Reputation builds through service</li>
                  <li>Skills compound over time</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Three Practical Pathways */}
        <section className="programme-section pathways-section">
          <h2>Three Pathways That Earn</h2>
          <p className="section-intro">
            These aren't hypothetical career paths. They're real services people pay for, 
            right now, in your community. The market gap exists. You fill it.
          </p>

          <div className="pathways-grid">
            {pathways.map((pathway, index) => {
              const Icon = pathway.icon;
              return (
                <div key={index} className="pathway-card" style={{ borderColor: pathway.color }}>
                  <div className="pathway-header" style={{ backgroundColor: `${pathway.color}20` }}>
                    <Icon size={32} color={pathway.color} />
                    <h3 style={{ color: pathway.color }}>{pathway.name}</h3>
                  </div>
                  <p className="pathway-desc">{pathway.description}</p>
                  
                  <div className="pathway-services">
                    <h4>What You'll Offer:</h4>
                    {pathway.services.map((service, i) => (
                      <div key={i} className="service-item">
                        <span className="service-name">{service.service}</span>
                        <span className="service-rate" style={{ color: pathway.color }}>{service.rate}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pathway-gap">
                    <h4>The Market Gap:</h4>
                    <p>{pathway.marketGap}</p>
                  </div>

                  <div className="pathway-heritage">
                    <p><strong>Heritage link:</strong> {pathway.heritageLink}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tech Collective Pardner */}
        <section className="programme-section collective-section">
          <h2>Tech Collective: Pardner for Equipment</h2>
          <p className="section-intro">
            Professional tools are expensive. Alone, you might afford a basic kit. Together, 
            you access £3,000+ of shared equipment through pardner-style collective ownership.
          </p>

          <div className="collective-grid">
            <div className="collective-card shared">
              <h3><Settings size={20} /> Shared Equipment</h3>
              <p>Collective owns, everyone accesses:</p>
              <ul>
                {techCollective.shared.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="collective-card wholesale">
              <h3><Coins size={20} /> Wholesale Buying</h3>
              <p>Group purchasing for better prices:</p>
              <ul>
                {techCollective.wholesale.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="collective-card pardner">
              <h3><HandHeart size={20} /> How It Works</h3>
              <div className="pardner-example">
                <p>{techCollective.example}</p>
              </div>
              <p className="pardner-note">
                Same principle as your grandmother's pardner—collective contribution, 
                rotating benefit, community trust.
              </p>
            </div>
          </div>
        </section>

        {/* Income Trajectory */}
        <section className="programme-section trajectory-section">
          <h2>Realistic Income Trajectory</h2>
          <p className="section-intro">
            We're not promising overnight riches. We're showing a realistic path from 
            learning to earning, based on actual community demand.
          </p>

          <div className="trajectory-timeline">
            {incomeTrajectory.map((phase, index) => (
              <div key={index} className="trajectory-step">
                <div className="trajectory-phase">{phase.phase}</div>
                <div className="trajectory-content">
                  <p className="trajectory-desc">{phase.description}</p>
                  <span className="trajectory-income">{phase.income}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="additional-streams">
            <h3>Plus: Wembley Wonders Streams</h3>
            <div className="streams-grid">
              {additionalStreams.map((stream, index) => (
                <div key={index} className="stream-item">
                  <span className="stream-name">{stream.stream}</span>
                  <span className="stream-rate">{stream.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-Programme Integration */}
        <section className="programme-section integration-section">
          <h2>Connected Across All Programmes</h2>
          <p className="section-intro">
            Your technical skills are needed everywhere in Wembley Wonders. Every content 
            creator needs equipment. Every production needs tech support. Every programme 
            has technical needs.
          </p>

          <div className="integration-grid">
            {crossProgramme.map((item, index) => (
              <div key={index} className="integration-card">
                <span className="integration-icon">{item.icon}</span>
                <h4>{item.programme}</h4>
                <p>{item.connection}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Programme Showcase */}
        <MediaSection 
          contentType="stemgeneers-showcase"
          title="STEMgeneers at Work"
          description="Members repairing devices, building rigs, and serving community tech needs"
          allowedRoles={['staff', 'volunteer', 'editor']}
          placeholder="Share STEMgeneers projects and repair work"
          autoArchive={false}
          maxItems={6}
          layout="grid"
        />

        {/* Outcomes */}
        <section className="programme-section outcomes-section">
          <h2>What You'll Have</h2>
          <div className="outcomes-grid">
            {outcomes.map((outcome, index) => (
              <div key={index} className="outcome-item">
                <CheckCircle size={20} />
                <p>{outcome}</p>
              </div>
            ))}
          </div>
        </section>

        {/* For Parents / For Young People */}
        <section className="programme-section messaging-section">
          <h2>Having the Conversation</h2>
          
          <div className="messaging-grid">
            <div className="messaging-card parents">
              <h3>👵 For Parents</h3>
              <p>
                "They're learning the practical skills your father had—fixing things, solving 
                problems, being useful. But applied to modern technology. E-bikes instead of 
                motorbikes. Phones instead of radios. The principle is the same: community 
                service through technical skill."
              </p>
            </div>
            <div className="messaging-card young-people">
              <h3>🧑 For Young People</h3>
              <p>
                "You already know how to build gaming PCs and set up streaming. You troubleshoot 
                your family's tech problems. We're just formalizing that into income. Same skills, 
                but now you get paid. And you're part of a collective with professional equipment."
              </p>
            </div>
          </div>
        </section>

        {/* Sandbox CTA */}
        <section className="programme-section sandbox-section">
          <div className="sandbox-card">
            <Zap size={48} />
            <h2>Try the Tools</h2>
            <p>
              Explore diagnostic trainers, calculate your potential income across services, 
              and model how a Tech Collective pardner could work for your group.
            </p>
            <Link to="/programmes/stemgeneers/sandbox" className="sandbox-cta">
              ⚡ Explore STEMgeneers Sandbox →
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="programme-cta stemgeneers-cta">
          <div className="cta-content">
            <Wrench size={48} />
            <h2>Ready to Build?</h2>
            <p>
              Your community needs people who can fix things. Be that person. 
              Start learning, start earning, start building reputation.
            </p>
            <div className="cta-buttons">
              <Link to="/programmes/stemgeneers/sandbox" className="cta-button primary">
                Try the Tools Free
              </Link>
              <Link to="/get-started" className="cta-button secondary">
                Join STEMgeneers
              </Link>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="programme-section closing-section">
          <blockquote className="closing-quote">
            "The sound system engineer didn't wait for the music industry. The yard mechanic 
            didn't wait for a job at Halfords. They built, they fixed, they served their 
            community. That's still the path. We're just applying it to e-bikes, phones, 
            and gaming rigs."
          </blockquote>
        </section>

      </div>
    </PageTemplate>
  );
};

export default STEMgeneersPage;