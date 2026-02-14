/**
 * Invention Disclosure Form
 * Wembley Wonders CIC - Community Innovation IP System
 * 
 * Multi-step form for documenting inventions from workshops and programmes.
 * Captures all necessary information for patent assessment.
 */

import React, { useState, useCallback } from 'react';
import { ProgrammeSource } from '../types';
import styles from './InventionDisclosureForm.module.scss';

// ============================================================================
// TYPES
// ============================================================================

interface InventorInput {
  name: string;
  email: string;
  contribution: string;
  percentage: number;
  programmeEnrolment?: string;
}

interface PriorArtInput {
  type: 'patent' | 'publication' | 'product' | 'website' | 'other';
  title: string;
  reference: string;
  url?: string;
  relevance: string;
  howDifferent: string;
}

interface PublicDisclosure {
  date: string;
  type: 'presentation' | 'publication' | 'sale' | 'exhibition' | 'conversation' | 'other';
  description: string;
  audience: string;
  confidentialityAgreement: boolean;
}

type DevelopmentStage = 'concept' | 'proof-of-concept' | 'prototype' | 'working-model' | 'market-ready';
type FormStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface FormData {
  inventionTitle: string;
  technicalField: string;
  prototypeId: string;
  programme: ProgrammeSource;
  problemSolved: string;
  solution: string;
  novelFeatures: string[];
  advantages: string[];
  conceptionDate: string;
  firstWrittenRecord: string;
  firstPrototype: string;
  publicDisclosures: PublicDisclosure[];
  inventors: InventorInput[];
  knownPriorArt: PriorArtInput[];
  priorArtSearchConducted: boolean;
  potentialApplications: string[];
  targetMarkets: string[];
  competitiveAdvantages: string;
  estimatedDevelopmentStage: DevelopmentStage;
}

const initialFormData: FormData = {
  inventionTitle: '',
  technicalField: '',
  prototypeId: '',
  programme: 'stemgeneers',
  problemSolved: '',
  solution: '',
  novelFeatures: [''],
  advantages: [''],
  conceptionDate: '',
  firstWrittenRecord: '',
  firstPrototype: '',
  publicDisclosures: [],
  inventors: [{ name: '', email: '', contribution: '', percentage: 100 }],
  knownPriorArt: [],
  priorArtSearchConducted: false,
  potentialApplications: [''],
  targetMarkets: [''],
  competitiveAdvantages: '',
  estimatedDevelopmentStage: 'concept'
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface InventionDisclosureFormProps {
  prototypeId?: string;
  onComplete: (data: FormData) => void;
  onCancel: () => void;
}

export const InventionDisclosureForm: React.FC<InventionDisclosureFormProps> = ({
  prototypeId,
  onComplete,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    prototypeId: prototypeId || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 7;

  const updateField = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
    }
  }, [errors]);

  const addArrayItem = useCallback(<K extends keyof FormData>(field: K, defaultValue: any) => {
    setFormData(prev => ({ ...prev, [field]: [...(prev[field] as any[]), defaultValue] }));
  }, []);

  const removeArrayItem = useCallback(<K extends keyof FormData>(field: K, index: number) => {
    setFormData(prev => ({ ...prev, [field]: (prev[field] as any[]).filter((_, i) => i !== index) }));
  }, []);

  const updateArrayItem = useCallback(<K extends keyof FormData>(field: K, index: number, value: any) => {
    setFormData(prev => ({ ...prev, [field]: (prev[field] as any[]).map((item, i) => i === index ? value : item) }));
  }, []);

  const validateStep = (step: FormStep): boolean => {
    const newErrors: Record<string, string> = {};
    switch (step) {
      case 1:
        if (!formData.inventionTitle.trim()) newErrors.inventionTitle = 'Required';
        if (!formData.technicalField.trim()) newErrors.technicalField = 'Required';
        break;
      case 2:
        if (!formData.problemSolved.trim()) newErrors.problemSolved = 'Required';
        if (!formData.solution.trim()) newErrors.solution = 'Required';
        break;
      case 3:
        if (!formData.conceptionDate) newErrors.conceptionDate = 'Required';
        break;
      case 4:
        const total = formData.inventors.reduce((sum, i) => sum + i.percentage, 0);
        if (total !== 100) newErrors.inventorPercentage = `Must total 100% (currently ${total}%)`;
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToStep = (step: FormStep) => {
    if (step < currentStep || validateStep(currentStep)) setCurrentStep(step);
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep((currentStep + 1) as FormStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as FormStep);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    setIsSubmitting(true);
    try {
      onComplete(formData);
    } catch (error) {
      setErrors({ submit: 'Submission failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = ['Basics', 'Solution', 'History', 'Inventors', 'Prior Art', 'Commercial', 'Review'];

  return (
    <div className={styles.formContainer}>
      <header className={styles.formHeader}>
        <h1 className={styles.formTitle}>Invention Disclosure</h1>
        <p className={styles.formSubtitle}>Document your innovation for IP assessment</p>
        
        <nav className={styles.stepIndicator}>
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <button
              key={step}
              className={`${styles.stepDot} ${step === currentStep ? styles.current : ''} ${step < currentStep ? styles.completed : ''}`}
              onClick={() => goToStep(step as FormStep)}
            >
              <span className={styles.stepNumber}>{step}</span>
              <span className={styles.stepLabel}>{stepLabels[step - 1]}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className={styles.formContent}>
        {currentStep === 1 && (
          <div className={styles.stepContent}>
            <h2>Basic Information</h2>
            <div className={styles.fieldGroup}>
              <label>Invention Title *</label>
              <input type="text" className={errors.inventionTitle ? styles.hasError : ''} value={formData.inventionTitle} onChange={(e) => updateField('inventionTitle', e.target.value)} placeholder="e.g., Solar-Powered Phone Charger" />
              {errors.inventionTitle && <span className={styles.errorText}>{errors.inventionTitle}</span>}
            </div>
            <div className={styles.fieldGroup}>
              <label>Technical Field *</label>
              <input type="text" className={errors.technicalField ? styles.hasError : ''} value={formData.technicalField} onChange={(e) => updateField('technicalField', e.target.value)} placeholder="e.g., Renewable Energy" />
            </div>
            <div className={styles.fieldGroup}>
              <label>Programme</label>
              <select value={formData.programme} onChange={(e) => updateField('programme', e.target.value as ProgrammeSource)}>
                <option value="stemgeneers">STEMgeneers</option>
                <option value="silk-stilettos">Silk Stilettos</option>
                <option value="techreneurs">TECHreneurs</option>
                <option value="bright-sparks">Bright Sparks</option>
                <option value="scrap-cat">Scrap Cat</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className={styles.stepContent}>
            <h2>Problem & Solution</h2>
            <div className={styles.fieldGroup}>
              <label>Problem Solved *</label>
              <textarea rows={4} value={formData.problemSolved} onChange={(e) => updateField('problemSolved', e.target.value)} placeholder="What issue does this invention address?" />
            </div>
            <div className={styles.fieldGroup}>
              <label>Solution *</label>
              <textarea rows={6} value={formData.solution} onChange={(e) => updateField('solution', e.target.value)} placeholder="How does your invention work?" />
            </div>
            <div className={styles.fieldGroup}>
              <label>Novel Features</label>
              {formData.novelFeatures.map((feature, i) => (
                <div key={i} className={styles.arrayRow}>
                  <input type="text" value={feature} onChange={(e) => updateArrayItem('novelFeatures', i, e.target.value)} placeholder={`Feature ${i + 1}`} />
                  {formData.novelFeatures.length > 1 && <button type="button" onClick={() => removeArrayItem('novelFeatures', i)}>×</button>}
                </div>
              ))}
              <button type="button" className={styles.addButton} onClick={() => addArrayItem('novelFeatures', '')}>+ Add feature</button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className={styles.stepContent}>
            <h2>Development History</h2>
            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label>Conception Date *</label>
                <input type="date" value={formData.conceptionDate} onChange={(e) => updateField('conceptionDate', e.target.value)} />
              </div>
              <div className={styles.fieldGroup}>
                <label>First Written Record</label>
                <input type="date" value={formData.firstWrittenRecord} onChange={(e) => updateField('firstWrittenRecord', e.target.value)} />
              </div>
              <div className={styles.fieldGroup}>
                <label>First Prototype</label>
                <input type="date" value={formData.firstPrototype} onChange={(e) => updateField('firstPrototype', e.target.value)} />
              </div>
            </div>
            <div className={styles.warningBox}>
              <strong>Important:</strong> Document any public disclosures carefully—they may affect patent eligibility.
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className={styles.stepContent}>
            <h2>Inventors</h2>
            {errors.inventorPercentage && <div className={styles.errorBox}>{errors.inventorPercentage}</div>}
            {formData.inventors.map((inventor, i) => (
              <div key={i} className={styles.inventorCard}>
                <div className={styles.cardHeader}>
                  <span>Inventor {i + 1}</span>
                  {formData.inventors.length > 1 && <button onClick={() => removeArrayItem('inventors', i)}>×</button>}
                </div>
                <input type="text" placeholder="Name" value={inventor.name} onChange={(e) => updateArrayItem('inventors', i, { ...inventor, name: e.target.value })} />
                <input type="email" placeholder="Email" value={inventor.email} onChange={(e) => updateArrayItem('inventors', i, { ...inventor, email: e.target.value })} />
                <textarea placeholder="Contribution" value={inventor.contribution} onChange={(e) => updateArrayItem('inventors', i, { ...inventor, contribution: e.target.value })} rows={2} />
                <input type="number" min="0" max="100" placeholder="%" value={inventor.percentage} onChange={(e) => updateArrayItem('inventors', i, { ...inventor, percentage: parseInt(e.target.value) || 0 })} />
              </div>
            ))}
            <button type="button" className={styles.addButton} onClick={() => addArrayItem('inventors', { name: '', email: '', contribution: '', percentage: 0 })}>+ Add inventor</button>
            <div className={styles.totalDisplay}>Total: {formData.inventors.reduce((s, i) => s + i.percentage, 0)}%</div>
          </div>
        )}

        {currentStep === 5 && (
          <div className={styles.stepContent}>
            <h2>Prior Art Research</h2>
            <label className={styles.checkbox}>
              <input type="checkbox" checked={formData.priorArtSearchConducted} onChange={(e) => updateField('priorArtSearchConducted', e.target.checked)} />
              I have conducted a prior art search
            </label>
            {formData.knownPriorArt.map((art, i) => (
              <div key={i} className={styles.priorArtCard}>
                <select value={art.type} onChange={(e) => updateArrayItem('knownPriorArt', i, { ...art, type: e.target.value })}>
                  <option value="patent">Patent</option>
                  <option value="publication">Publication</option>
                  <option value="product">Product</option>
                  <option value="website">Website</option>
                </select>
                <input type="text" placeholder="Title" value={art.title} onChange={(e) => updateArrayItem('knownPriorArt', i, { ...art, title: e.target.value })} />
                <textarea placeholder="How is your invention different?" value={art.howDifferent} onChange={(e) => updateArrayItem('knownPriorArt', i, { ...art, howDifferent: e.target.value })} rows={2} />
                <button onClick={() => removeArrayItem('knownPriorArt', i)}>Remove</button>
              </div>
            ))}
            <button type="button" className={styles.addButton} onClick={() => addArrayItem('knownPriorArt', { type: 'patent', title: '', reference: '', relevance: '', howDifferent: '' })}>+ Add reference</button>
          </div>
        )}

        {currentStep === 6 && (
          <div className={styles.stepContent}>
            <h2>Commercial Potential</h2>
            <div className={styles.fieldGroup}>
              <label>Development Stage</label>
              <select value={formData.estimatedDevelopmentStage} onChange={(e) => updateField('estimatedDevelopmentStage', e.target.value as DevelopmentStage)}>
                <option value="concept">Concept Only</option>
                <option value="proof-of-concept">Proof of Concept</option>
                <option value="prototype">Working Prototype</option>
                <option value="working-model">Refined Model</option>
                <option value="market-ready">Market Ready</option>
              </select>
            </div>
            <div className={styles.fieldGroup}>
              <label>Competitive Advantages</label>
              <textarea rows={4} value={formData.competitiveAdvantages} onChange={(e) => updateField('competitiveAdvantages', e.target.value)} placeholder="Why would someone choose your invention?" />
            </div>
          </div>
        )}

        {currentStep === 7 && (
          <div className={styles.stepContent}>
            <h2>Review & Submit</h2>
            <div className={styles.reviewSection}>
              <h3>Invention: {formData.inventionTitle}</h3>
              <p><strong>Field:</strong> {formData.technicalField}</p>
              <p><strong>Programme:</strong> {formData.programme}</p>
            </div>
            <div className={styles.reviewSection}>
              <h3>Inventors ({formData.inventors.length})</h3>
              <ul>{formData.inventors.map((inv, i) => <li key={i}>{inv.name} ({inv.percentage}%)</li>)}</ul>
            </div>
            <div className={styles.consentBox}>
              <p>By submitting, I confirm this information is accurate and agree to the Wembley Wonders community ownership principles.</p>
            </div>
          </div>
        )}

        {errors.submit && <div className={styles.submitError}>{errors.submit}</div>}
      </main>

      <footer className={styles.formActions}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>Cancel</button>
        <div className={styles.navButtons}>
          {currentStep > 1 && <button type="button" onClick={prevStep} className={styles.prevButton}>← Previous</button>}
          {currentStep < totalSteps ? (
            <button type="button" onClick={nextStep} className={styles.nextButton}>Next →</button>
          ) : (
            <button type="button" onClick={handleSubmit} disabled={isSubmitting} className={styles.submitButton}>
              {isSubmitting ? 'Submitting...' : 'Submit Disclosure'}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default InventionDisclosureForm;