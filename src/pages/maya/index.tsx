import React, { useState } from 'react';
import MayaCrisisIntegration from '../../integrations/MayaCrisisIntegration';

const MayaPage: React.FC = () => {
  const [demoMode, setDemoMode] = useState('normal');
  const [userScenario, setUserScenario] = useState('');

  const crisisLevels = [
    {
      level: 'normal',
      title: 'Normal Support Mode',
      description: 'General community guidance, pathway recommendations, and accessibility assistance.',
      mayaBehavior: 'Friendly, informative, focused on connecting users to appropriate community resources and 5Cs pathways.',
      examples: [
        'Helping residents navigate digital services',
        'Providing cultural guidance for heritage projects',
        'Offering pathway recommendations based on interests',
        'Accessibility support for different learning styles'
      ]
    },
    {
      level: 'support',
      title: 'Support Mode',
      description: 'Enhanced emotional support and resource coordination for residents experiencing challenges.',
      mayaBehavior: 'More attentive to emotional cues, proactive in offering support resources, emphasis on community connection.',
      examples: [
        'Guiding residents through benefit application processes',
        'Connecting people with local mental health resources',
        'Facilitating peer support group connections',
        'Providing patient assistance with complex digital tasks'
      ]
    },
    {
      level: 'crisis',
      title: 'Crisis Mode',
      description: 'Immediate crisis intervention with emergency escalation protocols and intensive support coordination.',
      mayaBehavior: 'Priority focus on safety, direct connection to emergency services, simplified communication, continuous monitoring.',
      examples: [
        'Mental health crisis intervention and professional referral',
        'Domestic violence support and safety planning',
        'Housing emergency assistance and emergency accommodation',
        'Medical emergency coordination with NHS services'
      ]
    }
  ];

  const technicalCapabilities = [
    {
      capability: 'Crisis Detection Algorithms',
      description: 'Pattern recognition systems that identify distress signals in user communication.',
      implementation: 'Natural language processing trained on community-specific crisis indicators',
      limitations: 'Cannot replace human judgment for complex situations requiring nuanced understanding'
    },
    {
      capability: 'Cultural Intelligence Framework',
      description: 'Contextual awareness of Wembley Central community demographics and cultural considerations.',
      implementation: 'Knowledge base incorporating local community research and cultural sensitivity training',
      limitations: 'Requires ongoing community input to remain accurate and respectful'
    },
    {
      capability: 'Accessibility Adaptation',
      description: 'Multiple communication modes to accommodate different disabilities and digital comfort levels.',
      implementation: 'Voice interfaces, simplified text options, visual aids, and pace adjustment',
      limitations: 'Physical accessibility barriers require human intervention and community support'
    },
    {
      capability: 'Resource Coordination',
      description: 'Connections to local services, community programs, and emergency support systems.',
      implementation: 'Database of verified local resources with real-time availability and contact information',
      limitations: 'Effectiveness depends on active partnerships with service providers and regular updates'
    }
  ];

  const communityIntegration = [
    {
      integration: '5Cs Framework Navigation',
      description: 'Maya guides users through CONNECT, CREATE, CULTIVATE, CHANGE, and COMPETE pathways based on individual needs and community engagement level.',
      practicalExample: 'A resident interested in preserving family photos gets guided from CONNECT community activities to CREATE digitization projects to CULTIVATE mentoring others.'
    },
    {
      integration: 'Heritage Preservation Support',
      description: 'Cultural sensitivity guidance and practical coordination for community heritage projects.',
      practicalExample: 'Maya helps Derek coordinate with residents on heritage projects while ensuring cultural appropriate and privacy considerations are addressed.'
    },
    {
      integration: 'Peer Support Network Facilitation',
      description: 'Connection of community members with complementary skills and mutual support needs.',
      practicalExample: 'Maya connects a resident comfortable with technology to someone needing digital skills support, creating reciprocal learning relationships.'
    }
  ];

  const limitationsAndSafeguards = [
    {
      category: 'Technical Limitations',
      limitations: [
        'Cannot physically assist with practical tasks requiring human intervention',
        'Language processing may miss subtle cultural context without community feedback',
        'Internet connectivity issues can interrupt crisis support availability',
        'Database accuracy depends on regular manual updates from community coordinators'
      ]
    },
    {
      category: 'Ethical Boundaries',
      limitations: [
        'Cannot replace professional mental health treatment or medical advice',
        'Will not make decisions about complex family or legal situations',
        'Cannot provide financial advice or handle monetary transactions',
        'Must escalate to human coordinators for situations requiring nuanced judgment'
      ]
    },
    {
      category: 'Community Accountability',
      limitations: [
        'Maya recommendations must align with community-determined priorities and values',
        'Crisis intervention protocols require community input and regular review',
        'Resource recommendations need ongoing validation from local service providers',
        'Cultural guidance requires continuous community education and feedback mechanisms'
      ]
    }
  ];

  const handleDemoInteraction = (scenario: string) => {
    setUserScenario(scenario);
    console.log(`Demo scenario selected: ${scenario}`);
  };

  return (
    <div className="min-h-screen">
      <div className="animated-bg">
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
      </div>
      
      
      <main className="maya-main">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-badge fade-in">
              <span>🤖</span>
              Maya Crisis Integration System
            </div>
            
            <h1 className="hero-title fade-in">
              AI-Powered Community Support Across All 5Cs
            </h1>
            
            <p className="hero-subtitle fade-in">
              Maya provides crisis intervention, accessibility assistance, and pathway guidance integrated throughout your community engagement journey. Designed for Wembley Central's specific needs and cultural context.
            </p>
          </div>
        </section>

        <section className="framework-section">
          <div className="framework-content">
            <div className="section-header fade-in">
              <h2 className="section-title">How Maya Works</h2>
              <p className="section-subtitle">
                Maya adapts to different crisis levels while maintaining consistent support for community engagement and skill development pathways.
              </p>
            </div>

            <div className="crisis-levels-section">
              <h3 className="section-title">Crisis Response Levels</h3>
              <div className="levels-grid">
                {crisisLevels.map((level) => (
                  <div key={level.level} className="level-card fade-in">
                    <div className="level-indicator" data-level={level.level}></div>
                    <h4 className="level-title">{level.title}</h4>
                    <p className="level-description">{level.description}</p>
                    
                    <div className="level-behavior">
                      <h5>Maya's Behavior</h5>
                      <p>{level.mayaBehavior}</p>
                    </div>
                    
                    <div className="level-examples">
                      <h5>Example Support</h5>
                      <ul>
                        {level.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      className="btn btn-secondary level-btn"
                      onClick={() => setDemoMode(level.level)}
                    >
                      See {level.title} Demo
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="demo-section">
              <h3 className="section-title">Interactive Maya Demo</h3>
              <div className="demo-container">
                <MayaCrisisIntegration 
                  currentLanguage="en"
                  crisisLevel={demoMode as 'normal' | 'support' | 'crisis'}
                  userCommunity="wembley-central"
                />
                <div className="demo-controls">
                  <p>Current Mode: <strong>{demoMode.toUpperCase()}</strong></p>
                  <div className="scenario-buttons">
                    <button onClick={() => handleDemoInteraction('heritage-help')}>
                      Ask about heritage preservation
                    </button>
                    <button onClick={() => handleDemoInteraction('skills-guidance')}>
                      Request pathway guidance
                    </button>
                    <button onClick={() => handleDemoInteraction('support-needed')}>
                      Express need for support
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="technical-section">
              <h3 className="section-title">Technical Capabilities</h3>
              <div className="capabilities-grid">
                {technicalCapabilities.map((tech, index) => (
                  <div key={index} className="capability-card">
                    <h4 className="capability-title">{tech.capability}</h4>
                    <p className="capability-description">{tech.description}</p>
                    <div className="capability-implementation">
                      <strong>Implementation:</strong> {tech.implementation}
                    </div>
                    <div className="capability-limitations">
                      <strong>Limitations:</strong> {tech.limitations}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="integration-section">
              <h3 className="section-title">Community Integration</h3>
              <div className="integration-grid">
                {communityIntegration.map((integration, index) => (
                  <div key={index} className="integration-card">
                    <h4 className="integration-title">{integration.integration}</h4>
                    <p className="integration-description">{integration.description}</p>
                    <div className="integration-example">
                      <strong>Practical Example:</strong> {integration.practicalExample}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="limitations-section">
              <h3 className="section-title">Limitations and Safeguards</h3>
              <div className="limitations-grid">
                {limitationsAndSafeguards.map((category, index) => (
                  <div key={index} className="limitations-card">
                    <h4 className="limitations-category">{category.category}</h4>
                    <ul className="limitations-list">
                      {category.limitations.map((limitation, i) => (
                        <li key={i}>{limitation}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="accountability-section">
              <h3 className="section-title">Community Accountability</h3>
              <div className="accountability-content">
                <p>Maya operates under community oversight through democratic governance mechanisms. Crisis intervention protocols are reviewed annually by community members, with input from mental health professionals and local service providers.</p>
                <p>All Maya interactions prioritize community-determined values and maintain transparency about AI limitations. Emergency escalation procedures connect directly to established local services rather than external commercial platforms.</p>
                <div className="accountability-mechanisms">
                  <div className="mechanism">
                    <strong>Monthly Review Sessions:</strong> Community feedback on Maya's effectiveness and cultural appropriateness
                  </div>
                  <div className="mechanism">
                    <strong>Professional Oversight:</strong> Mental health professionals review crisis intervention protocols quarterly
                  </div>
                  <div className="mechanism">
                    <strong>Democratic Updates:</strong> Community votes on changes to Maya's response protocols and resource recommendations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MayaPage;
