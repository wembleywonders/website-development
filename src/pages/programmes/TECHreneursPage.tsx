import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate';
import DraggableMaya from '../../components/maya/DraggableMaya';
import MediaSection from '../../components/media/MediaSection';
import { 
  Briefcase, TrendingUp, Lightbulb, Users, Target, Award, CheckCircle, 
  ArrowRight, Shield, Lock, AlertTriangle, FileText, Building, 
  PoundSterling, BookOpen, Landmark, Scale, Database, Clock, Home,
  Banknote, Heart, HandHeart, Coins, CircleDollarSign, Layers,
  MapPin, Key, Network, Handshake, Store, Truck, Wrench
} from 'lucide-react';
import './ProgrammePage.css';
import './TECHreneursPage.css';

/**
 * TECHreneurs - Ecosystem Economics & Collective Wealth-Building
 * ==============================================================
 * 
 * "Brent is one of London's wealthiest Black communities. Construction firms, 
 * property managers, wholesalers, logistics companies — they're already here. 
 * Your job isn't to compete with them. It's to fill gaps, serve their needs, 
 * and position yourself to inherit what they built."
 * 
 * This programme addresses the 0.17% reality differently: instead of teaching 
 * people to start businesses from scratch (90% failure rate), we connect them 
 * to existing infrastructure that needs strengthening.
 */

const TECHreneursPage: React.FC = () => {

  // The reality check - data from the video
  const realityCheck = [
    {
      stat: "0.17%",
      context: "Black-led SMEs with employees",
      comparison: "Despite 3% population share"
    },
    {
      stat: "4x",
      context: "More likely to be denied bank loans",
      comparison: "Than white business owners"
    },
    {
      stat: "£34k vs £314k",
      context: "Median Black African vs White British household wealth",
      comparison: "10p for every £1"
    },
    {
      stat: "3%",
      context: "Of Black spending recirculates in Black businesses",
      comparison: "Money exits immediately"
    },
    {
      stat: "90%",
      context: "Of new businesses fail within 5 years",
      comparison: "Starting from scratch is brutal"
    },
    {
      stat: "21-37%",
      context: "Black home ownership rates",
      comparison: "Can't use home as business collateral"
    }
  ];

  // Brent's existing infrastructure
  const brentInfrastructure = [
    {
      sector: "Construction & Trades",
      reality: "50+ Black-owned construction firms in Brent",
      needs: "Admin support, digital systems, bookkeeping, succession planning",
      icon: Building
    },
    {
      sector: "Property Management",
      reality: "Hundreds of local landlords managing multiple properties",
      needs: "Tenant portals, maintenance coordination, tech support",
      icon: Home
    },
    {
      sector: "Food & Hospitality",
      reality: "15+ Caribbean restaurants on Wembley High Road alone",
      needs: "Delivery coordination, social media, booking systems",
      icon: Store
    },
    {
      sector: "Logistics & Delivery",
      reality: "Dense network of delivery fleets and courier services",
      needs: "Driver coordination, route optimization, admin systems",
      icon: Truck
    },
    {
      sector: "Care Sector",
      reality: "30+ care homes in the borough",
      needs: "Tech support for residents, staff training, family communication",
      icon: Heart
    },
    {
      sector: "Event Economy",
      reality: "Wembley Stadium brings 90,000 people for major events",
      needs: "Staffing, equipment, catering coordination, tech support",
      icon: Users
    }
  ];

  // The three failing approaches
  const failingApproaches = [
    {
      name: "Get Educated, Get a Job",
      promise: "Get qualifications → Get hired → Job security → Build wealth",
      reality: [
        "Graduate premium has collapsed (too many degrees, not enough jobs)",
        "£50k+ student debt before you start",
        "Glass ceiling persists despite qualifications",
        "\"Secure jobs\" have been casualized, automated, offshored"
      ],
      wound: "I did everything right. I got the degree. I'm still passed over."
    },
    {
      name: "Entertainment & Sports",
      promise: "Be undeniably talented → Get discovered → Fame and wealth",
      reality: [
        "Extreme survivor bias — thousands fail for every one success",
        "Winner-take-all economics (few get rich, most get nothing)",
        "Short earning windows (athletes peak at 30)",
        "Still exploited by managers, agents, labels"
      ],
      wound: "At least talent is undeniable. I'd rather gamble on that than a degree."
    },
    {
      name: "Start Your Own Business",
      promise: "Be your own boss → Find customers → Scale up → Get rich",
      reality: [
        "90% of new businesses fail within 5 years",
        "Banks 4x more likely to deny you loans",
        "Requires marketing, customers, capital — all from scratch",
        "Competes with businesses that already have all three"
      ],
      wound: "I tried. Spent my savings. Nobody knew I existed. Back to zero."
    }
  ];

  // The ecosystem path
  const ecosystemPath = [
    {
      old: "Start from scratch",
      new: "Fill gaps that already exist",
      icon: Target
    },
    {
      old: "Find your own customers",
      new: "Serve businesses that need you",
      icon: Handshake
    },
    {
      old: "Compete with existing businesses",
      new: "Strengthen local infrastructure",
      icon: Network
    },
    {
      old: "Build your personal brand",
      new: "Position for succession",
      icon: Key
    },
    {
      old: "Bank loans / VC funding",
      new: "Pardner capital pools",
      icon: Coins
    },
    {
      old: "Winner-take-all",
      new: "Distributed returns (55/25/20)",
      icon: Scale
    }
  ];

  // Succession signals
  const successionSignals = [
    "Owner is 55+ with no family involved in the business",
    "Business is stable but not growing",
    "Owner mentions being 'tired' or wanting to 'slow down'",
    "Long-term employees but no clear second-in-command",
    "Business owns its premises (real asset value)",
    "Owner talks about 'the old days' more than future plans"
  ];

  // Pardner explanation (preserved)
  const pardnerHow = [
    "Group of trusted people (often 10-12) form a circle",
    "Each contributes fixed amount weekly/monthly (e.g., £50/week)",
    "Each week, one person receives the full pool (\"the hand\")",
    "Rotation continues until everyone has received once",
    "No interest. No bank. No credit check. Pure community trust."
  ];

  // Heritage finance traditions (preserved)
  const heritageFinance = [
    { name: "Pardner", origin: "Jamaica / Caribbean", icon: "🇯🇲" },
    { name: "Susu", origin: "Ghana / West Africa", icon: "🇬🇭" },
    { name: "Box Hand", origin: "Various Caribbean", icon: "🌴" },
    { name: "Esusu", origin: "Nigeria", icon: "🇳🇬" },
    { name: "Hagbad", origin: "Somalia", icon: "🇸🇴" },
    { name: "Chit Fund", origin: "South Asia", icon: "🌏" }
  ];

  // Core modules - updated for ecosystem
  const coreModules = [
    { 
      title: "The 0.17% Reality", 
      description: "Why conventional paths fail — and why starting from scratch isn't the answer either.",
      icon: AlertTriangle,
      critical: true
    },
    { 
      title: "Brent's Business Ecosystem", 
      description: "Map the existing infrastructure: who's here, what they need, where the gaps are.",
      icon: MapPin,
      critical: true
    },
    { 
      title: "Gap Analysis & Entry Points", 
      description: "Identify problems existing businesses have. Position yourself to solve them.",
      icon: Target,
      critical: true
    },
    { 
      title: "Succession Positioning", 
      description: "Read the signals. Play the long game. Inherit what others built.",
      icon: Key,
      critical: true
    },
    { 
      title: "Heritage Economics: The Pardner Tradition", 
      description: "How Brent's wealth was actually built. Apply the same principles today.",
      icon: Coins,
      critical: true
    },
    { 
      title: "The 55/25/20 Model", 
      description: "How earnings work: your share, community fund, platform costs — complete transparency.",
      icon: Scale,
      critical: true
    }
  ];

  // Practical modules (preserved with ecosystem additions)
  const practicalModules = [
    { 
      title: "B2B vs B2C Economics", 
      description: "Why serving 10 businesses beats finding 1000 customers. Stability vs hustle.",
      icon: Building
    },
    { 
      title: "Pricing & Positioning", 
      description: "What to charge as a subcontractor vs freelancer vs apprentice. Trade-offs.",
      icon: PoundSterling
    },
    { 
      title: "Relationship-Based Income", 
      description: "How referrals work. Why one good relationship beats a hundred cold calls.",
      icon: Handshake
    },
    { 
      title: "Business Accounts & Structure", 
      description: "Separate personal and business finances. Why this matters. How to set it up.",
      icon: FileText
    }
  ];

  // UC Module (preserved)
  const ucModule = {
    title: "Navigating Universal Credit",
    sections: [
      {
        name: "Monthly Reporting",
        description: "How to report variable income from B2B work. What DWP needs to see.",
        icon: FileText
      },
      {
        name: "The £6,000 Threshold",
        description: "When savings start affecting UC. How to plan. What counts as capital.",
        icon: AlertTriangle
      },
      {
        name: "The £16,000 Cliff",
        description: "When UC stops entirely. Planning the transition to full independence.",
        icon: TrendingUp
      },
      {
        name: "Blockchain Receipts for DWP",
        description: "Your earnings are documented. Export reports. Clean audit trail.",
        icon: Database
      },
      {
        name: "Business vs Personal Accounts",
        description: "Why separation matters under the new Fraud Act. How to set it up.",
        icon: Building
      },
      {
        name: "The Transition Plan",
        description: "Building income gradually. When to stay on UC. When you're ready to leave.",
        icon: Target
      }
    ]
  };

  // Example ecosystem journey (updated)
  const exampleJourney = {
    year1: {
      title: "Year 1: Learn & Connect",
      activities: [
        "Complete TECHreneurs programme",
        "Join Creative Pardner collective",
        "Take on 2-3 small B2B clients (restaurants, small landlords)",
        "Build reputation through excellent work"
      ],
      income: "£300-500/month from B2B + WW programmes"
    },
    year2: {
      title: "Year 2-3: Establish & Grow",
      activities: [
        "Retainer relationships with 4-5 businesses",
        "Referrals bring new clients without marketing",
        "Start working with one construction firm regularly",
        "Notice owner is in his 60s, no succession plan"
      ],
      income: "£800-1,200/month stable"
    },
    year3: {
      title: "Year 3-5: Position for Succession",
      activities: [
        "Become indispensable to construction firm",
        "Learn the business from the inside",
        "Have honest conversations about the future",
        "Explore partnership or gradual buyout"
      ],
      income: "£1,500+/month + succession positioning"
    }
  };

  const outcomes = [
    "Understand why starting from scratch fails — and what works instead",
    "Map Brent's existing business infrastructure and identify gaps",
    "Know the pardner tradition and how to form your own collective",
    "Read succession signals and position for inheritance",
    "Build B2B relationships that generate stable income",
    "Understand exactly how your 55% works and where every pound goes",
    "Navigate UC reporting if applicable — clean, documented, legitimate",
    "Connect with collective (pardner, equipment-sharing, bulk-buying)",
    "TECHreneurs Certification — blockchain verified, portable, permanent"
  ];

  return (
    <PageTemplate
      pageTitle="TECHreneurs"
      pageStrapline="Ecosystem Economics & Collective Wealth-Building — Strengthen what's here, don't start from scratch."
      pageType="programme"
    >
      <DraggableMaya 
        membershipTier="visitor"
        pageType="programme"
        pageContext={{
          title: "TECHreneurs Programme",
          section: "programmes",
          contentType: "ecosystem-economics"
        }}
      />

      <div className="programme-content techreneurs-page">
        
        {/* Hero Section */}
        <section className="programme-hero techreneurs-hero">
          <div className="hero-badge community">
            <Network size={32} />
          </div>
          <h1>TECHreneurs</h1>
          <p className="hero-tagline">
            Ecosystem Economics & Collective Wealth-Building
          </p>
          <p className="hero-subtitle">
            Strengthen what's here — don't start from scratch
          </p>
        </section>

        {/* The Reality Check */}
        <section className="programme-section reality-section">
          <h2>The Reality Nobody Tells You</h2>
          <p className="section-intro">
            Before we talk about solutions, we need to be honest about what's actually happening. 
            This data comes from Oxford Business School, the Federation of Small Businesses, 
            Lloyd's Bank, and ONS surveys. It's not opinion. It's documented reality.
          </p>
          
          <div className="reality-grid">
            {realityCheck.map((item, index) => (
              <div key={index} className="reality-card">
                <div className="reality-stat">{item.stat}</div>
                <div className="reality-context">{item.context}</div>
                <div className="reality-comparison">{item.comparison}</div>
              </div>
            ))}
          </div>

          <div className="reality-note">
            <AlertTriangle size={24} />
            <p>
              These numbers don't happen by accident. They persist because most "solutions" 
              assume you're starting from scratch. But what if you didn't have to?
            </p>
          </div>
        </section>

        {/* Brent's Existing Infrastructure */}
        <section className="programme-section infrastructure-section">
          <h2>What's Already Here</h2>
          <p className="section-intro">
            Brent is one of London's wealthiest Black communities. Construction firms, property 
            managers, wholesalers, logistics companies, restaurants — they're already here. 
            They have customers, reputation, cash flow. They also have gaps.
          </p>
          
          <div className="infrastructure-grid">
            {brentInfrastructure.map((sector, index) => {
              const Icon = sector.icon;
              return (
                <div key={index} className="infrastructure-card">
                  <div className="infra-header">
                    <Icon size={28} />
                    <h3>{sector.sector}</h3>
                  </div>
                  <div className="infra-reality">
                    <strong>Reality:</strong> {sector.reality}
                  </div>
                  <div className="infra-needs">
                    <strong>What they need:</strong> {sector.needs}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="infrastructure-insight">
            <Lightbulb size={24} />
            <p>
              <strong>The insight:</strong> These businesses have customers, reputation, and cash flow. 
              What they often lack is time, digital skills, and succession plans. That's where you come in.
            </p>
          </div>
        </section>

        {/* The Three Failing Approaches */}
        <section className="programme-section narratives-section">
          <h2>Three Paths That Don't Work</h2>
          <p className="section-intro">
            Caribbean families inherit two narratives about success. But there's a third failing 
            path that entrepreneurship culture promotes. All three share the same flaw.
          </p>
          
          <div className="narratives-grid three-column">
            {failingApproaches.map((approach, index) => (
              <div key={index} className="narrative-card">
                <h3>{approach.name}</h3>
                <div className="narrative-promise">
                  <strong>The promise:</strong> {approach.promise}
                </div>
                <div className="narrative-reality">
                  <strong>The reality:</strong>
                  <ul>
                    {approach.reality.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="narrative-wound">
                  <em>"{approach.wound}"</em>
                </div>
              </div>
            ))}
          </div>

          <div className="narratives-bridge">
            <p>
              <strong>All three paths share the same assumption:</strong> you have to build from 
              scratch, find your own customers, and compete against everyone else. But what if 
              there's infrastructure that already works — and just needs strengthening?
            </p>
          </div>
        </section>

        {/* The Ecosystem Path */}
        <section className="programme-section third-path-section">
          <h2>The Ecosystem Approach</h2>
          <p className="section-intro">
            Instead of starting from scratch, connect to what's already here. Fill gaps. 
            Serve existing businesses. Position yourself for succession. The infrastructure 
            exists — you just need to plug into it.
          </p>
          
          <div className="third-path-grid">
            {ecosystemPath.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="path-comparison-card">
                  <div className="path-old">
                    <span className="path-label">❌ Old Thinking</span>
                    <p>{item.old}</p>
                  </div>
                  <div className="path-arrow">
                    <Icon size={24} />
                  </div>
                  <div className="path-new">
                    <span className="path-label">✓ Ecosystem Thinking</span>
                    <p>{item.new}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Succession: The Long Game */}
        <section className="programme-section succession-section">
          <h2>Succession: The Long Game</h2>
          <p className="section-intro">
            Many Brent businesses were started by first-generation owners now in their 50s-60s. 
            Their children often pursued professional careers. Who inherits the construction 
            firm? The property portfolio? The wholesale operation? This could be you.
          </p>

          <div className="succession-content">
            <div className="succession-signals">
              <h3>Signals to Watch For</h3>
              <ul>
                {successionSignals.map((signal, index) => (
                  <li key={index}>
                    <Key size={16} />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="succession-timeline">
              <h3>The Long Game Timeline</h3>
              <div className="timeline-steps">
                <div className="timeline-step">
                  <span className="step-year">Year 1</span>
                  <p>Build relationships. Do excellent work. Be reliable. Learn the business.</p>
                </div>
                <div className="timeline-step">
                  <span className="step-year">Year 2-3</span>
                  <p>Take on more responsibility. Solve problems before being asked. Become indispensable.</p>
                </div>
                <div className="timeline-step">
                  <span className="step-year">Year 3-5</span>
                  <p>Have honest conversations about the future. Explore partnership or gradual buyout.</p>
                </div>
                <div className="timeline-step">
                  <span className="step-year">Year 5+</span>
                  <p>Transition. Full ownership, partnership, or structured handover.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="succession-reality">
            <p>
              <strong>Real talk:</strong> You could spend 5 years building a business from scratch 
              (90% failure rate) or 5 years positioning yourself to inherit one that already works 
              (with customers, reputation, systems, maybe even property). Which sounds smarter?
            </p>
          </div>
        </section>

        {/* Heritage Economics: The Pardner Tradition */}
        <section className="programme-section pardner-section">
          <h2>Heritage Economics: How Brent Was Built</h2>
          <p className="section-intro">
            The construction firms and property portfolios in Brent weren't built with bank loans. 
            When banks wouldn't serve the Windrush generation, they built their own financial 
            infrastructure — the pardner. It worked then. It works now.
          </p>

          <div className="pardner-explainer">
            <div className="pardner-how">
              <h3>How Pardner Works</h3>
              <ol>
                {pardnerHow.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <div className="pardner-example">
                <strong>Example:</strong> 10 people, £100/month each = £1,000 pool. 
                Each month, one person gets £1,000. After 10 months, everyone has 
                contributed £1,000 and received £1,000. No interest. No bank. Pure trust.
              </div>
            </div>

            <div className="pardner-traditions">
              <h3>Same Principle, Different Names</h3>
              <div className="traditions-grid">
                {heritageFinance.map((tradition, index) => (
                  <div key={index} className="tradition-card">
                    <span className="tradition-icon">{tradition.icon}</span>
                    <strong>{tradition.name}</strong>
                    <span className="tradition-origin">{tradition.origin}</span>
                  </div>
                ))}
              </div>
              <p className="traditions-note">
                Wembley has all these communities. The principle is the same: 
                collective capital, community trust, no gatekeepers.
              </p>
            </div>
          </div>

          <div className="pardner-modern">
            <h3>Creative Pardner: Applied to B2B Services</h3>
            <div className="creative-pardner-grid">
              <div className="creative-pardner-card">
                <h4>🛠️ Equipment Collective</h4>
                <p>
                  8 members, £50/month each. Pool buys equipment everyone needs — 
                  bookkeeping software, professional tools, shared vehicle deposit. 
                  None could afford alone, together you have leverage.
                </p>
              </div>
              <div className="creative-pardner-card">
                <h4>📋 Contract Collective</h4>
                <p>
                  Some B2B contracts need a team. School device maintenance, fleet 
                  servicing, event staffing. Collective can take on work individuals can't. 
                  Split earnings, build track record.
                </p>
              </div>
              <div className="creative-pardner-card">
                <h4>🏢 Workspace Collective</h4>
                <p>
                  Shared commercial space for the group. Small workshop, shared desk, 
                  meeting room. Rental income from external bookings funds upgrades. 
                  Professional address for B2B credibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Ecosystem Journey */}
        <section className="programme-section journey-section">
          <h2>Example Ecosystem Journey</h2>
          <p className="section-intro">
            This isn't about one big break. It's about steady progression — from learning 
            to earning to inheriting.
          </p>

          <div className="journey-timeline">
            <div className="journey-phase">
              <div className="phase-header">
                <span className="phase-year">{exampleJourney.year1.title}</span>
                <span className="phase-income">{exampleJourney.year1.income}</span>
              </div>
              <ul>
                {exampleJourney.year1.activities.map((activity, i) => (
                  <li key={i}>{activity}</li>
                ))}
              </ul>
            </div>

            <div className="journey-phase">
              <div className="phase-header">
                <span className="phase-year">{exampleJourney.year2.title}</span>
                <span className="phase-income">{exampleJourney.year2.income}</span>
              </div>
              <ul>
                {exampleJourney.year2.activities.map((activity, i) => (
                  <li key={i}>{activity}</li>
                ))}
              </ul>
            </div>

            <div className="journey-phase succession-phase">
              <div className="phase-header">
                <span className="phase-year">{exampleJourney.year3.title}</span>
                <span className="phase-income">{exampleJourney.year3.income}</span>
              </div>
              <ul>
                {exampleJourney.year3.activities.map((activity, i) => (
                  <li key={i}>{activity}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="journey-note">
            <p>
              Is this person an "SME with employees"? Not yet. Will they show up in the 0.17%? 
              Not yet. Are they building toward real wealth and business ownership? 
              <strong>Absolutely.</strong>
            </p>
          </div>
        </section>

        {/* Money Circulation */}
        <section className="programme-section circulation-section">
          <h2>Making Money Circulate</h2>
          <p className="section-intro">
            Only 3% of Black spending recirculates in Black businesses. The money exists — 
            it just exits immediately. Wembley Wonders creates infrastructure for circulation.
          </p>

          <div className="circulation-model">
            <div className="circulation-flow">
              <div className="flow-source">
                <h4>Revenue In</h4>
                <p>Membership, sponsorship, sales, B2B contracts, partnerships</p>
              </div>
              <div className="flow-split">
                <div className="split-item creator">
                  <span className="split-percent">55%</span>
                  <span className="split-label">To You</span>
                  <p>Your work, your earnings</p>
                </div>
                <div className="split-item community">
                  <span className="split-percent">25%</span>
                  <span className="split-label">Community Fund</span>
                  <p>Stays in, builds more</p>
                </div>
                <div className="split-item operations">
                  <span className="split-percent">20%</span>
                  <span className="split-label">Operations</span>
                  <p>Keeps it running</p>
                </div>
              </div>
            </div>
            <div className="circulation-note">
              <p>
                <strong>The 25% community fund is critical.</strong> It doesn't exit. It funds 
                sliding scale access, equipment, programmes, collective investments. Money that 
                would normally leave stays here and compounds.
              </p>
            </div>
          </div>
        </section>

        {/* Core Modules */}
        <section className="programme-section">
          <h2>What You'll Learn</h2>
          <p className="section-intro">
            TECHreneurs isn't generic business training. It's ecosystem economics — 
            how to connect to what's here, not start from scratch.
          </p>
          
          <div className="modules-grid core-modules">
            {coreModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div key={index} className="module-card critical">
                  <div className="module-header">
                    <Icon size={28} />
                    <span className="critical-badge">Core</span>
                  </div>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Practical Skills Modules */}
        <section className="programme-section">
          <h2>Practical Skills</h2>
          <p className="section-intro">
            The economic literacy that keeps you safe and helps you grow.
          </p>
          
          <div className="modules-grid practical-modules">
            {practicalModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div key={index} className="module-card">
                  <Icon size={28} />
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* UC Navigation Module */}
        <section className="programme-section uc-section">
          <div className="uc-header">
            <Landmark size={32} />
            <div>
              <h2>Navigating Universal Credit</h2>
              <p className="uc-subtitle">
                We know many members are building income while on benefits. 
                This module is for you.
              </p>
            </div>
          </div>

          <div className="uc-context">
            <p>
              The Public Authorities (Fraud, Error and Recovery) Act 2024-25 means more 
              scrutiny on savings and income for UC claimants from 2026. This isn't about 
              avoiding anything — it's about doing everything correctly, documented, legitimate.
            </p>
          </div>

          <div className="uc-modules-grid">
            {ucModule.sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className="uc-module-card">
                  <Icon size={24} />
                  <h4>{section.name}</h4>
                  <p>{section.description}</p>
                </div>
              );
            })}
          </div>

          <div className="uc-assurance">
            <CheckCircle size={24} />
            <div>
              <h4>Your Earnings Are Clean</h4>
              <p>
                All work through Wembley Wonders is blockchain-documented. Dates, amounts, 
                your share — all exportable. DWP asks for proof? Here's the receipt, 
                cryptographically verified, from a registered CIC.
              </p>
            </div>
          </div>
        </section>

        {/* For Parents / For Young People */}
        <section className="programme-section messaging-section">
          <h2>Having the Conversation</h2>
          <p className="section-intro">
            The generational economic conversation Caribbean families are already having — 
            but now with a path that actually works.
          </p>

          <div className="messaging-grid">
            <div className="messaging-card parents">
              <h3>👵 For Parents</h3>
              <p>
                "Your children are learning to connect to existing businesses in the community — 
                the construction firms, property managers, restaurants. Not starting from scratch 
                with a 90% failure rate. Building relationships, proving value, positioning for 
                succession. The same way the businesses you know were actually built."
              </p>
            </div>
            <div className="messaging-card young-people">
              <h3>🧑 For Young People</h3>
              <p>
                "You don't have to choose between a degree that leads nowhere, chasing fame, 
                or gambling on a startup. There's infrastructure here that works — it just needs 
                people to strengthen it. Fill gaps. Serve businesses. Position for inheritance. 
                Build real wealth, not just income."
              </p>
            </div>
          </div>
        </section>

        {/* Programme Showcase */}
        <MediaSection 
          contentType="techreneurs-showcase"
          title="Building Together"
          description="Members connecting to Brent's business ecosystem and building sustainable income"
          allowedRoles={['staff', 'volunteer', 'editor']}
          placeholder="Share TECHreneurs ecosystem connections and collective achievements"
          autoArchive={false}
          maxItems={6}
          layout="grid"
        />

        {/* Outcomes */}
        <section className="programme-section outcomes-section">
          <h2>What You'll Have When You Complete</h2>
          <div className="outcomes-grid">
            {outcomes.map((outcome, index) => (
              <div key={index} className="outcome-item">
                <CheckCircle size={20} />
                <p>{outcome}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Programme Structure */}
        <section className="programme-section structure-section">
          <h2>Programme Structure</h2>
          
          <div className="structure-timeline">
            <div className="timeline-item">
              <div className="timeline-week">Week 1-2</div>
              <div className="timeline-content">
                <h4>Reality & Ecosystem Mapping</h4>
                <p>The 0.17% data, why starting from scratch fails, mapping Brent's infrastructure</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-week">Week 3-4</div>
              <div className="timeline-content">
                <h4>Heritage Economics & Collectives</h4>
                <p>Pardner traditions, forming your collective, 55/25/20 model, gap analysis</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-week">Week 5-6</div>
              <div className="timeline-content">
                <h4>B2B Skills & Protection</h4>
                <p>Pricing, relationship building, succession signals, UC navigation (if applicable)</p>
              </div>
            </div>
            <div className="timeline-item completion">
              <div className="timeline-week">Completion</div>
              <div className="timeline-content">
                <h4>TECHreneurs Certification</h4>
                <p>Blockchain-verified credential. Connected to your collective. Ready to build.</p>
              </div>
            </div>
          </div>

          <div className="structure-note">
            <Clock size={20} />
            <p>
              <strong>Flexible pacing.</strong> Some complete in 4 weeks, some take 8. 
              Self-directed with cohort support. The point is understanding, not speed.
            </p>
          </div>
        </section>

        {/* The Certification */}
        <section className="programme-section certification-section">
          <div className="certification-card">
            <div className="cert-header">
              <Award size={32} />
              <h2>TECHreneurs Certification</h2>
            </div>
            <p>
              When you complete TECHreneurs, your certification is recorded on the blockchain. 
              Not a PDF that could be faked — a cryptographically verified credential that 
              proves you understand ecosystem economics and collective wealth-building.
            </p>
            <div className="cert-features">
              <div className="cert-feature">
                <Database size={20} />
                <span>Blockchain verified</span>
              </div>
              <div className="cert-feature">
                <Clock size={20} />
                <span>Timestamped permanently</span>
              </div>
              <div className="cert-feature">
                <Shield size={20} />
                <span>Portable to any platform</span>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="programme-cta techreneurs-cta">
          <div className="cta-content">
            <Network size={48} />
            <h2>Ready to Connect?</h2>
            <p>
              TECHreneurs runs in rolling cohorts. Join the next one and start connecting 
              to Brent's business ecosystem.
            </p>
            <div className="cta-buttons">
              <Link to="/programmes/techreneurs/sandbox" className="cta-button primary">
                Try the Tools Free
              </Link>
              <Link to="/get-started" className="cta-button secondary">
                Join Next Cohort
              </Link>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="programme-section closing-section">
          <blockquote className="closing-quote">
            "Brent's wealth wasn't built by individuals competing with each other. It was 
            built by networks that circulated capital, shared opportunities, and invested 
            in the next generation. We're not teaching you to start from scratch — we're 
            reconnecting you to infrastructure that already works."
          </blockquote>
        </section>

      </div>
    </PageTemplate>
  );
};

export default TECHreneursPage;