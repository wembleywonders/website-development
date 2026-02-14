// src/config/sandboxConfig.ts

export interface SandboxConfig {
  slug: string;
  name: string;
  icon: string;
  title: string;
  subtitle: string;
  primaryColor: string;
  secondaryColor: string;
  ctaTitle: string;
  ctaDescription: string;
  primaryCtaText: string;
  ctaNote?: string;
}

export const SANDBOX_CONFIGS: Record<string, SandboxConfig> = {
  stemgeneers: {
    slug: 'stemgeneers',
    name: 'STEMgeneers',
    icon: '🤖',
    title: 'Technical Builder',
    subtitle: 'Build speaker boxes, design circuits, understand the physics behind everything. Create something that actually works—and understand why.',
    primaryColor: '#3b82f6',
    secondaryColor: '#06b6d4',
    ctaTitle: 'Ready to build for real?',
    ctaDescription: 'STEMgeneers gives you workshop space, tools, mentors like Uncle Winston, and projects that solve real community problems. Plus earn £200-£600/month through tech services.',
    primaryCtaText: 'Join STEMgeneers',
    ctaNote: 'Ages 11-25 • Workshop access • Tools & materials included',
  },

  techreneurs: {
    slug: 'techreneurs',
    name: 'TECHreneurs',
    icon: '💼',
    title: 'Business Planner',
    subtitle: 'Turn your skills into income. Build a lean canvas, pitch your ideas, validate with real customers. We help you price, market, and earn.',
    primaryColor: '#10b981',
    secondaryColor: '#3b82f6',
    ctaTitle: 'Ready to launch your business?',
    ctaDescription: 'TECHreneurs connects you with business mentors, helps you test ideas with real customers, and provides pathways to earn £100-£400/month while learning.',
    primaryCtaText: 'Join TECHreneurs',
    ctaNote: 'Ages 13-25 • Business mentorship • Real revenue opportunities',
  },

  gtechcasters: {
    slug: 'gtechcasters',
    name: 'G-Tech Casters',
    icon: '🎙️',
    title: 'Podcast Creator',
    subtitle: 'Plan episodes, develop your voice, tell stories that matter. From concept to published podcast—learn production, editing, and storytelling.',
    primaryColor: '#f59e0b',
    secondaryColor: '#ec4899',
    ctaTitle: 'Ready to start your podcast?',
    ctaDescription: 'G-Tech Casters gives you studio access, equipment training, editorial guidance, and publishing support. Earn £150-£400/month through sponsored content and community commissions.',
    primaryCtaText: 'Join G-Tech Casters',
    ctaNote: 'Ages 13-25 • Studio access • Professional equipment',
  },

  kaywanas: {
    slug: 'kaywanas-court',
    name: "Kaywana's Court",
    icon: '🎭',
    title: 'Production Planner',
    subtitle: 'Plan theatre productions, coordinate community performances, preserve cultural stories. From script to stage—make theatre that matters.',
    primaryColor: '#a855f7',
    secondaryColor: '#db2777',
    ctaTitle: 'Ready to create theatre?',
    ctaDescription: "Kaywana's Court provides rehearsal space, production support, costume/set resources, and connects you to community performances. Earn £150-£500/month through shows and cultural preservation work.",
    primaryCtaText: "Join Kaywana's Court",
    ctaNote: 'Ages 11-25 • Performance opportunities • Cultural preservation',
  },

  pageturners: {
    slug: 'pageturners',
    name: 'Pageturners',
    icon: '📖',
    title: 'Story Starter',
    subtitle: 'Write stories, document lives, publish your work. From first draft to published article—develop your voice and tell stories that need telling.',
    primaryColor: '#06b6d4',
    secondaryColor: '#3b82f6',
    ctaTitle: 'Ready to publish your stories?',
    ctaDescription: 'Pageturners connects you with writing mentors, editorial support, and publishing opportunities through Joystick. Earn £100-£350/month through freelance writing and community journalism.',
    primaryCtaText: 'Join Pageturners',
    ctaNote: 'Ages 11-25 • Publishing support • Editorial mentorship',
  },

  'trubble-n-bass': {
    slug: 'trubble-n-bass',
    name: 'Trubble n Bass',
    icon: '🎵',
    title: 'Beat Builder',
    subtitle: 'Make beats, produce tracks, develop your sound. From bedroom producer to published artist—learn production, mixing, and performance.',
    primaryColor: '#ec4899',
    secondaryColor: '#a855f7',
    ctaTitle: 'Ready to make music?',
    ctaDescription: 'Trubble n Bass gives you studio time, production software, mentorship, and performance opportunities. Earn £200-£700/month through beats, performances, and teaching.',
    primaryCtaText: 'Join Trubble n Bass',
    ctaNote: 'Ages 11-25 • Studio access • Production software included',
  },

  'silk-stilettos': {
    slug: 'silk-stilettos',
    name: 'Silk Stilettos',
    icon: '👠',
    title: 'Creative Pathways Planner',
    subtitle: 'Discover how your creative skills connect to multiple earning streams. From jewelry to theatre costumes, from workshops to exhibitions—one skill, many pathways.',
    primaryColor: '#db2777',
    secondaryColor: '#ec4899',
    ctaTitle: 'Ready to explore your pathways?',
    ctaDescription: 'Silk Stilettos (women-only) provides studio space, materials support, sisterhood mentorship, and connects your creativity to earning opportunities across our entire ecosystem.',
    primaryCtaText: 'Join Silk Stilettos',
    ctaNote: 'Women-only • All skill levels • Studio access & materials',
  },

  'auntie-anansis-kitchen': {
    slug: 'auntie-anansis-kitchen',
    name: "Auntie Anansi's Kitchen",
    icon: '🍲',
    title: 'Recipe Heritage Keeper',
    subtitle: 'Preserve Caribbean recipes, document family traditions, learn ancestral techniques. Your kitchen is a classroom—and your heritage is the curriculum.',
    primaryColor: '#f59e0b',
    secondaryColor: '#10b981',
    ctaTitle: 'Ready to preserve your heritage?',
    ctaDescription: "Auntie Anansi's Kitchen connects you with elders, provides kitchen access for traditional cooking, and helps document recipes for future generations. Earn through community catering and cultural preservation projects.",
    primaryCtaText: "Join Auntie Anansi's Kitchen",
    ctaNote: 'Ages 11-25 • Kitchen access • Elder mentorship',
  },

  'bright-sparks': {
    slug: 'bright-sparks',
    name: 'Bright Sparks',
    icon: '⚡',
    title: 'Spark Discovery Journey',
    subtitle: 'Try ALL our programmes in one transformative summer. Discover what ignites you, build real projects, earn while learning. For observers and reactors who see what needs fixing.',
    primaryColor: '#f59e0b',
    secondaryColor: '#ec4899',
    ctaTitle: 'Ready for your discovery summer?',
    ctaDescription: 'Bright Sparks Summer 2026: 8 weeks trying all programmes, discovering your spark, building community impact projects. Earn £200-£800/month through year-round pathways after summer.',
    primaryCtaText: 'Apply for Summer 2026',
    ctaNote: 'Ages 13-16 • Summer intensive • Subsidized places available',
  },

  'scrap-cat': {
    slug: 'scrap-cat',
    name: 'Scrap Cat',
    icon: '🔧',
    title: 'Upcycle Builder',
    subtitle: 'Turn waste into value. Fix broken things, hack electronics, create from salvage. E-waste becomes art, furniture, tech—and income.',
    primaryColor: '#f59e0b',
    secondaryColor: '#10b981',
    ctaTitle: 'Ready to turn trash into treasure?',
    ctaDescription: 'Scrap Cat provides workshop space, salvage materials, repair training, and connects you to upcycling markets. Earn £150-£500/month through repairs, custom builds, and teaching workshops.',
    primaryCtaText: 'Join Scrap Cat',
    ctaNote: 'Ages 11-25 • Repair skills • Sustainability focus',
  },
};
