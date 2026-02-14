// src/components/sandboxes/mini/PortfolioSnapshotSandbox.tsx
// 📸 Portfolio Snapshot
// Cross-Programme - Create a quick portfolio piece to show clients

import React, { useState, useCallback } from 'react';
import MiniSandboxBase, { SandboxConstraints, SandboxPrompt, SandboxResult } from './MiniSandboxBase';
import { Image, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import './MiniSandbox.css';

interface PortfolioEntry {
  title: string;
  client: string;
  problem: string;
  solution: string;
  result: string;
  testimonial: string;
}

const PORTFOLIO_TEMPLATES = [
  {
    id: 'tech',
    name: 'Tech Solution',
    icon: '💻',
    prompts: {
      client: 'e.g., Local restaurant, church, salon...',
      problem: 'e.g., No online booking, poor Google presence...',
      solution: 'e.g., Set up booking system, optimized Google listing...',
      result: 'e.g., 30% more bookings, 5-star reviews...'
    }
  },
  {
    id: 'media',
    name: 'Media Project',
    icon: '🎬',
    prompts: {
      client: 'e.g., Pastor Williams, local charity, school...',
      problem: 'e.g., No livestream, no video content...',
      solution: 'e.g., Weekly livestream setup, content package...',
      result: 'e.g., 200 remote viewers, increased engagement...'
    }
  },
  {
    id: 'styling',
    name: 'Creative Work',
    icon: '👗',
    prompts: {
      client: 'e.g., Bride, event organizer, boutique...',
      problem: 'e.g., Needed styling for event, visual refresh...',
      solution: 'e.g., Full styling consultation, photo shoot...',
      result: 'e.g., Client confidence boosted, 3 referrals...'
    }
  },
  {
    id: 'repair',
    name: 'Repair/Technical',
    icon: '🔧',
    prompts: {
      client: 'e.g., Family member, small business, neighbor...',
      problem: 'e.g., Broken phone, slow computer, network issues...',
      solution: 'e.g., Screen replacement, cleanup & optimization...',
      result: 'e.g., Device working perfectly, saved £200 vs new...'
    }
  }
];

const QUALITY_CHECKS = [
  { id: 'specific', label: 'Is it specific? (Names, numbers, details)', required: true },
  { id: 'problem', label: 'Does it show a clear problem solved?', required: true },
  { id: 'result', label: 'Does it show measurable results?', required: true },
  { id: 'testimonial', label: 'Does it include client words?', required: false }
];

const PortfolioSnapshotSandbox: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(PORTFOLIO_TEMPLATES[0]);
  const [entry, setEntry] = useState<PortfolioEntry>({
    title: '',
    client: '',
    problem: '',
    solution: '',
    result: '',
    testimonial: ''
  });
  const [savedEntries, setSavedEntries] = useState<PortfolioEntry[]>([]);

  const constraints: SandboxConstraints = {
    minItems: 1,
    timeLimit: 300 // 5 minutes
  };

  const prompt: SandboxPrompt = {
    title: 'Create Portfolio Snapshot',
    instruction: 'Document one piece of work you\'ve done (or could do) as a portfolio piece. Include specific details — vague portfolios don\'t convince anyone.',
    tips: [
      'Use real names (with permission) or realistic examples',
      'Include numbers wherever possible',
      'Show the transformation (before → after)',
      'Get a quote from the client if possible'
    ],
    example: 'Website Setup for Aunty Joy\'s Kitchen: They had no online presence and were losing to competitors. I set up Google Business + simple website. Result: 40% more phone orders in 2 weeks. "Marcus sorted us out in one afternoon!" - Joy'
  };

  const updateEntry = (field: keyof PortfolioEntry, value: string) => {
    setEntry(prev => ({ ...prev, [field]: value }));
  };

  const filledFields = [
    entry.title,
    entry.client,
    entry.problem,
    entry.solution,
    entry.result
  ].filter(f => f.trim().length > 5).length;

  const isComplete = filledFields >= 4;

  const saveEntry = () => {
    if (isComplete) {
      setSavedEntries([...savedEntries, entry]);
      setEntry({
        title: '',
        client: '',
        problem: '',
        solution: '',
        result: '',
        testimonial: ''
      });
    }
  };

  const handleComplete = useCallback((): SandboxResult => {
    const allEntries = isComplete ? [...savedEntries, entry] : savedEntries;
    
    return {
      success: allEntries.length >= 1,
      data: {
        entries: allEntries,
        totalPieces: allEntries.length,
        template: selectedTemplate.name
      },
      feedback: allEntries.length === 0
        ? 'Complete at least one portfolio piece!'
        : `Portfolio snapshot ready! ${allEntries.length} piece${allEntries.length > 1 ? 's' : ''} documented. Now use these when pitching to clients.`
    };
  }, [entry, savedEntries, isComplete, selectedTemplate]);

  return (
    <MiniSandboxBase
      title="Portfolio Snapshot"
      emoji="📸"
      programme="Cross-Programme"
      constraints={constraints}
      prompt={prompt}
      onComplete={handleComplete}
      color="#8b5cf6"
    >
      <div className="mini-sandbox__portfolio">
        {/* Template Selector */}
        <div className="mini-sandbox__template-selector">
          {PORTFOLIO_TEMPLATES.map(template => (
            <button
              key={template.id}
              className={`mini-sandbox__template-btn ${selectedTemplate.id === template.id ? 'selected' : ''}`}
              onClick={() => setSelectedTemplate(template)}
            >
              <span className="mini-sandbox__template-icon">{template.icon}</span>
              <span>{template.name}</span>
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="mini-sandbox__portfolio-progress">
          <span>{filledFields}/5 fields</span>
          {isComplete && <CheckCircle size={16} className="success" />}
        </div>

        {/* Entry Form */}
        <div className="mini-sandbox__portfolio-form">
          <div className="mini-sandbox__portfolio-field">
            <label>Project Title</label>
            <input
              type="text"
              value={entry.title}
              onChange={(e) => updateEntry('title', e.target.value)}
              placeholder="e.g., Website Setup for Aunty Joy's Kitchen"
            />
          </div>

          <div className="mini-sandbox__portfolio-field">
            <label>Client/Who</label>
            <input
              type="text"
              value={entry.client}
              onChange={(e) => updateEntry('client', e.target.value)}
              placeholder={selectedTemplate.prompts.client}
            />
          </div>

          <div className="mini-sandbox__portfolio-field">
            <label>The Problem</label>
            <textarea
              value={entry.problem}
              onChange={(e) => updateEntry('problem', e.target.value)}
              placeholder={selectedTemplate.prompts.problem}
              rows={2}
            />
          </div>

          <div className="mini-sandbox__portfolio-field">
            <label>Your Solution</label>
            <textarea
              value={entry.solution}
              onChange={(e) => updateEntry('solution', e.target.value)}
              placeholder={selectedTemplate.prompts.solution}
              rows={2}
            />
          </div>

          <div className="mini-sandbox__portfolio-field">
            <label>The Result</label>
            <textarea
              value={entry.result}
              onChange={(e) => updateEntry('result', e.target.value)}
              placeholder={selectedTemplate.prompts.result}
              rows={2}
            />
          </div>

          <div className="mini-sandbox__portfolio-field">
            <label>Client Quote (Optional but powerful)</label>
            <input
              type="text"
              value={entry.testimonial}
              onChange={(e) => updateEntry('testimonial', e.target.value)}
              placeholder='"They sorted me out in one afternoon!" - Client Name'
            />
          </div>
        </div>

        {/* Quality Check */}
        <div className="mini-sandbox__quality-check">
          <h4>Quality Check:</h4>
          {QUALITY_CHECKS.map(check => (
            <div key={check.id} className="mini-sandbox__check-item">
              <span className={`mini-sandbox__check-icon ${
                check.id === 'specific' && (entry.client.length > 5) ? 'pass' :
                check.id === 'problem' && (entry.problem.length > 10) ? 'pass' :
                check.id === 'result' && (entry.result.length > 10) ? 'pass' :
                check.id === 'testimonial' && (entry.testimonial.length > 5) ? 'pass' : ''
              }`}>
                {check.required ? '●' : '○'}
              </span>
              <span>{check.label}</span>
            </div>
          ))}
        </div>

        {/* Preview */}
        {isComplete && (
          <div className="mini-sandbox__portfolio-preview">
            <h4>Preview:</h4>
            <div className="mini-sandbox__preview-card">
              <h5>{entry.title}</h5>
              <p><strong>Client:</strong> {entry.client}</p>
              <p><strong>Challenge:</strong> {entry.problem}</p>
              <p><strong>Solution:</strong> {entry.solution}</p>
              <p><strong>Result:</strong> {entry.result}</p>
              {entry.testimonial && (
                <p className="mini-sandbox__preview-quote">"{entry.testimonial}"</p>
              )}
            </div>
          </div>
        )}

        {/* Save Button */}
        {isComplete && (
          <button className="mini-sandbox__save-entry" onClick={saveEntry}>
            Save & Create Another
          </button>
        )}

        {/* Saved Entries */}
        {savedEntries.length > 0 && (
          <div className="mini-sandbox__saved-entries">
            <h4>Saved: {savedEntries.length} piece{savedEntries.length > 1 ? 's' : ''}</h4>
            {savedEntries.map((e, i) => (
              <div key={i} className="mini-sandbox__saved-item">
                {e.title} • {e.client}
              </div>
            ))}
          </div>
        )}
      </div>
    </MiniSandboxBase>
  );
};

export default PortfolioSnapshotSandbox;