import React, { useState } from 'react';
import { Users, Award, Target, Heart, Globe, Shield, TrendingUp, CheckCircle, MapPin, Calendar, FileText, DollarSign, BookOpen, Radio, Drama, Factory, Zap, Lock, Scale, Mic, PenTool, Music, ChefHat, Sparkles, Eye, Link2, Clock, Fingerprint, Database, FileCheck, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import DraggableMaya from '../components/maya/DraggableMaya';
import './AboutUsPage.css';

type TabType = 'stance' | 'factory' | 'model' | 'protection' | 'productions' | 'leadership' | 'governance';

/**
 * REWRITTEN WITH CORE UNDERSTANDING
 * ==================================
 * "We find the wonders the system would otherwise miss, 
 *  and we make sure they keep what they build."
 * 
 * The talent is already there. The CIC's job is to:
 * 1. SEE IT (when others don't)
 * 2. PROTECT IT (from systems that extract and redirect)
 * 3. DEVELOP IT (with proper resources)
 * 4. CREDIT IT (properly, permanently, financially)
 */

const AboutUsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('stance');

  const leadership = [
    {
      name: "Judith Fontanelle",
      role: "Director of Community Engagement",
      background: "Community development specialist with 15+ years experience in grassroots organizing and cultural programming.",
      expertise: "Cultural production partnerships, creator development, stakeholder engagement",
      achievements: "Led cultural initiatives serving 500+ creators, established partnerships with 12 community organizations"
    },
    {
      name: "Claude Fontanelle", 
      role: "Technical Director & Community Systems Architect",
      background: "Technology educator and community organizer specializing in cultural production platforms and broadcast systems.",
      expertise: "Radio drama production, broadcast technology, cultural archive systems",
      achievements: "Developed Rayd-yo broadcast platform, designed production workflow systems, built G-Tech Cyberstore"
    },
    {
      name: "Flora Agba",
      role: "Health And Safety Advisor", 
      background: "Professional health and safety consultant ensuring all productions meet regulatory compliance and safeguarding standards.",
      expertise: "Production safety, cast/crew safeguarding, regulatory compliance",
      achievements: "Established comprehensive safeguarding framework, zero incidents across all productions"
    },
    {
      name: "Michael Franklin",
      role: "Healthcare Professional & Wellbeing Advisor",
      background: "Healthcare professional bringing medical expertise to cast/crew wellbeing and production safety.",
      expertise: "Cast wellbeing, production health protocols, mental health support",
      achievements: "Designed health-conscious production protocols, established wellbeing support for performers"
    }
  ];

  const factoryStats = [
    { metric: "Creator Revenue Share", value: "55%", context: "Yours. Permanently." },
    { metric: "Pipeline Stages", value: "6", context: "Ideas to income" },
    { metric: "Entry Points", value: "8", context: "Find your discipline" },
    { metric: "Credit Extraction", value: "0%", context: "Your name stays on it" }
  ];

  const entryPoints = [
    { name: "STEMgineers", icon: Zap, products: "STEM escape rooms, physics of football, wearable tech projects", price: "£5-£200" },
    { name: "Silk Stilettos", icon: PenTool, products: "Tactical UI kits, strategy systems, biomimicry design frameworks", price: "£5-£120" },
    { name: "Trubble n Bass", icon: Music, products: "Beat packs, synth presets, sound-to-LED projects", price: "£7-£35" },
    { name: "Pageturners", icon: BookOpen, products: "Interactive fiction, culture guides, anthology zines", price: "£5-£50" },
    { name: "Kaywana's Court", icon: Drama, products: "Performance scripts, culture packs, audio dramas", price: "£10-£45" },
    { name: "G-Tech Casters", icon: Mic, products: "Podcast kits, audio branding, interview frameworks", price: "£10-£50" },
    { name: "Auntie Anansi's Kitchen", icon: ChefHat, products: "Heritage recipe packs, food story bundles", price: "£10-£35" },
    { name: "Bright Sparks", icon: Sparkles, products: "Try everything, find your fire", price: "Free start" }
  ];

  return (
    <PageTemplate
      pageTitle="The Talent Is Already Here"
      pageStrapline="Somewhere in Wembley right now there's someone with Rosalind Franklin's precision, Ada Lovelace's vision, or Zaha Hadid's clarity. The system will miss them. We won't. We find the wonders the system overlooks, and we make sure they keep what they build."
      pageType="framework"
    >
      <DraggableMaya 
        membershipTier="visitor"
        pageType="framework"
        pageContext={{
          title: "About Wembley Wonders CIC",
          section: "framework",
          contentType: "governance"
        }}
      />

      <div className="about-content">
        {/* Legal Status Badge */}
        <div className="legal-status-badge">
          <Shield size={16} />
          <span>Community Interest Company • No. 12960817 • Asset-Locked Structure</span>
        </div>

        {/* Navigation Tabs */}
        <nav className="tab-navigation">
          {[
            { id: 'stance', label: 'Why We Exist', icon: Eye },
            { id: 'factory', label: 'The Factory', icon: Factory },
            { id: 'model', label: '55/25/20 Model', icon: DollarSign },
            { id: 'protection', label: 'How We Protect', icon: Shield },
            { id: 'productions', label: 'Productions', icon: Radio },
            { id: 'leadership', label: 'Leadership', icon: Users },
            { id: 'governance', label: 'Governance', icon: Scale }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as TabType)}
              className={`tab-button ${activeTab === id ? 'active' : ''}`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div className="tab-content">
          
          {activeTab === 'stance' && (
            <div className="story-section">
              <h2>Recognition, Not Rescue</h2>
              
              <div className="stance-hero">
                <blockquote className="stance-quote">
                  "Rosalind Franklin took the photograph that proved DNA's structure. Watson and Crick 
                  got the Nobel. Jocelyn Bell Burnell discovered pulsars. Her supervisor got the credit. 
                  Ada Lovelace saw general-purpose computing when Babbage only saw calculation. The pattern 
                  is clear: capability has never been the problem. Recognition systems are. So we built different ones."
                </blockquote>
              </div>

              <div className="story-cards">
                <div className="story-card problem">
                  <Eye size={32} />
                  <h3>The Pattern We See</h3>
                  <p>
                    History is full of people whose work was extracted, credited elsewhere, or simply 
                    overlooked. Not because they lacked talent — because the systems around them weren't 
                    built to recognise it. That pattern continues today. Platforms take 65%. Algorithms 
                    bury work. Credit flows upward. We've watched it happen to people we know.
                  </p>
                  <p className="stance-emphasis">
                    The talent was never the problem.
                  </p>
                </div>

                <div className="story-card solution">
                  <Shield size={32} />
                  <h3>What We Actually Do</h3>
                  <p>
                    We don't "help creators succeed." We find people whose capability the system would 
                    miss, and we build infrastructure that protects what they create. Your work stays yours. 
                    Your name stays on it. Your revenue comes to you. No supervisor taking your Nobel. 
                    No "also contributed" footnote. No algorithm deciding you don't exist this month.
                  </p>
                  <p className="stance-emphasis">
                    Protection, not patronage.
                  </p>
                </div>

                <div className="story-card values">
                  <Award size={32} />
                  <h3>Why "Wonders"</h3>
                  <p>
                    The name isn't aspiration. It's recognition of existing reality. The teenager in Wembley 
                    who thinks like Lovelace — who sees what systems could become, not just what they do — 
                    is already a wonder. The woman with Hadid's uncompromising vision being told she's 
                    "difficult" is already a wonder. Our job is to see them before the system writes them out.
                  </p>
                  <p className="stance-emphasis">
                    They're not becoming wonders. They already are.
                  </p>
                </div>
              </div>

              <div className="stance-comparison">
                <h3>Two Ways to Think About Community Organisations</h3>
                <div className="comparison-table">
                  <div className="comparison-column dependent">
                    <h4>"Helping" Model</h4>
                    <ul>
                      <li>Assumes people need to be developed</li>
                      <li>Success measured by participation numbers</li>
                      <li>Programmes designed for funders</li>
                      <li>Credit often flows to the organisation</li>
                      <li>Dependent on external validation</li>
                      <li>A valid approach for many</li>
                    </ul>
                  </div>
                  <div className="comparison-column self-sufficient">
                    <h4>Recognition Model</h4>
                    <ul>
                      <li>Assumes talent is already present</li>
                      <li>Success measured by creator outcomes</li>
                      <li>Programmes designed for creators</li>
                      <li>Credit stays with the creator</li>
                      <li>Self-sustaining through creator success</li>
                      <li>The approach we've chosen</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="story-card location">
                <Globe size={32} />
                <h3>Rooted in Wembley</h3>
                <div className="address-info">
                  <div className="address-line">
                    <MapPin size={16} />
                    <span>Flat 2, 452 High Road, Wembley, Middlesex, HA9 7AY</span>
                  </div>
                  <p>
                    Based in one of London's most diverse communities. The Franklins, Lovelaces, and Hadids 
                    of our generation are here. They're already creating. Our job is to make sure the system 
                    doesn't miss them the way it's missed so many before.
                  </p>
                  <p>📧 <a href="mailto:hello@wembleywonders.org">hello@wembleywonders.org</a></p>
                </div>
              </div>

              <div className="stance-cta">
                <h3>For the Lovelaces, Franklins, and Hadids</h3>
                <p className="creator-message">
                  If you've built things that got credited elsewhere. If you've been called "difficult" 
                  when you were actually right. If platforms have taken your work and buried it behind 
                  algorithms. We built this infrastructure specifically for you.
                </p>
                <p className="creator-emphasis">55% yours. Your name on it. No extraction.</p>
                <h3>For Those Who Recognise Quality</h3>
                <p className="buyer-message">
                  When you buy from our Cyberstore, you're purchasing directly from creators who keep 
                  the majority of what they earn. No corporate middlemen. No extracted value. The person 
                  who made it gets paid properly. We think that's how it should work.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'factory' && (
            <div className="factory-section">
              <h2>The Creator Factory</h2>
              <p className="section-intro">
                Not a programme that "develops talent." An infrastructure that protects it. 
                Six stages from idea to income, with one guarantee: what you build stays yours.
              </p>

              <div className="factory-stats">
                {factoryStats.map((stat, index) => (
                  <div key={index} className="factory-stat">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-metric">{stat.metric}</div>
                    <div className="stat-context">{stat.context}</div>
                  </div>
                ))}
              </div>

              <div className="pipeline-visual">
                <h3>The Six-Stage Pipeline</h3>
                <div className="pipeline-stages">
                  <div className="pipeline-stage">
                    <div className="stage-number">1</div>
                    <h4>Sandbox</h4>
                    <p>Explore and experiment. Find what interests you. No pressure, no judgement.</p>
                    <span className="stage-duration">Take your time</span>
                  </div>
                  <div className="pipeline-stage">
                    <div className="stage-number">2</div>
                    <h4>Testbed</h4>
                    <p>Build a prototype. Get honest feedback. Test whether it works.</p>
                    <span className="stage-duration">2-4 weeks</span>
                  </div>
                  <div className="pipeline-stage mandatory">
                    <div className="stage-number">3</div>
                    <h4>TECHreneurs</h4>
                    <p>Learn to price, position, and protect your work. The business essentials.</p>
                    <span className="stage-duration">4-6 weeks</span>
                    <span className="stage-badge">Everyone completes this</span>
                  </div>
                  <div className="pipeline-stage">
                    <div className="stage-number">4</div>
                    <h4>The Forge</h4>
                    <p>Build your finished product to professional standard. No compromise.</p>
                    <span className="stage-duration">4-8 weeks</span>
                  </div>
                  <div className="pipeline-stage">
                    <div className="stage-number">5</div>
                    <h4>Polish Bays</h4>
                    <p>Discipline-specific refinement. Ready for launch.</p>
                    <span className="stage-duration">2-4 weeks</span>
                  </div>
                  <div className="pipeline-stage">
                    <div className="stage-number">6</div>
                    <h4>Distribution</h4>
                    <p>Listed in Cyberstore. Promoted via Rayd-yo. Your name on it. Ongoing sales.</p>
                    <span className="stage-duration">Ongoing</span>
                  </div>
                </div>
              </div>

              <div className="factory-principle">
                <Lock size={24} />
                <p>
                  <strong>The TECHreneurs Principle:</strong> Everyone completes our economic 
                  literacy programme before their product ships. Because capability without 
                  commercial understanding is how the Franklins of history got their credit taken. 
                  We teach people to protect what they build.
                </p>
              </div>

              <div className="entry-points-section">
                <h3>Eight Entry Points — One Pipeline</h3>
                <p>Different disciplines, different creative expressions. Same credit protection. Same 55%.</p>
                <div className="entry-points-grid">
                  {entryPoints.map((entry, index) => {
                    const Icon = entry.icon;
                    return (
                      <div key={index} className="entry-point-card">
                        <Icon size={24} />
                        <h4>{entry.name}</h4>
                        <p>{entry.products}</p>
                        <span className="price-range">{entry.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="factory-cta">
                <Link to="/creator-factory" className="btn-factory">
                  <Factory size={20} />
                  Explore The Factory
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'model' && (
            <div className="model-section">
              <h2>The 55/25/20 Model</h2>
              <p className="section-intro">
                This isn't a revenue split. It's anti-extraction architecture. Designed to prevent 
                the pattern where value flows away from the people who created it. Every transaction 
                is recorded on-chain. Every split is enforced by code, not policy.
              </p>

              <div className="revenue-breakdown">
                <div className="revenue-card creator">
                  <div className="revenue-percentage">55%</div>
                  <h3>Stays With the Creator</h3>
                  <p>
                    You made it, you keep the majority. No algorithm adjustments. No platform clawbacks. 
                    No supervisor taking your credit. Your work, your name, your revenue.
                  </p>
                  <div className="revenue-example">
                    <strong>Example:</strong> Your product sells for £25 → You receive £13.75
                  </div>
                  <p className="revenue-comparison">
                    <strong>For context:</strong> Amazon offers 35%, Udemy 37%, YouTube 55% (but algorithm-dependent)
                  </p>
                </div>

                <div className="revenue-card community">
                  <div className="revenue-percentage">25%</div>
                  <h3>Finds the Next Wonder</h3>
                  <p>
                    Production budgets. Equipment. Development programmes. Marketing. When your product 
                    succeeds, it funds finding the next Franklin, the next Lovelace, the next Hadid. 
                    The ones the system would otherwise miss.
                  </p>
                  <div className="revenue-example">
                    <strong>Impact:</strong> Every £100 in sales → £25 to finding more wonders
                  </div>
                </div>

                <div className="revenue-card platform">
                  <div className="revenue-percentage">20%</div>
                  <h3>Keeps the Infrastructure Running</h3>
                  <p>
                    Hosting. Payment processing. Streaming. Insurance. The infrastructure that protects 
                    your credit and delivers your revenue. We run lean so creators keep more.
                  </p>
                  <div className="revenue-example">
                    <strong>Operations:</strong> Modest overhead, maximum creator share
                  </div>
                </div>
              </div>

              <div className="model-difference">
                <h3>Why This Architecture Works</h3>
                <div className="difference-grid">
                  <div className="difference-item">
                    <CheckCircle size={32} />
                    <h4>No Credit Extraction</h4>
                    <p>Your name stays on your work. Permanently. No "also contributed."</p>
                  </div>
                  <div className="difference-item">
                    <Lock size={32} />
                    <h4>Asset-Locked CIC</h4>
                    <p>We legally cannot extract profits. The 55/25/20 split is protected.</p>
                  </div>
                  <div className="difference-item">
                    <TrendingUp size={32} />
                    <h4>Compounding Catalogue</h4>
                    <p>Your second product joins your first. Portfolio grows, income grows.</p>
                  </div>
                  <div className="difference-item">
                    <Shield size={32} />
                    <h4>No Algorithm Games</h4>
                    <p>Your work doesn't get buried when you take a break. Make once, keep earning.</p>
                  </div>
                </div>
              </div>

              <div className="transparency-commitment">
                <h3>Radical Transparency</h3>
                <p>
                  Each quarter, we publish: total sales, creator payments, community fund allocation, 
                  and operational costs. You can see exactly where every pound goes. Because opacity 
                  is how extraction happens. We think sunlight is rather effective protection.
                </p>
                <Link to="/about" className="reports-link">
                  <FileText size={16} />
                  View Transparency Reports →
                </Link>
              </div>

              <div className="blockchain-teaser">
                <Database size={24} />
                <div>
                  <h3>Blockchain-Protected Credit</h3>
                  <p>
                    Every creation timestamped. Every contributor named. Every transaction recorded. 
                    Your work, your name, your proof — permanently and cryptographically verified.
                  </p>
                  <button 
                    onClick={() => setActiveTab('protection')} 
                    className="protection-link"
                  >
                    <Shield size={16} />
                    See How We Protect Your Work →
                  </button>
                </div>
              </div>

              <div className="cta-section dual-register">
                <div className="cta-creator">
                  <h2>For Creators</h2>
                  <p>
                    If you've watched your work get credited elsewhere. If platforms have taken more 
                    than they gave. If you've been the Franklin in a Watson-and-Crick situation. 
                    We built this infrastructure specifically for you.
                  </p>
                  <p className="cta-emphasis">55% yours. Your name on it. No extraction.</p>
                  <Link to="/creator-factory" className="cta-button">
                    <Factory size={18} />
                    Explore the Factory
                  </Link>
                </div>
                <div className="cta-divider">
                  <span>or</span>
                </div>
                <div className="cta-buyer">
                  <h2>For Buyers</h2>
                  <p>
                    When you buy from the Cyberstore, 55% goes directly to the creator. Not a corporation. 
                    Not a platform. The person who made it. Professional quality from people who keep 
                    what they earn.
                  </p>
                  <p className="cta-emphasis">Fair pay. Real creators. Quality work.</p>
                  <Link to="/cyberstore" className="cta-button secondary">
                    <DollarSign size={18} />
                    Visit Cyberstore
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'protection' && (
            <div className="protection-section">
              <h2>How We Protect Your Work</h2>
              <p className="section-intro">
                This isn't policy. It's architecture. Every creation timestamped on-chain. Every contributor 
                named. Every sale recorded. Every credential verifiable. Your work, your name, your proof — 
                permanently.
              </p>

              <div className="protection-hero">
                <blockquote className="protection-quote">
                  "Rosalind Franklin's Photo 51 had no timestamp. No immutable record. No cryptographic 
                  proof of who created it. Watson and Crick could claim they 'built on her work' without 
                  crediting her. We built a system where that can't happen. Ever."
                </blockquote>
              </div>

              <div className="protection-layers">
                <h3>Four Layers of Protection</h3>
                <div className="layers-grid">
                  <div className="layer-card">
                    <Clock size={32} />
                    <h4>Creation Timestamp</h4>
                    <p>
                      The moment you create something, it's timestamped on the blockchain. 
                      Immutable. Permanent. Proves you made it first.
                    </p>
                    <span className="layer-tech">On-chain timestamp with content hash</span>
                  </div>
                  <div className="layer-card">
                    <Fingerprint size={32} />
                    <h4>Attribution Record</h4>
                    <p>
                      Every contributor is named and roled. No "also contributed." No footnotes. 
                      Your name, permanently attached to your work.
                    </p>
                    <span className="layer-tech">Contributor array with roles, on-chain</span>
                  </div>
                  <div className="layer-card">
                    <Link2 size={32} />
                    <h4>Citation Tracking</h4>
                    <p>
                      When someone builds on your work, the citation is recorded on-chain. 
                      Your influence is tracked. Your reputation compounds.
                    </p>
                    <span className="layer-tech">Bidirectional citation links, verified</span>
                  </div>
                  <div className="layer-card">
                    <FileCheck size={32} />
                    <h4>Integrity Verification</h4>
                    <p>
                      Anyone can verify your work hasn't been altered. The content hash proves 
                      this is exactly what you created. No modifications, no claims of changes.
                    </p>
                    <span className="layer-tech">Cryptographic content hash verification</span>
                  </div>
                </div>
              </div>

              <div className="protection-commerce">
                <h3>Every Transaction Protected</h3>
                <div className="commerce-flow">
                  <div className="commerce-step">
                    <span className="step-number">1</span>
                    <h4>You Create</h4>
                    <p>Work timestamped, contributors named, content hash recorded</p>
                  </div>
                  <div className="commerce-arrow">→</div>
                  <div className="commerce-step">
                    <span className="step-number">2</span>
                    <h4>You List</h4>
                    <p>Product added to Cyberstore with your verified creator profile</p>
                  </div>
                  <div className="commerce-arrow">→</div>
                  <div className="commerce-step">
                    <span className="step-number">3</span>
                    <h4>Someone Buys</h4>
                    <p>Transaction recorded on-chain with automatic 55/25/20 split</p>
                  </div>
                  <div className="commerce-arrow">→</div>
                  <div className="commerce-step">
                    <span className="step-number">4</span>
                    <h4>You Get Paid</h4>
                    <p>Blockchain receipt: date, amount, your share, verifiable</p>
                  </div>
                </div>
              </div>

              <div className="protection-credentials">
                <h3>Portable Verified Credentials</h3>
                <p className="credentials-intro">
                  Your achievements aren't just certificates — they're cryptographically verified records 
                  that follow you anywhere.
                </p>
                <div className="credentials-example">
                  <div className="credential-card">
                    <div className="credential-header">
                      <Briefcase size={20} />
                      <span className="credential-type">Creator Profile</span>
                      <span className="credential-verified">✓ Blockchain Verified</span>
                    </div>
                    <div className="credential-content">
                      <h4>Aisha Thompson</h4>
                      <div className="credential-items">
                        <div className="credential-item">
                          <span className="item-label">TECHreneurs Certified</span>
                          <span className="item-value">2026-03-15</span>
                          <span className="item-hash">0x7a3b...</span>
                        </div>
                        <div className="credential-item">
                          <span className="item-label">Products Shipped</span>
                          <span className="item-value">7</span>
                          <span className="item-hash">Verified</span>
                        </div>
                        <div className="credential-item">
                          <span className="item-label">Total Earnings</span>
                          <span className="item-value">£2,847</span>
                          <span className="item-hash">Auditable</span>
                        </div>
                        <div className="credential-item">
                          <span className="item-label">Collaboration Credits</span>
                          <span className="item-value">3 projects</span>
                          <span className="item-hash">On-chain</span>
                        </div>
                      </div>
                    </div>
                    <div className="credential-footer">
                      <span>Issuer: Wembley Wonders CIC #12960817</span>
                      <span>Status: VALID</span>
                    </div>
                  </div>
                </div>
                <p className="credentials-uses">
                  <strong>Use this anywhere:</strong> Bank loan applications. New platform profiles. 
                  Job interviews. Benefits reporting. Anyone can verify — it's on the blockchain.
                </p>
              </div>

              <div className="protection-benefits">
                <h3>For Universal Credit Reporting</h3>
                <p className="benefits-intro">
                  We know many creators are building income while navigating benefits. The blockchain 
                  makes reporting clean and verifiable.
                </p>
                <div className="benefits-features">
                  <div className="benefit-item">
                    <CheckCircle size={20} />
                    <div>
                      <h4>Clean Audit Trail</h4>
                      <p>Every penny earned is documented with dates, amounts, and sources</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <CheckCircle size={20} />
                    <div>
                      <h4>Legitimate Self-Employment</h4>
                      <p>Earnings through a registered CIC with verifiable transaction records</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <CheckCircle size={20} />
                    <div>
                      <h4>Exportable Reports</h4>
                      <p>Generate monthly income reports directly from blockchain data</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <CheckCircle size={20} />
                    <div>
                      <h4>No Ambiguity</h4>
                      <p>DWP asks "prove your earnings" → Here's the blockchain receipt</p>
                    </div>
                  </div>
                </div>
                <div className="benefits-note">
                  <Lock size={20} />
                  <p>
                    TECHreneurs includes guidance on UC reporting, business accounts, and the 
                    £6,000-£16,000 threshold. We help you build income safely and legally.
                  </p>
                </div>
              </div>

              <div className="protection-corporate">
                <h3>Corporate Extraction Blocked</h3>
                <p>
                  Our infrastructure includes runtime protection that prevents corporate entities 
                  from accessing or extracting community IP. The code literally won't run on 
                  corporate domains.
                </p>
                <div className="corporate-blocked">
                  <span className="blocked-label">Blocked:</span>
                  <span className="blocked-corp">Meta</span>
                  <span className="blocked-corp">Google</span>
                  <span className="blocked-corp">Amazon</span>
                  <span className="blocked-corp">Microsoft</span>
                  <span className="blocked-corp">Virgin</span>
                </div>
                <p className="corporate-note">
                  Community use authorized. Corporate extraction prohibited. This isn't policy — 
                  it's encoded in the infrastructure.
                </p>
              </div>

              <div className="protection-summary">
                <h3>The Anti-Franklin Architecture</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-problem">Franklin's Problem</span>
                    <span className="summary-arrow">→</span>
                    <span className="summary-solution">Our Solution</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-problem">No timestamp on Photo 51</span>
                    <span className="summary-arrow">→</span>
                    <span className="summary-solution">On-chain creation timestamp</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-problem">Credit redirected to supervisors</span>
                    <span className="summary-arrow">→</span>
                    <span className="summary-solution">Immutable contributor records</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-problem">"Also contributed" footnotes</span>
                    <span className="summary-arrow">→</span>
                    <span className="summary-solution">Full attribution, named and roled</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-problem">No proof of influence</span>
                    <span className="summary-arrow">→</span>
                    <span className="summary-solution">Citation tracking on-chain</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-problem">Work modified without consent</span>
                    <span className="summary-arrow">→</span>
                    <span className="summary-solution">Cryptographic integrity verification</span>
                  </div>
                </div>
              </div>

              <div className="protection-cta">
                <h3>Your Work. Your Name. Your Proof.</h3>
                <p>
                  What you build here is protected by architecture, not promises. The blockchain 
                  doesn't care who has more power or better lawyers. The record is the record. 
                  Permanently.
                </p>
                <Link to="/creator-factory" className="cta-button">
                  <Factory size={18} />
                  Start Building
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'productions' && (
            <div className="productions-section">
              <h2>Cultural Productions</h2>
              
              <div className="production-context">
                <Radio size={24} />
                <p>
                  Cultural production is where we began — bringing V.S. Naipaul, Derek Walcott, and 
                  Sam Selvon to contemporary audiences. It remains a core pathway, integrated into 
                  The Factory model. Cast and crew keep 55% through the same credit protection as all creators.
                </p>
              </div>

              <div className="production-showcase">
                <h3>Production Timeline</h3>
                <div className="showcase-grid">
                  <div className="showcase-item current">
                    <Radio size={32} />
                    <span className="production-status">Q1 2026</span>
                    <h4>A House for Mr Biswas</h4>
                    <p>V.S. Naipaul's masterpiece as 8-part radio drama</p>
                    <span className="production-meta">18 cast/crew • 55% revenue share</span>
                  </div>
                  <div className="showcase-item upcoming">
                    <Drama size={32} />
                    <span className="production-status">Q3 2026</span>
                    <h4>Louise Bennett Evening</h4>
                    <p>Live performance celebrating Jamaican patois poetry</p>
                    <span className="production-meta">Live + broadcast • Community event</span>
                  </div>
                  <div className="showcase-item roadmap">
                    <BookOpen size={32} />
                    <span className="production-status">2026–2028</span>
                    <h4>Caribbean Voices Archive</h4>
                    <p>From Edwidge Danticat to Derek Walcott</p>
                    <span className="production-meta">Quarterly productions • Growing archive</span>
                  </div>
                </div>
              </div>

              <div className="production-roles">
                <h3>Nine Professional Roles</h3>
                <p>The Factory develops creators across all production disciplines — and protects their credit properly.</p>
                <div className="roles-grid">
                  <div className="role-item">Director</div>
                  <div className="role-item">Producer</div>
                  <div className="role-item">Writer</div>
                  <div className="role-item">Sound Designer</div>
                  <div className="role-item">Voice Actor</div>
                  <div className="role-item">Music Composer</div>
                  <div className="role-item">Editor</div>
                  <div className="role-item">Production Manager</div>
                  <div className="role-item">Marketing Lead</div>
                </div>
              </div>

              <div className="production-pathway">
                <h3>From Performance to Platform</h3>
                <div className="pathway-flow">
                  <div className="pathway-step">
                    <span>1</span>
                    <p><strong>Create</strong> — Perform in productions. Learn the craft. Build your portfolio.</p>
                  </div>
                  <div className="pathway-step">
                    <span>2</span>
                    <p><strong>Package</strong> — Turn your skills into sellable products. Tutorials. Templates. Assets.</p>
                  </div>
                  <div className="pathway-step">
                    <span>3</span>
                    <p><strong>Profit</strong> — List in the Cyberstore. 55% is yours. Your name on it. Ongoing revenue.</p>
                  </div>
                </div>
              </div>

              <div className="productions-cta">
                <Link to="/programmes" className="btn-productions">
                  <Radio size={20} />
                  Explore Productions
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'leadership' && (
            <div className="leadership-section">
              <h2>Leadership</h2>
              <p className="section-intro">
                A small team with a clear purpose: find the wonders, build the infrastructure, 
                protect what they create.
              </p>

              <div className="leadership-grid">
                {leadership.map((leader, index) => (
                  <div key={index} className="leader-card">
                    <div className="leader-header">
                      <div className="leader-avatar">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="leader-info">
                        <h3>{leader.name}</h3>
                        <span className="leader-role">{leader.role}</span>
                      </div>
                    </div>
                    <p className="leader-background">{leader.background}</p>
                    <div className="leader-details">
                      <h4>Core Expertise:</h4>
                      <p>{leader.expertise}</p>
                      <h4>Key Achievements:</h4>
                      <p>{leader.achievements}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="leadership-accountability">
                <Shield size={24} />
                <div>
                  <h3>Leadership Accountability</h3>
                  <p>
                    All leadership decisions are documented in our public governance records. 
                    Quarterly reports include leadership activities, decisions made, and outcomes achieved. 
                    Because the people we serve deserve to know how we're spending their trust.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'governance' && (
            <div className="governance-section">
              <h2>Governance</h2>
              <p className="section-intro">
                Community Interest Company structure means we legally cannot extract value. 
                The infrastructure belongs to the community it serves. That's rather the point.
              </p>

              <div className="governance-cards">
                <div className="governance-card">
                  <Lock size={32} />
                  <h3>Asset Lock</h3>
                  <p>
                    All assets are permanently locked for community benefit. Directors cannot extract 
                    profits. If the company dissolves, assets transfer to similar CICs. This isn't 
                    policy — it's law.
                  </p>
                </div>

                <div className="governance-card">
                  <Scale size={32} />
                  <h3>Community Interest Test</h3>
                  <p>
                    Every major decision is tested against community benefit. Does this serve creators? 
                    Does this protect their credit? Does this build sustainable infrastructure? 
                    If not, we don't do it.
                  </p>
                </div>

                <div className="governance-card">
                  <FileText size={32} />
                  <h3>Radical Transparency</h3>
                  <p>
                    Quarterly public reports: revenue, creator payments, community fund allocation, 
                    operational costs, leadership decisions. Opacity is how extraction happens. 
                    We don't do opacity.
                  </p>
                </div>

                <div className="governance-card">
                  <Users size={32} />
                  <h3>Creator Representation</h3>
                  <p>
                    Active creators have formal input into governance decisions. Not consultation theatre. 
                    Actual structural representation. The people we serve shape how we serve them.
                  </p>
                </div>
              </div>

              <div className="incorporation-info">
                <Calendar size={24} />
                <div>
                  <h3>Incorporated 2020</h3>
                  <p>
                    Company No. 12960817. Five years of continuous operation. Zero regulatory violations. 
                    Consistent audits. Growing community trust.
                  </p>
                </div>
              </div>

              <div className="governance-difference">
                <h3>The Governance Distinction</h3>
                <p>
                  Many organisations say they serve their community. We're legally required to. 
                  The CIC structure means our governance isn't a choice — it's an obligation. 
                  We think that distinction matters quite a lot.
                </p>
              </div>

              <div className="closing-statement">
                <h3>Why We Built This</h3>
                <p>
                  Rosalind Franklin took the photograph. Jocelyn Bell Burnell found the pulsars. 
                  Ada Lovelace saw the future of computing. The pattern of extraction and 
                  misdirected credit is centuries old.
                </p>
                <p>
                  Somewhere in Wembley right now, there's someone with that same capability. 
                  The system will miss them. We won't.
                </p>
                <p className="closing-emphasis">
                  We find the wonders the system overlooks. We make sure they keep what they build.
                </p>
                <p className="closing-tagline">
                  That's what a Community Interest Company is for.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </PageTemplate>
  );
};

export default AboutUsPage;
