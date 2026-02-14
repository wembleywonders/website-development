// src/systems/rovs/personalities/pathfinder/PathfinderROV.tsx
import React, { useState, useEffect } from 'react';
import { PathfinderROVProps, NavigationPath, StrategicRecommendation } from './PathfinderROVTypes';

const PathfinderROV: React.FC<PathfinderROVProps> = ({
  userId,
  currentObjective,
  context,
  onPathGenerated,
  onNavigationUpdate,
  onStrategicAdvice,
  mode = 'guided'
}) => {
  const [currentPath, setCurrentPath] = useState<NavigationPath | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [recommendations, setRecommendations] = useState<StrategicRecommendation[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentObjective) {
      generateOptimalPath();
    }
  }, [currentObjective]);

  const generateOptimalPath = async () => {
    setIsCalculating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const path = calculateOptimalPath(currentObjective, context);
      const strategicAdvice = generateStrategicRecommendations(path);
      
      setCurrentPath(path);
      setRecommendations(strategicAdvice);
      
      if (onPathGenerated) {
        onPathGenerated(path);
      }
      
      if (onStrategicAdvice) {
        onStrategicAdvice(strategicAdvice);
      }
      
    } catch (error) {
      console.error('Path calculation failed:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const calculateOptimalPath = (objective: string, context: any): NavigationPath => {
    const pathId = `path-${Date.now()}`;
    
    // Mock path calculation - in real implementation would use sophisticated algorithms
    const path: NavigationPath = {
      id: pathId,
      objective: objective,
      estimatedDuration: calculateDuration(objective),
      difficulty: assessDifficulty(objective, context),
      steps: generateSteps(objective, context),
      alternatives: generateAlternatives(objective),
      riskAssessment: assessRisks(objective, context),
      successProbability: calculateSuccessProbability(objective, context),
      createdAt: new Date()
    };

    return path;
  };

  const calculateDuration = (objective: string): string => {
    const durationMap: Record<string, string> = {
      'skill-development': '3-6 months',
      'career-advancement': '6-12 months',
      'community-leadership': '12-18 months',
      'project-completion': '2-4 months',
      'governance-participation': '6-9 months'
    };
    
    const category = identifyObjectiveCategory(objective);
    return durationMap[category] || '3-6 months';
  };

  const assessDifficulty = (objective: string, context: any): 'easy' | 'moderate' | 'challenging' | 'complex' => {
    const factors = [
      context.userExperience || 'beginner',
      context.resourceAvailability || 'limited',
      context.timeConstraints || 'flexible',
      context.supportNetwork || 'minimal'
    ];
    
    const complexityScore = factors.reduce((score, factor) => {
      if (factor.includes('advanced') || factor.includes('extensive') || factor.includes('strong')) return score + 1;
      if (factor.includes('intermediate') || factor.includes('moderate')) return score + 0.5;
      return score;
    }, 0);
    
    if (complexityScore >= 3) return 'easy';
    if (complexityScore >= 2) return 'moderate';
    if (complexityScore >= 1) return 'challenging';
    return 'complex';
  };

  const generateSteps = (objective: string, context: any) => {
    const category = identifyObjectiveCategory(objective);
    
    const stepTemplates: Record<string, Array<{
      title: string;
      description: string;
      estimatedTime: string;
      prerequisites: string[];
      resources: string[];
    }>> = {
      'skill-development': [
        {
          title: 'Skill Assessment',
          description: 'Evaluate current skill level and identify specific gaps',
          estimatedTime: '1 week',
          prerequisites: [],
          resources: ['Self-assessment tools', 'ROV guidance']
        },
        {
          title: 'Learning Plan Creation',
          description: 'Develop structured learning pathway with milestones',
          estimatedTime: '2 weeks',
          prerequisites: ['Skill Assessment'],
          resources: ['Community mentors', 'Practice opportunities']
        },
        {
          title: 'Active Practice',
          description: 'Engage in community activities to practice and demonstrate skills',
          estimatedTime: '8-12 weeks',
          prerequisites: ['Learning Plan Creation'],
          resources: ['Community projects', 'ROV coaching']
        },
        {
          title: 'Skill Validation',
          description: 'Obtain endorsements and certifications from community members',
          estimatedTime: '2-4 weeks',
          prerequisites: ['Active Practice'],
          resources: ['Peer endorsements', 'Certification system']
        }
      ],
      'community-leadership': [
        {
          title: 'Leadership Foundation',
          description: 'Build fundamental leadership skills through small-scale initiatives',
          estimatedTime: '3 months',
          prerequisites: [],
          resources: ['Leadership workshops', 'Mentor guidance']
        },
        {
          title: 'Project Leadership',
          description: 'Lead community projects to demonstrate leadership capabilities',
          estimatedTime: '6 months',
          prerequisites: ['Leadership Foundation'],
          resources: ['Community projects', 'Team members']
        },
        {
          title: 'Governance Participation',
          description: 'Join committees and governance structures',
          estimatedTime: '6-9 months',
          prerequisites: ['Project Leadership'],
          resources: ['Board opportunities', 'Policy development']
        }
      ]
    };
    
    return stepTemplates[category] || stepTemplates['skill-development'];
  };

  const generateAlternatives = (objective: string) => {
    return [
      {
        name: 'Accelerated Path',
        description: 'Intensive approach with more time commitment',
        tradeoffs: ['Faster completion', 'Higher time investment', 'More intensive learning']
      },
      {
        name: 'Flexible Path',
        description: 'Part-time approach balancing other commitments',
        tradeoffs: ['Longer timeline', 'Better work-life balance', 'Sustainable pace']
      },
      {
        name: 'Collaborative Path',
        description: 'Group-based approach with peer learning',
        tradeoffs: ['Shared learning', 'Coordination challenges', 'Network building']
      }
    ];
  };

  const assessRisks = (objective: string, context: any) => {
    return [
      {
        risk: 'Time constraints',
        probability: 'medium',
        impact: 'moderate',
        mitigation: 'Build flexible timeline with buffer periods'
      },
      {
        risk: 'Lack of community engagement',
        probability: 'low',
        impact: 'high',
        mitigation: 'Start with smaller commitments to build relationships'
      },
      {
        risk: 'Skill complexity underestimated',
        probability: 'medium',
        impact: 'moderate',
        mitigation: 'Regular progress reviews and ROV guidance'
      }
    ];
  };

  const calculateSuccessProbability = (objective: string, context: any): number => {
    let baseScore = 0.7; // 70% base success rate
    
    // Adjust based on context factors
    if (context.userExperience === 'advanced') baseScore += 0.1;
    if (context.supportNetwork === 'strong') baseScore += 0.1;
    if (context.timeConstraints === 'flexible') baseScore += 0.05;
    if (context.resourceAvailability === 'extensive') baseScore += 0.05;
    
    return Math.min(baseScore, 0.95); // Cap at 95%
  };

  const generateStrategicRecommendations = (path: NavigationPath): StrategicRecommendation[] => {
    return [
      {
        id: `rec-${Date.now()}-1`,
        category: 'optimization',
        priority: 'high',
        title: 'Leverage Community Events',
        description: 'Align your skill development activities with upcoming community events for maximum visibility and practice opportunities',
        expectedBenefit: 'Accelerated skill demonstration and network building',
        implementation: [
          'Check community calendar for relevant events',
          'Volunteer to help organize events in your skill area',
          'Present or demonstrate skills at community gatherings'
        ],
        timeline: '2-4 weeks'
      },
      {
        id: `rec-${Date.now()}-2`,
        category: 'risk-mitigation',
        priority: 'medium',
        title: 'Build Learning Partnerships',
        description: 'Establish peer learning relationships to maintain motivation and share knowledge',
        expectedBenefit: 'Reduced isolation and improved learning outcomes',
        implementation: [
          'Identify 2-3 community members with complementary skills',
          'Propose regular skill-sharing sessions',
          'Create accountability partnerships for goal tracking'
        ],
        timeline: '1-2 weeks'
      }
    ];
  };

  const identifyObjectiveCategory = (objective: string): string => {
    const categories = [
      'skill-development',
      'career-advancement', 
      'community-leadership',
      'project-completion',
      'governance-participation'
    ];
    
    return categories.find(cat => 
      objective.toLowerCase().includes(cat.replace('-', ' '))
    ) || 'skill-development';
  };

  const handleStepComplete = (stepIndex: number) => {
    if (currentPath && stepIndex < currentPath.steps.length) {
      const newProgress = ((stepIndex + 1) / currentPath.steps.length) * 100;
      setProgress(newProgress);
      
      if (onNavigationUpdate) {
        onNavigationUpdate({
          currentStep: stepIndex + 1,
          totalSteps: currentPath.steps.length,
          progress: newProgress
        });
      }
    }
  };

  const getProgressColor = (progress: number): string => {
    if (progress >= 80) return '#27ae60';
    if (progress >= 50) return '#f39c12';
    return '#3498db';
  };

  return (
    <div className="pathfinder-rov">
      <div className="rov-header">
        <div className="rov-avatar">🧭</div>
        <div className="rov-info">
          <h3>Pathfinder ROV</h3>
          <p>Strategic navigation and process optimization</p>
        </div>
        {currentPath && (
          <div className="progress-indicator">
            <div 
              className="progress-bar"
              style={{ 
                width: `${progress}%`,
                backgroundColor: getProgressColor(progress)
              }}
            ></div>
            <span className="progress-text">{Math.round(progress)}% Complete</span>
          </div>
        )}
      </div>

      {isCalculating ? (
        <div className="calculating">
          <div className="spinner"></div>
          <span>Calculating optimal path for: "{currentObjective}"</span>
        </div>
      ) : currentPath ? (
        <div className="navigation-content">
          <div className="path-overview">
            <h4>Optimal Path to: {currentPath.objective}</h4>
            <div className="path-metrics">
              <span className="metric">
                ⏱️ Duration: {currentPath.estimatedDuration}
              </span>
              <span className="metric">
                📊 Difficulty: {currentPath.difficulty}
              </span>
              <span className="metric">
                🎯 Success Rate: {Math.round(currentPath.successProbability * 100)}%
              </span>
            </div>
          </div>

          <div className="steps-section">
            <h4>Step-by-Step Path</h4>
            <div className="steps-list">
              {currentPath.steps.map((step: { title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; estimatedTime: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; resources: any[]; }, index: React.Key | null | undefined) => (
                <div key={index} className="step-item">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    <h5>{step.title}</h5>
                    <p>{step.description}</p>
                    <div className="step-meta">
                      <span>📅 {step.estimatedTime}</span>
                      <span>🔧 {step.resources.join(', ')}</span>
                    </div>
                    <button 
                      className="step-complete-btn"
                      onClick={() => handleStepComplete(index)}
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {recommendations.length > 0 && (
            <div className="recommendations-section">
              <h4>Strategic Recommendations</h4>
              <div className="recommendations-list">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="recommendation-card">
                    <div className="rec-header">
                      <span className="rec-title">{rec.title}</span>
                      <span className={`rec-priority ${rec.priority}`}>
                        {rec.priority} priority
                      </span>
                    </div>
                    <p className="rec-description">{rec.description}</p>
                    <div className="rec-benefit">
                      <strong>Expected benefit:</strong> {rec.expectedBenefit}
                    </div>
                    <div className="rec-timeline">
                      <strong>Timeline:</strong> {rec.timeline}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentPath.alternatives && (
            <div className="alternatives-section">
              <h4>Alternative Paths</h4>
              <div className="alternatives-grid">
                {currentPath.alternatives.map((alt: { name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; tradeoffs: (string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined)[]; }, index: React.Key | null | undefined) => (
                  <div key={index} className="alternative-card">
                    <h5>{alt.name}</h5>
                    <p>{alt.description}</p>
                    <div className="tradeoffs">
                      <strong>Tradeoffs:</strong>
                      <ul>
                        {alt.tradeoffs.map((tradeoff: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
                          <li key={idx}>{tradeoff}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="no-path">
          <span>Ready to calculate optimal path for your objective</span>
          <button onClick={generateOptimalPath}>Generate Path</button>
        </div>
      )}
    </div>
  );
};

export default PathfinderROV;