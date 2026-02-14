/**
 * SKILL COMBINATIONS DATA
 * 
 * Maps programmes to products/services and defines
 * how multiple programmes unlock power combinations.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import type { ProgrammeId, ProgrammeInfo, SingleProgrammeProduct, SkillCombinationDefinition } from '../types';

// ============================================
// PROGRAMME INFO
// ============================================

export const PROGRAMME_INFO: Record<ProgrammeId, ProgrammeInfo> = {
  'trubble-n-bass': {
    id: 'trubble-n-bass',
    name: 'Trubble n Bass',
    shortName: 'Music',
    icon: '🎵',
    color: '#8B5CF6',
    description: 'Music production, beats, sound design',
    workshopsRequired: 6
  },
  'silk-stilettos': {
    id: 'silk-stilettos',
    name: 'Silk & Stilettos',
    shortName: 'Fashion',
    icon: '👗',
    color: '#EC4899',
    description: 'Fashion design, styling, garment creation',
    workshopsRequired: 6
  },
  'techreneurs': {
    id: 'techreneurs',
    name: 'TECHreneurs',
    shortName: 'Tech',
    icon: '💻',
    color: '#3B82F6',
    description: 'Web development, apps, digital solutions',
    workshopsRequired: 8
  },
  'gtechcasters': {
    id: 'gtechcasters',
    name: 'G-Tech Casters',
    shortName: 'Audio',
    icon: '🎙️',
    color: '#F59E0B',
    description: 'Podcasting, audio production, voiceover',
    workshopsRequired: 6
  },
  'kaywanas-court': {
    id: 'kaywanas-court',
    name: "Kaywana's Court",
    shortName: 'Performance',
    icon: '🎭',
    color: '#EF4444',
    description: 'Performance, MC, drama, presentation',
    workshopsRequired: 6
  },
  'pageturners': {
    id: 'pageturners',
    name: 'PageTurners',
    shortName: 'Writing',
    icon: '📚',
    color: '#10B981',
    description: 'Writing, editing, publishing, content',
    workshopsRequired: 6
  },
  'stemgeneers': {
    id: 'stemgeneers',
    name: 'STEMgeneers',
    shortName: 'STEM',
    icon: '🔬',
    color: '#6366F1',
    description: 'STEM education, tutoring, workshops',
    workshopsRequired: 6
  },
  'scrap-cat': {
    id: 'scrap-cat',
    name: 'Scrap Cat',
    shortName: 'Upcycle',
    icon: '♻️',
    color: '#22C55E',
    description: 'Upcycling, restoration, sustainable crafts',
    workshopsRequired: 6
  },
  'bright-sparks': {
    id: 'bright-sparks',
    name: 'Bright Sparks',
    shortName: 'Youth',
    icon: '⚡',
    color: '#FBBF24',
    description: 'Youth work, activities, education',
    workshopsRequired: 6
  },
  'auntie-anansis-kitchen': {
    id: 'auntie-anansis-kitchen',
    name: "Auntie Anansi's Kitchen",
    shortName: 'Food',
    icon: '🍲',
    color: '#F97316',
    description: 'Cooking, catering, food business',
    workshopsRequired: 6
  }
};

// ============================================
// SINGLE PROGRAMME PRODUCTS
// ============================================

export const SINGLE_PROGRAMME_PRODUCTS: SingleProgrammeProduct[] = [
  {
    programmeId: 'trubble-n-bass',
    products: [
      'Beat leases',
      'Exclusive beats',
      'Sample packs',
      'Drum kits',
      'Sound effects',
      'Preset packs',
      'MIDI files',
      'Loop packs'
    ],
    services: [
      'Custom beat production',
      'Mixing',
      'Mastering',
      'Sound design',
      'Vocal tuning',
      'Music lessons'
    ],
    typicalPricing: {
      products: { min: 10, max: 500 },
      services: { min: 50, max: 500 }
    }
  },
  {
    programmeId: 'silk-stilettos',
    products: [
      'Custom garments',
      'Accessories',
      'Jewellery',
      'Digital patterns',
      'Lookbooks',
      'Style guides'
    ],
    services: [
      'Personal styling',
      'Wardrobe consultation',
      'Custom design',
      'Alterations',
      'Fashion illustration',
      'Styling workshops'
    ],
    typicalPricing: {
      products: { min: 20, max: 500 },
      services: { min: 50, max: 300 }
    }
  },
  {
    programmeId: 'techreneurs',
    products: [
      'Website templates',
      'App templates',
      'UI kits',
      'Code snippets',
      'Automation scripts',
      'Digital tools'
    ],
    services: [
      'Website development',
      'App development',
      'Tech consulting',
      'Maintenance retainers',
      'Training sessions',
      'Bug fixing'
    ],
    typicalPricing: {
      products: { min: 30, max: 300 },
      services: { min: 100, max: 3000 }
    }
  },
  {
    programmeId: 'gtechcasters',
    products: [
      'Podcast episodes',
      'Audio courses',
      'Sound effects packs',
      'Intro/outro music',
      'Audio templates',
      'Interview archives'
    ],
    services: [
      'Podcast editing',
      'Audio production',
      'Voiceover',
      'Podcast consulting',
      'Show notes writing',
      'Audio restoration'
    ],
    typicalPricing: {
      products: { min: 15, max: 200 },
      services: { min: 50, max: 400 }
    }
  },
  {
    programmeId: 'kaywanas-court',
    products: [
      'Performance scripts',
      'Workshop curricula',
      'Drama exercises',
      'Monologue collections',
      'Event hosting guides'
    ],
    services: [
      'MC/Event hosting',
      'Drama workshops',
      'Voiceover',
      'Acting coaching',
      'Public speaking training',
      'Corporate facilitation'
    ],
    typicalPricing: {
      products: { min: 20, max: 150 },
      services: { min: 100, max: 800 }
    }
  },
  {
    programmeId: 'pageturners',
    products: [
      'E-books',
      'Guides',
      'Templates',
      'Workbooks',
      'Newsletters',
      'Zines'
    ],
    services: [
      'Copywriting',
      'Editing',
      'Proofreading',
      'Ghostwriting',
      'Content strategy',
      'Blog management'
    ],
    typicalPricing: {
      products: { min: 5, max: 50 },
      services: { min: 50, max: 1000 }
    }
  },
  {
    programmeId: 'stemgeneers',
    products: [
      'Lesson plans',
      'Activity kits',
      'Educational games',
      'Experiment guides',
      'Curriculum packs',
      'Assessment templates'
    ],
    services: [
      'Private tutoring',
      'Group tutoring',
      'School workshops',
      'Holiday clubs',
      'Science shows',
      'STEM mentoring'
    ],
    typicalPricing: {
      products: { min: 10, max: 100 },
      services: { min: 40, max: 600 }
    }
  },
  {
    programmeId: 'scrap-cat',
    products: [
      'Restored furniture',
      'Upcycled items',
      'DIY kits',
      'Repair guides',
      'Material packs',
      'Tool recommendations'
    ],
    services: [
      'Furniture restoration',
      'Item repair',
      'Upcycling workshops',
      'Home consultations',
      'Commission work',
      'Repair cafes'
    ],
    typicalPricing: {
      products: { min: 20, max: 500 },
      services: { min: 40, max: 400 }
    }
  },
  {
    programmeId: 'bright-sparks',
    products: [
      'Activity packs',
      'Party kits',
      'Educational games',
      'Workshop materials',
      'Curriculum guides',
      'Assessment tools'
    ],
    services: [
      'Youth workshops',
      'Party hosting',
      'School programmes',
      'Holiday clubs',
      'After-school clubs',
      'Youth mentoring'
    ],
    typicalPricing: {
      products: { min: 15, max: 100 },
      services: { min: 100, max: 600 }
    }
  },
  {
    programmeId: 'auntie-anansis-kitchen',
    products: [
      'Recipe e-books',
      'Spice blends',
      'Meal kits',
      'Cooking guides',
      'Food photography',
      'Menu templates'
    ],
    services: [
      'Event catering',
      'Private chef',
      'Cooking classes',
      'Menu consulting',
      'Food styling',
      'Recipe development'
    ],
    typicalPricing: {
      products: { min: 8, max: 80 },
      services: { min: 80, max: 2500 }
    }
  }
];

// ============================================
// DUAL PROGRAMME COMBINATIONS
// ============================================

export const SKILL_COMBINATIONS: SkillCombinationDefinition[] = [
  // Music + Tech
  {
    id: 'music-tech',
    name: 'Music Tech Business',
    programmes: ['trubble-n-bass', 'techreneurs'],
    description: 'Build and run your own music platform',
    unlocks: [
      'Own beat store website',
      'Automated licensing system',
      'Producer portfolio platform',
      'Music streaming tools',
      'Royalty tracking systems'
    ],
    potentialProducts: [
      'Beat store templates',
      'Licensing automation tools',
      'Producer website themes',
      'Music player widgets'
    ],
    potentialServices: [
      'Beat store development',
      'Music platform consulting',
      'Producer tech setup',
      'Licensing system builds'
    ],
    examplePackages: [
      'Complete Producer Platform: Beat store + licensing + portfolio (£1,500-3,000)'
    ],
    revenueMultiplier: 1.8
  },
  
  // Fashion + Upcycle
  {
    id: 'sustainable-fashion',
    name: 'Sustainable Fashion',
    programmes: ['silk-stilettos', 'scrap-cat'],
    description: 'Eco-conscious fashion design and production',
    unlocks: [
      'Sustainable fashion line',
      'Zero-waste designs',
      'Upcycled collections',
      'Eco-fashion consulting',
      'Sustainable styling'
    ],
    potentialProducts: [
      'Upcycled garments',
      'Zero-waste patterns',
      'Sustainable fabric guides',
      'Eco-fashion lookbooks'
    ],
    potentialServices: [
      'Sustainable wardrobe consulting',
      'Upcycle transformation',
      'Eco-fashion workshops',
      'Brand sustainability audits'
    ],
    examplePackages: [
      'Wardrobe Transformation: Audit + upcycle + styling (£300-600)'
    ],
    revenueMultiplier: 1.6
  },
  
  // Audio + Writing
  {
    id: 'content-agency',
    name: 'Full Content Agency',
    programmes: ['gtechcasters', 'pageturners'],
    description: 'Multi-format content creation',
    unlocks: [
      'Podcast + newsletter bundles',
      'Audio articles',
      'Content repurposing',
      'Show notes + transcripts',
      'Audio-first publishing'
    ],
    potentialProducts: [
      'Content bundle templates',
      'Podcast-to-blog guides',
      'Audio article packages',
      'Repurposing workflows'
    ],
    potentialServices: [
      'Full content production',
      'Podcast + newsletter management',
      'Content strategy',
      'Repurposing service'
    ],
    examplePackages: [
      'Content Engine: Weekly podcast + newsletter + blog (£800-1,500/month)'
    ],
    revenueMultiplier: 1.7
  },
  
  // Performance + Youth
  {
    id: 'youth-drama',
    name: 'Youth Drama',
    programmes: ['kaywanas-court', 'bright-sparks'],
    description: 'Drama programmes for young people',
    unlocks: [
      'Youth drama workshops',
      'School drama programmes',
      'Theatre summer camps',
      'Drama therapy basics',
      'Youth performance coaching'
    ],
    potentialProducts: [
      'Youth drama curricula',
      'Age-appropriate scripts',
      'Drama games packs',
      'Assessment frameworks'
    ],
    potentialServices: [
      'School drama programmes',
      'Youth theatre workshops',
      'Drama summer camps',
      'Performance coaching'
    ],
    examplePackages: [
      'Term Programme: 12-week school drama course (£2,000-4,000)'
    ],
    revenueMultiplier: 1.5
  },
  
  // Audio + Food
  {
    id: 'food-media',
    name: 'Food Media',
    programmes: ['gtechcasters', 'auntie-anansis-kitchen'],
    description: 'Food content creation and storytelling',
    unlocks: [
      'Food podcast production',
      'Cooking show content',
      'Recipe video narration',
      'Food storytelling',
      'Culinary audio tours'
    ],
    potentialProducts: [
      'Recipe podcast episodes',
      'Cooking audio guides',
      'Food story collections',
      'Kitchen soundscapes'
    ],
    potentialServices: [
      'Food podcast production',
      'Cooking show development',
      'Restaurant audio branding',
      'Food tour narration'
    ],
    examplePackages: [
      'Food Show Launch: 10 episodes + branding + distribution (£2,000-4,000)'
    ],
    revenueMultiplier: 1.6
  },
  
  // Tech + STEM
  {
    id: 'edtech',
    name: 'EdTech Creator',
    programmes: ['techreneurs', 'stemgeneers'],
    description: 'Educational technology development',
    unlocks: [
      'Interactive learning apps',
      'Educational games',
      'Online course platforms',
      'Assessment tools',
      'Virtual lab simulations'
    ],
    potentialProducts: [
      'Educational web apps',
      'Interactive lessons',
      'Learning management tools',
      'Assessment platforms'
    ],
    potentialServices: [
      'EdTech development',
      'Course platform builds',
      'School tech consulting',
      'Digital learning design'
    ],
    examplePackages: [
      'School Digital Upgrade: LMS + content + training (£3,000-8,000)'
    ],
    revenueMultiplier: 2.0
  },
  
  // Fashion + Food
  {
    id: 'cultural-events',
    name: 'Cultural Events',
    programmes: ['silk-stilettos', 'auntie-anansis-kitchen'],
    description: 'Fashion and food cultural experiences',
    unlocks: [
      'Fashion show catering',
      'Cultural celebration packages',
      'Pop-up experiences',
      'Heritage events',
      'Themed dining experiences'
    ],
    potentialProducts: [
      'Event planning guides',
      'Cultural celebration kits',
      'Theme packages',
      'Decor + menu combos'
    ],
    potentialServices: [
      'Fashion show production',
      'Cultural event planning',
      'Pop-up experiences',
      'Heritage celebrations'
    ],
    examplePackages: [
      'Cultural Celebration: Fashion show + dinner for 50 (£3,000-6,000)'
    ],
    revenueMultiplier: 1.8
  },
  
  // Music + Performance
  {
    id: 'live-entertainment',
    name: 'Live Entertainment',
    programmes: ['trubble-n-bass', 'kaywanas-court'],
    description: 'Complete live event entertainment',
    unlocks: [
      'Live performance packages',
      'Event DJ + MC combos',
      'Music + hosting',
      'Show production',
      'Artist development'
    ],
    potentialProducts: [
      'Event music packages',
      'Performance guides',
      'Show running orders',
      'MC script templates'
    ],
    potentialServices: [
      'Event entertainment',
      'DJ + MC packages',
      'Live show production',
      'Artist coaching'
    ],
    examplePackages: [
      'Full Event Entertainment: DJ + MC + lighting (£500-1,500)'
    ],
    revenueMultiplier: 1.7
  },
  
  // Writing + Tech
  {
    id: 'content-tech',
    name: 'Content Tech',
    programmes: ['pageturners', 'techreneurs'],
    description: 'Content systems and publishing platforms',
    unlocks: [
      'Publishing platforms',
      'Blog systems',
      'Newsletter tools',
      'Content automation',
      'SEO tools'
    ],
    potentialProducts: [
      'Blog templates',
      'Publishing workflows',
      'Content management tools',
      'SEO guides'
    ],
    potentialServices: [
      'Publishing platform builds',
      'Content site development',
      'Newsletter system setup',
      'SEO consulting'
    ],
    examplePackages: [
      'Creator Platform: Website + blog + newsletter + SEO (£1,500-3,000)'
    ],
    revenueMultiplier: 1.8
  },
  
  // STEM + Youth
  {
    id: 'stem-youth',
    name: 'STEM Youth Programmes',
    programmes: ['stemgeneers', 'bright-sparks'],
    description: 'STEM education for young people',
    unlocks: [
      'Youth STEM camps',
      'School science clubs',
      'Coding for kids',
      'STEM birthday parties',
      'Family science events'
    ],
    potentialProducts: [
      'STEM activity kits',
      'Coding curriculum',
      'Science party packs',
      'Experiment guides'
    ],
    potentialServices: [
      'STEM holiday camps',
      'After-school coding',
      'Science birthday parties',
      'School STEM days'
    ],
    examplePackages: [
      'STEM Summer Camp: 5-day programme for 20 kids (£2,500-4,000)'
    ],
    revenueMultiplier: 1.6
  },
  
  // Upcycle + Food
  {
    id: 'sustainable-living',
    name: 'Sustainable Living',
    programmes: ['scrap-cat', 'auntie-anansis-kitchen'],
    description: 'Zero-waste lifestyle education',
    unlocks: [
      'Zero-waste workshops',
      'Sustainable home consulting',
      'Eco-cooking classes',
      'Waste-reduction programmes',
      'Community sustainability'
    ],
    potentialProducts: [
      'Zero-waste guides',
      'Sustainable cooking books',
      'Eco-home kits',
      'Composting guides'
    ],
    potentialServices: [
      'Home sustainability audits',
      'Zero-waste cooking classes',
      'Eco-lifestyle coaching',
      'Community programmes'
    ],
    examplePackages: [
      'Home Sustainability Package: Audit + workshop + follow-up (£250-500)'
    ],
    revenueMultiplier: 1.5
  },
  
  // Fashion + Tech
  {
    id: 'fashion-tech',
    name: 'Fashion Tech',
    programmes: ['silk-stilettos', 'techreneurs'],
    description: 'Digital fashion business tools',
    unlocks: [
      'Fashion e-commerce',
      'Virtual try-on',
      'Design portfolio sites',
      'Fashion apps',
      'Inventory systems'
    ],
    potentialProducts: [
      'Fashion store templates',
      'Lookbook platforms',
      'Size guide tools',
      'Collection managers'
    ],
    potentialServices: [
      'Fashion e-commerce builds',
      'Designer portfolio sites',
      'Brand website development',
      'Fashion app development'
    ],
    examplePackages: [
      'Fashion Brand Launch: E-commerce + lookbook + inventory (£2,000-4,000)'
    ],
    revenueMultiplier: 1.9
  }
];

// ============================================
// ADVANCED COMBINATIONS (3+ PROGRAMMES)
// ============================================

export const ADVANCED_COMBINATIONS: SkillCombinationDefinition[] = [
  {
    id: 'creative-agency',
    name: 'Full Creative Agency',
    programmes: ['techreneurs', 'gtechcasters', 'pageturners'],
    description: 'Complete digital content and platform agency',
    unlocks: [
      'Full-service content agency',
      'Platform + content bundles',
      'Brand launch packages',
      'Digital transformation',
      'Creator business setup'
    ],
    potentialProducts: [
      'Agency starter kits',
      'Brand launch templates',
      'Content system packages'
    ],
    potentialServices: [
      'Brand launches',
      'Creator business setup',
      'Full content management',
      'Digital transformation'
    ],
    examplePackages: [
      'Creator Business Launch: Platform + content + strategy (£5,000-10,000)'
    ],
    revenueMultiplier: 2.5
  },
  {
    id: 'cultural-centre',
    name: 'Cultural Centre',
    programmes: ['kaywanas-court', 'auntie-anansis-kitchen', 'silk-stilettos'],
    description: 'Complete cultural event production',
    unlocks: [
      'Cultural festival production',
      'Heritage celebration packages',
      'Community event management',
      'Cultural education programmes'
    ],
    potentialProducts: [
      'Festival planning guides',
      'Cultural programme templates',
      'Heritage celebration kits'
    ],
    potentialServices: [
      'Festival production',
      'Cultural event management',
      'Heritage programme delivery',
      'Community celebrations'
    ],
    examplePackages: [
      'Community Festival: Full production for 500+ attendees (£8,000-15,000)'
    ],
    revenueMultiplier: 2.2
  },
  {
    id: 'youth-centre',
    name: 'Youth Programme Hub',
    programmes: ['bright-sparks', 'stemgeneers', 'kaywanas-court'],
    description: 'Comprehensive youth programming',
    unlocks: [
      'Full youth centre programmes',
      'School partnership packages',
      'Holiday programme suites',
      'Youth development pathways'
    ],
    potentialProducts: [
      'Youth programme curricula',
      'Assessment frameworks',
      'Activity libraries'
    ],
    potentialServices: [
      'Youth centre management',
      'School programme delivery',
      'Holiday club operation',
      'Youth worker training'
    ],
    examplePackages: [
      'Year-Round Youth Programme: Term-time + holidays (£15,000-30,000/year)'
    ],
    revenueMultiplier: 2.3
  },
  {
    id: 'sustainable-business',
    name: 'Sustainable Business',
    programmes: ['scrap-cat', 'silk-stilettos', 'techreneurs'],
    description: 'Sustainable fashion e-commerce business',
    unlocks: [
      'Sustainable fashion brand',
      'Eco e-commerce platform',
      'Circular fashion business',
      'Sustainable brand consulting'
    ],
    potentialProducts: [
      'Sustainable brand kits',
      'Eco-commerce templates',
      'Circular fashion guides'
    ],
    potentialServices: [
      'Sustainable brand launches',
      'Eco-commerce development',
      'Circular business consulting',
      'Sustainability certification'
    ],
    examplePackages: [
      'Sustainable Fashion Brand: Full launch package (£6,000-12,000)'
    ],
    revenueMultiplier: 2.4
  },
  {
    id: 'media-empire',
    name: 'Media Production House',
    programmes: ['trubble-n-bass', 'gtechcasters', 'kaywanas-court', 'pageturners'],
    description: 'Full media production capability',
    unlocks: [
      'Complete media production',
      'Multi-format content',
      'Live event broadcasting',
      'Media training programmes'
    ],
    potentialProducts: [
      'Production templates',
      'Media training courses',
      'Content libraries'
    ],
    potentialServices: [
      'Event broadcasting',
      'Multi-platform production',
      'Media training',
      'Content studio hire'
    ],
    examplePackages: [
      'Event Media Package: Live stream + podcast + highlights (£3,000-8,000)'
    ],
    revenueMultiplier: 3.0
  }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getProgrammeInfo(programmeId: ProgrammeId): ProgrammeInfo {
  return PROGRAMME_INFO[programmeId];
}

export function getSingleProgrammeProducts(programmeId: ProgrammeId): SingleProgrammeProduct | undefined {
  return SINGLE_PROGRAMME_PRODUCTS.find(p => p.programmeId === programmeId);
}

export function getAvailableCombinations(completedProgrammes: ProgrammeId[]): SkillCombinationDefinition[] {
  if (completedProgrammes.length < 2) return [];
  
  const dualCombos = SKILL_COMBINATIONS.filter(combo => 
    combo.programmes.every(p => completedProgrammes.includes(p))
  );
  
  const advancedCombos = ADVANCED_COMBINATIONS.filter(combo =>
    combo.programmes.every(p => completedProgrammes.includes(p))
  );
  
  return [...dualCombos, ...advancedCombos];
}

export function getSuggestedNextProgramme(completedProgrammes: ProgrammeId[]): {
  programmeId: ProgrammeId;
  unlocksCount: number;
  unlocks: string[];
}[] {
  if (completedProgrammes.length === 0) return [];
  
  const allProgrammes: ProgrammeId[] = Object.keys(PROGRAMME_INFO) as ProgrammeId[];
  const notCompleted = allProgrammes.filter(p => !completedProgrammes.includes(p));
  
  const suggestions = notCompleted.map(programmeId => {
    const hypotheticalCompleted = [...completedProgrammes, programmeId];
    const newCombos = getAvailableCombinations(hypotheticalCompleted).filter(
      combo => !getAvailableCombinations(completedProgrammes).find(c => c.id === combo.id)
    );
    
    return {
      programmeId,
      unlocksCount: newCombos.length,
      unlocks: newCombos.map(c => c.name)
    };
  });
  
  return suggestions
    .filter(s => s.unlocksCount > 0)
    .sort((a, b) => b.unlocksCount - a.unlocksCount);
}

export function calculatePotentialRevenue(
  completedProgrammes: ProgrammeId[],
  baseMonthlyRevenue: number
): number {
  const combinations = getAvailableCombinations(completedProgrammes);
  
  if (combinations.length === 0) {
    return baseMonthlyRevenue;
  }
  
  const highestMultiplier = Math.max(...combinations.map(c => c.revenueMultiplier));
  return baseMonthlyRevenue * highestMultiplier;
}

// ============================================
// WORKSHOP TO SKILL MAPPING
// ============================================

export const WORKSHOP_SKILLS: Record<ProgrammeId, {
  workshopNumber: number;
  title: string;
  skillsLearned: string[];
  canSellAfter: string[];
}[]> = {
  'trubble-n-bass': [
    { workshopNumber: 1, title: 'DAW Basics', skillsLearned: ['DAW navigation', 'Basic arrangement'], canSellAfter: [] },
    { workshopNumber: 2, title: 'Drum Programming', skillsLearned: ['Drum patterns', '808s', 'Hi-hats'], canSellAfter: ['Drum loops', 'Drum kits'] },
    { workshopNumber: 3, title: 'Melody Creation', skillsLearned: ['Melodies', 'Hooks', 'MIDI'], canSellAfter: ['MIDI packs', 'Melody loops'] },
    { workshopNumber: 4, title: 'Arrangement', skillsLearned: ['Song structure', 'Transitions'], canSellAfter: ['Full beats'] },
    { workshopNumber: 5, title: 'Mixing Basics', skillsLearned: ['EQ', 'Compression', 'Levels'], canSellAfter: ['Mixed beats', 'Mixing presets'] },
    { workshopNumber: 6, title: 'Release Ready', skillsLearned: ['Mastering basics', 'Export', 'Licensing'], canSellAfter: ['All music products', 'Production services'] }
  ],
  'silk-stilettos': [
    { workshopNumber: 1, title: 'Design Fundamentals', skillsLearned: ['Sketching', 'Design principles'], canSellAfter: [] },
    { workshopNumber: 2, title: 'Pattern Making', skillsLearned: ['Basic patterns', 'Measurements'], canSellAfter: ['Simple patterns'] },
    { workshopNumber: 3, title: 'Construction', skillsLearned: ['Sewing', 'Finishing'], canSellAfter: ['Accessories', 'Simple items'] },
    { workshopNumber: 4, title: 'Styling', skillsLearned: ['Colour theory', 'Personal style'], canSellAfter: ['Style guides', 'Consultations'] },
    { workshopNumber: 5, title: 'Collection Building', skillsLearned: ['Range planning', 'Cohesion'], canSellAfter: ['Collections', 'Lookbooks'] },
    { workshopNumber: 6, title: 'Fashion Business', skillsLearned: ['Pricing', 'Marketing', 'Sales'], canSellAfter: ['All fashion products/services'] }
  ],
  'techreneurs': [
    { workshopNumber: 1, title: 'Web Fundamentals', skillsLearned: ['HTML', 'CSS basics'], canSellAfter: [] },
    { workshopNumber: 2, title: 'Responsive Design', skillsLearned: ['Mobile-first', 'Layouts'], canSellAfter: ['Landing pages'] },
    { workshopNumber: 3, title: 'JavaScript Basics', skillsLearned: ['Interactivity', 'DOM'], canSellAfter: ['Interactive pages'] },
    { workshopNumber: 4, title: 'React Introduction', skillsLearned: ['Components', 'State'], canSellAfter: ['Simple web apps'] },
    { workshopNumber: 5, title: 'Backend Basics', skillsLearned: ['APIs', 'Databases'], canSellAfter: ['Full-stack apps'] },
    { workshopNumber: 6, title: 'Deployment', skillsLearned: ['Hosting', 'Domains'], canSellAfter: ['Website builds'] },
    { workshopNumber: 7, title: 'Advanced Features', skillsLearned: ['Auth', 'Payments'], canSellAfter: ['E-commerce sites'] },
    { workshopNumber: 8, title: 'Business Launch', skillsLearned: ['Client work', 'Pricing'], canSellAfter: ['All tech products/services'] }
  ],
  'gtechcasters': [
    { workshopNumber: 1, title: 'Audio Basics', skillsLearned: ['Recording', 'Microphone technique'], canSellAfter: [] },
    { workshopNumber: 2, title: 'Podcast Planning', skillsLearned: ['Format', 'Content planning'], canSellAfter: ['Show notes'] },
    { workshopNumber: 3, title: 'Recording', skillsLearned: ['Remote recording', 'Editing basics'], canSellAfter: ['Basic editing'] },
    { workshopNumber: 4, title: 'Post-Production', skillsLearned: ['Advanced editing', 'Sound design'], canSellAfter: ['Podcast editing service'] },
    { workshopNumber: 5, title: 'Distribution', skillsLearned: ['Platforms', 'RSS', 'Marketing'], canSellAfter: ['Distribution setup'] },
    { workshopNumber: 6, title: 'Monetisation', skillsLearned: ['Sponsorship', 'Premium content'], canSellAfter: ['All audio products/services'] }
  ],
  'kaywanas-court': [
    { workshopNumber: 1, title: 'Stage Presence', skillsLearned: ['Confidence', 'Projection'], canSellAfter: [] },
    { workshopNumber: 2, title: 'Voice & Movement', skillsLearned: ['Voice control', 'Physicality'], canSellAfter: [] },
    { workshopNumber: 3, title: 'MC Fundamentals', skillsLearned: ['Hosting', 'Crowd work'], canSellAfter: ['Small event hosting'] },
    { workshopNumber: 4, title: 'Script & Improvisation', skillsLearned: ['Writing', 'Thinking on feet'], canSellAfter: ['Script writing', 'MC work'] },
    { workshopNumber: 5, title: 'Workshop Facilitation', skillsLearned: ['Teaching', 'Engagement'], canSellAfter: ['Workshop facilitation'] },
    { workshopNumber: 6, title: 'Professional Performance', skillsLearned: ['Business', 'Contracts'], canSellAfter: ['All performance services'] }
  ],
  'pageturners': [
    { workshopNumber: 1, title: 'Writing Foundations', skillsLearned: ['Clarity', 'Structure'], canSellAfter: [] },
    { workshopNumber: 2, title: 'Content Types', skillsLearned: ['Blogs', 'Articles', 'Copy'], canSellAfter: ['Blog posts'] },
    { workshopNumber: 3, title: 'Editing', skillsLearned: ['Self-editing', 'Proofreading'], canSellAfter: ['Proofreading'] },
    { workshopNumber: 4, title: 'Long-Form', skillsLearned: ['E-books', 'Guides'], canSellAfter: ['E-books', 'Guides'] },
    { workshopNumber: 5, title: 'Publishing', skillsLearned: ['Platforms', 'Formatting'], canSellAfter: ['Publishing services'] },
    { workshopNumber: 6, title: 'Content Business', skillsLearned: ['Client work', 'Pricing'], canSellAfter: ['All writing services'] }
  ],
  'stemgeneers': [
    { workshopNumber: 1, title: 'STEM Fundamentals', skillsLearned: ['Core concepts', 'Teaching methods'], canSellAfter: [] },
    { workshopNumber: 2, title: 'Lesson Planning', skillsLearned: ['Curriculum', 'Objectives'], canSellAfter: ['Lesson plans'] },
    { workshopNumber: 3, title: 'Hands-On Activities', skillsLearned: ['Experiments', 'Projects'], canSellAfter: ['Activity kits'] },
    { workshopNumber: 4, title: 'Assessment', skillsLearned: ['Testing', 'Progress tracking'], canSellAfter: ['Assessment tools'] },
    { workshopNumber: 5, title: 'Group Facilitation', skillsLearned: ['Classroom management', 'Engagement'], canSellAfter: ['Group tutoring', 'Workshops'] },
    { workshopNumber: 6, title: 'STEM Business', skillsLearned: ['Marketing', 'Partnerships'], canSellAfter: ['All STEM services'] }
  ],
  'scrap-cat': [
    { workshopNumber: 1, title: 'Materials Knowledge', skillsLearned: ['Material types', 'Sourcing'], canSellAfter: [] },
    { workshopNumber: 2, title: 'Repair Basics', skillsLearned: ['Common repairs', 'Tools'], canSellAfter: ['Basic repairs'] },
    { workshopNumber: 3, title: 'Furniture Restoration', skillsLearned: ['Stripping', 'Refinishing'], canSellAfter: ['Furniture restoration'] },
    { workshopNumber: 4, title: 'Upcycling Techniques', skillsLearned: ['Transformation', 'Creativity'], canSellAfter: ['Upcycled items'] },
    { workshopNumber: 5, title: 'Workshop Running', skillsLearned: ['Teaching', 'Safety'], canSellAfter: ['Workshops'] },
    { workshopNumber: 6, title: 'Sustainable Business', skillsLearned: ['Pricing', 'Marketing'], canSellAfter: ['All restoration services'] }
  ],
  'bright-sparks': [
    { workshopNumber: 1, title: 'Youth Work Basics', skillsLearned: ['Safeguarding', 'Engagement'], canSellAfter: [] },
    { workshopNumber: 2, title: 'Activity Planning', skillsLearned: ['Age-appropriate', 'Learning outcomes'], canSellAfter: ['Activity plans'] },
    { workshopNumber: 3, title: 'Facilitation', skillsLearned: ['Group management', 'Behaviour'], canSellAfter: ['Assisted sessions'] },
    { workshopNumber: 4, title: 'Programme Design', skillsLearned: ['Curriculum', 'Progression'], canSellAfter: ['Programme design'] },
    { workshopNumber: 5, title: 'Events & Parties', skillsLearned: ['Entertainment', 'Party hosting'], canSellAfter: ['Party hosting', 'Events'] },
    { workshopNumber: 6, title: 'Youth Business', skillsLearned: ['Contracts', 'Insurance', 'Marketing'], canSellAfter: ['All youth services'] }
  ],
  'auntie-anansis-kitchen': [
    { workshopNumber: 1, title: 'Kitchen Fundamentals', skillsLearned: ['Safety', 'Hygiene', 'Basics'], canSellAfter: [] },
    { workshopNumber: 2, title: 'Recipe Development', skillsLearned: ['Creating', 'Testing', 'Documenting'], canSellAfter: ['Recipes'] },
    { workshopNumber: 3, title: 'Cooking Techniques', skillsLearned: ['Methods', 'Cuisines'], canSellAfter: ['Basic cooking classes'] },
    { workshopNumber: 4, title: 'Batch Cooking', skillsLearned: ['Scaling', 'Meal prep'], canSellAfter: ['Meal prep service'] },
    { workshopNumber: 5, title: 'Catering Basics', skillsLearned: ['Events', 'Planning', 'Service'], canSellAfter: ['Small catering'] },
    { workshopNumber: 6, title: 'Food Business', skillsLearned: ['Licensing', 'Pricing', 'Marketing'], canSellAfter: ['All food services'] }
  ]
};

// ============================================
// EXPORT
// ============================================

export default {
  PROGRAMME_INFO,
  SINGLE_PROGRAMME_PRODUCTS,
  SKILL_COMBINATIONS,
  ADVANCED_COMBINATIONS,
  WORKSHOP_SKILLS,
  getProgrammeInfo,
  getSingleProgrammeProducts,
  getAvailableCombinations,
  getSuggestedNextProgramme,
  calculatePotentialRevenue
};