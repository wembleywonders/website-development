// src/components/sandboxes/mini/index.ts
// Mini-sandbox exports - Quick creative exercises with ecosystem context

// Base component
export { default as MiniSandboxBase } from './MiniSandboxBase';
export type { 
  SandboxConstraints, 
  SandboxPrompt, 
  SandboxResult,
  MiniSandboxBaseProps 
} from './MiniSandboxBase';
export { ConstraintMeter, SessionTimer } from './MiniSandboxBase';

// ============================================
// G-TECH CASTERS - Media Mini-Sandboxes
// ============================================
export { default as AudioSnippetSandbox } from './AudioSnippetSandbox';         // 🎙️ 60-second audio pitch
export { default as QuickCollageSandbox } from './QuickCollageSandbox';         // 🖼️ 3-image story
export { default as SoundHuntSandbox } from './SoundHuntSandbox';               // 👂 5 ambient sounds
export { default as ClientPitchSandbox } from './ClientPitchSandbox';           // 🏢 90-second B2B pitch

// ============================================
// PAGETURNERS - Writing Mini-Sandboxes
// ============================================
export { default as MicroStorySandbox } from './MicroStorySandbox';             // ✍️ 200-word story
export { default as HeadlineChallengeSandbox } from './HeadlineChallengeSandbox'; // 📰 10 headlines
export { default as ServiceDescriptionSandbox } from './ServiceDescriptionSandbox'; // 📝 50-word service pitch

// ============================================
// STEMGENEERS - Technical Mini-Sandboxes
// ============================================
export { default as RepairSketchSandbox } from './RepairSketchSandbox';         // ✏️ 4-panel repair guide
export { default as DiagnosticQuizSandbox } from './DiagnosticQuizSandbox';     // 🔧 Quick diagnostic practice
export { default as PricingCalculatorSandbox } from './PricingCalculatorSandbox'; // 💰 Rate calculation

// ============================================
// SILK STILETTOS - Creative Mini-Sandboxes
// ============================================
export { default as StyleBoardSandbox } from './StyleBoardSandbox';             // 👗 3-look mood board
export { default as BeforeAfterSandbox } from './BeforeAfterSandbox';           // ✨ Transformation showcase

// ============================================
// TECHRENEURS - Business Mini-Sandboxes
// ============================================
export { default as ElevatorPitchSandbox } from './ElevatorPitchSandbox';       // 🎯 30-second pitch
export { default as ServiceMenuSandbox } from './ServiceMenuSandbox';           // 📋 3-service menu
export { default as GapSpotterSandbox } from './GapSpotterSandbox';             // 🔍 Local business gap finder

// ============================================
// CROSS-PROGRAMME - Ecosystem Sandboxes
// ============================================
export { default as PortfolioSnapshotSandbox } from './PortfolioSnapshotSandbox'; // 📸 Quick portfolio piece
export { default as TestimonialRequestSandbox } from './TestimonialRequestSandbox'; // ⭐ Ask for testimonial

// Launcher page
export { default as MiniSandboxLauncher } from './MiniSandboxLauncher';
