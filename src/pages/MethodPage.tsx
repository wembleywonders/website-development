// src/pages/MethodPage.tsx
// SUPPORTING PAGE - Explains our unique methodology
// This is WHY we achieve 80% engagement vs 30% industry average

import React from 'react';
import { Link } from 'react-router-dom';
import './MethodPage.css';

const MethodPage: React.FC = () => {
  const foundationLayers = [
    {
      layer: 1,
      name: 'Emotional Safety',
      icon: '🛡️',
      description: 'Before we teach anything, participants must feel safe. Safe to fail, safe to ask questions, safe to be themselves.',
      why: 'Without emotional safety, learning is impossible. The brain shuts down when it feels threatened.',
      how: [
        'Small group sizes (max 15)',
        'Consistent facilitators',
        'No judgment zone policy',
        'Celebration of mistakes as learning',
        'Trauma-informed approaches'
      ],
      outcome: 'Participants show up, engage, take risks'
    },
    {
      layer: 2,
      name: 'Social Connection',
      icon: '🤝',
      description: 'Humans are social beings. Connection to peers and mentors must come before skills development.',
      why: 'We stay where we belong. If participants feel connected, they persist through challenges.',
      how: [
        'Icebreakers and team building',
        'Peer mentoring systems',
        'Group projects over individual work',
        'Community events and celebrations',
        'Long-term relationships (not one-off workshops)'
      ],
      outcome: '85% attend 80%+ of sessions'
    },
    {
      layer: 3,
      name: 'Cultural Relevance',
      icon: '🌍',
      description: 'Content must reflect participants\' lived experiences and cultural contexts. Not generic, but specific.',
      why: 'When young people see themselves in the curriculum, they engage. When they don\'t, they check out.',
      how: [
        'Facilitators from similar backgrounds',
        'Content that reflects local culture',
        'Music, language, references they know',
        'Address real community issues',
        'Co-create content with participants'
      ],
      outcome: 'Participants feel seen and valued'
    },
    {
      layer: 4,
      name: 'Skills Development',
      icon: '🎯',
      description: 'Only NOW do we teach technical skills. With the foundation in place, skills stick and growth accelerates.',
      why: 'Skills without foundation don\'t transfer. With foundation, participants learn faster and retain longer.',
      how: [
        'Hands-on, project-based learning',
        'Progression from basics to advanced',
        'Real-world applications',
        'Industry-standard tools and techniques',
        'Portfolio development'
      ],
      outcome: 'Participants gain employable skills'
    }
  ];

  const traditionalVsUs = {
    traditional: {
      approach: 'Skills First (Traditional)',
      steps: [
        '1. Teach technical skills immediately',
        '2. Hope participants are motivated',
        '3. Wonder why 70% drop out',
        '4. Blame "disengaged youth"'
      ],
      result: '30% completion rate',
      problem: 'Ignores human needs - treats learning like a transaction'
    },
    ours: {
      approach: 'Foundation Before Skills (Ours)',
      steps: [
        '1. Build emotional safety first',
        '2. Facilitate social connection',
        '3. Ensure cultural relevance',
        '4. THEN teach technical skills'
      ],
      result: '80% completion rate',
      strength: 'Honors human needs - treats learning like relationship building'
    }
  };

  const whyItWorks = [
    {
      principle: 'Maslow Before Bloom',
      icon: '🔺',
      explanation: 'You can\'t reach cognitive learning (Bloom\'s Taxonomy) until basic human needs are met (Maslow\'s Hierarchy).',
      application: 'We address safety, belonging, and esteem BEFORE knowledge and skills.'
    },
    {
      principle: 'Relationship Over Content',
      icon: '❤️',
      explanation: 'Research shows: Students don\'t learn from people they don\'t trust. Connection enables learning.',
      application: 'We invest time building relationships before pushing curriculum.'
    },
    {
      principle: 'Context Over Curriculum',
      icon: '🎭',
      explanation: 'Learning happens when new information connects to existing knowledge. Generic content doesn\'t connect.',
      application: 'We tailor every programme to participants\' lived experiences.'
    },
    {
      principle: 'Process Over Product',
      icon: '🛤️',
      explanation: 'The journey matters more than the destination. Growth happens in the struggle, not just the achievement.',
      application: 'We celebrate effort, progress, and resilience - not just final products.'
    }
  ];

  const realWorldExample = {
    scenario: 'Teaching Radio Production (Raydyo Programme)',
    traditional: {
      approach: 'Traditional Skills-First Approach',
      week1: 'Week 1: Here\'s a microphone, here\'s audio software, make a podcast',
      week2: 'Week 2: Why aren\'t you trying? This is a great opportunity!',
      week4: 'Week 4: Half the group stopped showing up',
      week8: 'Week 8: Only 3 of 15 complete the programme',
      result: '20% completion rate'
    },
    ours: {
      approach: 'Foundation Before Skills Approach',
      week1: 'Week 1-2: Ice breakers, team building, share music we love, talk about why radio matters',
      week3: 'Week 3-4: Create group identity, design logo, write manifesto, build trust',
      week5: 'Week 5-6: Explore audio as art form, cultural context of radio, visit real radio station',
      week7: 'Week 7+: NOW introduce technical skills - but foundation is solid',
      result: '85% completion rate, participants push themselves because they belong'
    }
  };

  const evidenceBase = [
    {
      source: 'Neuroscience',
      finding: 'Amygdala hijack prevents learning when safety is threatened',
      citation: 'Polyvagal Theory (Porges, 2011)',
      implication: 'Emotional safety must come first'
    },
    {
      source: 'Educational Psychology',
      finding: 'Belongingness is a prerequisite for academic achievement',
      citation: 'Self-Determination Theory (Deci & Ryan)',
      implication: 'Social connection enables learning'
    },
    {
      source: 'Cultural Psychology',
      finding: 'Cultural mismatch reduces engagement and performance',
      citation: 'Stereotype Threat Research (Steele & Aronson)',
      implication: 'Cultural relevance matters critically'
    },
    {
      source: 'Youth Development',
      finding: 'Positive youth development requires safe relationships',
      citation: '40 Developmental Assets Framework (Search Institute)',
      implication: 'Foundation must precede skills'
    }
  ];

  return (
    <div className="method-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Foundation Before Skills
          </h1>
          <p className="hero-subtitle">
            Why we achieve 80% engagement when the industry averages 30%
          </p>
          <div className="hero-stat">
            <div className="stat-visual">
              <div className="stat-bar industry">
                <span className="stat-label">Industry Average</span>
                <span className="stat-value">30%</span>
              </div>
              <div className="stat-bar wembley">
                <span className="stat-label">Wembley Wonders</span>
                <span className="stat-value">80%</span>
              </div>
            </div>
            <p className="stat-caption">Programme completion rates - we're 2.6x better</p>
          </div>
        </div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section className="problem-section">
        <div className="section-header">
          <h2>The Problem with Traditional Youth Programmes</h2>
          <p>Most programmes fail because they get the order wrong</p>
        </div>

        <div className="comparison-grid">
          <div className="comparison-card traditional">
            <h3>{traditionalVsUs.traditional.approach}</h3>
            <div className="steps">
              {traditionalVsUs.traditional.steps.map((step, index) => (
                <div key={index} className="step">{step}</div>
              ))}
            </div>
            <div className="result negative">
              Result: {traditionalVsUs.traditional.result}
            </div>
            <div className="problem">
              Problem: {traditionalVsUs.traditional.problem}
            </div>
          </div>

          <div className="comparison-card ours">
            <h3>{traditionalVsUs.ours.approach}</h3>
            <div className="steps">
              {traditionalVsUs.ours.steps.map((step, index) => (
                <div key={index} className="step">{step}</div>
              ))}
            </div>
            <div className="result positive">
              Result: {traditionalVsUs.ours.result}
            </div>
            <div className="strength">
              Why: {traditionalVsUs.ours.strength}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDATION LAYERS SECTION */}
      <section className="layers-section">
        <div className="section-header">
          <h2>The Four Layers of Foundation</h2>
          <p>Built in order - each layer enables the next</p>
        </div>

        <div className="layers-container">
          {foundationLayers.map((layer) => (
            <div key={layer.layer} className="layer-card">
              <div className="layer-header">
                <div className="layer-number">Layer {layer.layer}</div>
                <div className="layer-icon">{layer.icon}</div>
                <h3 className="layer-name">{layer.name}</h3>
              </div>

              <p className="layer-description">{layer.description}</p>

              <div className="layer-why">
                <strong>Why this matters:</strong> {layer.why}
              </div>

              <div className="layer-how">
                <strong>How we do it:</strong>
                <ul>
                  {layer.how.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="layer-outcome">
                <strong>Outcome:</strong> {layer.outcome}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY IT WORKS SECTION */}
      <section className="principles-section">
        <div className="section-header">
          <h2>The Science Behind Our Approach</h2>
          <p>Evidence-based principles that drive results</p>
        </div>

        <div className="principles-grid">
          {whyItWorks.map((principle, index) => (
            <div key={index} className="principle-card">
              <div className="principle-icon">{principle.icon}</div>
              <h3>{principle.principle}</h3>
              <p className="principle-explanation">{principle.explanation}</p>
              <div className="principle-application">
                <strong>In practice:</strong> {principle.application}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REAL WORLD EXAMPLE SECTION */}
      <section className="example-section">
        <div className="section-header">
          <h2>Real-World Example: Teaching Radio Production</h2>
          <p>Same programme, different approach, dramatically different results</p>
        </div>

        <div className="example-comparison">
          <div className="example-card">
            <h3>{realWorldExample.traditional.approach}</h3>
            <div className="timeline">
              <div className="timeline-item">{realWorldExample.traditional.week1}</div>
              <div className="timeline-item">{realWorldExample.traditional.week2}</div>
              <div className="timeline-item">{realWorldExample.traditional.week4}</div>
              <div className="timeline-item">{realWorldExample.traditional.week8}</div>
            </div>
            <div className="example-result negative">
              {realWorldExample.traditional.result}
            </div>
          </div>

          <div className="example-card highlight">
            <h3>{realWorldExample.ours.approach}</h3>
            <div className="timeline">
              <div className="timeline-item">{realWorldExample.ours.week1}</div>
              <div className="timeline-item">{realWorldExample.ours.week3}</div>
              <div className="timeline-item">{realWorldExample.ours.week5}</div>
              <div className="timeline-item">{realWorldExample.ours.week7}</div>
            </div>
            <div className="example-result positive">
              {realWorldExample.ours.result}
            </div>
          </div>
        </div>
      </section>

      {/* EVIDENCE BASE SECTION */}
      <section className="evidence-section">
        <div className="section-header">
          <h2>Evidence Base</h2>
          <p>Our approach is grounded in research</p>
        </div>

        <div className="evidence-grid">
          {evidenceBase.map((evidence, index) => (
            <div key={index} className="evidence-card">
              <h4>{evidence.source}</h4>
              <p className="finding">{evidence.finding}</p>
              <p className="citation">{evidence.citation}</p>
              <div className="implication">
                <strong>Implication:</strong> {evidence.implication}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KEY TAKEAWAYS SECTION */}
      <section className="takeaways-section">
        <div className="section-header">
          <h2>Key Takeaways</h2>
        </div>

        <div className="takeaways-content">
          <div className="takeaway">
            <span className="takeaway-number">1</span>
            <div className="takeaway-text">
              <h3>Foundation Comes First</h3>
              <p>Emotional safety, social connection, and cultural relevance must be established before teaching technical skills.</p>
            </div>
          </div>

          <div className="takeaway">
            <span className="takeaway-number">2</span>
            <div className="takeaway-text">
              <h3>Relationships Enable Learning</h3>
              <p>Young people learn from people they trust. We invest heavily in building authentic relationships.</p>
            </div>
          </div>

          <div className="takeaway">
            <span className="takeaway-number">3</span>
            <div className="takeaway-text">
              <h3>Context Matters</h3>
              <p>Generic curriculum disengages. We tailor every programme to participants' lived experiences and cultural contexts.</p>
            </div>
          </div>

          <div className="takeaway">
            <span className="takeaway-number">4</span>
            <div className="takeaway-text">
              <h3>Process Over Product</h3>
              <p>The journey is the destination. We celebrate growth, effort, and resilience - not just final achievements.</p>
            </div>
          </div>

          <div className="takeaway">
            <span className="takeaway-number">5</span>
            <div className="takeaway-text">
              <h3>Results Speak</h3>
              <p>80% completion rate vs 30% industry average. Our approach works because it honors human needs first.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Experience Foundation Before Skills</h2>
          <p>See our methodology in action. Enroll in one of our programmes.</p>
          <div className="cta-buttons">
            <Link to="/enroll" className="btn-primary">Enroll Now</Link>
            <Link to="/programmes" className="btn-secondary">Explore Programmes</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MethodPage;