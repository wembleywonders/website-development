// src/components/admin/CreatorFactoryDashboard.tsx
// Visual dashboard for monitoring Creator Factory KPIs

import React, { useState, useEffect } from 'react';
import {
  Users, TrendingUp, MapPin, DollarSign, Target, Clock,
  Award, ArrowUpRight, ArrowDownRight, Minus, RefreshCw,
  Download, ChevronDown, ChevronUp, Zap, Shield, Heart,
  BarChart3, PieChart, Activity, AlertTriangle, CheckCircle
} from 'lucide-react';
import { metricsService } from '../../services/MetricsService';
import {
  DashboardMetrics,
  GoalProgress,
  CreatorStage,
  IncomeLevel,
  GeographicTier,
  STAGE_ORDER,
  GEOGRAPHIC_LABELS
} from '../../types/metrics';
import './CreatorFactoryDashboard.css';

// ============================================
// HELPER COMPONENTS
// ============================================

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  trend?: { direction: 'up' | 'down' | 'neutral'; value: string };
  highlight?: boolean;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, subtext, trend, highlight, color }) => (
  <div className={`stat-card ${highlight ? 'highlight' : ''}`} style={{ '--card-color': color } as React.CSSProperties}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-content">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      {subtext && <span className="stat-subtext">{subtext}</span>}
      {trend && (
        <span className={`stat-trend ${trend.direction}`}>
          {trend.direction === 'up' && <ArrowUpRight size={14} />}
          {trend.direction === 'down' && <ArrowDownRight size={14} />}
          {trend.direction === 'neutral' && <Minus size={14} />}
          {trend.value}
        </span>
      )}
    </div>
  </div>
);

interface GoalCardProps {
  goal: GoalProgress;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const statusColors = {
    'achieved': '#10b981',
    'on-track': '#3b82f6',
    'at-risk': '#f59e0b',
    'behind': '#ef4444'
  };
  
  const statusIcons = {
    'achieved': <CheckCircle size={16} />,
    'on-track': <TrendingUp size={16} />,
    'at-risk': <AlertTriangle size={16} />,
    'behind': <AlertTriangle size={16} />
  };

  return (
    <div className="goal-card">
      <div className="goal-header">
        <span className="goal-name">{goal.name}</span>
        <span className="goal-status" style={{ color: statusColors[goal.status] }}>
          {statusIcons[goal.status]}
          {goal.status}
        </span>
      </div>
      <div className="goal-progress-bar">
        <div 
          className="goal-progress-fill"
          style={{ 
            width: `${Math.min(goal.percentage, 100)}%`,
            backgroundColor: statusColors[goal.status]
          }}
        />
      </div>
      <div className="goal-numbers">
        <span>{goal.current.toLocaleString()}</span>
        <span className="goal-target">/ {goal.target.toLocaleString()}</span>
        <span className="goal-percentage">{goal.percentage}%</span>
      </div>
    </div>
  );
};

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================

const CreatorFactoryDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [goals, setGoals] = useState<GoalProgress[]>([]);
  const [missionMetrics, setMissionMetrics] = useState<{
    count: number;
    totalMonthlyIncome: number;
    avgIncome: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<1 | 3 | 5>(1);
  const [expandedSection, setExpandedSection] = useState<string | null>('mission');

  useEffect(() => {
    loadData();
  }, [selectedYear]);

  const loadData = async () => {
    setLoading(true);
    await metricsService.refreshData();
    setMetrics(metricsService.getDashboardMetrics());
    setGoals(metricsService.getGoalProgress(selectedYear));
    setMissionMetrics(metricsService.getCreatedCreatorsEarning());
    setLoading(false);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (loading || !metrics || !missionMetrics) {
    return (
      <div className="dashboard-loading">
        <RefreshCw className="spin" size={32} />
        <p>Loading Creator Factory metrics...</p>
      </div>
    );
  }

  const revenue = {
    gmv: metrics.totalPlatformGMV,
    creators: Math.round(metrics.totalPlatformGMV * 0.55),
    community: Math.round(metrics.totalPlatformGMV * 0.25),
    operations: Math.round(metrics.totalPlatformGMV * 0.20)
  };

  return (
    <div className="cf-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Creator Factory Dashboard</h1>
          <p className="header-mission">Goal: CREATE creators who would never have tried</p>
        </div>
        <div className="header-actions">
          <button className="refresh-btn" onClick={loadData}>
            <RefreshCw size={18} />
            Refresh
          </button>
          <button className="export-btn">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </header>

      {/* Mission Impact - The Hero Section */}
      <section className={`dashboard-section mission ${expandedSection === 'mission' ? 'expanded' : ''}`}>
        <div className="section-header" onClick={() => toggleSection('mission')}>
          <div className="section-title">
            <Target size={24} />
            <h2>Mission Impact: Creating Creators</h2>
          </div>
          {expandedSection === 'mission' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        <div className="section-content">
          <div className="mission-hero">
            <div className="mission-stat primary">
              <div className="mission-number">{missionMetrics.count}</div>
              <div className="mission-label">
                People earning who had <strong>ZERO income</strong> before us
              </div>
            </div>
            <div className="mission-details">
              <div className="mission-detail">
                <span className="detail-value">£{Math.round(missionMetrics.avgIncome)}</span>
                <span className="detail-label">avg monthly income</span>
              </div>
              <div className="mission-detail">
                <span className="detail-value">£{missionMetrics.totalMonthlyIncome.toLocaleString()}</span>
                <span className="detail-label">total created monthly</span>
              </div>
              <div className="mission-detail">
                <span className="detail-value">{Math.round(metrics.conversionZeroToEarning)}%</span>
                <span className="detail-label">zero → earning rate</span>
              </div>
            </div>
          </div>

          <div className="mission-comparison">
            <div className="comparison-card them">
              <h4>❌ Competitors Serve</h4>
              <p>The 1-5% who already have audiences, capital, and marketing skills</p>
            </div>
            <div className="comparison-card us">
              <h4>✅ We Serve</h4>
              <p>The forgotten 60% who need training AND marketplace access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Stats Grid */}
      <section className="stats-grid">
        <StatCard
          icon={<Users size={24} />}
          label="Total Creators"
          value={metrics.totalCreators}
          subtext={`${metrics.creatorsFromZero} from zero prior income`}
          color="#3b82f6"
        />
        <StatCard
          icon={<TrendingUp size={24} />}
          label="Now Earning"
          value={metrics.creatorsNowEarning}
          subtext={`${Math.round(metrics.creatorsNowEarning / metrics.totalCreators * 100)}% of active`}
          highlight
          color="#10b981"
        />
        <StatCard
          icon={<MapPin size={24} />}
          label="Brent Local"
          value={`${Math.round(metrics.brentPercentage)}%`}
          subtext="Our competitive moat"
          color="#8b5cf6"
        />
        <StatCard
          icon={<Clock size={24} />}
          label="Days to First Sale"
          value={metrics.avgDaysToFirstSale}
          subtext="avg journey time"
          color="#f59e0b"
        />
      </section>

      {/* Revenue Section */}
      <section className={`dashboard-section revenue ${expandedSection === 'revenue' ? 'expanded' : ''}`}>
        <div className="section-header" onClick={() => toggleSection('revenue')}>
          <div className="section-title">
            <DollarSign size={24} />
            <h2>Revenue & Distribution</h2>
          </div>
          {expandedSection === 'revenue' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        <div className="section-content">
          <div className="revenue-display">
            <div className="revenue-total">
              <span className="revenue-label">Monthly GMV</span>
              <span className="revenue-value">£{revenue.gmv.toLocaleString()}</span>
            </div>
            
            <div className="revenue-breakdown">
              <div className="revenue-split creator">
                <div className="split-bar" style={{ width: '55%' }} />
                <div className="split-info">
                  <span className="split-percent">55%</span>
                  <span className="split-label">Creators</span>
                  <span className="split-value">£{revenue.creators.toLocaleString()}</span>
                </div>
              </div>
              <div className="revenue-split community">
                <div className="split-bar" style={{ width: '25%' }} />
                <div className="split-info">
                  <span className="split-percent">25%</span>
                  <span className="split-label">Community</span>
                  <span className="split-value">£{revenue.community.toLocaleString()}</span>
                </div>
              </div>
              <div className="revenue-split operations">
                <div className="split-bar" style={{ width: '20%' }} />
                <div className="split-info">
                  <span className="split-percent">20%</span>
                  <span className="split-label">Operations</span>
                  <span className="split-value">£{revenue.operations.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="revenue-stats">
            <div className="revenue-stat">
              <span className="rs-value">£{metrics.avgMonthlyIncomePerEarner}</span>
              <span className="rs-label">Avg per earner</span>
            </div>
            <div className="revenue-stat">
              <span className="rs-value">{metrics.totalProductsLive}</span>
              <span className="rs-label">Products live</span>
            </div>
            <div className="revenue-stat">
              <span className="rs-value">{metrics.migrationCount}</span>
              <span className="rs-label">Platform migrations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Journey Funnel */}
      <section className={`dashboard-section funnel ${expandedSection === 'funnel' ? 'expanded' : ''}`}>
        <div className="section-header" onClick={() => toggleSection('funnel')}>
          <div className="section-title">
            <Activity size={24} />
            <h2>Creator Journey Funnel</h2>
          </div>
          {expandedSection === 'funnel' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        <div className="section-content">
          <div className="funnel-stages">
            {STAGE_ORDER.map((stage, index) => {
              const count = metrics.stageDistribution[stage] || 0;
              const percentage = metrics.totalCreators > 0 
                ? (count / metrics.totalCreators * 100) 
                : 0;
              const isEarning = ['earner', 'consistent', 'thriving', 'mentor'].includes(stage);
              
              return (
                <div key={stage} className={`funnel-stage ${isEarning ? 'earning' : ''}`}>
                  <div className="stage-bar-container">
                    <div 
                      className="stage-bar"
                      style={{ width: `${Math.max(percentage * 2, 10)}%` }}
                    />
                  </div>
                  <div className="stage-info">
                    <span className="stage-name">{stage}</span>
                    <span className="stage-count">{count}</span>
                    <span className="stage-percent">{Math.round(percentage)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="funnel-insights">
            <div className="insight">
              <Zap size={16} />
              <span>Biggest drop: Explorer → Learner ({Math.round((metrics.stageDistribution.explorer - metrics.stageDistribution.learner) / metrics.stageDistribution.explorer * 100)}%)</span>
            </div>
            <div className="insight highlight">
              <Award size={16} />
              <span>{metrics.stageDistribution.mentor} creators now mentoring others</span>
            </div>
          </div>
        </div>
      </section>

      {/* Geographic Distribution */}
      <section className={`dashboard-section geo ${expandedSection === 'geo' ? 'expanded' : ''}`}>
        <div className="section-header" onClick={() => toggleSection('geo')}>
          <div className="section-title">
            <MapPin size={24} />
            <h2>Geographic Distribution</h2>
          </div>
          {expandedSection === 'geo' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        <div className="section-content">
          <div className="geo-tiers">
            {(['wembley', 'brent', 'nw-london', 'london', 'uk', 'international'] as GeographicTier[]).map(tier => {
              const count = metrics.geoDistribution[tier] || 0;
              const percentage = metrics.totalCreators > 0 
                ? (count / metrics.totalCreators * 100) 
                : 0;
              const isCore = ['wembley', 'brent'].includes(tier);
              
              return (
                <div key={tier} className={`geo-tier ${isCore ? 'core' : ''}`}>
                  <div className="geo-label">{GEOGRAPHIC_LABELS[tier]}</div>
                  <div className="geo-bar-container">
                    <div 
                      className="geo-bar"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="geo-stats">
                    <span className="geo-count">{count}</span>
                    <span className="geo-percent">{Math.round(percentage)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="geo-insight">
            <Shield size={18} />
            <div>
              <strong>Local Density = Competitive Moat</strong>
              <p>Gumroad/Etsy can't replicate community connections. Our {Math.round(metrics.brentPercentage)}% Brent concentration is an asset, not a limitation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Income Distribution */}
      <section className={`dashboard-section income ${expandedSection === 'income' ? 'expanded' : ''}`}>
        <div className="section-header" onClick={() => toggleSection('income')}>
          <div className="section-title">
            <BarChart3 size={24} />
            <h2>Income Distribution</h2>
          </div>
          {expandedSection === 'income' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        <div className="section-content">
          <div className="income-bars">
            {([
              { level: 'zero', label: '£0', color: '#64748b' },
              { level: 'first-sale', label: '£1-49', color: '#94a3b8' },
              { level: 'side-income', label: '£50-99', color: '#fbbf24' },
              { level: 'meaningful', label: '£100-299', color: '#f59e0b' },
              { level: 'significant', label: '£300-499', color: '#10b981' },
              { level: 'substantial', label: '£500-999', color: '#059669' },
              { level: 'professional', label: '£1000+', color: '#047857' }
            ] as const).map(({ level, label, color }) => {
              const count = metrics.incomeDistribution[level] || 0;
              const maxCount = Math.max(...Object.values(metrics.incomeDistribution));
              const barWidth = maxCount > 0 ? (count / maxCount * 100) : 0;
              
              return (
                <div key={level} className="income-row">
                  <span className="income-label">{label}</span>
                  <div className="income-bar-container">
                    <div 
                      className="income-bar"
                      style={{ width: `${barWidth}%`, backgroundColor: color }}
                    />
                  </div>
                  <span className="income-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section className={`dashboard-section goals ${expandedSection === 'goals' ? 'expanded' : ''}`}>
        <div className="section-header" onClick={() => toggleSection('goals')}>
          <div className="section-title">
            <Target size={24} />
            <h2>Strategic Goals</h2>
          </div>
          {expandedSection === 'goals' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        <div className="section-content">
          <div className="goals-tabs">
            <button 
              className={`goal-tab ${selectedYear === 1 ? 'active' : ''}`}
              onClick={() => setSelectedYear(1)}
            >
              Year 1
            </button>
            <button 
              className={`goal-tab ${selectedYear === 3 ? 'active' : ''}`}
              onClick={() => setSelectedYear(3)}
            >
              Year 3
            </button>
            <button 
              className={`goal-tab ${selectedYear === 5 ? 'active' : ''}`}
              onClick={() => setSelectedYear(5)}
            >
              Year 5
            </button>
          </div>
          
          <div className="goals-grid">
            {goals.map(goal => (
              <GoalCard key={goal.goalId} goal={goal} />
            ))}
          </div>
          
          <div className="goals-summary">
            <div className="summary-item">
              <span className="summary-count">{goals.filter(g => g.status === 'achieved').length}</span>
              <span className="summary-label">Achieved</span>
            </div>
            <div className="summary-item">
              <span className="summary-count">{goals.filter(g => g.status === 'on-track').length}</span>
              <span className="summary-label">On Track</span>
            </div>
            <div className="summary-item">
              <span className="summary-count">{goals.filter(g => g.status === 'at-risk').length}</span>
              <span className="summary-label">At Risk</span>
            </div>
            <div className="summary-item">
              <span className="summary-count">{goals.filter(g => g.status === 'behind').length}</span>
              <span className="summary-label">Behind</span>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Position */}
      <section className={`dashboard-section competitive ${expandedSection === 'competitive' ? 'expanded' : ''}`}>
        <div className="section-header" onClick={() => toggleSection('competitive')}>
          <div className="section-title">
            <Shield size={24} />
            <h2>Competitive Position</h2>
          </div>
          {expandedSection === 'competitive' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        <div className="section-content">
          <div className="competitive-grid">
            <div className="competitive-card">
              <h4>vs Gumroad</h4>
              <div className="comp-row">
                <span>Creator share</span>
                <span className="us">55%</span>
                <span className="them">~90% (after fees)</span>
              </div>
              <div className="comp-row">
                <span>Training</span>
                <span className="us">8 programmes</span>
                <span className="them">None</span>
              </div>
              <div className="comp-row">
                <span>Community</span>
                <span className="us">Local, mentored</span>
                <span className="them">Global, anonymous</span>
              </div>
            </div>
            
            <div className="competitive-card">
              <h4>vs Teachable</h4>
              <div className="comp-row">
                <span>Entry cost</span>
                <span className="us">£25/mo flat</span>
                <span className="them">£30-250/mo + fees</span>
              </div>
              <div className="comp-row">
                <span>Market access</span>
                <span className="us">Built-in Cyberstore</span>
                <span className="them">Bring your own</span>
              </div>
              <div className="comp-row">
                <span>Structure</span>
                <span className="us">CIC (non-exploitative)</span>
                <span className="them">VC-backed</span>
              </div>
            </div>
          </div>
          
          <div className="moat-statement">
            <Heart size={20} />
            <p>
              <strong>Our moat:</strong> We CREATE creators. They only serve existing ones.
              {metrics.creatorsFromZero} people earning with us who had zero income before.
              Competitors can't replicate local community + training + marketplace.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>Last updated: {new Date().toLocaleString()}</p>
        <p>Ask Maya for detailed reports: "Maya, show me the income analysis" or "Maya, how are we doing on Year 1 goals?"</p>
      </footer>
    </div>
  );
};

export default CreatorFactoryDashboard;