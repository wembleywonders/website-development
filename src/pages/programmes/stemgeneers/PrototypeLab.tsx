/**
 * src/pages/programmes/stemgeneers/PrototypeLab.tsx
 * ==================================================
 * STEMgeneers Prototype Lab — Updated
 * Wembley Wonders CIC
 *
 * REVISION: Added Repair Workshop mode alongside existing Prototype mode.
 *
 * Two modes, one lab:
 * ─ PROTOTYPE mode: unchanged — invention, patent prep, IP documentation
 * ─ REPAIR mode: new — diagnostic log, repair evidence submission,
 *   parts record, skill gate progress, Maya verification trigger
 *
 * The repair workflow connects directly to journalStore:
 * submitRepairEvidence → auto-creates journal entry → triggers Maya
 * verification session → recalculates skill gate.
 *
 * Existing imports, types, equipment catalogue, and all sub-components
 * preserved exactly.
 */

import React, { useState, useEffect, useCallback } from 'react';
// TODO: Update these paths to match your actual project structure
// import type {
//   Prototype,
//   PrototypeStatus,
//   Iteration,
//   PrototypeAsset,
//   Creator
// } from '../../prototype-registry/types';
// import { prototypeRegistry } from '../../prototype-registry/services/prototypeRegistry';

// Temporary stub types - replace with actual imports
type Prototype = any;
type PrototypeStatus = any;
type Iteration = any;
type PrototypeAsset = any;
type Creator = any;
const prototypeRegistry = {
  searchPrototypes: async (params?: any) => ({ prototypes: [] }),
  createPrototype: async (params?: any) => ({}),
  addIteration: async (id?: any, params?: any) => ({}),
};
import {
  useJournalStore,
  useGateRequirements,
  useSTEMgeneersStats,
  usePendingVerificationId,
} from '../../../stores/journalStore';
import type {
  RepairLayer,
  DiagnosisMethod,
  RepairEvidence,
} from '../../../types/creators-journal';
import styles from './PrototypeLab.module.scss';

// ============================================================================
// ORIGINAL TYPES — unchanged
// ============================================================================

interface LabEquipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  status: 'available' | 'in-use' | 'maintenance' | 'reserved';
  currentUser?: string;
  safetyLevel: 'basic' | 'intermediate' | 'advanced';
  requiredTraining: string[];
  location: string;
}

type EquipmentCategory =
  | '3d-printing'
  | 'electronics'
  | 'fabrication'
  | 'testing'
  | 'design'
  | 'safety';

interface BOMItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  unitCost: number;
  supplier?: string;
  partNumber?: string;
  category: 'electronic' | 'mechanical' | 'consumable' | 'packaging' | 'other';
  acquired: boolean;
  notes?: string;
}

interface SafetyCheck {
  id: string;
  description: string;
  category: 'electrical' | 'mechanical' | 'chemical' | 'thermal' | 'general';
  completed: boolean;
  completedBy?: string;
  completedAt?: Date;
  notes?: string;
}

interface LabSession {
  id: string;
  prototypeId: string;
  date: Date;
  duration: number;
  participants: string[];
  equipmentUsed: string[];
  objectives: string[];
  outcomes: string[];
  issues: string[];
  nextSteps: string[];
  safetyIncidents: string[];
  witnessed: boolean;
  witnessedBy?: string;
}

// NEW: Lab mode type
type LabMode = 'prototype' | 'repair';

type LabView =
  | 'workspace'
  | 'equipment'
  | 'bom'
  | 'sessions'
  | 'safety'
  | 'patent-prep'
  // NEW repair views
  | 'repair-log'
  | 'repair-submit'
  | 'repair-gates';

// ============================================================================
// ORIGINAL EQUIPMENT CATALOGUE — unchanged
// ============================================================================

const EQUIPMENT_CATALOGUE: LabEquipment[] = [
  { id: 'eq-001', name: '3D Printer (Prusa i3 MK3S+)', category: '3d-printing', status: 'available', safetyLevel: 'intermediate', requiredTraining: ['3D Printing Basics', 'Filament Handling'], location: 'Bay A' },
  { id: 'eq-002', name: 'Soldering Station (Hakko FX-888D)', category: 'electronics', status: 'available', safetyLevel: 'intermediate', requiredTraining: ['Soldering Safety', 'Lead-Free Techniques'], location: 'Bay B' },
  { id: 'eq-003', name: 'Oscilloscope (Rigol DS1054Z)', category: 'testing', status: 'available', safetyLevel: 'basic', requiredTraining: ['Basic Electronics'], location: 'Bay B' },
  { id: 'eq-004', name: 'Multimeter (Fluke 117)', category: 'testing', status: 'available', safetyLevel: 'basic', requiredTraining: ['Electrical Safety'], location: 'Bay B' },
  { id: 'eq-005', name: 'Laser Cutter (K40 CO2)', category: 'fabrication', status: 'available', safetyLevel: 'advanced', requiredTraining: ['Laser Safety', 'Material Safety', 'Fire Safety'], location: 'Bay C' },
  { id: 'eq-006', name: 'Arduino Starter Kit', category: 'electronics', status: 'available', safetyLevel: 'basic', requiredTraining: ['Basic Electronics'], location: 'Bay B' },
  { id: 'eq-007', name: 'Raspberry Pi Workstation', category: 'electronics', status: 'available', safetyLevel: 'basic', requiredTraining: ['Linux Basics'], location: 'Bay B' },
  { id: 'eq-008', name: 'PCB Etching Station', category: 'electronics', status: 'available', safetyLevel: 'advanced', requiredTraining: ['Chemical Safety', 'PCB Design'], location: 'Bay D' },
  { id: 'eq-009', name: 'Hand Tools Station', category: 'fabrication', status: 'available', safetyLevel: 'basic', requiredTraining: ['Workshop Safety'], location: 'Bay A' },
  { id: 'eq-010', name: 'Safety Equipment Station', category: 'safety', status: 'available', safetyLevel: 'basic', requiredTraining: [], location: 'Entrance' },
];

// ============================================================================
// NEW: REPAIR LAYER CONFIG
// ============================================================================

const REPAIR_LAYERS: RepairLayer[] = [
  'precision', 'appliance', 'home', 'furniture', 'making', 'trades'
];

const LAYER_LABELS: Record<RepairLayer, string> = {
  precision: 'Precision (watch, phone, lock)',
  appliance: 'Appliances (washing machine, vacuum)',
  home: 'Home (tap, plumbing, decorating)',
  furniture: 'Furniture (joinery, upholstery)',
  making: 'Making (3D print, fabrication)',
  trades: 'Trades (electrical, plumbing, HVAC)',
};

const DIAGNOSIS_METHOD_LABELS: Record<DiagnosisMethod, string> = {
  'visual-inspection': 'Visual inspection',
  'auditory-diagnosis': 'Auditory diagnosis (listening)',
  'multimeter': 'Multimeter',
  'oscilloscope': 'Oscilloscope',
  'disassembly-inspection': 'Disassembly and inspection',
  'elimination': 'Systematic elimination',
  'sandbox-diagnostic-trainer': 'Sandbox Diagnostic Trainer',
  'research': 'Research / documentation',
  'mentor-consultation': 'Mentor consultation',
};

// ============================================================================
// NEW: REPAIR EVIDENCE FORM STATE
// ============================================================================

interface RepairFormState {
  // Item
  itemDescription: string;
  layer: RepairLayer;
  estimatedValue: string;

  // Fault
  symptomDescription: string;
  onsetDescription: string;

  // Diagnosis
  diagnosisReasoning: string;
  methodsUsed: DiagnosisMethod[];
  ruledOut: string;
  physicsExplained: string;

  // Repair
  methodDescription: string;
  timeSpent: string;
  toolsUsed: string;
  difficultiesEncountered: string;
  whatWouldDoDifferently: string;

  // Parts
  parts: Array<{
    name: string;
    cost: string;
    supplier: string;
    printed3D: boolean;
  }>;

  // Outcome
  successful: boolean;
  outcomeDescription: string;
  savingAchieved: string;
  professionalQuoteReceived: string;

  // Photos (URLs for now — in production, file upload)
  beforePhotoUrl: string;
  afterPhotoUrl: string;

  // Income
  incomeEarned: string;
  claimTokenRef: string;
}

const EMPTY_REPAIR_FORM: RepairFormState = {
  itemDescription: '',
  layer: 'appliance',
  estimatedValue: '',
  symptomDescription: '',
  onsetDescription: '',
  diagnosisReasoning: '',
  methodsUsed: [],
  ruledOut: '',
  physicsExplained: '',
  methodDescription: '',
  timeSpent: '',
  toolsUsed: '',
  difficultiesEncountered: '',
  whatWouldDoDifferently: '',
  parts: [{ name: '', cost: '', supplier: '', printed3D: false }],
  successful: true,
  outcomeDescription: '',
  savingAchieved: '',
  professionalQuoteReceived: '',
  beforePhotoUrl: '',
  afterPhotoUrl: '',
  incomeEarned: '',
  claimTokenRef: '',
};

// ============================================================================
// COMPONENT
// ============================================================================

export const PrototypeLab: React.FC = () => {
  // Original state
  const [labMode, setLabMode] = useState<LabMode>('prototype');
  const [activeView, setActiveView] = useState<LabView>('workspace');
  const [prototypes, setPrototypes] = useState<Prototype[]>([]);
  const [selectedPrototype, setSelectedPrototype] = useState<Prototype | null>(null);
  const [equipment, setEquipment] = useState<LabEquipment[]>(EQUIPMENT_CATALOGUE);
  const [bomItems, setBomItems] = useState<BOMItem[]>([]);
  const [sessions, setSessions] = useState<LabSession[]>([]);
  const [safetyChecks, setSafetyChecks] = useState<SafetyCheck[]>([]);
  const [showNewBuild, setShowNewBuild] = useState(false);
  const [loading, setLoading] = useState(true);

  // New repair state
  const [repairForm, setRepairForm] = useState<RepairFormState>(EMPTY_REPAIR_FORM);
  const [repairFormStep, setRepairFormStep] = useState<1 | 2 | 3 | 4>(1);
  const [repairSubmitting, setRepairSubmitting] = useState(false);
  const [repairSubmitted, setRepairSubmitted] = useState<string | null>(null); // repairEvidenceId

  // Store
  const submitRepairEvidence = useJournalStore((s) => s.submitRepairEvidence);
  const repairEvidenceMap = useJournalStore((s) => s.repairEvidence);
  const stemStats = useSTEMgeneersStats();
  const pendingVerification = usePendingVerificationId();

  useEffect(() => {
    loadPrototypes();
  }, []);

  // When mode switches, set appropriate default view
  useEffect(() => {
    if (labMode === 'repair') {
      setActiveView('repair-log');
    } else {
      setActiveView('workspace');
    }
  }, [labMode]);

  const loadPrototypes = async () => {
    setLoading(true);
    try {
      const result = await prototypeRegistry.searchPrototypes({
        programme: ['stemgeneers'],
        category: ['hardware']
      });
      setPrototypes(result.prototypes);
    } catch (err) {
      console.error('Failed to load prototypes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Original new build state
  const [newBuild, setNewBuild] = useState({
    title: '',
    description: '',
    components: '',
    targetOutcome: '',
    safetyConsiderations: ''
  });

  const startNewBuild = async () => {
    if (!newBuild.title.trim()) return;
    try {
      const prototype = await prototypeRegistry.createPrototype({
        title: newBuild.title,
        description: newBuild.description,
        category: 'hardware',
        programme: 'stemgeneers',
        tags: ['hardware', 'stemgeneers'],
        equipmentUsed: []
      });
      setPrototypes(prev => [prototype, ...prev]);
      setSelectedPrototype(prototype);
      setShowNewBuild(false);
      setNewBuild({ title: '', description: '', components: '', targetOutcome: '', safetyConsiderations: '' });
    } catch (err) {
      console.error('Failed to create build:', err);
    }
  };

  // Original iteration state
  const [newIteration, setNewIteration] = useState({
    title: '',
    description: '',
    changes: [''],
    notes: '',
    witnessed: false,
    witnessedBy: ''
  });

  const logIteration = async () => {
    if (!selectedPrototype || !newIteration.title.trim()) return;
    try {
      const iteration = await prototypeRegistry.addIteration(
        selectedPrototype.id,
        {
          title: newIteration.title,
          description: newIteration.description,
          changes: newIteration.changes.filter(c => c.trim()),
          createdBy: 'current-user',
          notes: newIteration.notes,
          witnessed: newIteration.witnessed,
          witnessedBy: newIteration.witnessedBy || undefined,
          workshopSession: `stemgeneers-lab-${new Date().toISOString().split('T')[0]}`
        }
      );
      setSelectedPrototype((prev: any) => prev ? {
        ...prev,
        iterations: [...prev.iterations, iteration],
        currentVersion: (iteration as any)?.version || (prev.currentVersion || 1) + 1
      } : null);
      setNewIteration({ title: '', description: '', changes: [''], notes: '', witnessed: false, witnessedBy: '' });
    } catch (err) {
      console.error('Failed to log iteration:', err);
    }
  };

  // ── REPAIR SUBMISSION ────────────────────────────────────────────────────

  const handleRepairSubmit = () => {
    const f = repairForm;
    if (!f.itemDescription.trim() || !f.symptomDescription.trim() ||
        !f.diagnosisReasoning.trim() || !f.outcomeDescription.trim()) return;

    setRepairSubmitting(true);

    try {
      const { repairEvidenceId } = submitRepairEvidence({
        journalEntryId: `journal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdBy: 'current-user',
        item: {
          description: f.itemDescription,
          layer: f.layer,
          estimatedValue: f.estimatedValue ? parseFloat(f.estimatedValue) : undefined,
        },
        fault: {
          symptomDescription: f.symptomDescription,
          onsetDescription: f.onsetDescription || undefined,
        },
        diagnosis: {
          reasoning: f.diagnosisReasoning,
          methodsUsed: f.methodsUsed,
          ruledOut: f.ruledOut
            ? f.ruledOut.split('\n').map(s => s.trim()).filter(Boolean)
            : [],
        },
        repair: {
          methodDescription: f.methodDescription,
          partsUsed: f.parts
            .filter(p => p.name.trim())
            .map(p => ({
              name: p.name,
              cost: parseFloat(p.cost) || 0,
              supplier: p.supplier || undefined,
              printed3D: p.printed3D,
            })),
          totalPartsCost: f.parts.reduce((sum, p) => sum + (parseFloat(p.cost) || 0), 0),
          timeSpent: parseInt(f.timeSpent) || 0,
          toolsUsed: f.toolsUsed
            ? f.toolsUsed.split(',').map(s => s.trim()).filter(Boolean)
            : [],
          physicsExplained: f.physicsExplained || undefined,
          difficultiesEncountered: f.difficultiesEncountered || undefined,
          whatWouldDoDifferently: f.whatWouldDoDifferently || undefined,
        },
        outcome: {
          successful: f.successful,
          outcomeDescription: f.outcomeDescription,
          savingAchieved: parseFloat(f.savingAchieved) || 0,
          professionalQuoteReceived: f.professionalQuoteReceived
            ? parseFloat(f.professionalQuoteReceived)
            : undefined,
        },
        photos: [
          ...(f.beforePhotoUrl ? [{
            id: `photo-before-${Date.now()}`,
            url: f.beforePhotoUrl,
            stage: 'before' as const,
            takenAt: new Date(),
          }] : []),
          ...(f.afterPhotoUrl ? [{
            id: `photo-after-${Date.now()}`,
            url: f.afterPhotoUrl,
            stage: 'after' as const,
            takenAt: new Date(),
          }] : []),
        ],
        verification: {
          status: 'self-reported',
        },
        incomeEarned: f.incomeEarned ? parseFloat(f.incomeEarned) : undefined,
        claimTokenRef: f.claimTokenRef || undefined,
      });

      setRepairSubmitted(repairEvidenceId);
      setRepairForm(EMPTY_REPAIR_FORM);
      setRepairFormStep(1);
      setActiveView('repair-log');
    } catch (err) {
      console.error('Failed to submit repair evidence:', err);
    } finally {
      setRepairSubmitting(false);
    }
  };

  // ── RENDER ───────────────────────────────────────────────────────────────

  const prototypeTabDefs: { key: LabView; label: string; icon: string }[] = [
    { key: 'workspace',   label: 'Workspace',        icon: '&#9881;' },
    { key: 'equipment',   label: 'Equipment',         icon: '&#128295;' },
    { key: 'bom',         label: 'Bill of Materials', icon: '&#128220;' },
    { key: 'sessions',    label: 'Lab Sessions',      icon: '&#128467;' },
    { key: 'safety',      label: 'Safety',            icon: '&#9888;' },
    { key: 'patent-prep', label: 'Patent Prep',       icon: '&#128274;' },
  ];

  const repairTabDefs: { key: LabView; label: string; icon: string }[] = [
    { key: 'repair-log',    label: 'Repair Log',       icon: '&#128221;' },
    { key: 'repair-submit', label: 'Log a Repair',     icon: '&#43;' },
    { key: 'repair-gates',  label: 'Skill Progress',   icon: '&#127959;' },
    { key: 'equipment',     label: 'Equipment',        icon: '&#128295;' },
    { key: 'safety',        label: 'Safety',           icon: '&#9888;' },
  ];

  const activeTabs = labMode === 'prototype' ? prototypeTabDefs : repairTabDefs;

  return (
    <div className={styles.lab}>

      {/* ── LAB HEADER ─────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.labIcon}>
            <span className={styles.gearIcon}>&#9881;</span>
          </div>
          <div className={styles.headerText}>
            <h1 className={styles.title}>STEMgeneers Lab</h1>
            <p className={styles.subtitle}>
              {labMode === 'prototype'
                ? 'Hardware Innovation Workshop'
                : 'Repair Workshop — Document. Verify. Credential.'}
            </p>
          </div>
        </div>

        {/* MODE SWITCHER */}
        <div className={styles.modeSwitcher}>
          <button
            className={`${styles.modeBtn} ${labMode === 'prototype' ? styles.modeActive : ''}`}
            onClick={() => setLabMode('prototype')}
          >
            &#9881; Prototype Lab
          </button>
          <button
            className={`${styles.modeBtn} ${labMode === 'repair' ? styles.modeActive : ''}`}
            onClick={() => setLabMode('repair')}
          >
            &#128295; Repair Workshop
            {pendingVerification && (
              <span className={styles.verificationBadge} title="STEM Sage verification pending">
                !
              </span>
            )}
          </button>
        </div>

        {/* ORIGINAL STATUS INDICATORS — prototype mode */}
        {labMode === 'prototype' && (
          <div className={styles.labStatus}>
            <StatusIndicator label="Equipment"    count={equipment.filter(e => e.status === 'available').length} total={equipment.length}      color="emerald" />
            <StatusIndicator label="Active Builds" count={prototypes.filter(p => p.status === 'development').length} total={prototypes.length} color="amber" />
            <StatusIndicator label="Protected"    count={prototypes.filter(p => p.ipStatus !== 'unprotected').length} total={prototypes.length} color="violet" />
          </div>
        )}

        {/* NEW STATUS INDICATORS — repair mode */}
        {labMode === 'repair' && (
          <div className={styles.labStatus}>
            <StatusIndicator label="Repairs"      count={stemStats.totalRepairs}        total={Math.max(stemStats.totalRepairs, 5)} color="emerald" />
            <StatusIndicator label="Witnessed"    count={stemStats.witnessedRepairs}     total={Math.max(stemStats.totalRepairs, 1)} color="amber" />
            <StatusIndicator label="Layers"       count={stemStats.layersPassed}         total={6}                                   color="violet" />
          </div>
        )}
      </header>

      {/* ── NAVIGATION TABS ─────────────────────────────────────────────── */}
      <nav className={styles.tabNav}>
        {activeTabs.map(tab => (
          <button
            key={tab.key}
            className={`${styles.tab} ${activeView === tab.key ? styles.active : ''}`}
            onClick={() => setActiveView(tab.key)}
          >
            <span dangerouslySetInnerHTML={{ __html: tab.icon }} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
      <main className={styles.mainContent}>

        {/* ── PROTOTYPE VIEWS — all original, unchanged ─────────────────── */}
        {activeView === 'workspace' && (
          <WorkspaceView
            prototypes={prototypes}
            selectedPrototype={selectedPrototype}
            onSelectPrototype={setSelectedPrototype}
            showNewBuild={showNewBuild}
            onToggleNewBuild={() => setShowNewBuild(!showNewBuild)}
            newBuild={newBuild}
            onUpdateNewBuild={setNewBuild}
            onStartBuild={startNewBuild}
            newIteration={newIteration}
            onUpdateIteration={setNewIteration}
            onLogIteration={logIteration}
            loading={loading}
          />
        )}
        {activeView === 'equipment' && (
          <EquipmentView equipment={equipment} />
        )}
        {activeView === 'bom' && (
          <BOMView items={bomItems} onUpdate={setBomItems} prototype={selectedPrototype} />
        )}
        {activeView === 'sessions' && (
          <SessionsView sessions={sessions} prototype={selectedPrototype} />
        )}
        {activeView === 'safety' && (
          <SafetyView checks={safetyChecks} onUpdate={setSafetyChecks} />
        )}
        {activeView === 'patent-prep' && (
          <PatentPrepView prototype={selectedPrototype} />
        )}

        {/* ── REPAIR VIEWS — new ─────────────────────────────────────────── */}
        {activeView === 'repair-log' && (
          <RepairLogView
            repairEvidence={Object.values(repairEvidenceMap)}
            newlySubmittedId={repairSubmitted}
            onClearNewlySubmitted={() => setRepairSubmitted(null)}
            onStartNew={() => setActiveView('repair-submit')}
          />
        )}
        {activeView === 'repair-submit' && (
          <RepairSubmitView
            form={repairForm}
            onUpdate={setRepairForm}
            step={repairFormStep}
            onSetStep={setRepairFormStep}
            onSubmit={handleRepairSubmit}
            submitting={repairSubmitting}
            onCancel={() => setActiveView('repair-log')}
          />
        )}
        {activeView === 'repair-gates' && (
          <RepairGatesView />
        )}

      </main>
    </div>
  );
};

// ============================================================================
// ORIGINAL SUB-COMPONENTS — all preserved exactly
// ============================================================================

interface StatusIndicatorProps {
  label: string;
  count: number;
  total: number;
  color: 'amber' | 'emerald' | 'violet' | 'sky';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ label, count, total, color }) => (
  <div className={`${styles.statusIndicator} ${styles[color]}`}>
    <div className={styles.gauge}>
      <svg viewBox="0 0 36 36" className={styles.gaugeRing}>
        <path className={styles.gaugeBg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
        <path className={styles.gaugeFill} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"
          strokeDasharray={`${total > 0 ? (count / total) * 100 : 0}, 100`}
        />
      </svg>
      <span className={styles.gaugeValue}>{count}</span>
    </div>
    <span className={styles.gaugeLabel}>{label}</span>
  </div>
);

// WorkspaceView — original, unchanged
interface WorkspaceViewProps {
  prototypes: Prototype[];
  selectedPrototype: Prototype | null;
  onSelectPrototype: (p: Prototype) => void;
  showNewBuild: boolean;
  onToggleNewBuild: () => void;
  newBuild: any;
  onUpdateNewBuild: (b: any) => void;
  onStartBuild: () => void;
  newIteration: any;
  onUpdateIteration: (i: any) => void;
  onLogIteration: () => void;
  loading: boolean;
}

const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  prototypes, selectedPrototype, onSelectPrototype,
  showNewBuild, onToggleNewBuild, newBuild, onUpdateNewBuild, onStartBuild,
  newIteration, onUpdateIteration, onLogIteration, loading
}) => (
  <div className={styles.workspace}>
    <aside className={styles.buildList}>
      <div className={styles.buildListHeader}>
        <h2>Active Builds</h2>
        <button className={styles.newBuildButton} onClick={onToggleNewBuild}>+ New Build</button>
      </div>
      {showNewBuild && (
        <div className={styles.newBuildForm}>
          <input type="text" placeholder="Build name..." value={newBuild.title}
            onChange={(e) => onUpdateNewBuild({ ...newBuild, title: e.target.value })} className={styles.input} />
          <textarea placeholder="What are you building?" value={newBuild.description}
            onChange={(e) => onUpdateNewBuild({ ...newBuild, description: e.target.value })} className={styles.textarea} rows={3} />
          <textarea placeholder="Safety considerations..." value={newBuild.safetyConsiderations}
            onChange={(e) => onUpdateNewBuild({ ...newBuild, safetyConsiderations: e.target.value })} className={styles.textarea} rows={2} />
          <div className={styles.formActions}>
            <button className={styles.primaryBtn} onClick={onStartBuild}>Start Build</button>
            <button className={styles.ghostBtn} onClick={onToggleNewBuild}>Cancel</button>
          </div>
        </div>
      )}
      {loading ? (
        <div className={styles.loading}>Loading builds...</div>
      ) : prototypes.length === 0 ? (
        <div className={styles.emptyBuilds}><p>No active builds yet.</p><p>Start your first hardware prototype.</p></div>
      ) : (
        <ul className={styles.builds}>
          {prototypes.map(p => (
            <li key={p.id} className={`${styles.buildItem} ${selectedPrototype?.id === p.id ? styles.selected : ''}`}
              onClick={() => onSelectPrototype(p)}>
              <div className={styles.buildInfo}>
                <span className={styles.buildName}>{p.title}</span>
                <span className={styles.buildVersion}>v{p.currentVersion}</span>
              </div>
              <span className={`${styles.buildStatus} ${styles[p.status]}`}>{p.status}</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
    <section className={styles.buildDetail}>
      {selectedPrototype ? (
        <>
          <div className={styles.buildDetailHeader}>
            <h2>{selectedPrototype.title}</h2>
            <span className={styles.versionTag}>v{selectedPrototype.currentVersion}</span>
          </div>
          <p className={styles.buildDescription}>{selectedPrototype.description}</p>
          <div className={styles.iterationTimeline}>
            <h3>Build Log</h3>
            {selectedPrototype.iterations.length === 0 ? (
              <p className={styles.noIterations}>No iterations logged yet.</p>
            ) : (
              <div className={styles.timeline}>
                {selectedPrototype.iterations.map((iteration: any, idx: any) => (
                  <div key={iteration.id} className={styles.timelineEntry}>
                    <div className={styles.timelineDot}>
                      {iteration.witnessed && <span className={styles.witnessedMark} title="Witnessed">&#10003;</span>}
                    </div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineMeta}>
                        <span className={styles.timelineVersion}>v{iteration.version}</span>
                        <span className={styles.timelineDate}>{new Date(iteration.createdAt).toLocaleDateString('en-GB')}</span>
                      </div>
                      <h4>{iteration.title}</h4>
                      <p>{iteration.description}</p>
                      {iteration.changes.length > 0 && (
                        <ul className={styles.changeList}>
                          {iteration.changes.map((change: any, i: any) => <li key={i}>{change}</li>)}
                        </ul>
                      )}
                      {iteration.witnessed && <span className={styles.witnessedLabel}>Witnessed by {iteration.witnessedBy}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.newIterationForm}>
            <h3>Log New Iteration</h3>
            <input type="text" placeholder="What changed in this iteration?" value={newIteration.title}
              onChange={(e) => onUpdateIteration({ ...newIteration, title: e.target.value })} className={styles.input} />
            <textarea placeholder="Detailed description of changes..." value={newIteration.description}
              onChange={(e) => onUpdateIteration({ ...newIteration, description: e.target.value })} className={styles.textarea} rows={3} />
            <div className={styles.changesField}>
              <label>Specific Changes</label>
              {newIteration.changes.map((change: string, idx: number) => (
                <div key={idx} className={styles.changeRow}>
                  <input type="text" placeholder={`Change ${idx + 1}...`} value={change}
                    onChange={(e) => { const u = [...newIteration.changes]; u[idx] = e.target.value; onUpdateIteration({ ...newIteration, changes: u }); }}
                    className={styles.input} />
                  {idx > 0 && (
                    <button className={styles.removeBtn}
                      onClick={() => onUpdateIteration({ ...newIteration, changes: newIteration.changes.filter((_: any, i: number) => i !== idx) })}>
                      &#10005;
                    </button>
                  )}
                </div>
              ))}
              <button className={styles.addBtn}
                onClick={() => onUpdateIteration({ ...newIteration, changes: [...newIteration.changes, ''] })}>
                + Add Change
              </button>
            </div>
            <div className={styles.witnessRow}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={newIteration.witnessed}
                  onChange={(e) => onUpdateIteration({ ...newIteration, witnessed: e.target.checked })} />
                <span>This iteration was witnessed</span>
              </label>
              {newIteration.witnessed && (
                <input type="text" placeholder="Witness name..." value={newIteration.witnessedBy}
                  onChange={(e) => onUpdateIteration({ ...newIteration, witnessedBy: e.target.value })} className={styles.witnessInput} />
              )}
            </div>
            <div className={styles.iterationTip}>
              <strong>Patent tip:</strong> Witnessed iterations with timestamps create essential evidence for patent applications.
            </div>
            <button className={styles.primaryBtn} onClick={onLogIteration}>Log Iteration</button>
          </div>
        </>
      ) : (
        <div className={styles.noBuildSelected}>
          <div className={styles.noBuildIcon}>&#9881;</div>
          <h3>Select a build to view details</h3>
          <p>Choose from your active builds or start a new one</p>
        </div>
      )}
    </section>
  </div>
);

// EquipmentView — original, unchanged
const EquipmentView: React.FC<{ equipment: LabEquipment[] }> = ({ equipment }) => {
  const categories = [...new Set(equipment.map(e => e.category))];
  return (
    <div className={styles.equipmentView}>
      <h2>Lab Equipment</h2>
      {categories.map(cat => (
        <div key={cat} className={styles.equipmentCategory}>
          <h3 className={styles.categoryTitle}>{formatCategory(cat)}</h3>
          <div className={styles.equipmentGrid}>
            {equipment.filter(e => e.category === cat).map(item => (
              <div key={item.id} className={`${styles.equipmentCard} ${styles[item.status]}`}>
                <div className={styles.eqHeader}>
                  <span className={styles.eqName}>{item.name}</span>
                  <span className={`${styles.eqStatus} ${styles[item.status]}`}>{item.status.replace('-', ' ')}</span>
                </div>
                <div className={styles.eqMeta}>
                  <span className={styles.eqLocation}>{item.location}</span>
                  <span className={`${styles.eqSafety} ${styles[item.safetyLevel]}`}>{item.safetyLevel} safety</span>
                </div>
                {item.requiredTraining.length > 0 && (
                  <div className={styles.eqTraining}>
                    <span className={styles.trainingLabel}>Required:</span>
                    {item.requiredTraining.map((t, i) => <span key={i} className={styles.trainingTag}>{t}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// BOMView — original, unchanged
interface BOMViewProps { items: BOMItem[]; onUpdate: (items: BOMItem[]) => void; prototype: Prototype | null; }
const BOMView: React.FC<BOMViewProps> = ({ items, onUpdate, prototype }) => {
  const totalCost = items.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);
  const acquiredCount = items.filter(i => i.acquired).length;
  return (
    <div className={styles.bomView}>
      <div className={styles.bomHeader}>
        <h2>Bill of Materials {prototype && <span>— {prototype.title}</span>}</h2>
        <div className={styles.bomSummary}>
          <span className={styles.bomTotal}>Total: £{totalCost.toFixed(2)}</span>
          <span className={styles.bomProgress}>{acquiredCount}/{items.length} acquired</span>
        </div>
      </div>
      {items.length === 0 ? (
        <div className={styles.emptyBom}>
          <p>No materials listed yet.</p>
          <button className={styles.primaryBtn} onClick={() => onUpdate([...items, { id: `bom-${Date.now()}`, name: '', description: '', quantity: 1, unit: 'pcs', unitCost: 0, category: 'electronic', acquired: false }])}>Add First Component</button>
        </div>
      ) : (
        <table className={styles.bomTable}>
          <thead><tr><th>Component</th><th>Category</th><th>Qty</th><th>Unit Cost</th><th>Total</th><th>Supplier</th><th>Acquired</th></tr></thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.id} className={item.acquired ? styles.acquired : ''}>
                <td><input className={styles.tableInput} value={item.name} onChange={(e) => { const u = [...items]; u[idx] = { ...item, name: e.target.value }; onUpdate(u); }} placeholder="Component name..." /></td>
                <td><select className={styles.tableSelect} value={item.category} onChange={(e) => { const u = [...items]; u[idx] = { ...item, category: e.target.value as BOMItem['category'] }; onUpdate(u); }}>
                  <option value="electronic">Electronic</option><option value="mechanical">Mechanical</option><option value="consumable">Consumable</option><option value="packaging">Packaging</option><option value="other">Other</option>
                </select></td>
                <td><input type="number" className={styles.tableInputSmall} value={item.quantity} onChange={(e) => { const u = [...items]; u[idx] = { ...item, quantity: parseInt(e.target.value) || 0 }; onUpdate(u); }} min={0} /></td>
                <td><input type="number" className={styles.tableInputSmall} value={item.unitCost} onChange={(e) => { const u = [...items]; u[idx] = { ...item, unitCost: parseFloat(e.target.value) || 0 }; onUpdate(u); }} min={0} step={0.01} /></td>
                <td className={styles.costCell}>£{(item.quantity * item.unitCost).toFixed(2)}</td>
                <td><input className={styles.tableInput} value={item.supplier || ''} onChange={(e) => { const u = [...items]; u[idx] = { ...item, supplier: e.target.value }; onUpdate(u); }} placeholder="Supplier..." /></td>
                <td><input type="checkbox" checked={item.acquired} onChange={(e) => { const u = [...items]; u[idx] = { ...item, acquired: e.target.checked }; onUpdate(u); }} /></td>
              </tr>
            ))}
          </tbody>
          <tfoot><tr>
            <td colSpan={4} className={styles.totalLabel}>Total Cost</td>
            <td className={styles.totalValue}>£{totalCost.toFixed(2)}</td>
            <td colSpan={2}><button className={styles.addBtn} onClick={() => onUpdate([...items, { id: `bom-${Date.now()}`, name: '', description: '', quantity: 1, unit: 'pcs', unitCost: 0, category: 'electronic', acquired: false }])}>+ Add Row</button></td>
          </tr></tfoot>
        </table>
      )}
    </div>
  );
};

// SessionsView — original, unchanged
const SessionsView: React.FC<{ sessions: LabSession[]; prototype: Prototype | null }> = ({ sessions }) => (
  <div className={styles.sessionsView}>
    <h2>Lab Sessions</h2>
    <p className={styles.viewDescription}>Record workshop sessions with participants, equipment used, and outcomes. Each session contributes to your patent evidence trail.</p>
    {sessions.length === 0 && <div className={styles.emptyState}><p>No lab sessions recorded yet.</p><button className={styles.primaryBtn}>Record Session</button></div>}
  </div>
);

// SafetyView — original, unchanged
const SafetyView: React.FC<{ checks: SafetyCheck[]; onUpdate: (c: SafetyCheck[]) => void }> = () => (
  <div className={styles.safetyView}>
    <h2>Safety Checklist</h2>
    <div className={styles.safetyWarning}>
      <span className={styles.warningIcon}>&#9888;</span>
      <p>All safety protocols must be completed before starting any build session. This protects participants and satisfies CIC insurance requirements.</p>
    </div>
    <div className={styles.safetyCategories}>
      {['general', 'electrical', 'mechanical', 'chemical', 'thermal'].map(cat => (
        <div key={cat} className={styles.safetyCategory}>
          <h3>{cat.charAt(0).toUpperCase() + cat.slice(1)} Safety</h3>
          <div className={styles.checklistPlaceholder}>Safety checks for {cat} hazards will be loaded from your programme configuration.</div>
        </div>
      ))}
    </div>
  </div>
);

// PatentPrepView — original, unchanged
const PatentPrepView: React.FC<{ prototype: Prototype | null }> = ({ prototype }) => (
  <div className={styles.patentPrepView}>
    <h2>Patent Preparation</h2>
    {prototype ? (
      <div className={styles.patentChecklist}>
        <h3>{prototype.title} — IP Readiness</h3>
        <div className={styles.readinessGrid}>
          <ReadinessItem label="Development Log" description="Timestamped iteration history with witnessed entries" complete={prototype.iterations.length >= 3} detail={`${prototype.iterations.length} iterations logged`} />
          <ReadinessItem label="Creator Attribution" description="All contributors documented with contribution percentages" complete={prototype.creators.length > 0} detail={`${prototype.creators.length} creators registered`} />
          <ReadinessItem label="Technical Documentation" description="Schematics, code, assembly instructions" complete={prototype.documentation.length > 0} detail={`${prototype.documentation.length} documents`} />
          <ReadinessItem label="Bill of Materials" description="Complete parts list with specifications" complete={false} detail="Not yet completed" />
          <ReadinessItem label="Prior Art Search" description="Documented search of existing patents and products" complete={false} detail="Not yet conducted" />
          <ReadinessItem label="Invention Disclosure" description="Formal disclosure form submitted for review" complete={prototype.disclosures.length > 0} detail={prototype.disclosures.length > 0 ? 'Disclosure filed' : 'Not yet filed'} />
        </div>
        <div className={styles.patentActions}>
          <button className={styles.primaryBtn}>Start Invention Disclosure</button>
          <button className={styles.secondaryBtn}>Run Prior Art Search</button>
        </div>
      </div>
    ) : (
      <div className={styles.emptyState}><p>Select a build from the workspace to assess patent readiness.</p></div>
    )}
  </div>
);

interface ReadinessItemProps { label: string; description: string; complete: boolean; detail: string; }
const ReadinessItem: React.FC<ReadinessItemProps> = ({ label, description, complete, detail }) => (
  <div className={`${styles.readinessItem} ${complete ? styles.ready : styles.pending}`}>
    <div className={styles.readinessCheck}>{complete ? '&#10003;' : '&#9675;'}</div>
    <div className={styles.readinessContent}>
      <h4>{label}</h4>
      <p>{description}</p>
      <span className={styles.readinessDetail}>{detail}</span>
    </div>
  </div>
);

// ============================================================================
// NEW: REPAIR VIEWS
// ============================================================================

// ── REPAIR LOG VIEW ──────────────────────────────────────────────────────────

interface RepairLogViewProps {
  repairEvidence: RepairEvidence[];
  newlySubmittedId: string | null;
  onClearNewlySubmitted: () => void;
  onStartNew: () => void;
}

const RepairLogView: React.FC<RepairLogViewProps> = ({
  repairEvidence, newlySubmittedId, onClearNewlySubmitted, onStartNew
}) => {
  const sorted = [...repairEvidence].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const verificationColour: Record<RepairEvidence['verification']['status'], string> = {
    'self-reported':  '#6b7280',
    'peer-witnessed': '#f59e0b',
    'mentor-approved':'#10b981',
    'claim-verified': '#8b5cf6',
  };

  const verificationLabel: Record<RepairEvidence['verification']['status'], string> = {
    'self-reported':  'Self-reported',
    'peer-witnessed': '✓ Witnessed',
    'mentor-approved':'✓ Mentor approved',
    'claim-verified': '★ Claim verified',
  };

  return (
    <div className={styles.repairLogView}>
      <div className={styles.repairLogHeader}>
        <h2>Repair Log</h2>
        <button className={styles.primaryBtn} onClick={onStartNew}>
          + Log a Repair
        </button>
      </div>

      {newlySubmittedId && (
        <div className={styles.submittedAlert}>
          <strong>✓ Repair logged.</strong> STEM Sage has a quick follow-up — check the notification
          in your Creator's Journal to complete verification.
          <button className={styles.alertDismiss} onClick={onClearNewlySubmitted}>×</button>
        </div>
      )}

      {sorted.length === 0 ? (
        <div className={styles.emptyRepairs}>
          <div className={styles.emptyIcon}>&#128295;</div>
          <h3>No repairs logged yet</h3>
          <p>
            Every repair you log — with diagnosis reasoning, photos, and outcome —
            builds your portfolio. That portfolio is your credential.
          </p>
          <button className={styles.primaryBtn} onClick={onStartNew}>Log your first repair</button>
        </div>
      ) : (
        <div className={styles.repairList}>
          {sorted.map((repair) => (
            <div
              key={repair.id}
              className={`${styles.repairCard} ${newlySubmittedId === repair.id ? styles.newlySubmitted : ''}`}
            >
              <div className={styles.repairCardHeader}>
                <div className={styles.repairCardTitle}>
                  <h3>{repair.item.description}</h3>
                  <span className={styles.repairLayer}>{repair.item.layer}</span>
                </div>
                <div className={styles.repairCardMeta}>
                  <span
                    className={styles.verificationStatus}
                    style={{ color: verificationColour[repair.verification.status] }}
                  >
                    {verificationLabel[repair.verification.status]}
                  </span>
                  {repair.claimTokenRef && (
                    <span className={styles.claimToken} title="Counter-archive claim token">
                      QR: {repair.claimTokenRef}
                    </span>
                  )}
                  <span className={styles.repairDate}>
                    {new Date(repair.createdAt).toLocaleDateString('en-GB')}
                  </span>
                </div>
              </div>

              <div className={styles.repairCardBody}>
                <div className={styles.repairFault}>
                  <span className={styles.repairFieldLabel}>Fault</span>
                  <p>{repair.fault.symptomDescription}</p>
                </div>
                <div className={styles.repairDiagnosis}>
                  <span className={styles.repairFieldLabel}>Diagnosis reasoning</span>
                  <p>{repair.diagnosis.reasoning}</p>
                </div>
                {repair.repair.physicsExplained && (
                  <div className={styles.repairPhysics}>
                    <span className={styles.repairFieldLabel}>Physics</span>
                    <p>{repair.repair.physicsExplained}</p>
                  </div>
                )}
                <div className={styles.repairOutcome}>
                  <span className={styles.repairFieldLabel}>Outcome</span>
                  <p>{repair.outcome.outcomeDescription}</p>
                </div>
              </div>

              <div className={styles.repairCardFooter}>
                <span className={`${styles.repairSuccess} ${repair.outcome.successful ? styles.successful : styles.unsuccessful}`}>
                  {repair.outcome.successful ? '✓ Successful' : '✗ Unsuccessful'}
                </span>
                {repair.outcome.savingAchieved > 0 && (
                  <span className={styles.repairSaving}>
                    £{repair.outcome.savingAchieved} saved
                  </span>
                )}
                {repair.incomeEarned && repair.incomeEarned > 0 && (
                  <span className={styles.repairIncome}>
                    £{repair.incomeEarned} earned
                  </span>
                )}
                <span className={styles.repairTime}>
                  {repair.repair.timeSpent} mins
                </span>
                {repair.repair.partsUsed.length > 0 && (
                  <span className={styles.repairPartsCost}>
                    Parts: £{repair.repair.totalPartsCost.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Witness prompt — shown for self-reported repairs */}
              {repair.verification.status === 'self-reported' && (
                <div className={styles.witnessPrompt}>
                  <span className={styles.witnessPromptIcon}>&#128100;</span>
                  <p>
                    Get a Tech Collective member or mentor to witness this repair
                    to strengthen your portfolio evidence.
                  </p>
                  <WitnessForm repairId={repair.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── WITNESS FORM — inline on repair card ─────────────────────────────────────

const WitnessForm: React.FC<{ repairId: string }> = ({ repairId }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [statement, setStatement] = useState('');
  const [relationship, setRelationship] = useState<RepairEvidence['verification']['witnessRelationship']>('collective-member');
  const witnessRepair = useJournalStore((s) => s.witnessRepair);

  const handleSubmit = () => {
    if (!name.trim() || !statement.trim()) return;
    witnessRepair(repairId, {
      userId: `witness-${Date.now()}`,
      name,
      statement,
      relationship,
    });
    setOpen(false);
    setName('');
    setStatement('');
  };

  if (!open) return (
    <button className={styles.witnessOpenBtn} onClick={() => setOpen(true)}>
      Add witness sign-off
    </button>
  );

  return (
    <div className={styles.witnessFormInline}>
      <input type="text" placeholder="Witness name..." value={name}
        onChange={(e) => setName(e.target.value)} className={styles.input} />
      <select
        className={styles.tableSelect}
        value={relationship}
        onChange={(e) => setRelationship(e.target.value as typeof relationship)}
      >
        <option value="collective-member">Tech Collective member</option>
        <option value="programme-peer">Programme peer</option>
        <option value="mentor">Mentor</option>
        <option value="client">Client</option>
      </select>
      <textarea placeholder="What did you observe? (Witness's own words)" value={statement}
        onChange={(e) => setStatement(e.target.value)} className={styles.textarea} rows={3} />
      <div className={styles.formActions}>
        <button className={styles.primaryBtn} onClick={handleSubmit}>Confirm witness</button>
        <button className={styles.ghostBtn} onClick={() => setOpen(false)}>Cancel</button>
      </div>
    </div>
  );
};

// ── REPAIR SUBMIT VIEW — four-step form ──────────────────────────────────────

interface RepairSubmitViewProps {
  form: RepairFormState;
  onUpdate: (f: RepairFormState) => void;
  step: 1 | 2 | 3 | 4;
  onSetStep: (s: 1 | 2 | 3 | 4) => void;
  onSubmit: () => void;
  submitting: boolean;
  onCancel: () => void;
}

const STEP_LABELS = ['Item & Fault', 'Diagnosis', 'Repair & Parts', 'Outcome'];

const RepairSubmitView: React.FC<RepairSubmitViewProps> = ({
  form, onUpdate, step, onSetStep, onSubmit, submitting, onCancel
}) => {
  const updateField = <K extends keyof RepairFormState>(key: K, value: RepairFormState[K]) =>
    onUpdate({ ...form, [key]: value });

  const toggleMethod = (method: DiagnosisMethod) => {
    const current = form.methodsUsed;
    updateField('methodsUsed', current.includes(method)
      ? current.filter(m => m !== method)
      : [...current, method]
    );
  };

  const canAdvance = (): boolean => {
    if (step === 1) return !!form.itemDescription.trim() && !!form.symptomDescription.trim();
    if (step === 2) return !!form.diagnosisReasoning.trim();
    if (step === 3) return !!form.methodDescription.trim();
    return !!form.outcomeDescription.trim();
  };

  return (
    <div className={styles.repairSubmitView}>
      <div className={styles.repairSubmitHeader}>
        <h2>Log a Repair</h2>
        <button className={styles.ghostBtn} onClick={onCancel}>Cancel</button>
      </div>

      {/* Step indicator */}
      <div className={styles.stepIndicator}>
        {STEP_LABELS.map((label, i) => (
          <div
            key={i}
            className={`${styles.stepDot} ${step === i + 1 ? styles.stepActive : ''} ${step > i + 1 ? styles.stepDone : ''}`}
            onClick={() => step > i + 1 && onSetStep((i + 1) as 1 | 2 | 3 | 4)}
          >
            <span className={styles.stepNumber}>{step > i + 1 ? '✓' : i + 1}</span>
            <span className={styles.stepLabel}>{label}</span>
          </div>
        ))}
      </div>

      {/* Step 1: Item & Fault */}
      {step === 1 && (
        <div className={styles.formStep}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>What did you repair? *</label>
            <input type="text" className={styles.input}
              placeholder="e.g. Hotpoint WML520P washing machine, iPhone 12 screen, bathroom tap"
              value={form.itemDescription}
              onChange={(e) => updateField('itemDescription', e.target.value)} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Repair layer *</label>
            <select className={styles.tableSelect} value={form.layer}
              onChange={(e) => updateField('layer', e.target.value as RepairLayer)}>
              {REPAIR_LAYERS.map(l => (
                <option key={l} value={l}>{LAYER_LABELS[l]}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Estimated replacement cost (£)</label>
            <input type="number" className={styles.input} placeholder="e.g. 400"
              value={form.estimatedValue}
              onChange={(e) => updateField('estimatedValue', e.target.value)} />
            <span className={styles.formHint}>
              Helps calculate the saving your repair generated.
            </span>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>What was wrong? Describe the symptom. *</label>
            <textarea className={styles.textarea} rows={4}
              placeholder="What did you observe? e.g. Loud grinding noise during spin cycle, getting worse over 3 weeks. Occasionally stopping mid-cycle."
              value={form.symptomDescription}
              onChange={(e) => updateField('symptomDescription', e.target.value)} />
            <span className={styles.formHint}>
              Your own words. The more specific the better — this is part of your evidence.
            </span>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>When did it start / how did it develop?</label>
            <input type="text" className={styles.input}
              placeholder="e.g. Started 3 weeks ago, gradually worsening. No specific event."
              value={form.onsetDescription}
              onChange={(e) => updateField('onsetDescription', e.target.value)} />
          </div>
        </div>
      )}

      {/* Step 2: Diagnosis */}
      {step === 2 && (
        <div className={styles.formStep}>
          <div className={styles.diagnosisTip}>
            <strong>&#128269; This is the most important section.</strong>
            <p>
              The diagnosis reasoning is what turns a job into evidence of competence.
              Don't just say what was wrong — explain how you knew, and what you ruled out.
            </p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>How did you diagnose the fault? *</label>
            <textarea className={styles.textarea} rows={5}
              placeholder="Walk through your reasoning. What told you it was X and not Y? e.g. Grinding during spin but not agitation indicated drum bearing rather than motor brushes. Confirmed by removing drum — outer race had visible pitting consistent with lubricant breakdown."
              value={form.diagnosisReasoning}
              onChange={(e) => updateField('diagnosisReasoning', e.target.value)} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Methods used</label>
            <div className={styles.methodsGrid}>
              {(Object.keys(DIAGNOSIS_METHOD_LABELS) as DiagnosisMethod[]).map(method => (
                <label key={method} className={styles.methodCheckbox}>
                  <input type="checkbox"
                    checked={form.methodsUsed.includes(method)}
                    onChange={() => toggleMethod(method)} />
                  <span>{DIAGNOSIS_METHOD_LABELS[method]}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>What did you rule out, and why?</label>
            <textarea className={styles.textarea} rows={3}
              placeholder="One per line. e.g. Carbon brushes — machine spins freely by hand, brushes intact&#10;Drive belt — no slipping noise, belt intact on inspection"
              value={form.ruledOut}
              onChange={(e) => updateField('ruledOut', e.target.value)} />
            <span className={styles.formHint}>
              Showing what you eliminated is as important as identifying the fault.
            </span>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              What's the physics / science behind this fault and fix?
            </label>
            <textarea className={styles.textarea} rows={4}
              placeholder="e.g. Tribology — bearing fails when lubricant breaks down under load cycles. The rumbling frequency corresponds to ball contact with the degraded raceway. New bearing restores smooth rolling contact."
              value={form.physicsExplained}
              onChange={(e) => updateField('physicsExplained', e.target.value)} />
            <span className={styles.formHint}>
              Not required, but explains the why — and significantly strengthens your
              verification score and gate progress.
            </span>
          </div>
        </div>
      )}

      {/* Step 3: Repair & Parts */}
      {step === 3 && (
        <div className={styles.formStep}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>What did you do? *</label>
            <textarea className={styles.textarea} rows={4}
              placeholder="Describe the repair method step by step."
              value={form.methodDescription}
              onChange={(e) => updateField('methodDescription', e.target.value)} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Time spent (minutes)</label>
            <input type="number" className={styles.input} placeholder="e.g. 90"
              value={form.timeSpent}
              onChange={(e) => updateField('timeSpent', e.target.value)} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Tools used</label>
            <input type="text" className={styles.input}
              placeholder="Comma-separated. e.g. Spanner set, multimeter, bearing puller, torque wrench"
              value={form.toolsUsed}
              onChange={(e) => updateField('toolsUsed', e.target.value)} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Parts used</label>
            {form.parts.map((part, idx) => (
              <div key={idx} className={styles.partRow}>
                <input type="text" className={styles.input} placeholder="Part name..."
                  value={part.name}
                  onChange={(e) => {
                    const u = [...form.parts]; u[idx] = { ...part, name: e.target.value };
                    updateField('parts', u);
                  }} />
                <input type="number" className={styles.tableInputSmall} placeholder="£"
                  value={part.cost}
                  onChange={(e) => {
                    const u = [...form.parts]; u[idx] = { ...part, cost: e.target.value };
                    updateField('parts', u);
                  }} />
                <input type="text" className={styles.input} placeholder="Supplier..."
                  value={part.supplier}
                  onChange={(e) => {
                    const u = [...form.parts]; u[idx] = { ...part, supplier: e.target.value };
                    updateField('parts', u);
                  }} />
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" checked={part.printed3D}
                    onChange={(e) => {
                      const u = [...form.parts]; u[idx] = { ...part, printed3D: e.target.checked };
                      updateField('parts', u);
                    }} />
                  <span>3D printed</span>
                </label>
                {idx > 0 && (
                  <button className={styles.removeBtn}
                    onClick={() => updateField('parts', form.parts.filter((_, i) => i !== idx))}>
                    &#10005;
                  </button>
                )}
              </div>
            ))}
            <button className={styles.addBtn}
              onClick={() => updateField('parts', [...form.parts, { name: '', cost: '', supplier: '', printed3D: false }])}>
              + Add part
            </button>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Difficulties encountered</label>
            <textarea className={styles.textarea} rows={2}
              placeholder="What was harder than expected? What went wrong?"
              value={form.difficultiesEncountered}
              onChange={(e) => updateField('difficultiesEncountered', e.target.value)} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>What would you do differently next time?</label>
            <textarea className={styles.textarea} rows={2}
              placeholder="Reflection on the process."
              value={form.whatWouldDoDifferently}
              onChange={(e) => updateField('whatWouldDoDifferently', e.target.value)} />
          </div>
        </div>
      )}

      {/* Step 4: Outcome */}
      {step === 4 && (
        <div className={styles.formStep}>
          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={form.successful}
                onChange={(e) => updateField('successful', e.target.checked)} />
              <span>Repair was successful</span>
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Describe the outcome *</label>
            <textarea className={styles.textarea} rows={3}
              placeholder="What is the item doing now? e.g. Machine running quietly. Full test cycle completed. Customer confirmed satisfied."
              value={form.outcomeDescription}
              onChange={(e) => updateField('outcomeDescription', e.target.value)} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Saving achieved (£)</label>
            <input type="number" className={styles.input}
              placeholder="How much would a professional have charged? e.g. 180"
              value={form.savingAchieved}
              onChange={(e) => updateField('savingAchieved', e.target.value)} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Professional quote received (£)</label>
            <input type="number" className={styles.input}
              placeholder="If you got a quote before attempting the repair"
              value={form.professionalQuoteReceived}
              onChange={(e) => updateField('professionalQuoteReceived', e.target.value)} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Income earned (£)</label>
            <input type="number" className={styles.input}
              placeholder="If this was paid work — leave blank for free community help"
              value={form.incomeEarned}
              onChange={(e) => updateField('incomeEarned', e.target.value)} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Counter-archive claim token</label>
            <input type="text" className={styles.input}
              placeholder="QR token ref — from the claim printed at service (e.g. WW-2026-0041)"
              value={form.claimTokenRef}
              onChange={(e) => updateField('claimTokenRef', e.target.value)} />
            <span className={styles.formHint}>
              The claim token is the strongest verification — it proves a real transaction occurred.
              ★ Claim-verified repairs carry the most weight in your portfolio.
            </span>
          </div>

          <div className={styles.photoSection}>
            <h4>Photos</h4>
            <p className={styles.formHint}>
              Minimum two required for full verification: before and after.
              (File upload coming — paste URLs for now.)
            </p>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Before photo URL</label>
              <input type="text" className={styles.input} placeholder="https://..."
                value={form.beforePhotoUrl}
                onChange={(e) => updateField('beforePhotoUrl', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>After photo URL</label>
              <input type="text" className={styles.input} placeholder="https://..."
                value={form.afterPhotoUrl}
                onChange={(e) => updateField('afterPhotoUrl', e.target.value)} />
            </div>
          </div>

          <div className={styles.submitTip}>
            <strong>After you submit:</strong> STEM Sage will ask you three quick questions
            about the repair — not a test, just a conversation to confirm the understanding.
            This is what turns a log entry into a verified credential.
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className={styles.stepNav}>
        {step > 1 && (
          <button className={styles.ghostBtn}
            onClick={() => onSetStep((step - 1) as 1 | 2 | 3 | 4)}>
            ← Back
          </button>
        )}
        {step < 4 ? (
          <button
            className={styles.primaryBtn}
            onClick={() => onSetStep((step + 1) as 1 | 2 | 3 | 4)}
            disabled={!canAdvance()}
          >
            Next →
          </button>
        ) : (
          <button
            className={styles.primaryBtn}
            onClick={onSubmit}
            disabled={!canAdvance() || submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Repair'}
          </button>
        )}
      </div>
    </div>
  );
};

// ── REPAIR GATES VIEW ────────────────────────────────────────────────────────

const RepairGatesView: React.FC = () => {
  const stats = useSTEMgeneersStats();

  return (
    <div className={styles.repairGatesView}>
      <div className={styles.gatesHeader}>
        <h2>Skill Layer Progress</h2>
        <p>
          Each layer requires diagnostic accuracy, witnessed real-world repairs,
          physics understanding, and a STEM Sage verification conversation.
          All four. Not three.
        </p>
      </div>

      {/* Summary bar */}
      <div className={styles.gatesSummary}>
        <div className={styles.gateSummaryItem}>
          <span className={styles.gateSummaryValue}>{stats.layersPassed}</span>
          <span className={styles.gateSummaryLabel}>Layers passed</span>
        </div>
        <div className={styles.gateSummaryItem}>
          <span className={styles.gateSummaryValue}>{stats.layersInProgress}</span>
          <span className={styles.gateSummaryLabel}>In progress</span>
        </div>
        <div className={styles.gateSummaryItem}>
          <span className={styles.gateSummaryValue}>
            {Math.round(stats.averageDiagnosticAccuracy * 100)}%
          </span>
          <span className={styles.gateSummaryLabel}>Diagnostic accuracy</span>
        </div>
        <div className={styles.gateSummaryItem}>
          <span className={styles.gateSummaryValue}>
            £{stats.totalSavingsGenerated.toLocaleString()}
          </span>
          <span className={styles.gateSummaryLabel}>Community savings</span>
        </div>
      </div>

      {/* Individual layer gates */}
      <div className={styles.gatesGrid}>
        {REPAIR_LAYERS.map((layer) => (
          <LayerGatePanel key={layer} layer={layer} />
        ))}
      </div>

      {/* Certification prompt */}
      {stats.layersPassed >= 2 && (
        <div className={styles.certPrompt}>
          <h3>&#127942; Certification available</h3>
          <p>
            You've passed {stats.layersPassed} skill layers. Check your Creator's Journal
            to request STEMgeneers certification.
          </p>
        </div>
      )}
    </div>
  );
};

// ── LAYER GATE PANEL ─────────────────────────────────────────────────────────

const LayerGatePanel: React.FC<{ layer: RepairLayer }> = ({ layer }) => {
  const gate = useGateRequirements(layer);

  const statusConfig = {
    locked:                   { colour: '#6b7280', label: 'Not started' },
    'in-progress':            { colour: '#f59e0b', label: 'In progress' },
    passed:                   { colour: '#10b981', label: '✓ Passed' },
    'passed-with-distinction':{ colour: '#8b5cf6', label: '★ Distinction' },
  };

  const config = statusConfig[gate.status];

  return (
    <div className={styles.layerGatePanel} style={{ borderColor: config.colour }}>
      <div className={styles.lgpHeader}>
        <h3>{LAYER_LABELS[layer].split('(')[0].trim()}</h3>
        <div className={styles.lgpStatus} style={{ color: config.colour }}>
          {config.label}
        </div>
      </div>

      {/* Progress ring */}
      <div className={styles.lgpRing}>
        <svg viewBox="0 0 36 36">
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none" stroke="#e5e7eb" strokeWidth="3" />
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none" strokeWidth="3"
            strokeDasharray={`${gate.overallProgress}, 100`}
            style={{ stroke: config.colour, transition: 'stroke-dasharray 0.5s ease' }}
          />
        </svg>
        <span className={styles.lgpRingValue}>{gate.overallProgress}%</span>
      </div>

      {/* Requirements checklist */}
      <div className={styles.lgpRequirements}>
        {gate.requirements.map((req, i) => (
          <div key={i} className={`${styles.lgpReq} ${req.passed ? styles.lgpReqPassed : ''}`}>
            <span className={styles.lgpReqCheck}
              style={{ color: req.passed ? '#10b981' : '#d1d5db' }}>
              {req.passed ? '✓' : '○'}
            </span>
            <div className={styles.lgpReqContent}>
              <span className={styles.lgpReqLabel}>{req.label}</span>
              {!req.passed && (
                <span className={styles.lgpReqProgress}>
                  {req.completed}/{req.required}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Next action */}
      {gate.status !== 'passed' && gate.status !== 'passed-with-distinction' && (
        <p className={styles.lgpNextAction}>{gate.nextAction}</p>
      )}
    </div>
  );
};

// ============================================================================
// UTILITY — original, unchanged
// ============================================================================

function formatCategory(cat: EquipmentCategory): string {
  const names: Record<EquipmentCategory, string> = {
    '3d-printing': '3D Printing',
    'electronics': 'Electronics',
    'fabrication': 'Fabrication',
    'testing': 'Testing & Measurement',
    'design': 'Design',
    'safety': 'Safety Equipment'
  };
  return names[cat] || cat;
}

export default PrototypeLab;
