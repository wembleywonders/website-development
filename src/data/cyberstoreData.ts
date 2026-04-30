// ============================================================
// src/data/cyberstoreData.ts
// Wembley Wonders Cyberstore — Provenance Market
// ============================================================
// Every item carries:
//   - maker's story
//   - cultural lineage
//   - programme provenance
//   - 55/25/20 split visible per product
// ============================================================

export interface ProvenanceRecord {
  maker:      string;           // who made it
  origin:     string;           // where the knowledge came from
  lineage:    string;           // cultural lineage
  programme:  string;           // which programme produced it
  developed:  string;           // how long it took
  archive?:   string;           // Knowledge Commons reference
}

export interface CyberstoreProduct {
  id:          string;
  name:        string;
  category:    string;
  subcategory: string;
  description: string;
  price:       number;
  unit:        string;          // 'download', 'pack', 'item', 'bundle'
  tags:        string[];
  provenance:  ProvenanceRecord;
  creatorShare: number;         // always 55
  status:      'available' | 'coming-soon' | 'limited';
  featured?:   boolean;
}

export interface CyberstoreCategory {
  id:          string;
  name:        string;
  icon:        string;
  colour:      string;
  tagline:     string;
  description: string;
  programme?:  string;          // primary feeding programme
  subcategories: string[];
}

// ── Categories ────────────────────────────────────────────

export const CATEGORIES: CyberstoreCategory[] = [
  {
    id:          'food-heritage',
    name:        'Food & Heritage',
    icon:        '🍲',
    colour:      '#f59e0b',
    tagline:     'The recipe is the record.',
    description: 'Documented, tested, attributed. Every item carries the family story and the cultural lineage that produced it. Not just what to cook — why it matters.',
    programme:   "Auntie Anansi's Kitchen",
    subcategories: ['Recipe Packs', 'Spice Blends', 'Preserved Foods', 'Heritage Guides'],
  },
  {
    id:          'textiles-fashion',
    name:        'Textiles & Fashion',
    icon:        '👗',
    colour:      '#ec4899',
    tagline:     'Worn knowledge.',
    description: 'Hand-crafted garments, accessories and textiles carrying the cultural intelligence of their makers. African print, protective styles, jewellery — each piece documented.',
    programme:   'Silk Stilettos',
    subcategories: ['Garments', 'Accessories', 'Jewellery', 'Headwraps & Styling'],
  },
  {
    id:          'music-audio',
    name:        'Music & Audio',
    icon:        '🎵',
    colour:      '#a855f7',
    tagline:     'The sound that carries the story.',
    description: 'Beat packs, samples, recordings, cultural music guides. The lineage of lovers rock, the sociology of grime, the history of dancehall — documented and priced properly.',
    programme:   'Trubble n Bass',
    subcategories: ['Beat Packs', 'Sample Libraries', 'Radio Drama', 'Cultural Music Guides'],
  },
  {
    id:          'written-works',
    name:        'Written Works',
    icon:        '✍️',
    colour:      '#8b5cf6',
    tagline:     'The word that stays.',
    description: 'Poetry, oral history, cultural guides, community chronicles. Every written work attributed, archived, and priced to sustain the writer who produced it.',
    programme:   'Pageturners',
    subcategories: ['Poetry & Fiction', 'Oral History', 'Cultural Guides', 'Joystick Archive'],
  },
  {
    id:          'digital-tech',
    name:        'Digital & Tech',
    icon:        '💻',
    colour:      '#3b82f6',
    tagline:     'Code with provenance.',
    description: 'App templates, design assets, educational tools, digital art. Technology built by community hands, documented to the same standard as any physical craft.',
    programme:   'TECHreneurs',
    subcategories: ['App Templates', 'Design Assets', 'Educational Tools', 'Digital Art'],
  },
  {
    id:          'visual-art',
    name:        'Visual Art & Print',
    icon:        '🎨',
    colour:      '#06b6d4',
    tagline:     'The image that witnesses.',
    description: 'Prints, illustrations, heritage maps, missing plaques as art objects. Visual work that carries cultural memory — the Wembley geography, the Black Atlantic routes, the faces that deserved blue plaques.',
    subcategories: ['Prints & Illustrations', 'Heritage Maps', 'Photography', 'Missing Plaques'],
  },
  {
    id:          'educational',
    name:        'Educational Resources',
    icon:        '📚',
    colour:      '#10b981',
    tagline:     'The curriculum they didn\'t write.',
    description: 'Workshop guides, facilitation packs, cultural literacy supplements. The knowledge the mainstream curriculum left out — documented, attributed, ready to teach.',
    subcategories: ['Workshop Guides', 'Facilitation Packs', 'Cultural Literacy', 'Heritage Profiles'],
  },
  {
    id:          'performance',
    name:        'Performance & Drama',
    icon:        '🎭',
    colour:      '#f97316',
    tagline:     'The story performed is the story preserved.',
    description: 'Scripts, performance rights, audio drama recordings, debate frameworks. From Kaywana\'s Court debates to Easy Street radio dramas — the cultural performance tradition documented.',
    programme:   "Kaywana's Court",
    subcategories: ['Scripts', 'Audio Drama', 'Debate Frameworks', 'Performance Rights'],
  },
  {
    id:          'wellness',
    name:        'Wellness & Body Sovereignty',
    icon:        '🌿',
    colour:      '#4A6741',
    tagline:     'The knowledge that should have been handed down.',
    description: 'Hair care, natural remedies, body sovereignty education. The science and the cultural knowledge together — chemical literacy, ingredient provenance, legal rights.',
    programme:   'Roots',
    subcategories: ['Hair Care Kits', 'Natural Remedies', 'Body Sovereignty Guides', 'Chemical Literacy'],
  },
  {
    id:          'craft-making',
    name:        'Craft & Making',
    icon:        '⚡',
    colour:      '#14b8a6',
    tagline:     'The maker\'s hand documented.',
    description: 'Repair guides, electronics kits, upcycled homeware, cultural craft patterns. The practical knowledge of the hands — Caribbean woodwork, West African weaving, South Asian embroidery.',
    programme:   'STEMgeneers',
    subcategories: ['Repair Guides', 'Electronics Kits', 'Cultural Craft Patterns', 'Making Guides'],
  },
  {
    id:          'knowledge-commons',
    name:        'Knowledge Commons Archive',
    icon:        '🗃️',
    colour:      '#d4a853',
    tagline:     'The counter-archive, priced for permanence.',
    description: 'Heritage packs, pioneer profiles, deep-dive threads as longform PDFs. The oral history collection. The institutional map of post-colonial London. The record that the official record missed.',
    subcategories: ['Heritage Packs', 'Pioneer Profiles', 'Deep-Dive Threads', 'Oral History Collection'],
  },
];

// ── Sample products (seed data — expand as creators submit) ──

export const PRODUCTS: CyberstoreProduct[] = [
  {
    id:          'anansi-rum-cake-pack',
    name:        'Caribbean Rum Cake — Heritage Recipe Pack',
    category:    'food-heritage',
    subcategory: 'Recipe Packs',
    description: 'Three generations of rum cake tradition from Trinidad and Barbados, documented with ingredient provenance, technique notes, and the family histories that produced them. Tested and attributed.',
    price:       8.50,
    unit:        'download',
    tags:        ['Caribbean', 'baking', 'heritage', 'Trinidad', 'Barbados'],
    provenance: {
      maker:     'Auntie Anansi\'s Kitchen collective',
      origin:    'Trinidad and Barbados, via Wembley High Road',
      lineage:   'Caribbean baking tradition, documented three generations',
      programme: "Auntie Anansi's Kitchen",
      developed: '6 weeks testing and documentation',
      archive:   'Knowledge Commons — Caribbean Food Heritage thread',
    },
    creatorShare: 55,
    status:      'available',
    featured:    true,
  },
  {
    id:          'pepper-sauce-heritage',
    name:        'Scotch Bonnet Heritage Sauce — Recipe & Culture Pack',
    category:    'food-heritage',
    subcategory: 'Recipe Packs',
    description: 'The complete pepper sauce tradition — recipes, Scoville science, the history of hot sauce in Caribbean cuisine, and guidance on commercial production. More than a recipe. A cultural document.',
    price:       7.00,
    unit:        'download',
    tags:        ['Caribbean', 'hot sauce', 'condiments', 'food science'],
    provenance: {
      maker:     'Auntie Anansi\'s Kitchen collective',
      origin:    'Jamaica and Trinidad, documented on the High Road',
      lineage:   'Caribbean condiment tradition',
      programme: "Auntie Anansi's Kitchen",
      developed: '4 weeks',
    },
    creatorShare: 55,
    status:      'available',
  },
  {
    id:          'grime-beat-pack-vol1',
    name:        'East London Grime — Beat Pack Vol. 1',
    category:    'music-audio',
    subcategory: 'Beat Packs',
    description: '12 original grime instrumentals with stems and MIDI. Liner notes documenting the sonic lineage — from UK garage through early grime to the contemporary sound. Royalty-free for non-commercial use.',
    price:       15.00,
    unit:        'download',
    tags:        ['grime', 'beats', 'UK music', 'instrumental'],
    provenance: {
      maker:     'Trubble n Bass programme — cohort 1',
      origin:    'East London via Wembley, 2024–2025',
      lineage:   'UK Garage → Grime lineage, documented',
      programme: 'Trubble n Bass',
      developed: '8 weeks production',
      archive:   'Knowledge Commons — Black Atlantic Music Lineages',
    },
    creatorShare: 55,
    status:      'available',
    featured:    true,
  },
  {
    id:          'lovers-rock-guide',
    name:        'Lovers Rock — A Cultural History',
    category:    'music-audio',
    subcategory: 'Cultural Music Guides',
    description: 'The complete cultural history of lovers rock — from its 1970s South London origins through its influence on contemporary R&B. Documented with interviews, liner notes, and the community memories that the mainstream music press never recorded.',
    price:       12.00,
    unit:        'download',
    tags:        ['lovers rock', 'reggae', 'Black British music', 'history'],
    provenance: {
      maker:     'G-Tech Casters research collective',
      origin:    'South London, 1970s–present',
      lineage:   'British reggae tradition',
      programme: 'G-Tech Casters',
      developed: '12 weeks research and documentation',
      archive:   'Knowledge Commons — Black Atlantic Music Lineages',
    },
    creatorShare: 55,
    status:      'available',
  },
  {
    id:          'arthur-wharton-profile',
    name:        'Arthur Wharton — Pioneer Profile Pack',
    category:    'knowledge-commons',
    subcategory: 'Pioneer Profiles',
    description: 'The complete documented life of Arthur Wharton — Britain\'s first Black professional footballer and world sprint champion. Illustrated profile, timeline, teaching notes, and the campaign for his blue plaque. For schools, community groups, and anyone who should have been told about him already.',
    price:       5.00,
    unit:        'download',
    tags:        ['Arthur Wharton', 'Black British history', 'football', 'education'],
    provenance: {
      maker:     'Wembley Wonders Knowledge Commons',
      origin:    'Documented from primary sources',
      lineage:   'Black British heritage',
      programme: 'Heritage Discovery',
      developed: '3 weeks research',
      archive:   'Knowledge Commons — Missing Plaques series',
    },
    creatorShare: 55,
    status:      'available',
    featured:    true,
  },
  {
    id:          'body-sovereignty-hair-guide',
    name:        'Hair Science & Body Sovereignty — Complete Guide',
    category:    'wellness',
    subcategory: 'Body Sovereignty Guides',
    description: 'The knowledge that should have been handed down. Hair science for textured hair, chemical ingredient literacy, legal rights regarding hair discrimination, and the Apothecary pathway for building a natural hair care practice.',
    price:       14.00,
    unit:        'download',
    tags:        ['hair care', 'body sovereignty', 'natural hair', 'legal rights'],
    provenance: {
      maker:     'Roots programme — Judith Fontanelle, Flora Agba, Natalie',
      origin:    'Women-led, women-directed, women-managed',
      lineage:   'African and Caribbean hair care tradition',
      programme: 'Roots',
      developed: 'IWD 2026 launch cohort',
      archive:   'Knowledge Commons — Body Sovereignty Archive',
    },
    creatorShare: 55,
    status:      'available',
    featured:    true,
  },
  {
    id:          'wembley-heritage-map',
    name:        'Wembley Cultural Geography — Heritage Map Print',
    category:    'visual-art',
    subcategory: 'Heritage Maps',
    description: 'A documented map of Wembley\'s cultural geography — the 148 communities, the migration routes, the community institutions, the High Road as cultural corridor. A4 print-ready PDF with accompanying cultural notes.',
    price:       10.00,
    unit:        'download',
    tags:        ['Wembley', 'heritage', 'map', 'cultural geography'],
    provenance: {
      maker:     'Wembley Wonders Knowledge Commons',
      origin:    'Wembley, 1924–present',
      lineage:   'Post-colonial London geography',
      programme: 'Heritage Discovery',
      developed: '6 weeks research and design',
      archive:   'Knowledge Commons — Wembley Ground thread',
    },
    creatorShare: 55,
    status:      'coming-soon',
  },
  {
    id:          'kaywanas-debate-framework',
    name:        "Kaywana's Court — Community Debate Framework",
    category:    'performance',
    subcategory: 'Debate Frameworks',
    description: 'The complete Kaywana\'s Court facilitation framework — roles, rules, preparation guides, scoring, and the cultural context that makes structured debate a community practice rather than an elite exercise.',
    price:       18.00,
    unit:        'download',
    tags:        ['debate', 'facilitation', 'community', 'performance'],
    provenance: {
      maker:     "Kaywana's Court programme",
      origin:    'Wembley Wonders CIC, 2022–present',
      lineage:   'Caribbean oral tradition meets British legal form',
      programme: "Kaywana's Court",
      developed: '3 programme cohorts',
    },
    creatorShare: 55,
    status:      'available',
  },
];

// ── Helper functions ──────────────────────────────────────

export const getCategory = (id: string) =>
  CATEGORIES.find(c => c.id === id);

export const getProductsByCategory = (categoryId: string) =>
  PRODUCTS.filter(p => p.category === categoryId);

export const getFeaturedProducts = () =>
  PRODUCTS.filter(p => p.featured);

export const getAvailableProducts = () =>
  PRODUCTS.filter(p => p.status === 'available');

export const searchProducts = (query: string) => {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.provenance.lineage.toLowerCase().includes(q)
  );
};
