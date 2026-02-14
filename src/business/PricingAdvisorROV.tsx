/**
 * PRICING ADVISOR ROV
 * 
 * Helps creators understand what to charge for their work.
 * 
 * The Forgotten 60% often undervalue their skills because:
 * - No market visibility
 * - Impostor syndrome
 * - Fear of rejection
 * - Cultural barriers to discussing money
 * 
 * This ROV provides:
 * - Market rate guidance
 * - Value-based pricing frameworks
 * - Confidence building
 * - Progressive pricing strategies
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState, useMemo } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface CreatorProfile {
  id: string;
  name: string;
  programme: string;
  workshopsCompleted: number;
  salesCount: number;
  averageRating?: number;
  reviewCount: number;
  skills: string[];
  portfolioItems: number;
  memberSince: string;
}

export type ServiceCategory = 
  | 'beat-production'
  | 'mixing-mastering'
  | 'custom-music'
  | 'graphic-design'
  | 'branding'
  | 'fashion-design'
  | 'writing-editing'
  | 'copywriting'
  | 'video-editing'
  | 'video-production'
  | 'web-development'
  | 'app-development'
  | 'tutoring'
  | 'workshops';

export interface PricingInput {
  category: ServiceCategory;
  complexity: 'simple' | 'moderate' | 'complex';
  turnaround: 'rush' | 'standard' | 'flexible';
  revisions: number;
  deliverables: string[];
}

export interface PricingRecommendation {
  minPrice: number;
  recommendedPrice: number;
  maxPrice: number;
  confidenceLevel: 'low' | 'medium' | 'high';
  reasoning: string[];
  adjustments: PriceAdjustment[];
  strategy: PricingStrategy;
}

export interface PriceAdjustment {
  factor: string;
  impact: number; // Percentage adjustment
  reason: string;
}

export interface PricingStrategy {
  name: string;
  description: string;
  steps: string[];
}

// ============================================================
// MARKET RATE DATA
// ============================================================

const MARKET_RATES: Record<ServiceCategory, {
  entry: { min: number; max: number };
  intermediate: { min: number; max: number };
  expert: { min: number; max: number };
  unit: 'per-project' | 'per-hour' | 'per-track' | 'per-word';
  description: string;
}> = {
  'beat-production': {
    entry: { min: 15, max: 40 },
    intermediate: { min: 40, max: 100 },
    expert: { min: 100, max: 500 },
    unit: 'per-track',
    description: 'Beat/instrumental production'
  },
  'mixing-mastering': {
    entry: { min: 25, max: 50 },
    intermediate: { min: 50, max: 150 },
    expert: { min: 150, max: 400 },
    unit: 'per-track',
    description: 'Mixing and/or mastering services'
  },
  'custom-music': {
    entry: { min: 50, max: 150 },
    intermediate: { min: 150, max: 400 },
    expert: { min: 400, max: 2000 },
    unit: 'per-project',
    description: 'Custom compositions for specific use'
  },
  'graphic-design': {
    entry: { min: 25, max: 75 },
    intermediate: { min: 75, max: 200 },
    expert: { min: 200, max: 500 },
    unit: 'per-project',
    description: 'Logos, social media graphics, flyers'
  },
  'branding': {
    entry: { min: 100, max: 300 },
    intermediate: { min: 300, max: 800 },
    expert: { min: 800, max: 3000 },
    unit: 'per-project',
    description: 'Full brand identity packages'
  },
  'fashion-design': {
    entry: { min: 50, max: 150 },
    intermediate: { min: 150, max: 400 },
    expert: { min: 400, max: 1500 },
    unit: 'per-project',
    description: 'Custom fashion design/styling'
  },
  'writing-editing': {
    entry: { min: 0.03, max: 0.06 },
    intermediate: { min: 0.06, max: 0.12 },
    expert: { min: 0.12, max: 0.25 },
    unit: 'per-word',
    description: 'Writing and editing services'
  },
  'copywriting': {
    entry: { min: 25, max: 75 },
    intermediate: { min: 75, max: 200 },
    expert: { min: 200, max: 500 },
    unit: 'per-project',
    description: 'Marketing copy, ads, web copy'
  },
  'video-editing': {
    entry: { min: 15, max: 30 },
    intermediate: { min: 30, max: 60 },
    expert: { min: 60, max: 150 },
    unit: 'per-hour',
    description: 'Video editing per hour of editing work'
  },
  'video-production': {
    entry: { min: 100, max: 300 },
    intermediate: { min: 300, max: 800 },
    expert: { min: 800, max: 3000 },
    unit: 'per-project',
    description: 'Full video production projects'
  },
  'web-development': {
    entry: { min: 200, max: 500 },
    intermediate: { min: 500, max: 1500 },
    expert: { min: 1500, max: 5000 },
    unit: 'per-project',
    description: 'Website development'
  },
  'app-development': {
    entry: { min: 500, max: 1500 },
    intermediate: { min: 1500, max: 5000 },
    expert: { min: 5000, max: 20000 },
    unit: 'per-project',
    description: 'App development projects'
  },
  'tutoring': {
    entry: { min: 15, max: 25 },
    intermediate: { min: 25, max: 45 },
    expert: { min: 45, max: 80 },
    unit: 'per-hour',
    description: 'One-on-one tutoring sessions'
  },
  'workshops': {
    entry: { min: 50, max: 100 },
    intermediate: { min: 100, max: 250 },
    expert: { min: 250, max: 500 },
    unit: 'per-hour',
    description: 'Group workshop facilitation'
  }
};

// ============================================================
// EXPERIENCE LEVEL CALCULATION
// ============================================================

type ExperienceLevel = 'entry' | 'intermediate' | 'expert';

function calculateExperienceLevel(profile: CreatorProfile): ExperienceLevel {
  let score = 0;
  
  // Workshops completed (max 30 points)
  score += Math.min(profile.workshopsCompleted * 3.75, 30);
  
  // Sales count (max 25 points)
  score += Math.min(profile.salesCount * 2.5, 25);
  
  // Reviews (max 20 points)
  score += Math.min(profile.reviewCount * 4, 20);
  
  // Rating bonus (max 15 points)
  if (profile.averageRating) {
    score += (profile.averageRating - 3) * 7.5; // 4.0 = 7.5, 5.0 = 15
  }
  
  // Portfolio (max 10 points)
  score += Math.min(profile.portfolioItems * 2, 10);
  
  if (score >= 60) return 'expert';
  if (score >= 30) return 'intermediate';
  return 'entry';
}

// ============================================================
// PRICING CALCULATION
// ============================================================

function calculatePricing(
  profile: CreatorProfile,
  input: PricingInput
): PricingRecommendation {
  const level = calculateExperienceLevel(profile);
  const rates = MARKET_RATES[input.category];
  const baseRange = rates[level];
  
  // Start with base price
  let basePrice = (baseRange.min + baseRange.max) / 2;
  const adjustments: PriceAdjustment[] = [];
  
  // Complexity adjustment
  const complexityMultiplier = {
    simple: 0.8,
    moderate: 1.0,
    complex: 1.5
  };
  const complexityImpact = (complexityMultiplier[input.complexity] - 1) * 100;
  if (complexityImpact !== 0) {
    adjustments.push({
      factor: 'Complexity',
      impact: complexityImpact,
      reason: `${input.complexity} project complexity`
    });
  }
  basePrice *= complexityMultiplier[input.complexity];
  
  // Turnaround adjustment
  const turnaroundMultiplier = {
    rush: 1.5,
    standard: 1.0,
    flexible: 0.9
  };
  const turnaroundImpact = (turnaroundMultiplier[input.turnaround] - 1) * 100;
  if (turnaroundImpact !== 0) {
    adjustments.push({
      factor: 'Turnaround',
      impact: turnaroundImpact,
      reason: `${input.turnaround} delivery timeline`
    });
  }
  basePrice *= turnaroundMultiplier[input.turnaround];
  
  // Revisions adjustment
  if (input.revisions > 2) {
    const extraRevisions = input.revisions - 2;
    const revisionImpact = extraRevisions * 10;
    adjustments.push({
      factor: 'Extra Revisions',
      impact: revisionImpact,
      reason: `${extraRevisions} extra revisions included`
    });
    basePrice *= 1 + (revisionImpact / 100);
  }
  
  // Multiple deliverables
  if (input.deliverables.length > 1) {
    const deliverableImpact = (input.deliverables.length - 1) * 15;
    adjustments.push({
      factor: 'Multiple Deliverables',
      impact: deliverableImpact,
      reason: `${input.deliverables.length} different deliverables`
    });
    basePrice *= 1 + (deliverableImpact / 100);
  }
  
  // Calculate range
  const recommendedPrice = Math.round(basePrice);
  const minPrice = Math.round(basePrice * 0.75);
  const maxPrice = Math.round(basePrice * 1.4);
  
  // Confidence level
  let confidenceLevel: 'low' | 'medium' | 'high' = 'medium';
  if (profile.salesCount >= 10 && profile.reviewCount >= 5) {
    confidenceLevel = 'high';
  } else if (profile.salesCount === 0) {
    confidenceLevel = 'low';
  }
  
  // Generate reasoning
  const reasoning: string[] = [
    `Your experience level is ${level} based on ${profile.workshopsCompleted} workshops and ${profile.salesCount} sales`,
    `Market rate for ${rates.description}: £${baseRange.min}-${baseRange.max} ${rates.unit.replace('-', ' ')}`,
    adjustments.length > 0 
      ? `Adjusted for: ${adjustments.map(a => a.factor.toLowerCase()).join(', ')}`
      : 'No additional adjustments needed'
  ];
  
  // Strategy based on experience
  const strategy = getStrategy(level, profile.salesCount);
  
  return {
    minPrice,
    recommendedPrice,
    maxPrice,
    confidenceLevel,
    reasoning,
    adjustments,
    strategy
  };
}

function getStrategy(level: ExperienceLevel, salesCount: number): PricingStrategy {
  if (salesCount === 0) {
    return {
      name: 'Launch Pricing',
      description: 'Build your reputation with competitive initial rates',
      steps: [
        'Start at the lower end of the range',
        'Offer your first 3 clients a "founding client" discount',
        'Get reviews on every project - they\'re worth more than the discount',
        'Raise prices 10-15% after your first 5 successful projects'
      ]
    };
  }
  
  if (level === 'entry') {
    return {
      name: 'Growth Pricing',
      description: 'Balance affordability with fair compensation',
      steps: [
        'Price in the middle of your range',
        'Create package tiers (Basic, Standard, Premium)',
        'Include clear scope to prevent scope creep',
        'Review and adjust prices every 10 projects'
      ]
    };
  }
  
  if (level === 'intermediate') {
    return {
      name: 'Value Pricing',
      description: 'Price based on value delivered, not just time',
      steps: [
        'Lead with the value you provide, not your hourly rate',
        'Ask about the client\'s budget and goals first',
        'Offer premium add-ons for clients who want more',
        'Don\'t be afraid to say no to low-budget projects'
      ]
    };
  }
  
  return {
    name: 'Premium Pricing',
    description: 'Position yourself as a specialist worth the investment',
    steps: [
      'Price at the top of your range - your reputation justifies it',
      'Offer exclusive services not available from beginners',
      'Create waitlists if demand exceeds capacity',
      'Mentor others and earn through their success'
    ]
  };
}

// ============================================================
// COMPONENT
// ============================================================

export interface PricingAdvisorROVProps {
  profile: CreatorProfile;
  onPricingSet?: (category: ServiceCategory, price: number) => void;
}

export const PricingAdvisorROV: React.FC<PricingAdvisorROVProps> = ({
  profile,
  onPricingSet
}) => {
  const [category, setCategory] = useState<ServiceCategory | null>(null);
  const [complexity, setComplexity] = useState<'simple' | 'moderate' | 'complex'>('moderate');
  const [turnaround, setTurnaround] = useState<'rush' | 'standard' | 'flexible'>('standard');
  const [revisions, setRevisions] = useState(2);
  const [deliverables, setDeliverables] = useState<string[]>([]);
  
  const experienceLevel = useMemo(() => calculateExperienceLevel(profile), [profile]);
  
  const recommendation = useMemo(() => {
    if (!category) return null;
    return calculatePricing(profile, {
      category,
      complexity,
      turnaround,
      revisions,
      deliverables: deliverables.length > 0 ? deliverables : ['main']
    });
  }, [profile, category, complexity, turnaround, revisions, deliverables]);
  
  const categoryGroups = {
    'Music': ['beat-production', 'mixing-mastering', 'custom-music'] as ServiceCategory[],
    'Design': ['graphic-design', 'branding', 'fashion-design'] as ServiceCategory[],
    'Writing': ['writing-editing', 'copywriting'] as ServiceCategory[],
    'Video': ['video-editing', 'video-production'] as ServiceCategory[],
    'Tech': ['web-development', 'app-development'] as ServiceCategory[],
    'Education': ['tutoring', 'workshops'] as ServiceCategory[]
  };
  
  return (
    <div className="pricing-advisor">
      <div className="pricing-advisor__header">
        <div className="pricing-advisor__avatar">💰</div>
        <div className="pricing-advisor__info">
          <h2>Pricing Advisor</h2>
          <span>Your work has value. Let's find the right price.</span>
        </div>
      </div>
      
      <div className="pricing-advisor__profile">
        <h3>Your Profile</h3>
        <div className="pricing-advisor__stats">
          <div className="pricing-advisor__stat">
            <span className="label">Experience Level</span>
            <span className={`value level-${experienceLevel}`}>
              {experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)}
            </span>
          </div>
          <div className="pricing-advisor__stat">
            <span className="label">Workshops</span>
            <span className="value">{profile.workshopsCompleted}</span>
          </div>
          <div className="pricing-advisor__stat">
            <span className="label">Sales</span>
            <span className="value">{profile.salesCount}</span>
          </div>
          <div className="pricing-advisor__stat">
            <span className="label">Reviews</span>
            <span className="value">{profile.reviewCount}</span>
          </div>
        </div>
      </div>
      
      <div className="pricing-advisor__form">
        <h3>What are you pricing?</h3>
        
        <div className="pricing-advisor__categories">
          {Object.entries(categoryGroups).map(([group, cats]) => (
            <div key={group} className="pricing-advisor__category-group">
              <h4>{group}</h4>
              <div className="pricing-advisor__category-buttons">
                {cats.map(cat => (
                  <button
                    key={cat}
                    className={`pricing-advisor__category ${category === cat ? 'active' : ''}`}
                    onClick={() => setCategory(cat)}
                  >
                    {MARKET_RATES[cat].description}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {category && (
          <>
            <div className="pricing-advisor__options">
              <div className="pricing-advisor__option">
                <label>Complexity</label>
                <div className="pricing-advisor__button-group">
                  {(['simple', 'moderate', 'complex'] as const).map(c => (
                    <button
                      key={c}
                      className={complexity === c ? 'active' : ''}
                      onClick={() => setComplexity(c)}
                    >
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pricing-advisor__option">
                <label>Turnaround</label>
                <div className="pricing-advisor__button-group">
                  {(['rush', 'standard', 'flexible'] as const).map(t => (
                    <button
                      key={t}
                      className={turnaround === t ? 'active' : ''}
                      onClick={() => setTurnaround(t)}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                      {t === 'rush' && ' (+50%)'}
                      {t === 'flexible' && ' (-10%)'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pricing-advisor__option">
                <label>Revisions Included: {revisions}</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={revisions}
                  onChange={e => setRevisions(parseInt(e.target.value))}
                />
              </div>
            </div>
            
            {recommendation && (
              <div className="pricing-advisor__recommendation">
                <h3>💡 My Recommendation</h3>
                
                <div className="pricing-advisor__price-range">
                  <div className="pricing-advisor__price pricing-advisor__price--min">
                    <span className="label">Minimum</span>
                    <span className="amount">£{recommendation.minPrice}</span>
                  </div>
                  <div className="pricing-advisor__price pricing-advisor__price--recommended">
                    <span className="label">Recommended</span>
                    <span className="amount">£{recommendation.recommendedPrice}</span>
                  </div>
                  <div className="pricing-advisor__price pricing-advisor__price--max">
                    <span className="label">Premium</span>
                    <span className="amount">£{recommendation.maxPrice}</span>
                  </div>
                </div>
                
                <div className="pricing-advisor__confidence">
                  Confidence: <span className={`confidence-${recommendation.confidenceLevel}`}>
                    {recommendation.confidenceLevel}
                  </span>
                </div>
                
                <div className="pricing-advisor__reasoning">
                  <h4>Why this price?</h4>
                  <ul>
                    {recommendation.reasoning.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
                
                {recommendation.adjustments.length > 0 && (
                  <div className="pricing-advisor__adjustments">
                    <h4>Price Adjustments</h4>
                    {recommendation.adjustments.map((adj, i) => (
                      <div key={i} className="pricing-advisor__adjustment">
                        <span className="factor">{adj.factor}</span>
                        <span className={`impact ${adj.impact >= 0 ? 'positive' : 'negative'}`}>
                          {adj.impact >= 0 ? '+' : ''}{adj.impact}%
                        </span>
                        <span className="reason">{adj.reason}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="pricing-advisor__strategy">
                  <h4>🎯 {recommendation.strategy.name}</h4>
                  <p>{recommendation.strategy.description}</p>
                  <ol>
                    {recommendation.strategy.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
                
                <button
                  className="pricing-advisor__apply"
                  onClick={() => onPricingSet?.(category, recommendation.recommendedPrice)}
                >
                  Use £{recommendation.recommendedPrice} as my price
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="pricing-advisor__footer">
        <p>
          💚 Remember: Underpricing hurts all creators. Your skills have value.
          The 25% community contribution funds youth programmes.
        </p>
      </div>
    </div>
  );
};

// ============================================================
// EXPORTS
// ============================================================

export {
  calculateExperienceLevel,
  calculatePricing,
  getStrategy,
  MARKET_RATES
};

export default PricingAdvisorROV;
