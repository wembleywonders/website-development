import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import styles from './AssessmentGuidePage.module.css';

const AssessmentGuidePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const assessmentAreas = [
    {
      id: 'communication',
      title: 'Communication Skills',
      icon: '💬',
      description: 'How well you connect with and understand community members',
      skills: [
        'Active listening and empathy',
        'Clear verbal and written communication',
        'Cultural sensitivity and awareness',
        'Conflict resolution and mediation',
        'Public speaking and presentation'
      ],
      preparation: [
        'Practice explaining complex topics simply',
        'Role-play difficult conversations',
        'Research local cultural dynamics',
        'Prepare examples of past communication successes'
      ]
    },
    {
      id: 'problem_solving',
      title: 'Problem Solving',
      icon: '🧩',
      description: 'Your ability to identify issues and develop practical solutions',
      skills: [
        'Analytical thinking and research',
        'Creative solution development',
        'Resource identification and mobilization',
        'Strategic planning and prioritization',
        'Collaborative decision-making'
      ],
      preparation: [
        'Study local community challenges',
        'Practice breaking down complex problems',
        'Prepare examples of innovative solutions',
        'Review case studies of successful projects'
      ]
    },
    {
      id: 'community_knowledge',
      title: 'Community Knowledge',
      icon: '🏘️',
      description: 'Understanding of local demographics, needs, and resources',
      skills: [
        'Local demographics and statistics',
        'Community assets and resources',
        'Key stakeholders and organizations',
        'Historical context and development',
        'Current challenges and opportunities'
      ],
      preparation: [
        'Review community overview materials',
        'Study local government structure',
        'Research community organizations',
        'Understand transport and infrastructure'
      ]
    },
    {
      id: 'project_management',
      title: 'Project Management',
      icon: '📋',
      description: 'Planning, organizing, and delivering community initiatives',
      skills: [
        'Project planning and timeline development',
        'Budget management and resource allocation',
        'Team coordination and delegation',
        'Risk assessment and mitigation',
        'Monitoring and evaluation methods'
      ],
      preparation: [
        'Prepare examples of projects you\'ve managed',
        'Practice creating project timelines',
        'Review budget planning techniques',
        'Study evaluation frameworks'
      ]
    },
    {
      id: 'safeguarding',
      title: 'Safeguarding & Ethics',
      icon: '🛡️',
      description: 'Protecting vulnerable community members and maintaining ethical standards',
      skills: [
        'Recognizing signs of vulnerability',
        'Appropriate reporting procedures',
        'Confidentiality and data protection',
        'Professional boundaries',
        'Ethical decision-making frameworks'
      ],
      preparation: [
        'Review safeguarding policies',
        'Study GDPR and data protection',
        'Practice ethical scenario responses',
        'Understand reporting procedures'
      ]
    }
  ];

  const formatTimeline = [
    {
      phase: 'Introduction',
      duration: '15 minutes',
      description: 'Meet your assessor, overview of the process, and initial conversation'
    },
    {
      phase: 'Scenario Discussion',
      duration: '30 minutes',
      description: 'Work through practical community scenarios relevant to the Connector role'
    },
    {
      phase: 'Knowledge Assessment',
      duration: '20 minutes',
      description: 'Questions about community knowledge, policies, and procedures'
    },
    {
      phase: 'Experience Review',
      duration: '15 minutes',
      description: 'Discussion of your background, motivations, and relevant experience'
    },
    {
      phase: 'Questions & Next Steps',
      duration: '10 minutes',
      description: 'Your questions answered and explanation of the decision timeline'
    }
  ];

  const preparationChecklist = [
    'Review community demographics and key statistics',
    'Study the Connector handbook and role responsibilities',
    'Practice explaining your motivation for joining',
    'Prepare examples of past community involvement',
    'Research local organizations and stakeholders',
    'Review safeguarding policies and procedures',
    'Practice scenario-based problem solving',
    'Prepare questions about the role and organization',
    'Test your technology (for online assessments)',
    'Plan your journey (for in-person assessments)'
  ];

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const toggleChecklist = (item: string) => {
    setCheckedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const progress = Math.round((checkedItems.length / preparationChecklist.length) * 100);

  return (
    <PageTemplate
      pageTitle="Assessment Preparation Guide"
      pageStrapline="Everything you need to succeed in your Connector assessment"
      pageGuide="Your assessment is a collaborative conversation focused on understanding your skills, knowledge, and approach to community work. This guide will help you prepare effectively."
      pageType="standard"
      showMaya={true}
    >
      <div className={styles.assessmentGuide}>
        
        {/* Stats Overview */}
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>90</div>
            <div className={styles.statLabel}>Minutes</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>5</div>
            <div className={styles.statLabel}>Key Areas</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>85%</div>
            <div className={styles.statLabel}>Pass Rate</div>
          </div>
        </div>

        {/* Assessment Overview */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Assessment Overview</h2>
          <p className={styles.sectionText}>
            Your Connector assessment is designed to evaluate your readiness to support 
            our community effectively. It's a collaborative conversation focused on 
            understanding your skills, knowledge, and approach to community work.
          </p>
        </section>

        {/* Timeline */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Assessment Format</h2>
          <div className={styles.timeline}>
            {formatTimeline.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineMarker}>
                  <span className={styles.phaseNumber}>{index + 1}</span>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.phaseHeader}>
                    <h4>{item.phase}</h4>
                    <span className={styles.duration}>{item.duration}</span>
                  </div>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Assessment Areas */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Assessment Areas</h2>
          <p className={styles.sectionText}>
            Your assessment will cover five key areas. Click each section to explore what we'll be looking for:
          </p>
          
          <div className={styles.areasGrid}>
            {assessmentAreas.map((area) => (
              <div key={area.id} className={styles.areaCard}>
                <div 
                  className={styles.areaHeader}
                  onClick={() => toggleSection(area.id)}
                >
                  <div className={styles.areaIcon}>{area.icon}</div>
                  <div className={styles.areaInfo}>
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                  </div>
                  <div className={`${styles.areaToggle} ${activeSection === area.id ? styles.expanded : ''}`}>
                    ▼
                  </div>
                </div>

                {activeSection === area.id && (
                  <div className={styles.areaContent}>
                    <div className={styles.skillsSection}>
                      <h4>Key Skills Assessed</h4>
                      <ul>
                        {area.skills.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={styles.preparationSection}>
                      <h4>How to Prepare</h4>
                      <ul>
                        {area.preparation.map((prep, index) => (
                          <li key={index}>{prep}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Preparation Checklist */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Preparation Checklist</h2>
          <p className={styles.sectionText}>
            Track your preparation progress:
          </p>
          
          <div className={styles.progressIndicator}>
            <span>Progress: {checkedItems.length}/{preparationChecklist.length} completed ({progress}%)</span>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className={styles.checklist}>
            {preparationChecklist.map((item, index) => (
              <div key={index} className={styles.checklistItem}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(item)}
                    onChange={() => toggleChecklist(item)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.itemText}>{item}</span>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Assessment Tips</h2>
          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <h3>Be Authentic</h3>
              <p>We're looking for genuine passion for community work, not perfect answers.</p>
            </div>
            
            <div className={styles.tipCard}>
              <h3>Think Out Loud</h3>
              <p>Share your thought process when working through scenarios.</p>
            </div>
            
            <div className={styles.tipCard}>
              <h3>Ask Questions</h3>
              <p>Engage with scenarios by asking clarifying questions.</p>
            </div>
            
            <div className={styles.tipCard}>
              <h3>Use Examples</h3>
              <p>Draw on your personal and professional experiences.</p>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Additional Resources</h2>
          <div className={styles.resourcesGrid}>
            <div className={styles.resourceCard}>
              <h3>Study Materials</h3>
              <ul>
                <li><Link to="/community/overview">Community Overview</Link></li>
                <li><Link to="/membership">Connector Handbook</Link></li>
                <li><Link to="/practice-assessment">Sample Scenarios</Link></li>
              </ul>
            </div>
            
            <div className={styles.resourceCard}>
              <h3>Practice Tools</h3>
              <ul>
                <li><Link to="/practice-assessment">Practice Assessment</Link></li>
                <li><Link to="/success-stories">Success Stories</Link></li>
              </ul>
            </div>
            
            <div className={styles.resourceCard}>
              <h3>Support</h3>
              <ul>
                <li>Email: assessments@wembleywonders.org</li>
                <li>Phone: 0208 902 9991</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className={styles.nextSteps}>
          <h2>Ready for Your Assessment?</h2>
          <div className={styles.actionButtons}>
            <Link to="/practice-assessment" className={styles.btnPrimary}>
              Take Practice Assessment
            </Link>
            <Link to="/schedule-assessment" className={styles.btnSecondary}>
              Schedule Real Assessment
            </Link>
            <Link to="/application-dashboard" className={styles.btnOutline}>
              View Application Status
            </Link>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default AssessmentGuidePage;