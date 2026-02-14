// src/pages/WhatYouLearnPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './WhatYouLearnPage.css';

const WhatYouLearnPage: React.FC = () => {
  const programmes = [
    {
      name: 'Raydyo',
      icon: '📻',
      tagline: 'Radio & Media Production',
      skills: ['Audio production', 'Broadcasting', 'Interview techniques', 'Content creation', 'Social media'],
      progression: 'Beginner → Intermediate → Advanced → Mentor'
    },
    {
      name: 'Joystick',
      icon: '🎮',
      tagline: 'Game Development',
      skills: ['Game design', 'Basic coding', 'Level design', 'Storytelling', 'Team collaboration'],
      progression: 'Basics → Build Games → Portfolio → Industry Ready'
    },
    {
      name: 'Pageturners',
      icon: '📚',
      tagline: 'Reading & Literacy',
      skills: ['Critical reading', 'Creative writing', 'Public speaking', 'Analysis', 'Storytelling'],
      progression: 'Reading → Writing → Publishing → Mentoring'
    },
    {
      name: 'Connect',
      icon: '🤝',
      tagline: 'Social Skills & Wellbeing',
      skills: ['Communication', 'Empathy', 'Conflict resolution', 'Self-awareness', 'Relationship building'],
      progression: 'Foundation → Practice → Leadership → Peer Support'
    },
    {
      name: 'The League',
      icon: '👑',
      tagline: 'Leadership Development',
      skills: ['Public speaking', 'Project management', 'Team leadership', 'Decision making', 'Strategic thinking'],
      progression: 'Participant → Leader → Mentor → Programme Designer'
    }
  ];

  const skillCategories = [
    {
      category: 'Technical Skills',
      icon: '🛠️',
      description: 'Industry-standard tools and techniques specific to each programme',
      examples: ['Software proficiency', 'Equipment operation', 'Production workflows', 'Quality standards']
    },
    {
      category: 'Soft Skills',
      icon: '💡',
      description: 'Transferable skills that work in any career or context',
      examples: ['Communication', 'Teamwork', 'Problem solving', 'Time management', 'Adaptability']
    },
    {
      category: 'Life Skills',
      icon: '🌟',
      description: 'Personal development for thriving in work and life',
      examples: ['Confidence', 'Resilience', 'Goal setting', 'Self-advocacy', 'Financial literacy']
    },
    {
      category: 'Career Skills',
      icon: '💼',
      description: 'Employability and professional development',
      examples: ['CV writing', 'Interview skills', 'Networking', 'Portfolio building', 'Work ethic']
    }
  ];

  return (
    <div className="what-you-learn-page">
      <section className="hero-section">
        <h1>What You'll Learn</h1>
        <p>Skills for career, life, and community</p>
      </section>

      <section className="programmes-section">
        <h2>Programme Curriculum</h2>
        <div className="programmes-grid">
          {programmes.map((prog, index) => (
            <div key={index} className="programme-card">
              <div className="prog-icon">{prog.icon}</div>
              <h3>{prog.name}</h3>
              <p className="prog-tagline">{prog.tagline}</p>
              <div className="skills-list">
                <strong>You'll Learn:</strong>
                <ul>
                  {prog.skills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div className="prog-progression">
                <strong>Progression:</strong> {prog.progression}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="skill-categories-section">
        <h2>Four Types of Skills</h2>
        <p className="section-intro">Every programme develops all four skill categories</p>
        <div className="categories-grid">
          {skillCategories.map((cat, index) => (
            <div key={index} className="category-card">
              <div className="cat-icon">{cat.icon}</div>
              <h3>{cat.category}</h3>
              <p>{cat.description}</p>
              <ul>
                {cat.examples.map((ex, idx) => (
                  <li key={idx}>• {ex}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="approach-section">
        <h2>How We Teach</h2>
        <div className="approach-grid">
          <div className="approach-item">
            <h3>🎯 Hands-On Learning</h3>
            <p>Learning by doing. Real projects, real outcomes.</p>
          </div>
          <div className="approach-item">
            <h3>👥 Peer Learning</h3>
            <p>Collaborate, teach each other, grow together.</p>
          </div>
          <div className="approach-item">
            <h3>🎨 Portfolio Building</h3>
            <p>Create work you're proud to show employers/schools.</p>
          </div>
          <div className="approach-item">
            <h3>🌱 Progressive Mastery</h3>
            <p>Start simple, build complexity, achieve excellence.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Start Learning?</h2>
        <p>Choose your programme and begin your journey</p>
        <div className="cta-buttons">
          <Link to="/enroll" className="btn-primary">Enroll Now</Link>
          <Link to="/programmes" className="btn-secondary">Explore Programmes</Link>
        </div>
      </section>
    </div>
  );
};

export default WhatYouLearnPage;