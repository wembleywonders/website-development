/**
 * TRANSPARENCY DASHBOARD
 * 
 * Public view of the Community Fund showing:
 * - Total collected
 * - How it's been allocated
 * - Impact achieved
 * - Bitcoin reserve status
 * 
 * This is WW's answer to "where does my money go?"
 * Complete transparency, verifiable on-chain.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState, useMemo } from 'react';
import type {
  TreasurySummary,
  TreasuryAllocation,
  ImpactSummary,
  AllocationTarget,
  GovernanceProposal
} from '../types';
import { TREASURY_CONFIG } from '../types';
import './TransparencyDashboard.css';

export interface TransparencyDashboardProps {
  summary: TreasurySummary;
  allocations: TreasuryAllocation[];
  proposals: GovernanceProposal[];
  btcPrice?: number;
  onViewAllocation?: (allocation: TreasuryAllocation) => void;
  onViewProposal?: (proposal: GovernanceProposal) => void;
}

const ALLOCATION_LABELS: Record<AllocationTarget, { label: string; icon: string; color: string }> = {
  'youth-workshops': { label: 'Youth Workshops', icon: '🎓', color: '#8B5CF6' },
  'equipment-purchase': { label: 'Equipment', icon: '🎸', color: '#3B82F6' },
  'venue-hire': { label: 'Venue Hire', icon: '🏢', color: '#10B981' },
  'mentor-stipends': { label: 'Mentor Stipends', icon: '👨‍🏫', color: '#F59E0B' },
  'community-events': { label: 'Community Events', icon: '🎉', color: '#EC4899' },
  'hardship-fund': { label: 'Hardship Fund', icon: '🤝', color: '#EF4444' },
  'bitcoin-reserve': { label: 'Bitcoin Reserve', icon: '₿', color: '#F7931A' }
};

export const TransparencyDashboard: React.FC<TransparencyDashboardProps> = ({
  summary,
  allocations,
  proposals,
  btcPrice,
  onViewAllocation,
  onViewProposal
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'allocations' | 'impact' | 'governance'>('overview');
  
  const allocationPercentages = useMemo(() => {
    if (summary.totalAllocated === 0) return {};
    return Object.entries(summary.allocationBreakdown).reduce((acc, [key, value]) => {
      acc[key as AllocationTarget] = (value / summary.totalAllocated) * 100;
      return acc;
    }, {} as Record<AllocationTarget, number>);
  }, [summary]);
  
  const btcValue = btcPrice && summary.btcHoldings 
    ? summary.btcHoldings * btcPrice 
    : 0;

  return (
    <div className="transparency-dash">
      {/* Header */}
      <div className="transparency-dash__header">
        <div className="transparency-dash__title-section">
          <h1 className="transparency-dash__title">💚 Community Fund</h1>
          <p className="transparency-dash__subtitle">
            Every purchase supports Wembley's young creators. Here's exactly where your money goes.
          </p>
        </div>
        
        <div className="transparency-dash__live-total">
          <span className="transparency-dash__live-label">Total Collected</span>
          <span className="transparency-dash__live-amount">
            £{summary.totalCollected.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="transparency-dash__tabs">
        <button 
          className={`transparency-dash__tab ${activeTab === 'overview' ? 'transparency-dash__tab--active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`transparency-dash__tab ${activeTab === 'allocations' ? 'transparency-dash__tab--active' : ''}`}
          onClick={() => setActiveTab('allocations')}
        >
          Allocations
        </button>
        <button 
          className={`transparency-dash__tab ${activeTab === 'impact' ? 'transparency-dash__tab--active' : ''}`}
          onClick={() => setActiveTab('impact')}
        >
          Impact
        </button>
        <button 
          className={`transparency-dash__tab ${activeTab === 'governance' ? 'transparency-dash__tab--active' : ''}`}
          onClick={() => setActiveTab('governance')}
        >
          Governance
        </button>
      </div>
      
      {/* Content */}
      <div className="transparency-dash__content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="transparency-dash__overview">
            {/* Key Metrics */}
            <div className="transparency-dash__metrics">
              <div className="transparency-dash__metric">
                <span className="transparency-dash__metric-value">
                  £{summary.totalAllocated.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                </span>
                <span className="transparency-dash__metric-label">Allocated to Programmes</span>
              </div>
              
              <div className="transparency-dash__metric">
                <span className="transparency-dash__metric-value">
                  £{summary.pendingAllocation.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                </span>
                <span className="transparency-dash__metric-label">Pending Allocation</span>
              </div>
              
              <div className="transparency-dash__metric transparency-dash__metric--btc">
                <span className="transparency-dash__metric-value">
                  {summary.btcHoldings.toFixed(8)} BTC
                </span>
                <span className="transparency-dash__metric-label">
                  Bitcoin Reserve {btcValue > 0 && `(≈£${btcValue.toLocaleString('en-GB', { minimumFractionDigits: 0 })})`}
                </span>
              </div>
            </div>
            
            {/* Allocation Breakdown */}
            <div className="transparency-dash__breakdown">
              <h3>Where The Money Goes</h3>
              <div className="transparency-dash__breakdown-bars">
                {Object.entries(summary.allocationBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .map(([target, amount]) => {
                    const info = ALLOCATION_LABELS[target as AllocationTarget];
                    const percentage = (allocationPercentages as Record<string, number>)[target] || 0;
                    return (
                      <div key={target} className="transparency-dash__breakdown-item">
                        <div className="transparency-dash__breakdown-header">
                          <span className="transparency-dash__breakdown-name">
                            {info.icon} {info.label}
                          </span>
                          <span className="transparency-dash__breakdown-amount">
                            £{amount.toLocaleString('en-GB')} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="transparency-dash__breakdown-bar">
                          <div 
                            className="transparency-dash__breakdown-fill"
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: info.color
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            
            {/* How It Works */}
            <div className="transparency-dash__how-it-works">
              <h3>How It Works</h3>
              <div className="transparency-dash__flow">
                <div className="transparency-dash__flow-step">
                  <span className="transparency-dash__flow-icon">🛒</span>
                  <span className="transparency-dash__flow-text">You buy from the marketplace</span>
                </div>
                <span className="transparency-dash__flow-arrow">→</span>
                <div className="transparency-dash__flow-step">
                  <span className="transparency-dash__flow-icon">💰</span>
                  <span className="transparency-dash__flow-text">25% goes to Community Fund</span>
                </div>
                <span className="transparency-dash__flow-arrow">→</span>
                <div className="transparency-dash__flow-step">
                  <span className="transparency-dash__flow-icon">🗳️</span>
                  <span className="transparency-dash__flow-text">Community votes on allocation</span>
                </div>
                <span className="transparency-dash__flow-arrow">→</span>
                <div className="transparency-dash__flow-step">
                  <span className="transparency-dash__flow-icon">🎓</span>
                  <span className="transparency-dash__flow-text">Free workshops for youth</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Allocations Tab */}
        {activeTab === 'allocations' && (
          <div className="transparency-dash__allocations">
            <h3>Recent Allocations</h3>
            {allocations.length === 0 ? (
              <p className="transparency-dash__empty">No allocations yet.</p>
            ) : (
              <div className="transparency-dash__allocation-list">
                {allocations.slice(0, 20).map(allocation => {
                  const info = ALLOCATION_LABELS[allocation.allocatedTo];
                  return (
                    <div 
                      key={allocation.id} 
                      className="transparency-dash__allocation-item"
                      onClick={() => onViewAllocation?.(allocation)}
                    >
                      <div className="transparency-dash__allocation-icon" style={{ backgroundColor: info.color }}>
                        {info.icon}
                      </div>
                      <div className="transparency-dash__allocation-details">
                        <span className="transparency-dash__allocation-target">{info.label}</span>
                        <span className="transparency-dash__allocation-date">
                          {new Date(allocation.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="transparency-dash__allocation-amount">
                        £{allocation.totalAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                      </div>
                      {allocation.impactMetrics && (
                        <div className="transparency-dash__allocation-impact">
                          {allocation.impactMetrics.workshopsDelivered && (
                            <span>{allocation.impactMetrics.workshopsDelivered} workshops</span>
                          )}
                          {allocation.impactMetrics.participantsReached && (
                            <span>{allocation.impactMetrics.participantsReached} participants</span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        
        {/* Impact Tab */}
        {activeTab === 'impact' && (
          <div className="transparency-dash__impact">
            <h3>Community Impact</h3>
            
            <div className="transparency-dash__impact-grid">
              <div className="transparency-dash__impact-card">
                <span className="transparency-dash__impact-icon">🎓</span>
                <span className="transparency-dash__impact-value">
                  {summary.impactSummary.totalWorkshops}
                </span>
                <span className="transparency-dash__impact-label">Workshops Delivered</span>
              </div>
              
              <div className="transparency-dash__impact-card">
                <span className="transparency-dash__impact-icon">👥</span>
                <span className="transparency-dash__impact-value">
                  {summary.impactSummary.totalParticipants}
                </span>
                <span className="transparency-dash__impact-label">Young People Reached</span>
              </div>
              
              <div className="transparency-dash__impact-card">
                <span className="transparency-dash__impact-icon">🚀</span>
                <span className="transparency-dash__impact-value">
                  {summary.impactSummary.totalCreatorsLaunched}
                </span>
                <span className="transparency-dash__impact-label">Creators Launched</span>
              </div>
              
              <div className="transparency-dash__impact-card">
                <span className="transparency-dash__impact-icon">💷</span>
                <span className="transparency-dash__impact-value">
                  £{summary.impactSummary.totalEarningsGenerated.toLocaleString('en-GB')}
                </span>
                <span className="transparency-dash__impact-label">Creator Earnings Generated</span>
              </div>
            </div>
            
            <div className="transparency-dash__impact-efficiency">
              <h4>Cost Efficiency</h4>
              <div className="transparency-dash__efficiency-metrics">
                <div className="transparency-dash__efficiency-item">
                  <span className="transparency-dash__efficiency-value">
                    £{summary.impactSummary.costPerParticipant.toFixed(2)}
                  </span>
                  <span className="transparency-dash__efficiency-label">
                    Cost per participant reached
                  </span>
                </div>
                <div className="transparency-dash__efficiency-item">
                  <span className="transparency-dash__efficiency-value">
                    £{summary.impactSummary.costPerCreatorLaunched.toFixed(2)}
                  </span>
                  <span className="transparency-dash__efficiency-label">
                    Cost per creator launched
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Governance Tab */}
        {activeTab === 'governance' && (
          <div className="transparency-dash__governance">
            <h3>Active Proposals</h3>
            <p className="transparency-dash__governance-intro">
              Community members can propose and vote on how the fund is allocated.
            </p>
            
            {proposals.filter(p => p.status === 'voting').length === 0 ? (
              <p className="transparency-dash__empty">No active proposals.</p>
            ) : (
              <div className="transparency-dash__proposal-list">
                {proposals.filter(p => p.status === 'voting').map(proposal => (
                  <div 
                    key={proposal.id}
                    className="transparency-dash__proposal-item"
                    onClick={() => onViewProposal?.(proposal)}
                  >
                    <div className="transparency-dash__proposal-header">
                      <h4 className="transparency-dash__proposal-title">{proposal.title}</h4>
                      <span className="transparency-dash__proposal-amount">
                        £{proposal.requestedAmount?.toLocaleString('en-GB')}
                      </span>
                    </div>
                    <p className="transparency-dash__proposal-description">
                      {proposal.description}
                    </p>
                    <div className="transparency-dash__proposal-votes">
                      <div className="transparency-dash__vote-bar">
                        <div 
                          className="transparency-dash__vote-for"
                          style={{ 
                            width: `${(proposal.currentVotes.for / (proposal.currentVotes.for + proposal.currentVotes.against + 0.01)) * 100}%` 
                          }}
                        />
                      </div>
                      <div className="transparency-dash__vote-counts">
                        <span className="transparency-dash__vote-for-count">
                          ✓ {proposal.currentVotes.for.toFixed(0)} for
                        </span>
                        <span className="transparency-dash__vote-against-count">
                          ✗ {proposal.currentVotes.against.toFixed(0)} against
                        </span>
                      </div>
                    </div>
                    <div className="transparency-dash__proposal-deadline">
                      Voting ends: {new Date(proposal.votingEnds).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="transparency-dash__footer">
        <p>
          All transactions are recorded on-chain for full transparency.
          <a href="#" className="transparency-dash__verify-link">Verify on blockchain →</a>
        </p>
        <p className="transparency-dash__legal">
          Wembley Wonders CIC | Company No. 12960817 | Registered in England
        </p>
      </div>
    </div>
  );
};

export default TransparencyDashboard;