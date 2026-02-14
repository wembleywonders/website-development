/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * Family Dashboard - Parent Progress View
 * 
 * Shows parents the educational value their children are receiving.
 * Makes the invisible visible - learning disguised as play, revealed as progress.
 * 
 * "What would cost you £1,400 a year in private lessons, 
 *  we provide through the community."
 */

import React, { useState, useEffect } from 'react';
import './family-dashboard.css';

// ============================================
// TYPES
// ============================================

interface ProgrammeProgress {
  programmeId: string;
  programmeName: string;
  programmeIcon: string;
  level: number;
  levelName: string;
  hoursThisMonth: number;
  hoursTotal: number;
  projectsCompleted: number;
  currentModule: string;
  nextMilestone: string;
  percentToNextLevel: number;
  skills: string[];
  equivalentLessons: number; // How many private lessons this equals
}

interface Child {
  id: string;
  name: string;
  age: number;
  avatar: string;
  programmes: ProgrammeProgress[];
  achievements: Achievement[];
  lastActive: Date;
}

interface Achievement {
  id: string;
  name: string;
  icon: string;
  earnedDate: Date;
  description: string;
}

interface FamilyData {
  familyName: string;
  membershipTier: 'community' | 'supporter' | 'patron';
  monthlyContribution: number;
  children: Child[];
  familyAchievements: Achievement[];
  joinedDate: Date;
}

// ============================================
// TUITION VALUE CALCULATOR
// ============================================

const HOURLY_TUITION_RATES: { [key: string]: number } = {
  'trubble-n-bass': 55,      // Music tuition £50-60/hr, avg £55
  'bright-sparks': 45,       // Primary maths/science £40-50/hr
  'stemgeneers': 50,         // STEM tuition £45-55/hr
  'pageturners': 45,         // English tuition £40-50/hr
  'g-tech-casters': 40,      // Media/communication £35-45/hr
  'kaywanas-court': 50,      // Drama/performance £45-55/hr
  'joystick': 35,            // Creative writing/journalism
  'scrap-cat': 30,           // Craft/making workshops
  'techreneurs': 45,         // Business/entrepreneurship
  'money-reset': 40,         // Financial literacy
};

const calculateTuitionValue = (programmes: ProgrammeProgress[]): number => {
  return programmes.reduce((total, prog) => {
    const rate = HOURLY_TUITION_RATES[prog.programmeId] || 40;
    return total + (prog.hoursThisMonth * rate);
  }, 0);
};

const calculateYearlyValue = (programmes: ProgrammeProgress[]): number => {
  return programmes.reduce((total, prog) => {
    const rate = HOURLY_TUITION_RATES[prog.programmeId] || 40;
    return total + (prog.hoursTotal * rate);
  }, 0);
};

// ============================================
// SAMPLE DATA (would come from API)
// ============================================

const SAMPLE_FAMILY: FamilyData = {
  familyName: 'Johnson',
  membershipTier: 'supporter',
  monthlyContribution: 15,
  joinedDate: new Date('2024-09-01'),
  children: [
    {
      id: 'child-1',
      name: 'Marcus',
      age: 14,
      avatar: '👦🏾',
      lastActive: new Date(),
      programmes: [
        {
          programmeId: 'trubble-n-bass',
          programmeName: 'Trubble n Bass',
          programmeIcon: '🎵',
          level: 3,
          levelName: 'Rhythm Master',
          hoursThisMonth: 12,
          hoursTotal: 48,
          projectsCompleted: 8,
          currentModule: 'Chord Progressions',
          nextMilestone: 'Complete Gospel Harmony module',
          percentToNextLevel: 65,
          skills: ['Basic rhythm', 'Drum patterns', 'Scale knowledge', 'Chord basics'],
          equivalentLessons: 8,
        },
        {
          programmeId: 'stemgeneers',
          programmeName: 'STEMgeneers',
          programmeIcon: '🤖',
          level: 2,
          levelName: 'Code Builder',
          hoursThisMonth: 8,
          hoursTotal: 24,
          projectsCompleted: 4,
          currentModule: 'Robot Navigation',
          nextMilestone: 'Build autonomous bot',
          percentToNextLevel: 40,
          skills: ['Basic coding', 'Logic flow', 'Problem solving'],
          equivalentLessons: 5,
        },
        {
          programmeId: 'g-tech-casters',
          programmeName: 'G-Tech Casters',
          programmeIcon: '🎙️',
          level: 1,
          levelName: 'Voice Found',
          hoursThisMonth: 3,
          hoursTotal: 6,
          projectsCompleted: 1,
          currentModule: 'Podcast Basics',
          nextMilestone: 'Record first episode',
          percentToNextLevel: 80,
          skills: ['Speaking clearly', 'Basic audio editing'],
          equivalentLessons: 2,
        },
      ],
      achievements: [
        { id: 'a1', name: 'First Beat', icon: '🥁', earnedDate: new Date('2024-09-15'), description: 'Created first drum pattern' },
        { id: 'a2', name: 'Week Warrior', icon: '🔥', earnedDate: new Date('2024-11-01'), description: '7 days active in a row' },
      ],
    },
    {
      id: 'child-2',
      name: 'Amara',
      age: 11,
      avatar: '👧🏾',
      lastActive: new Date(Date.now() - 86400000), // Yesterday
      programmes: [
        {
          programmeId: 'pageturners',
          programmeName: 'PageTurners',
          programmeIcon: '📚',
          level: 4,
          levelName: 'Story Weaver',
          hoursThisMonth: 15,
          hoursTotal: 62,
          projectsCompleted: 12,
          currentModule: 'Character Development',
          nextMilestone: 'Complete novella draft',
          percentToNextLevel: 30,
          skills: ['Creative writing', 'Story structure', 'Character voice', 'Editing basics'],
          equivalentLessons: 12,
        },
        {
          programmeId: 'kaywanas-court',
          programmeName: "Kaywana's Court",
          programmeIcon: '🎭',
          level: 2,
          levelName: 'Stage Ready',
          hoursThisMonth: 6,
          hoursTotal: 18,
          projectsCompleted: 3,
          currentModule: 'Monologue Performance',
          nextMilestone: 'Showcase performance',
          percentToNextLevel: 55,
          skills: ['Stage presence', 'Voice projection', 'Character work'],
          equivalentLessons: 4,
        },
        {
          programmeId: 'trubble-n-bass',
          programmeName: 'Trubble n Bass',
          programmeIcon: '🎵',
          level: 1,
          levelName: 'First Sounds',
          hoursThisMonth: 4,
          hoursTotal: 4,
          projectsCompleted: 0,
          currentModule: 'Exploring Drums',
          nextMilestone: 'Create first loop',
          percentToNextLevel: 25,
          skills: ['Rhythm awareness'],
          equivalentLessons: 1,
        },
      ],
      achievements: [
        { id: 'a3', name: 'Published Author', icon: '✍️', earnedDate: new Date('2024-10-20'), description: 'Story published in Joystick' },
        { id: 'a4', name: 'Spotlight', icon: '🌟', earnedDate: new Date('2024-11-15'), description: 'First stage performance' },
      ],
    },
    {
      id: 'child-3',
      name: 'Junior',
      age: 7,
      avatar: '👦🏽',
      lastActive: new Date(Date.now() - 172800000), // 2 days ago
      programmes: [
        {
          programmeId: 'bright-sparks',
          programmeName: 'Bright Sparks',
          programmeIcon: '💡',
          level: 2,
          levelName: 'Curious Mind',
          hoursThisMonth: 10,
          hoursTotal: 28,
          projectsCompleted: 6,
          currentModule: 'Number Patterns',
          nextMilestone: 'Complete multiplication games',
          percentToNextLevel: 70,
          skills: ['Number recognition', 'Basic patterns', 'Problem solving'],
          equivalentLessons: 6,
        },
        {
          programmeId: 'trubble-n-bass',
          programmeName: 'Trubble n Bass',
          programmeIcon: '🎵',
          level: 1,
          levelName: 'First Sounds',
          hoursThisMonth: 2,
          hoursTotal: 5,
          projectsCompleted: 1,
          currentModule: 'Play Mode',
          nextMilestone: 'Try all drum kits',
          percentToNextLevel: 40,
          skills: ['Rhythm play'],
          equivalentLessons: 1,
        },
      ],
      achievements: [
        { id: 'a5', name: 'Curious Cat', icon: '🐱', earnedDate: new Date('2024-10-01'), description: 'Tried 3 different programmes' },
      ],
    },
  ],
  familyAchievements: [
    { id: 'fa1', name: 'Learning Family', icon: '🏠', earnedDate: new Date('2024-10-15'), description: 'All children active in same month' },
    { id: 'fa2', name: 'Cross-Pollination', icon: '🌱', earnedDate: new Date('2024-11-01'), description: 'Siblings helping each other learn' },
    { id: 'fa3', name: 'Six Month Strong', icon: '💪', earnedDate: new Date('2025-03-01'), description: '6 months of continuous membership' },
  ],
};

// ============================================
// COMPONENTS
// ============================================

const MembershipBadge: React.FC<{ tier: string; contribution: number }> = ({ tier, contribution }) => {
  const tierConfig = {
    community: { label: 'Community', icon: '🌟', color: '#22c55e' },
    supporter: { label: 'Supporter', icon: '⭐', color: '#f59e0b' },
    patron: { label: 'Patron', icon: '💎', color: '#a855f7' },
  };
  
  const config = tierConfig[tier as keyof typeof tierConfig] || tierConfig.community;
  
  return (
    <div className="membership-badge" style={{ borderColor: config.color }}>
      <span className="badge-icon">{config.icon}</span>
      <div className="badge-info">
        <span className="badge-tier">{config.label} Member</span>
        {contribution > 0 && (
          <span className="badge-contribution">£{contribution}/month</span>
        )}
      </div>
    </div>
  );
};

const ValueDisplay: React.FC<{ 
  monthlyValue: number; 
  yearlyValue: number; 
  contribution: number;
}> = ({ monthlyValue, yearlyValue, contribution }) => {
  const monthlySavings = monthlyValue - contribution;
  const yearlySavings = yearlyValue - (contribution * 12);
  
  return (
    <div className="value-display">
      <h3>Educational Value Received</h3>
      
      <div className="value-cards">
        <div className="value-card">
          <span className="value-label">This Month</span>
          <span className="value-amount">£{monthlyValue.toLocaleString()}</span>
          <span className="value-subtext">in equivalent tuition</span>
        </div>
        
        <div className="value-card">
          <span className="value-label">This Year</span>
          <span className="value-amount">£{yearlyValue.toLocaleString()}</span>
          <span className="value-subtext">total value received</span>
        </div>
        
        <div className="value-card highlight">
          <span className="value-label">You Saved</span>
          <span className="value-amount savings">£{yearlySavings.toLocaleString()}</span>
          <span className="value-subtext">vs private tuition</span>
        </div>
      </div>
      
      <p className="value-explanation">
        Based on average private tuition rates in Brent: Music £50-60/hr, 
        Maths/English £40-50/hr, STEM £45-55/hr
      </p>
    </div>
  );
};

const ProgressRing: React.FC<{ percent: number; size?: number }> = ({ percent, size = 60 }) => {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;
  
  return (
    <svg className="progress-ring" width={size} height={size}>
      <circle
        className="progress-ring-bg"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="progress-ring-fill"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: offset,
        }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="progress-ring-text"
      >
        {percent}%
      </text>
    </svg>
  );
};

const ProgrammeProgressCard: React.FC<{ progress: ProgrammeProgress }> = ({ progress }) => {
  const tuitionValue = progress.hoursThisMonth * (HOURLY_TUITION_RATES[progress.programmeId] || 40);
  
  return (
    <div className="programme-progress-card">
      <div className="programme-header">
        <span className="programme-icon">{progress.programmeIcon}</span>
        <div className="programme-info">
          <h4>{progress.programmeName}</h4>
          <span className="level-badge">Level {progress.level}: {progress.levelName}</span>
        </div>
        <ProgressRing percent={progress.percentToNextLevel} />
      </div>
      
      <div className="programme-stats">
        <div className="stat">
          <span className="stat-value">{progress.hoursThisMonth}</span>
          <span className="stat-label">hours this month</span>
        </div>
        <div className="stat">
          <span className="stat-value">{progress.projectsCompleted}</span>
          <span className="stat-label">projects</span>
        </div>
        <div className="stat highlight">
          <span className="stat-value">£{tuitionValue}</span>
          <span className="stat-label">tuition value</span>
        </div>
      </div>
      
      <div className="programme-current">
        <span className="current-label">Currently learning:</span>
        <span className="current-module">{progress.currentModule}</span>
      </div>
      
      <div className="programme-skills">
        <span className="skills-label">Skills developed:</span>
        <div className="skills-list">
          {progress.skills.map(skill => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
      
      <div className="programme-next">
        <span className="next-label">Next milestone:</span>
        <span className="next-milestone">{progress.nextMilestone}</span>
      </div>
    </div>
  );
};

const ChildCard: React.FC<{ 
  child: Child; 
  expanded: boolean; 
  onToggle: () => void;
}> = ({ child, expanded, onToggle }) => {
  const totalHoursThisMonth = child.programmes.reduce((sum, p) => sum + p.hoursThisMonth, 0);
  const totalHours = child.programmes.reduce((sum, p) => sum + p.hoursTotal, 0);
  const monthlyValue = calculateTuitionValue(child.programmes);
  
  const getActivityStatus = () => {
    const daysSinceActive = Math.floor((Date.now() - child.lastActive.getTime()) / 86400000);
    if (daysSinceActive === 0) return { text: 'Active today', color: '#22c55e' };
    if (daysSinceActive === 1) return { text: 'Active yesterday', color: '#f59e0b' };
    if (daysSinceActive <= 7) return { text: `Active ${daysSinceActive} days ago`, color: '#f59e0b' };
    return { text: `${daysSinceActive} days inactive`, color: '#ef4444' };
  };
  
  const status = getActivityStatus();
  
  return (
    <div className={`child-card ${expanded ? 'expanded' : ''}`}>
      <div className="child-header" onClick={onToggle}>
        <div className="child-identity">
          <span className="child-avatar">{child.avatar}</span>
          <div className="child-info">
            <h3>{child.name}</h3>
            <span className="child-age">Age {child.age}</span>
          </div>
        </div>
        
        <div className="child-summary">
          <div className="summary-stat">
            <span className="summary-value">{totalHoursThisMonth}h</span>
            <span className="summary-label">this month</span>
          </div>
          <div className="summary-stat">
            <span className="summary-value">{child.programmes.length}</span>
            <span className="summary-label">programmes</span>
          </div>
          <div className="summary-stat highlight">
            <span className="summary-value">£{monthlyValue}</span>
            <span className="summary-label">value</span>
          </div>
        </div>
        
        <div className="child-status" style={{ color: status.color }}>
          <span className="status-dot" style={{ background: status.color }}></span>
          {status.text}
        </div>
        
        <button className="expand-btn">
          {expanded ? '▲' : '▼'}
        </button>
      </div>
      
      {expanded && (
        <div className="child-details">
          <div className="child-achievements">
            <h4>Recent Achievements</h4>
            <div className="achievements-row">
              {child.achievements.slice(0, 4).map(achievement => (
                <div key={achievement.id} className="achievement-badge" title={achievement.description}>
                  <span className="achievement-icon">{achievement.icon}</span>
                  <span className="achievement-name">{achievement.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="child-programmes">
            <h4>Programme Progress</h4>
            <div className="programmes-grid">
              {child.programmes.map(prog => (
                <ProgrammeProgressCard key={prog.programmeId} progress={prog} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FamilyAchievements: React.FC<{ achievements: Achievement[] }> = ({ achievements }) => (
  <div className="family-achievements">
    <h3>🏆 Family Achievements</h3>
    <div className="achievements-grid">
      {achievements.map(achievement => (
        <div key={achievement.id} className="family-achievement">
          <span className="achievement-icon">{achievement.icon}</span>
          <div className="achievement-info">
            <span className="achievement-name">{achievement.name}</span>
            <span className="achievement-desc">{achievement.description}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const QuickActions: React.FC = () => (
  <div className="quick-actions">
    <h3>Quick Actions</h3>
    <div className="actions-grid">
      <button className="action-btn">
        <span className="action-icon">📊</span>
        <span>Download Progress Report</span>
      </button>
      <button className="action-btn">
        <span className="action-icon">🎓</span>
        <span>Print Certificates</span>
      </button>
      <button className="action-btn">
        <span className="action-icon">📅</span>
        <span>Book Workshop</span>
      </button>
      <button className="action-btn">
        <span className="action-icon">💬</span>
        <span>Message Mentor</span>
      </button>
    </div>
  </div>
);

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================

const FamilyDashboard: React.FC = () => {
  const [family, setFamily] = useState<FamilyData>(SAMPLE_FAMILY);
  const [expandedChild, setExpandedChild] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'reports'>('overview');
  
  // Calculate totals
  const allProgrammes = family.children.flatMap(child => child.programmes);
  const totalMonthlyHours = allProgrammes.reduce((sum, p) => sum + p.hoursThisMonth, 0);
  const totalYearlyHours = allProgrammes.reduce((sum, p) => sum + p.hoursTotal, 0);
  const monthlyValue = calculateTuitionValue(allProgrammes);
  const yearlyValue = calculateYearlyValue(allProgrammes);
  
  const toggleChild = (childId: string) => {
    setExpandedChild(prev => prev === childId ? null : childId);
  };
  
  return (
    <div className="family-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>The {family.familyName} Family</h1>
          <p className="header-subtitle">
            {family.children.length} {family.children.length === 1 ? 'child' : 'children'} learning with Wembley Wonders
          </p>
        </div>
        
        <MembershipBadge 
          tier={family.membershipTier} 
          contribution={family.monthlyContribution} 
        />
      </header>
      
      <nav className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          Detailed Progress
        </button>
        <button 
          className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
      </nav>
      
      <main className="dashboard-main">
        {activeTab === 'overview' && (
          <>
            <ValueDisplay 
              monthlyValue={monthlyValue}
              yearlyValue={yearlyValue}
              contribution={family.monthlyContribution}
            />
            
            <section className="monthly-summary">
              <h2>This Month</h2>
              <div className="summary-cards">
                <div className="summary-card">
                  <span className="card-icon">⏱️</span>
                  <span className="card-value">{totalMonthlyHours}</span>
                  <span className="card-label">hours of learning</span>
                </div>
                <div className="summary-card">
                  <span className="card-icon">📚</span>
                  <span className="card-value">
                    {allProgrammes.filter(p => p.hoursThisMonth > 0).length}
                  </span>
                  <span className="card-label">active programmes</span>
                </div>
                <div className="summary-card">
                  <span className="card-icon">🎯</span>
                  <span className="card-value">
                    {allProgrammes.reduce((sum, p) => sum + (p.percentToNextLevel > 50 ? 1 : 0), 0)}
                  </span>
                  <span className="card-label">milestones approaching</span>
                </div>
              </div>
            </section>
            
            <section className="children-section">
              <h2>Your Children</h2>
              <div className="children-list">
                {family.children.map(child => (
                  <ChildCard 
                    key={child.id} 
                    child={child}
                    expanded={expandedChild === child.id}
                    onToggle={() => toggleChild(child.id)}
                  />
                ))}
              </div>
            </section>
            
            <FamilyAchievements achievements={family.familyAchievements} />
            
            <QuickActions />
          </>
        )}
        
        {activeTab === 'progress' && (
          <section className="detailed-progress">
            <h2>Detailed Progress</h2>
            {family.children.map(child => (
              <div key={child.id} className="child-progress-section">
                <h3>{child.avatar} {child.name}'s Learning Journey</h3>
                <div className="programmes-grid full-width">
                  {child.programmes.map(prog => (
                    <ProgrammeProgressCard key={prog.programmeId} progress={prog} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
        
        {activeTab === 'reports' && (
          <section className="reports-section">
            <h2>Progress Reports</h2>
            <div className="reports-grid">
              <div className="report-card">
                <h3>📊 Monthly Summary</h3>
                <p>Printable overview of this month's learning across all children</p>
                <button className="report-btn">Generate Report</button>
              </div>
              
              <div className="report-card">
                <h3>🎓 Certificate Pack</h3>
                <p>Print achievement certificates for all milestones reached</p>
                <button className="report-btn">Generate Certificates</button>
              </div>
              
              <div className="report-card">
                <h3>📈 Progress Over Time</h3>
                <p>See how each child's learning has developed</p>
                <button className="report-btn">View Charts</button>
              </div>
              
              <div className="report-card">
                <h3>💰 Value Statement</h3>
                <p>Document showing equivalent private tuition value received</p>
                <button className="report-btn">Download Statement</button>
              </div>
            </div>
            
            <div className="tuition-comparison">
              <h3>What This Would Cost Privately</h3>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Child</th>
                    <th>Programmes</th>
                    <th>Hours (Year)</th>
                    <th>Private Tuition Equivalent</th>
                  </tr>
                </thead>
                <tbody>
                  {family.children.map(child => {
                    const yearlyHours = child.programmes.reduce((sum, p) => sum + p.hoursTotal, 0);
                    const yearlyValue = calculateYearlyValue(child.programmes);
                    return (
                      <tr key={child.id}>
                        <td>{child.avatar} {child.name}</td>
                        <td>{child.programmes.length}</td>
                        <td>{yearlyHours} hours</td>
                        <td className="value-cell">£{yearlyValue.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                  <tr className="total-row">
                    <td colSpan={3}><strong>Total Family Value</strong></td>
                    <td className="value-cell"><strong>£{yearlyValue.toLocaleString()}</strong></td>
                  </tr>
                  <tr className="contribution-row">
                    <td colSpan={3}>Your Annual Contribution</td>
                    <td className="value-cell">£{(family.monthlyContribution * 12).toLocaleString()}</td>
                  </tr>
                  <tr className="savings-row">
                    <td colSpan={3}><strong>Your Savings</strong></td>
                    <td className="value-cell savings">
                      <strong>£{(yearlyValue - family.monthlyContribution * 12).toLocaleString()}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
      
      <footer className="dashboard-footer">
        <p>
          Wembley Wonders CIC • Company No. 12960817 • 
          <a href="/membership">Upgrade Membership</a> • 
          <a href="/contact">Get Support</a>
        </p>
      </footer>
    </div>
  );
};

export default FamilyDashboard;