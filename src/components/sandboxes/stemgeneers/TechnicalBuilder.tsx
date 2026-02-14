// src/components/sandboxes/stemgeneers/TechnicalBuilder.tsx
import React, { useState } from 'react';
import { useSandboxPlanner } from '../shared/useSandboxPlanner';
import MayaConversation from '../shared/MayaConversation';
import ProgressBar from '../shared/ProgressBar';
import NavigationButtons from '../shared/NavigationButtons';
import ConversionModal from '../shared/ConversionModal';
import styles from '../shared/SandboxPlanner.module.css';
import localStyles from './TechnicalBuilder.module.css';

// ========================================
// TYPES
// ========================================

type ProjectCategory = 
  | 'electronics'
  | 'mechanical'
  | 'robotics'
  | 'audio'
  | 'iot'
  | 'renewable'
  | 'fabrication';

type ComplexityLevel = 'beginner' | 'intermediate' | 'advanced';
type CollaborationScale = 'solo' | 'collaborative' | 'team';

interface TechnicalComponent {
  name: string;
  type: string;
  specifications: string;
  supplier?: string;
  cost: number;
}

interface SafetyConsideration {
  hazard: string;
  mitigation: string;
  priority: 'high' | 'medium' | 'low';
}

interface TechnicalProject {
  // Core concept
  projectName: string;
  category: ProjectCategory | null;
  whatItDoes: string;
  problemSolved: string;
  
  // Technical specs
  complexityLevel: ComplexityLevel | null;
  technicalRequirements: string;
  components: TechnicalComponent[];
  toolsNeeded: string[];
  estimatedBuildTime: number; // hours
  
  // Physics/Engineering principles
  principlesInvolved: string[];
  calculationsNeeded: string[];
  
  // Safety
  safetyConsiderations: SafetyConsideration[];
  
  // Collaboration
  collaborationScale: CollaborationScale | null;
  aestheticNeeds: boolean;
  documentationNeeds: boolean;
  businessPotential: boolean;
  
  // Output specs
  expectedPerformance: string;
  testingCriteria: string;
  successMetrics: string[];
}

// ========================================
// PROJECT TEMPLATES
// ========================================

const PROJECT_TEMPLATES = {
  'speaker-box': {
    name: 'Custom Speaker Box',
    category: 'audio' as ProjectCategory,
    whatItDoes: 'High-quality audio playback with custom tuning',
    problemSolved: 'Affordable professional sound for events/personal use',
    principles: ['Acoustics', 'Signal flow', 'Amplification', 'Impedance matching'],
    components: [
      { name: 'Woofer (8-inch)', type: 'Speaker', specifications: '8Ω, 100W RMS', cost: 25 },
      { name: 'Tweeter', type: 'Speaker', specifications: '8Ω, 50W RMS', cost: 15 },
      { name: 'Crossover', type: 'Circuit', specifications: '2-way, 2.5kHz', cost: 12 },
      { name: 'Amplifier board', type: 'Electronics', specifications: 'Class D, 2x50W', cost: 18 },
      { name: 'MDF board', type: 'Material', specifications: '18mm thickness', cost: 20 },
      { name: 'Speaker wire', type: 'Cable', specifications: '16AWG', cost: 5 },
    ],
    tools: ['Jigsaw', 'Drill', 'Soldering iron', 'Multimeter', 'Wood glue', 'Clamps'],
    buildTime: 12,
    safety: [
      { hazard: 'Sharp tools', mitigation: 'Safety glasses, proper technique', priority: 'high' as const },
      { hazard: 'Soldering heat', mitigation: 'Ventilation, heat-resistant surface', priority: 'medium' as const },
      { hazard: 'Wood dust', mitigation: 'Dust mask, workshop ventilation', priority: 'medium' as const },
    ],
  },
  
  'solar-charger': {
    name: 'Solar Phone Charging Station',
    category: 'renewable' as ProjectCategory,
    whatItDoes: 'Charges phones using solar energy with battery storage',
    problemSolved: 'Free charging for community, sustainable energy demonstration',
    principles: ['Photovoltaic conversion', 'Voltage regulation', 'Battery management', 'Power efficiency'],
    components: [
      { name: 'Solar panel', type: 'Power source', specifications: '50W, 12V', cost: 45 },
      { name: 'Charge controller', type: 'Circuit', specifications: 'MPPT, 10A', cost: 22 },
      { name: 'Battery', type: 'Storage', specifications: '12V 20Ah LiFePO4', cost: 65 },
      { name: 'USB ports (5V)', type: 'Output', specifications: '4-port, 12A total', cost: 15 },
      { name: 'Voltage display', type: 'Monitor', specifications: 'Digital voltmeter', cost: 8 },
      { name: 'Weatherproof enclosure', type: 'Housing', specifications: 'IP65 rated', cost: 30 },
    ],
    tools: ['Multimeter', 'Wire stripper', 'Drill', 'Screwdriver set', 'Cable management'],
    buildTime: 8,
    safety: [
      { hazard: 'Battery short circuit', mitigation: 'Proper fusing, insulated tools', priority: 'high' as const },
      { hazard: 'Weather exposure', mitigation: 'IP-rated enclosure, elevated mounting', priority: 'high' as const },
      { hazard: 'Electrical shock', mitigation: 'Proper grounding, isolated connections', priority: 'medium' as const },
    ],
  },

  'drone-racer': {
    name: 'FPV Racing Drone',
    category: 'robotics' as ProjectCategory,
    whatItDoes: 'High-speed aerial maneuvering with first-person video',
    problemSolved: 'Entry into competitive drone racing / aerial videography',
    principles: ['Aerodynamics', 'PID control', 'RF communication', 'Battery management', 'Video transmission'],
    components: [
      { name: 'Frame', type: 'Structure', specifications: '5-inch carbon fiber', cost: 35 },
      { name: 'Motors (4x)', type: 'Propulsion', specifications: '2306 2400KV brushless', cost: 80 },
      { name: 'ESCs (4x)', type: 'Electronics', specifications: '35A BLHeli_32', cost: 60 },
      { name: 'Flight controller', type: 'Computer', specifications: 'F4/F7 with OSD', cost: 45 },
      { name: 'FPV camera', type: 'Sensor', specifications: '1200TVL CMOS', cost: 25 },
      { name: 'VTX', type: 'Transmitter', specifications: '25-600mW switchable', cost: 22 },
      { name: 'Battery', type: 'Power', specifications: '4S 1500mAh LiPo', cost: 30 },
      { name: 'Receiver', type: 'Communication', specifications: 'SBUS/PPM compatible', cost: 18 },
    ],
    tools: ['Soldering station', 'Hex drivers', 'Wire stripper', 'Heat shrink gun', 'Multimeter', 'FC configurator'],
    buildTime: 16,
    safety: [
      { hazard: 'Spinning propellers', mitigation: 'Remove props during testing, safety glasses', priority: 'high' as const },
      { hazard: 'LiPo battery fire risk', mitigation: 'LiPo safe bag, voltage monitoring, proper storage', priority: 'high' as const },
      { hazard: 'RF interference', mitigation: 'Legal frequency bands, proper licensing', priority: 'medium' as const },
      { hazard: 'Crash damage', mitigation: 'Practice in open area, start with simulator', priority: 'medium' as const },
    ],
  },

  'iot-monitor': {
    name: 'Environmental Monitoring System',
    category: 'iot' as ProjectCategory,
    whatItDoes: 'Tracks temperature, humidity, air quality with web dashboard',
    problemSolved: 'Data-driven understanding of community environmental conditions',
    principles: ['Sensor interfacing', 'Data logging', 'WiFi communication', 'Web APIs', 'Data visualization'],
    components: [
      { name: 'ESP32 microcontroller', type: 'Computer', specifications: 'WiFi/BLE enabled', cost: 12 },
      { name: 'BME280 sensor', type: 'Sensor', specifications: 'Temp/humidity/pressure', cost: 8 },
      { name: 'MQ-135 sensor', type: 'Sensor', specifications: 'Air quality (CO2, NH3)', cost: 5 },
      { name: 'OLED display', type: 'Output', specifications: '0.96" I2C', cost: 6 },
      { name: 'Power supply', type: 'Power', specifications: '5V 2A USB', cost: 8 },
      { name: 'Enclosure', type: 'Housing', specifications: '3D printed or plastic box', cost: 5 },
    ],
    tools: ['Soldering iron', 'Arduino IDE', 'Breadboard', 'Jumper wires', 'Multimeter'],
    buildTime: 10,
    safety: [
      { hazard: 'Sensor calibration', mitigation: 'Cross-reference with known standards', priority: 'low' as const },
      { hazard: 'Network security', mitigation: 'Encrypted WiFi, secure API keys', priority: 'medium' as const },
    ],
  },

  'robotic-arm': {
    name: '3-Axis Robotic Arm',
    category: 'robotics' as ProjectCategory,
    whatItDoes: 'Programmable pick-and-place automation',
    problemSolved: 'Learn robotics fundamentals, automate repetitive tasks',
    principles: ['Kinematics', 'Servo control', 'Programming', 'Mechanical linkages', 'Torque calculations'],
    components: [
      { name: 'Servo motors (3x)', type: 'Actuator', specifications: 'MG996R high-torque', cost: 36 },
      { name: 'Arduino Uno', type: 'Controller', specifications: 'ATmega328P', cost: 15 },
      { name: 'Servo driver board', type: 'Interface', specifications: 'PCA9685 16-channel', cost: 8 },
      { name: 'Aluminum parts', type: 'Structure', specifications: 'Laser-cut or CNC', cost: 25 },
      { name: 'Gripper mechanism', type: 'End effector', specifications: 'Servo-actuated', cost: 12 },
      { name: 'Power supply', type: 'Power', specifications: '6V 3A', cost: 10 },
    ],
    tools: ['Screwdriver set', 'Allen keys', 'Wire stripper', 'Arduino IDE', 'Multimeter'],
    buildTime: 14,
    safety: [
      { hazard: 'Pinch points', mitigation: 'Emergency stop button, careful programming', priority: 'high' as const },
      { hazard: 'Servo overload', mitigation: 'Current limiting, proper power supply', priority: 'medium' as const },
    ],
  },
};

// ========================================
// COMPONENT
// ========================================

const TechnicalBuilder: React.FC = () => {
  const planner = useSandboxPlanner({
    storageKey: 'wembley-stemgeneers-downloads',
    totalSteps: 7,
    downloadLimit: 3,
  });

  const [projectData, setProjectData] = useState<TechnicalProject>({
    projectName: '',
    category: null,
    whatItDoes: '',
    problemSolved: '',
    complexityLevel: null,
    technicalRequirements: '',
    components: [],
    toolsNeeded: [],
    estimatedBuildTime: 0,
    principlesInvolved: [],
    calculationsNeeded: [],
    safetyConsiderations: [],
    collaborationScale: null,
    aestheticNeeds: false,
    documentationNeeds: false,
    businessPotential: false,
    expectedPerformance: '',
    testingCriteria: '',
    successMetrics: [],
  });

  const [generatedPlan, setGeneratedPlan] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // ========================================
  // STEP RENDERING
  // ========================================

  const renderStep = () => {
    switch (planner.currentStep) {
      case 0:
        return renderWelcomeStep();
      case 1:
        return renderProjectTypeStep();
      case 2:
        return renderTechnicalSpecStep();
      case 3:
        return renderComponentsStep();
      case 4:
        return renderCollaborationStep();
      case 5:
        return renderBusinessModelStep();
      case 6:
        return renderSafetyStep();
      case 7:
        return renderBuildPlanStep();
      default:
        return null;
    }
  };

  // ========================================
  // STEP 0: WELCOME
  // ========================================

  const renderWelcomeStep = () => (
    <div className={styles.stepContent}>
      <MayaConversation 
        message="Welcome to STEMgeneers - where engineering meets collaboration. You're not here to just learn theory. You're here to BUILD things that work, SOLVE real problems, and COLLABORATE with designers, storytellers, and entrepreneurs to create professional, market-ready products."
      />

      <div className={localStyles.passionistasContext}>
        <h3>🔧 STEMgeneers Team - Where Passionistas Build the Future</h3>
        <p>
          You're a Passionista exploring the STEMgeneers team. We're engineers, makers, 
          and technical problem-solvers who understand that GREAT engineering isn't just 
          about functionality - it's about collaboration.
        </p>
        <p>
          <strong>Uncle Winston's wisdom:</strong> "The circuit works, but does it LOOK 
          good? Does it TELL a story? Can someone SELL it? That's where your teammates 
          come in."
        </p>
      </div>

      <div className={localStyles.whatMakesUsSpecial}>
        <h3>What Makes STEMgeneers Different</h3>
        <div className={localStyles.specialGrid}>
          <div className={localStyles.specialCard}>
            <span className={localStyles.specialIcon}>🎯</span>
            <h4>Real Projects, Not Exercises</h4>
            <p>
              Build speaker boxes for actual events. Solar chargers for community spaces. 
              Drones for competitions. IoT systems that monitor real environments.
            </p>
          </div>

          <div className={localStyles.specialCard}>
            <span className={localStyles.specialIcon}>👥</span>
            <h4>Engineering + Design + Business</h4>
            <p>
              Your functional build gets professional aesthetics from Silk Stilettos, 
              documentation from G-Tech Casters, and business strategy from TECHreneurs.
            </p>
          </div>

          <div className={localStyles.specialCard}>
            <span className={localStyles.specialIcon}>🏆</span>
            <h4>Solo → Team Progression</h4>
            <p>
              Start with solo builds guided by ROVs. Level up to collaborative projects. 
              Eventually lead complex team productions like the Drone Racing Championship.
            </p>
          </div>

          <div className={localStyles.specialCard}>
            <span className={localStyles.specialIcon}>💰</span>
            <h4>Build Skills + Earn Income</h4>
            <p>
              Sell component kits (£150-400), teach workshops (£60/session), offer 
              technical services, create tutorial content. Engineering = sustainable income.
            </p>
          </div>
        </div>
      </div>

      <div className={localStyles.uncleWinston}>
        <div className={localStyles.uncleWinstonAvatar}>👴🏾</div>
        <div className={localStyles.uncleWinstonQuote}>
          <p>
            "I've been building sound systems since before you were born. Let me teach you 
            why the tweeter goes on TOP, why signal flow matters, and why OG knowledge + 
            new generation energy = something WONDERFUL."
          </p>
          <p className={localStyles.quoteAttribution}>- Uncle Winston, STEMgeneers Elder</p>
        </div>
      </div>

      <div className={localStyles.complexityLevels}>
        <h3>Three Ways to Build</h3>
        <div className={localStyles.levelCards}>
          <div className={localStyles.levelCard}>
            <h4>🎙️ Solo + ROV</h4>
            <p><strong>Time:</strong> 6-12 hours</p>
            <p><strong>You build:</strong> Functional prototype</p>
            <p><strong>ROV guides:</strong> Technical decisions, safety, testing</p>
            <p><strong>Output:</strong> Working device for personal use</p>
            <p className={localStyles.levelValue}>Value: £80-150</p>
          </div>

          <div className={localStyles.levelCard}>
            <h4>🤝 Collaborative</h4>
            <p><strong>Time:</strong> 15-25 hours (your part: 10-15h)</p>
            <p><strong>You build:</strong> Technical core</p>
            <p><strong>Team adds:</strong> Professional aesthetics, documentation, business model</p>
            <p><strong>Output:</strong> Market-ready product</p>
            <p className={localStyles.levelValue}>Value: £200-400</p>
          </div>

          <div className={localStyles.levelCard}>
            <h4>🎬 Complex Team</h4>
            <p><strong>Time:</strong> 40-80 hours (distributed across team)</p>
            <p><strong>You lead:</strong> Technical department</p>
            <p><strong>Team includes:</strong> Engineers, designers, media, business, performance</p>
            <p><strong>Output:</strong> Major production (e.g., Drone Championship)</p>
            <p className={localStyles.levelValue}>Value: £800-2000+</p>
          </div>
        </div>
      </div>

      <NavigationButtons
        onNext={() => planner.setCurrentStep(1)}
        canProceed={true}
        nextLabel="Start Building →"
      />
    </div>
  );

  // ========================================
  // STEP 1: PROJECT TYPE
  // ========================================

  const renderProjectTypeStep = () => {
    const categories = [
      { 
        id: 'audio', 
        icon: '🔊', 
        name: 'Audio Engineering',
        description: 'Speaker boxes, amplifiers, signal processing',
        example: "Uncle Winston's signature speaker boxes",
        collaboration: 'High - benefits greatly from design + business',
      },
      { 
        id: 'electronics', 
        icon: '⚡', 
        name: 'Electronics & Circuits',
        description: 'PCB design, microcontrollers, sensor systems',
        example: 'Custom LED controllers, home automation',
        collaboration: 'Medium - can be solo but enhanced by team',
      },
      { 
        id: 'robotics', 
        icon: '🤖', 
        name: 'Robotics & Automation',
        description: 'Robotic arms, drones, autonomous systems',
        example: 'FPV racing drones for championship',
        collaboration: 'Very High - inherently complex, needs team',
      },
      { 
        id: 'iot', 
        icon: '📡', 
        name: 'IoT & Smart Systems',
        description: 'Connected devices, data logging, web dashboards',
        example: 'Community environmental monitoring network',
        collaboration: 'Medium - technical solo, benefits from visualization',
      },
      { 
        id: 'renewable', 
        icon: '☀️', 
        name: 'Renewable Energy',
        description: 'Solar systems, battery management, power optimization',
        example: 'Community phone charging station',
        collaboration: 'High - community-facing, needs design + business',
      },
      { 
        id: 'mechanical', 
        icon: '⚙️', 
        name: 'Mechanical Engineering',
        description: 'Mechanisms, structures, fabrication',
        example: 'Custom fixtures, mechanical linkages',
        collaboration: 'Medium - functional solo, enhanced with design',
      },
      { 
        id: 'fabrication', 
        icon: '🔨', 
        name: 'Digital Fabrication',
        description: '3D printing, CNC, laser cutting',
        example: 'Custom enclosures, prototype parts',
        collaboration: 'High - bridges engineering + design naturally',
      },
    ];

    const applyTemplate = (templateKey: string) => {
      const template = PROJECT_TEMPLATES[templateKey as keyof typeof PROJECT_TEMPLATES];
      if (!template) return;

      setSelectedTemplate(templateKey);
      setProjectData({
        ...projectData,
        projectName: template.name,
        category: template.category,
        whatItDoes: template.whatItDoes,
        problemSolved: template.problemSolved,
        principlesInvolved: template.principles,
        components: template.components,
        toolsNeeded: template.tools,
        estimatedBuildTime: template.buildTime,
        safetyConsiderations: template.safety,
      });
    };

    return (
      <div className={styles.stepContent}>
        <MayaConversation 
          message="What are you building? Choose your domain, or start from a proven template. Every category connects to collaboration opportunities - even the most technical builds benefit from design, documentation, and business strategy."
        />

        <div className={localStyles.templates}>
          <h3>🚀 Quick Start: Proven Templates</h3>
          <p className={localStyles.hint}>
            These are battle-tested builds with components, tools, and safety guidelines included.
          </p>
          <div className={localStyles.templateGrid}>
            {Object.entries(PROJECT_TEMPLATES).map(([key, template]) => (
              <button
                key={key}
                className={`${localStyles.templateCard} ${selectedTemplate === key ? localStyles.selected : ''}`}
                onClick={() => applyTemplate(key)}
              >
                <h4>{template.name}</h4>
                <p>{template.whatItDoes}</p>
                <div className={localStyles.templateMeta}>
                  <span>⏱️ {template.buildTime}h</span>
                  <span>💰 £{template.components.reduce((sum, c) => sum + c.cost, 0)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={localStyles.divider}>
          <span>OR</span>
        </div>

        <div className={localStyles.categorySelection}>
          <h3>🎯 Choose Your Category (Custom Build)</h3>
          <div className={localStyles.categoryGrid}>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`${localStyles.categoryCard} ${projectData.category === cat.id ? localStyles.selected : ''}`}
                onClick={() => setProjectData({...projectData, category: cat.id as ProjectCategory})}
              >
                <span className={localStyles.categoryIcon}>{cat.icon}</span>
                <h4>{cat.name}</h4>
                <p>{cat.description}</p>
                <p className={localStyles.categoryExample}>
                  <strong>Example:</strong> {cat.example}
                </p>
                <p className={localStyles.collaboration}>
                  <strong>Collaboration:</strong> {cat.collaboration}
                </p>
              </button>
            ))}
          </div>
        </div>

        {projectData.category && !selectedTemplate && (
          <div className={localStyles.customProject}>
            <h4>Tell us about your custom build:</h4>
            
            <div className={localStyles.formSection}>
              <label><strong>Project Name</strong></label>
              <input
                type="text"
                value={projectData.projectName}
                onChange={(e) => setProjectData({...projectData, projectName: e.target.value})}
                placeholder="e.g., 'Custom Bluetooth Speaker with LED Visualizer'"
              />
            </div>

            <div className={localStyles.formSection}>
              <label><strong>What does it do?</strong></label>
              <textarea
                value={projectData.whatItDoes}
                onChange={(e) => setProjectData({...projectData, whatItDoes: e.target.value})}
                placeholder="Describe the functionality and key features"
                rows={3}
              />
            </div>

            <div className={localStyles.formSection}>
              <label><strong>What problem does it solve?</strong></label>
              <textarea
                value={projectData.problemSolved}
                onChange={(e) => setProjectData({...projectData, problemSolved: e.target.value})}
                placeholder="Why build this? Who benefits?"
                rows={2}
              />
            </div>
          </div>
        )}

        <NavigationButtons
          onBack={() => planner.setCurrentStep(0)}
          onNext={() => planner.setCurrentStep(2)}
          canProceed={
            projectData.category !== null &&
            projectData.projectName.length > 5 &&
            (selectedTemplate !== null || 
             (projectData.whatItDoes.length > 20 && projectData.problemSolved.length > 20))
          }
          nextLabel="Next: Technical Specs →"
        />
      </div>
    );
  };

  // ========================================
  // STEP 2: TECHNICAL SPECIFICATIONS
  // ========================================

  const renderTechnicalSpecStep = () => {
    const complexityLevels = [
      { 
        level: 'beginner', 
        label: 'Beginner',
        description: 'Basic assembly, pre-made modules, minimal soldering',
        buildTime: '6-12 hours',
        example: 'Arduino kit project, simple LED circuit',
      },
      { 
        level: 'intermediate', 
        label: 'Intermediate',
        description: 'Custom circuits, programming required, fabrication',
        buildTime: '15-30 hours',
        example: 'Custom speaker box, IoT sensor network',
      },
      { 
        level: 'advanced', 
        label: 'Advanced',
        description: 'Complex systems, multiple disciplines, custom PCBs',
        buildTime: '40+ hours',
        example: 'Racing drone, robotic arm, renewable energy system',
      },
    ];

    return (
      <div className={styles.stepContent}>
        <MayaConversation 
          message="Now let's get technical. What's the complexity level? What principles are involved? Uncle Winston always says: 'Know your specs before you build, test your assumptions, and never skip the math.'"
        />

        {!selectedTemplate && (
          <div className={localStyles.complexitySelection}>
            <h3>🎯 Complexity Level</h3>
            <div className={localStyles.complexityGrid}>
              {complexityLevels.map(c => (
                <button
                  key={c.level}
                  className={`${localStyles.complexityCard} ${projectData.complexityLevel === c.level ? localStyles.selected : ''}`}
                  onClick={() => setProjectData({
                    ...projectData, 
                    complexityLevel: c.level as ComplexityLevel,
                    estimatedBuildTime: c.level === 'beginner' ? 8 : c.level === 'intermediate' ? 20 : 50,
                  })}
                >
                  <h4>{c.label}</h4>
                  <p>{c.description}</p>
                  <p className={localStyles.buildTime}>⏱️ {c.buildTime}</p>
                  <p className={localStyles.complexityExample}>
                    <em>Example: {c.example}</em>
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={localStyles.technicalDetails}>
          <h3>📐 Engineering Principles & Requirements</h3>
          
          {selectedTemplate ? (
            <div className={localStyles.templatePrinciples}>
              <h4>Core Principles Involved:</h4>
              <ul>
                {projectData.principlesInvolved.map((principle, idx) => (
                  <li key={idx}>{principle}</li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              <div className={localStyles.formSection}>
                <label>
                  <strong>What engineering principles are involved?</strong>
                  <p className={localStyles.hint}>
                    e.g., Ohm's Law, signal processing, mechanical advantage, thermodynamics, etc.
                  </p>
                </label>
                <textarea
                  value={projectData.principlesInvolved.join(', ')}
                  onChange={(e) => setProjectData({
                    ...projectData,
                    principlesInvolved: e.target.value.split(',').map(p => p.trim()).filter(Boolean)
                  })}
                  placeholder="List the key principles (comma-separated)"
                  rows={2}
                />
              </div>

              <div className={localStyles.formSection}>
                <label>
                  <strong>What calculations or design work is needed?</strong>
                  <p className={localStyles.hint}>
                    e.g., Load calculations, voltage drops, frequency response, power requirements
                  </p>
                </label>
                <textarea
                  value={projectData.calculationsNeeded.join(', ')}
                  onChange={(e) => setProjectData({
                    ...projectData,
                    calculationsNeeded: e.target.value.split(',').map(c => c.trim()).filter(Boolean)
                  })}
                  placeholder="List required calculations (comma-separated)"
                  rows={2}
                />
              </div>
            </>
          )}

          <div className={localStyles.formSection}>
            <label>
              <strong>Expected Performance / Success Criteria</strong>
              <p className={localStyles.hint}>
                How will you know this works? What are the measurable outcomes?
              </p>
            </label>
            <textarea
              value={projectData.expectedPerformance}
              onChange={(e) => setProjectData({...projectData, expectedPerformance: e.target.value})}
              placeholder="e.g., 'Speakers should produce clear audio at 85dB from 2 meters', 'Solar charger should charge phone 0-80% in 3 hours'"
              rows={3}
            />
          </div>

          <div className={localStyles.formSection}>
            <label>
              <strong>Testing Criteria</strong>
              <p className={localStyles.hint}>
                How will you test and validate your build?
              </p>
            </label>
            <textarea
              value={projectData.testingCriteria}
              onChange={(e) => setProjectData({...projectData, testingCriteria: e.target.value})}
              placeholder="e.g., 'Frequency response test with sweep generator', 'Voltage output test under load', 'Thermal imaging under full power'"
              rows={3}
            />
          </div>
        </div>

        <NavigationButtons
          onBack={() => planner.setCurrentStep(1)}
          onNext={() => planner.setCurrentStep(3)}
          canProceed={
            (projectData.complexityLevel !== null || selectedTemplate !== null) &&
            projectData.expectedPerformance.length > 20 &&
            projectData.testingCriteria.length > 20
          }
          nextLabel="Next: Components & Tools →"
        />
      </div>
    );
  };

  // ========================================
  // STEP 3: COMPONENTS & TOOLS
  // ========================================

  const renderComponentsStep = () => {
    const addComponent = () => {
      setProjectData({
        ...projectData,
        components: [
          ...projectData.components,
          { name: '', type: '', specifications: '', cost: 0 }
        ]
      });
    };

    const updateComponent = (index: number, field: keyof TechnicalComponent, value: string | number) => {
      const updated = [...projectData.components];
      updated[index] = { ...updated[index], [field]: value };
      setProjectData({ ...projectData, components: updated });
    };

    const removeComponent = (index: number) => {
      setProjectData({
        ...projectData,
        components: projectData.components.filter((_, i) => i !== index)
      });
    };

    const totalCost = projectData.components.reduce((sum, c) => sum + c.cost, 0);

    return (
      <div className={styles.stepContent}>
        <MayaConversation 
          message="Uncle Winston's golden rule: 'Know your parts before you buy.' List every component, specify exactly what you need, and budget realistically. Good engineering starts with a proper bill of materials."
        />

        {selectedTemplate ? (
          <div className={localStyles.templateComponents}>
            <h3>📦 Bill of Materials (Pre-Configured)</h3>
            <table className={localStyles.componentsTable}>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Type</th>
                  <th>Specifications</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {projectData.components.map((comp, idx) => (
                  <tr key={idx}>
                    <td>{comp.name}</td>
                    <td>{comp.type}</td>
                    <td>{comp.specifications}</td>
                    <td>£{comp.cost}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}><strong>Total Materials Cost:</strong></td>
                  <td><strong>£{totalCost}</strong></td>
                </tr>
              </tfoot>
            </table>

            <h3 style={{ marginTop: '2rem' }}>🔧 Required Tools</h3>
            <ul className={localStyles.toolsList}>
              {projectData.toolsNeeded.map((tool, idx) => (
                <li key={idx}>
                  <span className={localStyles.toolCheck}>✓</span> {tool}
                </li>
              ))}
            </ul>
            <p className={localStyles.toolNote}>
              💡 All tools available at STEMgeneers workshop for members
            </p>
          </div>
        ) : (
          <>
            <div className={localStyles.componentsBuilder}>
              <h3>📦 Build Your Bill of Materials</h3>
              
              {projectData.components.map((comp, idx) => (
                <div key={idx} className={localStyles.componentCard}>
                  <div className={localStyles.componentHeader}>
                    <strong>Component {idx + 1}</strong>
                    <button
                      className={localStyles.removeButton}
                      onClick={() => removeComponent(idx)}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className={localStyles.componentGrid}>
                    <input
                      type="text"
                      placeholder="Component name"
                      value={comp.name}
                      onChange={(e) => updateComponent(idx, 'name', e.target.value)}
                    />
                    
                    <input
                      type="text"
                      placeholder="Type (e.g., 'Speaker', 'Resistor')"
                      value={comp.type}
                      onChange={(e) => updateComponent(idx, 'type', e.target.value)}
                    />
                  </div>
                  
                  <textarea
                    placeholder="Specifications (be precise: voltage, current, tolerance, etc.)"
                    value={comp.specifications}
                    onChange={(e) => updateComponent(idx, 'specifications', e.target.value)}
                    rows={2}
                  />
                  
                  <div className={localStyles.costInput}>
                    <label>Cost:</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={comp.cost || ''}
                      onChange={(e) => updateComponent(idx, 'cost', parseFloat(e.target.value) || 0)}
                    />
                    <span>GBP</span>
                  </div>
                </div>
              ))}

              <button className={localStyles.addComponentButton} onClick={addComponent}>
                + Add Component
              </button>

              <div className={localStyles.totalCost}>
                <strong>Total Materials Cost: £{totalCost.toFixed(2)}</strong>
              </div>
            </div>

            <div className={localStyles.toolsSection}>
              <h3>🔧 Tools Required</h3>
              <textarea
                value={projectData.toolsNeeded.join(', ')}
                onChange={(e) => setProjectData({
                  ...projectData,
                  toolsNeeded: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                })}
                placeholder="List all tools needed (comma-separated): Soldering iron, Multimeter, Drill, etc."
                rows={3}
              />
              <p className={localStyles.toolNote}>
                💡 STEMgeneers members have workshop access to most common tools
              </p>
            </div>
          </>
        )}

        <NavigationButtons
          onBack={() => planner.setCurrentStep(2)}
          onNext={() => planner.setCurrentStep(4)}
          canProceed={
            projectData.components.length >= 2 &&
            projectData.components.every(c => c.name && c.specifications && c.cost > 0) &&
            projectData.toolsNeeded.length > 0
          }
          nextLabel="Next: Collaboration Options →"
        />
      </div>
    );
  };

  // ========================================
  // STEP 4: COLLABORATION DISCOVERY
  // ========================================

  const renderCollaborationStep = () => {
    const collaborationOptions = [
      {
        programme: 'Silk Stilettos',
        role: 'Aesthetic Designer',
        value: 'Transform functional build into professional product',
        impact: '+£40-80 market value',
        example: 'Custom enclosure design, visual branding, user experience refinement',
        questions: ['Does this need to look professional?', 'Will users see/interact with it?', 'Could design increase value?'],
      },
      {
        programme: 'G-Tech Casters',
        role: 'Build Documentarian',
        value: 'Create tutorial content that generates ongoing income',
        impact: '+£25-50 per tutorial sale',
        example: 'Step-by-step build video, troubleshooting guide, kit assembly instructions',
        questions: ['Is this replicable?', 'Would others want to build this?', 'Could teaching add income?'],
      },
      {
        programme: 'TECHreneurs',
        role: 'Business Strategist',
        value: 'Turn one-off build into sustainable income stream',
        impact: '+£100-300 monthly revenue potential',
        example: 'Kit sales strategy, pricing model, customer acquisition, sponsorships',
        questions: ['Could this be sold?', 'Is there a market?', 'Could it generate recurring income?'],
      },
      {
        programme: 'Pageturners',
        role: 'Technical Writer',
        value: 'Professional documentation and SEO content',
        impact: '+£20-40 in content value',
        example: 'Assembly guide, technical blog post, Joystick feature article',
        questions: ['Does it need documentation?', 'Could a blog post attract customers?', 'Is there a story here?'],
      },
      {
        programme: 'Trubble n Bass',
        role: 'Sound Designer',
        value: 'Audio branding for technical demos',
        impact: '+£30-60 if demo/video needed',
        example: 'Demonstration sound design, promotional audio, presentation music',
        questions: ['Will this be demonstrated?', 'Does presentation matter?', 'Could audio enhance demo?'],
      },
    ];

    const toggleNeed = (field: 'aestheticNeeds' | 'documentationNeeds' | 'businessPotential', value: boolean) => {
      setProjectData({ ...projectData, [field]: value });
    };

    const determineScale = (): CollaborationScale => {
      const needsCount = [
        projectData.aestheticNeeds,
        projectData.documentationNeeds,
        projectData.businessPotential,
      ].filter(Boolean).length;

      if (needsCount === 0) return 'solo';
      if (needsCount <= 2) return 'collaborative';
      return 'team';
    };

    // calculate total materials cost locally so the JSX can reference it
    const totalCost = projectData.components.reduce((sum, c) => sum + (c.cost || 0), 0);

    return (
      <div className={styles.stepContent}>
        <MayaConversation 
          message="Here's where STEMgeneers becomes WONDERFUL: Your technical build is solid, but collaboration makes it PROFESSIONAL. Let's see which Passionistas could elevate this from 'functional' to 'market-ready.'"
        />

        <div className={localStyles.collaborationDiscovery}>
          <h3>🤝 Collaboration Opportunities</h3>
          <p className={localStyles.hint}>
            Answer honestly - what would make this build more valuable?
          </p>

          {collaborationOptions.map((option, idx) => (
            <div key={idx} className={localStyles.collaborationCard}>
              <div className={localStyles.collaborationHeader}>
                <h4>{option.programme}</h4>
                <span className={localStyles.role}>{option.role}</span>
              </div>
              
              <p className={localStyles.collaborationValue}>
                <strong>Value:</strong> {option.value}
              </p>
              <p className={localStyles.collaborationImpact}>
                <strong>Impact:</strong> {option.impact}
              </p>
              <p className={localStyles.collaborationExample}>
                <em>Example: {option.example}</em>
              </p>

              <div className={localStyles.collaborationQuestions}>
                {option.questions.map((q, qidx) => (
                  <div key={qidx} className={localStyles.question}>
                    🤔 {q}
                  </div>
                ))}
              </div>

              {option.programme === 'Silk Stilettos' && (
                <div className={localStyles.collaborationToggle}>
                  <button
                    className={projectData.aestheticNeeds ? localStyles.toggleActive : ''}
                    onClick={() => toggleNeed('aestheticNeeds', !projectData.aestheticNeeds)}
                  >
                    {projectData.aestheticNeeds ? '✓ Yes, need design help' : 'No design needed'}
                  </button>
                </div>
              )}

              {option.programme === 'G-Tech Casters' && (
                <div className={localStyles.collaborationToggle}>
                  <button
                    className={projectData.documentationNeeds ? localStyles.toggleActive : ''}
                    onClick={() => toggleNeed('documentationNeeds', !projectData.documentationNeeds)}
                  >
                    {projectData.documentationNeeds ? '✓ Yes, want to document' : 'No documentation needed'}
                  </button>
                </div>
              )}

              {option.programme === 'TECHreneurs' && (
                <div className={localStyles.collaborationToggle}>
                  <button
                    className={projectData.businessPotential ? localStyles.toggleActive : ''}
                    onClick={() => toggleNeed('businessPotential', !projectData.businessPotential)}
                  >
                    {projectData.businessPotential ? '✓ Yes, want to monetize' : 'Personal use only'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={localStyles.scaleResult}>
          <h3>📊 Your Project Scale</h3>
          {determineScale() === 'solo' && (
            <div className={localStyles.scaleCard}>
              <h4>🎙️ Solo Build</h4>
              <p>You + ROV guidance = functional personal build</p>
              <p><strong>Value:</strong> £{totalCost + 80} (materials + labor)</p>
              <p><strong>Your learning:</strong> Maximum</p>
              <p><strong>Market potential:</strong> Personal use / portfolio piece</p>
            </div>
          )}
          {determineScale() === 'collaborative' && (
            <div className={localStyles.scaleCard}>
              <h4>🤝 Collaborative Build</h4>
              <p>You + 1-2 specialists = professional product</p>
              <p><strong>Value:</strong> £{(totalCost + 80) * 1.8} (enhanced market value)</p>
              <p><strong>Revenue split:</strong> 40% you, 30% collaborators, 30% overhead/community</p>
              <p><strong>Market potential:</strong> Saleable, marketable, portfolio-worthy</p>
            </div>
          )}
          {determineScale() === 'team' && (
            <div className={localStyles.scaleCard}>
              <h4>🎬 Team Production</h4>
              <p>Full team = premium product + ongoing income</p>
              <p><strong>Value:</strong> £{(totalCost + 80) * 3} (kit sales + teaching + services)</p>
              <p><strong>Revenue split:</strong> 25% you, 45% team, 30% overhead/community</p>
              <p><strong>Market potential:</strong> Kit sales, workshops, tutorial content, professional services</p>
            </div>
          )}
        </div>

        <NavigationButtons
          onBack={() => planner.setCurrentStep(3)}
          onNext={() => {
            setProjectData({...projectData, collaborationScale: determineScale()});
            planner.setCurrentStep(5);
          }}
          canProceed={true}
          nextLabel="Next: Business Model →"
        />
      </div>
    );
  };

  // ========================================
  // STEP 5: BUSINESS MODEL
  // ========================================

  const renderBusinessModelStep = () => {
    const revenueStreams = [
      {
        id: 'kit-sales',
        name: 'Component Kit Sales',
        description: 'Sell pre-packaged component kits with instructions',
        potential: '£150-400 per kit sold',
        requirements: 'Bill of materials, assembly guide, testing procedures',
        enabled: projectData.businessPotential,
      },
      {
        id: 'workshops',
        name: 'Teaching Workshops',
        description: 'Host build workshops for community/schools',
        potential: '£60-120 per session',
        requirements: 'Teaching materials, hands-on demo, safety protocols',
        enabled: projectData.documentationNeeds,
      },
      {
        id: 'tutorials',
        name: 'Tutorial Content Sales',
        description: 'Sell video tutorials and build guides',
        potential: '£15-40 per tutorial sale (ongoing passive income)',
        requirements: 'Professional documentation, clear video, troubleshooting guide',
        enabled: projectData.documentationNeeds,
      },
      {
        id: 'services',
        name: 'Technical Services',
        description: 'Offer custom builds or repairs as a service',
        potential: '£200-800 per project',
        requirements: 'Portfolio, testimonials, business setup',
        enabled: projectData.businessPotential,
      },
      {
        id: 'consulting',
        name: 'Technical Consulting',
        description: 'Advise others on similar builds',
        potential: '£40-80 per hour',
        requirements: 'Proven expertise, professional presentation',
        enabled: projectData.businessPotential,
      },
    ];

    const enabledStreams = revenueStreams.filter(s => s.enabled);
    const totalPotential = enabledStreams.reduce((sum, s) => {
      const avg = parseInt(s.potential.match(/£(\d+)/)?.[1] || '0');
      return sum + avg;
    }, 0);

    return (
      <div className={styles.stepContent}>
        <MayaConversation 
          message="Engineers often undersell themselves. Your technical skills have ECONOMIC VALUE. Let's identify revenue streams - not just 'selling the thing' but workshops, tutorials, services, consulting. Multiple streams = sustainable income."
        />

        {projectData.collaborationScale === 'solo' && (
          <div className={localStyles.soloWarning}>
            <h4>💡 Solo Build = Limited Revenue</h4>
            <p>
              Your solo build is perfect for learning, but monetization is limited without 
              collaboration. Consider requesting design help (makes it saleable) or documentation 
              support (enables teaching income).
            </p>
          </div>
        )}

        <div className={localStyles.revenueStreams}>
          <h3>💰 Your Revenue Streams</h3>
          
          {enabledStreams.length > 0 ? (
            <>
              <div className={localStyles.streamsGrid}>
                {enabledStreams.map(stream => (
                  <div key={stream.id} className={localStyles.streamCard}>
                    <h4>✓ {stream.name}</h4>
                    <p>{stream.description}</p>
                    <p className={localStyles.streamPotential}>
                      <strong>Potential:</strong> {stream.potential}
                    </p>
                    <p className={localStyles.streamRequirements}>
                      <strong>Requirements:</strong> {stream.requirements}
                    </p>
                  </div>
                ))}
              </div>

              <div className={localStyles.revenueSummary}>
                <h4>📊 Revenue Projection</h4>
                <p>Based on your collaboration choices, estimated revenue potential:</p>
                <div className={localStyles.projectionCard}>
                  <p><strong>Conservative (first 3 months):</strong> £{Math.round(totalPotential * 0.3)}</p>
                  <p><strong>Moderate (months 4-12):</strong> £{Math.round(totalPotential * 0.7)}/month</p>
                  <p><strong>Established (year 2+):</strong> £{totalPotential}/month</p>
                </div>

                <div className={localStyles.revenueSplit}>
                  <h4>Revenue Split (Wembley Wonders Model)</h4>
                  <p>You: {projectData.collaborationScale === 'solo' ? '85%' : projectData.collaborationScale === 'collaborative' ? '40%' : '25%'}</p>
                  <p>Collaborators: {projectData.collaborationScale === 'solo' ? '0%' : projectData.collaborationScale === 'collaborative' ? '30%' : '45%'}</p>
                  <p>Overhead/Equipment: {projectData.collaborationScale === 'solo' ? '15%' : '20%'}</p>
                  <p>Community Fund: {projectData.collaborationScale === 'solo' ? '0%' : '10%'}</p>
                </div>
              </div>
            </>
          ) : (
            <div className={localStyles.noRevenue}>
              <p>
                No monetization options selected. This build is for personal use / learning.
                That's perfectly valid! But if you want to generate income, go back and select:
              </p>
              <ul>
                <li>Aesthetic needs (enables kit sales)</li>
                <li>Documentation needs (enables workshops + tutorials)</li>
                <li>Business potential (enables services + consulting)</li>
              </ul>
            </div>
          )}
        </div>

        <NavigationButtons
          onBack={() => planner.setCurrentStep(4)}
          onNext={() => planner.setCurrentStep(6)}
          canProceed={true}
          nextLabel="Next: Safety & Testing →"
        />
      </div>
    );
  };

  // ========================================
  // STEP 6: SAFETY & TESTING
  // ========================================

  const renderSafetyStep = () => {
    const addSafety = () => {
      setProjectData({
        ...projectData,
        safetyConsiderations: [
          ...projectData.safetyConsiderations,
          { hazard: '', mitigation: '', priority: 'medium' }
        ]
      });
    };

    const updateSafety = (index: number, field: keyof SafetyConsideration, value: string) => {
      const updated = [...projectData.safetyConsiderations];
      updated[index] = { ...updated[index], [field]: value };
      setProjectData({ ...projectData, safetyConsiderations: updated });
    };

    const removeSafety = (index: number) => {
      setProjectData({
        ...projectData,
        safetyConsiderations: projectData.safetyConsiderations.filter((_, i) => i !== index)
      });
    };

    return (
      <div className={styles.stepContent}>
        <MayaConversation 
          message="Uncle Winston's NON-NEGOTIABLE rule: Safety first, ALWAYS. Identify every hazard, plan your mitigation, and never skip PPE. A working build that hurts someone isn't a successful build."
        />

        <div className={localStyles.uncleWinstonSafety}>
          <div className={localStyles.uncleWinstonAvatar}>👴🏾</div>
          <div className={localStyles.safetyQuote}>
            <p>
              "I've been doing this 40 years. Know what makes me a good engineer? I still 
              have all my fingers. Safety glasses ALWAYS. Fuse your power supplies. Test before 
              you touch. And if something feels wrong, STOP and think it through."
            </p>
          </div>
        </div>

        {selectedTemplate && projectData.safetyConsiderations.length > 0 ? (
          <div className={localStyles.templateSafety}>
            <h3>⚠️ Safety Considerations (Pre-Configured)</h3>
            <div className={localStyles.safetyList}>
              {projectData.safetyConsiderations.map((safety, idx) => (
                <div 
                  key={idx} 
                  className={`${localStyles.safetyItem} ${localStyles[safety.priority]}`}
                >
                  <div className={localStyles.safetyPriority}>
                    {safety.priority === 'high' && '🔴 HIGH PRIORITY'}
                    {safety.priority === 'medium' && '🟡 MEDIUM'}
                    {safety.priority === 'low' && '🟢 LOW'}
                  </div>
                  <p><strong>Hazard:</strong> {safety.hazard}</p>
                  <p><strong>Mitigation:</strong> {safety.mitigation}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={localStyles.safetyBuilder}>
            <h3>⚠️ Identify Safety Hazards</h3>
            
            {projectData.safetyConsiderations.map((safety, idx) => (
              <div key={idx} className={localStyles.safetyCard}>
                <div className={localStyles.safetyHeader}>
                  <strong>Hazard {idx + 1}</strong>
                  <button
                    className={localStyles.removeButton}
                    onClick={() => removeSafety(idx)}
                  >
                    ✕
                  </button>
                </div>

                <div className={localStyles.formSection}>
                  <label>Priority Level:</label>
                  <select
                    value={safety.priority}
                    onChange={(e) => updateSafety(idx, 'priority', e.target.value)}
                  >
                    <option value="high">🔴 High - Could cause injury</option>
                    <option value="medium">🟡 Medium - Could cause damage</option>
                    <option value="low">🟢 Low - Minor concern</option>
                  </select>
                </div>

                <div className={localStyles.formSection}>
                  <label>What's the hazard?</label>
                  <input
                    type="text"
                    value={safety.hazard}
                    onChange={(e) => updateSafety(idx, 'hazard', e.target.value)}
                    placeholder="e.g., 'Spinning drill bit', 'High voltage', 'Sharp edges'"
                  />
                </div>

                <div className={localStyles.formSection}>
                  <label>How will you mitigate it?</label>
                  <textarea
                    value={safety.mitigation}
                    onChange={(e) => updateSafety(idx, 'mitigation', e.target.value)}
                    placeholder="e.g., 'Safety glasses, secure workpiece, proper drill speed'"
                    rows={2}
                  />
                </div>
              </div>
            ))}

            <button className={localStyles.addSafetyButton} onClick={addSafety}>
              + Add Safety Consideration
            </button>
          </div>
        )}

        <div className={localStyles.ppeReminder}>
          <h4>🦺 Standard PPE Required</h4>
          <div className={localStyles.ppeGrid}>
            <div className={localStyles.ppeItem}>👓 Safety Glasses</div>
            <div className={localStyles.ppeItem}>🧤 Work Gloves (when appropriate)</div>
            <div className={localStyles.ppeItem}>👂 Ear Protection (power tools)</div>
            <div className={localStyles.ppeItem}>😷 Dust Mask (woodwork/soldering)</div>
          </div>
          <p className={localStyles.ppeNote}>
            💡 All PPE available at STEMgeneers workshop
          </p>
        </div>

        <NavigationButtons
          onBack={() => planner.setCurrentStep(5)}
          onNext={() => {
            generateBuildPlan();
            planner.setCurrentStep(7);
          }}
          canProceed={projectData.safetyConsiderations.length >= 1}
          nextLabel="Generate Build Plan →"
        />
      </div>
    );
  };

  // ========================================
  // STEP 7: BUILD PLAN
  // ========================================

  const renderBuildPlanStep = () => {
    const totalCost = projectData.components.reduce((sum, c) => sum + c.cost, 0);

    return (
      <div className={styles.stepContent}>
        <MayaConversation 
          message="Your complete technical build plan is ready. This isn't theory - you have specs, components, safety protocols, and collaboration pathways mapped. Time to build something WONDERFUL."
        />

        <div className={localStyles.generatedPlan}>
          <pre>{generatedPlan}</pre>
        </div>

        <div className={localStyles.nextStepsSection}>
          <h3>🚀 Your Next Steps</h3>
          <ol>
            <li>
              <strong>Join Passionistas / STEMgeneers</strong>
              <p>Get workshop access, tools, and Uncle Winston's mentorship</p>
            </li>
            <li>
              <strong>Source Components</strong>
              <p>Order parts (£{totalCost} materials budget)</p>
            </li>
            {projectData.collaborationScale !== 'solo' && (
              <li>
                <strong>Request Maya Coordination</strong>
                <p>Assemble your collaboration team (designers, documentarians, business strategists)</p>
              </li>
            )}
            <li>
              <strong>Book Workshop Time</strong>
              <p>Reserve {projectData.estimatedBuildTime} hours of workshop access</p>
            </li>
            <li>
              <strong>Build & Test</strong>
              <p>Follow safety protocols, document as you go, test thoroughly</p>
            </li>
            <li>
              <strong>Publish & Monetize</strong>
              <p>Submit to Joystick, list on CyberStore, offer workshops</p>
            </li>
          </ol>
        </div>

        <div className={localStyles.planActions}>
          <button
            className={localStyles.downloadButton}
            onClick={() => planner.handleDownload(generatedPlan, `stemgeneers-build-${Date.now()}.txt`)}
          >
            📥 Download Build Plan
          </button>
          
          <button
            className={localStyles.resetButton}
            onClick={() => {
              planner.resetPlanner();
              setProjectData({
                projectName: '',
                category: null,
                whatItDoes: '',
                problemSolved: '',
                complexityLevel: null,
                technicalRequirements: '',
                components: [],
                toolsNeeded: [],
                estimatedBuildTime: 0,
                principlesInvolved: [],
                calculationsNeeded: [],
                safetyConsiderations: [],
                collaborationScale: null,
                aestheticNeeds: false,
                documentationNeeds: false,
                businessPotential: false,
                expectedPerformance: '',
                testingCriteria: '',
                successMetrics: [],
              });
              setGeneratedPlan('');
              setSelectedTemplate(null);
            }}
          >
            🔄 Plan Another Build
          </button>
        </div>

        {planner.downloadsRemaining > 0 && (
          <div className={localStyles.remainingPlans}>
            💡 You have <strong>{planner.downloadsRemaining} free plans</strong> remaining
          </div>
        )}
      </div>
    );
  };

  // ========================================
  // PLAN GENERATION
  // ========================================

  const generateBuildPlan = () => {
    const totalCost = projectData.components.reduce((sum, c) => sum + c.cost, 0);
    
    const plan = `
╔════════════════════════════════════════════════════════════════════╗
║        WEMBLEY WONDERS STEMGENEERS TECHNICAL BUILD PLAN            ║
║                  Engineering Excellence Through Collaboration      ║
╚════════════════════════════════════════════════════════════════════╝

Generated: ${new Date().toLocaleDateString('en-GB')}
Build Complexity: ${projectData.complexityLevel?.toUpperCase() || 'CUSTOM'}
Collaboration Scale: ${projectData.collaborationScale?.toUpperCase() || 'TBD'}

───────────────────────────────────────────────────────────────────────
📋 PROJECT OVERVIEW
───────────────────────────────────────────────────────────────────────

Project Name: ${projectData.projectName}
Category: ${projectData.category?.toUpperCase().replace('-', ' ')}

What It Does:
${projectData.whatItDoes}

Problem Solved:
${projectData.problemSolved}

Expected Performance:
${projectData.expectedPerformance}

───────────────────────────────────────────────────────────────────────
🔬 ENGINEERING PRINCIPLES
───────────────────────────────────────────────────────────────────────

Core Principles Involved:
${projectData.principlesInvolved.map(p => `  • ${p}`).join('\n')}

${projectData.calculationsNeeded.length > 0 ? `
Required Calculations:
${projectData.calculationsNeeded.map(c => `  • ${c}`).join('\n')}
` : ''}

Testing Criteria:
${projectData.testingCriteria}

───────────────────────────────────────────────────────────────────────
📦 BILL OF MATERIALS
───────────────────────────────────────────────────────────────────────

${projectData.components.map((comp, idx) => `
${idx + 1}. ${comp.name}
   Type: ${comp.type}
   Specifications: ${comp.specifications}
   ${comp.supplier ? `Supplier: ${comp.supplier}` : ''}
   Cost: £${comp.cost.toFixed(2)}
`).join('\n')}

TOTAL MATERIALS COST: £${totalCost.toFixed(2)}

───────────────────────────────────────────────────────────────────────
🔧 TOOLS REQUIRED
───────────────────────────────────────────────────────────────────────

${projectData.toolsNeeded.map(tool => `  ✓ ${tool}`).join('\n')}

💡 All tools available at STEMgeneers workshop for members

───────────────────────────────────────────────────────────────────────
⚠️  SAFETY CONSIDERATIONS
───────────────────────────────────────────────────────────────────────

${projectData.safetyConsiderations.map((safety, idx) => `
${idx + 1}. ${safety.priority === 'high' ? '🔴 HIGH PRIORITY' : safety.priority === 'medium' ? '🟡 MEDIUM' : '🟢 LOW'}
   Hazard: ${safety.hazard}
   Mitigation: ${safety.mitigation}
`).join('\n')}

REQUIRED PPE:
  👓 Safety Glasses (ALWAYS)
  🧤 Work Gloves (when handling sharp/hot materials)
  👂 Ear Protection (power tools)
  😷 Dust Mask (woodwork/soldering)

Uncle Winston's Rule: "If it feels unsafe, STOP. Ask for help. No build 
is worth an injury."

───────────────────────────────────────────────────────────────────────
📅 BUILD TIMELINE
───────────────────────────────────────────────────────────────────────

Estimated Build Time: ${projectData.estimatedBuildTime} hours

Recommended Schedule:
${projectData.estimatedBuildTime <= 12 ? `
Week 1: Planning & Component Procurement
  □ Review technical specifications
  □ Order all components
  □ Book workshop time
  □ Review safety protocols

Week 2: Build & Test
  □ Complete build (${projectData.estimatedBuildTime}h workshop time)
  □ Initial functionality testing
  □ Debug and refine
  □ Final testing against success criteria
` : `
Week 1: Planning & Procurement
  □ Review technical specifications
  □ Order all components
  □ Book workshop time (${Math.ceil(projectData.estimatedBuildTime / 4)} sessions)

Week 2-3: Primary Build Phase
  □ Complete main assembly
  □ Component integration
  □ Initial testing
  □ Troubleshooting

Week 4: Testing & Refinement
  □ Performance testing
  □ Debug and optimize
  □ Final validation
  □ Documentation
`}

───────────────────────────────────────────────────────────────────────
🤝 COLLABORATION OPPORTUNITIES
───────────────────────────────────────────────────────────────────────

Your Build Scale: ${projectData.collaborationScale?.toUpperCase()}

${projectData.collaborationScale === 'solo' ? `
SOLO BUILD
You're building this independently with ROV guidance.

What This Means:
- Complete technical control
- Maximum learning experience
- Personal use / portfolio piece
- Limited monetization potential

Value: £${totalCost + 80} (materials + your technical labor)
` : ''}

${projectData.collaborationScale === 'collaborative' ? `
COLLABORATIVE BUILD
Your technical core + specialist enhancement = professional product

Recommended Collaborators:
${projectData.aestheticNeeds ? '  • Silk Stilettos (Aesthetic Designer): Professional enclosure/visual design' : ''}
${projectData.documentationNeeds ? '  • G-Tech Casters (Build Documentarian): Tutorial content creation' : ''}
${projectData.businessPotential ? '  • TECHreneurs (Business Strategist): Pricing, sales, revenue strategy' : ''}

What This Means:
- Professional-grade output
- Marketable product
- Multiple revenue streams
- Shared knowledge/skills

Estimated Value: £${Math.round((totalCost + 80) * 1.8)}
Revenue Split: 40% you, 30% collaborators, 20% overhead, 10% community
Your Earnings: £${Math.round((totalCost + 80) * 1.8 * 0.4)} per unit/project
` : ''}

${projectData.collaborationScale === 'team' ? `
TEAM PRODUCTION
Full team = premium product + sustainable income ecosystem

Recommended Team:
  • You: Chief Engineer (technical lead)
${projectData.aestheticNeeds ? '  • Silk Stilettos: Design Director' : ''}
${projectData.documentationNeeds ? '  • G-Tech Casters: Media Producer' : ''}
${projectData.businessPotential ? '  • TECHreneurs: Business Coordinator' : ''}
  • Pageturners: Technical Writer
  • Maya: Project Coordinator

What This Means:
- Complex, high-value output
- Kit sales + workshops + services + content
- Sustainable monthly revenue
- Community impact project

Estimated Value: £${Math.round((totalCost + 80) * 3)}
Revenue Split: 25% you, 45% team, 20% overhead, 10% community
Your Earnings: £${Math.round((totalCost + 80) * 3 * 0.25)} per major project
+ Ongoing: £${Math.round((totalCost + 80) * 0.5)}/month (workshops/tutorials/services)
` : ''}

${projectData.collaborationScale !== 'solo' ? `
Want Maya to coordinate your team?
Contact: maya@wembleywonders.org (Passionistas members only)
` : ''}

───────────────────────────────────────────────────────────────────────
💰 REVENUE POTENTIAL
───────────────────────────────────────────────────────────────────────

${projectData.businessPotential ? `
Kit Sales:
  Unit Cost: £${totalCost.toFixed(2)} (materials)
  Selling Price: £${Math.round(totalCost * 2.5)} (recommended)
  Your Profit: £${Math.round(totalCost * 2.5 * (projectData.collaborationScale === 'solo' ? 0.85 : projectData.collaborationScale === 'collaborative' ? 0.40 : 0.25))} per kit

Estimated Sales: 5-20 kits in first 6 months
Revenue Projection: £${Math.round(totalCost * 2.5 * 12 * 0.4)}-£${Math.round(totalCost * 2.5 * 20 * 0.4)}
` : ''}

${projectData.documentationNeeds ? `
Teaching Workshops:
  Per Session: £60-120
  Frequency: 1-2 per month
  Monthly Revenue: £60-240

Tutorial Sales:
  Per Tutorial: £15-40
  Passive Income: £30-120/month (growing over time)
` : ''}

Total Estimated Monthly Revenue (Month 6+): £${
  (projectData.businessPotential ? 200 : 0) +
  (projectData.documentationNeeds ? 150 : 0)
}/month

───────────────────────────────────────────────────────────────────────
📞 NEXT ACTIONS
───────────────────────────────────────────────────────────────────────

1. Join Passionistas / STEMgeneers membership
   → wembleywonders.org/membership
   → Workshop access, tools, Uncle Winston's guidance

2. Source components (£${totalCost.toFixed(2)} budget)
   → Full bill of materials included above
   → Recommended suppliers available to members

${projectData.collaborationScale !== 'solo' ? `
3. Request Maya coordination for team assembly
   → maya@wembleywonders.org
   → Include this build plan
` : ''}

4. Book workshop time (${projectData.estimatedBuildTime} hours needed)
   → Available to members: Mon-Sat, 10am-8pm
   → Tools & PPE provided

5. Build, test, document
   → Follow safety protocols ALWAYS
   → Take photos/video for portfolio
   → Test against success criteria

6. Publish & monetize
   → Submit to Joystick for feature article
   → List on CyberStore if selling
   → Offer workshops through programmes

───────────────────────────────────────────────────────────────────────

"Engineering is the art of making the impossible, practical. But collaboration 
is what makes the practical, WONDERFUL."
                                                        - Uncle Winston

STEMgeneers Team | Wembley Wonders CIC
Each One Teach One, Each One Earn Together
wembleywonders.org
    `.trim();

    setGeneratedPlan(plan);
  };

  // ========================================
  // MAIN RENDER
  // ========================================

  return (
    <div className={styles.plannerContainer}>
      <ProgressBar
        currentStep={planner.currentStep}
        totalSteps={7}
      />

      {renderStep()}

      {planner.showConversionModal && (
        <ConversionModal
          downloadCount={planner.downloadCount}
          onClose={() => planner.setShowConversionModal(false)}
          programmeName="STEMgeneers"
          programmeUrl="/membership"
        />
      )}
    </div>
  );
};

export default TechnicalBuilder;
