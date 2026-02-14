/**
 * STEMgeneers Prototype Lab
 * Wembley Wonders CIC
 * 
 * Hardware prototyping workspace for the STEMgeneers programme.
 * Tracks physical builds from concept through to patent-ready documentation.
 * Equipment booking, iteration logging, bill of materials, safety notes.
 * 
 * Aesthetic: Industrial control panel - gauges, readouts, status indicators
 */

import React, { useState, useEffect, useCallback } from 'react';
import type {
  Prototype,
  PrototypeStatus,
  Iteration,
  PrototypeAsset,
  Creator
} from '../../prototype-registry/types';
import { prototypeRegistry } from '../../prototype-registry/services/prototypeRegistry';
import styles from './PrototypeLab.module.scss';

// ============================================================================
// TYPES
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
  duration: number; // minutes
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

type LabView = 'workspace' | 'equipment' | 'bom' | 'sessions' | 'safety' | 'patent-prep';

// ============================================================================
// EQUIPMENT CATALOGUE
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
// COMPONENT
// ============================================================================

export const PrototypeLab: React.FC = () => {
  const [activeView, setActiveView] = useState<LabView>('workspace');
  const [prototypes, setPrototypes] = useState<Prototype[]>([]);
  const [selectedPrototype, setSelectedPrototype] = useState<Prototype | null>(null);
  const [equipment, setEquipment] = useState<LabEquipment[]>(EQUIPMENT_CATALOGUE);
  const [bomItems, setBomItems] = useState<BOMItem[]>([]);
  const [sessions, setSessions] = useState<LabSession[]>([]);
  const [safetyChecks, setSafetyChecks] = useState<SafetyCheck[]>([]);
  const [showNewBuild, setShowNewBuild] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrototypes();
  }, []);

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

  // --------------------------------------------------------------------------
  // NEW BUILD
  // --------------------------------------------------------------------------

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

  // --------------------------------------------------------------------------
  // ITERATION LOGGING
  // --------------------------------------------------------------------------

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

      setSelectedPrototype((prev: { iterations: any; }) => prev ? {
        ...prev,
        iterations: [...prev.iterations, iteration],
        currentVersion: iteration.version
      } : null);

      setNewIteration({
        title: '', description: '', changes: [''],
        notes: '', witnessed: false, witnessedBy: ''
      });
    } catch (err) {
      console.error('Failed to log iteration:', err);
    }
  };

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------

  return (
    <div className={styles.lab}>
      {/* Lab Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.labIcon}>
            <span className={styles.gearIcon}>&#9881;</span>
          </div>
          <div className={styles.headerText}>
            <h1 className={styles.title}>STEMgeneers Prototype Lab</h1>
            <p className={styles.subtitle}>Hardware Innovation Workshop</p>
          </div>
        </div>

        <div className={styles.labStatus}>
          <StatusIndicator label="Equipment" count={equipment.filter(e => e.status === 'available').length} total={equipment.length} color="emerald" />
          <StatusIndicator label="Active Builds" count={prototypes.filter(p => p.status === 'development').length} total={prototypes.length} color="amber" />
          <StatusIndicator label="Protected" count={prototypes.filter(p => p.ipStatus !== 'unprotected').length} total={prototypes.length} color="violet" />
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className={styles.tabNav}>
        {([
          { key: 'workspace', label: 'Workspace', icon: '&#9881;' },
          { key: 'equipment', label: 'Equipment', icon: '&#128295;' },
          { key: 'bom', label: 'Bill of Materials', icon: '&#128220;' },
          { key: 'sessions', label: 'Lab Sessions', icon: '&#128467;' },
          { key: 'safety', label: 'Safety', icon: '&#9888;' },
          { key: 'patent-prep', label: 'Patent Prep', icon: '&#128274;' },
        ] as { key: LabView; label: string; icon: string }[]).map(tab => (
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

      {/* Main Content */}
      <main className={styles.mainContent}>
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
          <BOMView
            items={bomItems}
            onUpdate={setBomItems}
            prototype={selectedPrototype}
          />
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
      </main>
    </div>
  );
};

// ============================================================================
// SUB-COMPONENTS
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
        <path
          className={styles.gaugeBg}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none" strokeWidth="3"
        />
        <path
          className={styles.gaugeFill}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none" strokeWidth="3"
          strokeDasharray={`${total > 0 ? (count / total) * 100 : 0}, 100`}
        />
      </svg>
      <span className={styles.gaugeValue}>{count}</span>
    </div>
    <span className={styles.gaugeLabel}>{label}</span>
  </div>
);

// Workspace View
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
    {/* Build List */}
    <aside className={styles.buildList}>
      <div className={styles.buildListHeader}>
        <h2>Active Builds</h2>
        <button className={styles.newBuildButton} onClick={onToggleNewBuild}>
          + New Build
        </button>
      </div>

      {showNewBuild && (
        <div className={styles.newBuildForm}>
          <input
            type="text"
            placeholder="Build name..."
            value={newBuild.title}
            onChange={(e) => onUpdateNewBuild({ ...newBuild, title: e.target.value })}
            className={styles.input}
          />
          <textarea
            placeholder="What are you building?"
            value={newBuild.description}
            onChange={(e) => onUpdateNewBuild({ ...newBuild, description: e.target.value })}
            className={styles.textarea}
            rows={3}
          />
          <textarea
            placeholder="Safety considerations..."
            value={newBuild.safetyConsiderations}
            onChange={(e) => onUpdateNewBuild({ ...newBuild, safetyConsiderations: e.target.value })}
            className={styles.textarea}
            rows={2}
          />
          <div className={styles.formActions}>
            <button className={styles.primaryBtn} onClick={onStartBuild}>Start Build</button>
            <button className={styles.ghostBtn} onClick={onToggleNewBuild}>Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>Loading builds...</div>
      ) : prototypes.length === 0 ? (
        <div className={styles.emptyBuilds}>
          <p>No active builds yet.</p>
          <p>Start your first hardware prototype.</p>
        </div>
      ) : (
        <ul className={styles.builds}>
          {prototypes.map(p => (
            <li
              key={p.id}
              className={`${styles.buildItem} ${selectedPrototype?.id === p.id ? styles.selected : ''}`}
              onClick={() => onSelectPrototype(p)}
            >
              <div className={styles.buildInfo}>
                <span className={styles.buildName}>{p.title}</span>
                <span className={styles.buildVersion}>v{p.currentVersion}</span>
              </div>
              <span className={`${styles.buildStatus} ${styles[p.status]}`}>
                {p.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </aside>

    {/* Build Detail / Iteration Logger */}
    <section className={styles.buildDetail}>
      {selectedPrototype ? (
        <>
          <div className={styles.buildDetailHeader}>
            <h2>{selectedPrototype.title}</h2>
            <span className={styles.versionTag}>v{selectedPrototype.currentVersion}</span>
          </div>

          <p className={styles.buildDescription}>{selectedPrototype.description}</p>

          {/* Iteration Timeline */}
          <div className={styles.iterationTimeline}>
            <h3>Build Log</h3>
            {selectedPrototype.iterations.length === 0 ? (
              <p className={styles.noIterations}>No iterations logged yet. Start documenting your build progress.</p>
            ) : (
              <div className={styles.timeline}>
                {selectedPrototype.iterations.map((iteration: { id: React.Key | null | undefined; witnessed: any; version: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; createdAt: string | number | Date; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; changes: (string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined)[]; witnessedBy: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: any) => (
                  <div key={iteration.id} className={styles.timelineEntry}>
                    <div className={styles.timelineDot}>
                      {iteration.witnessed && <span className={styles.witnessedMark} title="Witnessed">&#10003;</span>}
                    </div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineMeta}>
                        <span className={styles.timelineVersion}>v{iteration.version}</span>
                        <span className={styles.timelineDate}>
                          {new Date(iteration.createdAt).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      <h4>{iteration.title}</h4>
                      <p>{iteration.description}</p>
                      {iteration.changes.length > 0 && (
                        <ul className={styles.changeList}>
                          {iteration.changes.map((change: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, i: React.Key | null | undefined) => (
                            <li key={i}>{change}</li>
                          ))}
                        </ul>
                      )}
                      {iteration.witnessed && (
                        <span className={styles.witnessedLabel}>
                          Witnessed by {iteration.witnessedBy}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* New Iteration Form */}
          <div className={styles.newIterationForm}>
            <h3>Log New Iteration</h3>
            <input
              type="text"
              placeholder="What changed in this iteration?"
              value={newIteration.title}
              onChange={(e) => onUpdateIteration({ ...newIteration, title: e.target.value })}
              className={styles.input}
            />
            <textarea
              placeholder="Detailed description of changes..."
              value={newIteration.description}
              onChange={(e) => onUpdateIteration({ ...newIteration, description: e.target.value })}
              className={styles.textarea}
              rows={3}
            />

            <div className={styles.changesField}>
              <label>Specific Changes</label>
              {newIteration.changes.map((change: string, idx: number) => (
                <div key={idx} className={styles.changeRow}>
                  <input
                    type="text"
                    placeholder={`Change ${idx + 1}...`}
                    value={change}
                    onChange={(e) => {
                      const updated = [...newIteration.changes];
                      updated[idx] = e.target.value;
                      onUpdateIteration({ ...newIteration, changes: updated });
                    }}
                    className={styles.input}
                  />
                  {idx > 0 && (
                    <button
                      className={styles.removeBtn}
                      onClick={() => {
                        const updated = newIteration.changes.filter((_: string, i: number) => i !== idx);
                        onUpdateIteration({ ...newIteration, changes: updated });
                      }}
                    >&#10005;</button>
                  )}
                </div>
              ))}
              <button
                className={styles.addBtn}
                onClick={() => onUpdateIteration({
                  ...newIteration,
                  changes: [...newIteration.changes, '']
                })}
              >+ Add Change</button>
            </div>

            <div className={styles.witnessRow}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={newIteration.witnessed}
                  onChange={(e) => onUpdateIteration({ ...newIteration, witnessed: e.target.checked })}
                />
                <span>This iteration was witnessed</span>
              </label>
              {newIteration.witnessed && (
                <input
                  type="text"
                  placeholder="Witness name..."
                  value={newIteration.witnessedBy}
                  onChange={(e) => onUpdateIteration({ ...newIteration, witnessedBy: e.target.value })}
                  className={styles.witnessInput}
                />
              )}
            </div>

            <div className={styles.iterationTip}>
              <strong>Patent tip:</strong> Witnessed iterations with timestamps create essential evidence for patent applications. 
              Always have a mentor or peer witness significant breakthroughs.
            </div>

            <button className={styles.primaryBtn} onClick={onLogIteration}>
              Log Iteration
            </button>
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

// Equipment View
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
                  <span className={`${styles.eqStatus} ${styles[item.status]}`}>
                    {item.status.replace('-', ' ')}
                  </span>
                </div>
                <div className={styles.eqMeta}>
                  <span className={styles.eqLocation}>{item.location}</span>
                  <span className={`${styles.eqSafety} ${styles[item.safetyLevel]}`}>
                    {item.safetyLevel} safety
                  </span>
                </div>
                {item.requiredTraining.length > 0 && (
                  <div className={styles.eqTraining}>
                    <span className={styles.trainingLabel}>Required:</span>
                    {item.requiredTraining.map((t, i) => (
                      <span key={i} className={styles.trainingTag}>{t}</span>
                    ))}
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

// BOM View
interface BOMViewProps {
  items: BOMItem[];
  onUpdate: (items: BOMItem[]) => void;
  prototype: Prototype | null;
}

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
          <p>No materials listed yet. Add components as you plan your build.</p>
          <button className={styles.primaryBtn} onClick={() => {
            onUpdate([...items, {
              id: `bom-${Date.now()}`,
              name: '', description: '', quantity: 1, unit: 'pcs',
              unitCost: 0, category: 'electronic', acquired: false
            }]);
          }}>Add First Component</button>
        </div>
      ) : (
        <table className={styles.bomTable}>
          <thead>
            <tr>
              <th>Component</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Unit Cost</th>
              <th>Total</th>
              <th>Supplier</th>
              <th>Acquired</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.id} className={item.acquired ? styles.acquired : ''}>
                <td>
                  <input
                    className={styles.tableInput}
                    value={item.name}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx] = { ...item, name: e.target.value };
                      onUpdate(updated);
                    }}
                    placeholder="Component name..."
                  />
                </td>
                <td>
                  <select
                    className={styles.tableSelect}
                    value={item.category}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx] = { ...item, category: e.target.value as BOMItem['category'] };
                      onUpdate(updated);
                    }}
                  >
                    <option value="electronic">Electronic</option>
                    <option value="mechanical">Mechanical</option>
                    <option value="consumable">Consumable</option>
                    <option value="packaging">Packaging</option>
                    <option value="other">Other</option>
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    className={styles.tableInputSmall}
                    value={item.quantity}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx] = { ...item, quantity: parseInt(e.target.value) || 0 };
                      onUpdate(updated);
                    }}
                    min={0}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className={styles.tableInputSmall}
                    value={item.unitCost}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx] = { ...item, unitCost: parseFloat(e.target.value) || 0 };
                      onUpdate(updated);
                    }}
                    min={0}
                    step={0.01}
                  />
                </td>
                <td className={styles.costCell}>
                  £{(item.quantity * item.unitCost).toFixed(2)}
                </td>
                <td>
                  <input
                    className={styles.tableInput}
                    value={item.supplier || ''}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx] = { ...item, supplier: e.target.value };
                      onUpdate(updated);
                    }}
                    placeholder="Supplier..."
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.acquired}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx] = { ...item, acquired: e.target.checked };
                      onUpdate(updated);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className={styles.totalLabel}>Total Cost</td>
              <td className={styles.totalValue}>£{totalCost.toFixed(2)}</td>
              <td colSpan={2}>
                <button className={styles.addBtn} onClick={() => {
                  onUpdate([...items, {
                    id: `bom-${Date.now()}`,
                    name: '', description: '', quantity: 1, unit: 'pcs',
                    unitCost: 0, category: 'electronic', acquired: false
                  }]);
                }}>+ Add Row</button>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

// Sessions View (stub)
const SessionsView: React.FC<{ sessions: LabSession[]; prototype: Prototype | null }> = ({ sessions, prototype }) => (
  <div className={styles.sessionsView}>
    <h2>Lab Sessions</h2>
    <p className={styles.viewDescription}>
      Record workshop sessions with participants, equipment used, and outcomes. 
      Each session contributes to your patent evidence trail.
    </p>
    {sessions.length === 0 && (
      <div className={styles.emptyState}>
        <p>No lab sessions recorded yet.</p>
        <button className={styles.primaryBtn}>Record Session</button>
      </div>
    )}
  </div>
);

// Safety View (stub)
const SafetyView: React.FC<{ checks: SafetyCheck[]; onUpdate: (c: SafetyCheck[]) => void }> = ({ checks }) => (
  <div className={styles.safetyView}>
    <h2>Safety Checklist</h2>
    <div className={styles.safetyWarning}>
      <span className={styles.warningIcon}>&#9888;</span>
      <p>All safety protocols must be completed before starting any build session. 
      This protects participants and satisfies CIC insurance requirements.</p>
    </div>
    <div className={styles.safetyCategories}>
      {['general', 'electrical', 'mechanical', 'chemical', 'thermal'].map(cat => (
        <div key={cat} className={styles.safetyCategory}>
          <h3>{cat.charAt(0).toUpperCase() + cat.slice(1)} Safety</h3>
          <div className={styles.checklistPlaceholder}>
            Safety checks for {cat} hazards will be loaded from your programme configuration.
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Patent Prep View (stub)
const PatentPrepView: React.FC<{ prototype: Prototype | null }> = ({ prototype }) => (
  <div className={styles.patentPrepView}>
    <h2>Patent Preparation</h2>
    {prototype ? (
      <div className={styles.patentChecklist}>
        <h3>{prototype.title} — IP Readiness</h3>
        <div className={styles.readinessGrid}>
          <ReadinessItem
            label="Development Log"
            description="Timestamped iteration history with witnessed entries"
            complete={prototype.iterations.length >= 3}
            detail={`${prototype.iterations.length} iterations logged`}
          />
          <ReadinessItem
            label="Creator Attribution"
            description="All contributors documented with contribution percentages"
            complete={prototype.creators.length > 0}
            detail={`${prototype.creators.length} creators registered`}
          />
          <ReadinessItem
            label="Technical Documentation"
            description="Schematics, code, assembly instructions"
            complete={prototype.documentation.length > 0}
            detail={`${prototype.documentation.length} documents`}
          />
          <ReadinessItem
            label="Bill of Materials"
            description="Complete parts list with specifications"
            complete={false}
            detail="Not yet completed"
          />
          <ReadinessItem
            label="Prior Art Search"
            description="Documented search of existing patents and products"
            complete={false}
            detail="Not yet conducted"
          />
          <ReadinessItem
            label="Invention Disclosure"
            description="Formal disclosure form submitted for review"
            complete={prototype.disclosures.length > 0}
            detail={prototype.disclosures.length > 0 ? 'Disclosure filed' : 'Not yet filed'}
          />
        </div>
        <div className={styles.patentActions}>
          <button className={styles.primaryBtn}>
            Start Invention Disclosure
          </button>
          <button className={styles.secondaryBtn}>
            Run Prior Art Search
          </button>
        </div>
      </div>
    ) : (
      <div className={styles.emptyState}>
        <p>Select a build from the workspace to assess patent readiness.</p>
      </div>
    )}
  </div>
);

interface ReadinessItemProps {
  label: string;
  description: string;
  complete: boolean;
  detail: string;
}

const ReadinessItem: React.FC<ReadinessItemProps> = ({ label, description, complete, detail }) => (
  <div className={`${styles.readinessItem} ${complete ? styles.ready : styles.pending}`}>
    <div className={styles.readinessCheck}>
      {complete ? '&#10003;' : '&#9675;'}
    </div>
    <div className={styles.readinessContent}>
      <h4>{label}</h4>
      <p>{description}</p>
      <span className={styles.readinessDetail}>{detail}</span>
    </div>
  </div>
);

// ============================================================================
// UTILITY
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