/**
 * Silk Stilettos Design Studio
 * Wembley Wonders CIC
 * 
 * Fashion-tech prototyping workspace combining traditional craft
 * with wearable technology. Tracks designs from sketch through
 * to IP-protected marketplace products.
 * 
 * Aesthetic: Atelier meets tech lab — haute couture grid,
 * fabric textures, precision measurements, LED accent lighting
 */

import React, { useState, useEffect } from 'react';
import type {
  Prototype,
  PrototypeCategory,
  IPStatus,
  Creator,
  Iteration
} from '../../prototype-registry/types';
import { prototypeRegistry } from '../../prototype-registry/services/prototypeRegistry';
import styles from './DesignStudio.module.scss';

// ============================================================================
// TYPES
// ============================================================================

interface DesignProject extends Prototype {
  designDetails?: DesignDetails;
}

interface DesignDetails {
  designType: DesignType;
  materials: MaterialSpec[];
  techComponents: TechComponent[];
  sizes: string[];
  colorPalette: ColorSpec[];
  patternFiles: PatternFile[];
  targetAudience: string;
  seasonCollection: string;
  sustainabilityNotes: string;
}

type DesignType =
  | 'wearable-tech'
  | 'smart-accessory'
  | 'adaptive-clothing'
  | 'beauty-tech'
  | 'smart-jewellery'
  | 'e-textile'
  | 'fashion-hardware';

interface MaterialSpec {
  id: string;
  name: string;
  type: 'fabric' | 'hardware' | 'electronic' | 'trimming' | 'packaging';
  supplier?: string;
  costPerUnit: number;
  unit: string;
  quantity: number;
  sustainable: boolean;
  notes?: string;
}

interface TechComponent {
  id: string;
  name: string;
  type: 'sensor' | 'led' | 'microcontroller' | 'battery' | 'bluetooth' | 'haptic' | 'other';
  specification: string;
  integrated: boolean;
  washable: boolean;
  notes?: string;
}

interface ColorSpec {
  name: string;
  hex: string;
  pantone?: string;
  usage: string;
}

interface PatternFile {
  id: string;
  name: string;
  version: string;
  format: 'pdf' | 'svg' | 'dxf' | 'ai';
  sizes: string[];
  uploadedAt: Date;
}

type StudioView = 'projects' | 'design-board' | 'tech-lab' | 'materials' | 'patterns' | 'ip-portfolio';

// ============================================================================
// DESIGN TYPE CONFIG
// ============================================================================

const DESIGN_TYPES: { value: DesignType; label: string; description: string; icon: string }[] = [
  { value: 'wearable-tech', label: 'Wearable Tech', description: 'Clothing with embedded technology', icon: '&#128085;' },
  { value: 'smart-accessory', label: 'Smart Accessory', description: 'Tech-enhanced bags, belts, shoes', icon: '&#128092;' },
  { value: 'adaptive-clothing', label: 'Adaptive Clothing', description: 'Inclusive fashion with tech assists', icon: '&#9855;' },
  { value: 'beauty-tech', label: 'Beauty Tech', description: 'Smart beauty and skincare devices', icon: '&#128132;' },
  { value: 'smart-jewellery', label: 'Smart Jewellery', description: 'Connected jewellery and accessories', icon: '&#128142;' },
  { value: 'e-textile', label: 'E-Textile', description: 'Electronic textiles and fabrics', icon: '&#129525;' },
  { value: 'fashion-hardware', label: 'Fashion Hardware', description: 'Decorative tech hardware', icon: '&#128736;' },
];

// ============================================================================
// COMPONENT
// ============================================================================

export const DesignStudio: React.FC = () => {
  const [activeView, setActiveView] = useState<StudioView>('projects');
  const [projects, setProjects] = useState<Prototype[]>([]);
  const [selectedProject, setSelectedProject] = useState<Prototype | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNewProject, setShowNewProject] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const result = await prototypeRegistry.searchPrototypes({
        programme: ['silk-stilettos'],
        category: ['fashion-tech', 'hybrid']
      });
      setProjects(result.prototypes);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // New project form
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    designType: 'wearable-tech' as DesignType,
    targetAudience: '',
    inspiration: ''
  });

  const createProject = async () => {
    if (!newProject.title.trim()) return;
    try {
      const prototype = await prototypeRegistry.createPrototype({
        title: newProject.title,
        description: newProject.description,
        category: 'fashion-tech',
        programme: 'silk-stilettos',
        tags: ['fashion-tech', newProject.designType, 'silk-stilettos']
      });
      setProjects(prev => [prototype, ...prev]);
      setSelectedProject(prototype);
      setShowNewProject(false);
      setNewProject({ title: '', description: '', designType: 'wearable-tech', targetAudience: '', inspiration: '' });
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  return (
    <div className={styles.studio}>
      {/* Studio Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.brandBlock}>
            <div className={styles.logoMark}>SS</div>
            <div>
              <h1 className={styles.title}>Silk Stilettos Design Studio</h1>
              <p className={styles.subtitle}>Fashion-Tech Innovation Lab</p>
            </div>
          </div>

          <div className={styles.studioMetrics}>
            <MetricPill label="Projects" value={projects.length} />
            <MetricPill label="In Development" value={projects.filter(p => ['design', 'development'].includes(p.status)).length} color="coral" />
            <MetricPill label="IP Protected" value={projects.filter(p => p.ipStatus !== 'unprotected').length} color="gold" />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className={styles.studioNav}>
        {([
          { key: 'projects', label: 'Projects' },
          { key: 'design-board', label: 'Design Board' },
          { key: 'tech-lab', label: 'Tech Lab' },
          { key: 'materials', label: 'Materials' },
          { key: 'patterns', label: 'Patterns' },
          { key: 'ip-portfolio', label: 'IP Portfolio' },
        ] as { key: StudioView; label: string }[]).map(tab => (
          <button
            key={tab.key}
            className={`${styles.navTab} ${activeView === tab.key ? styles.active : ''}`}
            onClick={() => setActiveView(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {activeView === 'projects' && (
          <ProjectsView
            projects={projects}
            selectedProject={selectedProject}
            onSelect={setSelectedProject}
            showNew={showNewProject}
            onToggleNew={() => setShowNewProject(!showNewProject)}
            newProject={newProject}
            onUpdateNew={setNewProject}
            onCreate={createProject}
            loading={loading}
          />
        )}

        {activeView === 'design-board' && (
          <DesignBoardView project={selectedProject} />
        )}

        {activeView === 'tech-lab' && (
          <TechLabView project={selectedProject} />
        )}

        {activeView === 'materials' && (
          <MaterialsView project={selectedProject} />
        )}

        {activeView === 'patterns' && (
          <PatternsView project={selectedProject} />
        )}

        {activeView === 'ip-portfolio' && (
          <IPPortfolioView projects={projects} />
        )}
      </main>
    </div>
  );
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface MetricPillProps {
  label: string;
  value: number;
  color?: 'coral' | 'gold' | 'sage';
}

const MetricPill: React.FC<MetricPillProps> = ({ label, value, color }) => (
  <div className={`${styles.metricPill} ${color ? styles[color] : ''}`}>
    <span className={styles.metricValue}>{value}</span>
    <span className={styles.metricLabel}>{label}</span>
  </div>
);

// Projects View
interface ProjectsViewProps {
  projects: Prototype[];
  selectedProject: Prototype | null;
  onSelect: (p: Prototype) => void;
  showNew: boolean;
  onToggleNew: () => void;
  newProject: any;
  onUpdateNew: (p: any) => void;
  onCreate: () => void;
  loading: boolean;
}

const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects, selectedProject, onSelect,
  showNew, onToggleNew, newProject, onUpdateNew, onCreate, loading
}) => (
  <div className={styles.projectsView}>
    <div className={styles.projectsHeader}>
      <h2>Design Projects</h2>
      <button className={styles.newProjectBtn} onClick={onToggleNew}>
        + New Design
      </button>
    </div>

    {showNew && (
      <div className={styles.newProjectForm}>
        <div className={styles.formRow}>
          <div className={styles.formField}>
            <label>Project Name</label>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => onUpdateNew({ ...newProject, title: e.target.value })}
              placeholder="e.g., Smart Evening Clutch"
              className={styles.input}
            />
          </div>
          <div className={styles.formField}>
            <label>Design Type</label>
            <select
              value={newProject.designType}
              onChange={(e) => onUpdateNew({ ...newProject, designType: e.target.value })}
              className={styles.select}
            >
              {DESIGN_TYPES.map(dt => (
                <option key={dt.value} value={dt.value}>{dt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formField}>
          <label>Description</label>
          <textarea
            value={newProject.description}
            onChange={(e) => onUpdateNew({ ...newProject, description: e.target.value })}
            placeholder="Describe your fashion-tech concept..."
            className={styles.textarea}
            rows={3}
          />
        </div>

        <div className={styles.formField}>
          <label>Target Audience</label>
          <input
            type="text"
            value={newProject.targetAudience}
            onChange={(e) => onUpdateNew({ ...newProject, targetAudience: e.target.value })}
            placeholder="Who is this for?"
            className={styles.input}
          />
        </div>

        <div className={styles.formActions}>
          <button className={styles.createBtn} onClick={onCreate}>Create Project</button>
          <button className={styles.cancelBtn} onClick={onToggleNew}>Cancel</button>
        </div>
      </div>
    )}

    {loading ? (
      <div className={styles.loadingState}>Loading projects...</div>
    ) : (
      <div className={styles.projectGrid}>
        {projects.map(project => (
          <article
            key={project.id}
            className={`${styles.projectCard} ${selectedProject?.id === project.id ? styles.selected : ''}`}
            onClick={() => onSelect(project)}
          >
            <div className={styles.cardColorBar} />
            <div className={styles.cardContent}>
              <div className={styles.cardTop}>
                <span className={styles.cardCategory}>{project.category}</span>
                <IPBadge status={project.ipStatus} />
              </div>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDesc}>{project.description}</p>
              <div className={styles.cardBottom}>
                <span className={styles.cardVersion}>v{project.currentVersion}</span>
                <span className={`${styles.cardStatus} ${styles[project.status]}`}>
                  {project.status}
                </span>
              </div>
            </div>
          </article>
        ))}

        {projects.length === 0 && !showNew && (
          <div className={styles.emptyProjects}>
            <div className={styles.emptyIcon}>&#128085;</div>
            <h3>No designs yet</h3>
            <p>Start your first fashion-tech prototype</p>
            <button className={styles.createBtn} onClick={onToggleNew}>
              Create First Design
            </button>
          </div>
        )}
      </div>
    )}
  </div>
);

// IP Badge
const IPBadge: React.FC<{ status: IPStatus }> = ({ status }) => {
  const labels: Record<IPStatus, string> = {
    'unprotected': 'Unprotected',
    'disclosure-filed': 'Disclosed',
    'under-review': 'Under Review',
    'patent-pending': 'Patent Pending',
    'patent-granted': 'Patented',
    'design-registered': 'Design Reg.',
    'trademarked': 'Trademarked',
    'copyrighted': 'Copyright',
    'open-source': 'Open Source',
    'creative-commons': 'CC License'
  };

  return (
    <span className={`${styles.ipBadge} ${styles[status.replace(/-/g, '')]}`}>
      {labels[status]}
    </span>
  );
};

// Design Board View
const DesignBoardView: React.FC<{ project: Prototype | null }> = ({ project }) => (
  <div className={styles.designBoard}>
    <h2>Design Board</h2>
    {project ? (
      <div className={styles.boardLayout}>
        <div className={styles.boardColumn}>
          <h3>Mood Board</h3>
          <div className={styles.moodGrid}>
            <div className={styles.moodSlot}>
              <span className={styles.uploadPlaceholder}>+ Add inspiration</span>
            </div>
            <div className={styles.moodSlot}>
              <span className={styles.uploadPlaceholder}>+ Add reference</span>
            </div>
            <div className={styles.moodSlot}>
              <span className={styles.uploadPlaceholder}>+ Add texture</span>
            </div>
            <div className={styles.moodSlot}>
              <span className={styles.uploadPlaceholder}>+ Add colour</span>
            </div>
          </div>
        </div>

        <div className={styles.boardColumn}>
          <h3>Design Iterations</h3>
          {project.iterations.length === 0 ? (
            <p className={styles.placeholder}>
              Upload sketches, technical drawings, and photos of each design iteration.
              Timestamped iterations build your IP evidence trail.
            </p>
          ) : (
            <div className={styles.iterationGallery}>
              {project.iterations.map((iter: { id: React.Key | null | undefined; version: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; createdAt: string | number | Date; }) => (
                <div key={iter.id} className={styles.iterationCard}>
                  <span className={styles.iterVersion}>v{iter.version}</span>
                  <h4>{iter.title}</h4>
                  <p>{iter.description}</p>
                  <span className={styles.iterDate}>
                    {new Date(iter.createdAt).toLocaleDateString('en-GB')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.boardColumn}>
          <h3>Colour Palette</h3>
          <div className={styles.colourPalette}>
            <div className={styles.colourSwatch} style={{ background: '#2D1B33' }}>
              <span>Deep Plum</span>
            </div>
            <div className={styles.colourSwatch} style={{ background: '#D4956A' }}>
              <span>Copper Silk</span>
            </div>
            <div className={styles.colourSwatch} style={{ background: '#E8E6E1' }}>
              <span>Pearl</span>
            </div>
            <div className={styles.colourSwatch} style={{ background: '#1A1D21' }}>
              <span>Obsidian</span>
            </div>
          </div>
          <button className={styles.addSwatchBtn}>+ Add Colour</button>
        </div>
      </div>
    ) : (
      <div className={styles.noProjectSelected}>
        <p>Select a project to view its design board</p>
      </div>
    )}
  </div>
);

// Tech Lab View
const TechLabView: React.FC<{ project: Prototype | null }> = ({ project }) => (
  <div className={styles.techLab}>
    <h2>Tech Lab</h2>
    <p className={styles.viewDesc}>
      Configure electronic components for your fashion-tech prototype.
      Document washability, power requirements, and integration points.
    </p>

    {project ? (
      <div className={styles.techGrid}>
        <div className={styles.techCategory}>
          <h3>Sensors</h3>
          <div className={styles.componentSlot}>
            <span>Temperature, motion, light, pressure</span>
            <button className={styles.addComponentBtn}>+ Add Sensor</button>
          </div>
        </div>
        <div className={styles.techCategory}>
          <h3>Output</h3>
          <div className={styles.componentSlot}>
            <span>LEDs, haptic motors, speakers</span>
            <button className={styles.addComponentBtn}>+ Add Output</button>
          </div>
        </div>
        <div className={styles.techCategory}>
          <h3>Processing</h3>
          <div className={styles.componentSlot}>
            <span>Arduino, ESP32, custom PCB</span>
            <button className={styles.addComponentBtn}>+ Add Controller</button>
          </div>
        </div>
        <div className={styles.techCategory}>
          <h3>Power</h3>
          <div className={styles.componentSlot}>
            <span>LiPo batteries, solar, kinetic</span>
            <button className={styles.addComponentBtn}>+ Add Power Source</button>
          </div>
        </div>
        <div className={styles.techCategory}>
          <h3>Connectivity</h3>
          <div className={styles.componentSlot}>
            <span>Bluetooth, WiFi, NFC</span>
            <button className={styles.addComponentBtn}>+ Add Connection</button>
          </div>
        </div>

        <div className={styles.washabilityNote}>
          <strong>Washability Assessment:</strong> All electronic components must be rated 
          for care instructions. Document IP67 ratings, removable modules, 
          or sealed enclosures.
        </div>
      </div>
    ) : (
      <div className={styles.noProjectSelected}>
        <p>Select a project to configure tech components</p>
      </div>
    )}
  </div>
);

// Materials View
const MaterialsView: React.FC<{ project: Prototype | null }> = ({ project }) => (
  <div className={styles.materialsView}>
    <h2>Materials Library</h2>
    <p className={styles.viewDesc}>
      Track fabrics, hardware, and electronic components.
      Sustainability scoring helps meet CIC community benefit requirements.
    </p>

    <div className={styles.materialCategories}>
      {['Fabrics & Textiles', 'Hardware & Trims', 'Electronics', 'Packaging'].map(cat => (
        <div key={cat} className={styles.materialCategory}>
          <h3>{cat}</h3>
          <div className={styles.materialPlaceholder}>
            <p>Add {cat.toLowerCase()} to your project materials library</p>
            <button className={styles.addMaterialBtn}>+ Add Material</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Patterns View
const PatternsView: React.FC<{ project: Prototype | null }> = ({ project }) => (
  <div className={styles.patternsView}>
    <h2>Pattern Registry</h2>
    <p className={styles.viewDesc}>
      Upload and version-control your pattern files. Each version is timestamped 
      for design patent evidence. Supports PDF, SVG, DXF, and AI formats.
    </p>

    {project ? (
      <div className={styles.patternUpload}>
        <div className={styles.dropZone}>
          <span className={styles.dropIcon}>&#128196;</span>
          <p>Drop pattern files here or click to upload</p>
          <span className={styles.dropFormats}>PDF, SVG, DXF, AI — Max 50MB per file</span>
        </div>

        <div className={styles.ipNote}>
          <strong>Design Patent Tip:</strong> Fashion designs can be protected through 
          registered designs (UK) covering the visual appearance of your product.
          Upload clear technical drawings showing all angles for the strongest protection.
        </div>
      </div>
    ) : (
      <div className={styles.noProjectSelected}>
        <p>Select a project to manage its pattern files</p>
      </div>
    )}
  </div>
);

// IP Portfolio View
const IPPortfolioView: React.FC<{ projects: Prototype[] }> = ({ projects }) => {
  const protected_ = projects.filter(p => p.ipStatus !== 'unprotected');
  const pending = projects.filter(p => ['disclosure-filed', 'under-review', 'patent-pending'].includes(p.ipStatus));
  
  return (
    <div className={styles.ipPortfolio}>
      <h2>IP Portfolio</h2>
      <p className={styles.viewDesc}>
        Track intellectual property status across all your fashion-tech designs.
        Fashion IP can include utility patents (functional innovations), 
        design patents (visual appearance), and trademarks (brand elements).
      </p>

      <div className={styles.portfolioStats}>
        <div className={styles.portfolioStat}>
          <span className={styles.statNumber}>{projects.length}</span>
          <span className={styles.statDesc}>Total Designs</span>
        </div>
        <div className={styles.portfolioStat}>
          <span className={styles.statNumber}>{protected_.length}</span>
          <span className={styles.statDesc}>IP Protected</span>
        </div>
        <div className={styles.portfolioStat}>
          <span className={styles.statNumber}>{pending.length}</span>
          <span className={styles.statDesc}>Pending</span>
        </div>
      </div>

      <div className={styles.portfolioList}>
        {projects.map(project => (
          <div key={project.id} className={styles.portfolioItem}>
            <div className={styles.portfolioInfo}>
              <h3>{project.title}</h3>
              <span className={styles.portfolioCategory}>{project.category}</span>
            </div>
            <IPBadge status={project.ipStatus} />
            <div className={styles.portfolioActions}>
              {project.ipStatus === 'unprotected' && (
                <button className={styles.fileDisclosureBtn}>File Disclosure</button>
              )}
              {project.ipStatus === 'disclosure-filed' && (
                <button className={styles.viewDisclosureBtn}>View Disclosure</button>
              )}
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className={styles.emptyPortfolio}>
            <p>No designs in portfolio yet. Create your first fashion-tech project to begin building IP.</p>
          </div>
        )}
      </div>

      <div className={styles.ipGuidance}>
        <h3>Fashion-Tech IP Protection Options</h3>
        <div className={styles.ipOptions}>
          <div className={styles.ipOption}>
            <h4>Registered Design</h4>
            <p>Protects the visual appearance — shape, pattern, colour, texture. 
            Ideal for fashion items. UK registration from £50.</p>
          </div>
          <div className={styles.ipOption}>
            <h4>Utility Patent</h4>
            <p>Protects functional innovation — how the tech works within the garment. 
            Ideal for novel sensor integration or power systems.</p>
          </div>
          <div className={styles.ipOption}>
            <h4>Design + Utility Combination</h4>
            <p>The strongest protection for fashion-tech. Covers both how it looks 
            and how it works. Your wearable tech innovations may qualify for both.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStudio;