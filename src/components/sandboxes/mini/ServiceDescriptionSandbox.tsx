// src/components/sandboxes/mini/ServiceDescriptionSandbox.tsx
// 📝 50-Word Service Description
// PageTurners - Write a compelling service pitch in exactly 50 words

import React, { useState, useCallback } from 'react';
import MiniSandboxBase, { SandboxConstraints, SandboxPrompt, SandboxResult } from './MiniSandboxBase';
import { FileText, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import './MiniSandbox.css';

interface ServiceTemplate {
  id: string;
  name: string;
  icon: string;
  prompt: string;
  example: string;
}

const SERVICE_TEMPLATES: ServiceTemplate[] = [
  {
    id: 'tech-support',
    name: 'Tech Support',
    icon: '💻',
    prompt: 'Describe a tech support service for local businesses',
    example: 'Struggling with slow computers and confusing software? I provide friendly, jargon-free tech support for Wembley businesses. Same-day response, fair pricing, and I actually explain what I\'m doing. Your first consultation is free. Let\'s get your tech working for you, not against you.'
  },
  {
    id: 'podcast-production',
    name: 'Podcast Production',
    icon: '🎙️',
    prompt: 'Describe a podcast production service for professionals',
    example: 'Want a podcast but hate the technical hassle? I handle everything — recording, editing, publishing, show notes. You just show up and talk. Perfect for busy professionals who want to build authority without learning audio software. Three clients launched last month. You could be next.'
  },
  {
    id: 'event-photography',
    name: 'Event Photography',
    icon: '📸',
    prompt: 'Describe an event photography service for community events',
    example: 'Your church event deserves more than phone photos. I capture celebrations, conferences, and community gatherings with professional quality at community-friendly prices. Digital delivery within 48 hours, perfect for social media. Serving Brent churches and organizations. Let\'s preserve your special moments properly.'
  },
  {
    id: 'social-media',
    name: 'Social Media Management',
    icon: '📱',
    prompt: 'Describe a social media service for restaurants',
    example: 'Your food looks amazing. Your Instagram doesn\'t. I create mouth-watering content that fills tables — professional photos, engaging captions, consistent posting. Serving Wembley restaurants who are tired of empty feeds and emptier tables. One client doubled their weekday bookings. Free audit available.'
  },
  {
    id: 'personal-styling',
    name: 'Personal Styling',
    icon: '👗',
    prompt: 'Describe a personal styling service',
    example: 'Tired of staring at a full wardrobe with nothing to wear? I help busy professionals build confidence through intentional style. Virtual consultations, wardrobe audits, and shopping guidance. No judgment, just results. Your first session includes a personalized style guide you\'ll actually use.'
  },
  {
    id: 'livestream',
    name: 'Livestream Services',
    icon: '📡',
    prompt: 'Describe a livestreaming service for churches',
    example: 'Your congregation shouldn\'t end at your walls. I set up professional livestreams for churches — clear audio, stable video, easy for anyone to watch. Elderly members, overseas family, everyone included. Fixed monthly rate, no surprises. Twelve churches already streaming. Join them.'
  }
];

const ServiceDescriptionSandbox: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(SERVICE_TEMPLATES[0]);
  const [description, setDescription] = useState('');
  const [completedDescriptions, setCompletedDescriptions] = useState<Array<{template: string; text: string; wordCount: number}>>([]);

  const constraints: SandboxConstraints = {
    maxLength: 50,
    minItems: 1,
    timeLimit: 300 // 5 minutes
  };

  const prompt: SandboxPrompt = {
    title: selectedTemplate.name,
    instruction: selectedTemplate.prompt + '. Use exactly 50 words — no more, no less.',
    tips: [
      'Start with their problem, not your service',
      'Include a specific result or proof point',
      'End with a clear call to action',
      'Every word must earn its place'
    ],
    example: selectedTemplate.example
  };

  const wordCount = description.trim().split(/\s+/).filter(w => w).length;
  const isExactly50 = wordCount === 50;
  const isClose = wordCount >= 45 && wordCount <= 55;

  const handleSave = () => {
    if (description.trim()) {
      setCompletedDescriptions([...completedDescriptions, {
        template: selectedTemplate.name,
        text: description,
        wordCount
      }]);
      setDescription('');
    }
  };

  const nextTemplate = () => {
    const currentIndex = SERVICE_TEMPLATES.findIndex(t => t.id === selectedTemplate.id);
    const nextIndex = (currentIndex + 1) % SERVICE_TEMPLATES.length;
    setSelectedTemplate(SERVICE_TEMPLATES[nextIndex]);
    setDescription('');
  };

  const randomTemplate = () => {
    const randomIndex = Math.floor(Math.random() * SERVICE_TEMPLATES.length);
    setSelectedTemplate(SERVICE_TEMPLATES[randomIndex]);
    setDescription('');
  };

  const handleComplete = useCallback((): SandboxResult => {
    const allDescriptions = description.trim() 
      ? [...completedDescriptions, { template: selectedTemplate.name, text: description, wordCount }]
      : completedDescriptions;

    const hasExact50 = allDescriptions.some(d => d.wordCount === 50);

    return {
      success: allDescriptions.length > 0 && hasExact50,
      data: {
        descriptions: allDescriptions,
        totalWritten: allDescriptions.length,
        perfectCount: allDescriptions.filter(d => d.wordCount === 50).length
      },
      feedback: allDescriptions.length === 0
        ? 'Write at least one service description!'
        : !hasExact50
          ? `Good effort! But none hit exactly 50 words. Your closest: ${Math.min(...allDescriptions.map(d => Math.abs(d.wordCount - 50)))} words off.`
          : `Perfect! ${allDescriptions.filter(d => d.wordCount === 50).length} description(s) at exactly 50 words. That\'s the discipline that makes great copy.`
    };
  }, [description, wordCount, completedDescriptions, selectedTemplate]);

  return (
    <MiniSandboxBase
      title="50-Word Service Pitch"
      emoji="📝"
      programme="PageTurners"
      constraints={constraints}
      prompt={prompt}
      onComplete={handleComplete}
      color="#8b5cf6"
    >
      <div className="mini-sandbox__service-desc">
        {/* Template Selector */}
        <div className="mini-sandbox__template-grid">
          {SERVICE_TEMPLATES.map(template => (
            <button
              key={template.id}
              className={`mini-sandbox__template-card ${selectedTemplate.id === template.id ? 'selected' : ''}`}
              onClick={() => {
                setSelectedTemplate(template);
                setDescription('');
              }}
            >
              <span className="mini-sandbox__template-icon">{template.icon}</span>
              <span>{template.name}</span>
            </button>
          ))}
        </div>

        {/* Word Counter */}
        <div className={`mini-sandbox__word-display ${isExactly50 ? 'perfect' : isClose ? 'close' : wordCount > 50 ? 'over' : ''}`}>
          <div className="mini-sandbox__word-number">{wordCount}</div>
          <div className="mini-sandbox__word-target">/ 50 words</div>
          {isExactly50 && <CheckCircle size={24} className="mini-sandbox__perfect-icon" />}
          {wordCount > 50 && <AlertCircle size={24} className="mini-sandbox__over-icon" />}
        </div>

        {/* Writing Area */}
        <div className="mini-sandbox__writing-area">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Start with their problem..."
            rows={6}
            className={isExactly50 ? 'perfect' : wordCount > 50 ? 'over' : ''}
          />
        </div>

        {/* Word Guidance */}
        <div className="mini-sandbox__word-guidance">
          {wordCount === 0 && <span>Start writing your 50-word pitch</span>}
          {wordCount > 0 && wordCount < 45 && <span>{50 - wordCount} more words needed</span>}
          {wordCount >= 45 && wordCount < 50 && <span>Almost there! {50 - wordCount} more words</span>}
          {isExactly50 && <span className="perfect">✨ Perfect! Exactly 50 words</span>}
          {wordCount > 50 && wordCount <= 55 && <span className="over">Cut {wordCount - 50} words</span>}
          {wordCount > 55 && <span className="over">Way over! Cut {wordCount - 50} words</span>}
        </div>

        {/* Example Toggle */}
        <details className="mini-sandbox__example-toggle">
          <summary>See example (50 words)</summary>
          <p className="mini-sandbox__example-text">{selectedTemplate.example}</p>
        </details>

        {/* Actions */}
        <div className="mini-sandbox__desc-actions">
          {isExactly50 && (
            <button className="mini-sandbox__save-btn" onClick={handleSave}>
              <CheckCircle size={16} /> Save & Try Another
            </button>
          )}
          <button className="mini-sandbox__next-btn" onClick={nextTemplate}>
            Next Template
          </button>
          <button className="mini-sandbox__random-btn" onClick={randomTemplate}>
            <RefreshCw size={16} /> Random
          </button>
        </div>

        {/* Completed */}
        {completedDescriptions.length > 0 && (
          <div className="mini-sandbox__completed-list">
            <h4>Completed: {completedDescriptions.length}</h4>
            {completedDescriptions.map((desc, i) => (
              <div key={i} className={`mini-sandbox__completed-item ${desc.wordCount === 50 ? 'perfect' : ''}`}>
                <span>{desc.template}</span>
                <span>{desc.wordCount} words {desc.wordCount === 50 && '✨'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </MiniSandboxBase>
  );
};

export default ServiceDescriptionSandbox;