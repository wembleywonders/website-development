import React, { useState, useEffect } from 'react';
import styles from './ProductionPlannerV2.module.css';

// ========================================
// TYPES & INTERFACES
// ========================================

type PerformanceType = 'solo' | 'collaborative' | 'community' | null;
type CulturalSeason = 'carnival' | 'heritage' | 'harvest' | 'storytelling' | null;
type BudgetLevel = 'shoestring' | 'standard' | 'ambitious' | null;

interface ProductionNeeds {
  venue: boolean;
  technical: boolean;
  marketing: boolean;
  costume: boolean;
  collaborators: boolean;
  rehearsal: boolean;
  budget: boolean;
}

interface ProductionPlan {
  performanceType: PerformanceType;
  showDescription: string;
  season: CulturalSeason;
  needs: ProductionNeeds;
  budgetLevel: BudgetLevel;
  timeline: TimelineWeek[];
  workshops: WorkshopRecommendation[];
  venue: VenueOption;
  budget: BudgetBreakdown;
  revenue: RevenueProjection;
  commitment: CommitmentRequirement;
}

interface TimelineWeek {
  week: string;
  tasks: string[];
}

interface WorkshopRecommendation {
  programme: string;
  workshop: string;
  schedule: string;
  purpose: string;
  link: string;
}

interface VenueOption {
  name: string;
  capacity: number;
  costPerNight: number;
  features: string[];
}

interface BudgetBreakdown {
  venue: number;
  technical: number;
  marketing: number;
  costume: number;
  miscellaneous: number;
  total: number;
}

interface RevenueProjection {
  capacity: number;
  ticketPrice: number;
  totalRevenue: number;
  artistShare: number;
  communityShare: number;
  operationsShare: number;
}

interface CommitmentRequirement {
  communityShows: number;
  venues: string[];
  impact: string;
}

// ========================================
// MAIN COMPONENT
// ========================================

const ProductionPlannerV2: React.FC = () => {
  // State Management
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [performanceType, setPerformanceType] = useState<PerformanceType>(null);
  const [needs, setNeeds] = useState<ProductionNeeds>({
    venue: false,
    technical: false,
    marketing: false,
    costume: false,
    collaborators: false,
    rehearsal: false,
    budget: false,
  });
  const [showDescription, setShowDescription] = useState<string>('');
  const [culturalSeason, setCulturalSeason] = useState<CulturalSeason>(null);
  const [budgetLevel, setBudgetLevel] = useState<BudgetLevel>(null);
  const [plan, setPlan] = useState<ProductionPlan | null>(null);
  const [mayaMessage, setMayaMessage] = useState<string>('');
  const [downloadCount, setDownloadCount] = useState<number>(0);
  const [showConversionModal, setShowConversionModal] = useState<boolean>(false);

  // Load download count from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('productionPlannerDownloads');
    if (saved) {
      setDownloadCount(parseInt(saved, 10));
    }
  }, []);

  // ========================================
  // MAYA CONVERSATION LOGIC
  // ========================================

  useEffect(() => {
    updateMayaMessage();
  }, [currentStep, performanceType, needs, culturalSeason]);

  const updateMayaMessage = () => {
    if (currentStep === 1 && performanceType === 'solo') {
      setMayaMessage(
        "Brilliant! Solo performances are at the heart of artistic expression. Let me help you plan the production support you need to bring your vision to life."
      );
    } else if (currentStep === 1 && performanceType === 'collaborative') {
      setMayaMessage(
        "Wonderful! Collaborative creation is where Wembley Wonders shines. Let's identify which teams you'll need to bring this vision together."
      );
    } else if (currentStep === 1 && performanceType === 'community') {
      setMayaMessage(
        "Beautiful! Community events strengthen our bonds and celebrate our culture. Let's plan something meaningful together."
      );
    } else if (currentStep === 2 && Object.values(needs).some(n => n)) {
      const selectedNeeds = Object.entries(needs)
        .filter(([_, selected]) => selected)
        .map(([need, _]) => need);
      
      if (selectedNeeds.length === 1) {
        setMayaMessage(
          `Perfect! I can help you with ${selectedNeeds[0]}. Now tell me about your show so I can give you specific recommendations.`
        );
      } else {
        setMayaMessage(
          `Great! You've selected ${selectedNeeds.length} areas of support. Let me ask you a few questions to create your personalized production plan.`
        );
      }
    } else if (currentStep === 3) {
      setMayaMessage(
        "Tell me about your show! What type of performance is it? What themes or stories will you explore? This helps me match you with the right cultural season."
      );
    } else if (currentStep === 4 && culturalSeason) {
      const seasonMessages = {
        carnival: "Carnival Season! Perfect for celebration and high energy. Now let's talk budget—what feels realistic for you?",
        heritage: "Heritage Season is ideal for reflective, storytelling work. Let's discuss your budget to make this vision achievable.",
        harvest: "Harvest Season celebrates community and gratitude—beautiful choice. What budget range works for your production?",
        storytelling: "Storytelling Season honors wisdom and tradition. Let's ensure your budget supports this intimate work."
      };
      setMayaMessage(seasonMessages[culturalSeason]);
    }
  };

  // ========================================
  // PLAN GENERATION
  // ========================================

  const generatePlan = () => {
    if (!performanceType || !culturalSeason || !budgetLevel) return;

    const budgets = {
      shoestring: { venue: 0, technical: 100, marketing: 50, costume: 50, misc: 50, total: 250 },
      standard: { venue: 150, technical: 200, marketing: 100, costume: 100, misc: 50, total: 600 },
      ambitious: { venue: 300, technical: 500, marketing: 200, costume: 200, misc: 100, total: 1300 },
    };

    const selectedBudget = budgets[budgetLevel];

    const venueOptions = {
      shoestring: {
        name: 'Community Space (Free/Donation)',
        capacity: 40,
        costPerNight: 0,
        features: ['Basic seating', 'Natural lighting', 'BYOT (Bring Your Own Tech)'],
      },
      standard: {
        name: 'Park Lane Methodist Church',
        capacity: 80,
        costPerNight: 150,
        features: ['Professional seating', 'Basic lighting', 'Sound system', 'Green room'],
      },
      ambitious: {
        name: 'Wembley Theatre Venue',
        capacity: 200,
        costPerNight: 300,
        features: ['Full stage', 'Professional lighting rig', 'Sound system', 'Backstage facilities', 'Box office'],
      },
    };

    const venue = venueOptions[budgetLevel];

    // Calculate revenue projection
    const ticketPrice = budgetLevel === 'shoestring' ? 5 : budgetLevel === 'standard' ? 8 : 12;
    const totalRevenue = venue.capacity * ticketPrice;
    const revenue = {
      capacity: venue.capacity,
      ticketPrice,
      totalRevenue,
      artistShare: totalRevenue * 0.55,
      communityShare: totalRevenue * 0.25,
      operationsShare: totalRevenue * 0.20,
    };

    // Generate timeline
    const timeline = generateTimeline(performanceType, needs);

    // Generate workshop recommendations
    const workshops = generateWorkshops(needs);

    // Commitment requirement
    const commitment = {
      communityShows: 2,
      venues: ['Local primary school', 'Community center or care home'],
      impact: 'Bring professional performance to underserved audiences',
    };

    const newPlan: ProductionPlan = {
      performanceType,
      showDescription,
      season: culturalSeason,
      needs,
      budgetLevel,
      timeline,
      workshops,
      venue,
      budget: {
        venue: selectedBudget.venue,
        technical: selectedBudget.technical,
        marketing: selectedBudget.marketing,
        costume: selectedBudget.costume,
        miscellaneous: selectedBudget.misc,
        total: selectedBudget.total,
      },
      revenue,
      commitment,
    };

    setPlan(newPlan);
    setCurrentStep(6);
  };

  const generateTimeline = (type: PerformanceType, needs: ProductionNeeds): TimelineWeek[] => {
    const baseTimeline: TimelineWeek[] = [
      { week: 'Week 1-2', tasks: ['Finalize show concept', 'Book venue', 'Set performance date'] },
      { week: 'Week 3-4', tasks: ['Begin marketing campaign', 'Create promotional materials', 'Set up ticket sales'] },
      { week: 'Week 5-6', tasks: ['Coordinate with technical team', 'Schedule rehearsals', 'Finalize script/set list'] },
      { week: 'Week 7-8', tasks: ['Continue marketing push', 'Confirm all production elements', 'Invite press/reviewers'] },
      { week: 'Week 9-10', tasks: ['Final rehearsals', 'Technical run-through', 'Dress rehearsal'] },
      { week: 'Week 11', tasks: ['Final preparation', 'Pre-show promotion', 'Confirm volunteers'] },
      { week: 'Week 12', tasks: ['PERFORMANCE WEEK!', 'Post-show reception', 'Gather feedback'] },
      { week: 'Week 13-14', tasks: ['Rayd-yo broadcast', 'Joystick review published', 'Plan community shows'] },
    ];

    if (type === 'collaborative') {
      baseTimeline[0].tasks.push('Recruit team members');
      baseTimeline[1].tasks.push('Hold first team meeting');
    }

    if (needs.costume) {
      baseTimeline[2].tasks.push('Meet with Silk Stilettos team');
      baseTimeline[3].tasks.push('Costume fittings');
    }

    return baseTimeline;
  };

  const generateWorkshops = (needs: ProductionNeeds): WorkshopRecommendation[] => {
    const workshops: WorkshopRecommendation[] = [];

    if (needs.marketing || needs.budget) {
      workshops.push({
        programme: 'TECHreneurs',
        workshop: 'Marketing & Budget Planning',
        schedule: 'Mondays 6-8pm',
        purpose: 'Learn to create production budgets, price tickets, and market your show effectively',
        link: '/programmes/techreneurs',
      });
    }

    if (needs.technical) {
      workshops.push({
        programme: 'STEMgeneers',
        workshop: 'Stage Tech & Design',
        schedule: 'Thursdays 6-8pm',
        purpose: 'Get support with lighting, sound, set design, and technical production',
        link: '/programmes/stemgeneers',
      });
    }

    if (needs.costume) {
      workshops.push({
        programme: 'Silk Stilettos',
        workshop: 'Costume Design & Creation',
        schedule: 'Wednesdays 6-8pm',
        purpose: 'Design and create costumes that bring your vision to life',
        link: '/programmes/silk-stilettos',
      });
    }

    if (needs.collaborators) {
      workshops.push({
        programme: 'Trubble n Bass',
        workshop: 'Music & Sound Design',
        schedule: 'Fridays 7-9pm',
        purpose: 'Collaborate with musicians and sound designers for your performance',
        link: '/programmes/trubble-n-bass',
      });

      workshops.push({
        programme: 'Pageturners',
        workshop: 'Script Development',
        schedule: 'Tuesdays 7-9pm',
        purpose: 'Develop scripts, narratives, and storytelling with experienced writers',
        link: '/programmes/pageturners',
      });
    }

    return workshops;
  };

  // ========================================
  // DOWNLOAD & CONVERSION
  // ========================================

  const downloadPlan = () => {
    if (!plan) return;

    const planText = generatePlanText(plan);
    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `production-plan-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Update download count
    const newCount = downloadCount + 1;
    setDownloadCount(newCount);
    localStorage.setItem('productionPlannerDownloads', newCount.toString());

    // Show conversion modal after first or third download
    if (newCount === 1 || newCount === 3) {
      setTimeout(() => setShowConversionModal(true), 1000);
    }
  };

  const generatePlanText = (plan: ProductionPlan): string => {
    const seasonNames = {
      carnival: 'Carnival Season (Jan-Mar)',
      heritage: 'Heritage Season (Apr-Jun)',
      harvest: 'Harvest Season (Jul-Sep)',
      storytelling: 'Storytelling Season (Oct-Dec)',
    };

    const typeNames = {
      solo: 'Solo Performance',
      collaborative: 'Collaborative Creation',
      community: 'Community Event',
    };

    return `
═══════════════════════════════════════════════════════════════
YOUR PRODUCTION PLAN
Generated by Wembley Wonders Production Planner
═══════════════════════════════════════════════════════════════

SHOW OVERVIEW
-------------
Type: ${typeNames[plan.performanceType!]}
Season: ${seasonNames[plan.season!]}
Description: ${plan.showDescription}

VENUE
-----
${plan.venue.name}
Capacity: ${plan.venue.capacity} seats
Cost: £${plan.venue.costPerNight} per night
Features: ${plan.venue.features.join(', ')}

TIMELINE (14 Weeks)
-------------------
${plan.timeline.map(w => `${w.week}:\n${w.tasks.map(t => `  • ${t}`).join('\n')}`).join('\n\n')}

WORKSHOP RECOMMENDATIONS
------------------------
${plan.workshops.map(w => `
${w.programme} - ${w.workshop}
Schedule: ${w.schedule}
Purpose: ${w.purpose}
Learn more: wembleywonders.org${w.link}
`).join('\n')}

BUDGET BREAKDOWN
----------------
Venue rental:        £${plan.budget.venue}
Technical support:   £${plan.budget.technical}
Marketing materials: £${plan.budget.marketing}
Costumes/props:      £${plan.budget.costume}
Miscellaneous:       £${plan.budget.miscellaneous}
-------------------
TOTAL:               £${plan.budget.total}

REVENUE PROJECTION
------------------
Capacity: ${plan.revenue.capacity} seats
Ticket price: £${plan.revenue.ticketPrice}
Total revenue: £${plan.revenue.totalRevenue}

Revenue Split (Wembley Wonders Model):
  Your share (55%):      £${plan.revenue.artistShare.toFixed(2)}
  Community fund (25%):  £${plan.revenue.communityShare.toFixed(2)}
  Operations (20%):      £${plan.revenue.operationsShare.toFixed(2)}

COMMUNITY COMMITMENT
--------------------
As part of Wembley Wonders, we ask performers to give back by 
providing ${plan.commitment.communityShows} additional shows to underserved audiences:

${plan.commitment.venues.map((v, i) => `  ${i + 1}. ${v}`).join('\n')}

Impact: ${plan.commitment.impact}

NEXT STEPS
----------
☐ Review this plan and refine as needed
☐ Join relevant workshops to fill skill gaps
☐ Submit plan to community calendar (Members only)
☐ Get matched with production support team (Members only)
☐ Book venue and set performance date (Members only)

═══════════════════════════════════════════════════════════════
This plan was created with the Wembley Wonders Production Planner.

Want to make this real? Join Wembley Wonders to:
✓ Submit your plan to the community calendar
✓ Get matched with production support teams
✓ Access venues at member rates
✓ Attend workshops to develop skills
✓ Perform on The Grand Stage
✓ Get featured in Joystick reviews and Rayd-yo broadcasts

From £15/month | Learn more: wembleywonders.org/membership
═══════════════════════════════════════════════════════════════

Attribution: Created with Wembley Wonders Production Planner
License: This plan is yours to use for your production
Generated: ${new Date().toLocaleDateString()}
    `.trim();
  };

  // ========================================
  // NAVIGATION
  // ========================================

  const handleNext = () => {
    if (currentStep === 5) {
      generatePlan();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setPerformanceType(null);
    setNeeds({
      venue: false,
      technical: false,
      marketing: false,
      costume: false,
      collaborators: false,
      rehearsal: false,
      budget: false,
    });
    setShowDescription('');
    setCulturalSeason(null);
    setBudgetLevel(null);
    setPlan(null);
    setMayaMessage('');
  };

  const canProceed = () => {
    if (currentStep === 1) return performanceType !== null;
    if (currentStep === 2) return Object.values(needs).some(n => n);
    if (currentStep === 3) return showDescription.trim().length > 10;
    if (currentStep === 4) return culturalSeason !== null;
    if (currentStep === 5) return budgetLevel !== null;
    return true;
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className={styles.plannerContainer}>
      {/* Header */}
      <div className={styles.plannerHeader}>
        <h2>🎭 Production Planner</h2>
        <div className={styles.downloadCounter}>
          Free Plans Remaining: <strong>{Math.max(0, 3 - downloadCount)}/3</strong>
        </div>
      </div>

      {/* Progress Bar */}
      {currentStep > 0 && currentStep < 6 && (
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${(currentStep / 6) * 100}%` }}></div>
        </div>
      )}

      {/* Maya Avatar & Message */}
      {mayaMessage && currentStep > 0 && currentStep < 6 && (
        <div className={styles.mayaSection}>
          <div className={styles.mayaAvatar}>👩🏾‍💼</div>
          <div className={styles.mayaSpeech}>
            <p>{mayaMessage}</p>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className={styles.stepContent}>
        {currentStep === 0 && <StepIntro onStart={() => setCurrentStep(1)} downloadCount={downloadCount} />}
        
        {currentStep === 1 && (
          <StepPerformanceType
            selected={performanceType}
            onSelect={setPerformanceType}
          />
        )}

        {currentStep === 2 && (
          <StepNeeds
            needs={needs}
            onToggle={(need) => setNeeds({ ...needs, [need]: !needs[need] })}
            performanceType={performanceType}
          />
        )}

        {currentStep === 3 && (
          <StepDescription
            value={showDescription}
            onChange={setShowDescription}
          />
        )}

        {currentStep === 4 && (
          <StepSeason
            selected={culturalSeason}
            onSelect={setCulturalSeason}
            showDescription={showDescription}
          />
        )}

        {currentStep === 5 && (
          <StepBudget
            selected={budgetLevel}
            onSelect={setBudgetLevel}
          />
        )}

        {currentStep === 6 && plan && (
          <StepPlan
            plan={plan}
            onDownload={downloadPlan}
            downloadCount={downloadCount}
            onReset={handleReset}
          />
        )}
      </div>

      {/* Navigation */}
      {currentStep > 0 && currentStep < 6 && (
        <div className={styles.navigation}>
          <button onClick={handleBack} className={styles.backButton}>
            ← Back
          </button>
          <button
            onClick={handleNext}
            className={styles.nextButton}
            disabled={!canProceed()}
          >
            {currentStep === 5 ? 'Generate Plan' : 'Next'} →
          </button>
        </div>
      )}

      {/* Conversion Modal */}
      {showConversionModal && (
        <ConversionModal
          downloadCount={downloadCount}
          onClose={() => setShowConversionModal(false)}
        />
      )}
    </div>
  );
};

// ========================================
// STEP COMPONENTS
// ========================================

interface StepIntroProps {
  onStart: () => void;
  downloadCount: number;
}

const StepIntro: React.FC<StepIntroProps> = ({ onStart, downloadCount }) => (
  <div className={styles.introScreen}>
    <div className={styles.iconLarge}>🎭</div>
    <h2>Welcome to the Production Planner</h2>
    <p className={styles.introText}>
      Whether you're a solo artist with a polished act or want to collaborate with our community,
      this tool helps you plan your production from concept to performance.
    </p>
    
    <div className={styles.benefitsGrid}>
      <div className={styles.benefit}>
        <span className={styles.benefitIcon}>📋</span>
        <h4>Personalized Planning</h4>
        <p>Get a custom production plan based on your specific needs and budget</p>
      </div>
      <div className={styles.benefit}>
        <span className={styles.benefitIcon}>🎓</span>
        <h4>Workshop Recommendations</h4>
        <p>Discover which workshops will help you fill your skill gaps</p>
      </div>
      <div className={styles.benefit}>
        <span className={styles.benefitIcon}>💰</span>
        <h4>Budget & Revenue</h4>
        <p>See realistic costs and revenue projections with our 55-25-20 model</p>
      </div>
      <div className={styles.benefit}>
        <span className={styles.benefitIcon}>🤝</span>
        <h4>Community Impact</h4>
        <p>Plan your commitment shows for schools and community centers</p>
      </div>
    </div>

    <button onClick={onStart} className={styles.startButton}>
      Start Planning Your Show →
    </button>

    <p className={styles.freeCounter}>
      ✨ No signup required. {3 - downloadCount} free production plans available.
    </p>
  </div>
);

interface StepPerformanceTypeProps {
  selected: PerformanceType;
  onSelect: (type: PerformanceType) => void;
}

const StepPerformanceType: React.FC<StepPerformanceTypeProps> = ({ selected, onSelect }) => (
  <div className={styles.stepScreen}>
    <h3>What type of performance are you planning?</h3>
    <p className={styles.stepDescription}>
      This helps us tailor our recommendations to your specific situation.
    </p>

    <div className={styles.optionsGrid}>
      <div
        className={`${styles.optionCard} ${selected === 'solo' ? styles.selected : ''}`}
        onClick={() => onSelect('solo')}
      >
        <div className={styles.optionIcon}>🎤</div>
        <h4>Solo Performance</h4>
        <p>I have my act ready and need production support (venue, tech, marketing)</p>
        <ul className={styles.examplesList}>
          <li>One-person shows</li>
          <li>Poetry/spoken word</li>
          <li>Magic acts</li>
          <li>Music performances</li>
        </ul>
      </div>

      <div
        className={`${styles.optionCard} ${selected === 'collaborative' ? styles.selected : ''}`}
        onClick={() => onSelect('collaborative')}
      >
        <div className={styles.optionIcon}>🤝</div>
        <h4>Collaborative Creation</h4>
        <p>I want to build something with a team (writers, designers, musicians)</p>
        <ul className={styles.examplesList}>
          <li>Original plays</li>
          <li>Ensemble pieces</li>
          <li>Musicals</li>
          <li>Devised theatre</li>
        </ul>
      </div>

      <div
        className={`${styles.optionCard} ${selected === 'community' ? styles.selected : ''}`}
        onClick={() => onSelect('community')}
      >
        <div className={styles.optionIcon}>🎊</div>
        <h4>Community Event</h4>
        <p>I'm organizing a showcase, festival, or cultural celebration</p>
        <ul className={styles.examplesList}>
          <li>Cultural festivals</li>
          <li>Open mic nights</li>
          <li>Community showcases</li>
          <li>Heritage celebrations</li>
        </ul>
      </div>
    </div>
  </div>
);

interface StepNeedsProps {
  needs: ProductionNeeds;
  onToggle: (need: keyof ProductionNeeds) => void;
  performanceType: PerformanceType;
}

const StepNeeds: React.FC<StepNeedsProps> = ({ needs, onToggle, performanceType }) => {
  const needsOptions = [
    { key: 'venue' as keyof ProductionNeeds, label: 'Venue & Space', icon: '🏛️', desc: 'Need a place to perform' },
    { key: 'technical' as keyof ProductionNeeds, label: 'Technical Support', icon: '🔧', desc: 'Lights, sound, stage setup' },
    { key: 'marketing' as keyof ProductionNeeds, label: 'Marketing & Sales', icon: '📣', desc: 'Promotion, tickets, posters' },
    { key: 'costume' as keyof ProductionNeeds, label: 'Costume & Props', icon: '👗', desc: 'Wardrobe and set pieces' },
    { key: 'collaborators' as keyof ProductionNeeds, label: 'Creative Collaborators', icon: '🎨', desc: 'Writers, musicians, designers' },
    { key: 'rehearsal' as keyof ProductionNeeds, label: 'Rehearsal Space', icon: '🎭', desc: 'Practice and preparation space' },
    { key: 'budget' as keyof ProductionNeeds, label: 'Budget Planning', icon: '💰', desc: 'Financial planning and pricing' },
  ];

  return (
    <div className={styles.stepScreen}>
      <h3>What support do you need?</h3>
      <p className={styles.stepDescription}>
        Select all that apply. We'll recommend specific workshops and resources for each area.
      </p>

      <div className={styles.needsGrid}>
        {needsOptions.map(option => (
          <div
            key={option.key}
            className={`${styles.needCard} ${needs[option.key] ? styles.selected : ''}`}
            onClick={() => onToggle(option.key)}
          >
            <input
              type="checkbox"
              checked={needs[option.key]}
              onChange={() => onToggle(option.key)}
              className={styles.needCheckbox}
            />
            <div className={styles.needIcon}>{option.icon}</div>
            <h4>{option.label}</h4>
            <p>{option.desc}</p>
          </div>
        ))}
      </div>

      <p className={styles.helpText}>
        💡 Don't worry if you're not sure—you can always adjust later or explore workshops to discover what you need.
      </p>
    </div>
  );
};

interface StepDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

const StepDescription: React.FC<StepDescriptionProps> = ({ value, onChange }) => (
  <div className={styles.stepScreen}>
    <h3>Tell us about your show</h3>
    <p className={styles.stepDescription}>
      Describe your performance concept, themes, or what you'll be presenting. This helps us match
      you with the right cultural season and resources.
    </p>

    <textarea
      className={styles.descriptionInput}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Example: 'A one-hour spoken word performance exploring Caribbean heritage and identity through poetry and storytelling. Mixing personal narratives with historical references, celebrating resilience and culture.'"
      rows={8}
    />

    <p className={styles.charCount}>
      {value.length} characters {value.length < 10 && '(Please provide at least 10 characters)'}
    </p>

    <div className={styles.examplesBox}>
      <h4>Need inspiration? Here are some examples:</h4>
      <ul>
        <li><strong>Solo Performance:</strong> "A magic show with comedy, storytelling, and audience interaction. Family-friendly entertainment celebrating wonder and imagination."</li>
        <li><strong>Collaborative:</strong> "An original play about a family navigating cultural identity in modern Britain. Exploring themes of belonging, heritage, and home."</li>
        <li><strong>Community Event:</strong> "A showcase of local talent—music, poetry, dance—celebrating our diverse Wembley community."</li>
      </ul>
    </div>
  </div>
);

interface StepSeasonProps {
  selected: CulturalSeason;
  onSelect: (season: CulturalSeason) => void;
  showDescription: string;
}

const StepSeason: React.FC<StepSeasonProps> = ({ selected, onSelect, showDescription }) => {
  const seasons = [
    {
      key: 'carnival' as CulturalSeason,
      icon: '🎉',
      name: 'Carnival Season',
      period: 'January - March',
      theme: 'Celebration, Liberation, Joy',
      description: 'High-energy, colorful, music-driven performances',
      bestFor: 'Musical performances, cultural celebrations, cosplay showcases',
    },
    {
      key: 'heritage' as CulturalSeason,
      icon: '🌿',
      name: 'Heritage Season',
      period: 'April - June',
      theme: 'Roots, Ancestors, Preservation',
      description: 'Reflective, storytelling, educational performances',
      bestFor: 'One-act plays, community storytelling, spoken word',
    },
    {
      key: 'harvest' as CulturalSeason,
      icon: '🌾',
      name: 'Harvest Season',
      period: 'July - September',
      theme: 'Abundance, Community, Gratitude',
      description: 'Collaborative, celebratory, grounding performances',
      bestFor: 'Cultural celebrations, LARP experiences, showcases',
    },
    {
      key: 'storytelling' as CulturalSeason,
      icon: '📖',
      name: 'Storytelling Season',
      period: 'October - December',
      theme: 'Wisdom, Tradition, Legacy',
      description: 'Intimate, mystical, intergenerational performances',
      bestFor: 'Spoken word, one-act plays, elder wisdom storytelling',
    },
  ];

  return (
    <div className={styles.stepScreen}>
      <h3>Which cultural season fits your show?</h3>
      <p className={styles.stepDescription}>
        We organize performances by cultural rhythms, not traditional calendar months—honoring
        Caribbean and diaspora traditions while creating space for new celebrations.
      </p>

      <div className={styles.seasonsGrid}>
        {seasons.map(season => (
          <div
            key={season.key}
            className={`${styles.seasonCard} ${selected === season.key ? styles.selected : ''}`}
            onClick={() => onSelect(season.key)}
          >
            <div className={styles.seasonIcon}>{season.icon}</div>
            <h4>{season.name}</h4>
            <p className={styles.seasonPeriod}>{season.period}</p>
            <p className={styles.seasonTheme}>{season.theme}</p>
            <p className={styles.seasonDesc}>{season.description}</p>
            <p className={styles.seasonBestFor}><strong>Best for:</strong> {season.bestFor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface StepBudgetProps {
  selected: BudgetLevel;
  onSelect: (level: BudgetLevel) => void;
}

const StepBudget: React.FC<StepBudgetProps> = ({ selected, onSelect }) => {
  const budgets = [
    {
      key: 'shoestring' as BudgetLevel,
      name: 'Shoestring',
      range: '£250-£500',
      venue: 'Community space (free/donation)',
      audience: '30-50 people',
      description: 'Bootstrap approach using community resources',
      workshop: 'Bootstrap Budgeting: Maximizing Community Resources',
    },
    {
      key: 'standard' as BudgetLevel,
      name: 'Standard',
      range: '£500-£1,000',
      venue: 'Park Lane Methodist Church',
      audience: '60-80 people',
      description: 'Professional venue with basic technical support',
      workshop: 'Professional Budgeting & Ticket Pricing Strategy',
      recommended: true,
    },
    {
      key: 'ambitious' as BudgetLevel,
      name: 'Ambitious',
      range: '£1,000-£2,500+',
      venue: 'Wembley Theatre Venue',
      audience: '150-200 people',
      description: 'Full production with professional technical elements',
      workshop: 'Investment Pitch & Sponsorship Acquisition',
    },
  ];

  return (
    <div className={styles.stepScreen}>
      <h3>What's your budget range?</h3>
      <p className={styles.stepDescription}>
        Be realistic about what you can invest. We'll show you how to maximize every pound
        and generate revenue through our 55-25-20 model.
      </p>

      <div className={styles.budgetsGrid}>
        {budgets.map(budget => (
          <div
            key={budget.key}
            className={`${styles.budgetCard} ${selected === budget.key ? styles.selected : ''} ${budget.recommended ? styles.recommended : ''}`}
            onClick={() => onSelect(budget.key)}
          >
            {budget.recommended && <div className={styles.recommendedBadge}>MOST POPULAR</div>}
            <h4>{budget.name}</h4>
            <p className={styles.budgetRange}>{budget.range}</p>
            <p className={styles.budgetVenue}>📍 {budget.venue}</p>
            <p className={styles.budgetAudience}>👥 {budget.audience}</p>
            <p className={styles.budgetDesc}>{budget.description}</p>
            <div className={styles.workshopBox}>
              <strong>💼 TECHreneurs Workshop:</strong>
              <p>{budget.workshop}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.budgetNote}>
        <p>
          💡 <strong>Note:</strong> All budget levels include TECHreneurs support for financial planning.
          Our workshops help you maximize resources and create sustainable revenue models.
        </p>
      </div>
    </div>
  );
};

interface StepPlanProps {
  plan: ProductionPlan;
  onDownload: () => void;
  downloadCount: number;
  onReset: () => void;
}

const StepPlan: React.FC<StepPlanProps> = ({ plan, onDownload, downloadCount, onReset }) => {
  const typeNames = {
    solo: 'Solo Performance',
    collaborative: 'Collaborative Creation',
    community: 'Community Event',
  };

  const seasonNames = {
    carnival: 'Carnival Season (Jan-Mar)',
    heritage: 'Heritage Season (Apr-Jun)',
    harvest: 'Harvest Season (Jul-Sep)',
    storytelling: 'Storytelling Season (Oct-Dec)',
  };

  return (
    <div className={styles.planScreen}>
      <div className={styles.planHeader}>
        <h2>🎭 Your Production Plan</h2>
        <p className={styles.planSubtitle}>
          {typeNames[plan.performanceType!]} • {seasonNames[plan.season!]}
        </p>
      </div>

      {/* Show Description */}
      <section className={styles.planSection}>
        <h3>📝 Show Overview</h3>
        <p className={styles.showDescription}>{plan.showDescription}</p>
      </section>

      {/* Venue */}
      <section className={styles.planSection}>
        <h3>📍 Venue</h3>
        <div className={styles.venueBox}>
          <h4>{plan.venue.name}</h4>
          <p><strong>Capacity:</strong> {plan.venue.capacity} seats</p>
          <p><strong>Cost:</strong> £{plan.venue.costPerNight} per night</p>
          <p><strong>Features:</strong> {plan.venue.features.join(', ')}</p>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.planSection}>
        <h3>📅 14-Week Timeline</h3>
        <div className={styles.timeline}>
          {plan.timeline.map((week, idx) => (
            <div key={idx} className={styles.timelineWeek}>
              <h4>{week.week}</h4>
              <ul>
                {week.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Workshop Recommendations */}
      {plan.workshops.length > 0 && (
        <section className={styles.planSection}>
          <h3>🎓 Workshop Recommendations</h3>
          <p className={styles.sectionIntro}>
            Based on your needs, we recommend these workshops to help you succeed:
          </p>
          <div className={styles.workshopsGrid}>
            {plan.workshops.map((workshop, idx) => (
              <div key={idx} className={styles.workshopCard}>
                <h4>{workshop.programme}</h4>
                <p className={styles.workshopName}>{workshop.workshop}</p>
                <p className={styles.workshopSchedule}>📅 {workshop.schedule}</p>
                <p className={styles.workshopPurpose}>{workshop.purpose}</p>
                <a href={workshop.link} className={styles.workshopLink}>
                  Learn more →
                </a>
              </div>
            ))}
          </div>
          <div className={styles.workshopNote}>
            <p>
              💼 <strong>Want to lead the business side of productions?</strong> Join TECHreneurs
              to learn budgeting, marketing, and sponsorship skills that make shows successful!
            </p>
          </div>
        </section>
      )}

      {/* Budget Breakdown */}
      <section className={styles.planSection}>
        <h3>💰 Budget Breakdown</h3>
        <table className={styles.budgetTable}>
          <tbody>
            <tr>
              <td>Venue rental</td>
              <td>£{plan.budget.venue}</td>
            </tr>
            <tr>
              <td>Technical support</td>
              <td>£{plan.budget.technical}</td>
            </tr>
            <tr>
              <td>Marketing materials</td>
              <td>£{plan.budget.marketing}</td>
            </tr>
            <tr>
              <td>Costumes/props</td>
              <td>£{plan.budget.costume}</td>
            </tr>
            <tr>
              <td>Miscellaneous</td>
              <td>£{plan.budget.miscellaneous}</td>
            </tr>
            <tr className={styles.totalRow}>
              <td><strong>TOTAL</strong></td>
              <td><strong>£{plan.budget.total}</strong></td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Revenue Projection */}
      <section className={styles.planSection}>
        <h3>📊 Revenue Projection</h3>
        <div className={styles.revenueBox}>
          <p><strong>Capacity:</strong> {plan.revenue.capacity} seats @ £{plan.revenue.ticketPrice} each</p>
          <p><strong>Total revenue:</strong> £{plan.revenue.totalRevenue}</p>
          
          <h4>Wembley Wonders Revenue Model (55-25-20)</h4>
          <table className={styles.revenueTable}>
            <tbody>
              <tr>
                <td>Your share (55%)</td>
                <td>£{plan.revenue.artistShare.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Community fund (25%)</td>
                <td>£{plan.revenue.communityShare.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Operations (20%)</td>
                <td>£{plan.revenue.operationsShare.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Commitment */}
      <section className={styles.planSection}>
        <h3>🤝 Community Commitment</h3>
        <div className={styles.commitmentBox}>
          <p>
            As part of Wembley Wonders, we ask performers to give back by providing{' '}
            <strong>{plan.commitment.communityShows} additional shows</strong> to underserved audiences:
          </p>
          <ul>
            {plan.commitment.venues.map((venue, idx) => (
              <li key={idx}>{venue}</li>
            ))}
          </ul>
          <p className={styles.impactNote}>
            <strong>Impact:</strong> {plan.commitment.impact}
          </p>
          <p className={styles.commitmentNote}>
            💚 These shows can be free or donation-based, helping us serve those who might not
            otherwise access professional performance. You keep 100% of any donations received.
          </p>
        </div>
      </section>

      {/* Actions */}
      <section className={styles.planActions}>
        <h3>✨ Next Steps</h3>
        
        {downloadCount < 3 ? (
          <>
            <button onClick={onDownload} className={styles.downloadButton}>
              📥 Download Your Plan
            </button>
            <p className={styles.downloadNote}>
              Downloads remaining: <strong>{3 - downloadCount}/3</strong>
            </p>
          </>
        ) : (
          <div className={styles.limitReached}>
            <h4>🎉 You've used all 3 free production plans!</h4>
            <p>Ready to make your vision real? Join Wembley Wonders to:</p>
            <ul>
              <li>✓ Submit unlimited production proposals</li>
              <li>✓ Get matched with production support teams</li>
              <li>✓ Book venues at member rates</li>
              <li>✓ Perform on The Grand Stage</li>
              <li>✓ Access all workshops</li>
            </ul>
            <a href="/membership" className={styles.joinButton}>
              Join Wembley Wonders →
            </a>
          </div>
        )}

        <div className={styles.secondaryActions}>
          <button onClick={onReset} className={styles.resetButton}>
            🔄 Plan Another Show
          </button>
        </div>

        {downloadCount < 3 && (
          <div className={styles.memberBenefits}>
            <h4>💡 Want to make this real?</h4>
            <p>Members can:</p>
            <ul>
              <li>Submit plans to the community calendar</li>
              <li>Get matched with production teams</li>
              <li>Access workshops for skill development</li>
              <li>Book venues through Wembley Wonders</li>
              <li>Perform on The Grand Stage</li>
              <li>Get featured in Joystick & Rayd-yo</li>
            </ul>
            <a href="/membership" className={styles.learnMoreButton}>
              Learn About Membership →
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

// ========================================
// CONVERSION MODAL
// ========================================

interface ConversionModalProps {
  downloadCount: number;
  onClose: () => void;
}

const ConversionModal: React.FC<ConversionModalProps> = ({ downloadCount, onClose }) => {
  if (downloadCount === 1) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
          <h3>🎉 Your production plan is ready!</h3>
          <p>
            This is what collaborative creation looks like at Wembley Wonders. 
            Imagine making this real with your community.
          </p>
          <h4>Members can:</h4>
          <ul>
            <li>Submit production proposals to the community</li>
            <li>Vote on seasonal shows (collaborative consensus)</li>
            <li>Join cross-programme production teams</li>
            <li>Perform on The Grand Stage</li>
            <li>Get featured in Joystick reviews & Rayd-yo broadcasts</li>
          </ul>
          <div className={styles.modalActions}>
            <a href="/membership" className={styles.modalJoinButton}>
              Join to Make This Real
            </a>
            <button onClick={onClose} className={styles.modalKeepButton}>
              Keep Planning (2 free plans left)
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
          <h3>🎭 You've planned 3 shows!</h3>
          <p>
            You clearly love collaborative performance. Join Wembley Wonders to turn 
            these plans into reality.
          </p>
          <h4>Your membership includes:</h4>
          <ul>
            <li>✓ Submit unlimited production proposals</li>
            <li>✓ Participate in seasonal show selection</li>
            <li>✓ Join cross-programme production teams</li>
            <li>✓ Perform/produce on The Grand Stage</li>
            <li>✓ Get featured in Joystick & Rayd-yo</li>
            <li>✓ Portfolio tracking with DOI</li>
            <li>✓ Revenue sharing (55% for participants)</li>
          </ul>
          <div className={styles.pricingOptions}>
            <div className={styles.pricingTier}>
              <p><strong>£15/month</strong></p>
              <p>1 programme + Kaywana's Court access</p>
            </div>
            <div className={styles.pricingTier}>
              <p><strong>£35/month</strong></p>
              <p>3 programmes + priority roles</p>
            </div>
            <div className={`${styles.pricingTier} ${styles.bestValue}`}>
              <span className={styles.bestValueBadge}>BEST VALUE</span>
              <p><strong>£50/month</strong></p>
              <p>ALL 9 programmes + leadership</p>
            </div>
          </div>
          <div className={styles.modalActions}>
            <a href="/membership" className={styles.modalJoinButton}>
              Join Now
            </a>
            <a href="/membership" className={styles.modalLearnButton}>
              Learn About Packages
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductionPlannerV2;