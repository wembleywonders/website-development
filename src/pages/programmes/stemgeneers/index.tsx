import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import DraggableMaya from '../../../components/maya/DraggableMaya';
import PageMeta from '@/components/PageMeta';
import PathfinderROV from '@/systems/rovs/personalities/pathfinder/PathfinderROV';
import {
  useJournalStore,
} from '@/stores/journalStore';
import { useSTEMSageTracking } from '@/systems/rovs/personalities/pathfinder/STEMSageWithTracking';
import {
  Wrench, Cpu, Lightbulb, Users, CheckCircle, ArrowRight,
  PoundSterling, HandHeart, Coins, Settings, Zap, Hammer,
  Scissors, Home, Watch, Bike, Package, FlaskConical,
  ShieldCheck, TrendingUp, AlertCircle, ChevronRight,
} from 'lucide-react';
import '../ProgrammePage.css';
import './STEMgeneersPage.css';

/**
 * STEMgeneers — The Person Your Community Calls
 * ==============================================
 *
 * Named for Bruk-up. Nine years old. Box of spare parts under the bed.
 * Asks for a screwdriver set every birthday. Takes everything apart
 * to understand it. Fixes what nobody else can fix.
 *
 * By seventeen she runs Scrap Cat.
 * By twenty-two she's the STEMgeneer your uncle calls.
 *
 * UPDATE: Verification system wired in.
 * - Live gate progress pulled from journalStore
 * - Neville (PathfinderROV) panel for technical guidance + verification
 * - PrototypeLab and Sandbox CTAs are verification-aware
 * - Pending verification prompt surfaced at page level
 * - useSTEMgeneersStats drives live stats strip
 *
 * All original content preserved exactly.
 */

// ============================================================================
// TYPES
// ============================================================================

type RepairLayer =
  | 'precision'
  | 'appliance'
  | 'home'
  | 'furniture'
  | 'making'
  | 'trades';

// ============================================================================
// STATIC CONTENT — preserved exactly from February 2026 rebuild
// ============================================================================

const heritageRoots = [
  {
    name: "The Yard Mechanic",
    icon: "🔧",
    description: "Every Caribbean community had one. The person who could fix anything — cars, engines, appliances, whatever needed doing. They earned through usefulness, not credentials. Gender was irrelevant. Competence was everything.",
    lesson: "Technical skill plus community trust equals sustainable income. Always has."
  },
  {
    name: "Sound System Engineering",
    icon: "🔊",
    description: "Jah Shaka, Coxsone, King Tubby built their own infrastructure from scratch. Amplifiers, speaker boxes, crossovers, mixing desks. Women ran sound systems too. The skill was the ticket, not the gender.",
    lesson: "You don't need permission to engineer. Build what the community needs."
  },
  {
    name: "The Woman Who Kept Things Running",
    icon: "⚡",
    description: "She maintained the sewing machine for thirty years and knew every part of it. She plastered and tiled because the landlord wouldn't. She wired the extension because she'd watched her father do it and understood the principle. She existed in every family. She was never called an engineer.",
    lesson: "The knowledge was always there. We just stopped naming it correctly."
  },
  {
    name: "Pre-Digital Competence",
    icon: "🛠️",
    description: "Soldering, wiring, mechanical repair, material understanding — these haven't become obsolete because a new app launched. The physics of a broken motor is the same physics it always was. Elder analogue knowledge is not outdated. It's foundational.",
    lesson: "Heritage technical knowledge doesn't expire. It compounds."
  }
];

const problemLayers = [
  {
    name: "The Precision Layer",
    layer: 'precision' as RepairLayer,
    icon: Watch,
    color: "#60a5fa",
    description: "Watches, phones, locks, small mechanisms. What most people consider beyond their capability. It isn't.",
    examples: [
      { problem: "Watch battery replacement", cost: "£10-15 jeweller fee", fix: "£1 battery + 3 minutes" },
      { problem: "Phone screen replacement", cost: "£80-120 repair shop", fix: "£20 part + knowledge" },
      { problem: "Lock mechanism service", cost: "£60-80 locksmith", fix: "Graphite + adjustment" },
      { problem: "Headphone jack fault", cost: "New headphones £40+", fix: "Solder joint + 20 minutes" },
    ],
    why: "Precision repair is mystified to justify margins. The tools cost less than one repair. The knowledge stays with you."
  },
  {
    name: "The Appliance Layer",
    layer: 'appliance' as RepairLayer,
    icon: Settings,
    color: "#10b981",
    description: "Washing machines, sewing machines, vacuum cleaners, kitchen equipment. What breaks, why it breaks, what the repair actually involves. When 3D modelling a spare part is viable. When it isn't.",
    examples: [
      { problem: "Washing machine drum bearing", cost: "£80 callout + £120 parts", fix: "£12 bearing + knowledge" },
      { problem: "Sewing machine timing", cost: "£60-80 service", fix: "Adjustment + 45 minutes" },
      { problem: "Out-of-warranty spare part", cost: "Machine written off", fix: "3D model + print + fit" },
      { problem: "Vacuum motor", cost: "New machine £80-150", fix: "Carbon brushes £4" },
    ],
    why: "The appliance repair economy is built on making obsolescence profitable. A STEMgeneer breaks that calculation."
  },
  {
    name: "The Home Layer",
    layer: 'home' as RepairLayer,
    icon: Home,
    color: "#8b5cf6",
    description: "Painting, decorating, plastering, tiling, basic plumbing, basic electrical. Skills that mean a landlord can't intimidate you.",
    examples: [
      { problem: "Leaking tap washer", cost: "£60-80 plumber callout", fix: "£2 washer + 20 minutes" },
      { problem: "Bathroom retiling", cost: "£300-600 trades", fix: "Materials + weekend" },
      { problem: "Plastering a wall", cost: "£150-250 per room", fix: "Materials + practice" },
      { problem: "Replacing a socket", cost: "£80 electrician callout", fix: "Permitted work + knowledge" },
    ],
    why: "Every household skill you acquire is leverage in your relationship with your landlord, your building, your own property."
  },
  {
    name: "The Furniture Layer",
    layer: 'furniture' as RepairLayer,
    icon: Hammer,
    color: "#f59e0b",
    description: "Joinery, upholstery, wooden furniture repair. The thing thrown away because one leg broke or the fabric tore.",
    examples: [
      { problem: "Chair joint failure", cost: "New chair £80-200", fix: "Wood glue + clamp + £0" },
      { problem: "Sofa reupholstery", cost: "£300-600 professional", fix: "Fabric + staple gun + weekend" },
      { problem: "Wardrobe flat pack failure", cost: "New wardrobe or waste", fix: "Dowel + understanding" },
      { problem: "Table surface damage", cost: "New table or refinisher", fix: "Wax/oil + 2 hours" },
    ],
    why: "Furniture is designed to be repaired. The obsolescence is assumed. The skill makes it optional."
  },
  {
    name: "The Making Layer",
    layer: 'making' as RepairLayer,
    icon: Package,
    color: "#ec4899",
    description: "3D printing, fabrication, custom parts. When the part doesn't exist, you make it.",
    examples: [
      { problem: "Discontinued spare part", cost: "Machine written off", fix: "CAD model + £0.50 filament" },
      { problem: "Custom bracket or fitting", cost: "Bespoke engineering quote £100+", fix: "Design + print" },
      { problem: "Broken plastic housing", cost: "New device", fix: "Repair + print replacement" },
      { problem: "Tool adaptor", cost: "£30-50 specialist", fix: "Print overnight" },
    ],
    why: "A 3D printer and the knowledge to use it turns the inability to source a part from a dead end into a starting point."
  },
  {
    name: "The Trades Layer",
    layer: 'trades' as RepairLayer,
    icon: Zap,
    color: "#f97316",
    description: "Electrical, plumbing, HVAC — the regulated trades. Not replacing the tradespeople, but understanding enough to know when you need one and what they're doing.",
    examples: [
      { problem: "Tripped circuit breaker", cost: "£80 electrician callout", fix: "Reset + understand why" },
      { problem: "Radiator bleeding", cost: "£60-80 plumber", fix: "Radiator key + 5 minutes" },
      { problem: "Boiler pilot light", cost: "£80 callout", fix: "Manual + pilot button" },
      { problem: "Unknown fault diagnosis", cost: "£80 just to be told", fix: "Diagnosis first, decision yours" },
    ],
    why: "You don't need to do every trades job yourself. You need to understand enough to make an informed decision. That understanding is never wasted."
  },
];

const communityRole = [
  {
    scenario: "Your uncle's 20-year-old washing machine",
    current: "Written off. Insurance claim. Callout fee plus parts quote exceeds machine value. New machine on credit.",
    stemgeneer: "Bearing diagnosed. Part 3D-printed or sourced. Machine running for another five years. £400 stays in the household.",
    value: "£400 in household + functional machine",
  },
  {
    scenario: "The community centre's broken PA system",
    current: "Hired engineer at £150/day. Event delayed. Budget spent on repair instead of programme.",
    stemgeneer: "Fault traced to blown fuse and bad solder joint. Fixed before the event. Centre saves the budget.",
    value: "£150 saved + event runs",
  },
  {
    scenario: "Single parent's laptop for job applications",
    current: "£100 repair quote. Can't afford it. Library trips for applications. Economic disadvantage compounds.",
    stemgeneer: "Thermal paste dried out. Replaced. Laptop functional. Applications submitted from home.",
    value: "Digital access restored",
  },
];

const scrapCatConnection = {
  title: "Scrap Cat: Where Material Comes In",
  description: "Scrap Cat is the intake system — broken devices, salvaged parts, discarded materials. STEMgeneers assess what's fixable, what yields usable components, what can be 3D-modelled. The loop runs both ways.",
  loop: [
    "Scrap Cat intake: broken devices and salvaged materials arrive",
    "STEMgeneers assess: fixable whole, fixable for parts, material for making",
    "Repair work runs: some items restored to full use",
    "Parts salvaged: components enter the collective inventory",
    "Making layer: unfixable items become material for fabrication projects",
    "Income generated: repaired items sold, services charged, savings documented",
  ],
};

const collectiveEquipment = [
  { name: "Oscilloscope", cost: "£200-400", purpose: "Circuit diagnosis" },
  { name: "3D Printer (FDM)", cost: "£250-400", purpose: "Spare part fabrication" },
  { name: "Soldering station", cost: "£80-120", purpose: "Board-level repair" },
  { name: "Multimeter set", cost: "£40-80", purpose: "Electrical fault finding" },
  { name: "Tile cutter", cost: "£120-200", purpose: "Home layer work" },
  { name: "Upholstery tools", cost: "£60-100", purpose: "Furniture layer work" },
];

// ============================================================================
// LAYER GATE MINI-DISPLAY
// Shows live progress for a single repair layer gate.
// ============================================================================

interface LayerGateMiniProps {
  layer: RepairLayer;
  label: string;
  color: string;
}

const LayerGateMini: React.FC<LayerGateMiniProps> = ({ layer, label, color }) => {
  const gate = useJournalStore(s => s.skillGates[layer]);

  if (!gate) {
    return (
      <div className="layer-gate-mini layer-gate-mini--locked">
        <span className="lgm-label">{label}</span>
        <span className="lgm-status">Not started</span>
      </div>
    );
  }

  const pct = Math.round(gate.overallProgress);
  const statusLabel =
    gate.status === 'passed-with-distinction' ? '★ Distinction' :
    gate.status === 'passed'                  ? '✓ Passed' :
    gate.status === 'in-progress'             ? `${pct}%` :
    'Locked';

  const statusClass =
    gate.status === 'passed-with-distinction' ? 'layer-gate-mini--distinction' :
    gate.status === 'passed'                  ? 'layer-gate-mini--passed' :
    gate.status === 'in-progress'             ? 'layer-gate-mini--progress' :
    'layer-gate-mini--locked';

  return (
    <div className={`layer-gate-mini ${statusClass}`} style={{ '--layer-color': color } as React.CSSProperties}>
      <span className="lgm-label">{label}</span>
      {gate.status === 'in-progress' && (
        <div className="lgm-bar">
          <div className="lgm-fill" style={{ width: `${pct}%`, background: color }} />
        </div>
      )}
      <span className="lgm-status" style={gate.status === 'in-progress' ? { color } : {}}>
        {statusLabel}
      </span>
    </div>
  );
};

// ============================================================================
// PENDING VERIFICATION BANNER
// Surfaces at page level so it's visible without navigating to Creator's Journal.
// ============================================================================

const PendingVerificationBanner: React.FC = () => {
  const sessionId = useJournalStore(s => s.pendingSessionId ?? null);

  if (!sessionId) return null;

  return (
    <div className="pending-verification-banner">
      <AlertCircle size={18} className="pv-icon" />
      <div className="pv-text">
        <strong>Neville has a follow-up question</strong> — your repair is logged, but the
        verification conversation is waiting. This is what turns a job into a credential.
      </div>
      <Link to="/workspace/creators-journal" className="pv-link">
        Answer now →
      </Link>
    </div>
  );
};

// ============================================================================
// MAIN PAGE
// ============================================================================

const STEMgeneersPage: React.FC = () => {
  const [showNeville, setShowNeville] = useState(false);
  const pendingSessionId = useJournalStore(s => s.pendingSessionId ?? null);

  // Live stats — select primitives individually to avoid infinite loop
  const totalRepairs           = useJournalStore(s => s.stemStats?.totalRepairs           ?? 0);
  const totalDiagnosticSessions= useJournalStore(s => s.stemStats?.totalDiagnosticSessions ?? 0);
  const witnessedRepairs       = useJournalStore(s => s.stemStats?.witnessedRepairs        ?? 0);
  const averageDiagnosticAccuracy = useJournalStore(s => s.stemStats?.averageDiagnosticAccuracy ?? 0);
  const totalSavingsGenerated  = useJournalStore(s => s.stemStats?.totalSavingsGenerated   ?? 0);
  const layersPassed           = useJournalStore(s => s.stemStats?.layersPassed            ?? 0);

  const stemStats = {
    totalRepairs,
    totalDiagnosticSessions,
    witnessedRepairs,
    averageDiagnosticAccuracy,
    totalSavingsGenerated,
    layersPassed,
  };

  // Auto-open Neville if verification is pending
  useEffect(() => {
    if (pendingSessionId) {
      setShowNeville(true);
    }
  }, [pendingSessionId]);

  const hasStarted = stemStats.totalRepairs > 0 || stemStats.totalDiagnosticSessions > 0;

  return (
    <PageTemplate
      pageTitle="STEMgeneers"
      pageStrapline="The person your community calls when something needs fixing."
      pageType="programme"
    >
      <PageMeta pageKey="stemgeneers" />

      <DraggableMaya
        membershipTier="visitor"
        pageType="programme"
        pageContext={{
          title: "STEMgeneers Programme",
          section: "programmes",
          contentType: "stem"
        }}
      />

      <div className="programme-content stemgeneers-page">

        {/* ── PENDING VERIFICATION BANNER ─────────────────────────────── */}
        <PendingVerificationBanner />

        {/* ── HERO ────────────────────────────────────────────────────── */}
        <section className="programme-hero stemgeneers-hero">
          <div className="hero-badge">🔧</div>
          <h1>STEMgeneers</h1>
          <p className="hero-tagline">
            The person your community calls when something breaks.
          </p>
          <p className="hero-sub">
            Not a coding bootcamp. Not a certification programme.<br />
            A community role, built through evidence, verified by work.
          </p>

          {/* Live stats strip — visible only once someone has started */}
          {hasStarted && (
            <div className="stemgeneers-live-stats">
              <div className="ls-item">
                <strong>{stemStats.totalRepairs}</strong>
                <span>repairs logged</span>
              </div>
              <div className="ls-item">
                <strong>{stemStats.witnessedRepairs}</strong>
                <span>witnessed</span>
              </div>
              <div className="ls-item">
                <strong>{Math.round(stemStats.averageDiagnosticAccuracy * 100)}%</strong>
                <span>diagnostic accuracy</span>
              </div>
              <div className="ls-item">
                <strong>£{stemStats.totalSavingsGenerated.toLocaleString()}</strong>
                <span>community savings</span>
              </div>
              {stemStats.layersPassed > 0 && (
                <div className="ls-item ls-item--highlight">
                  <strong>{stemStats.layersPassed}</strong>
                  <span>{stemStats.layersPassed === 1 ? 'layer' : 'layers'} passed</span>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ── BRUK-UP ─────────────────────────────────────────────────── */}
        <section className="programme-section brukup-section">
          <div className="brukup-card">
            <h2>Named for Bruk-up</h2>
            <p>
              Nine years old. Box of spare parts under the bed. Asks for a screwdriver set every 
              birthday. Takes everything apart to understand it — phones, clocks, appliances, 
              whatever her family will let her touch and some things they won't.
            </p>
            <p>
              <em>Bruk-up</em> is patois for broken. Also the name she earned because broken 
              things followed her, and she followed them back. She doesn't wait to be taught. 
              She reverse-engineers. She asks why until she gets an answer that actually explains something.
            </p>
            <p>
              By seventeen she runs Scrap Cat — the intake and salvage system that feeds the programme. 
              By twenty-two she's the STEMgeneer your uncle calls when the Indesit repair man's quote 
              exceeds the machine's remaining value.
            </p>
            <div className="brukup-audiences">
              <div className="brukup-audience">
                <strong>For the girl</strong> who doesn't want to plait hair and play with dolls. 
                The one who wants to know how the motor works.
              </div>
              <div className="brukup-audience">
                <strong>For the boy</strong> who's been told engineering isn't creative enough. 
                It is. Every problem is a design problem.
              </div>
              <div className="brukup-audience">
                <strong>For the adult</strong> who's been paying £15 to replace a watch battery 
                for twenty years and finally wants to know why.
              </div>
            </div>
          </div>
        </section>

        {/* ── COST OF NOT KNOWING ─────────────────────────────────────── */}
        <section className="programme-section cost-section">
          <h2>The Cost of Not Knowing</h2>
          <p className="section-intro">
            The repair economy is built on a simple asymmetry: the person who knows charges 
            for the knowledge, not just the labour. Most of what you pay for is the mystification 
            — the assumption that this is beyond you.
          </p>
          <p className="section-intro">
            It isn't. The curriculum here is organised around the actual cost of not knowing — 
            every point at which a household leaks money to someone who understands something 
            the household doesn't. Six layers. Each one is a credential.
          </p>
        </section>

        {/* ── PROBLEM LAYERS ──────────────────────────────────────────── */}
        <section className="programme-section layers-section">
          <h2>What STEMgeneers Know</h2>
          <div className="layers-grid">
            {problemLayers.map(layer => {
              const Icon = layer.icon;
              return (
                <div key={layer.layer} className="layer-card" style={{ borderColor: layer.color }}>
                  <div className="layer-header" style={{ backgroundColor: `${layer.color}20` }}>
                    <Icon size={28} color={layer.color} />
                    <h3 style={{ color: layer.color }}>{layer.name}</h3>
                    {/* Live gate status badge */}
                    <LayerGateMini
                      layer={layer.layer}
                      label=""
                      color={layer.color}
                    />
                  </div>
                  <p className="layer-desc">{layer.description}</p>
                  <div className="layer-examples">
                    {layer.examples.map((ex, i) => (
                      <div key={i} className="layer-example">
                        <span className="example-problem">{ex.problem}</span>
                        <div className="example-comparison">
                          <span className="example-cost">Without: {ex.cost}</span>
                          <span className="example-fix" style={{ color: layer.color }}>
                            With: {ex.fix}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="layer-why">{layer.why}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SKILL GATE OVERVIEW ─────────────────────────────────────── */}
        <section className="programme-section gates-overview-section">
          <h2>How the Credential Works</h2>
          <p className="section-intro">
            No exam board. No qualification fee. The credential is built from evidence — 
            diagnostic sessions, witnessed repairs, physics explanations, and a verification 
            conversation with Neville. Every layer gate requires all four.
          </p>
          <div className="gates-overview-grid">
            <div className="gate-requirement-card">
              <FlaskConical size={24} className="grc-icon" />
              <h4>Diagnostic Accuracy</h4>
              <p>Three Diagnostic Trainer sessions at 80%+ accuracy. The trainer scores your reasoning, not just your conclusion.</p>
            </div>
            <div className="gate-requirement-card">
              <Wrench size={24} className="grc-icon" />
              <h4>Real-World Repairs</h4>
              <p>Minimum two repairs logged in the Repair Workshop — at least one witnessed by a collective member, mentor, or client.</p>
            </div>
            <div className="gate-requirement-card">
              <Cpu size={24} className="grc-icon" />
              <h4>Physics Explanation</h4>
              <p>At least one session where you explain the underlying principle — why it broke, not just what you did.</p>
            </div>
            <div className="gate-requirement-card">
              <ShieldCheck size={24} className="grc-icon" />
              <h4>Neville Verification</h4>
              <p>A short conversation with the technical guide — Neville — confirming your understanding. Triggered automatically when you log a repair.</p>
            </div>
          </div>
          <div className="gates-cta">
            <Link to="/workspace/creators-journal" className="gates-portfolio-link">
              View your full gate progress →
            </Link>
          </div>
        </section>

        {/* ── NEVILLE PANEL ────────────────────────────────────────────── */}
        <section className="programme-section neville-section">
          <div className="neville-panel-header">
            <div className="neville-panel-title">
              <span className="neville-panel-icon">🔧</span>
              <div>
                <h2>Talk to Neville</h2>
                <p>
                  Technical guide for STEMgeneers, TECHreneurs, and Scrap Cat. 
                  Diagnose a fault, understand a gate requirement, or start a verification conversation.
                  {pendingSessionId && (
                    <strong className="neville-panel-urgent"> — verification waiting.</strong>
                  )}
                </p>
              </div>
            </div>
            <button
              className={`neville-toggle-btn ${showNeville ? 'neville-toggle-btn--open' : ''}`}
              onClick={() => setShowNeville(v => !v)}
            >
              {showNeville ? 'Close' : pendingSessionId ? 'Answer now' : 'Open'}
            </button>
          </div>

          {showNeville && (
            <div className="neville-panel-body">
              <PathfinderROV
                initialMode="stemgeneers"
                onVerificationComplete={(sessionId, passed) => {
                  // Scroll to gate progress on completion
                  if (passed) {
                    setTimeout(() => {
                      document.querySelector('.gates-overview-section')?.scrollIntoView({
                        behavior: 'smooth', block: 'start'
                      });
                    }, 1000);
                  }
                }}
              />
            </div>
          )}
        </section>

        {/* ── TOOLS ────────────────────────────────────────────────────── */}
        <section className="programme-section tools-section">
          <h2>The Two Workshop Spaces</h2>
          <p className="section-intro">
            Practice and real work live in different places deliberately. 
            The Diagnostic Trainer is safe to get wrong. The Repair Workshop is where it counts.
          </p>
          <div className="tools-grid">

            {/* Diagnostic Trainer → Sandbox */}
            <div className="tool-card tool-card--sandbox">
              <div className="tool-card-header">
                <FlaskConical size={32} className="tool-icon" />
                <div>
                  <h3>Diagnostic Trainer</h3>
                  <span className="tool-tag">Sandbox</span>
                </div>
              </div>
              <p>
                Fault scenarios with randomised symptom variants. Each session is scored — 
                diagnostic accuracy, elimination reasoning, and optional physics explanation.
                Scored sessions count toward your layer gate automatically.
              </p>
              <ul className="tool-features">
                <li>Six repair layers, multiple scenarios each</li>
                <li>Accuracy scoring with deviation analysis</li>
                <li>Physics capture prompt after each diagnosis</li>
                <li>Gate progress updates in real time</li>
              </ul>
              <Link to="/pathways/stemgeneers/sandbox" className="tool-cta tool-cta--primary">
                Open Diagnostic Trainer →
              </Link>
            </div>

            {/* Repair Workshop → PrototypeLab */}
            <div className="tool-card tool-card--lab">
              <div className="tool-card-header">
                <Wrench size={32} className="tool-icon" />
                <div>
                  <h3>Repair Workshop</h3>
                  <span className="tool-tag">Prototype Lab</span>
                </div>
              </div>
              <p>
                Log real repairs with evidence — fault description, diagnosis reasoning, 
                methods used, outcome, savings generated. Every completed log triggers a 
                verification conversation with Neville.
              </p>
              <ul className="tool-features">
                <li>Four-step repair evidence form</li>
                <li>Witness capture — inline, while you're still together</li>
                <li>Claim token reference for counter-archive QR system</li>
                <li>Portfolio export for certification applications</li>
              </ul>
              {pendingSessionId ? (
                <Link to="/workspace/creators-journal" className="tool-cta tool-cta--urgent">
                  Complete pending verification first →
                </Link>
              ) : (
                <Link to="/pathways/stemgeneers/prototype-lab" className="tool-cta tool-cta--primary">
                  Open Repair Workshop →
                </Link>
              )}
            </div>

          </div>
        </section>

        {/* ── HERITAGE ────────────────────────────────────────────────── */}
        <section className="programme-section heritage-section">
          <h2>The Technical Heritage That Was Always Here</h2>
          <p className="section-intro">
            Before there were tech companies, there were people who built things and fixed things. 
            The community always had technical knowledge. We're formalising what already existed 
            — and naming it correctly this time.
          </p>
          <div className="heritage-grid">
            {heritageRoots.map((root, index) => (
              <div key={index} className="heritage-card">
                <span className="heritage-icon">{root.icon}</span>
                <h3>{root.name}</h3>
                <p>{root.description}</p>
                <p className="heritage-lesson"><strong>The principle:</strong> {root.lesson}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMMUNITY ROLE ──────────────────────────────────────────── */}
        <section className="programme-section role-section">
          <h2>What the STEMgeneer Role Actually Is</h2>
          <p className="section-intro">
            Not a course graduate. Not a service provider. 
            The person your community calls. That's a status, a relationship, 
            a position in the community's infrastructure.
          </p>
          <div className="role-grid">
            {communityRole.map((item, index) => (
              <div key={index} className="role-card">
                <h3>{item.scenario}</h3>
                <div className="role-comparison">
                  <div className="role-current">
                    <span className="role-label">Without STEMgeneer:</span>
                    <p>{item.current}</p>
                  </div>
                  <div className="role-stemgeneer">
                    <span className="role-label">With STEMgeneer:</span>
                    <p>{item.stemgeneer}</p>
                  </div>
                </div>
                <div className="role-value">
                  <span>Community value: </span>
                  <strong>{item.value}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SCRAP CAT ───────────────────────────────────────────────── */}
        <section className="programme-section scrapcat-section">
          <div className="scrapcat-card">
            <h2>{scrapCatConnection.title}</h2>
            <p>{scrapCatConnection.description}</p>
            <div className="scrapcat-loop">
              {scrapCatConnection.loop.map((step, i) => (
                <div key={i} className="loop-step">
                  <span className="loop-number">{i + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
            <Link to="/programmes/scrap-cat" className="scrapcat-link">
              Explore Scrap Cat →
            </Link>
          </div>
        </section>

        {/* ── COLLECTIVE ──────────────────────────────────────────────── */}
        <section className="programme-section collective-section">
          <h2>Tech Collective: Pardner for Equipment</h2>
          <p className="section-intro">
            Professional tools are expensive alone. Together, the collective owns what none 
            of us could afford individually — the same principle as your grandmother's pardner, 
            applied to diagnostic equipment and 3D printers.
          </p>
          <div className="collective-grid">
            {collectiveEquipment.map((item, i) => (
              <div key={i} className="collective-item">
                <strong>{item.name}</strong>
                <span className="collective-cost">{item.cost}</span>
                <span className="collective-purpose">{item.purpose}</span>
              </div>
            ))}
          </div>
          <p className="collective-model">
            Collective members contribute monthly. Equipment is accessible to all members. 
            When your hand comes around, you purchase — individually owned but collectively 
            financed. The model your grandmother knew.
          </p>
          <Link to="/pathways/stemgeneers/sandbox#collective" className="collective-calculator-link">
            Run the collective calculator →
          </Link>
        </section>

        {/* ── FINAL CTA ───────────────────────────────────────────────── */}
        <section className="programme-section final-cta-section">
          <div className="final-cta-card">
            <h2>Start with the Diagnostic Trainer</h2>
            <p>
              No commitment. No cost. Open a scenario, work through the diagnosis, 
              see how your reasoning scores. If it clicks — log a real repair 
              next time something breaks.
            </p>
            <p>
              The credential builds itself from there.
            </p>
            <div className="final-cta-actions">
              <Link to="/pathways/stemgeneers/sandbox" className="cta-primary">
                Open the Sandbox →
              </Link>
              <button
                className="cta-secondary"
                onClick={() => { setShowNeville(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                Ask Neville a question
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default STEMgeneersPage;