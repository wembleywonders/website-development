// src/components/finance/PensionPlanner/PensionPlanner.tsx
import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Calendar,
  PiggyBank,
  Target,
  Info,
  ChevronDown,
  ChevronUp,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Download
} from 'lucide-react';
import { PensionProjection, PensionScenario, PensionSettings } from '../types/finance';
import './PensionPlanner.css';

interface PensionPlannerProps {
  onSettingsChange?: (settings: PensionSettings) => void;
}

const PensionPlanner: React.FC<PensionPlannerProps> = ({ onSettingsChange }) => {
  // Settings state
  const [currentAge, setCurrentAge] = useState<number>(32);
  const [retirementAge, setRetirementAge] = useState<number>(67);
  const [currentPot, setCurrentPot] = useState<number>(5000);
  const [annualIncome, setAnnualIncome] = useState<number>(30000);
  const [contributionPercent, setContributionPercent] = useState<number>(8);
  const [expectedGrowthRate, setExpectedGrowthRate] = useState<number>(5);
  const [inflationRate, setInflationRate] = useState<number>(2.5);

  // UI state
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showProjections, setShowProjections] = useState<boolean>(false);
  const [activeScenario, setActiveScenario] = useState<number>(1);

  // Constants
  const TAX_RELIEF_RATE = 0.25; // Basic rate tax relief (20% grossed up = 25% bonus)
  const ANNUITY_RATE = 0.04; // Approximate annuity rate at 67
  const STATE_PENSION_WEEKLY = 221.20; // 2024/25 full state pension
  const STATE_PENSION_ANNUAL = STATE_PENSION_WEEKLY * 52;

  // Calculate projections
  const calculateProjection = (monthlyContribution: number): PensionProjection[] => {
    const projections: PensionProjection[] = [];
    let balance = currentPot;
    const yearsToRetirement = retirementAge - currentAge;
    const realGrowthRate = (expectedGrowthRate - inflationRate) / 100;

    for (let year = 0; year <= yearsToRetirement; year++) {
      const age = currentAge + year;
      const annualContribution = monthlyContribution * 12;
      const taxRelief = annualContribution * TAX_RELIEF_RATE;
      const totalContribution = annualContribution + taxRelief;
      
      if (year > 0) {
        balance = balance * (1 + realGrowthRate) + totalContribution;
      }

      projections.push({
        age,
        year: new Date().getFullYear() + year,
        contributions: totalContribution,
        employerMatch: 0,
        growth: balance * realGrowthRate,
        totalValue: Math.round(balance)
      });
    }

    return projections;
  };

  // Generate scenarios
  const scenarios = useMemo((): PensionScenario[] => {
    const monthlyIncome = annualIncome / 12;
    const percentages = [3, 5, 8, 10, 15];

    return percentages.map(percent => {
      const monthlyContribution = (monthlyIncome * percent) / 100;
      const annualContribution = monthlyContribution * 12;
      const taxRelief = annualContribution * TAX_RELIEF_RATE;
      const actualCost = annualContribution; // What you actually pay
      const totalAnnual = annualContribution + taxRelief; // What goes into pot

      const projections = calculateProjection(monthlyContribution);
      const finalPot = projections[projections.length - 1]?.totalValue || 0;
      const annualIncome = finalPot * ANNUITY_RATE;
      const monthlyPensionIncome = annualIncome / 12;

      return {
        name: `${percent}%`,
        monthlyContribution,
        annualContribution: totalAnnual,
        projectedPot: finalPot,
        monthlyIncome: Math.round(monthlyPensionIncome),
        annualIncome: Math.round(annualIncome),
        taxRelief: Math.round(taxRelief),
        actualCost: Math.round(actualCost / 12)
      };
    });
  }, [annualIncome, currentAge, retirementAge, currentPot, expectedGrowthRate, inflationRate]);

  // Current scenario
  const currentScenario = scenarios[activeScenario];
  const currentProjections = calculateProjection(currentScenario.monthlyContribution);

  // Calculate what happens if they don't save
  const noSavingsPot = useMemo(() => {
    const yearsToRetirement = retirementAge - currentAge;
    const realGrowthRate = (expectedGrowthRate - inflationRate) / 100;
    return Math.round(currentPot * Math.pow(1 + realGrowthRate, yearsToRetirement));
  }, [currentPot, retirementAge, currentAge, expectedGrowthRate, inflationRate]);

  const noSavingsMonthlyIncome = Math.round((noSavingsPot * ANNUITY_RATE) / 12);

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Download projection
  const downloadProjection = () => {
    const content = `
PENSION PROJECTION SUMMARY
==========================
Generated: ${new Date().toLocaleDateString('en-GB')}

YOUR DETAILS
------------
Current Age: ${currentAge}
Retirement Age: ${retirementAge}
Years to Retirement: ${retirementAge - currentAge}
Current Pension Pot: ${formatCurrency(currentPot)}
Annual Creator Income: ${formatCurrency(annualIncome)}

CHOSEN CONTRIBUTION: ${currentScenario.name} (${formatCurrency(currentScenario.actualCost)}/month)
-------------------------------------------------------------------
Monthly Cost to You: ${formatCurrency(currentScenario.actualCost)}
Tax Relief Added: ${formatCurrency(currentScenario.taxRelief)}/year
Total Annual Contribution: ${formatCurrency(currentScenario.annualContribution)}

PROJECTION AT RETIREMENT (Age ${retirementAge})
-----------------------------------------------
Estimated Pot Size: ${formatCurrency(currentScenario.projectedPot)}
Estimated Monthly Income: ${formatCurrency(currentScenario.monthlyIncome)}
Estimated Annual Income: ${formatCurrency(currentScenario.annualIncome)}

Plus State Pension: ~${formatCurrency(Math.round(STATE_PENSION_ANNUAL))}/year

TOTAL ESTIMATED RETIREMENT INCOME
---------------------------------
${formatCurrency(currentScenario.annualIncome + STATE_PENSION_ANNUAL)}/year
${formatCurrency(Math.round((currentScenario.annualIncome + STATE_PENSION_ANNUAL) / 12))}/month

ASSUMPTIONS
-----------
Growth Rate: ${expectedGrowthRate}% per year
Inflation: ${inflationRate}% per year
Real Growth: ${expectedGrowthRate - inflationRate}% per year
Annuity Rate: ${ANNUITY_RATE * 100}%

---
Generated by Maya Creator Finance | Wembley Wonders
This is an estimate only. Actual returns may vary.
Past performance does not guarantee future results.
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pension-projection-age${currentAge}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pension-planner">
      <div className="pension-header">
        <div className="pension-header-icon">
          <PiggyBank size={28} />
        </div>
        <div className="pension-header-text">
          <h2>Pension Planner</h2>
          <p>Plan your retirement as a self-employed creator</p>
        </div>
      </div>

      <div className="pension-body">
        {/* Current Situation Alert */}
        {currentPot < 10000 && currentAge > 30 && (
          <div className="pension-alert pension-alert-warning">
            <AlertTriangle size={20} />
            <div>
              <strong>Your pension needs attention</strong>
              <p>
                With {formatCurrency(currentPot)} saved at age {currentAge}, you're behind 
                the recommended track. But it's not too late — starting now makes a huge difference.
              </p>
            </div>
          </div>
        )}

        {/* Your Details */}
        <div className="pension-section">
          <h3>Your Details</h3>
          
          <div className="pension-input-row">
            <div className="pension-input-group">
              <label>Current Age</label>
              <div className="pension-input-wrapper">
                <input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Math.max(16, Math.min(66, Number(e.target.value))))}
                  min={16}
                  max={66}
                />
                <span className="pension-input-suffix">years</span>
              </div>
            </div>

            <div className="pension-input-group">
              <label>Retirement Age</label>
              <div className="pension-input-wrapper">
                <input
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Math.max(currentAge + 1, Math.min(75, Number(e.target.value))))}
                  min={currentAge + 1}
                  max={75}
                />
                <span className="pension-input-suffix">years</span>
              </div>
            </div>
          </div>

          <div className="pension-input-row">
            <div className="pension-input-group">
              <label>Current Pension Pot</label>
              <div className="pension-input-wrapper pension-input-currency">
                <span className="pension-input-prefix">£</span>
                <input
                  type="number"
                  value={currentPot}
                  onChange={(e) => setCurrentPot(Math.max(0, Number(e.target.value)))}
                  min={0}
                  step={1000}
                />
              </div>
            </div>

            <div className="pension-input-group">
              <label>Annual Creator Income</label>
              <div className="pension-input-wrapper pension-input-currency">
                <span className="pension-input-prefix">£</span>
                <input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Math.max(0, Number(e.target.value)))}
                  min={0}
                  step={1000}
                />
              </div>
            </div>
          </div>

          <div className="pension-years-display">
            <Calendar size={18} />
            <span>
              <strong>{retirementAge - currentAge} years</strong> until retirement
            </span>
          </div>
        </div>

        {/* Contribution Scenarios */}
        <div className="pension-section">
          <h3>Choose Your Contribution Level</h3>
          <p className="pension-section-desc">
            See how different contribution levels affect your retirement income.
            The government adds 25% tax relief on top of what you save!
          </p>

          <div className="pension-scenarios">
            {scenarios.map((scenario, index) => (
              <button
                key={scenario.name}
                className={`pension-scenario-btn ${activeScenario === index ? 'active' : ''}`}
                onClick={() => setActiveScenario(index)}
              >
                <span className="pension-scenario-percent">{scenario.name}</span>
                <span className="pension-scenario-cost">{formatCurrency(scenario.actualCost)}/mo</span>
                <span className="pension-scenario-pot">{formatCurrency(scenario.projectedPot)}</span>
                <span className="pension-scenario-income">{formatCurrency(scenario.monthlyIncome)}/mo income</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="pension-results">
          <div className="pension-results-header">
            <Target size={20} />
            <h3>Your Retirement Projection</h3>
          </div>

          <div className="pension-results-grid">
            <div className="pension-result-card pension-result-main">
              <span className="pension-result-label">Projected Pot at {retirementAge}</span>
              <span className="pension-result-value">{formatCurrency(currentScenario.projectedPot)}</span>
              <span className="pension-result-note">
                Contributing {currentScenario.name} ({formatCurrency(currentScenario.actualCost)}/month)
              </span>
            </div>

            <div className="pension-result-card">
              <span className="pension-result-label">Monthly Retirement Income</span>
              <span className="pension-result-value pension-result-income">
                {formatCurrency(currentScenario.monthlyIncome)}
              </span>
              <span className="pension-result-note">From your private pension</span>
            </div>

            <div className="pension-result-card">
              <span className="pension-result-label">State Pension (estimated)</span>
              <span className="pension-result-value pension-result-state">
                {formatCurrency(Math.round(STATE_PENSION_ANNUAL / 12))}
              </span>
              <span className="pension-result-note">Per month at state pension age</span>
            </div>

            <div className="pension-result-card pension-result-total">
              <span className="pension-result-label">Total Monthly Income</span>
              <span className="pension-result-value">
                {formatCurrency(currentScenario.monthlyIncome + Math.round(STATE_PENSION_ANNUAL / 12))}
              </span>
              <span className="pension-result-note">Private + State pension combined</span>
            </div>
          </div>

          {/* Tax Relief Highlight */}
          <div className="pension-tax-relief">
            <Sparkles size={20} />
            <div>
              <strong>Free Money: {formatCurrency(currentScenario.taxRelief)}/year in tax relief!</strong>
              <p>
                You pay {formatCurrency(currentScenario.actualCost)}/month, the government adds 
                {formatCurrency(Math.round(currentScenario.taxRelief / 12))}/month. That's a 25% instant return.
              </p>
            </div>
          </div>

          {/* Comparison: Do Nothing */}
          <div className="pension-comparison">
            <h4>What if you don't save?</h4>
            <div className="pension-comparison-row">
              <div className="pension-comparison-item pension-comparison-bad">
                <span className="pension-comparison-label">If you stop now:</span>
                <span className="pension-comparison-value">{formatCurrency(noSavingsPot)}</span>
                <span className="pension-comparison-income">{formatCurrency(noSavingsMonthlyIncome)}/mo income</span>
              </div>
              <div className="pension-comparison-arrow">→</div>
              <div className="pension-comparison-item pension-comparison-good">
                <span className="pension-comparison-label">If you save {currentScenario.name}:</span>
                <span className="pension-comparison-value">{formatCurrency(currentScenario.projectedPot)}</span>
                <span className="pension-comparison-income">{formatCurrency(currentScenario.monthlyIncome)}/mo income</span>
              </div>
            </div>
            <p className="pension-comparison-diff">
              That's <strong>{formatCurrency(currentScenario.monthlyIncome - noSavingsMonthlyIncome)} more per month</strong> in retirement!
            </p>
          </div>
        </div>

        {/* Advanced Settings */}
        <button 
          className="pension-advanced-toggle"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <span>Advanced Settings</span>
          {showAdvanced ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showAdvanced && (
          <div className="pension-advanced">
            <div className="pension-input-row">
              <div className="pension-input-group">
                <label>
                  Expected Growth Rate
                  <span className="pension-input-hint">Before inflation</span>
                </label>
                <div className="pension-input-wrapper">
                  <input
                    type="number"
                    value={expectedGrowthRate}
                    onChange={(e) => setExpectedGrowthRate(Math.max(0, Math.min(15, Number(e.target.value))))}
                    min={0}
                    max={15}
                    step={0.5}
                  />
                  <span className="pension-input-suffix">%</span>
                </div>
              </div>

              <div className="pension-input-group">
                <label>
                  Inflation Rate
                  <span className="pension-input-hint">Long-term average</span>
                </label>
                <div className="pension-input-wrapper">
                  <input
                    type="number"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(Math.max(0, Math.min(10, Number(e.target.value))))}
                    min={0}
                    max={10}
                    step={0.5}
                  />
                  <span className="pension-input-suffix">%</span>
                </div>
              </div>
            </div>

            <div className="pension-growth-note">
              <Info size={16} />
              <span>
                Real growth rate (after inflation): <strong>{expectedGrowthRate - inflationRate}%</strong> per year.
                Historical stock market average is ~5-7% real growth.
              </span>
            </div>
          </div>
        )}

        {/* Year by Year Projections */}
        <button 
          className="pension-projections-toggle"
          onClick={() => setShowProjections(!showProjections)}
        >
          <span>View Year-by-Year Projection</span>
          {showProjections ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showProjections && (
          <div className="pension-projections">
            <div className="pension-projections-table">
              <div className="pension-projections-header">
                <span>Age</span>
                <span>Year</span>
                <span>Pot Value</span>
              </div>
              {currentProjections.filter((_, i) => i % 5 === 0 || i === currentProjections.length - 1).map((proj, index) => (
                <div key={index} className="pension-projections-row">
                  <span>{proj.age}</span>
                  <span>{proj.year}</span>
                  <span>{formatCurrency(proj.totalValue)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pension-actions">
          <button className="pension-action-btn pension-action-primary">
            <CheckCircle size={18} />
            Set Up Auto-Contribution
          </button>
          <button className="pension-action-btn pension-action-secondary" onClick={downloadProjection}>
            <Download size={18} />
            Download Projection
          </button>
        </div>

        {/* Tips */}
        <div className="pension-tips">
          <h4>💡 Maya's Pension Tips</h4>
          <ul>
            <li>
              <CheckCircle size={14} />
              <span>As self-employed, you don't get employer contributions — but tax relief is your "free money" instead.</span>
            </li>
            <li>
              <CheckCircle size={14} />
              <span>A SIPP (Self-Invested Personal Pension) gives you control over investments. Wembley Wonders members get discounted access.</span>
            </li>
            <li>
              <CheckCircle size={14} />
              <span>You can contribute up to £60,000/year (or your earnings, whichever is lower) with tax relief.</span>
            </li>
            <li>
              <CheckCircle size={14} />
              <span>Set up automatic transfers when invoices are paid — Maya can do this for you.</span>
            </li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="pension-disclaimer">
          <Info size={14} />
          <p>
            This calculator provides estimates based on assumed growth rates and inflation. 
            Actual returns may be higher or lower. The value of investments can go down as well as up. 
            State Pension amounts are based on current rates and may change. 
            Consider speaking to a financial advisor for personalized advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PensionPlanner;