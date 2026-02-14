/**
 * TECHreneurs Venture Builder
 * Wembley Wonders CIC
 * 
 * Business model workspace for turning community prototypes into
 * viable ventures. Integrates IP strategy, revenue modelling,
 * licensing, and marketplace preparation.
 * 
 * Aesthetic: Boardroom meets street — clean data visualisation
 * with urban energy, sharp typography, confidence
 */

import React, { useState, useEffect, useMemo } from 'react';
import type {
  Prototype,
  PricingModel,
  RevenueShare,
  License,
  LicenseType,
  IPStatus,
  IPStrategy
} from '../../prototype-registry/types';
import { prototypeRegistry } from '../../prototype-registry/services/prototypeRegistry';
import styles from './VentureBuilder.module.scss';

// ============================================================================
// TYPES
// ============================================================================

interface VentureData {
  prototypeId: string;
  // Business Model Canvas
  valueProposition: string;
  customerSegments: string[];
  channels: string[];
  revenueStreams: string[];
  keyResources: string[];
  keyActivities: string[];
  keyPartners: string[];
  costStructure: CostItem[];
  // IP Strategy
  ipStrategy: IPStrategy[];
  ipBudget: number;
  ipTimeline: IPMilestone[];
  // Revenue Model
  pricingModel: PricingModel;
  projectedRevenue: RevenueProjection[];
  breakEvenMonths: number;
  // Licensing
  licenses: LicenseOption[];
  // Market Research
  competitorAnalysis: Competitor[];
  marketSize: string;
  uniqueAdvantages: string[];
}

interface CostItem {
  id: string;
  category: 'development' | 'materials' | 'ip-filing' | 'marketing' | 'operations' | 'other';
  description: string;
  amount: number;
  recurring: boolean;
  frequency?: 'monthly' | 'quarterly' | 'annually' | 'one-time';
}

interface IPMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  status: 'planned' | 'in-progress' | 'completed';
  cost: number;
  type: IPStrategy;
}

interface RevenueProjection {
  month: number;
  label: string;
  unitsSold: number;
  revenue: number;
  costs: number;
  profit: number;
}

interface LicenseOption {
  id: string;
  type: LicenseType;
  name: string;
  description: string;
  fee: number;
  feePeriod: 'one-time' | 'monthly' | 'annually' | 'per-unit';
  restrictions: string[];
  recommended: boolean;
}

interface Competitor {
  name: string;
  product: string;
  price: string;
  strengths: string[];
  weaknesses: string[];
  differentiator: string;
}

type BuilderView = 'overview' | 'canvas' | 'ip-strategy' | 'revenue' | 'licensing' | 'market' | 'launch-prep';

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_REVENUE_SHARE: RevenueShare = {
  creator: 55,
  community: 25,
  platform: 20
};

const IP_STRATEGY_OPTIONS: { value: IPStrategy; label: string; cost: string; time: string; description: string }[] = [
  { value: 'utility-patent', label: 'Utility Patent', cost: '£3,000-15,000', time: '2-4 years', description: 'Strongest protection for how your invention works. Long process but maximum coverage.' },
  { value: 'design-patent', label: 'Design Registration', cost: '£50-250', time: '2-4 weeks', description: 'Protects visual appearance. Fast and affordable. Good for product design.' },
  { value: 'trademark', label: 'Trademark', cost: '£170-200', time: '4-6 months', description: 'Protects your brand name, logo, or slogan. Essential for market presence.' },
  { value: 'copyright', label: 'Copyright', cost: 'Free (automatic)', time: 'Immediate', description: 'Automatic protection for creative works, code, and documentation.' },
  { value: 'trade-secret', label: 'Trade Secret', cost: 'Minimal', time: 'Immediate', description: 'Keep manufacturing processes or algorithms confidential. No registration needed.' },
  { value: 'open-source', label: 'Open Source', cost: 'Free', time: 'Immediate', description: 'Share freely to build community and reputation. Good for software components.' },
  { value: 'creative-commons', label: 'Creative Commons', cost: 'Free', time: 'Immediate', description: 'Flexible licensing for creative content. Control how others use your work.' },
  { value: 'defensive-publication', label: 'Defensive Publication', cost: 'Minimal', time: '1-2 weeks', description: 'Publish to prevent others from patenting. Keeps the innovation free for all.' },
];

// ============================================================================
// COMPONENT
// ============================================================================

export const VentureBuilder: React.FC = () => {
  const [activeView, setActiveView] = useState<BuilderView>('overview');
  const [prototypes, setPrototypes] = useState<Prototype[]>([]);
  const [selectedPrototype, setSelectedPrototype] = useState<Prototype | null>(null);
  const [loading, setLoading] = useState(true);

  // Revenue modelling state
  const [revenueInputs, setRevenueInputs] = useState({
    unitPrice: 25,
    monthlySales: 10,
    growthRate: 10, // percent per month
    fixedCosts: 200,
    variableCostPerUnit: 8,
    months: 12
  });

  const [selectedStrategies, setSelectedStrategies] = useState<IPStrategy[]>([]);

  useEffect(() => {
    loadPrototypes();
  }, []);

  const loadPrototypes = async () => {
    setLoading(true);
    try {
      const result = await prototypeRegistry.searchPrototypes({
        programme: ['techreneurs']
      });
      setPrototypes(result.prototypes);
    } catch (err) {
      console.error('Failed to load prototypes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Revenue projections
  const revenueProjections = useMemo(() => {
    const projections: RevenueProjection[] = [];
    let currentSales = revenueInputs.monthlySales;

    for (let i = 1; i <= revenueInputs.months; i++) {
      const revenue = currentSales * revenueInputs.unitPrice;
      const variableCosts = currentSales * revenueInputs.variableCostPerUnit;
      const totalCosts = revenueInputs.fixedCosts + variableCosts;
      const profit = revenue - totalCosts;

      projections.push({
        month: i,
        label: `Month ${i}`,
        unitsSold: Math.round(currentSales),
        revenue: Math.round(revenue),
        costs: Math.round(totalCosts),
        profit: Math.round(profit)
      });

      currentSales *= (1 + revenueInputs.growthRate / 100);
    }

    return projections;
  }, [revenueInputs]);

  const breakEvenMonth = useMemo(() => {
    const idx = revenueProjections.findIndex(p => p.profit >= 0);
    return idx >= 0 ? idx + 1 : null;
  }, [revenueProjections]);

  const totalRevenue = useMemo(() =>
    revenueProjections.reduce((sum, p) => sum + p.revenue, 0),
    [revenueProjections]
  );

  const totalProfit = useMemo(() =>
    revenueProjections.reduce((sum, p) => sum + p.profit, 0),
    [revenueProjections]
  );

  // Revenue share calculations
  const revenueShares = useMemo(() => ({
    creator: Math.round(totalRevenue * DEFAULT_REVENUE_SHARE.creator / 100),
    community: Math.round(totalRevenue * DEFAULT_REVENUE_SHARE.community / 100),
    platform: Math.round(totalRevenue * DEFAULT_REVENUE_SHARE.platform / 100),
  }), [totalRevenue]);

  return (
    <div className={styles.builder}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.brandBlock}>
            <div className={styles.logoMark}>TR</div>
            <div>
              <h1 className={styles.title}>TECHreneurs Venture Builder</h1>
              <p className={styles.subtitle}>From Prototype to Profitable Venture</p>
            </div>
          </div>
          {selectedPrototype && (
            <div className={styles.activeBuild}>
              <span className={styles.activeLabel}>Working on:</span>
              <span className={styles.activeName}>{selectedPrototype.title}</span>
            </div>
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className={styles.builderNav}>
        {([
          { key: 'overview', label: 'Overview' },
          { key: 'canvas', label: 'Business Canvas' },
          { key: 'ip-strategy', label: 'IP Strategy' },
          { key: 'revenue', label: 'Revenue Model' },
          { key: 'licensing', label: 'Licensing' },
          { key: 'market', label: 'Market Research' },
          { key: 'launch-prep', label: 'Launch Prep' },
        ] as { key: BuilderView; label: string }[]).map(tab => (
          <button
            key={tab.key}
            className={`${styles.navTab} ${activeView === tab.key ? styles.active : ''}`}
            onClick={() => setActiveView(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className={styles.mainContent}>
        {/* Overview */}
        {activeView === 'overview' && (
          <div className={styles.overviewView}>
            <div className={styles.prototypeSelector}>
              <h2>Select a Prototype to Build a Venture Around</h2>
              {loading ? (
                <p>Loading prototypes...</p>
              ) : (
                <div className={styles.protoGrid}>
                  {prototypes.map(p => (
                    <div
                      key={p.id}
                      className={`${styles.protoCard} ${selectedPrototype?.id === p.id ? styles.selected : ''}`}
                      onClick={() => setSelectedPrototype(p)}
                    >
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                      <div className={styles.protoMeta}>
                        <span>v{p.currentVersion}</span>
                        <span className={styles[p.status]}>{p.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedPrototype && (
              <div className={styles.ventureScorecard}>
                <h2>Venture Scorecard</h2>
                <div className={styles.scorecardGrid}>
                  <ScoreCard label="IP Status" value={selectedPrototype.ipStatus.replace(/-/g, ' ')} status={selectedPrototype.ipStatus !== 'unprotected' ? 'good' : 'needs-work'} />
                  <ScoreCard label="Iterations" value={`${selectedPrototype.iterations.length}`} status={selectedPrototype.iterations.length >= 3 ? 'good' : 'needs-work'} />
                  <ScoreCard label="Creators" value={`${selectedPrototype.creators.length}`} status={selectedPrototype.creators.length > 0 ? 'good' : 'needs-work'} />
                  <ScoreCard label="Documentation" value={`${selectedPrototype.documentation.length} docs`} status={selectedPrototype.documentation.length >= 2 ? 'good' : 'needs-work'} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* IP Strategy */}
        {activeView === 'ip-strategy' && (
          <div className={styles.ipStrategyView}>
            <h2>IP Strategy Planner</h2>
            <p className={styles.viewDesc}>
              Choose the right protection strategy for your innovation. 
              Multiple strategies can be combined for comprehensive coverage.
            </p>

            <div className={styles.strategyGrid}>
              {IP_STRATEGY_OPTIONS.map(option => (
                <div
                  key={option.value}
                  className={`${styles.strategyCard} ${
                    selectedStrategies.includes(option.value) ? styles.selected : ''
                  }`}
                  onClick={() => {
                    setSelectedStrategies(prev =>
                      prev.includes(option.value)
                        ? prev.filter(s => s !== option.value)
                        : [...prev, option.value]
                    );
                  }}
                >
                  <div className={styles.strategyHeader}>
                    <h3>{option.label}</h3>
                    <div className={styles.strategyCheck}>
                      {selectedStrategies.includes(option.value) ? '&#10003;' : ''}
                    </div>
                  </div>
                  <p>{option.description}</p>
                  <div className={styles.strategyMeta}>
                    <span className={styles.strategyCost}>Cost: {option.cost}</span>
                    <span className={styles.strategyTime}>Time: {option.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {selectedStrategies.length > 0 && (
              <div className={styles.strategySummary}>
                <h3>Selected Strategy</h3>
                <div className={styles.selectedStrategies}>
                  {selectedStrategies.map(s => (
                    <span key={s} className={styles.strategyTag}>
                      {IP_STRATEGY_OPTIONS.find(o => o.value === s)?.label}
                    </span>
                  ))}
                </div>
                <button className={styles.primaryBtn}>
                  Generate IP Action Plan
                </button>
              </div>
            )}
          </div>
        )}

        {/* Revenue Model */}
        {activeView === 'revenue' && (
          <div className={styles.revenueView}>
            <h2>Revenue Model Calculator</h2>

            <div className={styles.revenueLayout}>
              {/* Inputs */}
              <div className={styles.revenueInputs}>
                <h3>Model Parameters</h3>
                <div className={styles.inputGroup}>
                  <label>Unit Price (£)</label>
                  <input
                    type="number"
                    value={revenueInputs.unitPrice}
                    onChange={(e) => setRevenueInputs(p => ({ ...p, unitPrice: parseFloat(e.target.value) || 0 }))}
                    className={styles.numberInput}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Starting Monthly Sales</label>
                  <input
                    type="number"
                    value={revenueInputs.monthlySales}
                    onChange={(e) => setRevenueInputs(p => ({ ...p, monthlySales: parseInt(e.target.value) || 0 }))}
                    className={styles.numberInput}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Monthly Growth Rate (%)</label>
                  <input
                    type="number"
                    value={revenueInputs.growthRate}
                    onChange={(e) => setRevenueInputs(p => ({ ...p, growthRate: parseFloat(e.target.value) || 0 }))}
                    className={styles.numberInput}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Fixed Monthly Costs (£)</label>
                  <input
                    type="number"
                    value={revenueInputs.fixedCosts}
                    onChange={(e) => setRevenueInputs(p => ({ ...p, fixedCosts: parseFloat(e.target.value) || 0 }))}
                    className={styles.numberInput}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Variable Cost Per Unit (£)</label>
                  <input
                    type="number"
                    value={revenueInputs.variableCostPerUnit}
                    onChange={(e) => setRevenueInputs(p => ({ ...p, variableCostPerUnit: parseFloat(e.target.value) || 0 }))}
                    className={styles.numberInput}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Projection Period (months)</label>
                  <input
                    type="number"
                    value={revenueInputs.months}
                    onChange={(e) => setRevenueInputs(p => ({ ...p, months: Math.min(parseInt(e.target.value) || 1, 36) }))}
                    className={styles.numberInput}
                    min={1}
                    max={36}
                  />
                </div>
              </div>

              {/* Results */}
              <div className={styles.revenueResults}>
                <h3>Projections</h3>
                <div className={styles.resultsKPIs}>
                  <div className={styles.kpi}>
                    <span className={styles.kpiValue}>£{totalRevenue.toLocaleString()}</span>
                    <span className={styles.kpiLabel}>Total Revenue</span>
                  </div>
                  <div className={`${styles.kpi} ${totalProfit >= 0 ? styles.positive : styles.negative}`}>
                    <span className={styles.kpiValue}>£{totalProfit.toLocaleString()}</span>
                    <span className={styles.kpiLabel}>Total Profit</span>
                  </div>
                  <div className={styles.kpi}>
                    <span className={styles.kpiValue}>{breakEvenMonth ? `Month ${breakEvenMonth}` : 'N/A'}</span>
                    <span className={styles.kpiLabel}>Break Even</span>
                  </div>
                </div>

                {/* Revenue Share */}
                <div className={styles.revenueShareBlock}>
                  <h4>55/25/20 Revenue Share Model</h4>
                  <div className={styles.shareBar}>
                    <div className={styles.creatorBar} style={{ width: '55%' }}>
                      <span>Creator 55%</span>
                    </div>
                    <div className={styles.communityBar} style={{ width: '25%' }}>
                      <span>Community 25%</span>
                    </div>
                    <div className={styles.platformBar} style={{ width: '20%' }}>
                      <span>Platform 20%</span>
                    </div>
                  </div>
                  <div className={styles.shareValues}>
                    <span>Creator: £{revenueShares.creator.toLocaleString()}</span>
                    <span>Community: £{revenueShares.community.toLocaleString()}</span>
                    <span>Platform: £{revenueShares.platform.toLocaleString()}</span>
                  </div>
                </div>

                {/* Monthly Table */}
                <div className={styles.projectionTable}>
                  <table>
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Units</th>
                        <th>Revenue</th>
                        <th>Costs</th>
                        <th>Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenueProjections.map(p => (
                        <tr key={p.month} className={p.profit >= 0 ? styles.profitable : styles.loss}>
                          <td>{p.label}</td>
                          <td>{p.unitsSold}</td>
                          <td>£{p.revenue.toLocaleString()}</td>
                          <td>£{p.costs.toLocaleString()}</td>
                          <td className={p.profit >= 0 ? styles.profitCell : styles.lossCell}>
                            £{p.profit.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Business Canvas */}
        {activeView === 'canvas' && (
          <BusinessCanvasView prototype={selectedPrototype} />
        )}

        {/* Licensing */}
        {activeView === 'licensing' && (
          <LicensingView prototype={selectedPrototype} />
        )}

        {/* Market Research */}
        {activeView === 'market' && (
          <MarketResearchView prototype={selectedPrototype} />
        )}

        {/* Launch Prep */}
        {activeView === 'launch-prep' && (
          <LaunchPrepView prototype={selectedPrototype} />
        )}
      </main>
    </div>
  );
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface ScoreCardProps {
  label: string;
  value: string;
  status: 'good' | 'needs-work' | 'critical';
}

const ScoreCard: React.FC<ScoreCardProps> = ({ label, value, status }) => (
  <div className={`${styles.scoreCard} ${styles[status]}`}>
    <span className={styles.scoreValue}>{value}</span>
    <span className={styles.scoreLabel}>{label}</span>
    <span className={styles.scoreStatus}>
      {status === 'good' ? '&#10003;' : status === 'critical' ? '&#10007;' : '&#8943;'}
    </span>
  </div>
);

// Business Canvas
const BusinessCanvasView: React.FC<{ prototype: Prototype | null }> = ({ prototype }) => (
  <div className={styles.canvasView}>
    <h2>Business Model Canvas</h2>
    {prototype ? (
      <div className={styles.canvas}>
        {[
          { key: 'partners', label: 'Key Partners', hint: 'Who helps you deliver?', area: '1 / 1 / 3 / 2' },
          { key: 'activities', label: 'Key Activities', hint: 'What do you do?', area: '1 / 2 / 2 / 3' },
          { key: 'resources', label: 'Key Resources', hint: 'What do you need?', area: '2 / 2 / 3 / 3' },
          { key: 'value', label: 'Value Proposition', hint: 'What problem do you solve?', area: '1 / 3 / 3 / 4' },
          { key: 'relations', label: 'Customer Relations', hint: 'How do you interact?', area: '1 / 4 / 2 / 5' },
          { key: 'channels', label: 'Channels', hint: 'How do you reach them?', area: '2 / 4 / 3 / 5' },
          { key: 'segments', label: 'Customer Segments', hint: 'Who do you serve?', area: '1 / 5 / 3 / 6' },
          { key: 'costs', label: 'Cost Structure', hint: 'What does it cost?', area: '3 / 1 / 4 / 4' },
          { key: 'revenue', label: 'Revenue Streams', hint: 'How do you earn?', area: '3 / 4 / 4 / 6' },
        ].map(block => (
          <div
            key={block.key}
            className={styles.canvasBlock}
            style={{ gridArea: block.area }}
          >
            <h4>{block.label}</h4>
            <textarea
              placeholder={block.hint}
              className={styles.canvasTextarea}
              rows={4}
            />
          </div>
        ))}
      </div>
    ) : (
      <div className={styles.noPrototype}>
        <p>Select a prototype from the Overview tab to build its business model</p>
      </div>
    )}
  </div>
);

// Licensing View
const LicensingView: React.FC<{ prototype: Prototype | null }> = ({ prototype }) => (
  <div className={styles.licensingView}>
    <h2>Licensing Dashboard</h2>
    <p className={styles.viewDesc}>
      Choose how others can use your innovation. Licensing generates passive revenue 
      while your IP works for you.
    </p>

    <div className={styles.licenseOptions}>
      {[
        { type: 'proprietary', label: 'Proprietary', desc: 'Full control. Others must pay to use.', fee: 'Varies' },
        { type: 'cc-by', label: 'CC Attribution', desc: 'Free use with credit to you.', fee: 'Free' },
        { type: 'cc-by-nc', label: 'CC Non-Commercial', desc: 'Free for non-commercial use only.', fee: 'Free (NC)' },
        { type: 'cc-by-sa', label: 'CC Share Alike', desc: 'Derivatives must use same license.', fee: 'Free' },
        { type: 'mit', label: 'MIT License', desc: 'Very permissive. Minimal restrictions.', fee: 'Free' },
        { type: 'custom', label: 'Custom License', desc: 'Tailored terms for your specific needs.', fee: 'Custom' },
      ].map(lic => (
        <div key={lic.type} className={styles.licenseCard}>
          <h3>{lic.label}</h3>
          <p>{lic.desc}</p>
          <span className={styles.licenseFee}>{lic.fee}</span>
        </div>
      ))}
    </div>
  </div>
);

// Market Research View
const MarketResearchView: React.FC<{ prototype: Prototype | null }> = ({ prototype }) => (
  <div className={styles.marketView}>
    <h2>Market Research</h2>
    <p className={styles.viewDesc}>
      Understand your competitive landscape and market opportunity.
      This research strengthens both your business case and patent applications.
    </p>

    <div className={styles.researchSections}>
      <div className={styles.researchSection}>
        <h3>Competitor Analysis</h3>
        <p>Add competitors to understand your market position and differentiation.</p>
        <button className={styles.addBtn}>+ Add Competitor</button>
      </div>

      <div className={styles.researchSection}>
        <h3>Market Size</h3>
        <p>Estimate your total addressable market (TAM), serviceable market (SAM), 
        and serviceable obtainable market (SOM).</p>
      </div>

      <div className={styles.researchSection}>
        <h3>Unique Advantages</h3>
        <p>What makes your innovation different? This feeds directly into your 
        patent claims for novelty and non-obviousness.</p>
      </div>
    </div>
  </div>
);

// Launch Prep View
const LaunchPrepView: React.FC<{ prototype: Prototype | null }> = ({ prototype }) => (
  <div className={styles.launchView}>
    <h2>Launch Preparation</h2>
    {prototype ? (
      <div className={styles.launchChecklist}>
        <h3>Cyberstore Launch Checklist</h3>
        <div className={styles.checklistItems}>
          {[
            { label: 'IP Protection Filed', desc: 'Patent, trademark, or design registration', key: 'ip' },
            { label: 'Product Photography', desc: 'Professional images for marketplace listing', key: 'photos' },
            { label: 'Product Description', desc: 'Compelling copy that sells', key: 'copy' },
            { label: 'Pricing Set', desc: 'Unit price with 55/25/20 revenue share calculated', key: 'pricing' },
            { label: 'License Terms Defined', desc: 'How customers can use what they buy', key: 'license' },
            { label: 'Safety Compliance', desc: 'Relevant CE/UKCA marking if applicable', key: 'safety' },
            { label: 'Packaging Design', desc: 'Brand-consistent packaging ready', key: 'packaging' },
            { label: 'Support Documentation', desc: 'User guide and troubleshooting', key: 'support' },
          ].map(item => (
            <label key={item.key} className={styles.checklistItem}>
              <input type="checkbox" />
              <div>
                <span className={styles.checkLabel}>{item.label}</span>
                <span className={styles.checkDesc}>{item.desc}</span>
              </div>
            </label>
          ))}
        </div>

        <button className={styles.launchBtn}>
          Submit to Cyberstore Review
        </button>
      </div>
    ) : (
      <div className={styles.noPrototype}>
        <p>Select a prototype from the Overview tab to prepare for launch</p>
      </div>
    )}
  </div>
);

export default VentureBuilder;