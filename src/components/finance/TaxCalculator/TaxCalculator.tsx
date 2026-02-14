// src/components/finance/TaxCalculator/TaxCalculator.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calculator, 
  PiggyBank, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  ChevronDown,
  ChevronUp,
  Download,
  Calendar,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { TaxCalculation, TaxBreakdownItem } from '../types/finance';
import { TAX_YEARS, CURRENT_TAX_YEAR, SIMPLIFIED_EXPENSES } from '../data/taxConfig';
import './TaxCalculator.css';

interface TaxCalculatorProps {
  initialIncome?: number;
  initialExpenses?: number;
  onCalculationComplete?: (calculation: TaxCalculation) => void;
  compact?: boolean;
}

const TaxCalculator: React.FC<TaxCalculatorProps> = ({
  initialIncome = 25000,
  initialExpenses = 2000,
  onCalculationComplete,
  compact = false
}) => {
  // Form state
  const [annualIncome, setAnnualIncome] = useState<number>(initialIncome);
  const [expenses, setExpenses] = useState<number>(initialExpenses);
  const [hasOtherIncome, setHasOtherIncome] = useState<boolean>(false);
  const [otherIncome, setOtherIncome] = useState<number>(0);
  const [hasStudentLoan, setHasStudentLoan] = useState<boolean>(false);
  const [studentLoanPlan, setStudentLoanPlan] = useState<'plan1' | 'plan2'>('plan2');
  const [isVATRegistered, setIsVATRegistered] = useState<boolean>(false);
  const [taxYear, setTaxYear] = useState<string>(CURRENT_TAX_YEAR);
  
  // UI state
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(true);
  const [showExpenseHelper, setShowExpenseHelper] = useState<boolean>(false);

  // Get current tax year config
  const taxConfig = TAX_YEARS[taxYear];

  // Calculate tax
  const calculation = useMemo((): TaxCalculation => {
    const profit = Math.max(0, annualIncome - expenses);
    const totalIncome = profit + (hasOtherIncome ? otherIncome : 0);
    
    // Personal Allowance (reduces if income over £100k)
    let personalAllowance = taxConfig.personalAllowance;
    if (totalIncome > taxConfig.personalAllowanceLimit) {
      personalAllowance = Math.max(0, personalAllowance - Math.floor((totalIncome - taxConfig.personalAllowanceLimit) / 2));
    }

    // Taxable income (only self-employment profit for this calculation)
    const taxableIncome = Math.max(0, profit - personalAllowance);

    // Income Tax calculation
    let incomeTax = 0;
    let remainingTaxable = taxableIncome;

    // Basic rate band
    const basicRateBand = taxConfig.basicRateThreshold - taxConfig.personalAllowance;
    if (remainingTaxable > 0) {
      const basicRateAmount = Math.min(remainingTaxable, basicRateBand);
      incomeTax += basicRateAmount * taxConfig.basicRate;
      remainingTaxable -= basicRateAmount;
    }

    // Higher rate band
    if (remainingTaxable > 0) {
      const higherRateBand = taxConfig.higherRateThreshold - taxConfig.basicRateThreshold;
      const higherRateAmount = Math.min(remainingTaxable, higherRateBand);
      incomeTax += higherRateAmount * taxConfig.higherRate;
      remainingTaxable -= higherRateAmount;
    }

    // Additional rate
    if (remainingTaxable > 0) {
      incomeTax += remainingTaxable * taxConfig.additionalRate;
    }

    // Class 2 NI (if profit over threshold)
    const class2NI = profit > taxConfig.class2NIThreshold 
      ? taxConfig.class2NIWeekly * 52 
      : 0;

    // Class 4 NI
    let class4NI = 0;
    if (profit > taxConfig.class4NILowerThreshold) {
      const lowerBandProfit = Math.min(
        profit - taxConfig.class4NILowerThreshold,
        taxConfig.class4NIUpperThreshold - taxConfig.class4NILowerThreshold
      );
      class4NI += lowerBandProfit * taxConfig.class4NIRate;

      if (profit > taxConfig.class4NIUpperThreshold) {
        class4NI += (profit - taxConfig.class4NIUpperThreshold) * taxConfig.class4NIUpperRate;
      }
    }

    // Student Loan
    let studentLoan = 0;
    if (hasStudentLoan) {
      const threshold = studentLoanPlan === 'plan1' 
        ? taxConfig.studentLoanPlan1Threshold 
        : taxConfig.studentLoanPlan2Threshold;
      if (profit > threshold) {
        studentLoan = (profit - threshold) * taxConfig.studentLoanRate;
      }
    }

    const totalTax = Math.round(incomeTax + class2NI + class4NI + studentLoan);
    const effectiveRate = profit > 0 ? (totalTax / profit) * 100 : 0;
    const takeHome = profit - totalTax;

    // Build breakdown
    const breakdown: TaxBreakdownItem[] = [
      { label: 'Gross Income', amount: annualIncome, type: 'income' },
      { label: 'Less: Business Expenses', amount: -expenses, type: 'deduction' },
      { label: 'Taxable Profit', amount: profit, type: 'subtotal' },
      { label: 'Personal Allowance', amount: personalAllowance, type: 'deduction', note: totalIncome > 100000 ? 'Reduced due to high income' : undefined },
      { label: 'Taxable Amount', amount: taxableIncome, type: 'subtotal' },
      { label: `Income Tax (${(taxConfig.basicRate * 100).toFixed(0)}%+)`, amount: Math.round(incomeTax), type: 'tax' },
      { label: 'Class 2 NI', amount: Math.round(class2NI), type: 'tax', note: `£${taxConfig.class2NIWeekly}/week` },
      { label: `Class 4 NI (${(taxConfig.class4NIRate * 100).toFixed(0)}%)`, amount: Math.round(class4NI), type: 'tax' },
    ];

    if (hasStudentLoan && studentLoan > 0) {
      breakdown.push({ 
        label: `Student Loan (${studentLoanPlan === 'plan1' ? 'Plan 1' : 'Plan 2'})`, 
        amount: Math.round(studentLoan), 
        type: 'tax' 
      });
    }

    breakdown.push({ label: 'Total Tax Due', amount: totalTax, type: 'total' });

    return {
      grossIncome: annualIncome,
      expenses,
      profit,
      personalAllowance,
      taxableIncome,
      incomeTax: Math.round(incomeTax),
      class2NI: Math.round(class2NI),
      class4NI: Math.round(class4NI),
      studentLoan: Math.round(studentLoan),
      totalTax,
      effectiveRate: Math.round(effectiveRate * 10) / 10,
      takeHome,
      monthlySetAside: Math.round(totalTax / 12),
      weeklySetAside: Math.round(totalTax / 52),
      breakdown
    };
  }, [annualIncome, expenses, hasOtherIncome, otherIncome, hasStudentLoan, studentLoanPlan, taxConfig]);

  // Notify parent of calculation changes
  useEffect(() => {
    if (onCalculationComplete) {
      onCalculationComplete(calculation);
    }
  }, [calculation, onCalculationComplete]);

  // Generate tips based on calculation
  const tips = useMemo(() => {
    const tipsList: { icon: 'check' | 'warning' | 'info'; text: string }[] = [];

    if (calculation.totalTax > 1000) {
      tipsList.push({
        icon: 'check',
        text: `Set up a separate savings account for tax. Transfer £${calculation.weeklySetAside} every week automatically.`
      });
    }

    if (expenses < annualIncome * 0.1) {
      tipsList.push({
        icon: 'warning',
        text: 'Your expenses seem low. Are you tracking: equipment, software, travel, phone, home office costs?'
      });
    }

    if (calculation.totalTax > 3000) {
      tipsList.push({
        icon: 'info',
        text: 'You may need to make Payments on Account (advance tax payments). Budget for 150% of this amount in January.'
      });
    }

    if (annualIncome > 0 && !hasOtherIncome && annualIncome < taxConfig.personalAllowance) {
      tipsList.push({
        icon: 'info',
        text: `Your income is below the Personal Allowance (£${taxConfig.personalAllowance.toLocaleString()}). You won't pay Income Tax, but you may still pay NI.`
      });
    }

    if (calculation.profit > 85000 && !isVATRegistered) {
      tipsList.push({
        icon: 'warning',
        text: 'Your income is approaching the VAT threshold (£85,000). You may need to register for VAT.'
      });
    }

    tipsList.push({
      icon: 'check',
      text: 'Keep receipts for all business expenses. Maya can help you track them automatically.'
    });

    return tipsList;
  }, [calculation, expenses, annualIncome, hasOtherIncome, isVATRegistered, taxConfig]);

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Download summary as text
  const downloadSummary = () => {
    const summary = `
TAX CALCULATION SUMMARY
=======================
Tax Year: ${taxYear}
Generated: ${new Date().toLocaleDateString('en-GB')}

INCOME
------
Gross Income: ${formatCurrency(calculation.grossIncome)}
Business Expenses: ${formatCurrency(calculation.expenses)}
Taxable Profit: ${formatCurrency(calculation.profit)}

TAX BREAKDOWN
-------------
Personal Allowance: ${formatCurrency(calculation.personalAllowance)}
Taxable Amount: ${formatCurrency(calculation.taxableIncome)}

Income Tax: ${formatCurrency(calculation.incomeTax)}
Class 2 NI: ${formatCurrency(calculation.class2NI)}
Class 4 NI: ${formatCurrency(calculation.class4NI)}
${hasStudentLoan ? `Student Loan: ${formatCurrency(calculation.studentLoan)}` : ''}

TOTAL TAX DUE: ${formatCurrency(calculation.totalTax)}
Effective Tax Rate: ${calculation.effectiveRate}%

SET ASIDE
---------
Monthly: ${formatCurrency(calculation.monthlySetAside)}
Weekly: ${formatCurrency(calculation.weeklySetAside)}

Take Home (after tax): ${formatCurrency(calculation.takeHome)}

---
Generated by Maya Creator Finance | Wembley Wonders
This is an estimate only. Consult an accountant for complex situations.
    `.trim();

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tax-calculation-${taxYear}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (compact) {
    return (
      <div className="tax-calc-compact">
        <div className="tax-calc-compact-header">
          <Calculator size={20} />
          <span>Tax Estimate</span>
        </div>
        <div className="tax-calc-compact-result">
          <span className="tax-calc-compact-amount">{formatCurrency(calculation.totalTax)}</span>
          <span className="tax-calc-compact-rate">{calculation.effectiveRate}% effective</span>
        </div>
        <div className="tax-calc-compact-setaside">
          <PiggyBank size={14} />
          <span>Set aside {formatCurrency(calculation.monthlySetAside)}/month</span>
        </div>
      </div>
    );
  }

  return (
    <div className="tax-calculator">
      <div className="tax-calc-header">
        <div className="tax-calc-header-icon">
          <Calculator size={28} />
        </div>
        <div className="tax-calc-header-text">
          <h2>Self-Employment Tax Calculator</h2>
          <p>UK Tax Year {taxYear}</p>
        </div>
        <select 
          className="tax-calc-year-select"
          value={taxYear}
          onChange={(e) => setTaxYear(e.target.value)}
        >
          {Object.keys(TAX_YEARS).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="tax-calc-body">
        {/* Income Inputs */}
        <div className="tax-calc-section">
          <h3>Your Income</h3>
          
          <div className="tax-calc-input-group">
            <label>
              Expected Annual Creator Income
              <span className="tax-calc-hint">Before expenses</span>
            </label>
            <div className="tax-calc-input-wrapper">
              <span className="tax-calc-currency">£</span>
              <input
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Math.max(0, Number(e.target.value)))}
                min={0}
                step={1000}
              />
            </div>
            <input
              type="range"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              min={0}
              max={150000}
              step={1000}
              className="tax-calc-slider"
            />
            <div className="tax-calc-slider-labels">
              <span>£0</span>
              <span>£75k</span>
              <span>£150k</span>
            </div>
          </div>

          <div className="tax-calc-input-group">
            <label>
              Business Expenses
              <span className="tax-calc-hint">Equipment, software, travel, etc.</span>
              <button 
                className="tax-calc-help-btn"
                onClick={() => setShowExpenseHelper(!showExpenseHelper)}
                type="button"
              >
                <HelpCircle size={14} />
                What can I claim?
              </button>
            </label>
            <div className="tax-calc-input-wrapper">
              <span className="tax-calc-currency">£</span>
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(Math.max(0, Number(e.target.value)))}
                min={0}
                step={100}
              />
            </div>
          </div>

          {showExpenseHelper && (
            <div className="tax-calc-expense-helper">
              <h4>Common Deductible Expenses</h4>
              <div className="tax-calc-expense-grid">
                <div className="tax-calc-expense-item">
                  <span>🏠</span>
                  <div>
                    <strong>Home Office</strong>
                    <p>£{SIMPLIFIED_EXPENSES.homeOffice.flatRate}/week flat rate</p>
                  </div>
                </div>
                <div className="tax-calc-expense-item">
                  <span>🚗</span>
                  <div>
                    <strong>Mileage</strong>
                    <p>{SIMPLIFIED_EXPENSES.vehicle.car * 100}p/mile (first 10k)</p>
                  </div>
                </div>
                <div className="tax-calc-expense-item">
                  <span>📱</span>
                  <div>
                    <strong>Phone</strong>
                    <p>Business % of bill</p>
                  </div>
                </div>
                <div className="tax-calc-expense-item">
                  <span>💻</span>
                  <div>
                    <strong>Software</strong>
                    <p>100% deductible</p>
                  </div>
                </div>
                <div className="tax-calc-expense-item">
                  <span>📚</span>
                  <div>
                    <strong>Training</strong>
                    <p>Related to business</p>
                  </div>
                </div>
                <div className="tax-calc-expense-item">
                  <span>🎛️</span>
                  <div>
                    <strong>Equipment</strong>
                    <p>100% deductible</p>
                  </div>
                </div>
              </div>
              <p className="tax-calc-expense-note">
                💡 Most creators under-claim by £1,000-3,000/year. Track everything!
              </p>
            </div>
          )}
        </div>

        {/* Additional Options */}
        <div className="tax-calc-section">
          <h3>Additional Details</h3>
          
          <div className="tax-calc-checkbox-group">
            <label className="tax-calc-checkbox">
              <input
                type="checkbox"
                checked={hasOtherIncome}
                onChange={(e) => setHasOtherIncome(e.target.checked)}
              />
              <span className="tax-calc-checkbox-mark"></span>
              <span>I also have employed income (PAYE job)</span>
            </label>
            
            {hasOtherIncome && (
              <div className="tax-calc-nested-input">
                <label>Annual PAYE salary (gross)</label>
                <div className="tax-calc-input-wrapper">
                  <span className="tax-calc-currency">£</span>
                  <input
                    type="number"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(Math.max(0, Number(e.target.value)))}
                    placeholder="e.g., 30000"
                    min={0}
                  />
                </div>
                <p className="tax-calc-nested-note">
                  ⚠️ Your Personal Allowance may already be used. You'll pay tax on all self-employment profit.
                </p>
              </div>
            )}
          </div>

          <div className="tax-calc-checkbox-group">
            <label className="tax-calc-checkbox">
              <input
                type="checkbox"
                checked={hasStudentLoan}
                onChange={(e) => setHasStudentLoan(e.target.checked)}
              />
              <span className="tax-calc-checkbox-mark"></span>
              <span>I have a student loan</span>
            </label>
            
            {hasStudentLoan && (
              <div className="tax-calc-nested-input">
                <label>Loan plan</label>
                <div className="tax-calc-radio-group">
                  <label className="tax-calc-radio">
                    <input
                      type="radio"
                      name="studentLoanPlan"
                      checked={studentLoanPlan === 'plan1'}
                      onChange={() => setStudentLoanPlan('plan1')}
                    />
                    <span>Plan 1 (started before Sept 2012)</span>
                  </label>
                  <label className="tax-calc-radio">
                    <input
                      type="radio"
                      name="studentLoanPlan"
                      checked={studentLoanPlan === 'plan2'}
                      onChange={() => setStudentLoanPlan('plan2')}
                    />
                    <span>Plan 2 (started Sept 2012 or later)</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="tax-calc-checkbox-group">
            <label className="tax-calc-checkbox">
              <input
                type="checkbox"
                checked={isVATRegistered}
                onChange={(e) => setIsVATRegistered(e.target.checked)}
              />
              <span className="tax-calc-checkbox-mark"></span>
              <span>I'm VAT registered</span>
            </label>
          </div>
        </div>

        {/* Results */}
        <div className="tax-calc-results">
          <div className="tax-calc-results-header">
            <TrendingUp size={20} />
            <h3>Your Tax Estimate</h3>
          </div>

          <div className="tax-calc-results-main">
            <div className="tax-calc-result-big">
              <span className="tax-calc-result-label">Total Tax Due</span>
              <div className="tax-calc-result-value">
                <span className="tax-calc-result-currency">£</span>
                <span className="tax-calc-result-amount">{calculation.totalTax.toLocaleString()}</span>
              </div>
              <span className="tax-calc-result-rate">
                {calculation.effectiveRate}% effective rate
              </span>
            </div>

            <div className="tax-calc-setaside-cards">
              <div className="tax-calc-setaside-card">
                <PiggyBank size={24} />
                <span className="tax-calc-setaside-amount">{formatCurrency(calculation.monthlySetAside)}</span>
                <span className="tax-calc-setaside-period">per month</span>
              </div>
              <div className="tax-calc-setaside-card">
                <PiggyBank size={24} />
                <span className="tax-calc-setaside-amount">{formatCurrency(calculation.weeklySetAside)}</span>
                <span className="tax-calc-setaside-period">per week</span>
              </div>
            </div>

            <div className="tax-calc-takehome">
              <span>Take-home after tax:</span>
              <strong>{formatCurrency(calculation.takeHome)}</strong>
              <span className="tax-calc-takehome-monthly">({formatCurrency(Math.round(calculation.takeHome / 12))}/month)</span>
            </div>
          </div>

          {/* Breakdown Toggle */}
          <button 
            className="tax-calc-breakdown-toggle"
            onClick={() => setShowBreakdown(!showBreakdown)}
          >
            <span>See full breakdown</span>
            {showBreakdown ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {showBreakdown && (
            <div className="tax-calc-breakdown">
              {calculation.breakdown.map((item, index) => (
                <div 
                  key={index} 
                  className={`tax-calc-breakdown-row tax-calc-breakdown-${item.type}`}
                >
                  <span className="tax-calc-breakdown-label">
                    {item.label}
                    {item.note && <span className="tax-calc-breakdown-note">{item.note}</span>}
                  </span>
                  <span className="tax-calc-breakdown-amount">
                    {item.type === 'deduction' && item.amount < 0 ? '-' : ''}
                    {formatCurrency(Math.abs(item.amount))}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Key Dates */}
          <div className="tax-calc-dates">
            <h4><Calendar size={16} /> Key Deadlines</h4>
            <div className="tax-calc-dates-list">
              <div className="tax-calc-date-item">
                <span className="tax-calc-date">31 Jan 2025</span>
                <span className="tax-calc-date-desc">Tax return + payment deadline</span>
              </div>
              <div className="tax-calc-date-item">
                <span className="tax-calc-date">31 Jul 2025</span>
                <span className="tax-calc-date-desc">Second payment on account</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        {showTips && tips.length > 0 && (
          <div className="tax-calc-tips">
            <div className="tax-calc-tips-header">
              <h3>💡 Maya's Tax Tips</h3>
              <button 
                className="tax-calc-tips-close"
                onClick={() => setShowTips(false)}
              >
                ×
              </button>
            </div>
            <ul className="tax-calc-tips-list">
              {tips.map((tip, index) => (
                <li key={index} className={`tax-calc-tip tax-calc-tip-${tip.icon}`}>
                  {tip.icon === 'check' && <CheckCircle size={16} />}
                  {tip.icon === 'warning' && <AlertTriangle size={16} />}
                  {tip.icon === 'info' && <Info size={16} />}
                  <span>{tip.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="tax-calc-actions">
          <button className="tax-calc-action-btn tax-calc-action-primary" onClick={downloadSummary}>
            <Download size={18} />
            Download Summary
          </button>
          <button className="tax-calc-action-btn tax-calc-action-secondary">
            <Calendar size={18} />
            Set Payment Reminders
          </button>
        </div>

        {/* Disclaimer */}
        <div className="tax-calc-disclaimer">
          <Info size={14} />
          <p>
            This calculator provides estimates based on standard UK self-employment tax rules for {taxYear}. 
            For complex situations (multiple income sources, partnerships, capital gains), please consult 
            a qualified accountant. Wembley Wonders offers discounted accounting services through our partner network.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;