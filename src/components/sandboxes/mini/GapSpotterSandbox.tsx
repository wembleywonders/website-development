// src/components/sandboxes/mini/GapSpotterSandbox.tsx
// 🔍 Gap Spotter - Find Local Business Opportunities
// TECHreneurs - Train your eye to spot ecosystem gaps

import React, { useState, useCallback } from 'react';
import MiniSandboxBase, { SandboxConstraints, SandboxPrompt, SandboxResult } from './MiniSandboxBase';
import { Search, MapPin, Building, AlertCircle, DollarSign, CheckCircle, Plus, Trash2 } from 'lucide-react';
import './MiniSandbox.css';

interface BusinessGap {
  id: string;
  businessType: string;
  businessName: string;
  observedProblem: string;
  yourSolution: string;
  estimatedValue: string;
}

interface StreetScenario {
  id: string;
  name: string;
  description: string;
  businesses: Array<{
    name: string;
    type: string;
    hint: string;
  }>;
}

const STREET_SCENARIOS: StreetScenario[] = [
  {
    id: 'high-street',
    name: 'Wembley High Road',
    description: 'Busy high street with mix of restaurants, salons, and shops. Lunchtime rush.',
    businesses: [
      { name: 'Mama\'s Kitchen', type: 'Restaurant', hint: 'Handwritten menu in window, no online presence visible' },
      { name: 'Crown Cuts', type: 'Barbershop', hint: 'Always busy, clients waiting on pavement, no booking system' },
      { name: 'Patel Electronics', type: 'Shop', hint: 'Great stock but dusty website listed on Google shows "temporarily closed"' },
      { name: 'Quick Print', type: 'Print Shop', hint: 'Owner looks stressed, piles of paper jobs, no digital workflow' },
      { name: 'Blessed Nails', type: 'Nail Salon', hint: 'Beautiful work on Instagram but profile hasn\'t posted in 6 months' }
    ]
  },
  {
    id: 'church-area',
    name: 'Sunday Morning Walk',
    description: 'Walking past several churches and community halls after service.',
    businesses: [
      { name: 'New Life Baptist', type: 'Church', hint: 'Large congregation but no livestream, elderly members standing outside' },
      { name: 'St. Mary\'s Hall', type: 'Community Hall', hint: 'Events every weekend but paper flyers only, no online calendar' },
      { name: 'African Fellowship', type: 'Church', hint: 'Vibrant service heard from outside, no visible social media presence' },
      { name: 'Community Mosque', type: 'Place of Worship', hint: 'Trying to reach younger members, outdated website' },
      { name: 'Sikh Gurdwara', type: 'Place of Worship', hint: 'Major celebrations coming up, mentioned needing documentation' }
    ]
  },
  {
    id: 'professional-strip',
    name: 'Professional Services Area',
    description: 'Quieter street with offices above shops. Solicitors, accountants, consultants.',
    businesses: [
      { name: 'Thompson & Co Solicitors', type: 'Law Firm', hint: 'Old-school firm, competitors have podcasts and thought leadership content' },
      { name: 'Numbers Plus', type: 'Accountants', hint: 'Busy during tax season, no client portal or digital onboarding' },
      { name: 'Wellness Therapy', type: 'Therapist', hint: 'Wants referrals but doesn\'t want to be "salesy", no content strategy' },
      { name: 'Career Coach Kim', type: 'Coach', hint: 'Great reputation but invisible online, all referrals word-of-mouth' },
      { name: 'PhysioFit', type: 'Physiotherapy', hint: 'Exercise videos on phone but not packaged as content for clients' }
    ]
  }
];

const VALUE_OPTIONS = [
  '£50-100/month',
  '£100-250/month',
  '£250-500/month',
  '£500+/month',
  'One-off £100-300',
  'One-off £300-500'
];

const GapSpotterSandbox: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState(STREET_SCENARIOS[0]);
  const [gaps, setGaps] = useState<BusinessGap[]>([]);
  const [currentGap, setCurrentGap] = useState<Partial<BusinessGap>>({});

  const constraints: SandboxConstraints = {
    minItems: 3,
    maxItems: 5,
    timeLimit: 600 // 10 minutes
  };

  const prompt: SandboxPrompt = {
    title: `Walk: ${currentScenario.name}`,
    instruction: `You\'re walking down ${currentScenario.name}. ${currentScenario.description} Spot at least 3 business gaps you could fill.`,
    tips: [
      'Look for handwritten signs (no digital presence)',
      'Listen for complaints about tech or systems',
      'Notice businesses with great service but weak marketing',
      'Watch for owners doing manual tasks that could be automated'
    ],
    example: 'Mama\'s Kitchen has handwritten menus — they need a digital menu with QR codes. That\'s £150 setup + £30/month updates.'
  };

  const addGap = () => {
    if (currentGap.businessName && currentGap.observedProblem && currentGap.yourSolution) {
      setGaps([...gaps, {
        id: Date.now().toString(),
        businessType: currentGap.businessType || 'Business',
        businessName: currentGap.businessName,
        observedProblem: currentGap.observedProblem,
        yourSolution: currentGap.yourSolution,
        estimatedValue: currentGap.estimatedValue || '£100-250/month'
      }]);
      setCurrentGap({});
    }
  };

  const removeGap = (id: string) => {
    setGaps(gaps.filter(g => g.id !== id));
  };

  const selectBusiness = (business: { name: string; type: string; hint: string }) => {
    setCurrentGap({
      businessName: business.name,
      businessType: business.type,
      observedProblem: '',
      yourSolution: '',
      estimatedValue: ''
    });
  };

  const nextScenario = () => {
    const currentIndex = STREET_SCENARIOS.findIndex(s => s.id === currentScenario.id);
    const nextIndex = (currentIndex + 1) % STREET_SCENARIOS.length;
    setCurrentScenario(STREET_SCENARIOS[nextIndex]);
  };

  const handleComplete = useCallback((): SandboxResult => {
    const isValid = gaps.length >= 3;
    const totalValue = gaps.reduce((sum, gap) => {
      const match = gap.estimatedValue.match(/£(\d+)/);
      return sum + (match ? parseInt(match[1]) : 0);
    }, 0);

    return {
      success: isValid,
      data: {
        scenario: currentScenario.name,
        gaps,
        totalGaps: gaps.length,
        estimatedMonthlyValue: totalValue
      },
      feedback: !isValid
        ? `Spot at least 3 gaps. You found ${gaps.length}.`
        : `Sharp eye! ${gaps.length} opportunities spotted worth £${totalValue}+/month potential. Now go walk your actual high street.`
    };
  }, [gaps, currentScenario]);

  return (
    <MiniSandboxBase
      title="Gap Spotter"
      emoji="🔍"
      programme="TECHreneurs"
      constraints={constraints}
      prompt={prompt}
      onComplete={handleComplete}
      color="#10b981"
    >
      <div className="mini-sandbox__gap-spotter">
        {/* Street View */}
        <div className="mini-sandbox__street-view">
          <div className="mini-sandbox__street-header">
            <MapPin size={18} />
            <span>{currentScenario.name}</span>
          </div>
          <p className="mini-sandbox__street-desc">{currentScenario.description}</p>
        </div>

        {/* Businesses on Street */}
        <div className="mini-sandbox__businesses">
          <h4>Businesses You Pass:</h4>
          <div className="mini-sandbox__business-list">
            {currentScenario.businesses.map((biz, i) => (
              <button
                key={i}
                className={`mini-sandbox__business-btn ${currentGap.businessName === biz.name ? 'selected' : ''}`}
                onClick={() => selectBusiness(biz)}
              >
                <div className="mini-sandbox__business-name">
                  <Building size={14} />
                  {biz.name}
                </div>
                <div className="mini-sandbox__business-hint">
                  <AlertCircle size={12} />
                  {biz.hint}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Gap Form */}
        {currentGap.businessName && (
          <div className="mini-sandbox__gap-form">
            <h4>Document Gap at {currentGap.businessName}</h4>
            
            <div className="mini-sandbox__gap-field">
              <label>What problem did you spot?</label>
              <textarea
                value={currentGap.observedProblem || ''}
                onChange={(e) => setCurrentGap({ ...currentGap, observedProblem: e.target.value })}
                placeholder="e.g., No online booking system, handwritten menus, outdated website..."
                rows={2}
              />
            </div>

            <div className="mini-sandbox__gap-field">
              <label>Your solution?</label>
              <textarea
                value={currentGap.yourSolution || ''}
                onChange={(e) => setCurrentGap({ ...currentGap, yourSolution: e.target.value })}
                placeholder="e.g., Set up online booking with reminders, create digital menu with QR codes..."
                rows={2}
              />
            </div>

            <div className="mini-sandbox__gap-field">
              <label>Estimated value?</label>
              <select
                value={currentGap.estimatedValue || ''}
                onChange={(e) => setCurrentGap({ ...currentGap, estimatedValue: e.target.value })}
              >
                <option value="">Select...</option>
                {VALUE_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <button 
              className="mini-sandbox__add-gap-btn"
              onClick={addGap}
              disabled={!currentGap.observedProblem || !currentGap.yourSolution}
            >
              <Plus size={16} /> Add Gap
            </button>
          </div>
        )}

        {/* Progress */}
        <div className="mini-sandbox__gaps-progress">
          <span>{gaps.length}/3 minimum gaps</span>
          {gaps.length >= 3 && <CheckCircle size={16} className="success" />}
        </div>

        {/* Logged Gaps */}
        {gaps.length > 0 && (
          <div className="mini-sandbox__logged-gaps">
            <h4>Your Spotted Gaps:</h4>
            {gaps.map((gap) => (
              <div key={gap.id} className="mini-sandbox__logged-gap">
                <div className="mini-sandbox__gap-header">
                  <strong>{gap.businessName}</strong>
                  <span className="mini-sandbox__gap-value">
                    <DollarSign size={12} />
                    {gap.estimatedValue}
                  </span>
                  <button 
                    className="mini-sandbox__remove-gap"
                    onClick={() => removeGap(gap.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="mini-sandbox__gap-problem">{gap.observedProblem}</p>
                <p className="mini-sandbox__gap-solution">→ {gap.yourSolution}</p>
              </div>
            ))}
          </div>
        )}

        {/* Change Street */}
        <button className="mini-sandbox__change-street" onClick={nextScenario}>
          Walk Different Street
        </button>
      </div>
    </MiniSandboxBase>
  );
};

export default GapSpotterSandbox;