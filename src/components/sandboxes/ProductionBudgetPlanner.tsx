import React, { useState } from 'react';
import { DollarSign, Users, Calendar, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import './ProductionBudgetPlanner.css';

interface BudgetItem {
  category: string;
  amount: number;
}

const ProductionBudgetPlanner: React.FC = () => {
  const [productionName, setProductionName] = useState('');
  const [castSize, setCastSize] = useState(8);
  const [episodeCount, setEpisodeCount] = useState(6);
  const [ticketPrice, setTicketPrice] = useState(10);
  const [expectedAudience, setExpectedAudience] = useState(200);
  
  const [customCosts, setCustomCosts] = useState<BudgetItem[]>([
    { category: 'Studio Time', amount: 800 },
    { category: 'Equipment Rental', amount: 400 },
    { category: 'Marketing Materials', amount: 300 },
    { category: 'Licensing/Rights', amount: 500 }
  ]);

  const addCost = () => {
    setCustomCosts([...customCosts, { category: 'New Item', amount: 0 }]);
  };

  const updateCost = (index: number, field: 'category' | 'amount', value: string | number) => {
    const updated = [...customCosts];
    if (field === 'amount') {
      updated[index].amount = Number(value);
    } else {
      updated[index].category = String(value);
    }
    setCustomCosts(updated);
  };

  const removeCost = (index: number) => {
    setCustomCosts(customCosts.filter((_, i) => i !== index));
  };

  const calculateBudget = () => {
    const totalCosts = customCosts.reduce((sum, item) => sum + item.amount, 0);
    const projectedRevenue = ticketPrice * expectedAudience;
    const netRevenue = projectedRevenue - totalCosts;
    
    // 55/25/20 split
    const castCrewShare = netRevenue * 0.55;
    const communityShare = netRevenue * 0.25;
    const platformShare = netRevenue * 0.20;
    const perPersonPay = castSize > 0 ? castCrewShare / castSize : 0;

    return {
      totalCosts,
      projectedRevenue,
      netRevenue,
      castCrewShare,
      communityShare,
      platformShare,
      perPersonPay,
      isViable: netRevenue > 0
    };
  };

  const budget = calculateBudget();

  return (
    <div className="production-budget-planner">
      <div className="planner-header">
        <h3>💰 Production Budget Planner</h3>
        <p>Plan your production finances using the 55/25/20 model</p>
      </div>

      <div className="planner-grid">
        {/* Production Details */}
        <div className="planner-section">
          <h4>Production Details</h4>
          <div className="input-group">
            <label>Production Name</label>
            <input
              type="text"
              placeholder="e.g., A House for Mr Biswas"
              value={productionName}
              onChange={(e) => setProductionName(e.target.value)}
              className="text-input"
            />
          </div>
          
          <div className="slider-control">
            <label>
              <Users size={16} />
              Cast & Crew Size: {castSize}
            </label>
            <input
              type="range"
              min="2"
              max="30"
              value={castSize}
              onChange={(e) => setCastSize(Number(e.target.value))}
              className="slider"
            />
          </div>

          <div className="slider-control">
            <label>
              <Calendar size={16} />
              Episodes/Performances: {episodeCount}
            </label>
            <input
              type="range"
              min="1"
              max="12"
              value={episodeCount}
              onChange={(e) => setEpisodeCount(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>

        {/* Revenue Projections */}
        <div className="planner-section">
          <h4>Revenue Projections</h4>
          
          <div className="input-group">
            <label>Ticket/Download Price (£)</label>
            <input
              type="number"
              min="0"
              step="0.50"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(Number(e.target.value))}
              className="number-input"
            />
          </div>

          <div className="slider-control">
            <label>
              <TrendingUp size={16} />
              Expected Audience: {expectedAudience}
            </label>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={expectedAudience}
              onChange={(e) => setExpectedAudience(Number(e.target.value))}
              className="slider"
            />
          </div>

          <div className="revenue-preview">
            <strong>Projected Revenue:</strong>
            <span className="amount">£{budget.projectedRevenue.toLocaleString()}</span>
          </div>
        </div>

        {/* Production Costs */}
        <div className="planner-section full-width">
          <h4>Production Costs</h4>
          
          <div className="costs-list">
            {customCosts.map((cost, index) => (
              <div key={index} className="cost-item">
                <input
                  type="text"
                  value={cost.category}
                  onChange={(e) => updateCost(index, 'category', e.target.value)}
                  className="category-input"
                  placeholder="Cost category"
                />
                <div className="amount-input-wrapper">
                  <span>£</span>
                  <input
                    type="number"
                    min="0"
                    value={cost.amount}
                    onChange={(e) => updateCost(index, 'amount', e.target.value)}
                    className="amount-input"
                  />
                </div>
                <button onClick={() => removeCost(index)} className="remove-button">
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button onClick={addCost} className="add-cost-button">
            + Add Cost Item
          </button>

          <div className="total-costs">
            <strong>Total Production Costs:</strong>
            <span className="amount">£{budget.totalCosts.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Budget Analysis */}
      <div className="budget-analysis">
        <h4>Budget Analysis</h4>
        
        {budget.isViable ? (
          <div className="viability-status viable">
            <CheckCircle size={24} />
            <span>This production is financially viable!</span>
          </div>
        ) : (
          <div className="viability-status not-viable">
            <AlertTriangle size={24} />
            <span>Revenue doesn't cover costs. Adjust pricing or reduce expenses.</span>
          </div>
        )}

        <div className="revenue-breakdown">
          <div className="breakdown-item">
            <div className="breakdown-header">
              <span>Total Revenue</span>
              <span className="breakdown-amount">£{budget.projectedRevenue.toLocaleString()}</span>
            </div>
          </div>

          <div className="breakdown-item subtract">
            <div className="breakdown-header">
              <span>Production Costs</span>
              <span className="breakdown-amount">-£{budget.totalCosts.toLocaleString()}</span>
            </div>
          </div>

          <div className="breakdown-item net">
            <div className="breakdown-header">
              <span><strong>Net Revenue</strong></span>
              <span className="breakdown-amount"><strong>£{budget.netRevenue.toLocaleString()}</strong></span>
            </div>
          </div>
        </div>

        {budget.isViable && (
          <div className="split-breakdown">
            <h5>55/25/20 Revenue Split:</h5>
            
            <div className="split-item cast">
              <div className="split-bar" style={{ width: '55%' }}></div>
              <div className="split-details">
                <span className="split-percent">55%</span>
                <span className="split-label">Cast & Crew</span>
                <span className="split-amount">£{budget.castCrewShare.toLocaleString()}</span>
              </div>
              <div className="per-person">
                £{budget.perPersonPay.toFixed(2)} per person ({castSize} people)
              </div>
            </div>

            <div className="split-item community">
              <div className="split-bar" style={{ width: '25%' }}></div>
              <div className="split-details">
                <span className="split-percent">25%</span>
                <span className="split-label">Next Production Fund</span>
                <span className="split-amount">£{budget.communityShare.toLocaleString()}</span>
              </div>
              <div className="funding-note">
                Funds costumes, studio time, equipment for next show
              </div>
            </div>

            <div className="split-item platform">
              <div className="split-bar" style={{ width: '20%' }}></div>
              <div className="split-details">
                <span className="split-percent">20%</span>
                <span className="split-label">Platform Operations</span>
                <span className="split-amount">£{budget.platformShare.toLocaleString()}</span>
              </div>
              <div className="operations-note">
                Infrastructure, insurance, payment processing
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="planner-tips">
        <strong>Budget Planning Tips:</strong>
        <ul>
          <li><strong>Realistic pricing:</strong> Research similar productions to set competitive ticket prices</li>
          <li><strong>Conservative estimates:</strong> Underestimate revenue, overestimate costs</li>
          <li><strong>Break-even point:</strong> Calculate minimum audience needed to cover costs</li>
          <li><strong>Sponsorships:</strong> Corporate partners can offset production costs significantly</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductionBudgetPlanner;
