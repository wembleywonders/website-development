/**
 * MILESTONE COACH ROV
 * 
 * Helps creators recognize achievements and set meaningful goals.
 * Progress isn't just about numbers - it's about growth.
 * 
 * Philosophy: Celebrate every win. The journey matters.
 * Small progress compounds into transformation.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState, useMemo } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface MilestoneProfile {
  id: string;
  name: string;
  programme: string;
  joinedAt: string;
  workshopsCompleted: number;
  totalWorkshops: number;
  projectsCompleted: number;
  salesCount: number;
  totalRevenue: number;
  reviewCount: number;
  averageRating: number;
  tokensEarned: number;
  credentials: string[];
  streakDays: number;
}

export interface Milestone {
  id: string;
  category: 'learning' | 'creating' | 'selling' | 'community' | 'growth';
  title: string;
  description: string;
  icon: string;
  requirement: (profile: MilestoneProfile) => boolean;
  celebrationMessage: string;
  nextStep: string;
  tokenReward: number;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline?: string;
  category: 'learning' | 'creating' | 'selling' | 'community';
}

// ============================================================
// MILESTONE DEFINITIONS
// ============================================================

const MILESTONES: Milestone[] = [
  // Learning Milestones
  {
    id: 'first-workshop',
    category: 'learning',
    title: 'First Steps',
    description: 'Complete your first workshop',
    icon: '🎓',
    requirement: (p) => p.workshopsCompleted >= 1,
    celebrationMessage: 'You\'ve started your journey! Every expert was once a beginner.',
    nextStep: 'Keep the momentum - complete workshop 2 this week',
    tokenReward: 10
  },
  {
    id: 'five-workshops',
    category: 'learning',
    title: 'Building Foundations',
    description: 'Complete 5 workshops',
    icon: '📚',
    requirement: (p) => p.workshopsCompleted >= 5,
    celebrationMessage: 'You\'re building solid foundations. The basics are becoming second nature.',
    nextStep: 'Start applying what you\'ve learned to a real project',
    tokenReward: 25
  },
  {
    id: 'halfway-programme',
    category: 'learning',
    title: 'Halfway Hero',
    description: 'Complete 50% of your programme',
    icon: '⭐',
    requirement: (p) => p.workshopsCompleted >= p.totalWorkshops / 2,
    celebrationMessage: 'You\'re halfway there! Your commitment is showing.',
    nextStep: 'The second half is where it all comes together',
    tokenReward: 50
  },
  {
    id: 'programme-complete',
    category: 'learning',
    title: 'Programme Graduate',
    description: 'Complete your full programme',
    icon: '🎖️',
    requirement: (p) => p.workshopsCompleted >= p.totalWorkshops,
    celebrationMessage: 'You did it! You\'ve completed your programme. You\'re ready to create.',
    nextStep: 'Time to put your skills to work in the marketplace',
    tokenReward: 100
  },
  
  // Creating Milestones
  {
    id: 'first-project',
    category: 'creating',
    title: 'Creator',
    description: 'Complete your first project',
    icon: '🎨',
    requirement: (p) => p.projectsCompleted >= 1,
    celebrationMessage: 'You made something! That\'s more than most people ever do.',
    nextStep: 'Add it to your portfolio and start project #2',
    tokenReward: 15
  },
  {
    id: 'five-projects',
    category: 'creating',
    title: 'Prolific Creator',
    description: 'Complete 5 projects',
    icon: '🔥',
    requirement: (p) => p.projectsCompleted >= 5,
    celebrationMessage: 'You\'re building a body of work. Quality and quantity are both improving.',
    nextStep: 'Review your portfolio - which pieces are strongest?',
    tokenReward: 40
  },
  {
    id: 'ten-projects',
    category: 'creating',
    title: 'Portfolio Pro',
    description: 'Complete 10 projects',
    icon: '💎',
    requirement: (p) => p.projectsCompleted >= 10,
    celebrationMessage: 'Ten projects! You have a real portfolio now. You\'re not a beginner anymore.',
    nextStep: 'Time to specialize - what type of work do you enjoy most?',
    tokenReward: 75
  },
  
  // Selling Milestones
  {
    id: 'first-sale',
    category: 'selling',
    title: 'First Sale',
    description: 'Make your first sale',
    icon: '💰',
    requirement: (p) => p.salesCount >= 1,
    celebrationMessage: 'Someone paid for your work! You\'re officially a professional.',
    nextStep: 'Ask for a testimonial while they\'re happy',
    tokenReward: 50
  },
  {
    id: 'five-sales',
    category: 'selling',
    title: 'Consistent Seller',
    description: 'Make 5 sales',
    icon: '📈',
    requirement: (p) => p.salesCount >= 5,
    celebrationMessage: 'Five sales means it wasn\'t a fluke. You\'re building a business.',
    nextStep: 'Review what\'s selling - do more of that',
    tokenReward: 75
  },
  {
    id: 'ten-sales',
    category: 'selling',
    title: 'Established Seller',
    description: 'Make 10 sales',
    icon: '🏆',
    requirement: (p) => p.salesCount >= 10,
    celebrationMessage: 'Double digits! You have a track record now.',
    nextStep: 'Consider raising your prices',
    tokenReward: 100
  },
  {
    id: 'first-hundred',
    category: 'selling',
    title: '£100 Club',
    description: 'Earn £100 total revenue',
    icon: '💵',
    requirement: (p) => p.totalRevenue >= 100,
    celebrationMessage: 'Your first hundred! Real money from your creativity.',
    nextStep: 'What would it take to hit £500?',
    tokenReward: 50
  },
  {
    id: 'five-hundred',
    category: 'selling',
    title: '£500 Milestone',
    description: 'Earn £500 total revenue',
    icon: '💷',
    requirement: (p) => p.totalRevenue >= 500,
    celebrationMessage: '£500 earned! Your skills are generating real income.',
    nextStep: 'Think about scaling - more products or higher prices?',
    tokenReward: 100
  },
  {
    id: 'first-thousand',
    category: 'selling',
    title: '£1000 Creator',
    description: 'Earn £1000 total revenue',
    icon: '🌟',
    requirement: (p) => p.totalRevenue >= 1000,
    celebrationMessage: 'A thousand pounds from your creativity! You have a real side hustle.',
    nextStep: 'Could this become your main income?',
    tokenReward: 200
  },
  
  // Community Milestones
  {
    id: 'first-review',
    category: 'community',
    title: 'Reviewed',
    description: 'Receive your first review',
    icon: '⭐',
    requirement: (p) => p.reviewCount >= 1,
    celebrationMessage: 'Your first review! Social proof is powerful.',
    nextStep: 'Thank them and ask if you can share it',
    tokenReward: 20
  },
  {
    id: 'five-star',
    category: 'community',
    title: 'Five Star Creator',
    description: 'Maintain 5-star average rating',
    icon: '🌟',
    requirement: (p) => p.averageRating >= 5 && p.reviewCount >= 3,
    celebrationMessage: 'Perfect ratings! Your quality is exceptional.',
    nextStep: 'Keep delivering excellence',
    tokenReward: 50
  },
  {
    id: 'community-contributor',
    category: 'community',
    title: 'Community Contributor',
    description: 'Your sales have funded 10+ workshop hours',
    icon: '💚',
    requirement: (p) => (p.totalRevenue * 0.25 / 15) >= 10,
    celebrationMessage: 'Your success has funded 10 hours of free workshops for others!',
    nextStep: 'You\'re making the community stronger',
    tokenReward: 100
  },
  
  // Growth Milestones
  {
    id: 'week-streak',
    category: 'growth',
    title: 'Week Warrior',
    description: '7-day activity streak',
    icon: '🔥',
    requirement: (p) => p.streakDays >= 7,
    celebrationMessage: 'A full week of consistency! Habits are forming.',
    nextStep: 'Can you make it to 14 days?',
    tokenReward: 25
  },
  {
    id: 'month-streak',
    category: 'growth',
    title: 'Monthly Momentum',
    description: '30-day activity streak',
    icon: '🚀',
    requirement: (p) => p.streakDays >= 30,
    celebrationMessage: 'A month of showing up! This is how transformation happens.',
    nextStep: 'You\'re building something real',
    tokenReward: 75
  },
  {
    id: 'token-century',
    category: 'growth',
    title: 'Token Century',
    description: 'Earn 100 WWT tokens',
    icon: '🪙',
    requirement: (p) => p.tokensEarned >= 100,
    celebrationMessage: '100 tokens! Your engagement is being rewarded.',
    nextStep: 'Check what you can redeem them for',
    tokenReward: 0 // Meta - no reward for earning rewards
  }
];

// ============================================================
// GOAL TEMPLATES
// ============================================================

const GOAL_TEMPLATES: Omit<Goal, 'id' | 'currentValue'>[] = [
  {
    title: 'Complete Programme',
    description: 'Finish all workshops in your programme',
    targetValue: 8,
    unit: 'workshops',
    category: 'learning'
  },
  {
    title: 'Build Portfolio',
    description: 'Create projects to showcase your skills',
    targetValue: 5,
    unit: 'projects',
    category: 'creating'
  },
  {
    title: 'First Sale This Month',
    description: 'Make at least one sale',
    targetValue: 1,
    unit: 'sales',
    category: 'selling'
  },
  {
    title: 'Earn £100',
    description: 'Generate revenue from your work',
    targetValue: 100,
    unit: 'GBP',
    category: 'selling'
  },
  {
    title: 'Get Reviews',
    description: 'Collect testimonials from customers',
    targetValue: 3,
    unit: 'reviews',
    category: 'community'
  },
  {
    title: 'Daily Practice',
    description: 'Build a 7-day streak',
    targetValue: 7,
    unit: 'days',
    category: 'learning'
  }
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getAchievedMilestones(profile: MilestoneProfile): Milestone[] {
  return MILESTONES.filter(m => m.requirement(profile));
}

function getNextMilestones(profile: MilestoneProfile): Milestone[] {
  return MILESTONES.filter(m => !m.requirement(profile)).slice(0, 3);
}

function getProgressMessage(profile: MilestoneProfile): string {
  const achieved = getAchievedMilestones(profile).length;
  const total = MILESTONES.length;
  const percent = Math.round((achieved / total) * 100);
  
  if (percent < 10) return "You're just getting started. Every journey begins with a single step.";
  if (percent < 25) return "Building momentum! Keep showing up.";
  if (percent < 50) return "You're making real progress. Stay consistent.";
  if (percent < 75) return "Over halfway there! You're becoming a pro.";
  if (percent < 90) return "Almost there! You're in the top tier.";
  return "You've achieved almost everything. You're an inspiration.";
}

function calculateDaysSinceJoined(joinedAt: string): number {
  const joined = new Date(joinedAt);
  const now = new Date();
  const diff = now.getTime() - joined.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// ============================================================
// COMPONENT
// ============================================================

export interface MilestoneCoachROVProps {
  profile: MilestoneProfile;
  onGoalSet?: (goal: Goal) => void;
  onMilestoneClaim?: (milestone: Milestone) => void;
}

export const MilestoneCoachROV: React.FC<MilestoneCoachROVProps> = ({
  profile,
  onGoalSet,
  onMilestoneClaim
}) => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'goals' | 'journey'>('achievements');
  const [showGoalForm, setShowGoalForm] = useState(false);
  
  const achievedMilestones = useMemo(() => getAchievedMilestones(profile), [profile]);
  const nextMilestones = useMemo(() => getNextMilestones(profile), [profile]);
  const progressMessage = useMemo(() => getProgressMessage(profile), [profile]);
  const daysSinceJoined = useMemo(() => calculateDaysSinceJoined(profile.joinedAt), [profile.joinedAt]);
  
  const milestonesByCategory = useMemo(() => {
    const categories: Record<string, { achieved: Milestone[]; upcoming: Milestone[] }> = {
      learning: { achieved: [], upcoming: [] },
      creating: { achieved: [], upcoming: [] },
      selling: { achieved: [], upcoming: [] },
      community: { achieved: [], upcoming: [] },
      growth: { achieved: [], upcoming: [] }
    };
    
    MILESTONES.forEach(m => {
      if (m.requirement(profile)) {
        categories[m.category].achieved.push(m);
      } else {
        categories[m.category].upcoming.push(m);
      }
    });
    
    return categories;
  }, [profile]);
  
  return (
    <div className="milestone-coach-rov">
      <div className="milestone-coach-rov__header">
        <div className="milestone-coach-rov__avatar">🏆</div>
        <div className="milestone-coach-rov__info">
          <h2>Milestone Coach</h2>
          <span>Track Your Progress</span>
        </div>
      </div>
      
      {/* Profile Summary */}
      <div className="milestone-coach-rov__summary">
        <div className="summary-stats">
          <div className="stat">
            <span className="value">{achievedMilestones.length}</span>
            <span className="label">Milestones</span>
          </div>
          <div className="stat">
            <span className="value">{daysSinceJoined}</span>
            <span className="label">Days</span>
          </div>
          <div className="stat">
            <span className="value">{profile.tokensEarned}</span>
            <span className="label">Tokens</span>
          </div>
          <div className="stat">
            <span className="value">{profile.streakDays}</span>
            <span className="label">Streak</span>
          </div>
        </div>
        <p className="progress-message">{progressMessage}</p>
      </div>
      
      {/* Tabs */}
      <div className="milestone-coach-rov__tabs">
        <button 
          className={activeTab === 'achievements' ? 'active' : ''}
          onClick={() => setActiveTab('achievements')}
        >
          🏆 Achievements
        </button>
        <button 
          className={activeTab === 'goals' ? 'active' : ''}
          onClick={() => setActiveTab('goals')}
        >
          🎯 Goals
        </button>
        <button 
          className={activeTab === 'journey' ? 'active' : ''}
          onClick={() => setActiveTab('journey')}
        >
          📊 Journey
        </button>
      </div>
      
      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="milestone-coach-rov__achievements">
          {/* Next Up */}
          {nextMilestones.length > 0 && (
            <div className="milestone-section">
              <h3>🎯 Next Up</h3>
              <div className="milestone-grid">
                {nextMilestones.map(m => (
                  <div key={m.id} className="milestone-card milestone-card--upcoming">
                    <span className="milestone-icon">{m.icon}</span>
                    <h4>{m.title}</h4>
                    <p>{m.description}</p>
                    <span className="milestone-reward">+{m.tokenReward} WWT</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Achieved */}
          {achievedMilestones.length > 0 && (
            <div className="milestone-section">
              <h3>✅ Achieved ({achievedMilestones.length})</h3>
              <div className="milestone-grid">
                {achievedMilestones.map(m => (
                  <div 
                    key={m.id} 
                    className="milestone-card milestone-card--achieved"
                    onClick={() => onMilestoneClaim?.(m)}
                  >
                    <span className="milestone-icon">{m.icon}</span>
                    <h4>{m.title}</h4>
                    <p className="celebration">{m.celebrationMessage}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="milestone-coach-rov__goals">
          <div className="goals-header">
            <h3>Your Goals</h3>
            <button 
              className="add-goal-btn"
              onClick={() => setShowGoalForm(!showGoalForm)}
            >
              + Set Goal
            </button>
          </div>
          
          {showGoalForm && (
            <div className="goal-templates">
              <h4>Quick Goal Templates</h4>
              <div className="template-grid">
                {GOAL_TEMPLATES.map((template, i) => (
                  <button
                    key={i}
                    className="template-card"
                    onClick={() => {
                      onGoalSet?.({
                        ...template,
                        id: `goal-${Date.now()}`,
                        currentValue: 0
                      });
                      setShowGoalForm(false);
                    }}
                  >
                    <h5>{template.title}</h5>
                    <p>{template.description}</p>
                    <span>Target: {template.targetValue} {template.unit}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="goals-philosophy">
            <h4>💡 Goal Setting Tips</h4>
            <ul>
              <li><strong>Be specific:</strong> "Make 3 sales" beats "make more sales"</li>
              <li><strong>Set deadlines:</strong> Goals without dates are just wishes</li>
              <li><strong>Start small:</strong> Achievable goals build momentum</li>
              <li><strong>Celebrate wins:</strong> Every milestone matters</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Journey Tab */}
      {activeTab === 'journey' && (
        <div className="milestone-coach-rov__journey">
          <h3>Your Journey in {profile.programme}</h3>
          
          {Object.entries(milestonesByCategory).map(([category, data]) => (
            <div key={category} className="journey-category">
              <h4>
                {category === 'learning' && '📚 Learning'}
                {category === 'creating' && '🎨 Creating'}
                {category === 'selling' && '💰 Selling'}
                {category === 'community' && '💚 Community'}
                {category === 'growth' && '🌱 Growth'}
              </h4>
              <div className="journey-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${(data.achieved.length / (data.achieved.length + data.upcoming.length)) * 100}%` 
                    }}
                  />
                </div>
                <span>{data.achieved.length} / {data.achieved.length + data.upcoming.length}</span>
              </div>
              <div className="journey-milestones">
                {data.achieved.map(m => (
                  <span key={m.id} className="journey-badge achieved" title={m.title}>
                    {m.icon}
                  </span>
                ))}
                {data.upcoming.map(m => (
                  <span key={m.id} className="journey-badge upcoming" title={m.title}>
                    {m.icon}
                  </span>
                ))}
              </div>
            </div>
          ))}
          
          <div className="journey-summary">
            <h4>📈 Your Stats</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="label">Workshops</span>
                <span className="value">{profile.workshopsCompleted} / {profile.totalWorkshops}</span>
              </div>
              <div className="stat-item">
                <span className="label">Projects</span>
                <span className="value">{profile.projectsCompleted}</span>
              </div>
              <div className="stat-item">
                <span className="label">Sales</span>
                <span className="value">{profile.salesCount}</span>
              </div>
              <div className="stat-item">
                <span className="label">Revenue</span>
                <span className="value">£{profile.totalRevenue.toFixed(0)}</span>
              </div>
              <div className="stat-item">
                <span className="label">Rating</span>
                <span className="value">
                  {profile.reviewCount > 0 ? `⭐ ${profile.averageRating.toFixed(1)}` : '-'}
                </span>
              </div>
              <div className="stat-item">
                <span className="label">Tokens</span>
                <span className="value">{profile.tokensEarned} WWT</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="milestone-coach-rov__footer">
        <p>
          💚 Progress isn't always linear. Some days you'll leap forward, 
          others you'll rest. Both are part of the journey.
        </p>
      </div>
    </div>
  );
};

// ============================================================
// EXPORTS
// ============================================================

export { MILESTONES, GOAL_TEMPLATES, getAchievedMilestones, getNextMilestones };
export default MilestoneCoachROV;