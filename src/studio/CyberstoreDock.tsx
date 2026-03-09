// src/studio/CyberstoreDock.tsx
// Extended to handle three product types:
//   'beat'      — music with BPM/key/genre/license tiers (original behaviour)
//   'knowledge' — provenance-backed products (Judith's model: hair science, etc.)
//   'general'   — guides, templates, courses (simple price + format)

import React, { useState } from 'react';
import {
  Store, DollarSign, Tag, Music, Info,
  Check, AlertCircle, ChevronDown, ChevronUp,
  Shield, Users, Layers, Play, FileAudio, X,
  BookOpen, FileText, Leaf, FlaskConical
} from 'lucide-react';
import './CyberstoreDock.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type ProductType = 'beat' | 'knowledge' | 'general';

interface BeatMetadata {
  title: string; description: string;
  bpm: number; key: string; genre: string;
  tags: string[]; mood: string[];
}

interface KnowledgeMetadata {
  title: string; description: string; tagline: string;
  knowledgeSource: 'trichologist' | 'lived-experience' | 'clinical-training' | 'research' | 'apprenticeship' | 'self-taught';
  evidenceGrade: 'documented' | 'research' | 'traditional' | 'contested';
  clinicalBasis: string;       // e.g. "Based on appointment with NHS trichologist, Ealing, March 2026"
  archiveSectionId: string;   // which Roots archive section this links to
  tags: string[];
  format: 'pdf' | 'epub' | 'audio' | 'bundle' | 'workshop' | 'physical';
  variants: { label: string; priceDelta: number }[];  // e.g. sizes for physical
}

interface GeneralMetadata {
  title: string; description: string;
  category: 'journal' | 'toolkit' | 'tutorial' | 'template' | 'course' | 'guide' | 'media';
  format: 'pdf' | 'epub' | 'video' | 'audio' | 'zip' | 'bundle';
  relatedProgramme: string;
  tags: string[];
}

interface LicenseTier {
  id: string; name: string; price: number; enabled: boolean;
  features: string[]; maxStreams: string; creditRequired: boolean;
}

interface CyberstoreDockProps {
  beatData?: { audioBlob?: Blob; stemsAvailable?: boolean; duration?: number };
  defaultProductType?: ProductType;
  onClose?: () => void;
  onListingComplete?: (listingId: string) => void;
  isOpen: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_LICENSE_TIERS: LicenseTier[] = [
  { id: 'mp3-lease',  name: 'MP3 Lease',       price: 25,  enabled: true,  maxStreams: '100,000',  creditRequired: true,
    features: ['MP3 file (320kbps)', 'Non-exclusive license', 'Up to 5,000 copies'] },
  { id: 'wav-lease',  name: 'WAV Lease',        price: 50,  enabled: true,  maxStreams: '500,000',  creditRequired: true,
    features: ['WAV + MP3 files', 'Non-exclusive', 'Up to 10,000 copies', 'Music videos OK'] },
  { id: 'trackout',   name: 'Trackout / Stems', price: 100, enabled: true,  maxStreams: '1,000,000', creditRequired: true,
    features: ['Individual stems (WAV)', 'Full mixing control', 'Up to 25,000 copies'] },
  { id: 'unlimited',  name: 'Unlimited',        price: 200, enabled: true,  maxStreams: 'Unlimited', creditRequired: false,
    features: ['WAV + Stems', 'Unlimited distribution', 'Radio, TV, Film sync'] },
  { id: 'exclusive',  name: 'Exclusive Rights', price: 500, enabled: false, maxStreams: 'Unlimited', creditRequired: false,
    features: ['Full ownership transfer', 'Beat removed from store', 'All rights included'] }
];

const GENRES  = ['Afrobeats','Amapiano','Dancehall','Drill','Grime','Hip Hop','Lo-Fi','R&B','Reggae','Soca','Trap','UK Garage','UK Rap','Other'];
const KEYS    = ['C major','C minor','C# major','C# minor','D major','D minor','D# major','D# minor','E major','E minor','F major','F minor','F# major','F# minor','G major','G minor','G# major','G# minor','A major','A minor','A# major','A# minor','B major','B minor'];
const MOODS   = ['Aggressive','Bouncy','Chill','Dark','Energetic','Emotional','Happy','Hype','Melodic','Sad','Smooth','Uplifting','Vibey'];

const KNOWLEDGE_SOURCES = [
  { value: 'trichologist',       label: '🩺 Trichologist / specialist appointment' },
  { value: 'clinical-training',  label: '🏥 Clinical training / professional qualification' },
  { value: 'research',           label: '🔬 Academic / clinical research' },
  { value: 'apprenticeship',     label: '🤝 Apprenticeship / master-practitioner lineage' },
  { value: 'lived-experience',   label: '🌿 Documented lived experience' },
  { value: 'self-taught',        label: '📚 Self-taught / community knowledge' },
];

const EVIDENCE_GRADES = [
  { value: 'documented',  label: '📚 Documented science',    desc: 'Peer-reviewed or clinical evidence cited' },
  { value: 'research',    label: '🔬 Research-informed',     desc: 'Based on published research, not yet replicated in personal context' },
  { value: 'traditional', label: '🌿 Traditional practice',  desc: 'Community or ancestral knowledge, not formally studied' },
  { value: 'contested',   label: '⚠️ Evidence contested',    desc: 'Conflicting evidence or emerging research area' },
];

const KNOWLEDGE_FORMATS = [
  { value: 'pdf',      label: 'PDF Guide / Workbook' },
  { value: 'epub',     label: 'ePub (e-book)' },
  { value: 'audio',    label: 'Audio resource' },
  { value: 'bundle',   label: 'Bundle (multiple formats)' },
  { value: 'workshop', label: 'Workshop / live session' },
  { value: 'physical', label: 'Physical product' },
];

const GENERAL_CATEGORIES = [
  'journal','toolkit','tutorial','template','course','guide','media'
];

// ─── Component ────────────────────────────────────────────────────────────────

const CyberstoreDock: React.FC<CyberstoreDockProps> = ({
  beatData, defaultProductType, onClose, onListingComplete, isOpen
}) => {

  // Step 0 = type selection (skip if defaultProductType is passed)
  type Step = 'type' | 'metadata' | 'licensing' | 'preview' | 'submit';
  const [currentStep, setCurrentStep] = useState<Step>(defaultProductType ? 'metadata' : 'type');
  const [productType, setProductType] = useState<ProductType>(defaultProductType ?? 'beat');

  const [beatMeta, setBeatMeta] = useState<BeatMetadata>({
    title: '', description: '', bpm: 120, key: 'C minor', genre: 'Hip Hop', tags: [], mood: []
  });
  const [knowledgeMeta, setKnowledgeMeta] = useState<KnowledgeMetadata>({
    title: '', description: '', tagline: '',
    knowledgeSource: 'lived-experience', evidenceGrade: 'traditional',
    clinicalBasis: '', archiveSectionId: '', tags: [], format: 'pdf', variants: []
  });
  const [generalMeta, setGeneralMeta] = useState<GeneralMetadata>({
    title: '', description: '', category: 'guide', format: 'pdf', relatedProgramme: '', tags: []
  });

  const [price, setPrice] = useState(12);
  const [licenseTiers, setLicenseTiers] = useState<LicenseTier[]>(DEFAULT_LICENSE_TIERS);
  const [tagInput, setTagInput]         = useState('');
  const [expandedTier, setExpandedTier] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors]             = useState<Record<string, string>>({});

  const earn = (p: number) => (p * 0.55).toFixed(2);

  // ── Helpers ────────────────────────────────────────────────────────────────

  const addTag = (tags: string[], setter: (t: string[]) => void) => {
    if (!tagInput.trim()) return;
    const t = tagInput.trim().toLowerCase().replace(/\s+/g, '-');
    if (!tags.includes(t) && tags.length < 10) setter([...tags, t]);
    setTagInput('');
  };

  const removeTag = (tag: string, tags: string[], setter: (t: string[]) => void) =>
    setter(tags.filter(t => t !== tag));

  const validateBeat = () => {
    const e: Record<string, string> = {};
    if (beatMeta.title.length < 3)          e.title = 'Title must be at least 3 characters';
    if (beatMeta.description.length < 20)   e.description = 'Description must be at least 20 characters';
    if (beatMeta.bpm < 60 || beatMeta.bpm > 200) e.bpm = 'BPM must be 60–200';
    if (beatMeta.tags.length < 3)           e.tags = 'Add at least 3 tags';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateKnowledge = () => {
    const e: Record<string, string> = {};
    if (knowledgeMeta.title.length < 3)       e.title = 'Title required';
    if (knowledgeMeta.description.length < 20) e.description = 'Description must be at least 20 characters';
    if (!knowledgeMeta.tagline.trim())         e.tagline = 'Tagline required — one sentence about what this does';
    if (!knowledgeMeta.clinicalBasis.trim())   e.clinicalBasis = 'Describe where this knowledge came from';
    if (knowledgeMeta.tags.length < 2)         e.tags = 'Add at least 2 tags';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateGeneral = () => {
    const e: Record<string, string> = {};
    if (generalMeta.title.length < 3)         e.title = 'Title required';
    if (generalMeta.description.length < 20)  e.description = 'Description must be at least 20 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 'type') {
      setCurrentStep('metadata');
    } else if (currentStep === 'metadata') {
      const valid = productType === 'beat' ? validateBeat()
                  : productType === 'knowledge' ? validateKnowledge()
                  : validateGeneral();
      if (valid) setCurrentStep(productType === 'beat' ? 'licensing' : 'preview');
    } else if (currentStep === 'licensing') {
      if (!licenseTiers.some(t => t.enabled)) {
        setErrors({ licensing: 'Enable at least one license tier' });
      } else {
        setErrors({});
        setCurrentStep('preview');
      }
    } else if (currentStep === 'preview') {
      setCurrentStep('submit');
    }
  };

  const handleBack = () => {
    if (currentStep === 'metadata') setCurrentStep('type');
    else if (currentStep === 'licensing') setCurrentStep('metadata');
    else if (currentStep === 'preview') setCurrentStep(productType === 'beat' ? 'licensing' : 'metadata');
    else if (currentStep === 'submit') setCurrentStep('preview');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1800));
    setSubmitSuccess(true);
    setIsSubmitting(false);
    onListingComplete?.(`listing-${Date.now()}`);
  };

  const steps: Step[] = defaultProductType
    ? (productType === 'beat' ? ['metadata','licensing','preview','submit'] : ['metadata','preview','submit'])
    : (productType === 'beat' ? ['type','metadata','licensing','preview','submit'] : ['type','metadata','preview','submit']);
  const stepIndex = steps.indexOf(currentStep);

  if (!isOpen) return null;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="cyberstore-dock">

      {/* Header */}
      <div className="dock-header">
        <div className="dock-title">
          <Store size={22} />
          <div>
            <h2>List on Cyberstore</h2>
            <p>
              {productType === 'beat'      ? 'Sell your beat • Keep 55%' :
               productType === 'knowledge' ? 'Knowledge product • Keep 55%' :
                                             'Digital product • Keep 55%'}
            </p>
          </div>
        </div>
        {onClose && <button className="dock-close" onClick={onClose}><X size={18}/></button>}
      </div>

      {/* Progress */}
      <div className="dock-progress">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            {i > 0 && <div className={`progress-line${i <= stepIndex ? ' done' : ''}`}/>}
            <div className={`progress-step${currentStep === s ? ' active' : ''}${i < stepIndex ? ' completed' : ''}`}>
              <span className="step-number">{i + 1}</span>
              <span className="step-label">
                {s === 'type'      ? 'Type'     :
                 s === 'metadata'  ? 'Details'  :
                 s === 'licensing' ? 'Licenses' :
                 s === 'preview'   ? 'Preview'  : 'Submit'}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Content */}
      <div className="dock-content">

        {/* ── Step 0: Product type ── */}
        {currentStep === 'type' && (
          <div className="step-content">
            <h3>What are you selling?</h3>
            <p className="step-intro">
              Different product types have different listing flows.
              Choose the one that matches your work.
            </p>
            <div className="type-grid">

              <button
                className={`type-card${productType === 'beat' ? ' selected' : ''}`}
                onClick={() => setProductType('beat')}
              >
                <Music size={28}/>
                <strong>Beat / Instrumental</strong>
                <p>Music you've produced. Sold by license tier (MP3 Lease, WAV, Stems, Exclusive).</p>
                <div className="type-example">e.g. Dancehall riddim, UK drill type beat, lo-fi pack</div>
              </button>

              <button
                className={`type-card${productType === 'knowledge' ? ' selected' : ''}`}
                onClick={() => setProductType('knowledge')}
              >
                <BookOpen size={28}/>
                <strong>Knowledge Product</strong>
                <p>A guide, workbook, or resource built from documented expertise or lived experience. Includes a provenance chain.</p>
                <div className="type-example">e.g. Hair care guide from trichologist sessions, recipe archive, body sovereignty workbook</div>
                {productType === 'knowledge' && (
                  <div className="type-badge">📚 Roots model — provenance chain auto-generated</div>
                )}
              </button>

              <button
                className={`type-card${productType === 'general' ? ' selected' : ''}`}
                onClick={() => setProductType('general')}
              >
                <FileText size={28}/>
                <strong>Tool, Template or Course</strong>
                <p>Practical resources — templates, tutorials, courses, toolkits. Simple fixed price.</p>
                <div className="type-example">e.g. Portfolio template pack, Python beginner course, podcast starter guide</div>
              </button>
            </div>
          </div>
        )}

        {/* ── Step 1: Beat metadata ── */}
        {currentStep === 'metadata' && productType === 'beat' && (
          <div className="step-content">
            <h3>Beat Details</h3>
            <div className="form-group">
              <label>Title *</label>
              <input value={beatMeta.title} onChange={e => setBeatMeta(p=>({...p,title:e.target.value}))}
                placeholder="e.g., Caribbean Sunset Riddim" className={errors.title?'error':''}/>
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea value={beatMeta.description} rows={3}
                onChange={e => setBeatMeta(p=>({...p,description:e.target.value}))}
                placeholder="Style, vibe, what it's good for..." className={errors.description?'error':''}/>
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>
            <div className="form-row">
              <div className="form-group half">
                <label>BPM *</label>
                <input type="number" value={beatMeta.bpm} min={60} max={200}
                  onChange={e => setBeatMeta(p=>({...p,bpm:+e.target.value}))}
                  className={errors.bpm?'error':''}/>
                {errors.bpm && <span className="error-text">{errors.bpm}</span>}
              </div>
              <div className="form-group half">
                <label>Key *</label>
                <select value={beatMeta.key} onChange={e => setBeatMeta(p=>({...p,key:e.target.value}))}>
                  {KEYS.map(k => <option key={k}>{k}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Genre *</label>
              <select value={beatMeta.genre} onChange={e => setBeatMeta(p=>({...p,genre:e.target.value}))}>
                {GENRES.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Mood (up to 3)</label>
              <div className="mood-grid">
                {MOODS.map(m => (
                  <button key={m} type="button"
                    className={`mood-btn${beatMeta.mood.includes(m)?' selected':''}`}
                    onClick={() => setBeatMeta(p=>({...p,mood: p.mood.includes(m)?p.mood.filter(x=>x!==m):p.mood.length<3?[...p.mood,m]:p.mood}))}
                    disabled={!beatMeta.mood.includes(m) && beatMeta.mood.length >= 3}
                  >{m}</button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Tags * (at least 3)</label>
              <div className="tag-input-wrapper">
                <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => e.key==='Enter' && (e.preventDefault(), addTag(beatMeta.tags, t => setBeatMeta(p=>({...p,tags:t}))))}
                  placeholder="Type and press Enter"/>
                <button type="button" onClick={() => addTag(beatMeta.tags, t => setBeatMeta(p=>({...p,tags:t})))}>Add</button>
              </div>
              {errors.tags && <span className="error-text">{errors.tags}</span>}
              <div className="tags-list">
                {beatMeta.tags.map(t => (
                  <span key={t} className="tag">{t}
                    <button onClick={() => removeTag(t, beatMeta.tags, ts => setBeatMeta(p=>({...p,tags:ts})))}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 1: Knowledge product metadata ── */}
        {currentStep === 'metadata' && productType === 'knowledge' && (
          <div className="step-content">
            <h3>Knowledge Product Details</h3>
            <p className="step-intro">
              Knowledge products earn trust through transparency.
              The more clearly you document where this came from, the more credible it is.
            </p>

            <div className="form-group">
              <label>Title *</label>
              <input value={knowledgeMeta.title} onChange={e => setKnowledgeMeta(p=>({...p,title:e.target.value}))}
                placeholder="e.g., The Six-Week Hair Journal" className={errors.title?'error':''}/>
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label>Tagline * <span className="label-hint">— one sentence, what this does for the buyer</span></label>
              <input value={knowledgeMeta.tagline} onChange={e => setKnowledgeMeta(p=>({...p,tagline:e.target.value}))}
                placeholder="e.g., Track your scalp health between trichologist appointments"
                className={errors.tagline?'error':''}/>
              {errors.tagline && <span className="error-text">{errors.tagline}</span>}
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea value={knowledgeMeta.description} rows={3}
                onChange={e => setKnowledgeMeta(p=>({...p,description:e.target.value}))}
                placeholder="What's in it, who it's for, what they'll be able to do..."
                className={errors.description?'error':''}/>
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>

            <div className="form-group">
              <label>Where does this knowledge come from? *</label>
              <div className="source-grid">
                {KNOWLEDGE_SOURCES.map(s => (
                  <button key={s.value} type="button"
                    className={`source-btn${knowledgeMeta.knowledgeSource===s.value?' selected':''}`}
                    onClick={() => setKnowledgeMeta(p=>({...p,knowledgeSource:s.value as KnowledgeMetadata['knowledgeSource']}))}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Describe the specific source *
                <span className="label-hint"> — who, where, when</span>
              </label>
              <input value={knowledgeMeta.clinicalBasis}
                onChange={e => setKnowledgeMeta(p=>({...p,clinicalBasis:e.target.value}))}
                placeholder="e.g., Based on appointment with trichologist at Healthy Hair Studio, Ealing, March 2026"
                className={errors.clinicalBasis?'error':''}/>
              {errors.clinicalBasis && <span className="error-text">{errors.clinicalBasis}</span>}
              <span className="helper-text">
                This appears on the product provenance chain. It's what makes your work credible.
              </span>
            </div>

            <div className="form-group">
              <label>Evidence grade</label>
              <div className="evidence-grid">
                {EVIDENCE_GRADES.map(g => (
                  <button key={g.value} type="button"
                    className={`evidence-btn${knowledgeMeta.evidenceGrade===g.value?' selected':''}`}
                    onClick={() => setKnowledgeMeta(p=>({...p,evidenceGrade:g.value as KnowledgeMetadata['evidenceGrade']}))}>
                    <span className="evidence-label">{g.label}</span>
                    <span className="evidence-desc">{g.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Links to Archive Section <span className="label-hint">(optional)</span></label>
              <input value={knowledgeMeta.archiveSectionId}
                onChange={e => setKnowledgeMeta(p=>({...p,archiveSectionId:e.target.value}))}
                placeholder="e.g., roots-scalp-health or leave blank"/>
              <span className="helper-text">If this product expands on a section in the Roots Knowledge Archive, link it here.</span>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>Format</label>
                <select value={knowledgeMeta.format} onChange={e => setKnowledgeMeta(p=>({...p,format:e.target.value as KnowledgeMetadata['format']}))}>
                  {KNOWLEDGE_FORMATS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
              </div>
              <div className="form-group half">
                <label>Price (£) *</label>
                <input type="number" value={price} min={1} onChange={e => setPrice(+e.target.value)}/>
                <span className="helper-text">You earn: £{earn(price)}</span>
              </div>
            </div>

            <div className="form-group">
              <label>Tags * (at least 2)</label>
              <div className="tag-input-wrapper">
                <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => e.key==='Enter' && (e.preventDefault(), addTag(knowledgeMeta.tags, t => setKnowledgeMeta(p=>({...p,tags:t}))))}
                  placeholder="Type and press Enter"/>
                <button type="button" onClick={() => addTag(knowledgeMeta.tags, t => setKnowledgeMeta(p=>({...p,tags:t})))}>Add</button>
              </div>
              {errors.tags && <span className="error-text">{errors.tags}</span>}
              <div className="tags-list">
                {knowledgeMeta.tags.map(t => (
                  <span key={t} className="tag">{t}
                    <button onClick={() => removeTag(t, knowledgeMeta.tags, ts => setKnowledgeMeta(p=>({...p,tags:ts})))}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 1: General product metadata ── */}
        {currentStep === 'metadata' && productType === 'general' && (
          <div className="step-content">
            <h3>Product Details</h3>
            <div className="form-group">
              <label>Title *</label>
              <input value={generalMeta.title} onChange={e => setGeneralMeta(p=>({...p,title:e.target.value}))}
                placeholder="e.g., Professional Portfolio Templates Pack" className={errors.title?'error':''}/>
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea value={generalMeta.description} rows={3}
                onChange={e => setGeneralMeta(p=>({...p,description:e.target.value}))}
                placeholder="What's included, who it's for, what they'll be able to do..."
                className={errors.description?'error':''}/>
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>
            <div className="form-row">
              <div className="form-group half">
                <label>Category</label>
                <select value={generalMeta.category} onChange={e => setGeneralMeta(p=>({...p,category:e.target.value as GeneralMetadata['category']}))}>
                  {GENERAL_CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
                </select>
              </div>
              <div className="form-group half">
                <label>Format</label>
                <select value={generalMeta.format} onChange={e => setGeneralMeta(p=>({...p,format:e.target.value as GeneralMetadata['format']}))}>
                  {['pdf','epub','video','audio','zip','bundle'].map(f => <option key={f} value={f}>{f.toUpperCase()}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group half">
                <label>Related Programme <span className="label-hint">(optional)</span></label>
                <input value={generalMeta.relatedProgramme}
                  onChange={e => setGeneralMeta(p=>({...p,relatedProgramme:e.target.value}))}
                  placeholder="e.g., STEMgineers"/>
              </div>
              <div className="form-group half">
                <label>Price (£)</label>
                <input type="number" value={price} min={1} onChange={e => setPrice(+e.target.value)}/>
                <span className="helper-text">You earn: £{earn(price)}</span>
              </div>
            </div>
            <div className="form-group">
              <label>Tags</label>
              <div className="tag-input-wrapper">
                <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => e.key==='Enter' && (e.preventDefault(), addTag(generalMeta.tags, t => setGeneralMeta(p=>({...p,tags:t}))))}
                  placeholder="Type and press Enter"/>
                <button type="button" onClick={() => addTag(generalMeta.tags, t => setGeneralMeta(p=>({...p,tags:t})))}>Add</button>
              </div>
              <div className="tags-list">
                {generalMeta.tags.map(t => (
                  <span key={t} className="tag">{t}
                    <button onClick={() => removeTag(t, generalMeta.tags, ts => setGeneralMeta(p=>({...p,tags:ts})))}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Beat licensing ── */}
        {currentStep === 'licensing' && productType === 'beat' && (
          <div className="step-content">
            <h3>Set Your Prices</h3>
            <p className="step-intro">Choose which licenses to offer. <strong>You keep 55%</strong> of every sale.</p>
            {errors.licensing && <div className="error-banner"><AlertCircle size={15}/>{errors.licensing}</div>}
            <div className="license-tiers">
              {licenseTiers.map(tier => (
                <div key={tier.id} className={`license-tier ${tier.enabled ? 'enabled' : 'disabled'}`}>
                  <div className="tier-header">
                    <label className="tier-toggle">
                      <input type="checkbox" checked={tier.enabled}
                        onChange={() => setLicenseTiers(prev => prev.map(t => t.id===tier.id?{...t,enabled:!t.enabled}:t))}/>
                      <span className="toggle-slider"/>
                    </label>
                    <div className="tier-info">
                      <h4>{tier.name}</h4>
                      {tier.id==='wav-lease' && <span className="popular-tag">Most Popular</span>}
                    </div>
                    <button className="tier-expand" onClick={() => setExpandedTier(e => e===tier.id?null:tier.id)}>
                      {expandedTier===tier.id ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
                    </button>
                  </div>
                  {tier.enabled && (
                    <div className="tier-pricing">
                      <div className="price-input">
                        <span className="currency">£</span>
                        <input type="number" value={tier.price} min={0}
                          onChange={e => setLicenseTiers(prev => prev.map(t => t.id===tier.id?{...t,price:+e.target.value}:t))}/>
                      </div>
                      <div className="earnings-preview">
                        <span>You earn:</span>
                        <strong>£{earn(tier.price)}</strong>
                      </div>
                    </div>
                  )}
                  {expandedTier===tier.id && (
                    <ul className="tier-details">
                      {tier.features.map((f,i)=><li key={i}><Check size={13}/>{f}</li>)}
                      <li><Music size={13}/> Max streams: {tier.maxStreams}</li>
                      <li>{tier.creditRequired ? <><Info size={13}/>Credit required</> : <><Check size={13}/>No credit required</>}</li>
                    </ul>
                  )}
                </div>
              ))}
            </div>
            {beatData?.stemsAvailable && (
              <div className="stems-notice">
                <Layers size={18}/>
                <div><strong>Stems Available</strong><p>Your trackout license will include individual track files.</p></div>
              </div>
            )}
          </div>
        )}

        {/* ── Preview ── */}
        {currentStep === 'preview' && (
          <div className="step-content">
            <h3>Preview Your Listing</h3>
            <div className="listing-preview">
              {productType === 'beat' && (
                <>
                  <div className="preview-card">
                    <div className="preview-play"><Play size={28}/></div>
                    <div className="preview-info">
                      <h4>{beatMeta.title || 'Untitled Beat'}</h4>
                      <div className="preview-meta">
                        <span>{beatMeta.bpm} BPM</span><span>{beatMeta.key}</span><span>{beatMeta.genre}</span>
                      </div>
                    </div>
                  </div>
                  <p className="preview-description">{beatMeta.description}</p>
                  <div className="preview-tags">{beatMeta.tags.map(t=><span key={t} className="preview-tag">{t}</span>)}</div>
                  <div className="preview-licenses">
                    <h5>Licenses</h5>
                    {licenseTiers.filter(t=>t.enabled).map(t=>(
                      <div key={t.id} className="preview-license">
                        <span>{t.name}</span><span>£{t.price}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {productType === 'knowledge' && (
                <>
                  <div className="preview-knowledge-header">
                    <h4>{knowledgeMeta.title || 'Untitled Product'}</h4>
                    <em className="preview-tagline">{knowledgeMeta.tagline}</em>
                  </div>
                  <p className="preview-description">{knowledgeMeta.description}</p>
                  <div className="preview-provenance">
                    <div className="prov-item">
                      <span className="prov-label">Source</span>
                      <span>{KNOWLEDGE_SOURCES.find(s=>s.value===knowledgeMeta.knowledgeSource)?.label}</span>
                    </div>
                    <div className="prov-item">
                      <span className="prov-label">Evidence</span>
                      <span>{EVIDENCE_GRADES.find(g=>g.value===knowledgeMeta.evidenceGrade)?.label}</span>
                    </div>
                    <div className="prov-item">
                      <span className="prov-label">Basis</span>
                      <span>{knowledgeMeta.clinicalBasis}</span>
                    </div>
                  </div>
                  <div className="preview-pricing-row">
                    <span className="preview-price">£{price.toFixed(2)}</span>
                    <span className="preview-earn">You earn £{earn(price)} per sale</span>
                  </div>
                </>
              )}
              {productType === 'general' && (
                <>
                  <h4>{generalMeta.title || 'Untitled Product'}</h4>
                  <p className="preview-description">{generalMeta.description}</p>
                  <div className="preview-tags">{generalMeta.tags.map(t=><span key={t} className="preview-tag">{t}</span>)}</div>
                  <div className="preview-pricing-row">
                    <span className="preview-price">£{price.toFixed(2)}</span>
                    <span className="preview-earn">You earn £{earn(price)} per sale</span>
                  </div>
                </>
              )}
              <div className="preview-earnings">
                <Shield size={15}/>
                <span>Protected by Wembley Wonders Creator Agreement · 55/25/20 split</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Submit ── */}
        {currentStep === 'submit' && (
          <div className="step-content submit-step">
            {!submitSuccess ? (
              <>
                <h3>Ready to List</h3>
                <div className="submit-summary">
                  <div className="summary-item">
                    <FileAudio size={18}/>
                    <div>
                      <strong>{productType==='beat'?beatMeta.title:productType==='knowledge'?knowledgeMeta.title:generalMeta.title}</strong>
                      <span>{productType==='beat' ? `${beatMeta.bpm} BPM · ${beatMeta.key} · ${beatMeta.genre}` :
                             productType==='knowledge' ? `Knowledge product · £${price}` :
                             `${generalMeta.category} · £${price}`}</span>
                    </div>
                  </div>
                  <div className="summary-item">
                    <DollarSign size={18}/>
                    <div>
                      <strong>You earn £{earn(price)} per sale</strong>
                      <span>55% creator · 25% community · 20% platform</span>
                    </div>
                  </div>
                  <div className="summary-item">
                    <Users size={18}/>
                    <div>
                      <strong>55% Creator Revenue</strong>
                      <span>Recorded on blockchain from first sale</span>
                    </div>
                  </div>
                </div>
                <div className="terms-agreement">
                  <label>
                    <input type="checkbox" required/>
                    <span>
                      I confirm this is my original work and I have the rights to sell it.
                      I agree to the <a href="/about#agreement" target="_blank" rel="noopener noreferrer">Creator Agreement</a>.
                    </span>
                  </label>
                </div>
                <button className="submit-btn" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? <><span className="spinner"/>Listing...</> : <><Store size={18}/>List on Cyberstore</>}
                </button>
              </>
            ) : (
              <div className="submit-success">
                <div className="success-icon"><Check size={44}/></div>
                <h3>Listed Successfully! 🎉</h3>
                <p>Your product is now live on the Cyberstore.</p>
                <div className="success-actions">
                  <a href="/cyberstore" className="btn-view-listing">View in Cyberstore</a>
                  <button className="btn-share">Share Link</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      {!submitSuccess && (
        <div className="dock-footer">
          {currentStep !== (defaultProductType ? 'metadata' : 'type') && (
            <button className="btn-back" onClick={handleBack}>← Back</button>
          )}
          {currentStep !== 'submit' && (
            <button className="btn-next" onClick={handleNext}>
              {currentStep==='preview' ? 'Continue to Submit' : 'Next →'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CyberstoreDock;