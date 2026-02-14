// ========================================
// ECOSYSTEM EXPLORER
// ========================================
// Strategic tool connecting STEMgeneers to existing Brent business infrastructure
// Not creating entrepreneurs from scratch - preparing people to strengthen what's here

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Import from the sandbox's module CSS
import styles from './STEMgeneersSandbox.module.css';

type PathwayKey = 'mobility' | 'devices' | 'studio' | null;
type ViewMode = 'businesses' | 'entry-points' | 'succession' | 'event-economy';

interface BusinessCategory {
  name: string;
  icon: string;
  description: string;
  brentContext: string;
  exampleTypes: string[];
  skillsNeeded: string[];
  whyTheyNeedYou: string;
}

interface EntryPoint {
  type: string;
  description: string;
  timeframe: string;
  whatYouOffer: string;
  whatYouGain: string;
  realTalk: string;
}

interface SuccessionSignal {
  signal: string;
  meaning: string;
  opportunity: string;
}

interface EventEconomyService {
  service: string;
  demandSpike: string;
  whoProvides: string;
  entryPath: string;
  skillsRequired: string[];
}

// ========================================
// DATA: BUSINESS CATEGORIES BY PATHWAY
// ========================================

const BUSINESS_CATEGORIES: Record<string, BusinessCategory[]> = {
  mobility: [
    {
      name: "Delivery & Logistics Firms",
      icon: "📦",
      description: "Last-mile delivery companies, courier services, food delivery fleet operators",
      brentContext: "Brent has dense logistics operations serving North West London. Many run fleets of e-bikes and e-cargo bikes.",
      exampleTypes: ["Courier companies", "Restaurant delivery fleets", "Grocery delivery operations", "Parcel logistics"],
      skillsNeeded: ["Fleet maintenance", "Battery management", "Quick turnaround repairs", "Preventive servicing"],
      whyTheyNeedYou: "Downtime costs money. A bike off the road is lost revenue. They need reliable, fast repair—not sending vehicles across London."
    },
    {
      name: "E-Bike/Scooter Rental Operations",
      icon: "🛴",
      description: "Short-term rental businesses, tour operators, corporate bike schemes",
      brentContext: "Wembley events create seasonal rental demand. Several local operators manage fleets for visitors.",
      exampleTypes: ["Event day rentals", "Tourist bike hire", "Corporate campus fleets", "Hotel partnerships"],
      skillsNeeded: ["High-volume servicing", "Cosmetic repairs", "Battery rotation", "Safety checks"],
      whyTheyNeedYou: "Rental bikes take abuse. They need constant maintenance to stay rentable. Volume work, steady relationships."
    },
    {
      name: "Car Dealerships with EV Service",
      icon: "🚗",
      description: "Dealerships adding electric vehicle servicing, hybrid specialists",
      brentContext: "Multiple dealerships on the North Circular are adding EV capability. Skills gap is real.",
      exampleTypes: ["Main dealers with EV lines", "Independent garages adding EV", "Specialist EV workshops"],
      skillsNeeded: ["High-voltage safety", "Battery diagnostics", "Charging system repair", "Hybrid systems"],
      whyTheyNeedYou: "Existing mechanics often lack EV training. You bring fresh skills to established operations."
    },
    {
      name: "Property Management Fleets",
      icon: "🏢",
      description: "Housing associations, estate managers running maintenance vehicle fleets",
      brentContext: "Brent Housing, L&Q, and private landlords operate e-bike and e-van fleets for site visits and maintenance.",
      exampleTypes: ["Housing association maintenance teams", "Estate management companies", "Facilities management"],
      skillsNeeded: ["Scheduled maintenance", "Reliability focus", "Documentation", "Contract compliance"],
      whyTheyNeedYou: "They need predictable costs and reliable service. Long-term contracts, not one-off jobs."
    }
  ],
  devices: [
    {
      name: "Existing Phone Repair Shops",
      icon: "📱",
      description: "Independent repair businesses, market stall operators, high street shops",
      brentContext: "Wembley High Road and Harlesden have multiple phone repair operations. Some owners are aging out.",
      exampleTypes: ["High street repair shops", "Market traders", "Shopping centre units", "Mobile repair services"],
      skillsNeeded: ["Screen/battery replacement", "Microsoldering", "Customer service", "Stock management"],
      whyTheyNeedYou: "Many owners want to step back but have no successor. Your skills + their customer base = opportunity."
    },
    {
      name: "IT Support Companies",
      icon: "💻",
      description: "Managed service providers, business IT support, network specialists",
      brentContext: "Local businesses need IT support but can't afford big contracts. Several small MSPs operate in Brent.",
      exampleTypes: ["Small business IT support", "School IT contracts", "NHS trust subcontractors", "Retail POS support"],
      skillsNeeded: ["Network troubleshooting", "Hardware repair", "Customer communication", "Remote support"],
      whyTheyNeedYou: "They're often stretched thin. Subcontracting hardware work frees them for higher-margin services."
    },
    {
      name: "Care Sector Tech Support",
      icon: "🏥",
      description: "Care homes, domiciliary care providers, assisted living facilities",
      brentContext: "Brent has significant elderly population. Care providers increasingly use tablets, monitoring devices, communication tech.",
      exampleTypes: ["Care home chains", "Domiciliary care agencies", "Sheltered housing", "Day centres"],
      skillsNeeded: ["Patient explanation", "Device setup", "Accessibility configuration", "Family liaison"],
      whyTheyNeedYou: "Tech is mandated but poorly supported. You bring patience and cultural understanding they can't hire for."
    },
    {
      name: "Schools & Colleges",
      icon: "🎓",
      description: "Device management, Chromebook repair, IT technician roles",
      brentContext: "Every Brent school runs hundreds of devices. Repair backlogs are constant.",
      exampleTypes: ["Primary schools", "Secondary schools", "Colleges", "PRUs", "Supplementary schools"],
      skillsNeeded: ["Chromebook repair", "Device imaging", "Inventory management", "Safeguarding awareness"],
      whyTheyNeedYou: "Schools can't afford full-time technicians. Contract or part-time arrangements fill gaps."
    }
  ],
  studio: [
    {
      name: "Event Production Companies",
      icon: "🎪",
      description: "Sound, lighting, staging for events—conferences to concerts",
      brentContext: "Wembley events create constant demand. Several production companies are based locally to serve the stadium and arena.",
      exampleTypes: ["Corporate AV", "Concert production", "Festival staging", "Conference tech"],
      skillsNeeded: ["Rigging basics", "Cable management", "Equipment operation", "Problem-solving under pressure"],
      whyTheyNeedYou: "Events need crew. Start as runner/tech assistant, learn systems, become indispensable."
    },
    {
      name: "Churches & Faith Organisations",
      icon: "⛪",
      description: "Sound systems, livestreaming, recording for services and events",
      brentContext: "Brent has dense network of Black-led churches. Most have invested in AV but lack trained operators.",
      exampleTypes: ["Large congregations", "Multi-site churches", "Community centres", "Faith events"],
      skillsNeeded: ["Live sound mixing", "Livestream operation", "Recording", "Reliable availability"],
      whyTheyNeedYou: "They have equipment but limited expertise. Consistent Sunday availability = steady relationship."
    },
    {
      name: "Recording Studios & Content Spaces",
      icon: "🎙️",
      description: "Music studios, podcast facilities, content creation spaces",
      brentContext: "Several studios operate in Brent/Harlesden area. Growing demand for podcast and content facilities.",
      exampleTypes: ["Music recording studios", "Podcast studios", "YouTube/TikTok spaces", "Rehearsal rooms"],
      skillsNeeded: ["Audio engineering basics", "Equipment maintenance", "Session support", "Client management"],
      whyTheyNeedYou: "Studios need reliable session engineers and maintenance. Entry is often through assisting."
    },
    {
      name: "Smart Home & Security Installers",
      icon: "🏠",
      description: "Home automation, CCTV, alarm systems, network infrastructure",
      brentContext: "Homeowners and landlords investing in smart tech. Installation demand exceeds local capacity.",
      exampleTypes: ["Smart home installers", "CCTV companies", "Alarm installers", "Network cabling firms"],
      skillsNeeded: ["Basic electrical", "Network configuration", "Customer service", "Neat installation"],
      whyTheyNeedYou: "Established firms need installers. You provide capacity; they provide customers and credibility."
    }
  ]
};

// ========================================
// DATA: ENTRY POINTS (RELATIONSHIP TYPES)
// ========================================

const ENTRY_POINTS: EntryPoint[] = [
  {
    type: "Apprenticeship / Work-Learning",
    description: "Formal or informal arrangement where you learn while working, often at reduced rate initially",
    timeframe: "6-24 months to competence",
    whatYouOffer: "Enthusiasm, reliability, basic skills, willingness to learn, physical capacity",
    whatYouGain: "Real-world skills, industry knowledge, professional network, potential succession path",
    realTalk: "You'll earn less at first. That's the trade-off. You're buying skills with time, not money."
  },
  {
    type: "Subcontracting / Overflow Work",
    description: "Established business sends you jobs they can't handle—too small, too far, wrong timing",
    timeframe: "Can start quickly if skills are solid",
    whatYouOffer: "Reliability, specific skills, flexibility, local presence",
    whatYouGain: "Steady work without marketing, reputation by association, referrals",
    realTalk: "You're not building your own brand initially. You're proving yourself through someone else's."
  },
  {
    type: "Partnership / Buying In",
    description: "Gradual acquisition of stake in existing business, often over years",
    timeframe: "3-10 years typically",
    whatYouOffer: "Capital (eventually), skills, energy, succession solution for aging owner",
    whatYouGain: "Established customer base, equipment, premises, proven business model",
    realTalk: "This is the long game. You're not just working—you're positioning to own."
  },
  {
    type: "Complementary Services",
    description: "You provide something they don't—they refer customers, you refer back",
    timeframe: "Relationship builds over months",
    whatYouOffer: "Skills they lack, capacity they don't have, services outside their focus",
    whatYouGain: "Referrals, credibility, shared customers without direct competition",
    realTalk: "Find the gap in what they do. Fill it. Don't compete—complement."
  },
  {
    type: "Contract / Tender Work",
    description: "Formal arrangements with institutions—schools, councils, housing associations",
    timeframe: "Procurement cycles can be slow (3-12 months)",
    whatYouOffer: "Credentials, insurance, formal processes, competitive pricing",
    whatYouGain: "Predictable income, professional credibility, portfolio evidence",
    realTalk: "Paperwork matters here. Get your certifications, insurance, and processes tight."
  }
];

// ========================================
// DATA: SUCCESSION SIGNALS
// ========================================

const SUCCESSION_SIGNALS: SuccessionSignal[] = [
  {
    signal: "Owner is 55+ with no visible family involvement",
    meaning: "First-generation business with no obvious successor. Owner may be thinking about exit.",
    opportunity: "Build relationship now. Offer to help with tasks they're tired of. Position as potential successor over 3-5 years."
  },
  {
    signal: "Business is stable but not growing",
    meaning: "Owner has stopped investing in expansion—often a sign of approaching retirement.",
    opportunity: "Growth energy is valuable. Propose ideas that expand the business with you leading new areas."
  },
  {
    signal: "Owner mentions health issues or wanting to slow down",
    meaning: "Direct signal of transition consideration. They're testing the waters.",
    opportunity: "Listen carefully. Ask about their plans. Express genuine interest in the business's future."
  },
  {
    signal: "Premises owned, not rented",
    meaning: "Valuable asset that complicates simple closure. Owner may prefer sale as going concern.",
    opportunity: "Property-backed businesses have succession value. The premises alone justify transition planning."
  },
  {
    signal: "Long-term staff with no management path",
    meaning: "Employees have skills but no ownership stake. Owner hasn't built internal succession.",
    opportunity: "External successor may be more attractive than promoting staff (avoids internal politics)."
  },
  {
    signal: "Business relies heavily on owner's personal relationships",
    meaning: "Customer base may not transfer easily. Extended handover period valuable to both parties.",
    opportunity: "Offer to learn the relationships. Gradual introduction to key customers builds transfer value."
  },
  {
    signal: "Equipment is aging but business is profitable",
    meaning: "Owner isn't investing in future—extracting value before exit.",
    opportunity: "Fresh investment energy is attractive. You bring willingness to modernize."
  }
];

// ========================================
// DATA: EVENT ECONOMY (WEMBLEY-SPECIFIC)
// ========================================

const EVENT_ECONOMY: EventEconomyService[] = [
  {
    service: "Mobile Phone Charging Stations",
    demandSpike: "90,000 people need charged phones for tickets, payments, photos, getting home",
    whoProvides: "Currently: random vendors, stadium, some organised operators",
    entryPath: "Partner with existing event services company or pitch directly to venue/event organisers",
    skillsRequired: ["Battery bank management", "High-volume customer service", "Cash/card handling", "Stock logistics"]
  },
  {
    service: "Equipment Hire & Support",
    demandSpike: "Broadcasters, production companies need local equipment backup and runners",
    whoProvides: "Currently: production companies bring their own, some local hire available",
    entryPath: "Build relationship with production companies, offer local emergency support",
    skillsRequired: ["AV equipment knowledge", "Problem-solving under pressure", "Reliability", "Transport"]
  },
  {
    service: "Temporary Staffing (Tech Roles)",
    demandSpike: "Events need runners, tech assistants, scanning operators, AV support",
    whoProvides: "Currently: staffing agencies, some direct hire",
    entryPath: "Register with event staffing agencies, build reputation for tech-capable roles",
    skillsRequired: ["Basic tech competence", "Professionalism", "Stamina", "Flexibility"]
  },
  {
    service: "E-Bike/Scooter Fleet Support",
    demandSpike: "Rental operators need maintenance, redistribution, charging during high-demand periods",
    whoProvides: "Currently: rental company staff (often stretched thin on event days)",
    entryPath: "Approach rental operators offering event-day support contracts",
    skillsRequired: ["E-bike maintenance", "Logistics coordination", "Physical fitness", "Local knowledge"]
  },
  {
    service: "Network/WiFi Support",
    demandSpike: "Vendors, media, hospitality all need reliable connectivity",
    whoProvides: "Currently: venue IT, some specialist contractors",
    entryPath: "Build network skills, offer troubleshooting support to vendor operations",
    skillsRequired: ["Network troubleshooting", "Quick problem diagnosis", "Customer communication", "Pressure tolerance"]
  },
  {
    service: "Content Creator Tech Support",
    demandSpike: "Influencers, journalists need phone/camera/audio support during events",
    whoProvides: "Currently: largely unsupported market gap",
    entryPath: "Position as on-site tech support for content creators covering events",
    skillsRequired: ["Phone/camera troubleshooting", "Audio basics", "Social media awareness", "Discretion"]
  }
];

// ========================================
// COMPONENT: ECOSYSTEM EXPLORER
// ========================================

const EcosystemExplorer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedPathway, setSelectedPathway] = useState<PathwayKey>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('businesses');

  const pathwayInfo = {
    mobility: { name: "Wheels & Mobility", icon: "🚲", color: "#10b981" },
    devices: { name: "Devices & Phones", icon: "📱", color: "#8b5cf6" },
    studio: { name: "Home Tech & Studio", icon: "🖥️", color: "#f59e0b" }
  };

  const renderPathwaySelection = () => (
    <div className={styles.ecosystemPathways}>
      <h3>Choose Your Pathway</h3>
      <p>Each pathway connects to different local business infrastructure.</p>
      <div className={styles.pathwayButtons}>
        {(Object.keys(pathwayInfo) as PathwayKey[]).filter(Boolean).map((key) => {
          if (!key) return null;
          const info = pathwayInfo[key];
          return (
            <button
              key={key}
              className={styles.pathwaySelectButton}
              style={{ borderColor: info.color }}
              onClick={() => setSelectedPathway(key)}
            >
              <span className={styles.pathwayIcon}>{info.icon}</span>
              <span style={{ color: info.color }}>{info.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderViewTabs = () => (
    <div className={styles.viewTabs}>
      <button 
        className={`${styles.viewTab} ${viewMode === 'businesses' ? styles.active : ''}`}
        onClick={() => setViewMode('businesses')}
      >
        🏢 Local Businesses
      </button>
      <button 
        className={`${styles.viewTab} ${viewMode === 'entry-points' ? styles.active : ''}`}
        onClick={() => setViewMode('entry-points')}
      >
        🚪 Entry Points
      </button>
      <button 
        className={`${styles.viewTab} ${viewMode === 'succession' ? styles.active : ''}`}
        onClick={() => setViewMode('succession')}
      >
        🔄 Succession Signals
      </button>
      <button 
        className={`${styles.viewTab} ${viewMode === 'event-economy' ? styles.active : ''}`}
        onClick={() => setViewMode('event-economy')}
      >
        🏟️ Event Economy
      </button>
    </div>
  );

  const renderBusinessCategories = () => {
    if (!selectedPathway) return null;
    const categories = BUSINESS_CATEGORIES[selectedPathway];
    const info = pathwayInfo[selectedPathway];

    return (
      <div className={styles.businessCategories}>
        <h3 style={{ color: info.color }}>
          {info.icon} {info.name} — Local Business Infrastructure
        </h3>
        <p className={styles.categoryIntro}>
          These businesses already operate in Brent. They have customers, equipment, 
          reputation, and often—skills gaps you could fill.
        </p>

        <div className={styles.businessCategoryGrid}>
          {categories.map((category, index) => (
            <div key={index} className={styles.businessCategoryCard}>
              <div className={styles.businessCategoryHeader}>
                <span className={styles.businessCategoryIcon}>{category.icon}</span>
                <h4>{category.name}</h4>
              </div>
              
              <p className={styles.businessCategoryDesc}>{category.description}</p>
              
              <div className={styles.brentContext}>
                <strong>In Brent:</strong> {category.brentContext}
              </div>

              <div className={styles.businessCategorySection}>
                <h5>Examples:</h5>
                <ul>
                  {category.exampleTypes.map((type, i) => (
                    <li key={i}>{type}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.businessCategorySection}>
                <h5>Skills They Need:</h5>
                <div className={styles.skillTags}>
                  {category.skillsNeeded.map((skill, i) => (
                    <span key={i} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>

              <div className={styles.whyYou}>
                <strong>Why they need YOU:</strong> {category.whyTheyNeedYou}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEntryPoints = () => (
    <div className={styles.entryPointsSection}>
      <h3>🚪 Entry Points — How to Get In</h3>
      <p className={styles.entryIntro}>
        These aren't job applications. They're relationship types. Different ways 
        to connect your skills to existing business infrastructure.
      </p>

      <div className={styles.entryPointsGrid}>
        {ENTRY_POINTS.map((entry, index) => (
          <div key={index} className={styles.entryCard}>
            <h4>{entry.type}</h4>
            <p className={styles.entryDesc}>{entry.description}</p>
            
            <div className={styles.entryDetail}>
              <span className={styles.entryLabel}>⏱️ Timeframe:</span>
              <span>{entry.timeframe}</span>
            </div>
            
            <div className={styles.entryDetail}>
              <span className={styles.entryLabel}>📤 What you offer:</span>
              <span>{entry.whatYouOffer}</span>
            </div>
            
            <div className={styles.entryDetail}>
              <span className={styles.entryLabel}>📥 What you gain:</span>
              <span>{entry.whatYouGain}</span>
            </div>
            
            <div className={styles.realTalk}>
              <strong>Real talk:</strong> {entry.realTalk}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSuccessionSignals = () => (
    <div className={styles.successionSection}>
      <h3>🔄 Succession Signals — Reading the Room</h3>
      <p className={styles.successionIntro}>
        Many Brent businesses were started by first-generation owners now in their 50s and 60s. 
        What signals indicate a business might be approaching transition?
      </p>

      <div className={styles.signalsGrid}>
        {SUCCESSION_SIGNALS.map((signal, index) => (
          <div key={index} className={styles.signalCard}>
            <div className={styles.signalHeader}>
              <span className={styles.signalNumber}>{index + 1}</span>
              <h4>{signal.signal}</h4>
            </div>
            
            <div className={styles.signalMeaning}>
              <strong>What it means:</strong> {signal.meaning}
            </div>
            
            <div className={styles.signalOpportunity}>
              <strong>Your opportunity:</strong> {signal.opportunity}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.successionNote}>
        <h4>The Long Game</h4>
        <p>
          Succession isn't about swooping in. It's about building relationship over years. 
          The business owner needs to trust you with their life's work. That trust is earned 
          through consistent reliability, genuine interest, and demonstrated competence.
        </p>
        <p>
          Start by being useful. Small tasks. Showing up when you say you will. 
          Understanding their business challenges. The conversation about succession 
          happens after you've proven yourself—not before.
        </p>
      </div>
    </div>
  );

  const renderEventEconomy = () => (
    <div className={styles.eventSection}>
      <h3>🏟️ Event Economy — Wembley Advantage</h3>
      <p className={styles.eventIntro}>
        Wembley Stadium and Arena generate massive periodic demand. When 90,000 people 
        arrive, every service category spikes. Who captures that value?
      </p>

      <div className={styles.eventGrid}>
        {EVENT_ECONOMY.map((item, index) => (
          <div key={index} className={styles.eventCard}>
            <h4>{item.service}</h4>
            
            <div className={styles.eventDetail}>
              <strong>The spike:</strong> {item.demandSpike}
            </div>
            
            <div className={styles.eventDetail}>
              <strong>Currently provided by:</strong> {item.whoProvides}
            </div>
            
            <div className={styles.eventDetail}>
              <strong>Entry path:</strong> {item.entryPath}
            </div>
            
            <div className={styles.eventSkills}>
              <strong>Skills required:</strong>
              <div className={styles.skillTags}>
                {item.skillsRequired.map((skill, i) => (
                  <span key={i} className={styles.skillTag}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.eventNote}>
        <h4>The Wembley Principle</h4>
        <p>
          Events create foot traffic. Foot traffic justifies services. Services generate 
          cash flow. Cash flow enables growth. The businesses that capture event-day 
          demand build the stability to operate year-round.
        </p>
        <p>
          Your proximity is an advantage—but only if you're positioned before the 
          event, not scrambling during it.
        </p>
      </div>
    </div>
  );

  const renderMainContent = () => {
    if (viewMode === 'entry-points') return renderEntryPoints();
    if (viewMode === 'succession') return renderSuccessionSignals();
    if (viewMode === 'event-economy') return renderEventEconomy();
    return renderBusinessCategories();
  };

  return (
    <div className={styles.ecosystemContainer}>
      <div className={styles.ecosystemHeader}>
        <h2>🗺️ Ecosystem Explorer</h2>
        <button onClick={onClose} className={styles.closeButton}>← Back</button>
      </div>

      <div className={styles.ecosystemIntro}>
        <div className={styles.introBox}>
          <h3>Strengthen What's Already Here</h3>
          <p>
            Brent's Black wealth didn't come from starting fresh—it came from staying, 
            accumulating, and circulating within existing networks. This tool maps the 
            business infrastructure that already exists. Your job isn't to compete with 
            it. It's to <strong>connect to it, strengthen it, and eventually inherit it</strong>.
          </p>
        </div>
      </div>

      {!selectedPathway && viewMode === 'businesses' ? (
        renderPathwaySelection()
      ) : (
        <>
          {viewMode === 'businesses' && selectedPathway && (
            <button 
              className={styles.changePathwayButton}
              onClick={() => setSelectedPathway(null)}
            >
              ← Change Pathway
            </button>
          )}
          
          {renderViewTabs()}
          {renderMainContent()}
        </>
      )}

      {/* Call to Action */}
      <div className={styles.ecosystemCTA}>
        <h3>Ready to Connect?</h3>
        <p>
          STEMgeneers membership includes introductions to local business networks, 
          mentorship from established operators, and guidance on succession pathways.
        </p>
        <Link to="/get-started" className={styles.ecosystemJoinButton}>
          Join STEMgeneers →
        </Link>
      </div>
    </div>
  );
};

export default EcosystemExplorer;