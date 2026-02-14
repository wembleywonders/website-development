/**
 * TOKEN WIDGET
 * 
 * Displays WWT token balance and quick redemption options.
 * Compact widget for dashboard use.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 */

import React, { useState } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface TokenBalance {
  available: number;
  pending: number;
  lifetime: number;
}

export interface RedemptionOption {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
}

export interface TokenTransaction {
  id: string;
  type: 'earn' | 'spend';
  amount: number;
  description: string;
  date: string;
}

export interface TokenWidgetProps {
  balance: TokenBalance;
  recentTransactions?: TokenTransaction[];
  redemptionOptions?: RedemptionOption[];
  variant?: 'compact' | 'full';
  onRedeem?: (optionId: string) => void;
  onViewAll?: () => void;
}

// ============================================================
// DEFAULT REDEMPTION OPTIONS
// ============================================================

const DEFAULT_REDEMPTIONS: RedemptionOption[] = [
  { id: 'workshop-10', name: '£1 Off Workshop', description: 'Workshop discount', cost: 10, icon: '📚' },
  { id: 'equipment-25', name: '1hr Equipment', description: 'Free rental', cost: 25, icon: '🎛️' },
  { id: 'priority-30', name: 'Priority Booking', description: 'Early access', cost: 30, icon: '⏰' },
  { id: 'mentor-75', name: '30min Mentor', description: '1-on-1 session', cost: 75, icon: '👥' }
];

// ============================================================
// COMPONENT
// ============================================================

export const TokenWidget: React.FC<TokenWidgetProps> = ({
  balance,
  recentTransactions = [],
  redemptionOptions = DEFAULT_REDEMPTIONS,
  variant = 'compact',
  onRedeem,
  onViewAll
}) => {
  const [showRedemptions, setShowRedemptions] = useState(false);
  
  // Compact variant
  if (variant === 'compact') {
    return (
      <div className="token-widget token-widget--compact">
        <div className="token-widget__header">
          <span className="token-icon">🪙</span>
          <h4>WWT Tokens</h4>
        </div>
        
        <div className="token-widget__balance">
          <span className="balance-value">{balance.available}</span>
          <span className="balance-label">Available</span>
        </div>
        
        {balance.pending > 0 && (
          <div className="token-widget__pending">
            <span>+{balance.pending} pending</span>
          </div>
        )}
        
        <div className="token-widget__actions">
          <button 
            className="action-btn"
            onClick={() => setShowRedemptions(!showRedemptions)}
          >
            {showRedemptions ? 'Hide' : 'Redeem'}
          </button>
          {onViewAll && (
            <button className="action-btn action-btn--secondary" onClick={onViewAll}>
              History
            </button>
          )}
        </div>
        
        {showRedemptions && (
          <div className="token-widget__redemptions">
            {redemptionOptions.slice(0, 3).map(option => (
              <button
                key={option.id}
                className={`redemption-btn ${balance.available < option.cost ? 'disabled' : ''}`}
                onClick={() => balance.available >= option.cost && onRedeem?.(option.id)}
                disabled={balance.available < option.cost}
              >
                <span className="redemption-icon">{option.icon}</span>
                <span className="redemption-name">{option.name}</span>
                <span className="redemption-cost">{option.cost} WWT</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  // Full variant
  return (
    <div className="token-widget token-widget--full">
      <div className="token-widget__header">
        <div className="header-main">
          <span className="token-icon">🪙</span>
          <div>
            <h3>WWT Tokens</h3>
            <p>Earn rewards for your engagement</p>
          </div>
        </div>
      </div>
      
      <div className="token-widget__balances">
        <div className="balance-card balance-card--primary">
          <span className="balance-value">{balance.available}</span>
          <span className="balance-label">Available to Spend</span>
        </div>
        
        <div className="balance-card">
          <span className="balance-value">+{balance.pending}</span>
          <span className="balance-label">Pending</span>
        </div>
        
        <div className="balance-card">
          <span className="balance-value">{balance.lifetime}</span>
          <span className="balance-label">Lifetime Earned</span>
        </div>
      </div>
      
      {/* Recent Transactions */}
      {recentTransactions.length > 0 && (
        <div className="token-widget__transactions">
          <h4>Recent Activity</h4>
          <div className="transactions-list">
            {recentTransactions.slice(0, 5).map(tx => (
              <div key={tx.id} className={`transaction-item transaction-item--${tx.type}`}>
                <div className="tx-info">
                  <span className="tx-description">{tx.description}</span>
                  <span className="tx-date">{new Date(tx.date).toLocaleDateString()}</span>
                </div>
                <span className={`tx-amount ${tx.type === 'earn' ? 'positive' : 'negative'}`}>
                  {tx.type === 'earn' ? '+' : ''}{tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Redemption Options */}
      <div className="token-widget__redemptions-full">
        <h4>Redeem Your Tokens</h4>
        <div className="redemptions-grid">
          {redemptionOptions.map(option => {
            const canAfford = balance.available >= option.cost;
            
            return (
              <div 
                key={option.id}
                className={`redemption-card ${!canAfford ? 'disabled' : ''}`}
              >
                <span className="redemption-icon">{option.icon}</span>
                <div className="redemption-info">
                  <span className="redemption-name">{option.name}</span>
                  <span className="redemption-desc">{option.description}</span>
                </div>
                <div className="redemption-action">
                  <span className="redemption-cost">{option.cost} WWT</span>
                  <button
                    className="redeem-btn"
                    onClick={() => onRedeem?.(option.id)}
                    disabled={!canAfford}
                  >
                    {canAfford ? 'Redeem' : 'Need more'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* How to Earn */}
      <div className="token-widget__earn-info">
        <h4>How to Earn More</h4>
        <div className="earn-grid">
          <div className="earn-item">
            <span className="earn-icon">📚</span>
            <span className="earn-action">Attend workshop</span>
            <span className="earn-amount">+15</span>
          </div>
          <div className="earn-item">
            <span className="earn-icon">💰</span>
            <span className="earn-action">Make a sale</span>
            <span className="earn-amount">+5%</span>
          </div>
          <div className="earn-item">
            <span className="earn-icon">🎓</span>
            <span className="earn-action">Complete programme</span>
            <span className="earn-amount">+100</span>
          </div>
          <div className="earn-item">
            <span className="earn-icon">👥</span>
            <span className="earn-action">Refer someone</span>
            <span className="earn-amount">+50</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenWidget;