// src/components/sandboxes/mini/PricingCalculatorSandbox.tsx
// 💰 Pricing Calculator
// STEMgeneers - Practice quoting repair jobs fairly and profitably

import React, { useState, useCallback } from 'react';
import MiniSandboxBase, { SandboxConstraints, SandboxPrompt, SandboxResult } from './MiniSandboxBase';
import { DollarSign, Clock, CheckCircle, AlertTriangle, ChevronRight, Calculator } from 'lucide-react';
import './MiniSandbox.css';

interface RepairJob {
  id: string;
  title: string;
  device: string;
  description: string;
  customerContext: string;
  partsCost: { min: number; max: number };
  laborMinutes: { min: number; max: number };
  difficulty: 'easy' | 'medium' | 'hard';
  marketRate: { min: number; max: number };
  tips: string[];
}

const REPAIR_JOBS: RepairJob[] = [
  {
    id: 'phone-screen',
    title: 'Phone Screen Replacement',
    device: 'Samsung Galaxy A52',
    description: 'Cracked screen, touch works partially. Customer dropped it yesterday.',
    customerContext: 'Working professional, needs phone for work. Asked "how much roughly?"',
    partsCost: { min: 25, max: 40 },
    laborMinutes: { min: 30, max: 45 },
    difficulty: 'medium',
    marketRate: { min: 70, max: 120 },
    tips: ['Check if adhesive/tools included with screen', 'Ask if they want tempered glass protector added']
  },
  {
    id: 'laptop-ssd',
    title: 'SSD Upgrade',
    device: 'Dell Inspiron Laptop',
    description: 'Customer wants faster laptop. Currently has slow HDD, wants SSD upgrade.',
    customerContext: 'Student, budget-conscious but desperate for speed. Laptop is 3 years old.',
    partsCost: { min: 35, max: 60 },
    laborMinutes: { min: 45, max: 90 },
    difficulty: 'medium',
    marketRate: { min: 80, max: 150 },
    tips: ['Include Windows reinstall/clone time', 'Check if they need data transferred']
  },
  {
    id: 'virus-removal',
    title: 'Virus/Malware Removal',
    device: 'Windows Desktop',
    description: 'Computer running slow, popups appearing, browser redirecting.',
    customerContext: 'Elderly customer, worried about bank details. Son recommended you.',
    partsCost: { min: 0, max: 0 },
    laborMinutes: { min: 60, max: 120 },
    difficulty: 'medium',
    marketRate: { min: 40, max: 80 },
    tips: ['Include teaching basic security practices', 'Consider adding antivirus subscription']
  },
  {
    id: 'phone-battery',
    title: 'Phone Battery Replacement',
    device: 'iPhone 11',
    description: 'Battery drains in 4 hours. Phone is 3 years old.',
    customerContext: 'Customer got quote of £89 from Apple store. Asking if you can beat it.',
    partsCost: { min: 15, max: 25 },
    laborMinutes: { min: 20, max: 35 },
    difficulty: 'easy',
    marketRate: { min: 45, max: 70 },
    tips: ['Use quality aftermarket battery with warranty', 'Mention your warranty vs Apple']
  },
  {
    id: 'data-recovery',
    title: 'Data Recovery',
    device: 'External Hard Drive',
    description: 'Drive not recognized by computer. Contains 10 years of family photos.',
    customerContext: 'Emotional customer, photos are irreplaceable. Asked "can you save them?"',
    partsCost: { min: 0, max: 50 },
    laborMinutes: { min: 60, max: 240 },
    difficulty: 'hard',
    marketRate: { min: 80, max: 200 },
    tips: ['Set expectations - not all data may be recoverable', 'Charge diagnostic fee upfront']
  },
  {
    id: 'wifi-setup',
    title: 'Home WiFi Setup',
    device: 'Router + Devices',
    description: 'New router, need to set up and connect 8 devices. Current WiFi is patchy.',
    customerContext: 'Family home, parents work from home, kids do online school.',
    partsCost: { min: 0, max: 30 },
    laborMinutes: { min: 45, max: 90 },
    difficulty: 'easy',
    marketRate: { min: 40, max: 80 },
    tips: ['Consider recommending WiFi extender if house is large', 'Write down password for them']
  }
];

interface Quote {
  jobId: string;
  partsEstimate: number;
  laborHours: number;
  hourlyRate: number;
  totalQuote: number;
  includesWarranty: boolean;
}

const PricingCalculatorSandbox: React.FC = () => {
  const [currentJob, setCurrentJob] = useState(REPAIR_JOBS[0]);
  const [partsEstimate, setPartsEstimate] = useState('');
  const [laborHours, setLaborHours] = useState('');
  const [hourlyRate, setHourlyRate] = useState('25');
  const [includesWarranty, setIncludesWarranty] = useState(true);
  const [completedQuotes, setCompletedQuotes] = useState<Quote[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const constraints: SandboxConstraints = {
    minItems: 3,
    timeLimit: 600
  };

  const prompt: SandboxPrompt = {
    title: currentJob.title,
    instruction: `Quote this job: ${currentJob.description}`,
    tips: currentJob.tips
  };

  const parts = parseFloat(partsEstimate) || 0;
  const hours = parseFloat(laborHours) || 0;
  const rate = parseFloat(hourlyRate) || 25;
  const laborCost = hours * rate;
  const totalQuote = parts + laborCost;

  const isWithinMarket = totalQuote >= currentJob.marketRate.min && totalQuote <= currentJob.marketRate.max;
  const isTooLow = totalQuote < currentJob.marketRate.min;
  const isTooHigh = totalQuote > currentJob.marketRate.max;

  const submitQuote = () => {
    if (parts > 0 || hours > 0) {
      setCompletedQuotes([...completedQuotes, {
        jobId: currentJob.id,
        partsEstimate: parts,
        laborHours: hours,
        hourlyRate: rate,
        totalQuote,
        includesWarranty
      }]);
      setShowFeedback(true);
    }
  };

  const nextJob = () => {
    const currentIndex = REPAIR_JOBS.findIndex(j => j.id === currentJob.id);
    const nextIndex = (currentIndex + 1) % REPAIR_JOBS.length;
    setCurrentJob(REPAIR_JOBS[nextIndex]);
    setPartsEstimate('');
    setLaborHours('');
    setShowFeedback(false);
  };

  const getFeedback = () => {
    if (isTooLow) {
      return {
        type: 'warning',
        message: `£${totalQuote} is below market rate (£${currentJob.marketRate.min}-${currentJob.marketRate.max}). You're undervaluing your time! Customers often distrust prices that seem too cheap.`
      };
    }
    if (isTooHigh) {
      return {
        type: 'warning', 
        message: `£${totalQuote} is above market rate (£${currentJob.marketRate.min}-${currentJob.marketRate.max}). You might lose this to competitors. Consider your value-add to justify the premium.`
      };
    }
    return {
      type: 'success',
      message: `£${totalQuote} is within market rate (£${currentJob.marketRate.min}-${currentJob.marketRate.max}). Good pricing! Fair to you and competitive for customer.`
    };
  };

  const handleComplete = useCallback((): SandboxResult => {
    const accurateQuotes = completedQuotes.filter(q => {
      const job = REPAIR_JOBS.find(j => j.id === q.jobId);
      return job && q.totalQuote >= job.marketRate.min && q.totalQuote <= job.marketRate.max;
    });

    return {
      success: completedQuotes.length >= 3 && accurateQuotes.length >= 2,
      data: {
        totalQuotes: completedQuotes.length,
        accurateQuotes: accurateQuotes.length,
        averageHourlyRate: completedQuotes.length > 0 
          ? Math.round(completedQuotes.reduce((sum, q) => sum + q.hourlyRate, 0) / completedQuotes.length)
          : 0
      },
      feedback: completedQuotes.length < 3
        ? `Complete at least 3 quotes. You've done ${completedQuotes.length}.`
        : accurateQuotes.length < 2
          ? `Only ${accurateQuotes.length} of ${completedQuotes.length} quotes were within market rate. Practice pricing more accurately!`
          : `${accurateQuotes.length}/${completedQuotes.length} quotes within market rate. You're ready to quote real jobs!`
    };
  }, [completedQuotes]);

  return (
    <MiniSandboxBase
      title="Pricing Calculator"
      emoji="💰"
      programme="STEMgeneers"
      constraints={constraints}
      prompt={prompt}
      onComplete={handleComplete}
      color="#f59e0b"
    >
      <div className="mini-sandbox__pricing">
        {/* Progress */}
        <div className="mini-sandbox__pricing-progress">
          <span>Quotes completed: {completedQuotes.length}/3 minimum</span>
          {completedQuotes.length >= 3 && <CheckCircle size={16} className="success" />}
        </div>

        {/* Job Card */}
        <div className="mini-sandbox__job-card">
          <div className="mini-sandbox__job-header">
            <h3>{currentJob.title}</h3>
            <span className={`mini-sandbox__difficulty ${currentJob.difficulty}`}>
              {currentJob.difficulty}
            </span>
          </div>
          <p className="mini-sandbox__job-device">{currentJob.device}</p>
          <p className="mini-sandbox__job-desc">{currentJob.description}</p>
          <div className="mini-sandbox__customer-context">
            <strong>Customer context:</strong> {currentJob.customerContext}
          </div>
          <div className="mini-sandbox__market-hint">
            <span>Parts typically: £{currentJob.partsCost.min}-{currentJob.partsCost.max}</span>
            <span>Time typically: {currentJob.laborMinutes.min}-{currentJob.laborMinutes.max} mins</span>
          </div>
        </div>

        {/* Calculator */}
        <div className="mini-sandbox__calculator">
          <div className="mini-sandbox__calc-row">
            <label>
              <DollarSign size={16} />
              Parts Cost (£)
            </label>
            <input
              type="number"
              value={partsEstimate}
              onChange={(e) => setPartsEstimate(e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>

          <div className="mini-sandbox__calc-row">
            <label>
              <Clock size={16} />
              Labor (hours)
            </label>
            <input
              type="number"
              value={laborHours}
              onChange={(e) => setLaborHours(e.target.value)}
              placeholder="0.5"
              min="0"
              step="0.25"
            />
          </div>

          <div className="mini-sandbox__calc-row">
            <label>
              <Calculator size={16} />
              Hourly Rate (£)
            </label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="25"
              min="15"
            />
          </div>

          <div className="mini-sandbox__calc-row checkbox">
            <label>
              <input
                type="checkbox"
                checked={includesWarranty}
                onChange={(e) => setIncludesWarranty(e.target.checked)}
              />
              Include 30-day warranty
            </label>
          </div>
        </div>

        {/* Quote Summary */}
        <div className={`mini-sandbox__quote-summary ${isWithinMarket ? 'good' : 'warning'}`}>
          <div className="mini-sandbox__quote-breakdown">
            <div className="mini-sandbox__quote-line">
              <span>Parts:</span>
              <span>£{parts.toFixed(2)}</span>
            </div>
            <div className="mini-sandbox__quote-line">
              <span>Labor ({hours}h × £{rate}):</span>
              <span>£{laborCost.toFixed(2)}</span>
            </div>
            <div className="mini-sandbox__quote-total">
              <span>Total Quote:</span>
              <span>£{totalQuote.toFixed(2)}</span>
            </div>
          </div>
          <div className="mini-sandbox__market-range">
            Market rate: £{currentJob.marketRate.min} - £{currentJob.marketRate.max}
          </div>
        </div>

        {/* Submit */}
        {!showFeedback ? (
          <button 
            className="mini-sandbox__submit-quote"
            onClick={submitQuote}
            disabled={totalQuote === 0}
          >
            Submit Quote
          </button>
        ) : (
          <div className={`mini-sandbox__quote-feedback ${getFeedback().type}`}>
            {getFeedback().type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertTriangle size={20} />
            )}
            <p>{getFeedback().message}</p>
            <button className="mini-sandbox__next-job" onClick={nextJob}>
              Next Job <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Job List */}
        <div className="mini-sandbox__job-list">
          <h4>Jobs</h4>
          <div className="mini-sandbox__job-chips">
            {REPAIR_JOBS.map(job => (
              <button
                key={job.id}
                className={`mini-sandbox__job-chip ${currentJob.id === job.id ? 'current' : ''} ${
                  completedQuotes.some(q => q.jobId === job.id) ? 'completed' : ''
                }`}
                onClick={() => {
                  setCurrentJob(job);
                  setPartsEstimate('');
                  setLaborHours('');
                  setShowFeedback(false);
                }}
              >
                {job.title.split(' ')[0]}
                {completedQuotes.some(q => q.jobId === job.id) && <CheckCircle size={12} />}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Tips */}
        <div className="mini-sandbox__pricing-tips">
          <h4>💡 Pricing Principles</h4>
          <ul>
            <li><strong>Don't undercharge:</strong> Cheap prices signal low quality</li>
            <li><strong>Value your time:</strong> £20-35/hour is reasonable for skilled work</li>
            <li><strong>Include warranty:</strong> Builds trust, minimal extra cost</li>
            <li><strong>Be transparent:</strong> Break down parts vs labor clearly</li>
          </ul>
        </div>
      </div>
    </MiniSandboxBase>
  );
};

export default PricingCalculatorSandbox;