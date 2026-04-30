// STEMgeneers Curriculum Data
// Wembley Wonders CIC — Community Knowledge + STEM
// All content connects: household activity → science → community knowledge → periodic table → repository

export type ProgressionLevel = 'explorer' | 'investigator' | 'analyst' | 'challenger' | 'architect';
export type SubjectArea =
  | 'biology'
  | 'chemistry'
  | 'physics'
  | 'mathematics'
  | 'earth-science'
  | 'astronomy'
  | 'computing'
  | 'engineering'
  | 'history-of-science'
  | 'health-community';

export type KeyStage = 'KS2' | 'KS3' | 'KS4' | 'post16';
export type FacilitationRole = 'maya' | 'parent' | 'teacher' | 'knowledge-holder';

export interface PeriodicTableElement {
  symbol: string;
  name: string;
  atomicNumber: number;
  group: number;
  period: number;
  relevance: string;
}

export interface CommunityKnowledgeConnection {
  tradition: string; // e.g. 'West African', 'Caribbean', 'South Asian'
  practice: string;
  mechanism: string; // the science underneath the practice
  repositoryPrompt: string; // what to document
}

export interface HouseholdExperiment {
  title: string;
  materials: string[]; // only household items
  procedure: string[];
  expectedOutcome: string;
  scienceExplained: string;
  ageAdaptation: {
    younger: string; // 11-13
    older: string;   // 14-16
  };
}

export interface FamilyActivity {
  prompt: string;
  who: string[]; // e.g. ['child', 'grandparent', 'siblings']
  output: string; // what gets produced
  repositoryEntry: boolean;
}

export interface Module {
  id: string;
  title: string;
  tagline: string; // the hook question or statement
  subjectAreas: SubjectArea[];
  keyStages: KeyStage[];
  progressionLevels: ProgressionLevel[];
  duration: 20 | 7; // minutes — either a full module or closing segment
  fiveCs: ('Connect' | 'Create' | 'Change' | 'Challenge' | 'Control')[];
  periodicElements: PeriodicTableElement[];
  communityKnowledge: CommunityKnowledgeConnection[];
  householdExperiment: HouseholdExperiment | null;
  familyActivity: FamilyActivity;
  crossPollination: string[]; // threads into other domains
  wrongObviousAnswer?: string; // the intuitive answer that is wrong or insufficient
  realAnswer: string; // the scientific answer
  mayaOpeningFrame: string; // how Maya introduces this module
  retrievalPrompt: string; // the consolidation question
  repositoryTask: string; // what the participant contributes
  ncAlignment: string[]; // national curriculum references
}

export interface SessionPlan {
  id: string;
  title: string;
  subtitle: string;
  totalDuration: 95;
  modules: string[]; // module IDs in sequence
  sessionObjective: string;
  mayaClosingFrame: string;
  platformOutputs: string[];
  homeschoolingEvidence: string[];
}

export interface ProgressionLevelSpec {
  id: ProgressionLevel;
  name: string;
  ageRange: string;
  keyStage: string;
  descriptor: string;
  assessmentCriteria: {
    foundation: string;
    core: string;
    extension: string;
  };
  outputFormat: string;
}

// ─── PERIODIC TABLE ELEMENTS referenced in curriculum ──────────────────────

const ELEMENTS: Record<string, PeriodicTableElement> = {
  H:  { symbol: 'H',  name: 'Hydrogen',   atomicNumber: 1,  group: 1,  period: 1, relevance: 'Water molecule, organic chemistry, hydrogen bonding' },
  C:  { symbol: 'C',  name: 'Carbon',     atomicNumber: 6,  group: 14, period: 2, relevance: 'Foundation of all organic molecules, terpenes, wax chains' },
  N:  { symbol: 'N',  name: 'Nitrogen',   atomicNumber: 7,  group: 15, period: 2, relevance: 'Alkaloids, neurotransmitters, amino acids, pharmacology' },
  O:  { symbol: 'O',  name: 'Oxygen',     atomicNumber: 8,  group: 16, period: 2, relevance: 'Combustion, respiration, flavonoids, water, ester bonds' },
  Na: { symbol: 'Na', name: 'Sodium',     atomicNumber: 11, group: 1,  period: 3, relevance: 'Ionic bonding in salt, salivary electrolyte, nerve signals' },
  Mg: { symbol: 'Mg', name: 'Magnesium',  atomicNumber: 12, group: 2,  period: 3, relevance: 'Chlorophyll centre, enzyme cofactor, green plant colour' },
  S:  { symbol: 'S',  name: 'Sulphur',    atomicNumber: 16, group: 16, period: 3, relevance: 'Keratin disulphide bonds, onion chemistry, garlic antimicrobials' },
  Cl: { symbol: 'Cl', name: 'Chlorine',   atomicNumber: 17, group: 17, period: 3, relevance: 'Ionic bonding in salt (NaCl), disinfection, nerve signals' },
  Ca: { symbol: 'Ca', name: 'Calcium',    atomicNumber: 20, group: 2,  period: 4, relevance: 'Bone mineral, tooth enamel, eggshell, salivary electrolyte' },
  Fe: { symbol: 'Fe', name: 'Iron',       atomicNumber: 26, group: 8,  period: 4, relevance: 'Haemoglobin, bruise colour change, shoe polish pigment, catalysis' },
  Cu: { symbol: 'Cu', name: 'Copper',     atomicNumber: 29, group: 11, period: 4, relevance: 'Electrical conductivity, enzyme cofactor, antifungal activity' },
  Zn: { symbol: 'Zn', name: 'Zinc',       atomicNumber: 30, group: 12, period: 4, relevance: 'Enzyme cofactor, immune function, wound healing, traditional remedies' },
  Se: { symbol: 'Se', name: 'Selenium',   atomicNumber: 34, group: 16, period: 4, relevance: 'Antioxidant enzymes, Brazil nuts, selenocysteine in proteins' },
  Ag: { symbol: 'Ag', name: 'Silver',     atomicNumber: 47, group: 11, period: 5, relevance: 'Touchscreen conductive fibres, mirrors, antimicrobial coatings' },
  Hg: { symbol: 'Hg', name: 'Mercury',    atomicNumber: 80, group: 12, period: 6, relevance: 'Methylmercury in fish, neurotoxicity, sulphur binding, Minamata' },
  Au: { symbol: 'Au', name: 'Gold',       atomicNumber: 79, group: 11, period: 6, relevance: 'James Webb telescope mirrors, infrared reflectivity, corrosion resistance' },
  F:  { symbol: 'F',  name: 'Fluorine',   atomicNumber: 9,  group: 17, period: 2, relevance: 'Toothpaste fluoride, tooth enamel hardening, most electronegative element' },
  Si: { symbol: 'Si', name: 'Silicon',    atomicNumber: 14, group: 14, period: 3, relevance: 'Toothpaste abrasive, computer chips, beach sand, glass' },
  P:  { symbol: 'P',  name: 'Phosphorus', atomicNumber: 15, group: 15, period: 3, relevance: 'Cell membranes, DNA backbone, enzyme inhibition of iron absorption' },
  K:  { symbol: 'K',  name: 'Potassium',  atomicNumber: 19, group: 1,  period: 4, relevance: 'Nerve signals, salivary electrolyte, plant nutrition, banana' },
};

// ─── COMMUNITY KNOWLEDGE CONNECTIONS ───────────────────────────────────────

const COMMUNITY_KNOWLEDGE: Record<string, CommunityKnowledgeConnection[]> = {
  herbalism: [
    {
      tradition: 'West African',
      practice: 'Bitter kola (Garcinia kola) after meals — alkaloid compounds',
      mechanism: 'Alkaloids contain nitrogen (Group 15) giving pharmacological activity via receptor binding',
      repositoryPrompt: 'Document your family\'s use of bitter kola — when, how prepared, what for. This is prior art.',
    },
    {
      tradition: 'Caribbean',
      practice: 'Cerasee/bitter melon tea — flavonoid compounds',
      mechanism: 'Flavonoids (C, H, O only) are two-ring structures with antioxidant and hypoglycaemic activity',
      repositoryPrompt: 'Document the preparation of cerasee in your family — boiling time, quantity, frequency. Document it as a scientific protocol.',
    },
    {
      tradition: 'South Asian',
      practice: 'Turmeric in ghee or oil — curcumin bioavailability',
      mechanism: 'Curcumin is fat-soluble; phospholipids in ghee increase gut absorption dramatically',
      repositoryPrompt: 'How does your family use turmeric? Fresh or dried? With what fat? This cooking knowledge is pharmacological optimisation.',
    },
    {
      tradition: 'West African / Caribbean',
      practice: 'Guinea hen weed (Petiveria alliacea) — sulphur terpenes',
      mechanism: 'Sulphur-containing terpene derivatives (Group 16) with documented anti-inflammatory activity',
      repositoryPrompt: 'Document guinea hen weed use in your family. The sulphur compounds are the mechanism — describe the smell, the preparation, the use.',
    },
  ],
  food: [
    {
      tradition: 'West African',
      practice: 'Red palm oil in cooking — beta-carotene and retinol',
      mechanism: 'Red palm oil contains both preformed vitamin A (retinol) and beta-carotene — dual vitamin A sources',
      repositoryPrompt: 'Does your family use red palm oil? What dishes? How has that changed from your grandparents\' cooking? This is dietary vitamin A history.',
    },
    {
      tradition: 'Caribbean',
      practice: 'Pumpkin soup, rice, and stew — beta-carotene staple',
      mechanism: 'Orange-fleshed pumpkin — tetraterpene beta-carotene — provitamin A converted in intestinal wall',
      repositoryPrompt: 'Document your family\'s pumpkin recipe. What variety? How often eaten? Compare generations.',
    },
    {
      tradition: 'West African',
      practice: 'Fermented locust beans (iru/dawadawa) — probiotic and umami',
      mechanism: 'Bacillus subtilis fermentation produces vitamin K2, free amino acids, and bioactive peptides',
      repositoryPrompt: 'Document the preparation or purchase of iru in your family. What dishes is it used in? This is traditional microbiome science.',
    },
  ],
  preservation: [
    {
      tradition: 'Caribbean / West African',
      practice: 'Salt fish preservation — osmotic dehydration',
      mechanism: 'High salt concentration draws water from cells by osmosis; high-salinity environment prevents bacterial growth',
      repositoryPrompt: 'How does your family prepare salt fish? What species? Desalting method? This is applied microbiology and physical chemistry.',
    },
  ],
  hair: [
    {
      tradition: 'West African / Caribbean',
      practice: 'Shea butter for type 4 hair — oleic and stearic acid sealing',
      mechanism: 'Long-chain fatty acids form a film over the cuticle, reducing moisture loss from the hair shaft',
      repositoryPrompt: 'What hair products does your family use? What are the ingredients? Connect each to a molecular function.',
    },
    {
      tradition: 'South Asian',
      practice: 'Coconut oil pre-wash treatment — lauric acid penetration',
      mechanism: 'Lauric acid (small molecular weight, linear structure) penetrates the hair cortex and reduces protein loss during washing',
      repositoryPrompt: 'How does your family use coconut oil for hair? How long left in? Documented scientific protocols for traditional hair care belong in the repository.',
    },
  ],
  navigation: [
    {
      tradition: 'Polynesian',
      practice: 'Wayfinding — stars, ocean swells, bird behaviour',
      mechanism: 'Celestial mechanics, wave refraction physics, biological environmental sensing',
      repositoryPrompt: 'What navigational knowledge does your family\'s tradition hold? Star names? Wind patterns? Ocean signs?',
    },
    {
      tradition: 'West African maritime',
      practice: 'Dugout canoe design — specific wood selection for density',
      mechanism: 'Wood density < 1 g/cm³ ensures buoyancy; specific species chosen for density, durability, and workability',
      repositoryPrompt: 'Does your family\'s origin community have traditional boat or water knowledge? Document it.',
    },
  ],
};

// ─── MODULES ────────────────────────────────────────────────────────────────

export const MODULES: Record<string, Module> = {

  // ── SESSION 1: GLOBAL HISTORY OF STEM ─────────────────────────────────

  's1-m1-image': {
    id: 's1-m1-image',
    title: 'The image in your head',
    tagline: 'When you think of a scientist — who do you picture?',
    subjectAreas: ['history-of-science'],
    keyStages: ['KS2', 'KS3', 'KS4'],
    progressionLevels: ['explorer', 'investigator', 'analyst', 'challenger'],
    duration: 20,
    fiveCs: ['Connect'],
    periodicElements: [],
    communityKnowledge: [],
    householdExperiment: null,
    familyActivity: {
      prompt: 'Ask every person in your home: when you picture a scientist, who do you see? Write down their answers. Then look at what you notice about the pattern.',
      who: ['child', 'parent', 'grandparent', 'siblings'],
      output: 'A family survey of whose image of science carries whose assumptions',
      repositoryEntry: false,
    },
    crossPollination: ['sociology', 'media-literacy', 'history'],
    wrongObviousAnswer: undefined,
    realAnswer: 'The image most people hold of a scientist is the product of a curriculum built by specific institutions with specific interests — not a neutral reflection of who actually built scientific knowledge.',
    mayaOpeningFrame: 'Before we start — I want to ask you something. When you think about science, who do you picture? Take five seconds. Don\'t overthink it. Just whoever comes to mind. Hold that image. By the end of today, that image is going to get a lot more complicated — and a lot more interesting.',
    retrievalPrompt: 'Name one scientist you\'d never heard of before today, and one thing they did that you now can\'t unknow.',
    repositoryTask: 'Post one piece of knowledge from your family or community that isn\'t in any textbook. Could be a remedy, a technique, a practice, a saying that contains practical wisdom.',
    ncAlignment: ['KS3 History — understanding the nature of historical evidence', 'KS3 English — evaluating sources and perspectives'],
  },

  's1-m2-gap': {
    id: 's1-m2-gap',
    title: 'The 700 missing years',
    tagline: 'Where did scientific knowledge go between Greece and the Renaissance?',
    subjectAreas: ['history-of-science', 'mathematics', 'biology'],
    keyStages: ['KS3', 'KS4'],
    progressionLevels: ['investigator', 'analyst', 'challenger'],
    duration: 20,
    fiveCs: ['Connect', 'Change'],
    periodicElements: [],
    communityKnowledge: [],
    householdExperiment: null,
    familyActivity: {
      prompt: 'Find the word "algorithm" in any tech context around your home — phone settings, a recipe app, anything. Show your family. Tell them whose name is in that word and what he did.',
      who: ['child', 'parent'],
      output: 'A family moment of recognition — Al-Khwarizmi is in the word you use every day',
      repositoryEntry: false,
    },
    crossPollination: ['mathematics', 'astronomy', 'medicine', 'optics', 'history'],
    realAnswer: 'The House of Wisdom in Baghdad — scholars from across the known world — preserved, translated, and substantially advanced Greek knowledge across every discipline. The Renaissance was a European encounter with what Islamic scholarship had built, not a European recovery of something lost.',
    mayaOpeningFrame: 'The standard story of science has a gap in it. Ancient Greece — brilliant. Then roughly 700 years of almost nothing in Europe. Then suddenly the Renaissance. Where was knowledge going during those 700 years? Let\'s find it.',
    retrievalPrompt: 'Complete this sentence in your own words: "The word algorithm exists because..." — without looking at your notes.',
    repositoryTask: 'Research one invention or discovery from the Islamic Golden Age that connects to something you use every day. Document the chain: Baghdad → medieval transmission → modern use.',
    ncAlignment: [
      'KS3 Science — the nature and development of scientific knowledge',
      'KS3 History — the significance of key individuals in world history',
      'KS3 Mathematics — historical development of number systems',
    ],
  },

  's1-m3-breakout': {
    id: 's1-m3-breakout',
    title: 'The knowledge map',
    tagline: 'Your phone is older than you think',
    subjectAreas: ['history-of-science', 'mathematics', 'computing', 'engineering'],
    keyStages: ['KS3', 'KS4'],
    progressionLevels: ['investigator', 'analyst', 'challenger'],
    duration: 20,
    fiveCs: ['Create', 'Connect'],
    periodicElements: [],
    communityKnowledge: [],
    householdExperiment: {
      title: 'The knowledge chain investigation',
      materials: ['A smartphone or any device', 'Paper and pen'],
      procedure: [
        'Pick one thing you did on your phone today',
        'Trace back: what technology makes it possible?',
        'What mathematics underlies that technology?',
        'Who developed that mathematics, when, and where?',
        'Draw the chain from your activity back through history',
      ],
      expectedOutcome: 'A chain that runs through multiple continents and centuries',
      scienceExplained: 'Every modern technology sits on centuries of accumulated mathematical and scientific knowledge from multiple cultural traditions',
      ageAdaptation: {
        younger: 'Focus on one simple chain — texting → digital signal → binary code → zero → India, 7th century CE',
        older: 'Map the full technological stack — processor → quantum mechanics → atomic theory → Islamic/European chemistry → Indian mathematics → Chinese paper and printing',
      },
    },
    familyActivity: {
      prompt: 'Pick the food your family ate most recently. Trace where each ingredient originated — not the shop, but the civilisation that first cultivated it. Draw a world map of your meal.',
      who: ['whole family'],
      output: 'A meal origin map — showing that every table is a global knowledge inheritance',
      repositoryEntry: true,
    },
    crossPollination: ['mathematics', 'history', 'geography', 'computing', 'food-science'],
    realAnswer: 'The device in your hand runs on: algorithms (Al-Khwarizmi, Baghdad), zero (Brahmagupta, India), decimal notation (Hindu-Arabic transmission), paper (Cai Lun, China), optics (Ibn al-Haytham, Cairo). It is a global knowledge inheritance.',
    mayaOpeningFrame: 'In your breakout rooms you have 12 minutes. Each room takes one knowledge tradition. Find one specific thing your tradition contributed to something you used today. Not a general claim — a specific thing.',
    retrievalPrompt: 'Name one thing in this room right now that wouldn\'t exist without a non-European knowledge tradition. Explain the connection.',
    repositoryTask: 'Document one knowledge chain from your breakout room research. Format it as: [tradition] → [discovery/invention] → [mechanism of transmission] → [modern application].',
    ncAlignment: [
      'KS3/4 Computing — computational thinking and algorithms',
      'KS3 Mathematics — historical context of number systems',
      'KS3/4 Science — the development of scientific knowledge across cultures',
    ],
  },

  's1-m4-kitchen': {
    id: 's1-m4-kitchen',
    title: 'The knowledge in your kitchen',
    tagline: 'Your grandmother knew which plants worked. You can know why.',
    subjectAreas: ['biology', 'chemistry', 'history-of-science', 'health-community'],
    keyStages: ['KS2', 'KS3', 'KS4'],
    progressionLevels: ['explorer', 'investigator', 'analyst', 'challenger'],
    duration: 20,
    fiveCs: ['Connect', 'Change'],
    periodicElements: [ELEMENTS.C, ELEMENTS.H, ELEMENTS.O, ELEMENTS.N],
    communityKnowledge: COMMUNITY_KNOWLEDGE.herbalism,
    householdExperiment: null,
    familyActivity: {
      prompt: 'Tonight\'s dinner — everyone at the table names one ingredient and says where their family comes from. Then look up together whether that ingredient originated near that same region. What\'s on your plate that travelled the same route your family did?',
      who: ['whole family'],
      output: 'A family food-heritage map connecting dinner to diaspora history',
      repositoryEntry: true,
    },
    crossPollination: ['botany', 'pharmacology', 'history', 'cultural-heritage', 'chemistry'],
    realAnswer: 'The knowledge your family carries about plants, foods, and remedies is empirical science — tested across generations of human use, transmitted through disciplined practice. It has mechanism. It has pharmacology. It belongs in the repository alongside the published literature.',
    mayaOpeningFrame: 'During the break I asked you to think about one thing someone in your family knows how to do that you\'ve never seen in a textbook. Let\'s start there. What did you come up with?',
    retrievalPrompt: 'Name one thing your family knows about food or plants and state one scientific concept that explains why it works.',
    repositoryTask: 'Document one piece of family knowledge from this session — what it is, who holds it, how it\'s used, and your best hypothesis about the science underneath. This is your first repository entry.',
    ncAlignment: [
      'KS3 Science — cells, organisms, and ecosystems',
      'KS3 Science — chemical reactions and everyday chemistry',
      'KS3/4 Biology — health, disease, and drugs',
    ],
  },

  's1-m5-close': {
    id: 's1-m5-close',
    title: 'What we\'re building — and why you\'re the ones to build it',
    tagline: 'The knowledge stayed with the people it belongs to.',
    subjectAreas: ['history-of-science', 'computing', 'health-community'],
    keyStages: ['KS3', 'KS4'],
    progressionLevels: ['investigator', 'analyst', 'challenger', 'architect'],
    duration: 7,
    fiveCs: ['Control'],
    periodicElements: [],
    communityKnowledge: [],
    householdExperiment: null,
    familyActivity: {
      prompt: 'Share this session\'s platform task with your family: post one piece of knowledge from your community that isn\'t written down anywhere. Everyone in the family can contribute — each entry is named and attributed.',
      who: ['whole family'],
      output: 'Multiple family repository entries — each attributed to the knowledge holder',
      repositoryEntry: true,
    },
    crossPollination: ['all'],
    realAnswer: 'The community knowledge repository is the infrastructure that needs to exist before the crisis — not improvised during it. Every family activity, every platform submission, every module completed is infrastructure built now.',
    mayaOpeningFrame: 'Here\'s what we know now. The knowledge that built the modern world came from everywhere. Most of it was taken without credit. Some of it is still sitting in your kitchen. And right now — other people are beginning to notice it\'s there. So here\'s the question STEMgeneers is going to spend the next months answering: what happens if your community documents it first?',
    retrievalPrompt: 'In one sentence: what is the STEMgeneers repository for — and why does it matter that it\'s community-owned?',
    repositoryTask: 'Your first complete repository entry — traditional knowledge + your hypothesis about the science + the name of the knowledge holder in your family.',
    ncAlignment: [
      'KS3/4 Computing — data, privacy, and digital ethics',
      'KS4 Citizenship — rights, communities, and institutions',
    ],
  },

  // ── SESSION 2: TRADITIONAL HERBALISM + PERIODIC TABLE ──────────────────

  's2-m1-plant': {
    id: 's2-m1-plant',
    title: 'The plant arrives',
    tagline: 'Before we look at what\'s in it — what do you already know about it?',
    subjectAreas: ['biology', 'chemistry'],
    keyStages: ['KS2', 'KS3', 'KS4'],
    progressionLevels: ['explorer', 'investigator', 'analyst', 'challenger'],
    duration: 20,
    fiveCs: ['Connect'],
    periodicElements: [ELEMENTS.C, ELEMENTS.H, ELEMENTS.O, ELEMENTS.N, ELEMENTS.S],
    communityKnowledge: COMMUNITY_KNOWLEDGE.herbalism,
    householdExperiment: {
      title: 'Sensory phytochemical detection',
      materials: ['Any plant from kitchen or garden', 'Paper and pen'],
      procedure: [
        'Choose any plant — from the kitchen cupboard, the windowsill, the garden',
        'Observe: what colour is it?',
        'Smell: what does it smell like?',
        'Taste carefully: is it bitter, sweet, sour, spicy, or bland?',
        'Record your observations precisely',
        'Hypothesis: based on the taste and smell, what compound family might be present?',
      ],
      expectedOutcome: 'Understanding that sensory properties are chemical signals: bitter → likely alkaloids, strong smell → likely terpenes, bright colour → likely flavonoids',
      scienceExplained: 'The grandmother\'s nose is a phytochemical detector. Bitter taste signals alkaloids (nitrogen-containing). Strong volatile smell signals terpenes (carbon-hydrogen building blocks). Bright colour signals flavonoids (two-ring C-H-O structures). The sensory experience IS the chemistry, made accessible.',
      ageAdaptation: {
        younger: 'Focus on the three sensory signals — bitter=alkaloids, smell=terpenes, colour=flavonoids. Draw and describe one plant.',
        older: 'Research the specific compound identified in your plant. Find the molecular formula. Count the atoms. Identify which elements. Map to the periodic table.',
      },
    },
    familyActivity: {
      prompt: 'Bring one plant from your home — from the garden, the kitchen, the windowsill. It doesn\'t need to be medicinal. Apply the sensory detection method together as a family. What does the taste/smell/colour suggest about what\'s inside it?',
      who: ['child', 'parent', 'grandparent'],
      output: 'Family plant sensory analysis — the beginning of the ethnobotanical survey',
      repositoryEntry: true,
    },
    crossPollination: ['chemistry', 'biology', 'cultural-heritage', 'pharmacology'],
    realAnswer: 'Plants communicate their chemistry through taste, smell, and colour. Every compound family has a sensory signature that traditional knowledge holders learned to read — and that modern phytochemistry validates.',
    mayaOpeningFrame: 'This is the plant. Before we look at what\'s in it — what do you already know about it? Has anyone in your family used it? For what? What does it taste like? What does it smell like? Because those sensory qualities are your first clue to the chemistry.',
    retrievalPrompt: 'Name the three compound families and the sensory signal for each. Which element makes alkaloids pharmacologically active?',
    repositoryTask: 'Document one plant from your home: its name (common and Latin if possible), its sensory properties, your family\'s traditional use, and your hypothesis about which compound family is responsible.',
    ncAlignment: [
      'KS3 Chemistry — atomic structure and the periodic table',
      'KS3 Biology — the role of compounds in organisms',
      'KS4 Chemistry — organic chemistry — functional groups',
    ],
  },

  's2-m2-alkaloids': {
    id: 's2-m2-alkaloids',
    title: 'Alkaloids — nitrogen\'s pharmacological power',
    tagline: 'Why does bitter kola work? Because of nitrogen, Group 15.',
    subjectAreas: ['chemistry', 'biology', 'history-of-science'],
    keyStages: ['KS3', 'KS4'],
    progressionLevels: ['investigator', 'analyst', 'challenger'],
    duration: 20,
    fiveCs: ['Create', 'Change'],
    periodicElements: [ELEMENTS.N, ELEMENTS.C, ELEMENTS.H, ELEMENTS.O],
    communityKnowledge: [COMMUNITY_KNOWLEDGE.herbalism[0]],
    householdExperiment: {
      title: 'The bitter taste alkaloid test',
      materials: ['Coffee', 'Tea', 'Dark chocolate', 'Tonic water', 'Paper and pen'],
      procedure: [
        'Taste each substance carefully',
        'Rate bitterness on a scale of 1-10',
        'Record: coffee (caffeine), tea (tannins + caffeine), dark chocolate (theobromine), tonic water (quinine)',
        'All are alkaloids — all contain nitrogen in a ring structure',
        'Research: which of these was used as a medicine before it was a drink?',
      ],
      expectedOutcome: 'Recognition that alkaloids are a compound family defined by nitrogen, not by a single effect — they include stimulants, medicines, and poisons',
      scienceExplained: 'Alkaloids contain nitrogen in their molecular structure. Nitrogen\'s five valence electrons allow it to donate an electron pair, which is why alkaloids interact strongly with biological receptors. Caffeine blocks adenosine receptors. Quinine interferes with malaria parasite enzyme function. The same element, different molecular architecture, completely different effect.',
      ageAdaptation: {
        younger: 'Focus on the nitrogen = pharmacological activity rule. One element, in a ring structure, makes compounds that do things to your body.',
        older: 'Draw the nitrogen position in the caffeine molecule. Explain electron donation and receptor binding. Why does quinine block the malaria parasite\'s ability to detoxify haem?',
      },
    },
    familyActivity: {
      prompt: 'Find three bitter foods or drinks in your home. Research each one — what alkaloid does it contain? What was its original medicinal use? What culture first used it? Who brought it to Britain?',
      who: ['child', 'parent'],
      output: 'A bitter foods alkaloid map — tracing pharmacology through the family kitchen',
      repositoryEntry: true,
    },
    crossPollination: ['chemistry', 'pharmacology', 'history', 'medicine', 'colonialism'],
    realAnswer: 'Alkaloids are defined by nitrogen in a ring structure. Nitrogen (Group 15, Period 2) has five valence electrons that allow electron pair donation — this is why alkaloids bind to biological receptors so effectively. The bitter taste is the receptor on your tongue detecting that binding capacity.',
    mayaOpeningFrame: 'Every alkaloid on this list — caffeine, quinine, morphine, cocaine, nicotine, the compounds in bitter kola — has nitrogen in its molecular structure. And nitrogen is right here on the periodic table, Group 15, Period 2. Let me show you why that position explains everything.',
    retrievalPrompt: 'Why do alkaloids have pharmacological activity? Answer using the words: nitrogen, valence electrons, electron donation, receptor binding.',
    repositoryTask: 'Document one alkaloid-containing plant from your family\'s tradition. Record: the plant name, the traditional use, the alkaloid (if known), and the periodic table element responsible for its activity.',
    ncAlignment: [
      'KS4 Chemistry — organic chemistry, functional groups, nitrogen compounds',
      'KS4 Biology — drugs and their effects on the body',
      'KS3 Chemistry — the periodic table — groups and properties',
    ],
  },

  's2-m3-flavonoids': {
    id: 's2-m3-flavonoids',
    title: 'Flavonoids — the organic chemistry trio',
    tagline: 'Three elements. Six thousand compounds. The colour of everything.',
    subjectAreas: ['chemistry', 'biology', 'health-community'],
    keyStages: ['KS3', 'KS4'],
    progressionLevels: ['investigator', 'analyst', 'challenger'],
    duration: 20,
    fiveCs: ['Create', 'Connect'],
    periodicElements: [ELEMENTS.C, ELEMENTS.H, ELEMENTS.O],
    communityKnowledge: [
      { tradition: 'Caribbean', practice: 'Hibiscus sorrel/zobo — anthocyanin-rich', mechanism: 'Anthocyanins inhibit ACE enzyme — same mechanism as pharmaceutical blood pressure medication', repositoryPrompt: 'How does your family prepare hibiscus/sorrel? How concentrated? How often? This is traditional antihypertensive medicine.' },
      { tradition: 'South Asian / West African', practice: 'Turmeric — curcumin', mechanism: 'Curcumin inhibits inflammatory enzymes (COX-2, LOX) through its beta-diketone structure', repositoryPrompt: 'How does your family use turmeric? Fresh root or dried powder? In what cooking? Document the dose and frequency.' },
    ],
    householdExperiment: {
      title: 'Red cabbage flavonoid pH indicator',
      materials: ['Red cabbage', 'Water', 'Vinegar', 'Bicarbonate of soda', 'Various household liquids'],
      procedure: [
        'Boil red cabbage until water turns deep purple — the anthocyanins have dissolved',
        'Divide into several glasses',
        'Add vinegar to one → red/pink (acidic)',
        'Add bicarbonate to one → green/yellow (alkaline)',
        'Test: lemon juice, milk, soap solution, water',
        'Record colour and infer pH',
      ],
      expectedOutcome: 'A complete pH indicator from a kitchen vegetable — demonstrating that anthocyanins (flavonoids) change colour with pH because their molecular structure responds to proton concentration',
      scienceExplained: 'The colour change is driven by protons — H+ ions — binding to or leaving the anthocyanin molecule. This changes the electron distribution in the two-ring structure, which changes which wavelengths of light are absorbed. The chemistry is C, H, O only — but the behaviour is exquisitely sensitive to one of the simplest particles: a proton.',
      ageAdaptation: {
        younger: 'Focus on the colour changes as a tool — test as many household substances as possible and build a colour-pH chart.',
        older: 'Explain the mechanism: why does proton concentration affect colour? Connect to the concept of molecular orbital energy levels and light absorption.',
      },
    },
    familyActivity: {
      prompt: 'Make the red cabbage indicator together. Test every liquid in your kitchen. Create a colour-coded pH map of your household chemistry. Which foods are acidic, which are alkaline, which are neutral?',
      who: ['whole family', 'especially younger children'],
      output: 'A household pH map — acid-base chemistry made visible through a vegetable',
      repositoryEntry: false,
    },
    crossPollination: ['chemistry', 'nutrition', 'medicine', 'traditional-knowledge', 'colour-physics'],
    realAnswer: 'Flavonoids are built from carbon, hydrogen, and oxygen only — two benzene rings connected by a three-carbon bridge. Over 6,000 compounds from three elements. Their colour, their antioxidant activity, their antimicrobial properties, their anthocyanin pH sensitivity — all from C, H, O arranged in that two-ring architecture.',
    mayaOpeningFrame: 'Three elements. Just three. Carbon, hydrogen, oxygen. Groups 14, 1, and 16 on the periodic table. And from just those three elements, arranged in a specific two-ring structure, nature has built over six thousand compounds responsible for most of the colour and antioxidant activity in everything you eat.',
    retrievalPrompt: 'What are the three elements in flavonoids? What determines the colour of an anthocyanin? What does hibiscus tea do to blood pressure and why?',
    repositoryTask: 'Document one flavonoid-rich plant or food from your family\'s tradition. Note its colour (which suggests which flavonoid subclass), its traditional use, and any known health associations.',
    ncAlignment: [
      'KS4 Chemistry — organic chemistry, aromatic compounds',
      'KS3 Chemistry — acids, bases, and indicators',
      'KS4 Biology — diet, nutrition, and health',
    ],
  },

  's2-m4-terpenes': {
    id: 's2-m4-terpenes',
    title: 'Terpenes — the isoprene building block',
    tagline: 'From your grandmother\'s eucalyptus steam to the malaria cure that won a Nobel Prize.',
    subjectAreas: ['chemistry', 'biology', 'history-of-science'],
    keyStages: ['KS3', 'KS4'],
    progressionLevels: ['analyst', 'challenger'],
    duration: 20,
    fiveCs: ['Change', 'Challenge'],
    periodicElements: [ELEMENTS.C, ELEMENTS.H],
    communityKnowledge: [
      { tradition: 'West African / Caribbean', practice: 'Eucalyptus steam inhalation for congestion', mechanism: '1,8-cineole monoterpene — bronchodilator, mucolytic, antimicrobial delivered directly to respiratory epithelium', repositoryPrompt: 'How does your family do the steam treatment? What plants are used? How long? This is a drug delivery system — document the protocol.' },
      { tradition: 'West African / Middle Eastern', practice: 'Frankincense (Boswellia) — boswellic acids', mechanism: 'Triterpene acids inhibit 5-lipoxygenase — anti-inflammatory activity superior to NSAIDs for some conditions', repositoryPrompt: 'Does your family use frankincense? For what? How? Document the use.' },
    ],
    householdExperiment: {
      title: 'Terpene extraction — steam distillation from fresh herbs',
      materials: ['Fresh herbs — mint, rosemary, or any aromatic plant', 'Pot with lid', 'Bowl of ice'],
      procedure: [
        'Place herbs in a pot with water',
        'Bring to gentle simmer',
        'Hold a cold bowl or plate over the steam',
        'Watch condensation form — the water-terpene vapour condenses',
        'Smell the condensate — concentrated terpene aroma',
        'This is steam distillation — the principle behind essential oil production',
      ],
      expectedOutcome: 'Visible demonstration that terpenes are volatile — they evaporate with steam and can be condensed. This is the principle behind perfume, essential oil production, and steam inhalation therapy.',
      scienceExplained: 'Terpenes are built from isoprene units (C5H8). They are hydrophobic — attracted to oil, repelled by water. But they are also volatile — they have significant vapour pressure at room temperature or just above it. This is why aromatic plants smell, and why steam inhalation delivers terpenes to the respiratory tract.',
      ageAdaptation: {
        younger: 'Focus on the smell — what does the condensate smell like? Where does the smell come from? What are terpenes?',
        older: 'Explain volatility in terms of intermolecular forces. Why are small terpenes more volatile than large ones? Calculate the number of isoprene units in menthol, artemisinin, and beta-carotene.',
      },
    },
    familyActivity: {
      prompt: 'Count how many aromatic plants, oils, or terpene-containing products are in your home right now — herbs, spices, cleaning products, toiletries. List them. Identify what terpene is responsible for each smell. This is your household terpene inventory.',
      who: ['child', 'siblings'],
      output: 'A household terpene inventory — mapping the chemistry of smell in your home',
      repositoryEntry: true,
    },
    crossPollination: ['chemistry', 'pharmacology', 'engineering', 'climate-ecology'],
    realAnswer: 'Terpenes are built from the five-carbon isoprene unit (C5H8). Nature stacks copies of this unit — 2 for monoterpenes, 3 for sesquiterpenes, 8 for beta-carotene, 6 for sterols. Same building block, different number and arrangement — and completely different biological effects. Artemisinin — the front-line malaria treatment that won Tu Youyou the Nobel Prize — is a sesquiterpene.',
    mayaOpeningFrame: 'Nature has one building block for this entire compound family. Five carbons. Eight hydrogens. That\'s it. C5H8 — isoprene. Stack two copies and you get menthol. Stack three and you get artemisinin — the malaria treatment that saved millions of lives and won a Nobel Prize. Stack eight and you get beta-carotene, which becomes vitamin A, which makes vision possible.',
    retrievalPrompt: 'What is the isoprene unit? How many are in a sesquiterpene? Name one sesquiterpene and its biological activity.',
    repositoryTask: 'Document one terpene-containing plant from your family\'s tradition. What does it smell like? What is it used for? Has any member of the family ever used steam or heat to intensify its effect?',
    ncAlignment: [
      'KS4 Chemistry — organic chemistry, hydrocarbons, isomers',
      'KS4 Biology — drugs, disease, and the human body',
      'KS3 Chemistry — properties of different substances',
    ],
  },

  's2-m5-repository': {
    id: 's2-m5-repository',
    title: 'The repository — and what your grandmother\'s knowledge is worth',
    tagline: 'Prior art documented in scientific language is stronger prior art.',
    subjectAreas: ['computing', 'history-of-science', 'health-community'],
    keyStages: ['KS3', 'KS4', 'post16'],
    progressionLevels: ['analyst', 'challenger', 'architect'],
    duration: 7,
    fiveCs: ['Control'],
    periodicElements: [],
    communityKnowledge: [],
    householdExperiment: null,
    familyActivity: {
      prompt: 'Complete your family\'s plant documentation as a scientific protocol. Include: plant name (common + Latin), sensory properties, compound family hypothesis, traditional preparation method, dose and frequency, who taught whom, and how far back the knowledge goes.',
      who: ['child', 'parent', 'grandparent'],
      output: 'A complete scientific protocol for a traditional plant use — the format that establishes prior art',
      repositoryEntry: true,
    },
    crossPollination: ['law', 'economics', 'computing', 'chemistry'],
    realAnswer: 'The Hoodia case (San people, South Africa), the neem patent revocation, the turmeric wound-healing patent challenge — all were won or partially won using prior art documented in formats that patent offices recognise. Your family\'s knowledge, documented with the plant\'s Latin name, the compound family, the preparation method, and the date — is prior art that can protect against biopiracy.',
    mayaOpeningFrame: 'What your grandmother knows about this plant — that it works, when to use it, how to prepare it — that knowledge is real. The chemistry we just looked at is the mechanism underneath it. And now you can document both. Because prior art documented in scientific language is the only thing that stands between a patent office and someone claiming your family\'s knowledge as their invention.',
    retrievalPrompt: 'What is prior art? Name one biopiracy case where prior art documentation made a difference. What format should traditional knowledge take to be recognised as prior art?',
    repositoryTask: 'Your complete Module 2 repository entry: one plant, documented as a scientific protocol, with compound family, periodic table elements, traditional use, knowledge holder named and dated.',
    ncAlignment: [
      'KS4 Computing — data, intellectual property, and ethics',
      'KS4 Citizenship — law, rights, and communities',
    ],
  },

  // ── HOUSEHOLD SCIENCE MODULES ───────────────────────────────────────────

  'hs-rubber-duck': {
    id: 'hs-rubber-duck',
    title: 'Why can\'t rubber ducks sink?',
    tagline: 'Archimedes ran naked through the streets about this.',
    subjectAreas: ['physics', 'mathematics', 'engineering'],
    keyStages: ['KS2', 'KS3', 'KS4'],
    progressionLevels: ['explorer', 'investigator', 'analyst'],
    duration: 20,
    fiveCs: ['Connect', 'Create'],
    periodicElements: [ELEMENTS.H, ELEMENTS.O],
    communityKnowledge: COMMUNITY_KNOWLEDGE.navigation,
    householdExperiment: {
      title: 'Float and sink investigation',
      materials: ['Basin of water', 'Assorted household objects', 'Salt', 'Aluminium foil', 'A raw egg'],
      procedure: [
        'Predict: float or sink? Test each object',
        'The tangerine test: float with skin, sink without — why?',
        'The foil boat: same mass, different volume — floats when shaped into a hull',
        'The egg in salt water: add salt progressively until the egg floats',
        'The Cartesian diver: ketchup packet in a sealed water bottle — squeeze to sink, release to rise',
      ],
      expectedOutcome: 'Understanding that floating depends on average density, not just material — and that density can be changed by shape (foil boat), by water composition (salt), or by pressure (Cartesian diver)',
      scienceExplained: 'Archimedes\' Principle: upward buoyant force = weight of fluid displaced. A rubber duck displaces more water weight than it weighs — because it\'s mostly air wearing a rubber coat. The rubber is denser than water (1.5 g/cm³ vs 1.0 g/cm³) but air is essentially nothing (0.0012 g/cm³). Average density = below 1. Floats.',
      ageAdaptation: {
        younger: 'Focus on the tangerine and the foil boat. What changed? Only the shape. The shape changed the volume of water displaced without changing the mass.',
        older: 'Calculate: if the rubber shell has volume 50cm³ and the air space has volume 450cm³, what is the average density? What is the minimum air space needed to float? This is naval architecture.',
      },
    },
    familyActivity: {
      prompt: 'Research the traditional watercraft from your family\'s origin community. What material? What shape? What design features make it stable? Apply Archimedes\' principle to explain why the traditional design works. Document it.',
      who: ['child', 'parent', 'grandparent'],
      output: 'Traditional watercraft analysis as applied fluid mechanics — engineering knowledge from the family\'s origin culture',
      repositoryEntry: true,
    },
    crossPollination: ['physics', 'engineering', 'history', 'geology', 'climate-ocean-circulation'],
    wrongObviousAnswer: 'Because rubber is light.',
    realAnswer: 'Because the average density of the rubber duck system — rubber shell plus air interior — is less than the density of water. The buoyant force (weight of water displaced) exceeds the duck\'s weight. Archimedes\' Principle, stated 250 BCE. The same principle floats steel ships, submarines, and hot air balloons.',
    mayaOpeningFrame: 'Why can\'t this sink? Take a moment — what\'s your answer? Good. Now I want to show you why that answer, while not wrong, is missing the most interesting part. And that interesting part connects to the Windrush, to ocean circulation, to submarine engineering, and to the man who reportedly ran naked through the streets of Syracuse in 250 BCE.',
    retrievalPrompt: 'State Archimedes\' Principle in your own words. Explain why a steel ship floats using that principle. What is the average density of a rubber duck?',
    repositoryTask: 'Document one traditional water-related practice, vessel, or knowledge from your family\'s origin community. Apply Archimedes\' Principle to explain the physics of the design.',
    ncAlignment: [
      'KS3 Physics — forces — pressure in fluids, upthrust',
      'KS3/4 Physics — density and pressure',
      'KS4 Physics — Archimedes\' Principle',
    ],
  },

  'hs-wrinkly-fingers': {
    id: 'hs-wrinkly-fingers',
    title: 'Why do fingers go wrinkly in the bath?',
    tagline: 'The textbook answer is wrong. The real answer is evolutionary biology.',
    subjectAreas: ['biology', 'physics', 'engineering'],
    keyStages: ['KS3', 'KS4'],
    progressionLevels: ['investigator', 'analyst', 'challenger'],
    duration: 20,
    fiveCs: ['Connect', 'Change'],
    periodicElements: [ELEMENTS.N, ELEMENTS.C, ELEMENTS.H, ELEMENTS.O],
    communityKnowledge: [
      { tradition: 'West African / Caribbean', practice: 'Traditional skin care — shea butter, coconut oil, aloe vera', mechanism: 'Fatty acids coat keratin protein in the stratum corneum, reducing transepidermal water loss', repositoryPrompt: 'What skin care practices does your family use? What are the ingredients? Connect to skin biology.' },
    ],
    householdExperiment: {
      title: 'The wrinkling experiment',
      materials: ['Basin of warm water', 'Timer', 'Paper and pen'],
      procedure: [
        'Submerge one hand in warm water',
        'Record exactly when wrinkling begins (typically 3-5 minutes)',
        'Compare: does the same happen in cold water? How quickly?',
        'After wrinkling — test grip on a wet glass vs dry glass',
        'Time how long wrinkles take to disappear after removing hand',
        'Compare wrinkling patterns across family members of different ages',
      ],
      expectedOutcome: 'Documentation of wrinkle onset time, wrinkle distribution, grip comparison, and recovery time — with family variation revealing age-related tissue changes',
      scienceExplained: 'Fingertip wrinkling is not osmosis — it is active vasoconstruction controlled by the sympathetic nervous system. The nervous system detects prolonged water contact and constricts blood vessels in the fingertip. The reduced blood volume causes tissue to shrink. The skin (which doesn\'t shrink) buckles and folds. Function: improved grip on wet surfaces — biological tyre tread.',
      ageAdaptation: {
        younger: 'Focus on the grip test — does the wrinkly finger grip better on wet surfaces? Test and measure.',
        older: 'Why does vasoconstriction cause wrinkling? Draw the mechanism. Why is this evidence that the nervous system is controlling the process? Why would nerve damage eliminate wrinkling?',
      },
    },
    familyActivity: {
      prompt: 'Compare wrinkling patterns across family members — different ages, different skin types. Map the variation. What do you notice? The variation is a tissue ageing experiment. Older skin has less collagen and elastin — how might that affect the wrinkling pattern?',
      who: ['whole family'],
      output: 'A family skin biology comparison — tissue ageing visible in a bath experiment',
      repositoryEntry: false,
    },
    crossPollination: ['biology', 'neuroscience', 'engineering', 'evolutionary-biology', 'dermatology'],
    wrongObviousAnswer: 'Osmosis — the skin absorbs water and swells.',
    realAnswer: 'Sympathetic nervous system vasoconstriction. The nervous system detects prolonged water contact and actively constricts blood vessels in the fingertip. Evidence: people with nerve damage to their fingers don\'t wrinkle. Function: biological tyre tread — improving grip on wet surfaces. Evolutionary advantage of our aquatic-adjacent ancestors.',
    mayaOpeningFrame: 'Hands up who thinks they know the answer to this one. Good. Now — the answer in most biology textbooks is wrong. And the way we know it\'s wrong is one of the most elegant pieces of scientific detective work in biology. It involves nerve damage, 1936, and a question nobody thought to ask for about 2,000 years.',
    retrievalPrompt: 'Why is the osmosis explanation wrong? What is the actual mechanism? What evidence rules out osmosis? What is the evolutionary function of finger wrinkling?',
    repositoryTask: 'Document your family\'s skin care knowledge — traditional products, ingredients, purposes. Connect at least one ingredient to the skin biology covered in this module.',
    ncAlignment: [
      'KS3/4 Biology — the nervous system, reflexes, and homeostasis',
      'KS3/4 Biology — skin structure and function',
      'KS4 Biology — evolution and natural selection',
    ],
  },

  'hs-carrots': {
    id: 'hs-carrots',
    title: 'Can carrots help you see in the dark?',
    tagline: 'Yes. No. And British intelligence deliberately lied about this in 1940.',
    subjectAreas: ['biology', 'chemistry', 'history-of-science', 'health-community'],
    keyStages: ['KS3', 'KS4'],
    progressionLevels: ['investigator', 'analyst', 'challenger'],
    duration: 20,
    fiveCs: ['Connect', 'Change', 'Challenge'],
    periodicElements: [ELEMENTS.C, ELEMENTS.H, ELEMENTS.O, ELEMENTS.Fe],
    communityKnowledge: [
      { tradition: 'West African', practice: 'Red palm oil — direct vitamin A source (retinol)', mechanism: 'Red palm oil contains preformed retinol — no conversion needed — and beta-carotene. Dual vitamin A pathway.', repositoryPrompt: 'Does your family use red palm oil? In what dishes? Has its use changed across generations? This is dietary vitamin A history with public health implications.' },
      { tradition: 'Caribbean', practice: 'Dark leafy vegetables — callaloo, moringa — beta-carotene source', mechanism: 'Beta-carotene in dark green leaves — converted to retinal in intestinal wall using iron-containing enzyme', repositoryPrompt: 'How often does your family eat callaloo or other dark greens? Compare to grandparents\' generation. This is nutritional epidemiology data.' },
    ],
    householdExperiment: {
      title: 'Night adaptation test',
      materials: ['A room that can be fully darkened', 'A torch', 'A low-light target to read'],
      procedure: [
        'Sit in bright light for 5 minutes',
        'Dim the room completely',
        'Immediately try to read the low-light target — how visible?',
        'Wait 5 minutes in darkness — try again',
        'Wait 15 minutes — try again',
        'Wait 25 minutes — try again',
        'Record visibility at each time point — this is dark adaptation',
      ],
      expectedOutcome: 'Visible improvement in low-light vision over 20-30 minutes — demonstrating rhodopsin regeneration as bleached visual pigment is restored',
      scienceExplained: 'Rhodopsin — the rod cell visual pigment — is bleached (inactivated) by light exposure. In darkness, it regenerates as 11-cis retinal recombines with opsin. After 20-30 minutes, rhodopsin is fully regenerated and you\'re operating at the physical limit of light detection: a single photon. Carrots provide beta-carotene → retinal → rhodopsin. If you\'re deficient, carrots help. If you\'re sufficient, you\'re already at maximum.',
      ageAdaptation: {
        younger: 'Focus on the dark adaptation experience — what does it feel like as vision improves? What does that tell you is happening in your eyes?',
        older: 'Calculate: if full dark adaptation takes 30 minutes and rhodopsin bleaches in bright light, what is the regeneration rate? Connect to the iron cofactor in the enzyme that cleaves beta-carotene.',
      },
    },
    familyActivity: {
      prompt: 'Survey your family\'s vitamin A food sources. Which foods are eaten regularly that contain either beta-carotene (orange/yellow/dark green vegetables) or preformed retinol (red palm oil, liver, eggs)? Has the family\'s vitamin A intake changed since migration? What are the health implications?',
      who: ['child', 'parent', 'grandparent'],
      output: 'A family dietary vitamin A assessment — connecting migration and dietary change to nutritional epidemiology',
      repositoryEntry: false,
    },
    crossPollination: ['biology', 'chemistry', 'history', 'public-health', 'nutrition', 'politics'],
    wrongObviousAnswer: 'Yes — carrots improve anyone\'s night vision.',
    realAnswer: 'Carrots improve night vision only if you are vitamin A deficient. If you have normal vitamin A levels, your rhodopsin is already fully regenerated and you are operating at the physical limit of light detection — a single photon. Adding more beta-carotene does nothing. The myth that carrots improve anyone\'s vision was deliberately created by British intelligence in 1940 as a cover story for RAF radar technology.',
    mayaOpeningFrame: 'Yes or no: can carrots help you see in the dark? Vote in the chat. Both answers are in this room — and both groups are right. The reason you\'re all right is more interesting than the question suggests. And one of the reasons the myth spread so widely involves a deliberate lie told by British intelligence in 1940.',
    retrievalPrompt: 'State precisely when carrots do and don\'t improve night vision. What is the pathway from beta-carotene to rhodopsin? Why did British intelligence create the carrot myth? What does this tell us about science communication?',
    repositoryTask: 'Document your family\'s dietary vitamin A sources across generations. Connect any changes to migration patterns, dietary transition, and potential nutritional implications for your community.',
    ncAlignment: [
      'KS4 Biology — the eye, vision, and light-sensitive cells',
      'KS3/4 Biology — nutrition and deficiency diseases',
      'KS4 Chemistry — organic molecules and their functions',
    ],
  },

  'hs-spinach-magneto': {
    id: 'hs-spinach-magneto',
    title: 'Can I get magnetic powers from spinach?',
    tagline: 'No. But haemoglobin is more extraordinary than magnetism.',
    subjectAreas: ['chemistry', 'biology', 'physics'],
    keyStages: ['KS3', 'KS4'],
    progressionLevels: ['investigator', 'analyst', 'challenger'],
    duration: 20,
    fiveCs: ['Connect', 'Create'],
    periodicElements: [ELEMENTS.Fe, ELEMENTS.Mg, ELEMENTS.N, ELEMENTS.C, ELEMENTS.H, ELEMENTS.O],
    communityKnowledge: [
      { tradition: 'Multiple', practice: 'Iron-rich traditional foods — cooking in iron pots, moringa, leafy greens, dried beans', mechanism: 'Haem iron (from meat) 15-35% absorption vs non-haem iron 2-5%. Vitamin C dramatically increases non-haem iron absorption by reducing Fe3+ to Fe2+.', repositoryPrompt: 'Does your family cook in cast iron? What iron-rich foods are traditional? Has dietary iron intake changed since migration?' },
    ],
    householdExperiment: {
      title: 'Iron in cereal — magnetic extraction',
      materials: ['Iron-fortified cereal (check label)', 'Strong magnet', 'Zip-lock bag', 'Water'],
      procedure: [
        'Crush cereal in the zip-lock bag until very fine',
        'Add water — create a slurry',
        'Slowly drag a strong magnet across the outside of the bag',
        'Collect any material attracted to the magnet at one spot',
        'Open bag — the tiny dark specks are elemental iron particles',
      ],
      expectedOutcome: 'Visible extraction of elemental iron particles from breakfast cereal — demonstrating that iron fortification uses actual metallic iron particles, not iron compounds',
      scienceExplained: 'Iron fortification of cereals often uses elemental iron powder — actual Fe metal — because it is cheaper and shelf-stable. This iron IS ferromagnetic (unpaired 3d electrons). Your body can dissolve it in stomach acid (HCl converts Fe to Fe2+) and absorb it. But in your blood it is coordinated in haemoglobin where the d-electron pairing eliminates ferromagnetism entirely.',
      ageAdaptation: {
        younger: 'Focus on the surprise — there\'s real metal in your cereal that sticks to a magnet! What happens to it in your body?',
        older: 'Explain why elemental iron is ferromagnetic (unpaired 3d electrons in Group 8 transition metal) but haemoglobin iron is not (coordination chemistry changes electron pairing).',
      },
    },
    familyActivity: {
      prompt: 'Map your family\'s iron intake. Which iron-rich foods are eaten regularly? Find out if anyone in the family has experienced iron deficiency anaemia. Connect to the traditional foods that protect against it. Connect vitamin C sources to iron absorption.',
      who: ['child', 'parent', 'grandparent'],
      output: 'A family iron nutrition assessment — traditional diet knowledge connected to haematology',
      repositoryEntry: false,
    },
    crossPollination: ['chemistry', 'biology', 'physics', 'nutrition', 'materials-science', 'astronomy'],
    wrongObviousAnswer: 'Yes — iron makes you magnetic.',
    realAnswer: 'No. The iron in spinach becomes the iron in haemoglobin — and the coordination chemistry of haemoglobin eliminates the unpaired d-electrons that create ferromagnetism. Haemoglobin iron is diamagnetic (weakly repelled by magnets). Spinach also has poor iron bioavailability due to oxalic acid (2-5% absorbed). What iron actually does — the oxygen-carrying cooperativity of haemoglobin, the shared porphyrin ring architecture with chlorophyll — is more extraordinary than any comic book power.',
    mayaOpeningFrame: 'I\'ll be very quick about the answer: no. You cannot get magnetic powers from spinach. But the reason why not is one of the most beautiful pieces of chemistry in the entire periodic table. It connects iron in your blood to magnesium in every green plant to the oxygen in the air you breathe — and it all happens in a porphyrin ring.',
    retrievalPrompt: 'Why does elemental iron stick to a magnet but haemoglobin iron doesn\'t? What is the relationship between haemoglobin and chlorophyll? What element sits at the centre of each?',
    repositoryTask: 'Document your family\'s traditional iron-rich foods and any knowledge about food combinations that enhance iron absorption. Connect to the periodic table: iron (Fe, Group 8) and the vitamin C that helps absorb it (C, H, O).',
    ncAlignment: [
      'KS4 Chemistry — transition metals and their properties',
      'KS3/4 Biology — the blood and cardiovascular system',
      'KS3 Physics — magnets and magnetic materials',
    ],
  },

  'hs-shoe-polish': {
    id: 'hs-shoe-polish',
    title: 'Grandfather teaching grandson to spit-polish shoes',
    tagline: 'Empirical nanotechnology. Transmitted across the kitchen table.',
    subjectAreas: ['chemistry', 'physics', 'engineering'],
    keyStages: ['KS2', 'KS3', 'KS4'],
    progressionLevels: ['explorer', 'investigator', 'analyst'],
    duration: 20,
    fiveCs: ['Connect', 'Create'],
    periodicElements: [ELEMENTS.C, ELEMENTS.H, ELEMENTS.O, ELEMENTS.N],
    communityKnowledge: [
      { tradition: 'Military / Intergenerational', practice: 'Spit-polishing shoes to mirror brightness — small circles, light pressure, multiple layers', mechanism: 'Salivary mucins act as plasticiser, filling surface irregularities at nanometre scale that exceed wax filling capacity', repositoryPrompt: 'Document the shoe-polishing technique in your family as a scientific protocol — materials, method, assessment criteria. This is prior art for nanotechnology applications.' },
    ],
    householdExperiment: {
      title: 'Surface reflectivity comparison',
      materials: ['Shoe polish', 'Old shoes or leather offcut', 'Water', 'Saliva (spit)', 'Diluted glycerol if available', 'Bright light source'],
      procedure: [
        'Apply base coat of polish to three identical sections',
        'Section 1: buff with dry cloth',
        'Section 2: buff with water-dampened cloth',
        'Section 3: buff with saliva using small circular motion',
        'Compare reflectivity under bright light',
        'Apply additional layers to section 3 — observe progressive improvement',
        'Measure: can you see your reflection? How clearly?',
      ],
      expectedOutcome: 'Visible difference between dry, water, and saliva polishing — with saliva producing superior specular reflection due to salivary mucins filling nanoscale surface irregularities',
      scienceExplained: 'Mirror brightness requires surface smoothness at or below the wavelength of visible light (~400-700 nanometres). Wax fills irregularities to hundreds of nanometres. Salivary mucins — large glycoproteins — fill the remaining irregularities at tens of nanometres as the water evaporates slowly (mucins retard evaporation). The result is specular reflection. The grandfather is doing nanoscale surface physics. He just calls it polishing.',
      ageAdaptation: {
        younger: 'Focus on the visible difference — which section is shiniest? Why? What is the spit adding that water isn\'t?',
        older: 'Explain specular vs diffuse reflection in terms of surface roughness relative to wavelength. Calculate: if visible light is 400-700nm, what surface roughness would scatter light? What does the mucin film achieve?',
      },
    },
    familyActivity: {
      prompt: 'Bring the grandfather or oldest family member in. Ask them to demonstrate their technique while you document it as a scientific protocol: exact materials, motion type, pressure, number of layers, quality assessment criteria. This is the format that establishes the knowledge as prior art.',
      who: ['child', 'grandparent', 'parent'],
      output: 'A scientific protocol for the family\'s shoe-polishing technique — intergenerational knowledge documented as nanotechnology prior art',
      repositoryEntry: true,
    },
    crossPollination: ['chemistry', 'physics-optics', 'biology-biochemistry', 'materials-science', 'intergenerational-knowledge'],
    realAnswer: 'Salivary mucins — large glycoproteins in saliva — act as a plasticiser for the wax surface and fill nanoscale surface irregularities as the water component slowly evaporates. The result is a surface smooth enough (below the wavelength of visible light) to produce specular (mirror) reflection. The small circular motion distributes the surface layer without shearing it. The grandfather\'s technique is empirically derived nanoscale surface engineering.',
    mayaOpeningFrame: 'The grandfather doesn\'t know the phrase "nanoscale surface engineering". He knows that small circles work better than big sweeps. He knows spit works better than water. He knows you need multiple thin layers, not one thick one. He arrived at the correct answers through generations of empirical testing. We\'re going to find out why he\'s right — at the scale of a hundred millionths of a metre.',
    retrievalPrompt: 'What do salivary mucins do to the wax surface? Why is specular reflection only possible when surface irregularities are smaller than the wavelength of light? What is the scientific name for the motion that produces best results and why?',
    repositoryTask: 'Document the shoe-polishing technique from your family as a complete scientific protocol. Name the knowledge holder. Date the documentation. This is community knowledge with nanotechnology applications — it belongs in the repository.',
    ncAlignment: [
      'KS3/4 Physics — reflection and the properties of light',
      'KS3/4 Chemistry — materials science and surface properties',
      'KS3 Biology — proteins and their functions',
    ],
  },

  'hs-mercury-fish': {
    id: 'hs-mercury-fish',
    title: 'Mercury in fish — and the ears that go red',
    tagline: 'Same element. Completely different compound. Completely different biology.',
    subjectAreas: ['chemistry', 'biology', 'health-community', 'earth-science'],
    keyStages: ['KS3', 'KS4'],
    progressionLevels: ['analyst', 'challenger'],
    duration: 20,
    fiveCs: ['Change', 'Challenge'],
    periodicElements: [ELEMENTS.Hg, ELEMENTS.S, ELEMENTS.N, ELEMENTS.C, ELEMENTS.H, ELEMENTS.O],
    communityKnowledge: [
      { tradition: 'West African / Caribbean', practice: 'Smoked fish tradition — mackerel, sardines, herring (low mercury) vs barracuda, tuna (higher mercury)', mechanism: 'Biomagnification: mercury concentrates up the food chain. Small oily fish — low mercury, high omega-3. Apex predators — high mercury.', repositoryPrompt: 'What fish does your family eat most? What species are traditional? Has this changed? Document the family\'s fish consumption pattern — this is dietary mercury exposure data.' },
    ],
    householdExperiment: {
      title: 'The Group 12 comparison — zinc vs mercury',
      materials: ['Zinc supplement tablet (from pharmacy — most households have these)', 'Paper and pen', 'Access to periodic table'],
      procedure: [
        'Find zinc and mercury on the periodic table — they are in the same group (Group 12)',
        'Compare: atomic number, period, electron configuration, density',
        'Research: zinc is essential for life (300+ enzymes), mercury is toxic. Same group. Why?',
        'Connect: both bind to sulphur-containing proteins (cysteine). Zinc enables function. Mercury disrupts it.',
        'Find: what foods are high in zinc? What traditional medicines or foods used in your community contain zinc-rich ingredients?',
      ],
      expectedOutcome: 'Understanding that periodic table group membership predicts chemical behaviour — zinc and mercury have similar chemistry (sulphur affinity) but opposite biological effects due to size, mass, and coordination chemistry differences',
      scienceExplained: 'Mercury (Hg, Group 12, Period 6) and zinc (Zn, Group 12, Period 4) are group neighbours. Both are soft Lewis acids that preferentially bind sulphur-containing proteins (like cysteine-rich enzymes). Zinc enables protein function at its binding site. Mercury disrupts it — its size and mass mean it cannot do what zinc does, and it binds so tightly it cannot be displaced. Same chemistry, opposite outcome.',
      ageAdaptation: {
        younger: 'Focus on the food chain biomagnification story. Draw the chain from water → plankton → small fish → big fish → human. Show how mercury concentrates at each stage.',
        older: 'Explain the Lewis acid-base chemistry. Why do both Zn2+ and Hg2+ preferentially bind sulphur? How does ionic radius affect the coordination bond geometry?',
      },
    },
    familyActivity: {
      prompt: 'Map your family\'s fish consumption for one week. Species, frequency, source. Then research the mercury content of each species. Where is your family\'s exposure concentrated? What traditional food choices are protective? What changes (if any) does this suggest?',
      who: ['child', 'parent'],
      output: 'A family dietary mercury exposure assessment — community health intelligence',
      repositoryEntry: false,
    },
    crossPollination: ['chemistry', 'biology', 'ecology', 'public-health', 'history', 'ocean-science'],
    wrongObviousAnswer: 'Eating mercury-containing fish makes your ears go red when you\'re hot (because mercury is associated with heat from thermometers).',
    realAnswer: 'No. Ear reddening when hot is cutaneous vasodilation — the hypothalamus triggers nitric oxide release in blood vessel walls, causing smooth muscle relaxation, increased blood flow to peripheral capillaries, and heat dissipation. Mercury has no role. The mercury-heat association comes from thermometers, which use elemental mercury. Dietary mercury is methylmercury — an organomercury compound with completely different biology. Same element, completely different compound, completely different effect.',
    mayaOpeningFrame: 'This question contains something real — the folk intuition connecting mercury to heat. And there IS a connection between mercury and heat — just not the one the question implies. Let me show you what the question got right, what it got wrong, and why the difference matters for a community where fish is a dietary staple.',
    retrievalPrompt: 'What is the mechanism of ear reddening when hot? What is methylmercury and how does it differ from elemental mercury? Why does mercury specifically target nervous tissue? What periodic table property predicts this?',
    repositoryTask: 'Document your family\'s traditional fish consumption. Connect each species to its mercury risk category. Note any traditional preparation or combination practices that might affect mercury exposure. This is community dietary epidemiology.',
    ncAlignment: [
      'KS3/4 Chemistry — the periodic table — groups and periodicity',
      'KS4 Chemistry — transition metals, Lewis acids',
      'KS3/4 Biology — the nervous system and neurotoxins',
      'KS4 Environmental science — bioaccumulation and food chains',
    ],
  },

  'hs-hair-height': {
    id: 'hs-hair-height',
    title: 'Can a huge afro make me taller?',
    tagline: 'Yes. Whether it counts depends on who designed the measuring instrument.',
    subjectAreas: ['biology', 'chemistry', 'health-community', 'history-of-science'],
    keyStages: ['KS3', 'KS4'],
    progressionLevels: ['investigator', 'analyst', 'challenger'],
    duration: 20,
    fiveCs: ['Connect', 'Challenge'],
    periodicElements: [ELEMENTS.S, ELEMENTS.N, ELEMENTS.C, ELEMENTS.H, ELEMENTS.O],
    communityKnowledge: COMMUNITY_KNOWLEDGE.hair,
    householdExperiment: {
      title: 'Hair biology investigations',
      materials: ['Your own hair', 'Basin of water', 'Magnifying glass', 'Ruler', 'Timer'],
      procedure: [
        'Wet a section of hair — measure stretched length',
        'Let it dry — measure again. Calculate shrinkage percentage.',
        'Examine a single hair under magnifying glass — can you see the cuticle scales?',
        'Test: does warm water make wet hair more pliable than cold water? (Hydrogen bonds)',
        'Family comparison: measure skull height and hair height for each family member. Calculate difference.',
        'Document: which family member has greatest hair height above skull?',
      ],
      expectedOutcome: 'Direct measurement of type 4 hair shrinkage (typically 50-75%); understanding that growth rate is constant but length retention is the challenge; visible family height differences between skull measurement and total height',
      scienceExplained: 'Hair is dead keratin — sulphur-rich protein with disulphide bonds. Type 4 hair has a flat, ribbon-like follicle creating tight coils. The coil structure: (1) means sebum cannot travel down the shaft easily → more prone to dryness; (2) creates maximum mechanical friction between strands → more breakage; (3) produces dramatic shrinkage when dry because the coil stores energy. Protective styles reduce friction and maintain length retention.',
      ageAdaptation: {
        younger: 'Focus on the shrinkage measurement — this is real experimental data about your own biology.',
        older: 'Connect follicle shape to crystal structure analogy — the geometry of the follicle determines the geometry of the protein extrusion. How do disulphide bonds create curl? How does relaxer chemistry break and reform those bonds?',
      },
    },
    familyActivity: {
      prompt: 'Interview the oldest female family member about hair history across generations. What styles were worn? What products were used? What was the family\'s relationship to natural vs processed hair? What changed and why? This is an oral history of Black hair across generations — cultural history as community science.',
      who: ['child', 'grandparent', 'parent'],
      output: 'An intergenerational oral history of hair practices — cultural identity, politics, and biochemistry in one document',
      repositoryEntry: true,
    },
    crossPollination: ['biology', 'chemistry', 'physics-measurement', 'politics', 'sociology', 'law'],
    wrongObviousAnswer: 'Hair grows — so yes, it adds height.',
    realAnswer: 'Physically yes — an afro adds real, measurable vertical height. Whether institutions count it depends on how measurement was designed. Clinical height measurement (to the vertex/skull) excludes hair — but was designed assuming hair that lies flat. The Halo Code exists because schools were disciplining Black children for wearing natural hair styles. The measuring instrument and the measurement protocol were not designed with afro-textured hair in mind. The data quality issue has direct health implications.',
    mayaOpeningFrame: 'This question has four parts to it. Is hair alive? Does it add height? Does height measurement count hair? And — why did you ask about an afro specifically? All four parts have interesting answers. And one of them connects to a legal case, a 16-year-old called Ruby Williams, and why a specific piece of legislation called the Halo Code now exists in hundreds of British schools.',
    retrievalPrompt: 'What is hair made of? How does type 4 hair differ from type 1 at the follicle level? What is the Halo Code and why was it needed? What measurement bias does clinical height assessment have for afro-textured hair?',
    repositoryTask: 'Document your family\'s hair care practices across generations — products, techniques, styles, and the politics around them. Connect at least two ingredients to their molecular mechanisms. This is cultural heritage and traditional knowledge simultaneously.',
    ncAlignment: [
      'KS3/4 Biology — proteins, cells, and biological molecules',
      'KS4 Chemistry — polymers and their properties',
      'KS4 Citizenship — discrimination, rights, and the law',
    ],
  },
};

// ─── SESSION PLANS ──────────────────────────────────────────────────────────

export const SESSION_PLANS: Record<string, SessionPlan> = {
  'session-1': {
    id: 'session-1',
    title: 'Who built the world you\'re computing in?',
    subtitle: 'The global history of STEM — reframing the origin myth',
    totalDuration: 95,
    modules: ['s1-m1-image', 's1-m2-gap', 's1-m3-breakout', 's1-m4-kitchen', 's1-m5-close'],
    sessionObjective: 'Participants leave understanding that scientific knowledge is a global inheritance — and that their community\'s knowledge belongs in the same conversation as Al-Khwarizmi and Brahmagupta.',
    mayaClosingFrame: 'The knowledge that built the modern world came from everywhere — Baghdad, Beijing, the Andes, West Africa, the Caribbean. Most of it was taken without credit. Some of it is still in your kitchen. The question STEMgeneers is going to spend the next months answering: what happens if your community documents it first?',
    platformOutputs: ['First repository entries', 'Knowledge chain research documents', 'Family meal heritage maps', 'Rayd-yo content flags'],
    homeschoolingEvidence: ['Written knowledge chain analysis', 'Oral history interview notes', 'Repository entry as documented research output'],
  },
  'session-2': {
    id: 'session-2',
    title: 'The chemistry your grandmother knows',
    subtitle: 'Traditional herbalism mapped to the periodic table',
    totalDuration: 95,
    modules: ['s2-m1-plant', 's2-m2-alkaloids', 's2-m3-flavonoids', 's2-m4-terpenes', 's2-m5-repository'],
    sessionObjective: 'Participants can identify the three major phytochemical compound families, map each to the periodic table, connect each to traditional knowledge in their community, and understand how to document traditional knowledge as prior art.',
    mayaClosingFrame: 'Your grandmother knew which plants worked. She didn\'t need to know why. But you can know both. And when you document both — the traditional knowledge and the chemistry — you\'ve created something that neither alone achieves: prior art that belongs to your community.',
    platformOutputs: ['Complete phytochemical repository entries', 'Plant sensory analysis data', 'Prior art documentation protocols'],
    homeschoolingEvidence: ['Phytochemistry laboratory report', 'Periodic table element mapping', 'Repository entry as scientific documentation'],
  },
};

// ─── PROGRESSION LEVELS ─────────────────────────────────────────────────────

export const PROGRESSION_LEVELS: ProgressionLevelSpec[] = [
  {
    id: 'explorer',
    name: 'Explorer',
    ageRange: '7–11',
    keyStage: 'KS2',
    descriptor: 'Observation and description. Names what they see. Connects household activity to one scientific idea. Family participation central.',
    assessmentCriteria: {
      foundation: 'Can describe what happened in the experiment',
      core: 'Can connect the observation to one scientific idea',
      extension: 'Can make one comparison between family knowledge and the scientific explanation',
    },
    outputFormat: 'Oral description or simple drawing with labels',
  },
  {
    id: 'investigator',
    name: 'Investigator',
    ageRange: '11–13',
    keyStage: 'KS3 lower',
    descriptor: 'Hypothesis and experiment. Designs simple tests. Introduces periodic table elements by name and group.',
    assessmentCriteria: {
      foundation: 'Can design a fair test with one variable changed',
      core: 'Can name the relevant periodic table element and its group',
      extension: 'Can explain how the element\'s position predicts its behaviour',
    },
    outputFormat: 'Written observation with one paragraph of explanation',
  },
  {
    id: 'analyst',
    name: 'Analyst',
    ageRange: '13–14',
    keyStage: 'KS3 upper',
    descriptor: 'Mechanism and pattern. Explains why not just what. Uses periodic table groups to predict behaviour.',
    assessmentCriteria: {
      foundation: 'Can explain the scientific mechanism',
      core: 'Can connect the mechanism to the relevant periodic table element\'s properties',
      extension: 'Can make one cross-domain connection and identify one structural question',
    },
    outputFormat: 'Structured report with mechanism explanation and cross-pollination thread',
  },
  {
    id: 'challenger',
    name: 'Challenger',
    ageRange: '14–16',
    keyStage: 'KS4',
    descriptor: 'Structure and justice. GCSE-standard content embedded. Asks structural questions — who designed this system, who benefits, what needs to change.',
    assessmentCriteria: {
      foundation: 'Can explain the science at GCSE standard',
      core: 'Can identify the structural or political dimension of the scientific issue',
      extension: 'Can produce a science communication piece that integrates science and structural analysis',
    },
    outputFormat: 'Science communication piece or policy brief — GCSE portfolio quality',
  },
  {
    id: 'architect',
    name: 'Architect',
    ageRange: '16+',
    keyStage: 'Post-16 bridge',
    descriptor: 'Design and governance. A-level bridge content. Designs systems — repository governance, community health programmes, data sovereignty frameworks.',
    assessmentCriteria: {
      foundation: 'Can bridge GCSE content to A-level concepts',
      core: 'Can design a community application of the scientific knowledge',
      extension: 'Can produce research-quality output with community governance framework',
    },
    outputFormat: 'Extended research project or governance framework document — EPQ-equivalent',
  },
];

// ─── NATIONAL CURRICULUM ALIGNMENT MAP ─────────────────────────────────────

export const NC_ALIGNMENT: Record<SubjectArea, Record<KeyStage, string[]>> = {
  'biology': {
    KS2: ['Living things and their habitats', 'Animals including humans — nutrition'],
    KS3: ['Cells and organisation', 'Genetics and evolution', 'Health, disease and the role of medicine'],
    KS4: ['Cell biology', 'Organisation', 'Infection and response', 'Bioenergetics', 'Homeostasis and response', 'Inheritance, variation and evolution'],
    post16: ['Biochemistry', 'Genetics', 'Physiology'],
  },
  'chemistry': {
    KS2: ['Materials — properties and changes'],
    KS3: ['Atoms, elements and compounds', 'Pure and impure substances', 'Chemical reactions', 'Acids and alkalis', 'The periodic table', 'Materials'],
    KS4: ['Atomic structure and the periodic table', 'Bonding, structure and properties', 'Quantitative chemistry', 'Chemical changes', 'Energy changes', 'Organic chemistry'],
    post16: ['Physical chemistry', 'Inorganic chemistry', 'Organic chemistry'],
  },
  'physics': {
    KS2: ['Forces', 'Light', 'Electricity'],
    KS3: ['Forces and motion', 'Waves — light and sound', 'Energy', 'Electricity and electromagnetism'],
    KS4: ['Forces', 'Waves', 'Magnetism and electromagnetism', 'Particle model of matter', 'Atomic structure'],
    post16: ['Mechanics', 'Electromagnetism', 'Quantum physics'],
  },
  'mathematics': {
    KS2: ['Number', 'Measurement', 'Statistics'],
    KS3: ['Number', 'Algebra', 'Ratio proportion and rates of change', 'Probability and statistics'],
    KS4: ['Number', 'Algebra', 'Ratio, proportion and rates of change', 'Geometry and measures', 'Probability', 'Statistics'],
    post16: ['Pure mathematics', 'Statistics', 'Mechanics'],
  },
  'earth-science': {
    KS2: ['Rocks', 'Seasonal changes'],
    KS3: ['Earth and atmosphere', 'Universe — Solar System'],
    KS4: ['Earth and atmospheric science', 'Earth\'s resources'],
    post16: ['Environmental science', 'Geology'],
  },
  'astronomy': {
    KS2: ['Earth and space'],
    KS3: ['Space physics'],
    KS4: ['Space physics'],
    post16: ['Astrophysics'],
  },
  'computing': {
    KS2: ['Algorithms', 'Programming', 'Data and digital literacy'],
    KS3: ['Computer science', 'Information technology', 'Digital literacy'],
    KS4: ['Computational thinking', 'Programming', 'Data and information', 'Computer systems'],
    post16: ['Computer science'],
  },
  'engineering': {
    KS2: ['Design and technology — structures'],
    KS3: ['Design and technology'],
    KS4: ['Design and technology — engineering principles'],
    post16: ['Engineering'],
  },
  'history-of-science': {
    KS2: ['History — significant events and individuals'],
    KS3: ['History — social, economic, cultural context', 'Science — nature of scientific knowledge'],
    KS4: ['Science — how science has developed', 'History — global history'],
    post16: ['History and philosophy of science'],
  },
  'health-community': {
    KS2: ['Science — health and hygiene'],
    KS3: ['PSHE — health and wellbeing', 'Citizenship'],
    KS4: ['PSHE — health', 'Citizenship — rights and communities', 'Biology — health'],
    post16: ['Health and social care', 'Sociology'],
  },
};