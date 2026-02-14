// src/components/sandboxes/mini/ServiceMenuSandbox.tsx
// 📋 Service Menu Builder
// All Programmes - Create your 5-item service offering for local businesses

import React, { useState, useCallback } from 'react';
import MiniSandboxBase, { SandboxConstraints, SandboxPrompt, SandboxResult } from './MiniSandboxBase';
import { FileText, DollarSign, Clock, Plus, Trash2, CheckCircle } from 'lucide-react';
import './MiniSandbox.css';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  forWhom: string;
}

const SERVICE_CATEGORIES = [
  { id: 'media', name: 'Media & Content', icon: '🎬', examples: ['Livestream setup', 'Podcast production', 'Social media content'] },
  { id: 'tech', name: 'Tech & Digital', icon: '💻', examples: ['Website updates', 'Tech support', 'System setup'] },
  { id: 'styling', name: 'Styling & Creative', icon: '👗', examples: ['Personal styling', 'Event styling', 'Photography'] },
  { id: 'repair', name: 'Repair & Maintenance', icon: '🔧', examples: ['Phone repair', 'Computer cleanup', 'Equipment service'] },
  { id: 'consulting', name: 'Consulting & Training', icon: '📊', examples: ['Social media training', 'Tech lessons', 'Business advice'] }
];

const PRICING_TIPS = [
  'Don\'t undercharge — your time has value',
  'Consider: per hour, per project, or monthly retainer',
  'Higher prices signal quality to business clients',
  'Include a "quick win" low-cost option'
];

const ServiceMenuSandbox: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([
    { id: '1', name: '', description: '', price: '', duration: '', forWhom: '' }
  ]);
  const [selectedCategory, setSelectedCategory] = useState(SERVICE_CATEGORIES[0]);
  const [businessName, setBusinessName] = useState('');

  const constraints: SandboxConstraints = {
    minItems: 3,
    maxItems: 5,
    timeLimit: 600 // 10 minutes
  };

  const prompt: SandboxPrompt = {
    title: 'Build Your Service Menu',
    instruction: 'Create 3-5 services you could offer to local businesses. Think about what they actually need, not just what you can do.',
    tips: PRICING_TIPS,
    example: 'Social Media Setup — Help businesses create and optimize their Instagram/Google presence. £150 one-time setup + £75/month management.'
  };

  const addService = () => {
    if (services.length < 5) {
      setServices([...services, {
        id: Date.now().toString(),
        name: '',
        description: '',
        price: '',
        duration: '',
        forWhom: ''
      }]);
    }
  };

  const removeService = (id: string) => {
    if (services.length > 1) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const updateService = (id: string, field: keyof ServiceItem, value: string) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const completedServices = services.filter(s => 
    s.name.trim() && s.price.trim() && s.description.trim()
  );

  const handleComplete = useCallback((): SandboxResult => {
    const isValid = completedServices.length >= 3;
    
    return {
      success: isValid,
      data: {
        businessName,
        category: selectedCategory.name,
        services: completedServices,
        totalServices: completedServices.length
      },
      feedback: !isValid
        ? `You need at least 3 complete services. You have ${completedServices.length}.`
        : `Great menu! ${completedServices.length} services ready. Now go pitch to real businesses!`
    };
  }, [completedServices, businessName, selectedCategory]);

  return (
    <MiniSandboxBase
      title="Service Menu Builder"
      emoji="📋"
      programme="All Programmes"
      constraints={constraints}
      prompt={prompt}
      onComplete={handleComplete}
      color="#8b5cf6"
    >
      <div className="mini-sandbox__menu-builder">
        {/* Business Name */}
        <div className="mini-sandbox__business-name">
          <label>Your Business Name (optional)</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g., TechHelp by Marcus, Style by Jade..."
          />
        </div>

        {/* Category Selector */}
        <div className="mini-sandbox__category-selector">
          <label>Service Category</label>
          <div className="mini-sandbox__categories">
            {SERVICE_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`mini-sandbox__category ${selectedCategory.id === cat.id ? 'selected' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span className="mini-sandbox__category-icon">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
          <div className="mini-sandbox__category-examples">
            Ideas: {selectedCategory.examples.join(', ')}
          </div>
        </div>

        {/* Progress */}
        <div className="mini-sandbox__progress-bar">
          <div className="mini-sandbox__progress-label">
            <span>{completedServices.length}/3 minimum services</span>
            {completedServices.length >= 3 && <CheckCircle size={16} className="success" />}
          </div>
          <div className="mini-sandbox__progress-track">
            <div 
              className="mini-sandbox__progress-fill"
              style={{ width: `${Math.min((completedServices.length / 3) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Service Cards */}
        <div className="mini-sandbox__service-list">
          {services.map((service, index) => (
            <div key={service.id} className="mini-sandbox__service-card">
              <div className="mini-sandbox__service-header">
                <span>Service {index + 1}</span>
                {services.length > 1 && (
                  <button 
                    className="mini-sandbox__remove-btn"
                    onClick={() => removeService(service.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="mini-sandbox__service-fields">
                <input
                  type="text"
                  value={service.name}
                  onChange={(e) => updateService(service.id, 'name', e.target.value)}
                  placeholder="Service name"
                  className="mini-sandbox__service-name"
                />

                <textarea
                  value={service.description}
                  onChange={(e) => updateService(service.id, 'description', e.target.value)}
                  placeholder="What do you actually do? What problem does this solve?"
                  rows={2}
                />

                <div className="mini-sandbox__service-row">
                  <div className="mini-sandbox__field">
                    <DollarSign size={16} />
                    <input
                      type="text"
                      value={service.price}
                      onChange={(e) => updateService(service.id, 'price', e.target.value)}
                      placeholder="£50/hour or £200 flat"
                    />
                  </div>
                  <div className="mini-sandbox__field">
                    <Clock size={16} />
                    <input
                      type="text"
                      value={service.duration}
                      onChange={(e) => updateService(service.id, 'duration', e.target.value)}
                      placeholder="1-2 hours"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  value={service.forWhom}
                  onChange={(e) => updateService(service.id, 'forWhom', e.target.value)}
                  placeholder="Best for: restaurants, salons, churches..."
                  className="mini-sandbox__for-whom"
                />
              </div>

              {service.name && service.price && service.description && (
                <div className="mini-sandbox__service-complete">
                  <CheckCircle size={14} /> Complete
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Service Button */}
        {services.length < 5 && (
          <button className="mini-sandbox__add-service" onClick={addService}>
            <Plus size={18} /> Add Service ({services.length}/5)
          </button>
        )}

        {/* Preview */}
        {completedServices.length > 0 && (
          <div className="mini-sandbox__menu-preview">
            <h4>{businessName || 'Your Services'}</h4>
            <div className="mini-sandbox__preview-list">
              {completedServices.map((s, i) => (
                <div key={i} className="mini-sandbox__preview-item">
                  <span className="mini-sandbox__preview-name">{s.name}</span>
                  <span className="mini-sandbox__preview-price">{s.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MiniSandboxBase>
  );
};

export default ServiceMenuSandbox;