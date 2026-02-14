import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  BookOpen, ChevronDown, ChevronUp, Clock, Target,
  CheckCircle, AlertCircle, Zap, ExternalLink, Layers
} from 'lucide-react';
import PageTemplate from '../../components/PageTemplate';
import { PROGRAMMES, getProgrammeByParam } from '../spark-generator/sparkData';
import { ALL_FACILITATIONS, getFacilitationByParam } from './facilitationData';
import './FacilitationEngine.css';

// ── Collapsible Section ──

interface CollapsibleSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  variant: 'prep' | 'core' | 'applied' | 'notes';
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title, icon, expanded, onToggle, variant, children
}) => (
  <div className={`fe-section fe-section-${variant} ${expanded ? 'expanded' : ''}`}>
    <button className="fe-section-toggle" onClick={onToggle}>
      {icon}
      <span>{title}</span>
      {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
    {expanded && <div className="fe-section-content">{children}</div>}
  </div>
);

// ── Main Component ──

const FacilitationEngine: React.FC = () => {
  const [searchParams] = useSearchParams();
  const paramProgramme = searchParams.get('programme');

  const [activeWeek, setActiveWeek] = useState(1);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['core', 'applied']));

  const facilitation = paramProgramme ? getFacilitationByParam(paramProgramme) : null;
  const prog = paramProgramme ? getProgrammeByParam(paramProgramme) : null;

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // No programme selected — show picker
  if (!facilitation || !prog) {
    return (
      <PageTemplate pageTitle="Facilitation Guides" pageStrapline="Week-by-week session plans for all 12 programmes" pageType="standard">
        <div className="fe-picker">
          <p className="fe-picker-intro">Choose a programme to view its facilitation guide:</p>
          <div className="fe-picker-grid">
            {Object.entries(ALL_FACILITATIONS).map(([id, fac]) => {
              const p = PROGRAMMES[id];
              if (!p) return null;
              return (
                <Link key={id} to={`/workshops/facilitation?programme=${id}`} className="fe-picker-card"
                  style={{ '--prog-color': p.color } as React.CSSProperties}>
                  <span className="fe-picker-icon">{p.icon}</span>
                  <div>
                    <strong>{p.name}</strong>
                    <span className="fe-picker-weeks">{fac.totalWeeks} weeks</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </PageTemplate>
    );
  }

  const currentGuide = facilitation.weeklyGuides.find(w => w.week === activeWeek);

  return (
    <PageTemplate
      pageTitle={`${prog.icon} ${prog.name} — Facilitation Guide`}
      pageStrapline={facilitation.overview}
      pageType="standard"
    >
      <div className="fe" style={{ '--prog-color': prog.color, '--prog-light': prog.colorLight } as React.CSSProperties}>

        {/* Quick links bar */}
        <div className="fe-links">
          <Link to={`/workshops/spark-generator?programme=${prog.id}`} className="fe-link">
            <Zap size={14} /> Spark Generator
          </Link>
          <Link to={prog.routes.sandbox} className="fe-link">
            <Target size={14} /> Sandbox
          </Link>
          <Link to={prog.routes.programme} className="fe-link">
            <Layers size={14} /> Programme Page
          </Link>
          {prog.guide && (
            <span className="fe-guide-char">{prog.guide.emoji} Guided by {prog.guide.name}</span>
          )}
        </div>

        {/* Week selector */}
        <nav className="fe-week-nav">
          {facilitation.weeklyGuides.map(w => (
            <button key={w.week}
              className={`fe-week-btn ${activeWeek === w.week ? 'active' : ''}`}
              onClick={() => setActiveWeek(w.week)}>
              <span className="fe-week-num">W{w.week}</span>
              <span className="fe-week-title">{w.title}</span>
            </button>
          ))}
        </nav>

        {/* Current week content */}
        {currentGuide && (
          <div className="fe-week-content">
            <div className="fe-week-header">
              <div>
                <h2>Week {currentGuide.week}: {currentGuide.title}</h2>
                <p className="fe-week-focus">{currentGuide.focus}</p>
              </div>
              {currentGuide.sandboxLink && (
                <Link to={currentGuide.sandboxLink} className="fe-sandbox-btn">
                  <Target size={14} /> Open Sandbox <ExternalLink size={12} />
                </Link>
              )}
            </div>

            {/* Before Session */}
            <CollapsibleSection id="before" title="Before Session" icon={<CheckCircle size={16} />}
              expanded={expandedSections.has('before')} onToggle={() => toggleSection('before')} variant="prep">
              <ul className="fe-checklist">
                {currentGuide.beforeSession.map((item, i) => (
                  <li key={i}><CheckCircle size={14} /> {item}</li>
                ))}
              </ul>
              {currentGuide.materials.length > 0 && (
                <div className="fe-materials">
                  <strong>Materials needed:</strong>
                  <div className="fe-materials-list">
                    {currentGuide.materials.map((m, i) => <span key={i} className="fe-material-tag">{m}</span>)}
                  </div>
                </div>
              )}
            </CollapsibleSection>

            {/* Core Activity */}
            <CollapsibleSection id="core" title="Core Activity (25 min)" icon={<BookOpen size={16} />}
              expanded={expandedSections.has('core')} onToggle={() => toggleSection('core')} variant="core">
              <p className="fe-activity-text">{currentGuide.coreActivity}</p>
            </CollapsibleSection>

            {/* Applied Task */}
            <CollapsibleSection id="applied" title="Applied Task (8 min)" icon={<Target size={16} />}
              expanded={expandedSections.has('applied')} onToggle={() => toggleSection('applied')} variant="applied">
              <p className="fe-activity-text">{currentGuide.appliedTask}</p>
            </CollapsibleSection>

            {/* Facilitator Notes */}
            {currentGuide.facilitatorNotes && (
              <CollapsibleSection id="notes" title="Facilitator Notes" icon={<AlertCircle size={16} />}
                expanded={expandedSections.has('notes')} onToggle={() => toggleSection('notes')} variant="notes">
                <p className="fe-notes-text">{currentGuide.facilitatorNotes}</p>
              </CollapsibleSection>
            )}

            {/* After Session */}
            <CollapsibleSection id="after" title="After Session" icon={<CheckCircle size={16} />}
              expanded={expandedSections.has('after')} onToggle={() => toggleSection('after')} variant="prep">
              <ul className="fe-checklist">
                {currentGuide.afterSession.map((item, i) => (
                  <li key={i}><CheckCircle size={14} /> {item}</li>
                ))}
              </ul>
            </CollapsibleSection>

            {/* Week navigation */}
            <div className="fe-week-nav-bottom">
              {activeWeek > 1 && (
                <button className="fe-nav-btn prev" onClick={() => setActiveWeek(activeWeek - 1)}>
                  ← Week {activeWeek - 1}
                </button>
              )}
              <Link to={`/workshops/spark-generator?programme=${prog.id}`} className="fe-nav-btn spark">
                <Zap size={14} /> Launch Sparks for This Session
              </Link>
              {activeWeek < facilitation.totalWeeks && (
                <button className="fe-nav-btn next" onClick={() => setActiveWeek(activeWeek + 1)}>
                  Week {activeWeek + 1} →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </PageTemplate>
  );
};

export default FacilitationEngine;