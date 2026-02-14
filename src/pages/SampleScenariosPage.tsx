import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import './SampleScenariosPage.css';

// Types
type ScenarioCategory = 'community_organizing' | 'conflict_resolution' | 'project_management' | 'stakeholder_engagement' | 'resource_allocation';
type ScenarioDifficulty = 'beginner' | 'intermediate' | 'advanced';
type QuestionType = 'multiple_choice' | 'open_ended' | 'prioritization';

interface Question {
  question: string;
  type: QuestionType;
  options?: string[];
}

interface Scenario {
  id: string;
  title: string;
  category: ScenarioCategory;
  difficulty: ScenarioDifficulty;
  timeEstimate: string;
  situation: string;
  yourRole: string;
  keyStakeholders: string[];
  challenges: string[];
  questions: Question[];
  sampleResponse: string;
  learningObjectives: string[];
  followUpActions: string[];
}

interface CategoryInfo {
  id: string;
  label: string;
  icon: string;
}

// Constants
const CATEGORIES: CategoryInfo[] = [
  { id: 'all', label: 'All Scenarios', icon: '📚' },
  { id: 'community_organizing', label: 'Community Organizing', icon: '🤝' },
  { id: 'conflict_resolution', label: 'Conflict Resolution', icon: '⚖️' },
  { id: 'project_management', label: 'Project Management', icon: '📋' },
  { id: 'stakeholder_engagement', label: 'Stakeholder Engagement', icon: '👥' },
  { id: 'resource_allocation', label: 'Resource Allocation', icon: '💰' }
];

const CATEGORY_ICONS: Record<ScenarioCategory, string> = {
  community_organizing: '🤝',
  conflict_resolution: '⚖️',
  project_management: '📋',
  stakeholder_engagement: '👥',
  resource_allocation: '💰'
};

const DIFFICULTY_COLORS: Record<ScenarioDifficulty, string> = {
  beginner: '#48bb78',
  intermediate: '#ed8936',
  advanced: '#e53e3e'
};

// Scenario data
const SCENARIOS: Scenario[] = [
  {
    id: 'community-garden',
    title: 'Community Garden Conflict',
    category: 'conflict_resolution',
    difficulty: 'beginner',
    timeEstimate: '15-20 minutes',
    situation: `The community garden project you're helping coordinate has run into problems. Some plot holders are unhappy that others aren't maintaining their spaces properly. There's been heated discussion on the community platform, with accusations of favoritism in plot allocation. Three families have threatened to abandon their plots, and the garden coordinator is considering stepping down.`,
    yourRole: 'Assistant Project Coordinator for the community garden initiative',
    keyStakeholders: [
      'Garden Coordinator (Sarah) - feeling overwhelmed',
      'Long-term plot holders - frustrated with maintenance standards',
      'New families - feeling unwelcome and criticized',
      'Local Council representative - concerned about project success',
      'Community members waiting for plots'
    ],
    challenges: [
      'Declining participation and morale',
      'Unclear maintenance standards and enforcement',
      'Communication breakdown between stakeholders',
      'Risk of project failure affecting community trust'
    ],
    questions: [
      {
        question: 'What should be your first priority in addressing this situation?',
        type: 'multiple_choice',
        options: [
          'Organize an immediate meeting with all plot holders',
          'Speak individually with each key stakeholder first',
          'Create new rules and enforcement procedures',
          'Find a replacement for the garden coordinator'
        ]
      },
      {
        question: 'How would you approach the frustrated long-term plot holders?',
        type: 'open_ended'
      },
      {
        question: 'What specific steps would you take to rebuild trust and communication?',
        type: 'open_ended'
      }
    ],
    sampleResponse: `**Priority: Individual stakeholder conversations first**

Start by listening to each stakeholder's concerns separately before bringing everyone together. This allows you to understand all perspectives and identify common ground.

**Approach with long-term plot holders:**
Acknowledge their investment and expertise while gently exploring whether their expectations might be creating barriers for newcomers. Focus on their shared goal of a thriving garden.

**Trust-building steps:**
1. Facilitate a collaborative review of garden guidelines
2. Create a buddy system pairing experienced and new gardeners
3. Establish regular check-ins and clear communication channels
4. Celebrate successes and recognize contributions from all participants`,
    learningObjectives: [
      'Practice active listening and stakeholder management',
      'Understand conflict de-escalation techniques',
      'Learn to identify root causes vs. symptoms',
      'Develop collaborative problem-solving skills'
    ],
    followUpActions: [
      'Research best practices for community garden governance',
      'Practice facilitating difficult conversations',
      'Learn about inclusive community engagement methods'
    ]
  },
  {
    id: 'budget-allocation',
    title: 'Community Fund Allocation Dilemma',
    category: 'resource_allocation',
    difficulty: 'intermediate',
    timeEstimate: '25-30 minutes',
    situation: `Your community has received a £15,000 grant to spend on local improvement projects before the end of the fiscal year. Three compelling proposals have been submitted: (1) Playground equipment upgrade (£12,000), (2) Digital skills training program (£8,000), and (3) Community festival organization (£5,000). The community is divided, with passionate advocates for each proposal. Some members suggest splitting the money equally, while others argue for funding based on need assessment.`,
    yourRole: 'Connector member of the Community Fund Allocation Committee',
    keyStakeholders: [
      'Parents group - strongly supporting playground upgrade',
      'Senior citizens - prioritizing digital skills training',
      'Local business owners - backing the community festival',
      'Youth representatives - split between all three options',
      'Community coordinators - seeking fair process'
    ],
    challenges: [
      'Limited funding for multiple worthy causes',
      'Strong opinions and competing interests',
      'Pressure to make quick decision due to deadline',
      'Need to maintain community cohesion regardless of outcome'
    ],
    questions: [
      {
        question: 'How would you structure a fair decision-making process?',
        type: 'open_ended'
      },
      {
        question: 'What criteria should guide the allocation decision?',
        type: 'prioritization'
      },
      {
        question: 'How would you handle the disappointment of groups whose projects aren\'t fully funded?',
        type: 'open_ended'
      }
    ],
    sampleResponse: `**Decision-making process:**
Establish clear, transparent criteria agreed upon by all stakeholders before evaluating proposals. Use a structured scoring system considering impact, sustainability, inclusivity, and feasibility.

**Key criteria (in priority order):**
1. Number of community members directly benefiting
2. Long-term sustainability and maintenance requirements
3. Alignment with community priorities identified in recent survey
4. Potential for leveraging additional resources or partnerships

**Managing disappointment:**
Acknowledge all proposals' merit and explore alternative funding sources. Consider phased implementation or hybrid solutions. Most importantly, involve unsuccessful proposers in planning and implementing funded projects to maintain engagement.`,
    learningObjectives: [
      'Learn democratic decision-making processes',
      'Practice stakeholder analysis and management',
      'Understand resource allocation principles',
      'Develop skills in managing competing interests'
    ],
    followUpActions: [
      'Study local government budget allocation processes',
      'Research grant writing and alternative funding sources',
      'Practice facilitating consensus-building activities'
    ]
  },
  {
    id: 'youth-engagement',
    title: 'Youth Disengagement Challenge',
    category: 'stakeholder_engagement',
    difficulty: 'intermediate',
    timeEstimate: '20-25 minutes',
    situation: `Recent community surveys show that 78% of residents aged 16-25 feel disconnected from local decision-making processes. Young people report that community meetings are boring, scheduled at inconvenient times, and dominated by older residents discussing issues that don't feel relevant to them. Meanwhile, older community members express frustration that "young people don't care" and aren't willing to participate in established community structures.`,
    yourRole: 'Connector tasked with developing a youth engagement strategy',
    keyStakeholders: [
      'Local young people (16-25) - feeling excluded and unheard',
      'Established community leaders - concerned about youth participation',
      'Parents - wanting their children to be engaged citizens',
      'Local schools and colleges - potential partnership opportunities',
      'Youth workers and organizations - expertise in youth engagement'
    ],
    challenges: [
      'Generational divide in communication preferences and priorities',
      'Existing meeting formats that don\'t work for young people',
      'Mutual stereotypes and misunderstandings',
      'Need to create meaningful roles without tokenism'
    ],
    questions: [
      {
        question: 'What would be your first step in understanding why young people feel disconnected?',
        type: 'multiple_choice',
        options: [
          'Conduct a detailed survey of young people\'s interests and availability',
          'Organize focus groups with different age cohorts separately',
          'Shadow some young people to understand their daily routines and priorities',
          'All of the above using different methods for different groups'
        ]
      },
      {
        question: 'How would you design community engagement that appeals to young people while respecting established members?',
        type: 'open_ended'
      },
      {
        question: 'What specific initiatives would you pilot to test your approach?',
        type: 'open_ended'
      }
    ],
    sampleResponse: `**First step: Multi-method approach**
Use various engagement methods to understand different youth perspectives - online surveys for broad reach, focus groups for depth, and informal conversations in spaces where young people already gather.

**Designing inclusive engagement:**
Create hybrid participation models: online platforms for initial discussion and input, shorter focused meetings on specific issues, and project-based involvement where young people can lead initiatives they care about. Establish youth advisory roles with real decision-making power.

**Pilot initiatives:**
1. Youth-led community audit identifying issues they prioritize
2. Digital participation tools for input on decisions affecting them
3. Mentorship program pairing young people with experienced community members
4. Youth-organized community events with their preferred formats and timing`,
    learningObjectives: [
      'Understand inclusive engagement principles',
      'Learn to bridge generational divides',
      'Practice designing participatory processes',
      'Develop cultural competency in stakeholder engagement'
    ],
    followUpActions: [
      'Research successful youth engagement models from other communities',
      'Complete training on inclusive facilitation techniques',
      'Build relationships with local youth organizations'
    ]
  },
  {
    id: 'local-business',
    title: 'High Street Revitalization Project',
    category: 'project_management',
    difficulty: 'advanced',
    timeEstimate: '30-35 minutes',
    situation: `You're co-leading a project to revitalize the local high street, which has seen several shop closures and reduced foot traffic since the pandemic. The project involves coordinating between local businesses, residents, the council, and potential investors. Initial enthusiasm is high, but you're three months in and facing delays in planning permission, disagreements about the scope of changes, and concerns about gentrification from long-term residents.`,
    yourRole: 'Co-Project Lead for High Street Revitalization Initiative',
    keyStakeholders: [
      'Local business owners - mixed views on proposed changes',
      'Long-term residents - concerned about affordability and character changes',
      'Council planning department - dealing with regulatory requirements',
      'Potential investors - interested but want clear returns',
      'Community organizations - advocating for inclusive development'
    ],
    challenges: [
      'Complex regulatory and planning requirements',
      'Balancing economic development with community character',
      'Managing multiple stakeholder expectations and timelines',
      'Risk of gentrification displacing current residents and businesses'
    ],
    questions: [
      {
        question: 'How would you address the planning permission delays while maintaining momentum?',
        type: 'open_ended'
      },
      {
        question: 'What approach would you take to address gentrification concerns?',
        type: 'open_ended'
      },
      {
        question: 'How would you restructure the project to better manage complexity and stakeholder relationships?',
        type: 'open_ended'
      }
    ],
    sampleResponse: `**Addressing planning delays:**
Break the project into phases that can proceed independently. Identify quick wins that don't require planning permission (street cleaning, lighting, events) while working through regulatory processes for larger changes. Maintain regular communication about delays and alternative progress.

**Managing gentrification concerns:**
Establish community benefit criteria for any development, including affordable retail space requirements, support for existing businesses, and mechanisms to monitor and prevent displacement. Create a community oversight group with residents' representation.

**Project restructuring:**
Move from single large project to portfolio of interconnected initiatives with different timelines and requirements. Create working groups for different aspects (business support, public realm, events, planning) with clear coordination mechanisms and regular cross-group communication.`,
    learningObjectives: [
      'Understand complex project management in community settings',
      'Learn to balance multiple stakeholder interests',
      'Practice adaptive planning and problem-solving',
      'Develop skills in managing political and social sensitivities'
    ],
    followUpActions: [
      'Study successful high street regeneration case studies',
      'Complete project management certification',
      'Build relationships with planning and development professionals'
    ]
  },
  {
    id: 'digital-divide',
    title: 'Digital Inclusion Emergency Response',
    category: 'community_organizing',
    difficulty: 'advanced',
    timeEstimate: '25-30 minutes',
    situation: `A local school has suddenly announced it's moving to online-only learning for the next month due to building repairs. Your community survey data shows that 35% of families lack adequate internet connectivity or devices for home learning. Parents are panicking, children are missing school, and there's pressure to find immediate solutions while also addressing the longer-term digital divide in your community.`,
    yourRole: 'Emergency Response Coordinator for Digital Inclusion Crisis',
    keyStakeholders: [
      'Affected families - immediate need for digital access',
      'School administration - trying to maintain educational continuity',
      'Local libraries and community centers - potential solution providers',
      'Internet service providers - possible partnership opportunities',
      'Local government - seeking emergency support measures'
    ],
    challenges: [
      'Urgent timeframe requiring immediate action',
      'Limited resources and competing demands',
      'Complex technical and logistical requirements',
      'Need for both short-term solutions and long-term strategy'
    ],
    questions: [
      {
        question: 'How would you prioritize actions in the first 48 hours?',
        type: 'prioritization'
      },
      {
        question: 'What partnerships would you try to establish quickly?',
        type: 'open_ended'
      },
      {
        question: 'How would you ensure the emergency response leads to lasting improvements?',
        type: 'open_ended'
      }
    ],
    sampleResponse: `**48-hour priorities:**
1. Map affected families and their specific needs (devices vs. connectivity vs. both)
2. Inventory available resources (community center computers, library access, donated devices)
3. Establish emergency coordination center with school and key partners
4. Launch immediate device lending and connectivity sharing programs

**Key partnerships:**
Mobilize libraries for extended access, negotiate with ISPs for emergency connections, coordinate with local businesses for workspace sharing, engage tech-savvy volunteers for setup and support.

**Long-term improvements:**
Use crisis data to build comprehensive digital inclusion strategy, establish permanent device lending library, advocate for improved infrastructure, create digital literacy training programs, and build ongoing partnership network for future needs.`,
    learningObjectives: [
      'Practice crisis management and rapid response coordination',
      'Learn to mobilize community resources under pressure',
      'Understand systems thinking in community problem-solving',
      'Develop skills in turning crisis into opportunity for systemic change'
    ],
    followUpActions: [
      'Study emergency management best practices',
      'Build knowledge of digital infrastructure and policy',
      'Develop crisis communication and coordination skills'
    ]
  }
];

// Custom hooks
const useScenarioFiltering = (selectedCategory: string) => {
  return useMemo(() => {
    return selectedCategory === 'all' 
      ? SCENARIOS 
      : SCENARIOS.filter(scenario => scenario.category === selectedCategory);
  }, [selectedCategory]);
};

// Components
const ScenarioHeader: React.FC<{
  scenario: Scenario;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ scenario, isExpanded, onToggle }) => (
  <div className="scenario-header" onClick={onToggle}>
    <div className="scenario-meta">
      <span className="scenario-category">
        {CATEGORY_ICONS[scenario.category]}
      </span>
      <span 
        className="difficulty-badge"
        style={{ backgroundColor: DIFFICULTY_COLORS[scenario.difficulty] }}
      >
        {scenario.difficulty}
      </span>
      <span className="time-estimate">{scenario.timeEstimate}</span>
    </div>
    <h3>{scenario.title}</h3>
    <p className="scenario-preview">
      {scenario.situation.substring(0, 150)}...
    </p>
    <span className={`expand-arrow ${isExpanded ? 'rotated' : ''}`}>
      ▼
    </span>
  </div>
);

const ScenarioContent: React.FC<{
  scenario: Scenario;
  showSampleResponse: boolean;
  onToggleResponse: () => void;
}> = ({ scenario, showSampleResponse, onToggleResponse }) => (
  <div className="scenario-content">
    <ContentSection title="🎯 The Situation">
      <p>{scenario.situation}</p>
    </ContentSection>

    <ContentSection title="👤 Your Role">
      <p><strong>{scenario.yourRole}</strong></p>
    </ContentSection>

    <ContentSection title="👥 Key Stakeholders">
      <ul className="stakeholders-list">
        {scenario.keyStakeholders.map((stakeholder, index) => (
          <li key={index}>{stakeholder}</li>
        ))}
      </ul>
    </ContentSection>

    <ContentSection title="⚡ Key Challenges">
      <ul className="challenges-list">
        {scenario.challenges.map((challenge, index) => (
          <li key={index}>{challenge}</li>
        ))}
      </ul>
    </ContentSection>

    <ContentSection title="❓ Questions to Consider">
      <div className="questions-list">
        {scenario.questions.map((question, index) => (
          <QuestionItem key={index} question={question} questionNumber={index + 1} />
        ))}
      </div>
    </ContentSection>

    <SampleResponseSection 
      response={scenario.sampleResponse}
      showResponse={showSampleResponse}
      onToggle={onToggleResponse}
    />

    <ContentSection title="🎓 Learning Objectives">
      <ul className="objectives-list">
        {scenario.learningObjectives.map((objective, index) => (
          <li key={index}>{objective}</li>
        ))}
      </ul>
    </ContentSection>

    <ContentSection title="🚀 Recommended Follow-up Actions">
      <ul className="followup-list">
        {scenario.followUpActions.map((action, index) => (
          <li key={index}>{action}</li>
        ))}
      </ul>
    </ContentSection>
  </div>
);

const ContentSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="content-section">
    <h4>{title}</h4>
    {children}
  </div>
);

const QuestionItem: React.FC<{
  question: Question;
  questionNumber: number;
}> = ({ question, questionNumber }) => (
  <div className="question-item">
    <p><strong>Q{questionNumber}:</strong> {question.question}</p>
    {question.options && (
      <ul className="question-options">
        {question.options.map((option, index) => (
          <li key={index}>
            {String.fromCharCode(65 + index)}. {option}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const SampleResponseSection: React.FC<{
  response: string;
  showResponse: boolean;
  onToggle: () => void;
}> = ({ response, showResponse, onToggle }) => (
  <div className="content-section">
    <div className="sample-response-header">
      <h4>💡 Sample Response</h4>
      <button className="toggle-response-btn" onClick={onToggle}>
        {showResponse ? 'Hide Response' : 'Show Sample Response'}
      </button>
    </div>
    
    {showResponse && (
      <div className="sample-response">
        <div className="response-content">
          {response.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return (
                <h5 key={index} className="response-heading">
                  {paragraph.replace(/\*\*/g, '')}
                </h5>
              );
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>
      </div>
    )}
  </div>
);

const CategoryFilter: React.FC<{
  categories: CategoryInfo[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}> = ({ categories, selectedCategory, onCategoryChange }) => (
  <section className="category-filter">
    <h2>Choose Your Focus Area</h2>
    <div className="category-grid">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          <span className="category-icon">{category.icon}</span>
          <span className="category-label">{category.label}</span>
        </button>
      ))}
    </div>
  </section>
);

const PracticeTips: React.FC = () => (
  <section className="practice-tips">
    <h2>How to Use These Scenarios</h2>
    <div className="tips-grid">
      {[
        {
          icon: '🧠',
          title: 'Think First',
          description: 'Read the scenario carefully and take time to consider your approach before looking at sample responses.'
        },
        {
          icon: '📝',
          title: 'Write It Down',
          description: 'Document your initial thoughts and responses. This helps you track your development over time.'
        },
        {
          icon: '👥',
          title: 'Discuss with Others',
          description: 'Share scenarios with fellow Connectors or your mentor to gain different perspectives.'
        },
        {
          icon: '🔄',
          title: 'Practice Regularly',
          description: 'Return to scenarios periodically. Your responses will evolve as you gain more experience.'
        },
        {
          icon: '🎯',
          title: 'Focus on Process',
          description: 'There\'s no single "right" answer. Focus on your thinking process and reasoning.'
        },
        {
          icon: '📚',
          title: 'Learn from Examples',
          description: 'Use sample responses as learning tools, not perfect solutions. Real situations are always unique.'
        }
      ].map((tip, index) => (
        <div key={index} className="tip-card">
          <h3>{tip.icon} {tip.title}</h3>
          <p>{tip.description}</p>
        </div>
      ))}
    </div>
  </section>
);

// Main component
const SampleScenariosPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [showSampleResponse, setShowSampleResponse] = useState<Record<string, boolean>>({});

  const filteredScenarios = useScenarioFiltering(selectedCategory);

  const toggleScenario = (scenarioId: string) => {
    setActiveScenario(current => current === scenarioId ? null : scenarioId);
  };

  const toggleSampleResponse = (scenarioId: string) => {
    setShowSampleResponse(prev => ({
      ...prev,
      [scenarioId]: !prev[scenarioId]
    }));
  };

  const getSectionTitle = () => {
    if (selectedCategory === 'all') return 'All Practice Scenarios';
    const category = CATEGORIES.find(c => c.id === selectedCategory);
    return `${category?.label} Scenarios`;
  };

  return (
    <div className="sample-scenarios-page">
      
      <div className="scenarios-container">
        {/* Hero Section */}
        <section className="scenarios-hero">
          <div className="hero-content">
            <h1>Practice Scenarios</h1>
            <p className="hero-subtitle">
              Build your community leadership skills with real-world scenarios based on actual situations faced by Connectors and Curators
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{SCENARIOS.length}</span>
                <span className="stat-label">Scenarios</span>
              </div>
              <div className="stat">
                <span className="stat-number">5</span>
                <span className="stat-label">Skill Areas</span>
              </div>
              <div className="stat">
                <span className="stat-number">3</span>
                <span className="stat-label">Difficulty Levels</span>
              </div>
            </div>
          </div>
        </section>

        <CategoryFilter 
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Scenarios List */}
        <section className="scenarios-list">
          <h2>{getSectionTitle()}</h2>
          
          <div className="scenarios-grid">
            {filteredScenarios.map((scenario) => (
              <div key={scenario.id} className="scenario-card">
                <ScenarioHeader
                  scenario={scenario}
                  isExpanded={activeScenario === scenario.id}
                  onToggle={() => toggleScenario(scenario.id)}
                />

                {activeScenario === scenario.id && (
                  <ScenarioContent
                    scenario={scenario}
                    showSampleResponse={showSampleResponse[scenario.id] || false}
                    onToggleResponse={() => toggleSampleResponse(scenario.id)}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        <PracticeTips />

        {/* Action Section */}
        <section className="action-section">
          <h2>Ready to Test Your Skills?</h2>
          <p>
            These scenarios prepare you for real community leadership challenges. When you're ready, take the full assessment to demonstrate your capabilities.
          </p>
          <div className="action-buttons">
            <Link to="/practice-assessment" className="btn btn-primary">
              Take Practice Assessment
            </Link>
            <Link to="/assessment-guide" className="btn btn-secondary">
              Assessment Preparation Guide
            </Link>
            <Link to="/volunteers" className="btn btn-outline">
              Discuss with Mentor
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default SampleScenariosPage;