/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * Scrap Cat Sandbox - Upcycling & Sustainable Making Space
 * 
 * A creative sandbox where community members transform waste materials
 * into valuable products and art.
 * 
 * Pathways to income:
 * - Upcycled product sales through Cyberstore
 * - Workshop facilitation
 * - Material sourcing and preparation services
 * - Custom commission work
 */

import React, { useState, useEffect } from 'react';
import {
  MayaCompanion,
  MayaWelcome,
  MayaEncouragement,
  MayaCommunityMirror,
  MayaGatekeeperBypass,
  MayaIgnition,
  MayaPush,
  MayaPathwayReminder,
  MayaSuccessStory,
  useMayaStore,
  useMayaTracking,
} from '../../../maya';
import './sandbox.css';

// Upcycling material interests
const MATERIAL_TYPES = [
  { id: 'textiles', label: 'Textiles & Fabric', icon: '🧵', description: 'Clothes, curtains, linens' },
  { id: 'wood', label: 'Wood & Pallets', icon: '🪵', description: 'Furniture, crates, offcuts' },
  { id: 'electronics', label: 'Electronics & Tech', icon: '⚡', description: 'Components, cases, cables' },
  { id: 'plastic', label: 'Plastic & Packaging', icon: '♻️', description: 'Bottles, containers, bags' },
  { id: 'metal', label: 'Metal & Hardware', icon: '🔩', description: 'Cans, fixtures, parts' },
  { id: 'paper', label: 'Paper & Cardboard', icon: '📦', description: 'Boxes, magazines, books' },
];

// Product categories for upcycling
const PRODUCT_CATEGORIES = [
  { id: 'home-decor', label: 'Home Décor', examples: ['Wall art', 'Planters', 'Storage'] },
  { id: 'fashion', label: 'Fashion & Accessories', examples: ['Bags', 'Jewelry', 'Clothing'] },
  { id: 'furniture', label: 'Furniture', examples: ['Shelves', 'Tables', 'Seating'] },
  { id: 'garden', label: 'Garden & Outdoor', examples: ['Planters', 'Bird houses', 'Markers'] },
  { id: 'functional', label: 'Functional Items', examples: ['Organizers', 'Tools', 'Containers'] },
  { id: 'art', label: 'Art & Sculptures', examples: ['Installations', 'Mixed media', 'Mosaics'] },
];

// Income pathways
const UPCYCLING_PATHWAYS = [
  { 
    id: 'cyberstore-sales', 
    label: 'Cyberstore Product Sales',
    description: 'Sell your upcycled creations through our marketplace',
    skills: ['Making', 'Photography', 'Pricing'],
    earningPotential: '55% of sales'
  },
  { 
    id: 'workshops', 
    label: 'Workshop Facilitation',
    description: 'Teach upcycling skills to community members',
    skills: ['Teaching', 'Demonstration', 'Safety'],
    earningPotential: '£25-50/session'
  },
  { 
    id: 'commissions', 
    label: 'Custom Commissions',
    description: 'Create bespoke pieces for clients',
    skills: ['Client communication', 'Design', 'Problem-solving'],
    earningPotential: '£50-300/piece'
  },
  { 
    id: 'material-prep', 
    label: 'Material Preparation',
    description: 'Source, clean, and prepare materials for other makers',
    skills: ['Sourcing', 'Sorting', 'Quality assessment'],
    earningPotential: '£15-25/hour'
  },
];

const ScrapCatSandbox: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedPathways, setSelectedPathways] = useState<string[]>([]);
  const [projectIdea, setProjectIdea] = useState('');
  const [showMayaCommunity, setShowMayaCommunity] = useState(false);
  
  const { trackAction, trackProjectNamed } = useMayaTracking();
  const startSession = useMayaStore((s) => s.startSession);

  useEffect(() => {
    startSession();
    const timer = setTimeout(() => setShowMayaCommunity(true), 2000);
    return () => clearTimeout(timer);
  }, [startSession]);

  const handleMaterialSelect = (materialId: string) => {
    trackAction('tool_use');
    setSelectedMaterials(prev => 
      prev.includes(materialId) 
        ? prev.filter(m => m !== materialId)
        : [...prev, materialId]
    );
  };

  const handleProductSelect = (productId: string) => {
    trackAction('tool_use');
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(p => p !== productId)
        : [...prev, productId]
    );
  };

  const handlePathwaySelect = (pathwayId: string) => {
    trackAction('direction_action');
    setSelectedPathways(prev => 
      prev.includes(pathwayId)
        ? prev.filter(p => p !== pathwayId)
        : [...prev, pathwayId]
    );
  };

  const handleGeneratePlan = () => {
    trackProjectNamed('upcycling-project');
    setStep(4);
  };

  return (
    <div className="scrapcat-sandbox">
      <MayaCompanion />
      
      <header className="sandbox-header">
        <h1>♻️ Scrap Cat</h1>
        <p className="sandbox-subtitle">One person's waste is another's material. Let's transform it.</p>
      </header>

      {step === 1 && (
        <section className="sandbox-step">
          <div className="maya-welcome-container">
            <MayaWelcome message="Welcome to the upcycling workshop. Everything here started as something else. That's the magic." />
          </div>
          
          <div className="maya-bypass-container">
            <MayaGatekeeperBypass message="No art degree. No craft certification. You see potential in things others throw away—that's the only qualification." />
          </div>

          <h2>What materials speak to you?</h2>
          <p className="step-description">Select the materials you want to work with</p>

          <div className="materials-grid">
            {MATERIAL_TYPES.map(material => (
              <button
                key={material.id}
                className={`material-card ${selectedMaterials.includes(material.id) ? 'selected' : ''}`}
                onClick={() => handleMaterialSelect(material.id)}
              >
                <span className="material-icon">{material.icon}</span>
                <span className="material-label">{material.label}</span>
                <span className="material-description">{material.description}</span>
              </button>
            ))}
          </div>

          {selectedMaterials.length > 0 && (
            <button className="next-button" onClick={() => setStep(2)}>
              Choose What to Make →
            </button>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="sandbox-step">
          <h2>What do you want to create?</h2>
          <p className="step-description">Select product categories that interest you</p>

          <div className="products-grid">
            {PRODUCT_CATEGORIES.map(product => (
              <button
                key={product.id}
                className={`product-card ${selectedProducts.includes(product.id) ? 'selected' : ''}`}
                onClick={() => handleProductSelect(product.id)}
              >
                <h3>{product.label}</h3>
                <div className="product-examples">
                  {product.examples.map(ex => (
                    <span key={ex} className="example-tag">{ex}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {selectedProducts.length > 0 && (
            <button className="next-button" onClick={() => setStep(3)}>
              Explore Income Pathways →
            </button>
          )}
        </section>
      )}

      {step === 3 && (
        <section className="sandbox-step">
          {showMayaCommunity && (
            <div className="maya-community-container">
              <MayaCommunityMirror message="31 makers from Brent are earning through Scrap Cat. You're joining a community of resourceful creators." />
            </div>
          )}

          <div className="maya-success-container">
            <MayaSuccessStory 
              story={{
                creatorFirstName: 'Marcus',
                area: 'Stonebridge',
                achievement: 'turns pallet wood into furniture, now has regular commission clients',
                timeAgo: '4 months ago',
                quote: "I used to just see rubbish. Now I see raw materials everywhere."
              }}
            />
          </div>

          <h2>How would you like to earn?</h2>
          <p className="step-description">Select your income pathways</p>

          <div className="pathways-grid">
            {UPCYCLING_PATHWAYS.map(pathway => (
              <button
                key={pathway.id}
                className={`pathway-card ${selectedPathways.includes(pathway.id) ? 'selected' : ''}`}
                onClick={() => handlePathwaySelect(pathway.id)}
              >
                <h3>{pathway.label}</h3>
                <p className="pathway-description">{pathway.description}</p>
                <div className="pathway-skills">
                  {pathway.skills.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
                <span className="earning-potential">{pathway.earningPotential}</span>
              </button>
            ))}
          </div>

          {selectedPathways.length === 1 && (
            <div className="maya-push-container">
              <MayaPush message="One pathway chosen. Most successful makers combine selling with teaching or commissions." />
            </div>
          )}

          {selectedPathways.length >= 1 && (
            <div className="project-section">
              <h3>What's your first project idea?</h3>
              <textarea
                value={projectIdea}
                onChange={(e) => setProjectIdea(e.target.value)}
                placeholder="Describe what you'd like to make from your chosen materials..."
                className="project-input"
              />
              <button className="next-button" onClick={handleGeneratePlan}>
                Create My Maker Plan →
              </button>
            </div>
          )}
        </section>
      )}

      {step === 4 && (
        <section className="sandbox-step">
          <div className="maya-ignition-container">
            <MayaIgnition message="You just designed your path from maker to entrepreneur. From waste to income—that's real transformation." />
          </div>

          <h2>Your Maker Journey</h2>
          
          <div className="plan-summary">
            <div className="plan-section">
              <h3>Your Materials</h3>
              <div className="selected-items">
                {selectedMaterials.map(id => {
                  const material = MATERIAL_TYPES.find(m => m.id === id);
                  return material ? (
                    <span key={id} className="selected-tag">{material.icon} {material.label}</span>
                  ) : null;
                })}
              </div>
            </div>

            <div className="plan-section">
              <h3>Your Products</h3>
              <div className="selected-items">
                {selectedProducts.map(id => {
                  const product = PRODUCT_CATEGORIES.find(p => p.id === id);
                  return product ? (
                    <span key={id} className="selected-tag">{product.label}</span>
                  ) : null;
                })}
              </div>
            </div>

            <div className="plan-section">
              <h3>Your Income Pathways</h3>
              <div className="selected-items">
                {selectedPathways.map(id => {
                  const pathway = UPCYCLING_PATHWAYS.find(p => p.id === id);
                  return pathway ? (
                    <div key={id} className="pathway-summary">
                      <strong>{pathway.label}</strong>
                      <span className="earning-potential">{pathway.earningPotential}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {projectIdea && (
              <div className="plan-section">
                <h3>Your First Project</h3>
                <p className="project-display">{projectIdea}</p>
              </div>
            )}
          </div>

          <div className="maya-pathway-container">
            <MayaPathwayReminder message="This isn't a hobby room. This IS your workshop where waste becomes income." />
          </div>

          <div className="next-steps">
            <h3>Ready to Make?</h3>
            <div className="action-buttons">
              <button className="action-button primary">Book Workshop Time</button>
              <button className="action-button secondary">Get Material Pack</button>
              <button className="action-button secondary">Find a Maker Mentor</button>
            </div>
          </div>

          <div className="maya-final-container">
            <MayaEncouragement message="You've claimed your space as a maker. Waste becomes resource. Resource becomes product. Product becomes income. You designed that." />
          </div>
        </section>
      )}
    </div>
  );
};

export default ScrapCatSandbox;
