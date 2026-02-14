/**
 * Passionistas Navigation Integration
 * ====================================
 * 
 * Simplified site structure with Passionistas as the hub.
 * 
 * OLD STRUCTURE (confusing):
 * Home → Programmes (11) → Each has own sandbox → Tools scattered
 * 
 * NEW STRUCTURE (clear):
 * Home (Passionistas)
 * ├── Tools (all sandboxes, unified)
 * ├── Sessions (Zoom calendar)  
 * ├── Downloads (worksheets, guides)
 * ├── Community (gallery, projects)
 * └── Pathways (programmes as deeper dives)
 */

// ============================================
// ROUTE STRUCTURE
// ============================================

export const PASSIONISTAS_ROUTES = {
  // Main hub
  home: '/',
  
  // Core sections (always accessible)
  tools: '/tools',
  sessions: '/sessions',      // Zoom calendar
  downloads: '/downloads',    // Worksheets, guides
  community: '/community',    // Gallery, current projects
  
  // Deeper dives (when ready)
  pathways: '/pathways',      // Was /programmes
  
  // Individual tools (no programme prefix needed)
  toolRoutes: {
    diagnosticTrainer: '/tools/diagnostic-trainer',
    pricingCalculator: '/tools/pricing-calculator',
    collectiveCalculator: '/tools/collective-calculator',
    incomeMapper: '/tools/income-mapper',
    businessCanvas: '/tools/business-canvas',
    scriptBuilder: '/tools/script-builder',
    characterCreator: '/tools/character-creator',
    storyStructure: '/tools/story-structure',
    colourPalette: '/tools/colour-palette',
    moodBoard: '/tools/mood-board',
    measurements: '/tools/measurements',
    productionSim: '/tools/production-sim',
    beatSketch: '/tools/beat-sketch',
    podcastPlanner: '/tools/podcast-planner',
    streamingChecklist: '/tools/streaming-checklist',
    recipeKeeper: '/tools/recipe-keeper',
    oralHistory: '/tools/oral-history',
    heritageLanguage: '/tools/heritage-language',
  },
  
  // Pathways (deeper programme content)
  pathwayRoutes: {
    stemgeneers: '/pathways/stemgeneers',
    techreneurs: '/pathways/techreneurs',
    kaywanasCourt: '/pathways/kaywanas-court',
    gtechCasters: '/pathways/gtech-casters',
    trubbleNBass: '/pathways/trubble-n-bass',
    silkStilettos: '/pathways/silk-stilettos',
    auntiesKitchen: '/pathways/aunties-kitchen',
    pageturners: '/pathways/pageturners',
    raydyo: '/pathways/raydyo',
    joystick: '/pathways/joystick',
    scrapCat: '/pathways/scrap-cat',
    moneyReset: '/pathways/money-reset',
  },
  
  // Supporting pages
  membership: '/membership',
  about: '/about',
  cyberstore: '/cyberstore',
  calendar: '/calendar',
};

// ============================================
// MAIN NAVIGATION ITEMS
// ============================================

export const MAIN_NAV_ITEMS = [
  {
    label: 'Tools',
    path: '/tools',
    icon: '⚡',
    description: 'All creative tools in one place'
  },
  {
    label: 'Sessions',
    path: '/sessions',
    icon: '📅',
    description: 'Zoom workshops and meetups'
  },
  {
    label: 'Downloads',
    path: '/downloads',
    icon: '📥',
    description: 'Worksheets, guides, templates'
  },
  {
    label: 'Community',
    path: '/community',
    icon: '🤝',
    description: 'Gallery and current projects'
  },
  {
    label: 'Pathways',
    path: '/pathways',
    icon: '🛤️',
    description: 'Deeper programme journeys'
  },
];

// ============================================
// QUICK ACTIONS (for Maya and homepage)
// ============================================

export const QUICK_ACTIONS = [
  {
    label: 'Try a tool',
    path: '/tools',
    icon: '⚡',
    context: 'I want to create something'
  },
  {
    label: 'Join a session',
    path: '/sessions',
    icon: '📅',
    context: 'I want to learn with others'
  },
  {
    label: 'Download resources',
    path: '/downloads',
    icon: '📥',
    context: 'I need worksheets or guides'
  },
  {
    label: 'See what others made',
    path: '/community',
    icon: '👀',
    context: 'I want inspiration'
  },
  {
    label: 'Explore a pathway',
    path: '/pathways',
    icon: '🛤️',
    context: 'I want to go deeper'
  },
  {
    label: 'Become a Passionista',
    path: '/membership',
    icon: '💜',
    context: 'I want to join the club'
  },
];

// ============================================
// TOOL CATEGORIES (for filtering)
// ============================================

export const TOOL_CATEGORIES = [
  { id: 'diagnose-fix', label: 'Diagnose & Fix', icon: '🔧', colour: '#10b981' },
  { id: 'calculate-plan', label: 'Calculate & Plan', icon: '🧮', colour: '#8b5cf6' },
  { id: 'write-create', label: 'Write & Create', icon: '✏️', colour: '#f59e0b' },
  { id: 'design-make', label: 'Design & Make', icon: '🎨', colour: '#ec4899' },
  { id: 'record-produce', label: 'Record & Produce', icon: '🎙️', colour: '#3b82f6' },
  { id: 'preserve-share', label: 'Preserve & Share', icon: '💜', colour: '#f97316' },
];

// ============================================
// REDIRECT MAP (old URLs → new URLs)
// ============================================

export const REDIRECT_MAP: Record<string, string> = {
  // Old programme sandbox URLs → unified tools
  '/programmes/stemgeneers/sandbox': '/tools',
  '/programmes/techreneurs/sandbox': '/tools',
  '/programmes/kaywanas-court/sandbox': '/tools',
  '/programmes/gtech-casters/sandbox': '/tools',
  
  // Old programme URLs → pathways
  '/programmes/stemgeneers': '/pathways/stemgeneers',
  '/programmes/techreneurs': '/pathways/techreneurs',
  '/programmes/kaywanas-court': '/pathways/kaywanas-court',
  '/programmes/gtechcasters': '/pathways/gtech-casters',
  '/programmes/gtech-casters': '/pathways/gtech-casters',
  '/programmes/trubble-n-bass': '/pathways/trubble-n-bass',
  '/programmes/silk-stilettos': '/pathways/silk-stilettos',
  '/programmes/auntie-anansis-kitchen': '/pathways/aunties-kitchen',
  '/programmes/pageturners': '/pathways/pageturners',
  '/programmes/raydyo': '/pathways/raydyo',
  '/programmes/joystick': '/pathways/joystick',
  '/programmes/scrap-cat': '/pathways/scrap-cat',
  '/programmes/money-reset': '/pathways/money-reset',
  
  // Old programmes index
  '/programmes': '/pathways',
};

// ============================================
// USAGE EXAMPLE: Updated App Router
// ============================================

/*
import { Routes, Route, Navigate } from 'react-router-dom';
import { REDIRECT_MAP } from './navigation';

// In your App.tsx:
<Routes>
  {/* Main pages *\/}
  <Route path="/" element={<HomePage />} />
  <Route path="/tools" element={<PassionistasTools />} />
  <Route path="/tools/:toolId" element={<ToolPage />} />
  <Route path="/sessions" element={<SessionsCalendar />} />
  <Route path="/downloads" element={<DownloadsHub />} />
  <Route path="/community" element={<CommunityGallery />} />
  <Route path="/pathways" element={<PathwaysIndex />} />
  <Route path="/pathways/:pathwayId" element={<PathwayPage />} />
  
  {/* Redirects for old URLs *\/}
  {Object.entries(REDIRECT_MAP).map(([from, to]) => (
    <Route key={from} path={from} element={<Navigate to={to} replace />} />
  ))}
</Routes>
*/

export default PASSIONISTAS_ROUTES;