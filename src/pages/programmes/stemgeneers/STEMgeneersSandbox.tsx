import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import styles from './STEMgeneersSandbox.module.css';

/**
 * STEMgeneers Sandbox - Applied Tech Tools with Ecosystem Integration
 * ====================================================================
 * 
 * Philosophy shift: Skills earn through connection to existing networks,
 * not through starting from scratch.
 * 
 * Each tool now asks: "Who in Brent already needs this skill?"
 */

type ToolType = 
  | 'diagnostic-trainer' 
  | 'pricing-calculator' 
  | 'income-pathway-mapper' 
  | 'collective-calculator'
  | 'ecosystem-explorer'
  | null;

type PathwayType = 'mobility' | 'devices' | 'studio';

// ========================================
// ECOSYSTEM CONNECTION DATA
// Shared across all tools
// ========================================

interface EcosystemBusiness {
  name: string;
  type: string;
  skillsNeeded: string[];
  entryPoint: string;
  incomeModel: string;
  brentContext: string;
}

const ECOSYSTEM_CONNECTIONS: Record<PathwayType, EcosystemBusiness[]> = {
  mobility: [
    {
      name: "Delivery Fleet Operators",
      type: "Logistics companies",
      skillsNeeded: ["Battery diagnostics", "Motor repair", "Quick turnaround service"],
      entryPoint: "Offer overflow/emergency repair capacity",
      incomeModel: "£40-60/job, high volume, steady contracts",
      brentContext: "Multiple courier and food delivery fleets operate from Wembley/Park Royal"
    },
    {
      name: "E-Bike Rental Operations",
      type: "Event & tourist rentals",
      skillsNeeded: ["High-volume servicing", "Safety checks", "Cosmetic repairs"],
      entryPoint: "Event-day support contracts",
      incomeModel: "£150-300/event day, seasonal peaks",
      brentContext: "Wembley events create rental demand spikes"
    },
    {
      name: "Established Bike Shops",
      type: "Existing repair businesses",
      skillsNeeded: ["E-bike specialization", "Customer service", "Stock knowledge"],
      entryPoint: "Apprenticeship or subcontracting",
      incomeModel: "£12-18/hr employed, or £30-50/job subcontract",
      brentContext: "Several shops on High Road lack e-bike expertise"
    }
  ],
  devices: [
    {
      name: "Phone Repair Shops",
      type: "Existing repair businesses",
      skillsNeeded: ["Screen replacement", "Microsoldering", "Customer service"],
      entryPoint: "Apprenticeship, overflow work, or succession path",
      incomeModel: "£10-15/hr learning, £25-40/job established",
      brentContext: "Multiple shops on Wembley High Road, some owners aging"
    },
    {
      name: "Care Sector Providers",
      type: "Care homes, domiciliary care",
      skillsNeeded: ["Patient explanation", "Device setup", "Accessibility config"],
      entryPoint: "Contract work through care agencies",
      incomeModel: "£25-40/visit, repeat clients, referral-based",
      brentContext: "Brent has significant elderly population needing tech support"
    },
    {
      name: "Schools & Colleges",
      type: "Education sector",
      skillsNeeded: ["Chromebook repair", "Device imaging", "Inventory systems"],
      entryPoint: "Part-time technician or repair contracts",
      incomeModel: "£15-22/hr, term-time, predictable",
      brentContext: "Every Brent school has device repair backlogs"
    }
  ],
  studio: [
    {
      name: "Churches & Faith Orgs",
      type: "Community institutions",
      skillsNeeded: ["Live sound", "Livestreaming", "Recording basics"],
      entryPoint: "Volunteer → paid position, or contract work",
      incomeModel: "£50-100/Sunday, £100-300/events",
      brentContext: "Dense network of Black-led churches with AV needs"
    },
    {
      name: "Event Production Companies",
      type: "AV and staging",
      skillsNeeded: ["Rigging basics", "Cable management", "Problem-solving"],
      entryPoint: "Runner/tech assistant → crew",
      incomeModel: "£100-200/day crew rates",
      brentContext: "Wembley events need local crew"
    },
    {
      name: "Recording Studios",
      type: "Music and podcast production",
      skillsNeeded: ["Session support", "Equipment maintenance", "Client management"],
      entryPoint: "Assist → junior engineer → succession",
      incomeModel: "£10-15/hr assisting, £25-50/hr engineering",
      brentContext: "Several studios in Harlesden/Wembley area"
    }
  ]
};

// ========================================
// DIAGNOSTIC TRAINER (ECOSYSTEM-INTEGRATED)
// ========================================

interface DiagnosticScenario {
  id: string;
  device: string;
  symptom: string;
  icon: string;
  possibleCauses: string[];
  correctCause: string;
  diagnosticSteps: string[];
  solution: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  pathway: PathwayType;
  // NEW: Ecosystem connection
  whoNeedsThis: string;
  realWorldContext: string;
}

const SCENARIOS: DiagnosticScenario[] = [
  {
    id: 'phone-no-charge',
    device: 'Smartphone',
    symptom: "Phone won't charge",
    icon: '📱',
    possibleCauses: ['Faulty cable', 'Dirty charging port', 'Dead battery', 'Faulty charger', 'Software issue'],
    correctCause: 'Dirty charging port',
    diagnosticSteps: [
      'Try a different cable',
      'Try a different charger',
      'Inspect charging port for debris',
      'Clean port with compressed air or soft brush',
      'If still not working, battery may need replacement'
    ],
    solution: 'Most commonly lint/debris in port. Clean gently. If that fails, likely battery degradation.',
    difficulty: 'beginner',
    pathway: 'devices',
    whoNeedsThis: "Phone repair shops, care sector (elder devices), schools (student phones)",
    realWorldContext: "This is 30% of walk-in repairs. Fast diagnosis = more throughput = more income."
  },
  {
    id: 'ebike-reduced-range',
    device: 'E-Bike',
    symptom: 'Battery draining faster than before',
    icon: '🚲',
    possibleCauses: ['Battery degradation', 'Tyre pressure low', 'Motor controller issue', 'Cold weather', 'Brakes dragging'],
    correctCause: 'Tyre pressure low',
    diagnosticSteps: [
      'Check tyre pressure (should be at max recommended)',
      'Check brakes aren\'t rubbing',
      'Check for battery health indicator',
      'Test in warmer conditions if cold',
      'Monitor motor for unusual sounds'
    ],
    solution: 'Low tyre pressure dramatically increases rolling resistance. Always check tyres first—it\'s free to fix.',
    difficulty: 'beginner',
    pathway: 'mobility',
    whoNeedsThis: "Delivery fleets (range = money), rental operators, commuters",
    realWorldContext: "Fleet operators lose £50-100/day per bike with range issues. Quick diagnosis keeps them moving."
  },
  {
    id: 'pc-slow',
    device: 'Gaming PC',
    symptom: 'Games running slow/stuttering',
    icon: '🖥️',
    possibleCauses: ['Thermal throttling', 'Outdated drivers', 'Full storage', 'Background processes', 'Hardware failing'],
    correctCause: 'Thermal throttling',
    diagnosticSteps: [
      'Check CPU/GPU temperatures while gaming',
      'Open case and check for dust buildup',
      'Verify all fans are running',
      'Check thermal paste age',
      'Monitor task manager for background CPU usage'
    ],
    solution: 'Dust buildup is #1 cause. Clean thoroughly with compressed air. If temps still high, replace thermal paste.',
    difficulty: 'intermediate',
    pathway: 'studio',
    whoNeedsThis: "Content creators, streamers, gaming cafes, home users",
    realWorldContext: "Streamers can't afford downtime. Fast diagnosis + fix = repeat client + referrals."
  },
  {
    id: 'phone-screen-ghost',
    device: 'Smartphone',
    symptom: 'Screen has ghost touches / phantom taps',
    icon: '📱',
    possibleCauses: ['Screen protector issue', 'Screen damage', 'Software bug', 'Moisture damage', 'Faulty digitizer'],
    correctCause: 'Screen protector issue',
    diagnosticSteps: [
      'Remove screen protector and test',
      'Clean screen thoroughly',
      'Restart phone in safe mode',
      'Check for visible screen damage',
      'Test with known good replacement if available'
    ],
    solution: 'Cheap screen protectors cause most ghost touch issues. Remove and test before assuming hardware fault.',
    difficulty: 'beginner',
    pathway: 'devices',
    whoNeedsThis: "Phone shops (avoid unnecessary screen replacements), care sector",
    realWorldContext: "Misdiagnosing this costs £40-80 in unnecessary parts. Accuracy saves money."
  },
  {
    id: 'escooter-no-power',
    device: 'E-Scooter',
    symptom: 'Scooter won\'t turn on',
    icon: '🛴',
    possibleCauses: ['Battery drained', 'Kill switch engaged', 'Loose connection', 'BMS protection triggered', 'Controller failure'],
    correctCause: 'BMS protection triggered',
    diagnosticSteps: [
      'Check charge level indicator',
      'Verify kill switch position',
      'Check all visible connections',
      'Try charging for 30 mins then power on',
      'If still dead, BMS may need reset or battery replacement'
    ],
    solution: 'BMS (Battery Management System) can lock if battery drained too low. Sometimes requires specialist reset.',
    difficulty: 'intermediate',
    pathway: 'mobility',
    whoNeedsThis: "Rental operators (scooters sit unused), private owners, last-mile delivery",
    realWorldContext: "BMS issues are common but misunderstood. This knowledge is rare = premium rates."
  },
  {
    id: 'audio-crackling',
    device: 'Home Studio',
    symptom: 'Audio crackling/popping in recordings',
    icon: '🎙️',
    possibleCauses: ['Buffer size too low', 'USB hub issue', 'Driver conflict', 'Cable interference', 'CPU overload'],
    correctCause: 'Buffer size too low',
    diagnosticSteps: [
      'Check audio interface buffer settings',
      'Connect interface directly to PC (not hub)',
      'Update audio drivers',
      'Check USB cable quality',
      'Monitor CPU usage during recording'
    ],
    solution: 'Increase buffer size to 256 or 512 samples. Only use 64/128 for live monitoring when necessary.',
    difficulty: 'intermediate',
    pathway: 'studio',
    whoNeedsThis: "Churches (livestream issues), podcasters, home producers, studios",
    realWorldContext: "Audio issues ruin recordings. Studios pay premium for engineers who can diagnose fast."
  }
];

const DiagnosticTrainer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentScenario, setCurrentScenario] = useState<DiagnosticScenario | null>(null);
  const [selectedCause, setSelectedCause] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showEcosystemPrompt, setShowEcosystemPrompt] = useState(false);

  const startScenario = (scenario: DiagnosticScenario) => {
    setCurrentScenario(scenario);
    setSelectedCause(null);
    setShowSolution(false);
    setShowEcosystemPrompt(false);
  };

  const submitAnswer = () => {
    if (!currentScenario || !selectedCause) return;
    
    const isCorrect = selectedCause === currentScenario.correctCause;
    const newScore = {
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1
    };
    setScore(newScore);
    setShowSolution(true);
    
    // Show ecosystem prompt after 3 correct answers
    if (newScore.correct >= 3 && !showEcosystemPrompt) {
      setShowEcosystemPrompt(true);
    }
  };

  const resetTrainer = () => {
    setCurrentScenario(null);
    setSelectedCause(null);
    setShowSolution(false);
  };

  // Ecosystem connection prompt after proving skills
  if (showEcosystemPrompt && !currentScenario) {
    const pathwaysCovered = [...new Set(SCENARIOS.filter((_, i) => i < score.total).map(s => s.pathway))];
    const relevantBusinesses = pathwaysCovered.flatMap(p => ECOSYSTEM_CONNECTIONS[p]).slice(0, 3);
    
    return (
      <div className={styles.trainerContainer}>
        <div className={styles.trainerHeader}>
          <h2>🎯 Skills Proven — Now Connect</h2>
          <button onClick={onClose} className={styles.closeButton}>← Back</button>
        </div>

        <div className={styles.ecosystemPromptCard}>
          <div className={styles.scoreHighlight}>
            You've diagnosed {score.correct}/{score.total} correctly
          </div>
          
          <h3>Who in Brent needs these skills right now?</h3>
          <p>
            Your diagnostic accuracy is proven. The question isn't "can you do this?" 
            It's "who's already paying for this work?"
          </p>

          <div className={styles.ecosystemBusinessList}>
            {relevantBusinesses.map((business, i) => (
              <div key={i} className={styles.ecosystemBusinessCard}>
                <h4>{business.name}</h4>
                <p className={styles.businessType}>{business.type}</p>
                <div className={styles.businessDetail}>
                  <strong>Entry point:</strong> {business.entryPoint}
                </div>
                <div className={styles.businessDetail}>
                  <strong>Income model:</strong> {business.incomeModel}
                </div>
                <div className={styles.businessContext}>
                  {business.brentContext}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.ecosystemPromptActions}>
            <button 
              className={styles.continueTrainingButton}
              onClick={() => setShowEcosystemPrompt(false)}
            >
              Continue Training
            </button>
            <Link to="/programmes/stemgeneers/sandbox" className={styles.exploreEcosystemButton}>
              Explore Full Ecosystem Map →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (currentScenario) {
    return (
      <div className={styles.trainerContainer}>
        <div className={styles.trainerHeader}>
          <h2>🔧 Diagnostic Trainer</h2>
          <div className={styles.trainerScore}>
            Score: {score.correct}/{score.total}
          </div>
          <button onClick={onClose} className={styles.closeButton}>← Back</button>
        </div>

        <div className={styles.scenarioCard}>
          <div className={styles.scenarioHeader}>
            <span className={styles.scenarioIcon}>{currentScenario.icon}</span>
            <div>
              <h3>{currentScenario.device}</h3>
              <span className={`${styles.difficultyBadge} ${styles[currentScenario.difficulty]}`}>
                {currentScenario.difficulty}
              </span>
              <span className={styles.pathwayBadge}>{currentScenario.pathway}</span>
            </div>
          </div>

          <div className={styles.symptomBox}>
            <h4>Customer says:</h4>
            <p>"{currentScenario.symptom}"</p>
          </div>

          {!showSolution ? (
            <>
              <div className={styles.diagnosisSection}>
                <h4>What's the most likely cause?</h4>
                <div className={styles.causesGrid}>
                  {currentScenario.possibleCauses.map((cause) => (
                    <button
                      key={cause}
                      className={`${styles.causeOption} ${selectedCause === cause ? styles.selected : ''}`}
                      onClick={() => setSelectedCause(cause)}
                    >
                      {cause}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className={styles.submitButton}
                onClick={submitAnswer}
                disabled={!selectedCause}
              >
                Submit Diagnosis
              </button>
            </>
          ) : (
            <div className={styles.solutionSection}>
              <div className={`${styles.resultBanner} ${selectedCause === currentScenario.correctCause ? styles.correct : styles.incorrect}`}>
                {selectedCause === currentScenario.correctCause ? '✓ Correct!' : '✗ Not quite'}
              </div>

              <div className={styles.correctAnswer}>
                <h4>Most likely cause:</h4>
                <p>{currentScenario.correctCause}</p>
              </div>

              <div className={styles.diagnosticSteps}>
                <h4>Diagnostic Steps:</h4>
                <ol>
                  {currentScenario.diagnosticSteps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className={styles.solutionBox}>
                <h4>The Fix:</h4>
                <p>{currentScenario.solution}</p>
              </div>

              {/* NEW: Ecosystem context for this skill */}
              <div className={styles.ecosystemContext}>
                <h4>🏢 Who Pays For This Skill?</h4>
                <p><strong>Market:</strong> {currentScenario.whoNeedsThis}</p>
                <p><strong>Real-world context:</strong> {currentScenario.realWorldContext}</p>
              </div>

              <div className={styles.solutionActions}>
                <button className={styles.nextButton} onClick={resetTrainer}>
                  Try Another Scenario
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.trainerContainer}>
      <div className={styles.trainerHeader}>
        <h2>🔧 Diagnostic Trainer</h2>
        <button onClick={onClose} className={styles.closeButton}>← Back</button>
      </div>

      <div className={styles.trainerIntro}>
        <p>
          Practice diagnosing common device problems. Learn to identify the most likely 
          cause before ordering parts or telling customers the wrong thing.
        </p>
        <p className={styles.ecosystemHint}>
          <strong>After you prove your skills:</strong> We'll show you who in Brent 
          is already paying for this work.
        </p>
        {score.total > 0 && (
          <div className={styles.scoreDisplay}>
            Your score: {score.correct}/{score.total} ({Math.round((score.correct/score.total)*100)}%)
          </div>
        )}
      </div>

      <div className={styles.scenariosGrid}>
        {SCENARIOS.map((scenario) => (
          <div key={scenario.id} className={styles.scenarioPreview}>
            <span className={styles.scenarioIcon}>{scenario.icon}</span>
            <h4>{scenario.device}</h4>
            <p>"{scenario.symptom}"</p>
            <div className={styles.scenarioMeta}>
              <span className={`${styles.difficultyBadge} ${styles[scenario.difficulty]}`}>
                {scenario.difficulty}
              </span>
              <span className={styles.pathwayBadge}>{scenario.pathway}</span>
            </div>
            <button 
              className={styles.startScenarioButton}
              onClick={() => startScenario(scenario)}
            >
              Diagnose →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ========================================
// PRICING CALCULATOR (ECOSYSTEM-INTEGRATED)
// Now shows: Individual rates vs Ecosystem rates
// ========================================

interface ServiceCategory {
  name: string;
  icon: string;
  color: string;
  pathway: PathwayType;
  services: {
    name: string;
    // Individual freelance rates
    individualMin: number;
    individualMax: number;
    // Ecosystem rates (subcontract, employed, apprentice)
    ecosystemRates: {
      type: 'subcontract' | 'employed' | 'apprentice';
      rate: string;
      volume: string;
      stability: 'variable' | 'steady' | 'predictable';
    }[];
    avgTime: string;
    partsCost?: string;
    notes: string;
  }[];
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    name: 'Devices & Phones',
    icon: '📱',
    color: '#8b5cf6',
    pathway: 'devices',
    services: [
      { 
        name: 'Screen replacement', 
        individualMin: 40, 
        individualMax: 150, 
        ecosystemRates: [
          { type: 'subcontract', rate: '£25-40/job', volume: '5-15/week via shop', stability: 'steady' },
          { type: 'employed', rate: '£12-18/hr', volume: 'Full-time', stability: 'predictable' },
          { type: 'apprentice', rate: '£8-12/hr', volume: 'Learning + earning', stability: 'predictable' }
        ],
        avgTime: '30-60 mins', 
        partsCost: '£20-80', 
        notes: 'High volume. Shops need overflow capacity.' 
      },
      { 
        name: 'Battery replacement', 
        individualMin: 30, 
        individualMax: 70, 
        ecosystemRates: [
          { type: 'subcontract', rate: '£15-25/job', volume: '10-20/week possible', stability: 'steady' },
          { type: 'employed', rate: '£12-18/hr', volume: 'Part of role', stability: 'predictable' }
        ],
        avgTime: '20-40 mins', 
        partsCost: '£10-30', 
        notes: 'Most common repair. Speed matters.' 
      },
      { 
        name: 'Elder tech setup', 
        individualMin: 25, 
        individualMax: 50, 
        ecosystemRates: [
          { type: 'subcontract', rate: '£20-35/visit', volume: '3-8/week via care agencies', stability: 'steady' }
        ],
        avgTime: '1-2 hours', 
        notes: 'Care sector contracts. Patient service valued.' 
      },
    ]
  },
  {
    name: 'Wheels & Mobility',
    icon: '🚲',
    color: '#10b981',
    pathway: 'mobility',
    services: [
      { 
        name: 'E-bike battery replacement', 
        individualMin: 100, 
        individualMax: 300, 
        ecosystemRates: [
          { type: 'subcontract', rate: '£60-100/job', volume: '2-5/week via shops', stability: 'steady' },
          { type: 'employed', rate: '£15-22/hr', volume: 'Fleet mechanic role', stability: 'predictable' }
        ],
        avgTime: '30-60 mins', 
        partsCost: '£150-400', 
        notes: 'Specialist skill. Fleets need reliable suppliers.' 
      },
      { 
        name: 'Full service & tune-up', 
        individualMin: 50, 
        individualMax: 80, 
        ecosystemRates: [
          { type: 'subcontract', rate: '£30-50/job', volume: '5-10/week overflow', stability: 'steady' },
          { type: 'employed', rate: '£14-20/hr', volume: 'Shop mechanic', stability: 'predictable' }
        ],
        avgTime: '1-2 hours', 
        notes: 'Recurring revenue. Fleet contracts valuable.' 
      },
      { 
        name: 'Event fleet support', 
        individualMin: 150, 
        individualMax: 300, 
        ecosystemRates: [
          { type: 'subcontract', rate: '£150-250/day', volume: 'Event days only', stability: 'variable' }
        ],
        avgTime: 'Full day', 
        notes: 'Wembley events. High day rate, irregular.' 
      },
    ]
  },
  {
    name: 'Home Tech & Studio',
    icon: '🖥️',
    color: '#f59e0b',
    pathway: 'studio',
    services: [
      { 
        name: 'Gaming PC build', 
        individualMin: 100, 
        individualMax: 200, 
        ecosystemRates: [
          { type: 'subcontract', rate: '£60-100/build', volume: 'Via PC shops', stability: 'variable' }
        ],
        avgTime: '2-4 hours', 
        notes: 'Labour only. Customer sources parts or you markup.' 
      },
      { 
        name: 'Church AV setup/support', 
        individualMin: 50, 
        individualMax: 150, 
        ecosystemRates: [
          { type: 'subcontract', rate: '£50-100/Sunday', volume: 'Weekly + events', stability: 'predictable' },
          { type: 'employed', rate: '£15-25/hr', volume: 'Part-time AV role', stability: 'predictable' }
        ],
        avgTime: '2-4 hours', 
        notes: 'Relationship-based. Consistent Sunday work.' 
      },
      { 
        name: 'Home recording studio', 
        individualMin: 100, 
        individualMax: 300, 
        ecosystemRates: [
          { type: 'subcontract', rate: '£80-150/setup', volume: 'Referral-based', stability: 'variable' },
          { type: 'apprentice', rate: '£10-15/hr', volume: 'Studio assistant', stability: 'steady' }
        ],
        avgTime: '3-5 hours', 
        notes: 'Acoustic treatment, equipment, software config.' 
      },
    ]
  }
];

const PricingCalculator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'individual' | 'ecosystem'>('ecosystem');
  const [selectedServices, setSelectedServices] = useState<{service: string, count: number}[]>([]);

  const category = SERVICE_CATEGORIES.find(c => c.name === selectedCategory);

  const addService = (serviceName: string) => {
    const existing = selectedServices.find(s => s.service === serviceName);
    if (existing) {
      setSelectedServices(selectedServices.map(s => 
        s.service === serviceName ? { ...s, count: s.count + 1 } : s
      ));
    } else {
      setSelectedServices([...selectedServices, { service: serviceName, count: 1 }]);
    }
  };

  const removeService = (serviceName: string) => {
    const existing = selectedServices.find(s => s.service === serviceName);
    if (existing && existing.count > 1) {
      setSelectedServices(selectedServices.map(s => 
        s.service === serviceName ? { ...s, count: s.count - 1 } : s
      ));
    } else {
      setSelectedServices(selectedServices.filter(s => s.service !== serviceName));
    }
  };

  const calculateProjected = () => {
    let minTotal = 0;
    let maxTotal = 0;

    selectedServices.forEach(selected => {
      SERVICE_CATEGORIES.forEach(cat => {
        const service = cat.services.find(s => s.name === selected.service);
        if (service) {
          minTotal += service.individualMin * selected.count;
          maxTotal += service.individualMax * selected.count;
        }
      });
    });

    return { min: minTotal, max: maxTotal };
  };

  const projected = calculateProjected();

  return (
    <div className={styles.pricingContainer}>
      <div className={styles.pricingHeader}>
        <h2>💷 Service Pricing Calculator</h2>
        <button onClick={onClose} className={styles.closeButton}>← Back</button>
      </div>

      <div className={styles.pricingIntro}>
        <p>
          Understand what services are worth—and <strong>how different income paths compare</strong>.
        </p>
      </div>

      {/* View Mode Toggle */}
      <div className={styles.viewModeToggle}>
        <button 
          className={`${styles.viewModeButton} ${viewMode === 'individual' ? styles.active : ''}`}
          onClick={() => setViewMode('individual')}
        >
          💼 Individual Rates
        </button>
        <button 
          className={`${styles.viewModeButton} ${viewMode === 'ecosystem' ? styles.active : ''}`}
          onClick={() => setViewMode('ecosystem')}
        >
          🏢 Ecosystem Rates
        </button>
      </div>

      {viewMode === 'ecosystem' && (
        <div className={styles.ecosystemExplainer}>
          <h4>Why Ecosystem Rates?</h4>
          <p>
            Individual rates look higher, but require: finding customers, marketing, 
            handling no-shows, building reputation from zero. Ecosystem rates are lower 
            per job but offer: steady volume, zero marketing cost, reputation by association, 
            and potential succession paths.
          </p>
        </div>
      )}

      {!selectedCategory ? (
        <div className={styles.categorySelection}>
          <h3>Choose a Pathway:</h3>
          <div className={styles.categoryGrid}>
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                className={styles.categoryButton}
                style={{ borderColor: cat.color }}
                onClick={() => setSelectedCategory(cat.name)}
              >
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <span style={{ color: cat.color }}>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <button 
            className={styles.backCategoryButton}
            onClick={() => setSelectedCategory(null)}
          >
            ← Change Category
          </button>

          <div className={styles.servicesSection}>
            <h3 style={{ color: category?.color }}>
              {category?.icon} {category?.name} Services
            </h3>

            <div className={styles.servicesTable}>
              {category?.services.map((service) => (
                <div key={service.name} className={styles.serviceRow}>
                  <div className={styles.serviceInfo}>
                    <h4>{service.name}</h4>
                    <p className={styles.serviceNotes}>{service.notes}</p>
                    <div className={styles.serviceMeta}>
                      <span>⏱️ {service.avgTime}</span>
                      {service.partsCost && <span>🔧 Parts: {service.partsCost}</span>}
                    </div>
                  </div>
                  
                  {viewMode === 'individual' ? (
                    <div className={styles.serviceRate}>
                      <span className={styles.rateRange}>£{service.individualMin}-{service.individualMax}</span>
                      <div className={styles.serviceCounter}>
                        <button onClick={() => removeService(service.name)}>-</button>
                        <span>{selectedServices.find(s => s.service === service.name)?.count || 0}</span>
                        <button onClick={() => addService(service.name)}>+</button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.ecosystemRates}>
                      {service.ecosystemRates.map((rate, i) => (
                        <div key={i} className={styles.ecosystemRateItem}>
                          <span className={styles.rateType}>{rate.type}</span>
                          <span className={styles.rateValue}>{rate.rate}</span>
                          <span className={styles.rateVolume}>{rate.volume}</span>
                          <span className={`${styles.rateStability} ${styles[rate.stability]}`}>
                            {rate.stability}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {viewMode === 'individual' && selectedServices.length > 0 && (
            <div className={styles.projectionCard}>
              <h3>Monthly Projection (Individual)</h3>
              <p className={styles.projectionNote}>
                If you complete these services each month as a freelancer:
              </p>
              <div className={styles.projectionSummary}>
                {selectedServices.map((s) => (
                  <div key={s.service} className={styles.projectionItem}>
                    <span>{s.service}</span>
                    <span>× {s.count}</span>
                  </div>
                ))}
              </div>
              <div className={styles.projectionTotal}>
                <span>Estimated Monthly:</span>
                <strong>£{projected.min} - £{projected.max}</strong>
              </div>
              <p className={styles.projectionDisclaimer}>
                ⚠️ This assumes you find all these customers yourself. Marketing, 
                no-shows, and reputation-building time not included.
              </p>
              <button 
                className={styles.switchToEcosystemButton}
                onClick={() => setViewMode('ecosystem')}
              >
                Compare with Ecosystem Rates →
              </button>
            </div>
          )}

          {viewMode === 'ecosystem' && category && (
            <div className={styles.ecosystemConnectionCard}>
              <h3>🏢 Who's Hiring in Brent?</h3>
              <div className={styles.ecosystemBusinessList}>
                {ECOSYSTEM_CONNECTIONS[category.pathway].slice(0, 2).map((business, i) => (
                  <div key={i} className={styles.ecosystemBusinessCard}>
                    <h4>{business.name}</h4>
                    <p className={styles.businessType}>{business.type}</p>
                    <div className={styles.businessDetail}>
                      <strong>Entry point:</strong> {business.entryPoint}
                    </div>
                    <div className={styles.businessDetail}>
                      <strong>Income model:</strong> {business.incomeModel}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// ========================================
// INCOME PATHWAY MAPPER (NEW)
// Replaces Income Mapper with ecosystem-focused version
// ========================================

interface IncomePathway {
  name: string;
  description: string;
  icon: string;
  yearOneIncome: string;
  yearThreeIncome: string;
  marketingRequired: 'none' | 'minimal' | 'significant';
  stability: 'variable' | 'steady' | 'predictable';
  successionPath: boolean;
  tradeoffs: string[];
}

const INCOME_PATHWAYS: IncomePathway[] = [
  {
    name: "Solo Freelancer",
    description: "Find your own customers, set your own rates, build your own reputation",
    icon: "💼",
    yearOneIncome: "£200-600/month",
    yearThreeIncome: "£800-2000/month",
    marketingRequired: 'significant',
    stability: 'variable',
    successionPath: false,
    tradeoffs: [
      "Highest per-job rates",
      "Full control over schedule",
      "Must find all customers yourself",
      "Income gaps between clients",
      "No equipment access",
      "Building reputation takes years"
    ]
  },
  {
    name: "Subcontractor",
    description: "Overflow work from established shops—their customers, your skills",
    icon: "🤝",
    yearOneIncome: "£400-800/month",
    yearThreeIncome: "£800-1500/month",
    marketingRequired: 'minimal',
    stability: 'steady',
    successionPath: true,
    tradeoffs: [
      "Lower per-job rate",
      "Steady work flow",
      "No marketing required",
      "Reputation by association",
      "Potential succession path",
      "Learn business operations"
    ]
  },
  {
    name: "Part-Time Employed",
    description: "Regular hours with established business—predictable income, skill development",
    icon: "🏢",
    yearOneIncome: "£600-1000/month",
    yearThreeIncome: "£800-1400/month",
    marketingRequired: 'none',
    stability: 'predictable',
    successionPath: true,
    tradeoffs: [
      "Fixed hourly rate",
      "Completely predictable income",
      "Access to professional equipment",
      "Learn from experienced technicians",
      "Strong succession potential",
      "Less schedule flexibility"
    ]
  },
  {
    name: "Apprenticeship Path",
    description: "Lower pay now, skills + succession positioning for later",
    icon: "🎓",
    yearOneIncome: "£400-700/month",
    yearThreeIncome: "£1000-2000/month + equity potential",
    marketingRequired: 'none',
    stability: 'predictable',
    successionPath: true,
    tradeoffs: [
      "Lower initial income",
      "Accelerated skill development",
      "Inside track on succession",
      "Business knowledge transfer",
      "Relationship with owner",
      "Long-term wealth potential"
    ]
  },
  {
    name: "Hybrid: Employed + Freelance",
    description: "Steady base from employment, top-up from direct clients",
    icon: "⚡",
    yearOneIncome: "£700-1200/month",
    yearThreeIncome: "£1200-2500/month",
    marketingRequired: 'minimal',
    stability: 'steady',
    successionPath: true,
    tradeoffs: [
      "Stable base income",
      "Upside from freelance",
      "Equipment access through employer",
      "Reputation building on both fronts",
      "More total hours required",
      "Must manage two relationships"
    ]
  }
];

const IncomePathwayMapper: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedPathway, setSelectedPathway] = useState<IncomePathway | null>(null);
  const [priorities, setPriorities] = useState<string[]>([]);

  const togglePriority = (priority: string) => {
    if (priorities.includes(priority)) {
      setPriorities(priorities.filter(p => p !== priority));
    } else if (priorities.length < 3) {
      setPriorities([...priorities, priority]);
    }
  };

  const priorityOptions = [
    { id: 'income-now', label: 'Maximize income immediately', icon: '💷' },
    { id: 'stability', label: 'Predictable, stable income', icon: '📊' },
    { id: 'flexibility', label: 'Schedule flexibility', icon: '🕐' },
    { id: 'learning', label: 'Skill development', icon: '📚' },
    { id: 'succession', label: 'Long-term business ownership', icon: '🏠' },
    { id: 'low-marketing', label: 'Minimal self-promotion', icon: '🔇' },
  ];

  const getRecommendedPathway = (): IncomePathway | null => {
    if (priorities.length === 0) return null;
    
    // Simple scoring based on priorities
    const scores = INCOME_PATHWAYS.map(pathway => {
      let score = 0;
      if (priorities.includes('income-now') && pathway.name === 'Solo Freelancer') score += 2;
      if (priorities.includes('stability') && pathway.stability === 'predictable') score += 3;
      if (priorities.includes('flexibility') && pathway.name === 'Solo Freelancer') score += 2;
      if (priorities.includes('learning') && pathway.successionPath) score += 2;
      if (priorities.includes('succession') && pathway.successionPath) score += 3;
      if (priorities.includes('low-marketing') && pathway.marketingRequired === 'none') score += 3;
      return { pathway, score };
    });
    
    return scores.sort((a, b) => b.score - a.score)[0].pathway;
  };

  const recommended = getRecommendedPathway();

  return (
    <div className={styles.incomeMapperContainer}>
      <div className={styles.incomeMapperHeader}>
        <h2>💰 Income Pathway Mapper</h2>
        <button onClick={onClose} className={styles.closeButton}>← Back</button>
      </div>

      <div className={styles.incomeMapperIntro}>
        <p>
          There's more than one way to earn from technical skills. The "best" path 
          depends on what matters to you.
        </p>
      </div>

      {/* Priority Selection */}
      <div className={styles.prioritySection}>
        <h3>What matters most to you? (Select up to 3)</h3>
        <div className={styles.priorityGrid}>
          {priorityOptions.map((option) => (
            <button
              key={option.id}
              className={`${styles.priorityButton} ${priorities.includes(option.id) ? styles.selected : ''}`}
              onClick={() => togglePriority(option.id)}
            >
              <span className={styles.priorityIcon}>{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      {recommended && (
        <div className={styles.recommendationCard}>
          <h3>Based on your priorities:</h3>
          <div className={styles.recommendedPathway}>
            <span className={styles.recommendedIcon}>{recommended.icon}</span>
            <div>
              <h4>{recommended.name}</h4>
              <p>{recommended.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* All Pathways Comparison */}
      <div className={styles.pathwaysComparison}>
        <h3>All Income Pathways</h3>
        <div className={styles.pathwaysGrid}>
          {INCOME_PATHWAYS.map((pathway) => (
            <div 
              key={pathway.name} 
              className={`${styles.pathwayCard} ${selectedPathway?.name === pathway.name ? styles.expanded : ''} ${recommended?.name === pathway.name ? styles.recommended : ''}`}
              onClick={() => setSelectedPathway(selectedPathway?.name === pathway.name ? null : pathway)}
            >
              {recommended?.name === pathway.name && (
                <span className={styles.recommendedBadge}>Recommended for you</span>
              )}
              <div className={styles.pathwayHeader}>
                <span className={styles.pathwayIcon}>{pathway.icon}</span>
                <h4>{pathway.name}</h4>
              </div>
              <p className={styles.pathwayDesc}>{pathway.description}</p>
              
              <div className={styles.pathwayMetrics}>
                <div className={styles.pathwayMetric}>
                  <span className={styles.metricLabel}>Year 1</span>
                  <span className={styles.metricValue}>{pathway.yearOneIncome}</span>
                </div>
                <div className={styles.pathwayMetric}>
                  <span className={styles.metricLabel}>Year 3</span>
                  <span className={styles.metricValue}>{pathway.yearThreeIncome}</span>
                </div>
              </div>

              <div className={styles.pathwayIndicators}>
                <span className={`${styles.indicator} ${styles[pathway.stability]}`}>
                  {pathway.stability}
                </span>
                {pathway.successionPath && (
                  <span className={styles.successionIndicator}>
                    🏠 Succession path
                  </span>
                )}
              </div>

              {selectedPathway?.name === pathway.name && (
                <div className={styles.pathwayDetails}>
                  <h5>Trade-offs:</h5>
                  <ul>
                    {pathway.tradeoffs.map((tradeoff, i) => (
                      <li key={i}>{tradeoff}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Key Insight */}
      <div className={styles.keyInsightBox}>
        <h4>The Real Question</h4>
        <p>
          Individual rates look higher on paper. But "£100/job × 0 jobs this week = £0" 
          is worse than "£40/job × 10 jobs = £400." Ecosystem connections provide 
          volume, stability, and succession paths that freelancing alone cannot.
        </p>
      </div>
    </div>
  );
};

// ========================================
// COLLECTIVE CALCULATOR (ECOSYSTEM-ENHANCED)
// ========================================

const CollectiveCalculator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [members, setMembers] = useState(8);
  const [contribution, setContribution] = useState(50);
  const [pathway, setPathway] = useState<PathwayType | ''>('');

  const poolPerMonth = members * contribution;
  const cycleLength = `${members} months`;

  const equipmentByPathway: Record<string, {name: string, cost: number}[]> = {
    'devices': [
      { name: "Professional phone repair kit", cost: 150 },
      { name: "Hot air rework station", cost: 200 },
      { name: "Ultrasonic cleaner", cost: 100 },
      { name: "Quality soldering station", cost: 150 },
      { name: "Diagnostic multimeter", cost: 80 },
      { name: "Microscope for board work", cost: 300 },
    ],
    'mobility': [
      { name: "E-bike tool set", cost: 200 },
      { name: "Battery testing equipment", cost: 250 },
      { name: "Torque wrenches (set)", cost: 150 },
      { name: "Work stand", cost: 120 },
      { name: "Mobile service kit + bag", cost: 180 },
    ],
    'studio': [
      { name: "Quality soldering station", cost: 150 },
      { name: "Cable tester/maker kit", cost: 100 },
      { name: "Thermal paste + tools", cost: 50 },
      { name: "PC diagnostic kit", cost: 120 },
      { name: "Audio interface for testing", cost: 200 },
      { name: "Lighting test kit", cost: 150 },
    ],
    '': [
      { name: "3D printer (entry level)", cost: 250 },
      { name: "Oscilloscope", cost: 300 },
      { name: "Power supply (bench)", cost: 150 },
      { name: "Parts organizer system", cost: 80 },
    ]
  };

  const selectedEquipment = equipmentByPathway[pathway] || equipmentByPathway[''];
  const affordableEquipment = selectedEquipment.filter(e => e.cost <= poolPerMonth);

  return (
    <div className={styles.collectiveContainer}>
      <div className={styles.collectiveHeader}>
        <h2>🤝 Equipment Collective Calculator</h2>
        <button onClick={onClose} className={styles.closeButton}>← Back</button>
      </div>

      <div className={styles.collectiveIntro}>
        <p>
          Professional equipment is expensive alone. A Tech Collective uses pardner 
          principles—pool monthly contributions, take turns getting lump sums for 
          equipment purchases.
        </p>
      </div>

      <div className={styles.collectiveForm}>
        <div className={styles.formGroup}>
          <label>Number of Members</label>
          <input
            type="range"
            min="4"
            max="16"
            value={members}
            onChange={(e) => setMembers(Number(e.target.value))}
          />
          <span className={styles.rangeValue}>{members} members</span>
        </div>

        <div className={styles.formGroup}>
          <label>Monthly Contribution</label>
          <input
            type="range"
            min="25"
            max="100"
            step="5"
            value={contribution}
            onChange={(e) => setContribution(Number(e.target.value))}
          />
          <span className={styles.rangeValue}>£{contribution}/month</span>
        </div>

        <div className={styles.formGroup}>
          <label>Pathway Focus</label>
          <select
            value={pathway}
            onChange={(e) => setPathway(e.target.value as PathwayType | '')}
          >
            <option value="">General/Mixed</option>
            <option value="devices">Devices & Phones</option>
            <option value="mobility">Wheels & Mobility</option>
            <option value="studio">Home Tech & Studio</option>
          </select>
        </div>
      </div>

      <div className={styles.collectiveResults}>
        <h3>Your Tech Collective</h3>

        <div className={styles.resultsGrid}>
          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>Monthly Pool</span>
            <span className={styles.resultValue}>£{poolPerMonth}</span>
          </div>
          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>Cycle Length</span>
            <span className={styles.resultValue}>{cycleLength}</span>
          </div>
          <div className={`${styles.resultCard} ${styles.highlight}`}>
            <span className={styles.resultLabel}>Your "Hand"</span>
            <span className={styles.resultValue}>£{poolPerMonth}</span>
          </div>
        </div>

        <div className={styles.equipmentSection}>
          <h4>With £{poolPerMonth}, You Could Buy:</h4>
          <div className={styles.equipmentList}>
            {affordableEquipment.map((item) => (
              <div key={item.name} className={styles.equipmentItem}>
                <span>{item.name}</span>
                <span>£{item.cost}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.timelineSection}>
          <h4>After Full Cycle ({cycleLength}):</h4>
          <p>
            Each member will have received £{poolPerMonth} to spend on equipment. 
            Collectively, the group will have £{poolPerMonth * members} worth of 
            tools that can be shared.
          </p>
        </div>

        {/* NEW: Ecosystem Connection */}
        <div className={styles.collectiveEcosystemConnection}>
          <h4>🏢 Collective + Ecosystem = Leverage</h4>
          <p>
            A Tech Collective with professional equipment can bid for contracts that 
            individuals can't. Consider:
          </p>
          <ul>
            <li><strong>School device repair contracts</strong> — require multiple technicians + equipment</li>
            <li><strong>Fleet maintenance agreements</strong> — need capacity for volume work</li>
            <li><strong>Event support teams</strong> — Wembley events need crews, not individuals</li>
            <li><strong>Shared workshop space</strong> — collective can afford rent individuals can't</li>
          </ul>
        </div>

        <div className={styles.collectiveNote}>
          <h4>Collective Principles</h4>
          <ul>
            <li><strong>Trust-based:</strong> Only form with people you trust</li>
            <li><strong>Rotation:</strong> Order can be based on need or random</li>
            <li><strong>Shared access:</strong> Even after buying, equipment can be borrowed</li>
            <li><strong>Accountability:</strong> One person tracks contributions</li>
            <li><strong>Wholesale buying:</strong> Pool can also buy parts in bulk</li>
          </ul>
        </div>
      </div>

      <div className={styles.nextStepsBox}>
        <h4>Ready to Form a Tech Collective?</h4>
        <p>
          Connect with other STEMgeneers members. We can help facilitate 
          introductions and provide guidance.
        </p>
        <Link to="/get-started" className={styles.joinButton}>
          Join STEMgeneers →
        </Link>
      </div>
    </div>
  );
};

// ========================================
// MAIN SANDBOX COMPONENT
// ========================================

const STEMgeneersSandbox: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(null);

  if (activeTool === 'diagnostic-trainer') {
    return (
      <PageTemplate
        pageTitle="Diagnostic Trainer"
        pageStrapline="Practice troubleshooting — then connect to who's paying"
        showMaya={false}
        pageType="sandbox"
      >
        <DiagnosticTrainer onClose={() => setActiveTool(null)} />
      </PageTemplate>
    );
  }

  if (activeTool === 'pricing-calculator') {
    return (
      <PageTemplate
        pageTitle="Service Pricing Calculator"
        pageStrapline="Compare individual rates vs ecosystem income paths"
        showMaya={false}
        pageType="sandbox"
      >
        <PricingCalculator onClose={() => setActiveTool(null)} />
      </PageTemplate>
    );
  }

  if (activeTool === 'income-pathway-mapper') {
    return (
      <PageTemplate
        pageTitle="Income Pathway Mapper"
        pageStrapline="Find the earning path that fits your priorities"
        showMaya={false}
        pageType="sandbox"
      >
        <IncomePathwayMapper onClose={() => setActiveTool(null)} />
      </PageTemplate>
    );
  }

  if (activeTool === 'collective-calculator') {
    return (
      <PageTemplate
        pageTitle="Equipment Collective Calculator"
        pageStrapline="Model pardner-style equipment sharing"
        showMaya={false}
        pageType="sandbox"
      >
        <CollectiveCalculator onClose={() => setActiveTool(null)} />
      </PageTemplate>
    );
  }

  return (
    <PageTemplate
      pageTitle="STEMgeneers Sandbox"
      pageStrapline="Applied Tech Tools — Build Skills, Connect to Ecosystem, Start Earning"
      pageGuide="Skills earn through connection. Learn who's paying before you start marketing."
      showMaya={true}
      pageType="sandbox"
    >
      <div className={styles.sandboxContent}>
        
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.dedication}>
            <h2 className={styles.dedicationTitle}>
              Skills Earn Through Connection
            </h2>
            <p className={styles.dedicationMessage}>
              The yard mechanic didn't just have skills—they had <strong>community trust</strong> and 
              <strong> established relationships</strong>. We help you build both.
            </p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className={styles.toolsSection}>
          <h2 className={styles.sectionTitle}>Your Technical Tools</h2>

          <div className={styles.toolsGrid}>
            {/* Diagnostic Trainer */}
            <div className={styles.toolCard}>
              <div className={styles.toolIcon}>🔧</div>
              <h3>Diagnostic Trainer</h3>
              <p>
                Practice diagnosing common device problems. Prove your skills—then 
                see who in Brent is already paying for this work.
              </p>
              <div className={styles.toolFeatures}>
                <span>6 scenarios</span>
                <span>All pathways</span>
                <span>Ecosystem links</span>
              </div>
              <button
                className={styles.toolButton}
                onClick={() => setActiveTool('diagnostic-trainer')}
              >
                Start Training →
              </button>
            </div>

            {/* Pricing Calculator */}
            <div className={styles.toolCard}>
              <div className={styles.toolIcon}>💷</div>
              <h3>Pricing Calculator</h3>
              <p>
                Compare individual freelance rates with ecosystem income paths. 
                See why "lower per-job" can mean "higher total income."
              </p>
              <div className={styles.toolFeatures}>
                <span>Individual vs ecosystem</span>
                <span>Real rates</span>
                <span>Trade-off analysis</span>
              </div>
              <button
                className={styles.toolButton}
                onClick={() => setActiveTool('pricing-calculator')}
              >
                Compare Paths →
              </button>
            </div>

            {/* Income Pathway Mapper */}
            <div className={styles.toolCard}>
              <div className={styles.toolIcon}>🗺️</div>
              <h3>Income Pathway Mapper</h3>
              <p>
                Not everyone wants the same thing. Map your priorities to the 
                earning path that actually fits—freelance, employed, hybrid, or apprentice.
              </p>
              <div className={styles.toolFeatures}>
                <span>5 pathways</span>
                <span>Priority matching</span>
                <span>3-year projections</span>
              </div>
              <button
                className={styles.toolButton}
                onClick={() => setActiveTool('income-pathway-mapper')}
              >
                Find Your Path →
              </button>
            </div>

            {/* Equipment Collective */}
            <div className={styles.toolCard}>
              <div className={styles.toolIcon}>🤝</div>
              <h3>Equipment Collective Calculator</h3>
              <p>
                Model a Tech Collective—pardner-style equipment sharing. See how 
                collective ownership unlocks contracts individuals can't access.
              </p>
              <div className={styles.toolFeatures}>
                <span>Pardner model</span>
                <span>Equipment lists</span>
                <span>Contract leverage</span>
              </div>
              <button
                className={styles.toolButton}
                onClick={() => setActiveTool('collective-calculator')}
              >
                Plan Your Collective →
              </button>
            </div>
          </div>
        </section>

        {/* The Ecosystem Philosophy */}
        <section className={styles.philosophySection}>
          <div className={styles.philosophyCard}>
            <h2>Why "Ecosystem" Matters</h2>
            <div className={styles.philosophyGrid}>
              <div className={styles.philosophyItem}>
                <h4>❌ The Old Way</h4>
                <p>
                  Learn skills → Market yourself → Find customers → Hope it works
                </p>
                <p className={styles.philosophyProblem}>
                  High rates on paper, but £0 when no one knows you exist.
                </p>
              </div>
              <div className={styles.philosophyItem}>
                <h4>✓ The Ecosystem Way</h4>
                <p>
                  Learn skills → Connect to existing businesses → Steady work flows to you
                </p>
                <p className={styles.philosophyBenefit}>
                  Lower per-job rate, but work arrives without marketing.
                </p>
              </div>
            </div>
            <p className={styles.philosophyConclusion}>
              Brent has existing phone shops, bike mechanics, studios, and fleets. 
              They need skilled people. Your job isn't to compete with them—it's to 
              <strong> strengthen what's already here</strong>.
            </p>
          </div>
        </section>

        {/* The Three Pathways Summary */}
        <section className={styles.pathwaysSummary}>
          <h2 className={styles.sectionTitle}>Three Pathways That Earn</h2>
          <div className={styles.pathwaysGrid}>
            <div className={styles.pathwayMini} style={{ borderColor: '#10b981' }}>
              <span>🚲</span>
              <h4 style={{ color: '#10b981' }}>Wheels & Mobility</h4>
              <p>E-bikes, e-scooters, fleet maintenance</p>
              <p className={styles.pathwayEcosystem}>
                → Delivery fleets, rental operators, bike shops
              </p>
            </div>
            <div className={styles.pathwayMini} style={{ borderColor: '#8b5cf6' }}>
              <span>📱</span>
              <h4 style={{ color: '#8b5cf6' }}>Devices & Phones</h4>
              <p>Repairs, data recovery, elder setup</p>
              <p className={styles.pathwayEcosystem}>
                → Phone shops, care sector, schools
              </p>
            </div>
            <div className={styles.pathwayMini} style={{ borderColor: '#f59e0b' }}>
              <span>🖥️</span>
              <h4 style={{ color: '#f59e0b' }}>Home Tech & Studio</h4>
              <p>Gaming rigs, streaming, AV setup</p>
              <p className={styles.pathwayEcosystem}>
                → Churches, studios, event production
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2>Ready to Connect?</h2>
            <p>
              Try the tools for free. Join STEMgeneers to access introductions to 
              local businesses, collective equipment, and succession pathways.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/get-started" className={styles.ctaPrimary}>
                Join STEMgeneers
              </Link>
              <Link to="/programmes/stemgeneers" className={styles.ctaSecondary}>
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Back to Programme */}
        <section className={styles.backSection}>
          <Link to="/programmes/stemgeneers" className={styles.backLink}>
            ← Back to STEMgeneers Programme
          </Link>
        </section>

      </div>
    </PageTemplate>
  );
};

export default STEMgeneersSandbox;