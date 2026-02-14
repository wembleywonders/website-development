/**
 * ValuationWorksheetForm
 * Wembley Wonders CIC
 * 
 * Digital version of the Valuation Architecture Worksheet
 * Designed for use during making sessions in Impact Labs
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  ValuationWorksheet,
  WorksheetMeta,
  LineageSection,
  FunctionSection,
  DistinctivenessSection,
  AuthoritySection,
  DocumentationEntry,
  EvidenceChecklist,
  DefencePreparation,
  Programme,
  Comparable,
  InfluenceEntry,
  DistinctivenessMarker,
  DISTINCTIVENESS_MARKER_LABELS,
  EVIDENCE_CHECKLIST_LABELS,
  calculateWorksheetProgress,
  WorksheetProgress
} from '../../prototype-registry/types/valuation';
import styles from './ValuationWorksheetForm.module.css';

// ============================================================================
// PROPS & STATE
// ============================================================================

interface ValuationWorksheetFormProps {
  initialData?: Partial<ValuationWorksheet>;
  creatorId: string;
  creatorName: string;
  onSave: (worksheet: ValuationWorksheet) => Promise<void>;
  onSubmitForReview: (worksheet: ValuationWorksheet) => Promise<void>;
  autoSaveInterval?: number;
}

type ActiveSection = 
  | 'meta'
  | 'lineage'
  | 'function'
  | 'distinctiveness'
  | 'authority'
  | 'documentation'
  | 'defence';

// ============================================================================
// COMPONENT
// ============================================================================

const ValuationWorksheetForm: React.FC<ValuationWorksheetFormProps> = ({
  initialData,
  creatorId,
  creatorName,
  onSave,
  onSubmitForReview,
  autoSaveInterval = 30000
}) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('meta');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const [meta, setMeta] = useState<WorksheetMeta>({
    creatorId,
    creatorName,
    programme: 'stemgeneers' as Programme,
    sessionLab: '',
    prototypeTitle: '',
    date: new Date(),
    ...initialData?.meta
  });
  
  const [lineage, setLineage] = useState<LineageSection>({
    culturalHeritage: '',
    technicalLineage: '',
    personalConnection: '',
    namedInfluences: [],
    ...initialData?.lineage
  });
  
  const [func, setFunc] = useState<FunctionSection>({
    problemNeedGap: '',
    whoNeedsThis: '',
    whatChanges: '',
    practicalFunction: '',
    emotionalCulturalFunction: '',
    ...initialData?.function
  });
  
  const [distinctiveness, setDistinctiveness] = useState<DistinctivenessSection>({
    whatCantBeCopied: '',
    materialChoices: '',
    processChoices: '',
    ifNotYouTest: '',
    distinctivenessMarkers: [],
    ...initialData?.distinctiveness
  });
  
  const [authority, setAuthority] = useState<AuthoritySection>({
    standingToPriceThis: '',
    timeInvestment: '',
    materialCosts: 0,
    equivalentLabourRate: 0,
    comparables: [],
    valuationClaim: 0,
    floorPrice: 0,
    ...initialData?.authority
  });
  
  const [documentationLog, setDocumentationLog] = useState<DocumentationEntry[]>(
    initialData?.documentationLog || []
  );
  
  const [evidenceCapture, setEvidenceCapture] = useState<EvidenceChecklist>({
    startingMaterials: false,
    keyProcessStages: false,
    mistakesIterations: false,
    toolsWorkspace: false,
    finishedPiece: false,
    pieceInContext: false,
    creatorWithPiece: false,
    ...initialData?.evidenceCapture
  });
  
  const [defencePrep, setDefencePrep] = useState<DefencePreparation>({
    whatIsThis: '',
    whyDoesItExist: '',
    whyPricedHere: '',
    whatWouldMakeItMoreValuable: '',
    whyBuyFromYou: '',
    ...initialData?.defencePrep
  });
  
  const worksheet: ValuationWorksheet = {
    id: initialData?.id || `ws-${Date.now()}`,
    createdAt: initialData?.createdAt || new Date(),
    updatedAt: new Date(),
    status: initialData?.status || 'draft',
    meta,
    lineage,
    function: func,
    distinctiveness,
    authority,
    documentationLog,
    evidenceCapture,
    defencePrep,
    signOff: initialData?.signOff
  };
  
  const progress: WorksheetProgress = calculateWorksheetProgress(worksheet);
  
  useEffect(() => {
    if (!hasUnsavedChanges) return;
    
    const timer = setTimeout(async () => {
      setIsSaving(true);
      try {
        await onSave(worksheet);
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
      } catch (err) {
        console.error('Autosave failed:', err);
      } finally {
        setIsSaving(false);
      }
    }, autoSaveInterval);
    
    return () => clearTimeout(timer);
  }, [hasUnsavedChanges, worksheet, onSave, autoSaveInterval]);
  
  const markChanged = useCallback(() => {
    setHasUnsavedChanges(true);
  }, []);
  
  const handleManualSave = async (): Promise<void> => {
    setIsSaving(true);
    try {
      await onSave(worksheet);
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSubmitForReview = async (): Promise<void> => {
    if (progress.percentComplete < 100) {
      alert(`Please complete all sections before submitting. Missing: ${progress.incompleteSections.join(', ')}`);
      return;
    }
    await onSubmitForReview(worksheet);
  };
  
  const addInfluence = (): void => {
    const newInfluence: InfluenceEntry = {
      id: `inf-${Date.now()}`,
      name: '',
      whatLearned: ''
    };
    setLineage(prev => ({
      ...prev,
      namedInfluences: [...prev.namedInfluences, newInfluence]
    }));
    markChanged();
  };
  
  const updateInfluence = (id: string, field: keyof InfluenceEntry, value: string): void => {
    setLineage(prev => ({
      ...prev,
      namedInfluences: prev.namedInfluences.map(inf =>
        inf.id === id ? { ...inf, [field]: value } : inf
      )
    }));
    markChanged();
  };
  
  const removeInfluence = (id: string): void => {
    setLineage(prev => ({
      ...prev,
      namedInfluences: prev.namedInfluences.filter(inf => inf.id !== id)
    }));
    markChanged();
  };
  
  const addComparable = (): void => {
    const newComparable: Comparable = {
      id: `comp-${Date.now()}`,
      workMaker: '',
      theirPrice: 0,
      whyComparable: ''
    };
    setAuthority(prev => ({
      ...prev,
      comparables: [...prev.comparables, newComparable]
    }));
    markChanged();
  };
  
  const updateComparable = (id: string, field: keyof Comparable, value: string | number): void => {
    setAuthority(prev => ({
      ...prev,
      comparables: prev.comparables.map(comp =>
        comp.id === id ? { ...comp, [field]: value } : comp
      )
    }));
    markChanged();
  };
  
  const removeComparable = (id: string): void => {
    setAuthority(prev => ({
      ...prev,
      comparables: prev.comparables.filter(comp => comp.id !== id)
    }));
    markChanged();
  };
  
  const addDocumentationEntry = (): void => {
    const newEntry: DocumentationEntry = {
      id: `doc-${Date.now()}`,
      timestamp: new Date(),
      decisionActionObservation: '',
      rationale: ''
    };
    setDocumentationLog(prev => [...prev, newEntry]);
    markChanged();
  };
  
  const updateDocumentationEntry = (id: string, field: keyof DocumentationEntry, value: string | Date): void => {
    setDocumentationLog(prev =>
      prev.map(entry =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
    markChanged();
  };
  
  const removeDocumentationEntry = (id: string): void => {
    setDocumentationLog(prev => prev.filter(entry => entry.id !== id));
    markChanged();
  };
  
  const toggleDistinctivenessMarker = (marker: DistinctivenessMarker): void => {
    setDistinctiveness(prev => {
      const markers = prev.distinctivenessMarkers.includes(marker)
        ? prev.distinctivenessMarkers.filter(m => m !== marker)
        : [...prev.distinctivenessMarkers, marker];
      return { ...prev, distinctivenessMarkers: markers };
    });
    markChanged();
  };
  
  const toggleEvidenceItem = (key: keyof EvidenceChecklist): void => {
    setEvidenceCapture(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    markChanged();
  };
  
  const sections: { id: ActiveSection; label: string; number: number }[] = [
    { id: 'meta', label: 'Details', number: 0 },
    { id: 'lineage', label: 'Lineage', number: 1 },
    { id: 'function', label: 'Function', number: 2 },
    { id: 'distinctiveness', label: 'Distinctiveness', number: 3 },
    { id: 'authority', label: 'Authority', number: 4 },
    { id: 'documentation', label: 'Documentation', number: 5 },
    { id: 'defence', label: 'Defence Prep', number: 6 }
  ];
  
  const currentIndex = sections.findIndex(s => s.id === activeSection);
  const canGoNext = currentIndex < sections.length - 1;
  const canGoPrev = currentIndex > 0;
  
  const goNext = (): void => {
    if (canGoNext) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };
  
  const goPrev = (): void => {
    if (canGoPrev) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };
  
  return (
    <div className={styles.worksheetContainer}>
      <header className={styles.header}>
        <div className={styles.headerBrand}>
          <span className={styles.brandName}>WEMBLEY WONDERS CIC</span>
          <span className={styles.brandSub}>Impact Labs | Valuation Studio</span>
        </div>
        <h1 className={styles.title}>Valuation Architecture Worksheet</h1>
        <p className={styles.subtitle}>
          A fair day&apos;s pay for a fair day&apos;s work is the baseline. This worksheet moves you from labour to authorship.
        </p>
      </header>
      
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress.percentComplete}%` }}
          />
        </div>
        <span className={styles.progressText}>
          {progress.sectionsCompleted}/{progress.totalSections} sections complete ({progress.percentComplete}%)
        </span>
        {lastSaved && (
          <span className={styles.savedText}>
            {isSaving ? 'Saving...' : `Last saved ${lastSaved.toLocaleTimeString()}`}
          </span>
        )}
      </div>
      
      <nav className={styles.sectionNav}>
        {sections.map(section => (
          <button
            key={section.id}
            className={`${styles.sectionNavItem} ${activeSection === section.id ? styles.active : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            <span className={styles.sectionNumber}>{section.number}</span>
            <span className={styles.sectionLabel}>{section.label}</span>
          </button>
        ))}
      </nav>
      
      <main className={styles.formMain}>
        
        {activeSection === 'meta' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Project Details</h2>
            
            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label>Creator Name</label>
                <input
                  type="text"
                  value={meta.creatorName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setMeta(prev => ({ ...prev, creatorName: e.target.value })); markChanged(); }}
                />
              </div>
              
              <div className={styles.field}>
                <label>Date</label>
                <input
                  type="date"
                  value={meta.date instanceof Date ? meta.date.toISOString().split('T')[0] : ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setMeta(prev => ({ ...prev, date: new Date(e.target.value) })); markChanged(); }}
                />
              </div>
              
              <div className={styles.field}>
                <label>Programme</label>
                <select
                  value={meta.programme}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setMeta(prev => ({ ...prev, programme: e.target.value as Programme })); markChanged(); }}
                >
                  <option value="stemgeneers">STEMgeneers</option>
                  <option value="silk-stilettos">Silk Stilettos</option>
                  <option value="techreneurs">TECHreneurs</option>
                  <option value="pageturners">PageTurners</option>
                  <option value="kaywanas-court">Kaywana&apos;s Court</option>
                  <option value="gtech-casters">G-Tech Casters</option>
                  <option value="trubble-n-bass">Trubble n Bass</option>
                  <option value="bright-sparks">Bright Sparks</option>
                  <option value="auntie-anansis-kitchen">Auntie Anansi&apos;s Kitchen</option>
                </select>
              </div>
              
              <div className={styles.field}>
                <label>Session / Lab</label>
                <input
                  type="text"
                  value={meta.sessionLab}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setMeta(prev => ({ ...prev, sessionLab: e.target.value })); markChanged(); }}
                  placeholder="e.g., Maker Mondays Week 3"
                />
              </div>
            </div>
            
            <div className={styles.field}>
              <label>Prototype Title</label>
              <input
                type="text"
                value={meta.prototypeTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setMeta(prev => ({ ...prev, prototypeTitle: e.target.value })); markChanged(); }}
                placeholder="What are you calling this work?"
                className={styles.titleInput}
              />
            </div>
          </section>
        )}
        
        {activeSection === 'lineage' && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNum}>1.</span> LINEAGE
              </h2>
              <p className={styles.sectionQuestion}>
                What tradition does this sit in? Where does it come from?
              </p>
            </div>
            
            <p className={styles.sectionIntro}>
              Your work doesn&apos;t appear from nowhere. Name the cultural, technical, and personal lineages that inform what you&apos;re making.
            </p>
            
            <div className={styles.field}>
              <label>Cultural Heritage / Tradition</label>
              <p className={styles.fieldHint}>What community, culture, or history does this connect to?</p>
              <textarea
                value={lineage.culturalHeritage}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setLineage(prev => ({ ...prev, culturalHeritage: e.target.value })); markChanged(); }}
                rows={4}
              />
            </div>
            
            <div className={styles.field}>
              <label>Technical Lineage</label>
              <p className={styles.fieldHint}>What techniques, methods, or craft traditions are you drawing from?</p>
              <textarea
                value={lineage.technicalLineage}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setLineage(prev => ({ ...prev, technicalLineage: e.target.value })); markChanged(); }}
                rows={4}
              />
            </div>
            
            <div className={styles.field}>
              <label>Personal Connection</label>
              <p className={styles.fieldHint}>Why are YOU the person making this? What&apos;s your relationship to it?</p>
              <textarea
                value={lineage.personalConnection}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setLineage(prev => ({ ...prev, personalConnection: e.target.value })); markChanged(); }}
                rows={4}
              />
            </div>
            
            <div className={styles.field}>
              <label>Named Influences</label>
              <p className={styles.fieldHint}>Specific artists, makers, movements — and what you learned from them</p>
              
              {lineage.namedInfluences.map((inf: InfluenceEntry) => (
                <div key={inf.id} className={styles.influenceRow}>
                  <input
                    type="text"
                    value={inf.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateInfluence(inf.id, 'name', e.target.value)}
                    placeholder="Influence name"
                    className={styles.influenceName}
                  />
                  <input
                    type="text"
                    value={inf.whatLearned}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateInfluence(inf.id, 'whatLearned', e.target.value)}
                    placeholder="What I learned from them"
                    className={styles.influenceLearned}
                  />
                  <button
                    type="button"
                    onClick={() => removeInfluence(inf.id)}
                    className={styles.removeBtn}
                  >
                    ×
                  </button>
                </div>
              ))}
              
              <button type="button" onClick={addInfluence} className={styles.addBtn}>
                + Add Influence
              </button>
            </div>
          </section>
        )}
        
        {activeSection === 'function' && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNum}>2.</span> FUNCTION
              </h2>
              <p className={styles.sectionQuestion}>
                What problem or tension does this resolve?
              </p>
            </div>
            
            <p className={styles.sectionIntro}>
              Everything that has value solves something — a practical need, an emotional gap, a cultural absence. What does yours address?
            </p>
            
            <div className={styles.field}>
              <label>The Problem / Need / Gap</label>
              <p className={styles.fieldHint}>What wasn&apos;t there before? What does this make possible?</p>
              <textarea
                value={func.problemNeedGap}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setFunc(prev => ({ ...prev, problemNeedGap: e.target.value })); markChanged(); }}
                rows={4}
              />
            </div>
            
            <div className={styles.field}>
              <label>Who Needs This?</label>
              <p className={styles.fieldHint}>Be specific — not &quot;everyone&quot; but real people you can picture</p>
              <textarea
                value={func.whoNeedsThis}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setFunc(prev => ({ ...prev, whoNeedsThis: e.target.value })); markChanged(); }}
                rows={4}
              />
            </div>
            
            <div className={styles.field}>
              <label>What Changes When This Exists?</label>
              <p className={styles.fieldHint}>How is someone&apos;s life, work, or experience different?</p>
              <textarea
                value={func.whatChanges}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setFunc(prev => ({ ...prev, whatChanges: e.target.value })); markChanged(); }}
                rows={4}
              />
            </div>
            
            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label>Practical Function</label>
                <p className={styles.fieldHint}>What does it DO?</p>
                <textarea
                  value={func.practicalFunction}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setFunc(prev => ({ ...prev, practicalFunction: e.target.value })); markChanged(); }}
                  rows={3}
                />
              </div>
              
              <div className={styles.field}>
                <label>Emotional / Cultural Function</label>
                <p className={styles.fieldHint}>What does it MEAN?</p>
                <textarea
                  value={func.emotionalCulturalFunction}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setFunc(prev => ({ ...prev, emotionalCulturalFunction: e.target.value })); markChanged(); }}
                  rows={3}
                />
              </div>
            </div>
          </section>
        )}
        
        {activeSection === 'distinctiveness' && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNum}>3.</span> DISTINCTIVENESS
              </h2>
              <p className={styles.sectionQuestion}>
                What makes this non-substitutable?
              </p>
            </div>
            
            <p className={styles.sectionIntro}>
              If someone could easily replace your work with something cheaper or faster, they will. What makes yours irreplaceable?
            </p>
            
            <div className={styles.field}>
              <label>What Can&apos;t Be Copied?</label>
              <p className={styles.fieldHint}>The specific combination of skill, story, and source that only you bring</p>
              <textarea
                value={distinctiveness.whatCantBeCopied}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setDistinctiveness(prev => ({ ...prev, whatCantBeCopied: e.target.value })); markChanged(); }}
                rows={4}
              />
            </div>
            
            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label>Material Choices</label>
                <p className={styles.fieldHint}>Why THIS material?</p>
                <textarea
                  value={distinctiveness.materialChoices}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setDistinctiveness(prev => ({ ...prev, materialChoices: e.target.value })); markChanged(); }}
                  rows={3}
                />
              </div>
              
              <div className={styles.field}>
                <label>Process Choices</label>
                <p className={styles.fieldHint}>Why made THIS way?</p>
                <textarea
                  value={distinctiveness.processChoices}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setDistinctiveness(prev => ({ ...prev, processChoices: e.target.value })); markChanged(); }}
                  rows={3}
                />
              </div>
            </div>
            
            <div className={styles.field}>
              <label>The &quot;If Not You&quot; Test</label>
              <p className={styles.fieldHint}>If you didn&apos;t make this, what would people have to settle for instead?</p>
              <textarea
                value={distinctiveness.ifNotYouTest}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setDistinctiveness(prev => ({ ...prev, ifNotYouTest: e.target.value })); markChanged(); }}
                rows={3}
              />
            </div>
            
            <div className={styles.field}>
              <label>Distinctiveness Markers</label>
              <p className={styles.fieldHint}>Tick all that apply</p>
              <div className={styles.checkboxGrid}>
                {(Object.keys(DISTINCTIVENESS_MARKER_LABELS) as DistinctivenessMarker[]).map((marker: DistinctivenessMarker) => (
                  <label key={marker} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={distinctiveness.distinctivenessMarkers.includes(marker)}
                      onChange={() => toggleDistinctivenessMarker(marker)}
                    />
                    <span>{DISTINCTIVENESS_MARKER_LABELS[marker]}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {activeSection === 'authority' && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNum}>4.</span> AUTHORITY
              </h2>
              <p className={styles.sectionQuestion}>
                Who has the right to price this, and why?
              </p>
            </div>
            
            <p className={styles.sectionIntro}>
              If you don&apos;t claim the right to value your own work, the market will value it for you — and it will value it cheaply.
            </p>
            
            <div className={styles.field}>
              <label>Why I Have Standing to Price This Work</label>
              <p className={styles.fieldHint}>What gives you authority over this creation?</p>
              <textarea
                value={authority.standingToPriceThis}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setAuthority(prev => ({ ...prev, standingToPriceThis: e.target.value })); markChanged(); }}
                rows={4}
              />
            </div>
            
            <div className={styles.field}>
              <label>Time Investment</label>
              <p className={styles.fieldHint}>Hours of making, but also years of learning that enabled the making</p>
              <textarea
                value={authority.timeInvestment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setAuthority(prev => ({ ...prev, timeInvestment: e.target.value })); markChanged(); }}
                rows={3}
              />
            </div>
            
            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label>Material Costs (£)</label>
                <p className={styles.fieldHint}>Actual spend</p>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={authority.materialCosts || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAuthority(prev => ({ ...prev, materialCosts: parseFloat(e.target.value) || 0 })); markChanged(); }}
                />
              </div>
              
              <div className={styles.field}>
                <label>Equivalent Labour Rate (£/hr)</label>
                <p className={styles.fieldHint}>What should an hour of THIS skill cost?</p>
                <input
                  type="number"
                  min="0"
                  step="0.50"
                  value={authority.equivalentLabourRate || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAuthority(prev => ({ ...prev, equivalentLabourRate: parseFloat(e.target.value) || 0 })); markChanged(); }}
                />
              </div>
            </div>
            
            <div className={styles.field}>
              <label>Comparables</label>
              <p className={styles.fieldHint}>Similar work by other makers — not cheaper alternatives, but genuine equivalents</p>
              
              <div className={styles.comparablesTable}>
                <div className={styles.comparablesHeader}>
                  <span>Comparable Work / Maker</span>
                  <span>Their Price</span>
                  <span>Why It&apos;s Comparable</span>
                  <span></span>
                </div>
                
                {authority.comparables.map((comp: Comparable) => (
                  <div key={comp.id} className={styles.comparableRow}>
                    <input
                      type="text"
                      value={comp.workMaker}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateComparable(comp.id, 'workMaker', e.target.value)}
                      placeholder="Work / Maker"
                    />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={comp.theirPrice || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateComparable(comp.id, 'theirPrice', parseFloat(e.target.value) || 0)}
                      placeholder="£"
                    />
                    <input
                      type="text"
                      value={comp.whyComparable}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateComparable(comp.id, 'whyComparable', e.target.value)}
                      placeholder="Why comparable"
                    />
                    <button
                      type="button"
                      onClick={() => removeComparable(comp.id)}
                      className={styles.removeBtn}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <button type="button" onClick={addComparable} className={styles.addBtn}>
                + Add Comparable
              </button>
            </div>
            
            <div className={styles.valuationClaimBox}>
              <h3>MY VALUATION CLAIM</h3>
              <div className={styles.claimFields}>
                <div className={styles.field}>
                  <label>Price I Am Claiming</label>
                  <div className={styles.priceInput}>
                    <span className={styles.currency}>£</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={authority.valuationClaim || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAuthority(prev => ({ ...prev, valuationClaim: parseFloat(e.target.value) || 0 })); markChanged(); }}
                    />
                  </div>
                </div>
                
                <div className={styles.field}>
                  <label>Floor Price (Won&apos;t Go Below)</label>
                  <div className={styles.priceInput}>
                    <span className={styles.currency}>£</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={authority.floorPrice || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAuthority(prev => ({ ...prev, floorPrice: parseFloat(e.target.value) || 0 })); markChanged(); }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {activeSection === 'documentation' && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNum}>5.</span> DOCUMENTATION LOG
              </h2>
              <p className={styles.sectionQuestion}>
                Record as you go — this becomes your provenance
              </p>
            </div>
            
            <p className={styles.sectionIntro}>
              Every decision, iteration, and rejection is part of the value. Document in real time, not after.
            </p>
            
            <div className={styles.field}>
              <label>Process Log</label>
              
              <div className={styles.documentationTable}>
                <div className={styles.docHeader}>
                  <span>Date/Time</span>
                  <span>Decision / Action / Observation</span>
                  <span>Why (Rationale)</span>
                  <span></span>
                </div>
                
                {documentationLog.map((entry: DocumentationEntry) => (
                  <div key={entry.id} className={styles.docRow}>
                    <input
                      type="datetime-local"
                      value={entry.timestamp instanceof Date 
                        ? entry.timestamp.toISOString().slice(0, 16)
                        : new Date(entry.timestamp).toISOString().slice(0, 16)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDocumentationEntry(entry.id, 'timestamp', new Date(e.target.value))}
                    />
                    <textarea
                      value={entry.decisionActionObservation}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateDocumentationEntry(entry.id, 'decisionActionObservation', e.target.value)}
                      placeholder="What happened?"
                      rows={2}
                    />
                    <textarea
                      value={entry.rationale}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateDocumentationEntry(entry.id, 'rationale', e.target.value)}
                      placeholder="Why?"
                      rows={2}
                    />
                    <button
                      type="button"
                      onClick={() => removeDocumentationEntry(entry.id)}
                      className={styles.removeBtn}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <button type="button" onClick={addDocumentationEntry} className={styles.addBtn}>
                + Add Entry
              </button>
            </div>
            
            <div className={styles.field}>
              <label>Evidence Captured</label>
              <p className={styles.fieldHint}>Tick as you go</p>
              <div className={styles.checkboxGrid}>
                {(Object.keys(EVIDENCE_CHECKLIST_LABELS) as (keyof EvidenceChecklist)[]).map((key: keyof EvidenceChecklist) => (
                  <label key={key} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={evidenceCapture[key]}
                      onChange={() => toggleEvidenceItem(key)}
                    />
                    <span>{EVIDENCE_CHECKLIST_LABELS[key]}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {activeSection === 'defence' && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNum}>6.</span> DEFENCE PREPARATION
              </h2>
              <p className={styles.sectionQuestion}>
                Before peer review, rehearse your authority
              </p>
            </div>
            
            <div className={styles.quoteBox}>
              <p>
                The Defence Protocol: Your peers won&apos;t critique aesthetics. They will interrogate clarity and authority. Can you hold your ground?
              </p>
            </div>
            
            <p className={styles.sectionIntro}>
              You will be asked to defend your valuation claim. These are the questions you must answer without hesitation.
            </p>
            
            <div className={styles.defenceQuestion}>
              <label>&quot;What is this?&quot;</label>
              <p className={styles.fieldHint}>One sentence. Clear. No apology.</p>
              <textarea
                value={defencePrep.whatIsThis}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setDefencePrep(prev => ({ ...prev, whatIsThis: e.target.value })); markChanged(); }}
                rows={2}
                placeholder="This is..."
              />
            </div>
            
            <div className={styles.defenceQuestion}>
              <label>&quot;Why does it exist?&quot;</label>
              <p className={styles.fieldHint}>The problem it solves, the gap it fills, the need it meets.</p>
              <textarea
                value={defencePrep.whyDoesItExist}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setDefencePrep(prev => ({ ...prev, whyDoesItExist: e.target.value })); markChanged(); }}
                rows={2}
                placeholder="It exists because..."
              />
            </div>
            
            <div className={styles.defenceQuestion}>
              <label>&quot;Why is it priced where it is?&quot;</label>
              <p className={styles.fieldHint}>Comparables, time, skill, materials, scarcity.</p>
              <textarea
                value={defencePrep.whyPricedHere}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setDefencePrep(prev => ({ ...prev, whyPricedHere: e.target.value })); markChanged(); }}
                rows={2}
                placeholder="It's priced at £X because..."
              />
            </div>
            
            <div className={styles.defenceQuestion}>
              <label>&quot;What would make it more valuable?&quot;</label>
              <p className={styles.fieldHint}>You should know this before they ask.</p>
              <textarea
                value={defencePrep.whatWouldMakeItMoreValuable}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setDefencePrep(prev => ({ ...prev, whatWouldMakeItMoreValuable: e.target.value })); markChanged(); }}
                rows={2}
                placeholder="It would be worth more if..."
              />
            </div>
            
            <div className={styles.defenceQuestion}>
              <label>&quot;Why should I buy from you and not someone cheaper?&quot;</label>
              <p className={styles.fieldHint}>Your non-substitutability.</p>
              <textarea
                value={defencePrep.whyBuyFromYou}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setDefencePrep(prev => ({ ...prev, whyBuyFromYou: e.target.value })); markChanged(); }}
                rows={2}
                placeholder="You should buy from me because..."
              />
            </div>
          </section>
        )}
        
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerNav}>
          <button
            type="button"
            onClick={goPrev}
            disabled={!canGoPrev}
            className={styles.navBtn}
          >
            ← Previous
          </button>
          
          <button
            type="button"
            onClick={handleManualSave}
            disabled={isSaving}
            className={styles.saveBtn}
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          
          {activeSection === 'defence' ? (
            <button
              type="button"
              onClick={handleSubmitForReview}
              disabled={progress.percentComplete < 100}
              className={styles.submitBtn}
            >
              Submit for Review →
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
              className={styles.navBtn}
            >
              Next →
            </button>
          )}
        </div>
        
        <p className={styles.footerTagline}>
          — Nothing leaves our labs undervalued —
        </p>
        <p className={styles.footerMeta}>
          Wembley Wonders CIC | wembleywonders.org | Company No. 12960817
        </p>
      </footer>
    </div>
  );
};

export default ValuationWorksheetForm;
