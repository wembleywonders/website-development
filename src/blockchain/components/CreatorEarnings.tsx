/**
 * CREATOR EARNINGS
 * 
 * Shows creator's earnings breakdown, revenue splits,
 * and their community contribution impact.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 */

import React, { useState, useMemo } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface EarningsData {
  totalGross: number;
  totalNet: number;
  communityContribution: number;
  operationsFees: number;
  pendingPayment: number;
  lastPayout: number;
  lastPayoutDate?: string;
}

export interface Sale {
  id: string;
  productName: string;
  productType: 'product' | 'service' | 'package';
  grossAmount: number;
  netAmount: number;
  communityShare: number;
  date: string;
  buyerName?: string;
  status: 'completed' | 'pending' | 'refunded';
}

export interface CreatorEarningsProps {
  creatorName: string;
  earnings: EarningsData;
  sales: Sale[];
  workshopHoursFunded: number;
  participantsReached: number;
  onRequestPayout?: () => void;
  onRequestBitcoinPayout?: () => void;
  minPayoutAmount?: number;
}

// ============================================================
// COMPONENT
// ============================================================

export const CreatorEarnings: React.FC<CreatorEarningsProps> = ({
  creatorName,
  earnings,
  sales,
  workshopHoursFunded,
  participantsReached,
  onRequestPayout,
  onRequestBitcoinPayout,
  minPayoutAmount = 25
}) => {
  const [activeView, setActiveView] = useState<'summary' | 'sales' | 'impact'>('summary');
  const [timeFilter, setTimeFilter] = useState<'all' | 'month' | 'week'>('all');
  
  // Filter sales by time
  const filteredSales = useMemo(() => {
    const now = new Date();
    return sales.filter(sale => {
      if (timeFilter === 'all') return true;
      const saleDate = new Date(sale.date);
      if (timeFilter === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return saleDate >= weekAgo;
      }
      if (timeFilter === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return saleDate >= monthAgo;
      }
      return true;
    });
  }, [sales, timeFilter]);
  
  // Calculate filtered totals
  const filteredTotals = useMemo(() => {
    const completed = filteredSales.filter(s => s.status === 'completed');
    return {
      gross: completed.reduce((sum, s) => sum + s.grossAmount, 0),
      net: completed.reduce((sum, s) => sum + s.netAmount, 0),
      community: completed.reduce((sum, s) => sum + s.communityShare, 0),
      count: completed.length
    };
  }, [filteredSales]);
  
  const canRequestPayout = earnings.pendingPayment >= minPayoutAmount;
  
  return (
    <div className="creator-earnings">
      <header className="creator-earnings__header">
        <h2>💰 Your Earnings</h2>
        <p>Track your revenue and community impact</p>
      </header>
      
      {/* Summary Cards */}
      <div className="creator-earnings__summary-cards">
        <div className="earnings-card earnings-card--primary">
          <span className="card-label">Available to Withdraw</span>
          <span className="card-value">£{earnings.pendingPayment.toFixed(2)}</span>
          {canRequestPayout ? (
            <div className="card-actions">
              <button className="btn-payout" onClick={onRequestPayout}>
                Withdraw to Bank
              </button>
              {onRequestBitcoinPayout && (
                <button className="btn-bitcoin" onClick={onRequestBitcoinPayout}>
                  ₿ Bitcoin
                </button>
              )}
            </div>
          ) : (
            <span className="card-note">Min £{minPayoutAmount} to withdraw</span>
          )}
        </div>
        
        <div className="earnings-card">
          <span className="card-label">Total Earned (Net)</span>
          <span className="card-value">£{earnings.totalNet.toFixed(2)}</span>
          <span className="card-subtext">After community & ops</span>
        </div>
        
        <div className="earnings-card">
          <span className="card-label">Total Sales (Gross)</span>
          <span className="card-value">£{earnings.totalGross.toFixed(2)}</span>
          <span className="card-subtext">{sales.filter(s => s.status === 'completed').length} sales</span>
        </div>
        
        <div className="earnings-card earnings-card--community">
          <span className="card-label">Community Impact</span>
          <span className="card-value">£{earnings.communityContribution.toFixed(2)}</span>
          <span className="card-subtext">25% funding workshops</span>
        </div>
      </div>
      
      {/* View Tabs */}
      <div className="creator-earnings__tabs">
        <button 
          className={activeView === 'summary' ? 'active' : ''}
          onClick={() => setActiveView('summary')}
        >
          📊 Summary
        </button>
        <button 
          className={activeView === 'sales' ? 'active' : ''}
          onClick={() => setActiveView('sales')}
        >
          🧾 Sales History
        </button>
        <button 
          className={activeView === 'impact' ? 'active' : ''}
          onClick={() => setActiveView('impact')}
        >
          💚 Your Impact
        </button>
      </div>
      
      {/* Summary View */}
      {activeView === 'summary' && (
        <div className="creator-earnings__summary">
          <h3>Revenue Breakdown</h3>
          
          <div className="revenue-breakdown">
            <div className="breakdown-row breakdown-row--gross">
              <span className="label">Gross Sales</span>
              <span className="value">£{earnings.totalGross.toFixed(2)}</span>
            </div>
            
            <div className="breakdown-row breakdown-row--deduction">
              <span className="label">Community Fund (25%)</span>
              <span className="value">-£{earnings.communityContribution.toFixed(2)}</span>
            </div>
            
            <div className="breakdown-row breakdown-row--deduction">
              <span className="label">Operations (20%)</span>
              <span className="value">-£{earnings.operationsFees.toFixed(2)}</span>
            </div>
            
            <div className="breakdown-row breakdown-row--net">
              <span className="label">Your Earnings (55%)</span>
              <span className="value">£{earnings.totalNet.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="split-visual">
            <div className="split-bar">
              <div className="split-segment creator" style={{ width: '55%' }}>
                <span>You: 55%</span>
              </div>
              <div className="split-segment community" style={{ width: '25%' }}>
                <span>Community: 25%</span>
              </div>
              <div className="split-segment operations" style={{ width: '20%' }}>
                <span>Ops: 20%</span>
              </div>
            </div>
          </div>
          
          {earnings.lastPayoutDate && (
            <div className="last-payout">
              <span className="label">Last Payout:</span>
              <span className="value">
                £{earnings.lastPayout.toFixed(2)} on {new Date(earnings.lastPayoutDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      )}
      
      {/* Sales History View */}
      {activeView === 'sales' && (
        <div className="creator-earnings__sales">
          <div className="sales-header">
            <h3>Sales History</h3>
            <div className="time-filter">
              <button 
                className={timeFilter === 'week' ? 'active' : ''}
                onClick={() => setTimeFilter('week')}
              >
                This Week
              </button>
              <button 
                className={timeFilter === 'month' ? 'active' : ''}
                onClick={() => setTimeFilter('month')}
              >
                This Month
              </button>
              <button 
                className={timeFilter === 'all' ? 'active' : ''}
                onClick={() => setTimeFilter('all')}
              >
                All Time
              </button>
            </div>
          </div>
          
          <div className="sales-totals">
            <span>{filteredTotals.count} sales</span>
            <span>£{filteredTotals.gross.toFixed(2)} gross</span>
            <span>£{filteredTotals.net.toFixed(2)} net</span>
          </div>
          
          <div className="sales-list">
            {filteredSales.length === 0 ? (
              <p className="no-sales">No sales in this period</p>
            ) : (
              filteredSales.map(sale => (
                <div key={sale.id} className={`sale-item sale-item--${sale.status}`}>
                  <div className="sale-info">
                    <span className="sale-product">{sale.productName}</span>
                    <span className="sale-type">{sale.productType}</span>
                    <span className="sale-date">
                      {new Date(sale.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="sale-amounts">
                    <span className="sale-gross">£{sale.grossAmount.toFixed(2)}</span>
                    <span className="sale-net">You: £{sale.netAmount.toFixed(2)}</span>
                    <span className="sale-community">Community: £{sale.communityShare.toFixed(2)}</span>
                  </div>
                  {sale.status !== 'completed' && (
                    <span className={`sale-status status--${sale.status}`}>
                      {sale.status}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      {/* Impact View */}
      {activeView === 'impact' && (
        <div className="creator-earnings__impact">
          <h3>Your Community Impact</h3>
          
          <div className="impact-hero">
            <p className="impact-statement">
              Your sales have funded <strong>{workshopHoursFunded.toFixed(1)} hours</strong> of 
              free youth workshops, reaching <strong>{participantsReached}</strong> young people 
              in our community.
            </p>
          </div>
          
          <div className="impact-metrics">
            <div className="impact-metric">
              <span className="metric-icon">💷</span>
              <span className="metric-value">£{earnings.communityContribution.toFixed(2)}</span>
              <span className="metric-label">Contributed</span>
            </div>
            
            <div className="impact-metric">
              <span className="metric-icon">⏱️</span>
              <span className="metric-value">{workshopHoursFunded.toFixed(1)}</span>
              <span className="metric-label">Workshop Hours</span>
            </div>
            
            <div className="impact-metric">
              <span className="metric-icon">👥</span>
              <span className="metric-value">{participantsReached}</span>
              <span className="metric-label">Young People</span>
            </div>
          </div>
          
          <div className="impact-explainer">
            <h4>How Your Sales Help</h4>
            <div className="explainer-grid">
              <div className="explainer-item">
                <span className="icon">📚</span>
                <p><strong>£15</strong> = 1 hour of free workshops</p>
              </div>
              <div className="explainer-item">
                <span className="icon">👥</span>
                <p><strong>12 young people</strong> per workshop session</p>
              </div>
              <div className="explainer-item">
                <span className="icon">🎓</span>
                <p>Learning creative & tech skills</p>
              </div>
              <div className="explainer-item">
                <span className="icon">💼</span>
                <p>Building paths to creative careers</p>
              </div>
            </div>
          </div>
          
          <div className="impact-badge">
            <span className="badge-icon">💚</span>
            <span className="badge-text">Community Creator</span>
            <p>Every sale you make helps fund the next generation of creators</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorEarnings;