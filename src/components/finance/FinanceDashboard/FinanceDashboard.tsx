// src/components/finance/FinanceDashboard/FinanceDashboard.tsx
import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Calculator,
  PiggyBank,
  FileText,
  Receipt,
  Heart,
  Calendar,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Clock,
  ChevronRight,
  Bell,
  Target,
  Wallet,
  Sun,
  Sparkles
} from 'lucide-react';
import { FinanceSummary, FinanceAlert, FinanceDeadline } from '../types/finance';
import './FinanceDashboard.css';

interface FinanceDashboardProps {
  userName?: string;
  summary?: Partial<FinanceSummary>;
  onNavigate?: (tool: string) => void;
}

const FinanceDashboard: React.FC<FinanceDashboardProps> = ({
  userName = 'Creator',
  summary,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tools'>('overview');

  // Mock data - in real app, this would come from props/context
  const mockSummary: FinanceSummary = {
    currentMonth: {
      grossIncome: 2847,
      expenses: 347,
      netIncome: 2500,
      taxSetAside: 569,
      pensionContributed: 228,
      holidayFundContributed: 285,
      spendableIncome: 1489
    },
    yearToDate: {
      grossIncome: 28470,
      expenses: 3200,
      profit: 25270,
      taxDue: 5200,
      taxPaid: 2600,
      taxOwed: 2600
    },
    pots: {
      tax: { balance: 4280, target: 5200, onTrack: false },
      holiday: { balance: 1847, daysAvailable: 16 },
      pension: { balance: 12450, monthlyContribution: 228 },
      sickPay: { weeksAvailable: 4, memberSince: new Date('2024-03-01') }
    },
    upcomingDeadlines: [
      { id: '1', title: 'Self Assessment + Payment', date: new Date('2025-01-31'), type: 'tax', amount: 5200, urgent: true },
      { id: '2', title: 'Second Payment on Account', date: new Date('2025-07-31'), type: 'tax', amount: 2600, urgent: false }
    ],
    alerts: [
      { id: '1', type: 'warning', title: 'Tax Shortfall', message: 'Your tax pot is £920 short of target. Transfer £230/week for 4 weeks.', dismissible: true },
      { id: '2', type: 'info', title: 'Expenses Low', message: "You haven't logged expenses this month. Usually you spend ~£200 on business costs.", dismissible: true }
    ]
  };

  const data = { ...mockSummary, ...summary };

  // Get greeting based on time
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short'
    });
  };

  // Days until deadline
  const daysUntil = (date: Date): number => {
    const now = new Date();
    const diff = new Date(date).getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Tools list
  const tools = [
    { id: 'tax', name: 'Tax Calculator', icon: Calculator, color: '#10b981', desc: 'Calculate tax & set-aside amounts' },
    { id: 'pension', name: 'Pension Planner', icon: PiggyBank, color: '#8b5cf6', desc: 'Plan your retirement savings' },
    { id: 'invoice', name: 'Invoice Generator', icon: FileText, color: '#f59e0b', desc: 'Create professional invoices' },
    { id: 'expenses', name: 'Expense Tracker', icon: Receipt, color: '#06b6d4', desc: 'Track business expenses' },
    { id: 'sickpay', name: 'Sick Pay Circle', icon: Heart, color: '#ec4899', desc: 'Mutual aid protection' },
    { id: 'holiday', name: 'Holiday Fund', icon: Sun, color: '#eab308', desc: 'Save for paid time off' }
  ];

  return (
    <div className="finance-dashboard">
      {/* Header */}
      <div className="fd-header">
        <div className="fd-header-greeting">
          <h1>{greeting}, {userName}! 🌺</h1>
          <p>Here's your financial health at a glance</p>
        </div>
        <div className="fd-header-tabs">
          <button 
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={18} />
            Overview
          </button>
          <button 
            className={activeTab === 'tools' ? 'active' : ''}
            onClick={() => setActiveTab('tools')}
          >
            <Sparkles size={18} />
            Tools
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className="fd-body">
          {/* Alerts */}
          {data.alerts.length > 0 && (
            <div className="fd-alerts">
              {data.alerts.map(alert => (
                <div key={alert.id} className={`fd-alert fd-alert-${alert.type}`}>
                  {alert.type === 'warning' && <AlertTriangle size={20} />}
                  {alert.type === 'info' && <Bell size={20} />}
                  {alert.type === 'success' && <CheckCircle size={20} />}
                  <div className="fd-alert-content">
                    <strong>{alert.title}</strong>
                    <p>{alert.message}</p>
                  </div>
                  <button className="fd-alert-action">Fix This →</button>
                </div>
              ))}
            </div>
          )}

          {/* This Month Summary */}
          <div className="fd-section fd-month-summary">
            <div className="fd-section-header">
              <h2><Calendar size={20} /> This Month</h2>
              <span className="fd-month-label">January 2025</span>
            </div>
            <div className="fd-month-flow">
              <div className="fd-flow-item fd-flow-income">
                <span className="fd-flow-label">Gross Income</span>
                <span className="fd-flow-value">{formatCurrency(data.currentMonth.grossIncome)}</span>
              </div>
              <div className="fd-flow-arrow">→</div>
              <div className="fd-flow-deductions">
                <div className="fd-deduction">
                  <span>Tax reserve</span>
                  <span>-{formatCurrency(data.currentMonth.taxSetAside)}</span>
                </div>
                <div className="fd-deduction">
                  <span>Pension</span>
                  <span>-{formatCurrency(data.currentMonth.pensionContributed)}</span>
                </div>
                <div className="fd-deduction">
                  <span>Holiday fund</span>
                  <span>-{formatCurrency(data.currentMonth.holidayFundContributed)}</span>
                </div>
              </div>
              <div className="fd-flow-arrow">→</div>
              <div className="fd-flow-item fd-flow-spendable">
                <span className="fd-flow-label">Spendable</span>
                <span className="fd-flow-value">{formatCurrency(data.currentMonth.spendableIncome)}</span>
                <span className="fd-flow-percent">
                  {Math.round((data.currentMonth.spendableIncome / data.currentMonth.grossIncome) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Pots Grid */}
          <div className="fd-pots-grid">
            {/* Tax Pot */}
            <div className={`fd-pot fd-pot-tax ${!data.pots.tax.onTrack ? 'fd-pot-warning' : ''}`}>
              <div className="fd-pot-header">
                <Calculator size={20} />
                <span>Tax Pot</span>
                {!data.pots.tax.onTrack && <AlertTriangle size={16} className="fd-pot-alert" />}
              </div>
              <div className="fd-pot-value">{formatCurrency(data.pots.tax.balance)}</div>
              <div className="fd-pot-progress">
                <div 
                  className="fd-pot-progress-fill"
                  style={{ width: `${Math.min(100, (data.pots.tax.balance / data.pots.tax.target) * 100)}%` }}
                />
              </div>
              <div className="fd-pot-target">
                Target: {formatCurrency(data.pots.tax.target)} by Jan 31
              </div>
              <button onClick={() => onNavigate?.('tax')}>
                Manage <ChevronRight size={14} />
              </button>
            </div>

            {/* Holiday Fund */}
            <div className="fd-pot fd-pot-holiday">
              <div className="fd-pot-header">
                <Sun size={20} />
                <span>Holiday Fund</span>
              </div>
              <div className="fd-pot-value">{formatCurrency(data.pots.holiday.balance)}</div>
              <div className="fd-pot-days">
                = <strong>{data.pots.holiday.daysAvailable}</strong> days paid holiday
              </div>
              <button onClick={() => onNavigate?.('holiday')}>
                Book Time Off <ChevronRight size={14} />
              </button>
            </div>

            {/* Pension */}
            <div className="fd-pot fd-pot-pension">
              <div className="fd-pot-header">
                <PiggyBank size={20} />
                <span>Pension</span>
              </div>
              <div className="fd-pot-value">{formatCurrency(data.pots.pension.balance)}</div>
              <div className="fd-pot-contribution">
                +{formatCurrency(data.pots.pension.monthlyContribution)}/month
              </div>
              <button onClick={() => onNavigate?.('pension')}>
                View Projection <ChevronRight size={14} />
              </button>
            </div>

            {/* Sick Pay */}
            <div className="fd-pot fd-pot-sickpay">
              <div className="fd-pot-header">
                <Heart size={20} />
                <span>Sick Pay</span>
                <CheckCircle size={14} className="fd-pot-active" />
              </div>
              <div className="fd-pot-value">{data.pots.sickPay.weeksAvailable} weeks</div>
              <div className="fd-pot-note">Available coverage</div>
              <button onClick={() => onNavigate?.('sickpay')}>
                View Circle <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Deadlines */}
          <div className="fd-section fd-deadlines">
            <div className="fd-section-header">
              <h2><Clock size={20} /> Upcoming Deadlines</h2>
            </div>
            <div className="fd-deadlines-list">
              {data.upcomingDeadlines.map(deadline => {
                const days = daysUntil(deadline.date);
                const isUrgent = days <= 30;
                return (
                  <div key={deadline.id} className={`fd-deadline ${isUrgent ? 'fd-deadline-urgent' : ''}`}>
                    <div className="fd-deadline-date">
                      <span className="fd-deadline-day">{formatDate(deadline.date)}</span>
                      <span className="fd-deadline-countdown">
                        {days > 0 ? `${days} days` : 'Today!'}
                      </span>
                    </div>
                    <div className="fd-deadline-info">
                      <span className="fd-deadline-title">{deadline.title}</span>
                      {deadline.amount && (
                        <span className="fd-deadline-amount">{formatCurrency(deadline.amount)}</span>
                      )}
                    </div>
                    <button className="fd-deadline-btn">
                      Add to Calendar
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Year to Date */}
          <div className="fd-section fd-ytd">
            <div className="fd-section-header">
              <h2><TrendingUp size={20} /> Year to Date (2024-25)</h2>
            </div>
            <div className="fd-ytd-grid">
              <div className="fd-ytd-item">
                <span className="fd-ytd-label">Total Income</span>
                <span className="fd-ytd-value">{formatCurrency(data.yearToDate.grossIncome)}</span>
              </div>
              <div className="fd-ytd-item">
                <span className="fd-ytd-label">Expenses</span>
                <span className="fd-ytd-value fd-ytd-expense">-{formatCurrency(data.yearToDate.expenses)}</span>
              </div>
              <div className="fd-ytd-item">
                <span className="fd-ytd-label">Profit</span>
                <span className="fd-ytd-value fd-ytd-profit">{formatCurrency(data.yearToDate.profit)}</span>
              </div>
              <div className="fd-ytd-item">
                <span className="fd-ytd-label">Tax Due</span>
                <span className="fd-ytd-value">{formatCurrency(data.yearToDate.taxDue)}</span>
              </div>
            </div>
          </div>

          {/* Maya Insight */}
          <div className="fd-maya-insight">
            <span className="fd-maya-avatar">🌺</span>
            <div className="fd-maya-content">
              <strong>Maya's Insight</strong>
              <p>
                You're keeping 52% of your income as spendable — that's healthy for a self-employed creator! 
                Your tax pot needs a top-up before January. Would you like me to help you set up automatic transfers?
              </p>
              <div className="fd-maya-actions">
                <button className="fd-maya-btn-primary">Yes, set it up</button>
                <button className="fd-maya-btn-secondary">Remind me later</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Tools Tab */
        <div className="fd-tools">
          <div className="fd-tools-grid">
            {tools.map(tool => (
              <button 
                key={tool.id}
                className="fd-tool-card"
                onClick={() => onNavigate?.(tool.id)}
              >
                <div className="fd-tool-icon" style={{ background: tool.color }}>
                  <tool.icon size={24} />
                </div>
                <div className="fd-tool-info">
                  <span className="fd-tool-name">{tool.name}</span>
                  <span className="fd-tool-desc">{tool.desc}</span>
                </div>
                <ChevronRight size={20} className="fd-tool-arrow" />
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="fd-quick-actions">
            <h3>Quick Actions</h3>
            <div className="fd-quick-grid">
              <button className="fd-quick-btn">
                <FileText size={18} />
                New Invoice
              </button>
              <button className="fd-quick-btn">
                <Receipt size={18} />
                Log Expense
              </button>
              <button className="fd-quick-btn">
                <Calculator size={18} />
                Check Tax
              </button>
              <button className="fd-quick-btn">
                <Wallet size={18} />
                Top Up Pot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceDashboard;