/**
 * SILK STILETTOS TUTORIALS
 * ========================
 * 
 * 3 free tutorials per pathway = 9 free total
 * ROV-C (Creative) guide throughout
 * Kit upsells to Cyberstore
 * Workshop conversions
 */

/**
 * Import path depends on your file structure:
 * 
 * If both in same folder:
 *   import { Tutorial } from './TutorialSystem.types';
 * 
 * If types in src/types and tutorials in src/data/tutorials:
 *   import { Tutorial } from '../../types/TutorialSystem.types';
 * 
 * For now, we'll define the type inline to avoid import issues:
 */

// Inline type definition (or import from your types file)
interface TutorialStep {
  step: number;
  title: string;
  description: string;
  tip?: string;
  warning?: string;
  image?: string;
  video?: string;
  checkpoint?: boolean;
  rovPrompt?: string;
}

interface Tool {
  name: string;
  price?: string;
  cyberstoreSlug?: string;
  essential: boolean;
  notes?: string;
}

interface Kit {
  name: string;
  slug: string;
  price: string;
  contents: string[];
  savings?: string;
}

interface Workshop {
  title: string;
  duration: string;
  price: string;
  format: 'zoom' | 'in-person' | 'hybrid';
  bookingSlug: string;
}

type Programme = 
  | 'stemgeneers'
  | 'silk-stilettos'
  | 'techreneurs'
  | 'kaywanas-court'
  | 'gtech-casters'
  | 'trubble-n-bass'
  | 'aunties-kitchen'
  | 'pageturners'
  | 'raydyo'
  | 'joystick';

type ROVGuide = 'ROV-T' | 'ROV-C' | 'ROV-B' | 'ROV-M' | 'ROV-H' | 'ROV-P' | 'Maya';
type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';
type TutorialFormat = 'step-by-step' | 'video' | 'interactive' | 'project' | 'assessment';

interface Tutorial {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  programmes: Programme[];
  primaryProgramme: Programme;
  pathway?: string;
  tags: string[];
  difficulty: Difficulty;
  duration: string;
  prerequisites?: string[];
  format: TutorialFormat;
  rovGuide: ROVGuide;
  alternativeGuides?: ROVGuide[];
  steps: TutorialStep[];
  tools: Tool[];
  commonMistakes: string[];
  freeAccess: boolean;
  kit?: Kit;
  workshop?: Workshop;
  nextTutorials?: string[];
  relatedTutorials?: string[];
  badgeAwarded?: string;
  author?: string;
  lastUpdated: string;
  version: string;
}

export const SILK_STILETTOS_TUTORIALS: Tutorial[] = [
  // ========================================
  // GARMENT CONSTRUCTION PATHWAY
  // ========================================
  {
    id: 'basic-hemming',
    slug: 'basic-hemming',
    title: 'Professional Hemming Techniques',
    description: 'The most common alteration request. Master blind hem, rolled hem, and machine hem for different fabrics.',
    icon: '✂️',
    
    programmes: ['silk-stilettos'],
    primaryProgramme: 'silk-stilettos',
    pathway: 'Garment Construction',
    tags: ['hemming', 'alterations', 'sewing', 'basics'],
    
    difficulty: 'beginner',
    duration: '25 mins',
    
    format: 'step-by-step',
    rovGuide: 'ROV-C',
    
    steps: [
      {
        step: 1,
        title: 'Assess the Garment',
        description: 'Before cutting anything, examine the fabric type, current hem style, and customer requirements. Measure twice.',
        tip: 'Always have the customer try on the garment and mark the desired length with pins while they\'re wearing it.',
        rovPrompt: 'How do I know which hem style suits this fabric?'
      },
      {
        step: 2,
        title: 'Prepare Your Workspace',
        description: 'Clear, flat surface. Iron ready. Good lighting. Matching thread selected. Pins, measuring tape, fabric chalk.',
        warning: 'Working on a cluttered surface leads to uneven hems. Take the time to set up properly.'
      },
      {
        step: 3,
        title: 'Mark the Hem Line',
        description: 'Use fabric chalk or pins to mark the new hem line. Measure from the floor for consistency, especially on skirts and dresses.',
        tip: 'A hem gauge or ruler makes this much faster and more accurate.'
      },
      {
        step: 4,
        title: 'Cut Excess Fabric',
        description: 'Leave appropriate hem allowance: 2.5cm for machine hem, 4cm for blind hem, 1cm for rolled hem. Cut parallel to hem line.',
        warning: 'Measure the allowance before cutting. You can always cut more, but you can\'t add fabric back.'
      },
      {
        step: 5,
        title: 'Finish the Raw Edge',
        description: 'Options: overlock/serge (professional), zigzag stitch (home machine), pinking shears (quick), or fold under (traditional).',
        tip: 'If you don\'t have an overlocker, a narrow zigzag stitch prevents fraying on most fabrics.'
      },
      {
        step: 6,
        title: 'Press Before Sewing',
        description: 'Fold hem to marked line and press with iron. This creates a crisp fold line and makes sewing much easier.',
        tip: 'Use a pressing cloth on delicate fabrics. Steam helps set the fold.'
      },
      {
        step: 7,
        title: 'Choose Your Hem Technique',
        description: 'Machine hem: fastest, visible stitching. Blind hem: invisible, requires blind hem foot. Hand hem: truly invisible, slowest.',
        rovPrompt: 'When should I use blind hem vs machine hem?'
      },
      {
        step: 8,
        title: 'Final Press and Quality Check',
        description: 'Press the finished hem from both sides. Check for puckering, uneven lengths, visible stitches (on blind hem). Fix any issues.',
        tip: 'Take photos of your best work for your portfolio. Hemming photos show precision.'
      }
    ],
    
    tools: [
      { name: 'Measuring tape', price: '£2-5', essential: true },
      { name: 'Fabric chalk or marking pen', price: '£2-4', essential: true },
      { name: 'Sharp fabric scissors', price: '£15-30', cyberstoreSlug: 'fabric-scissors', essential: true },
      { name: 'Pins', price: '£2-3', essential: true },
      { name: 'Matching thread', price: '£2-4', essential: true },
      { name: 'Hem gauge/ruler', price: '£5-8', cyberstoreSlug: 'hem-gauge', essential: false },
      { name: 'Iron and ironing board', price: 'Usually have', essential: true },
      { name: 'Blind hem foot (optional)', price: '£8-15', cyberstoreSlug: 'blind-hem-foot', essential: false }
    ],
    
    commonMistakes: [
      'Not measuring from the floor—results in uneven hem around the body',
      'Cutting before measuring allowance—can\'t fix this mistake',
      'Skipping the press before sewing—makes sewing much harder',
      'Using wrong thread weight—too thick shows, too thin breaks',
      'Rushing the blind hem—practice on scraps first'
    ],
    
    freeAccess: true,
    
    kit: {
      name: 'Hemming Essentials Kit',
      slug: 'hemming-kit',
      price: '£18.99',
      contents: ['Hem gauge', 'Fabric chalk set', 'Hand sewing needles', 'Thimble', 'Seam ripper'],
      savings: 'Save £6 vs buying separately'
    },
    
    workshop: {
      title: 'Hemming Masterclass',
      duration: '1 hour',
      price: '£20',
      format: 'zoom',
      bookingSlug: 'hemming-workshop'
    },
    
    nextTutorials: ['zip-replacement', 'taking-in-seams'],
    relatedTutorials: ['fabric-selection', 'pressing-techniques'],
    badgeAwarded: 'hemming-basics',
    
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  
  {
    id: 'zip-replacement',
    slug: 'zip-replacement',
    title: 'Zip Replacement (Invisible & Standard)',
    description: 'Broken zips are common. Learn to remove and replace both invisible and standard zips professionally.',
    icon: '🔗',
    
    programmes: ['silk-stilettos'],
    primaryProgramme: 'silk-stilettos',
    pathway: 'Garment Construction',
    tags: ['zips', 'zippers', 'alterations', 'repair'],
    
    difficulty: 'beginner',
    duration: '35 mins',
    prerequisites: ['basic-hemming'],
    
    format: 'step-by-step',
    rovGuide: 'ROV-C',
    
    steps: [
      {
        step: 1,
        title: 'Identify the Zip Type',
        description: 'Invisible zip: teeth hidden behind fabric. Standard zip: teeth visible. Measure length needed—buy slightly longer than opening.',
        tip: 'Invisible zips need an invisible zip foot. Standard zips work with regular zipper foot.'
      },
      {
        step: 2,
        title: 'Carefully Remove Old Zip',
        description: 'Use seam ripper to unpick stitches holding zip. Work slowly to avoid damaging fabric. Remove all old thread pieces.',
        warning: 'Rushing here damages fabric. Take your time with the seam ripper.'
      },
      {
        step: 3,
        title: 'Press the Opening',
        description: 'Press the seam allowances flat. This gives you a clean surface to work with and reveals any fraying to address.',
      },
      {
        step: 4,
        title: 'Prepare New Zip',
        description: 'If zip is longer than needed, you can shorten standard zips (not invisible). Mark where to stop stitching.',
        tip: 'Always buy zips in bulk from Cyberstore—much cheaper than haberdashery shops.'
      },
      {
        step: 5,
        title: 'Pin Zip in Place',
        description: 'For invisible: pin with teeth facing outward, coil just past seam line. For standard: center teeth over opening, tape in place.',
        checkpoint: true,
        rovPrompt: 'Show me how to position an invisible zip correctly.'
      },
      {
        step: 6,
        title: 'Install Zip Foot',
        description: 'Invisible zip foot has grooves for the coil. Standard zip foot is offset to sew close to teeth. Check your machine manual.',
      },
      {
        step: 7,
        title: 'Sew First Side',
        description: 'Start from top, sew down toward bottom. For invisible: uncurl teeth as you sew. For standard: sew close to teeth.',
        tip: 'Go slowly. Speed causes wavy zip lines.'
      },
      {
        step: 8,
        title: 'Sew Second Side',
        description: 'Repeat on other side, starting from top again. Close zip to check alignment before securing bottom.',
        warning: 'If sides don\'t align, unpick and try again. Misaligned zips look amateur.'
      }
    ],
    
    tools: [
      { name: 'Seam ripper', price: '£2-4', essential: true },
      { name: 'Invisible zip foot', price: '£8-12', cyberstoreSlug: 'invisible-zip-foot', essential: true },
      { name: 'Replacement zips (pack)', price: '£8-15', cyberstoreSlug: 'zip-pack', essential: true },
      { name: 'Pins', price: '£2-3', essential: true },
      { name: 'Matching thread', price: '£2-4', essential: true },
      { name: 'Fabric tape/wonder tape', price: '£5-8', cyberstoreSlug: 'wonder-tape', essential: false }
    ],
    
    commonMistakes: [
      'Cutting invisible zip to length—they\'re pre-measured, buy correct size',
      'Sewing over zip teeth—damages needle and zip',
      'Not starting both sides from top—causes misalignment',
      'Wrong zip foot—invisible and standard need different feet',
      'Rushing—wavy zip lines are the telltale sign of amateur work'
    ],
    
    freeAccess: true,
    
    kit: {
      name: 'Zip Replacement Kit',
      slug: 'zip-kit',
      price: '£24.99',
      contents: ['Invisible zip foot', 'Standard zip foot', '10x invisible zips (mixed)', '10x standard zips (mixed)', 'Wonder tape', 'Seam ripper'],
      savings: 'Save £12 vs buying separately'
    },
    
    workshop: {
      title: 'Zip Mastery Workshop',
      duration: '1 hour',
      price: '£25',
      format: 'zoom',
      bookingSlug: 'zip-workshop'
    },
    
    nextTutorials: ['button-attachment', 'taking-in-seams'],
    relatedTutorials: ['dress-alterations'],
    badgeAwarded: 'zip-master',
    
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  
  {
    id: 'button-attachment',
    slug: 'button-attachment',
    title: 'Button Attachment & Buttonhole Repair',
    description: 'Missing buttons and torn buttonholes are easy fixes. Learn professional techniques for lasting repairs.',
    icon: '🔘',
    
    programmes: ['silk-stilettos'],
    primaryProgramme: 'silk-stilettos',
    pathway: 'Garment Construction',
    tags: ['buttons', 'repairs', 'hand sewing', 'basics'],
    
    difficulty: 'beginner',
    duration: '20 mins',
    
    format: 'step-by-step',
    rovGuide: 'ROV-C',
    
    steps: [
      {
        step: 1,
        title: 'Match the Button',
        description: 'If replacing, bring a remaining button to match. Check size (diameter), holes (2 or 4), and shank type.',
        tip: 'Keep a collection of spare buttons from charity shop garments—great for replacements.'
      },
      {
        step: 2,
        title: 'Thread Your Needle',
        description: 'Use matching polyester thread, doubled. Thread length: about 45cm. Knot the end securely.',
      },
      {
        step: 3,
        title: 'Mark Button Position',
        description: 'Overlap plackets correctly. Mark where button center should be using existing buttonhole as guide.',
      },
      {
        step: 4,
        title: 'Create a Thread Shank',
        description: 'Place a pin or matchstick across button top. Sew over it to create slack. This prevents button pulling fabric tight.',
        tip: 'Shank length should match fabric thickness. Thick coat = longer shank.',
        rovPrompt: 'Why do I need a thread shank?'
      },
      {
        step: 5,
        title: 'Sewing Pattern (4-Hole)',
        description: 'Parallel: professional look. X-pattern: decorative. Square: extra secure. 4-6 passes through each hole pair.',
      },
      {
        step: 6,
        title: 'Wrap the Shank',
        description: 'Remove pin. Wrap thread around shank 4-6 times. This strengthens and defines the shank.',
      },
      {
        step: 7,
        title: 'Secure the Thread',
        description: 'Take needle to back. Make small stitches through fabric only, then loop through to knot. Cut thread close.',
      },
      {
        step: 8,
        title: 'Buttonhole Repair',
        description: 'If buttonhole is frayed: buttonhole stitch around edges to reinforce. If too large: partially sew closed and re-cut.',
        tip: 'Fray Check liquid prevents buttonhole edges from deteriorating further.'
      }
    ],
    
    tools: [
      { name: 'Hand sewing needles (sharps)', price: '£2-4', essential: true },
      { name: 'Matching polyester thread', price: '£2-4', essential: true },
      { name: 'Thimble', price: '£2-5', essential: false },
      { name: 'Button collection', price: '£5-10', cyberstoreSlug: 'button-box', essential: false },
      { name: 'Fray Check', price: '£4-6', cyberstoreSlug: 'fray-check', essential: false },
      { name: 'Small sharp scissors', price: '£5-10', essential: true }
    ],
    
    commonMistakes: [
      'No thread shank—button pulls fabric, looks puckered',
      'Too few passes through holes—button falls off again',
      'Wrong thread—cotton thread on polyester fabric may break',
      'Not matching button properly—visible replacement',
      'Cutting thread too close—knot comes undone'
    ],
    
    freeAccess: true,
    
    kit: {
      name: 'Button Repair Kit',
      slug: 'button-kit',
      price: '£12.99',
      contents: ['Mixed button collection (100+)', 'Needle set', 'Thread assortment', 'Thimble', 'Fray Check']
    },
    
    workshop: {
      title: 'Hand Sewing Fundamentals',
      duration: '1 hour',
      price: '£20',
      format: 'zoom',
      bookingSlug: 'hand-sewing-workshop'
    },
    
    nextTutorials: ['hand-stitches-advanced'],
    badgeAwarded: 'hand-sewing-basics',
    
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // CARNIVAL & COSTUME PATHWAY
  // ========================================
  {
    id: 'wire-bending-basics',
    slug: 'wire-bending-basics',
    title: 'Wire Bending for Carnival Structures',
    description: 'The foundation of mas costume construction. Learn to bend, join, and shape wire frames for headdresses and backpacks.',
    icon: '〰️',
    
    programmes: ['silk-stilettos', 'kaywanas-court'],
    primaryProgramme: 'silk-stilettos',
    pathway: 'Carnival & Costume',
    tags: ['wire', 'carnival', 'mas', 'structure', 'costume'],
    
    difficulty: 'beginner',
    duration: '40 mins',
    
    format: 'step-by-step',
    rovGuide: 'ROV-C',
    alternativeGuides: ['ROV-P'],
    
    steps: [
      {
        step: 1,
        title: 'Understanding Wire Types',
        description: '16 gauge: main structure, holds shape. 18 gauge: details, easier to bend. 20 gauge: fine details, covering wire. Galvanized or spring steel.',
        tip: 'Start with 18 gauge—easier to work with while learning.',
        rovPrompt: 'What gauge wire should I use for a headdress frame?'
      },
      {
        step: 2,
        title: 'Safety First',
        description: 'Wire ends are sharp. Always file or tape cut ends. Work gloves protect hands. Safety glasses prevent eye injury.',
        warning: 'Never leave wire ends exposed. Someone will get scratched.'
      },
      {
        step: 3,
        title: 'Basic Curves',
        description: 'Use your hands for gentle curves. Use pliers for tighter bends. Wrap around round objects (cans, pipes) for consistent circles.',
        tip: 'Keep a collection of round objects in different sizes for templates.'
      },
      {
        step: 4,
        title: 'Creating a Base Frame',
        description: 'Start with the headband or collar base. This anchors everything else. Must fit comfortably and stay in place.',
        checkpoint: true
      },
      {
        step: 5,
        title: 'Joining Wire Pieces',
        description: 'Overlap joint: wrap binding wire around both pieces. Hook joint: bend ends into hooks, crimp together. Both work, overlap is stronger.',
      },
      {
        step: 6,
        title: 'Building Height and Width',
        description: 'Add vertical supports first. Then horizontal braces. Work symmetrically. Step back often to check balance.',
        tip: 'Take photos from multiple angles to check symmetry.'
      },
      {
        step: 7,
        title: 'Covering Sharp Edges',
        description: 'Wrap all exposed ends with tape. Or cover with fabric or foam. Or file smooth. Every edge must be safe.',
        warning: 'Wire through fabric can cut skin. Cover before covering with fabric.'
      },
      {
        step: 8,
        title: 'Testing the Structure',
        description: 'Put it on. Move around. Does it stay? Is it balanced? Does anything poke? Fix issues before decorating.',
      }
    ],
    
    tools: [
      { name: 'Wire (18 gauge) 50m', price: '£15-20', cyberstoreSlug: 'costume-wire', essential: true },
      { name: 'Wire cutters', price: '£8-15', cyberstoreSlug: 'wire-cutters', essential: true },
      { name: 'Pliers (needle nose)', price: '£6-10', essential: true },
      { name: 'Pliers (round nose)', price: '£6-10', essential: false },
      { name: 'Binding wire (22 gauge)', price: '£5-8', essential: true },
      { name: 'Work gloves', price: '£5-10', essential: true },
      { name: 'Electrical tape', price: '£2-4', essential: true },
      { name: 'File or sandpaper', price: '£3-5', essential: true }
    ],
    
    commonMistakes: [
      'Not filing sharp ends—someone always gets scratched',
      'Making frame too heavy—can\'t wear it for hours',
      'Asymmetric construction—looks unbalanced',
      'Weak joints—structure collapses during wining',
      'Not testing on body before decorating—doesn\'t fit properly'
    ],
    
    freeAccess: true,
    
    kit: {
      name: 'Wire Working Starter Kit',
      slug: 'wire-kit',
      price: '£34.99',
      contents: ['18 gauge wire 50m', '22 gauge wire 25m', 'Wire cutters', 'Needle nose pliers', 'Work gloves', 'Tape assortment']
    },
    
    workshop: {
      title: 'Carnival Wire Workshop',
      duration: '2 hours',
      price: '£35',
      format: 'zoom',
      bookingSlug: 'wire-workshop'
    },
    
    nextTutorials: ['feather-attachment', 'headpiece-foundation'],
    relatedTutorials: ['fabric-covering-frames'],
    badgeAwarded: 'wire-basics',
    
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  
  {
    id: 'feather-attachment',
    slug: 'feather-attachment',
    title: 'Feather Selection & Attachment',
    description: 'Feathers make the costume. Learn to select, prepare, and attach feathers for maximum impact and durability.',
    icon: '🪶',
    
    programmes: ['silk-stilettos', 'kaywanas-court'],
    primaryProgramme: 'silk-stilettos',
    pathway: 'Carnival & Costume',
    tags: ['feathers', 'carnival', 'mas', 'decoration'],
    
    difficulty: 'beginner',
    duration: '35 mins',
    prerequisites: ['wire-bending-basics'],
    
    format: 'step-by-step',
    rovGuide: 'ROV-C',
    
    steps: [
      {
        step: 1,
        title: 'Feather Types',
        description: 'Ostrich: full, flowing, expensive. Peacock: eye feathers, striking. Coque: rooster, various sizes. Pheasant: long, patterned. Goose: budget option.',
        tip: 'Buy feathers in bulk from wholesalers—Cyberstore has connections.',
        rovPrompt: 'Which feathers work best for backpacks vs headdresses?'
      },
      {
        step: 2,
        title: 'Feather Preparation',
        description: 'Sort by size and quality. Steam to restore fluff. Trim any damaged areas. Some costumers dye feathers for exact colour match.',
      },
      {
        step: 3,
        title: 'Planning Placement',
        description: 'Work from bottom to top, inside to outside. Larger feathers at back, smaller at front. Feathers should hide attachment points of feathers above.',
        checkpoint: true
      },
      {
        step: 4,
        title: 'Creating Feather Pads',
        description: 'For mass attachment: glue feathers to felt or interfacing strips. Then attach strips to frame. Faster than individual feathers.',
        tip: 'Pre-made pads are consistent and attach quickly during final assembly.'
      },
      {
        step: 5,
        title: 'Individual Feather Attachment',
        description: 'For special placement: cable tie stem to wire frame, or wrap with floral wire. Add hot glue at base for security.',
      },
      {
        step: 6,
        title: 'Hot Glue Technique',
        description: 'Apply glue to attachment point, not feather stem. Press feather into glue. Hold until set. Add reinforcement ties for heavy feathers.',
        warning: 'Hot glue on feathers can melt the barbs. Always apply to base first.'
      },
      {
        step: 7,
        title: 'Filling Gaps',
        description: 'Step back and look for bald spots. Add smaller feathers to fill gaps. Use contrasting colours for depth.',
      },
      {
        step: 8,
        title: 'Final Fluff and Set',
        description: 'Steam the entire piece gently to fluff feathers. Spray with light hairspray to hold shape. Check for loose feathers.',
        tip: 'Always have spare feathers ready for road repairs.'
      }
    ],
    
    tools: [
      { name: 'Ostrich feathers (pack)', price: '£30-80', cyberstoreSlug: 'ostrich-feathers', essential: true },
      { name: 'Coque feathers (pack)', price: '£15-30', cyberstoreSlug: 'coque-feathers', essential: false },
      { name: 'Hot glue gun', price: '£10-20', cyberstoreSlug: 'glue-gun', essential: true },
      { name: 'Glue sticks (pack)', price: '£5-10', essential: true },
      { name: 'Cable ties (small)', price: '£3-5', essential: true },
      { name: 'Floral wire', price: '£3-5', essential: false },
      { name: 'Steamer or kettle', price: 'Usually have', essential: true },
      { name: 'Felt for pads', price: '£5-10', essential: false }
    ],
    
    commonMistakes: [
      'Applying glue directly to feather—melts barbs',
      'Not working bottom to top—attachment points visible',
      'All same-size feathers—looks flat, no dimension',
      'Not securing heavy feathers—they fall off dancing',
      'Forgetting spares—can\'t fix on the road'
    ],
    
    freeAccess: true,
    
    kit: {
      name: 'Feather Working Kit',
      slug: 'feather-kit',
      price: '£49.99',
      contents: ['Mixed feather selection', 'Hot glue gun', 'Glue sticks', 'Cable ties', 'Floral wire', 'Felt sheets']
    },
    
    workshop: {
      title: 'Featherwork Masterclass',
      duration: '2 hours',
      price: '£40',
      format: 'zoom',
      bookingSlug: 'feather-workshop'
    },
    
    nextTutorials: ['headpiece-foundation', 'beading-basics'],
    badgeAwarded: 'feather-basics',
    
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  
  {
    id: 'headpiece-foundation',
    slug: 'headpiece-foundation',
    title: 'Headpiece Foundation Construction',
    description: 'Build a secure, comfortable base for elaborate headdresses. The foundation determines wearability.',
    icon: '👑',
    
    programmes: ['silk-stilettos', 'kaywanas-court'],
    primaryProgramme: 'silk-stilettos',
    pathway: 'Carnival & Costume',
    tags: ['headpiece', 'carnival', 'mas', 'foundation', 'wearable'],
    
    difficulty: 'intermediate',
    duration: '45 mins',
    prerequisites: ['wire-bending-basics'],
    
    format: 'step-by-step',
    rovGuide: 'ROV-C',
    
    steps: [
      {
        step: 1,
        title: 'Measure the Head',
        description: 'Measure around head at widest point (usually just above ears). Add 2cm for padding. Measure front-to-back over crown.',
        tip: 'Every head is different. Never assume "one size fits all."'
      },
      {
        step: 2,
        title: 'Create the Headband Base',
        description: 'Form wire into a circle matching head measurement. Join securely. This is the anchor for everything.',
        checkpoint: true
      },
      {
        step: 3,
        title: 'Add the Crown Supports',
        description: 'Two wire arcs from front to back, crossing at crown. These distribute weight and prevent the headpiece slipping.',
      },
      {
        step: 4,
        title: 'Padding for Comfort',
        description: 'Wrap headband with foam or thick fabric. Cover with final fabric. This prevents wire cutting into forehead.',
        tip: 'Neoprene works well—doesn\'t absorb sweat and cushions.'
      },
      {
        step: 5,
        title: 'Securing Methods',
        description: 'Options: bobby pin loops, comb attachment, chin strap, hat elastic. Heavy headpieces need multiple methods.',
        rovPrompt: 'How do I secure a heavy headpiece for jumping and wining?'
      },
      {
        step: 6,
        title: 'Building Height',
        description: 'Vertical wires from crown supports create height. Cross-brace for stability. Keep weight centred over head, not leaning.',
        warning: 'Tall + heavy + off-centre = headache and neck strain.'
      },
      {
        step: 7,
        title: 'Covering the Frame',
        description: 'Stretch fabric over frame or wrap with strips. Secure with glue or stitching. Frame should be invisible under decoration.',
      },
      {
        step: 8,
        title: 'Wear Test',
        description: 'Put it on. Dance. Jump. Wine. Does it stay? Is it comfortable after 10 minutes? Fix issues before decorating.',
      }
    ],
    
    tools: [
      { name: 'Wire (16 gauge)', price: '£15-20', cyberstoreSlug: 'costume-wire', essential: true },
      { name: 'Foam padding', price: '£5-10', essential: true },
      { name: 'Stretch fabric', price: '£5-15', essential: true },
      { name: 'Hat elastic', price: '£2-4', essential: true },
      { name: 'Hair combs', price: '£3-5', essential: false },
      { name: 'Bobby pins', price: '£2-3', essential: true },
      { name: 'Hot glue gun', price: '£10-20', essential: true }
    ],
    
    commonMistakes: [
      'No padding—wire digs into head after an hour',
      'Only one securing method—headpiece flies off',
      'Off-centre weight—constant adjusting and neck pain',
      'Not testing before decorating—can\'t fix fit issues',
      'Frame visible through covering—looks unfinished'
    ],
    
    freeAccess: true,
    
    kit: {
      name: 'Headpiece Foundation Kit',
      slug: 'headpiece-kit',
      price: '£29.99',
      contents: ['16 gauge wire', 'Foam padding roll', 'Stretch fabric selection', 'Hat elastic', 'Combs and bobby pins', 'Securing hardware']
    },
    
    workshop: {
      title: 'Headpiece Construction Workshop',
      duration: '2.5 hours',
      price: '£45',
      format: 'zoom',
      bookingSlug: 'headpiece-workshop'
    },
    
    nextTutorials: ['backpack-construction', 'collar-construction'],
    badgeAwarded: 'headpiece-maker',
    
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // TEXTILE ARTS PATHWAY
  // ========================================
  {
    id: 'fabric-selection',
    slug: 'fabric-selection',
    title: 'Fabric Selection & Properties',
    description: 'Knowing your fabrics prevents expensive mistakes. Learn to identify, test, and select fabrics for different projects.',
    icon: '🧶',
    
    programmes: ['silk-stilettos'],
    primaryProgramme: 'silk-stilettos',
    pathway: 'Textile Arts',
    tags: ['fabric', 'textiles', 'selection', 'properties'],
    
    difficulty: 'beginner',
    duration: '30 mins',
    
    format: 'step-by-step',
    rovGuide: 'ROV-C',
    
    steps: [
      {
        step: 1,
        title: 'Natural vs Synthetic',
        description: 'Cotton, linen, silk, wool = natural. Polyester, nylon, acrylic = synthetic. Blends combine properties. Each behaves differently.',
        rovPrompt: 'How do I know if fabric is natural or synthetic?'
      },
      {
        step: 2,
        title: 'The Burn Test',
        description: 'Cut small sample. Hold with tweezers. Light with match. Natural: burns to ash. Synthetic: melts, beads up. Blend: combination.',
        warning: 'Do this safely—over sink with water ready.'
      },
      {
        step: 3,
        title: 'Weight and Drape',
        description: 'Hold fabric up—how does it fall? Stiff or flowing? Heavy or light? Match weight to project. Evening wear needs drape.',
        tip: 'Hold fabric against your body in the shop mirror to see how it moves.'
      },
      {
        step: 4,
        title: 'Stretch and Recovery',
        description: 'Pull fabric gently. Does it stretch? Does it spring back? Stretch is good for fitted garments. Recovery prevents bagging.',
        checkpoint: true
      },
      {
        step: 5,
        title: 'Care Requirements',
        description: 'Will it wash or need dry cleaning? Iron temperature? Shrinkage risk? Tell customers care requirements.',
        tip: 'Always pre-wash fabric before cutting to prevent shrinkage surprises.'
      },
      {
        step: 6,
        title: 'Print Direction',
        description: 'One-way prints must all go same direction. Check before cutting. More fabric needed for matching patterns.',
      },
      {
        step: 7,
        title: 'Grain Line',
        description: 'Straight grain runs parallel to selvedge. Cross grain runs across. Bias is 45 degrees—stretches. Cut on correct grain.',
      },
      {
        step: 8,
        title: 'African Print Specifics',
        description: 'Ankara is usually 100% cotton, 6 yards (5.5m). Dutch wax holds colour better than Chinese wax. Check both sides for best print.',
        tip: 'Buy from trusted Cyberstore suppliers—quality varies hugely.'
      }
    ],
    
    tools: [
      { name: 'Fabric sample book', price: 'Build your own', essential: true },
      { name: 'Matches/lighter', price: '£1', essential: false },
      { name: 'Tweezers', price: '£2-4', essential: false },
      { name: 'Measuring tape', price: '£2-5', essential: true },
      { name: 'Notebook', price: '£2-5', essential: true }
    ],
    
    commonMistakes: [
      'Not pre-washing—garment shrinks after first wash',
      'Wrong weight for design—stiff fabric won\'t drape',
      'Ignoring grain line—garment twists when worn',
      'Not matching pattern at seams—looks amateur',
      'Buying cheap wax print—colour runs, fabric tears'
    ],
    
    freeAccess: true,
    
    nextTutorials: ['basic-embroidery', 'fabric-dyeing-intro'],
    relatedTutorials: ['african-print-cutting'],
    badgeAwarded: 'fabric-knowledge',
    
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  
  {
    id: 'basic-embroidery',
    slug: 'basic-embroidery',
    title: 'Hand Embroidery Basics',
    description: 'Add value to plain garments with embroidery. Learn 6 essential stitches that cover most decorative needs.',
    icon: '🪡',
    
    programmes: ['silk-stilettos'],
    primaryProgramme: 'silk-stilettos',
    pathway: 'Textile Arts',
    tags: ['embroidery', 'hand sewing', 'decoration', 'stitches'],
    
    difficulty: 'beginner',
    duration: '45 mins',
    
    format: 'step-by-step',
    rovGuide: 'ROV-C',
    
    steps: [
      {
        step: 1,
        title: 'Materials Setup',
        description: 'Embroidery hoop keeps fabric taut. Stranded cotton (6 strands, separate as needed). Embroidery needles have larger eyes. Scissors.',
        tip: 'Start with a sampler cloth to practice before working on real garments.'
      },
      {
        step: 2,
        title: 'Hooping the Fabric',
        description: 'Inner hoop under fabric, outer hoop over. Tighten until fabric is drum-tight. Adjust as you work if it loosens.',
      },
      {
        step: 3,
        title: 'Running Stitch',
        description: 'In and out, even spaces. Foundation of embroidery. Use for outlines, borders, quilting. Simple but effective.',
        checkpoint: true
      },
      {
        step: 4,
        title: 'Back Stitch',
        description: 'Go back into previous hole, come out ahead. Creates solid line. Best for outlines, lettering, details.',
      },
      {
        step: 5,
        title: 'Satin Stitch',
        description: 'Parallel stitches side by side. Fills shapes with smooth surface. Keep stitches close, maintain straight edges.',
        tip: 'Outline the shape first with back stitch, then fill with satin stitch.'
      },
      {
        step: 6,
        title: 'French Knot',
        description: 'Wrap thread around needle 2-3 times. Insert needle close to exit point. Pull through. Creates textured dots.',
        rovPrompt: 'I keep messing up French knots—what am I doing wrong?'
      },
      {
        step: 7,
        title: 'Chain Stitch',
        description: 'Loop the thread, hold loop, bring needle through loop. Creates linked chains. Good for outlines and fills.',
      },
      {
        step: 8,
        title: 'Lazy Daisy',
        description: 'Single chain stitch anchored at end. Creates petal shapes. Combine for flowers, leaves, decorative elements.',
      }
    ],
    
    tools: [
      { name: 'Embroidery hoop (6")', price: '£3-5', cyberstoreSlug: 'embroidery-hoop', essential: true },
      { name: 'Stranded cotton set', price: '£8-15', cyberstoreSlug: 'embroidery-thread', essential: true },
      { name: 'Embroidery needles', price: '£2-4', essential: true },
      { name: 'Fabric for practice', price: '£3-5', essential: true },
      { name: 'Water-soluble marking pen', price: '£3-5', essential: false },
      { name: 'Small scissors', price: '£5-10', essential: true }
    ],
    
    commonMistakes: [
      'Fabric too loose in hoop—stitches pucker',
      'Thread too long—tangles and knots',
      'Pulling too tight—fabric distorts',
      'Not separating strands—too thick for delicate work',
      'Starting with complex design—get frustrated, give up'
    ],
    
    freeAccess: true,
    
    kit: {
      name: 'Embroidery Starter Kit',
      slug: 'embroidery-kit',
      price: '£19.99',
      contents: ['Embroidery hoop', 'Thread collection (30 colours)', 'Needle set', 'Practice fabric', 'Pattern booklet', 'Scissors']
    },
    
    workshop: {
      title: 'Embroidery for Beginners',
      duration: '1.5 hours',
      price: '£25',
      format: 'zoom',
      bookingSlug: 'embroidery-workshop'
    },
    
    nextTutorials: ['embroidery-patterns', 'bead-embroidery'],
    badgeAwarded: 'embroidery-basics',
    
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  
  {
    id: 'fabric-dyeing-intro',
    slug: 'fabric-dyeing-intro',
    title: 'Introduction to Fabric Dyeing',
    description: 'Transform plain fabric with colour. Learn safety, fibre selection, and basic dyeing techniques.',
    icon: '🎨',
    
    programmes: ['silk-stilettos'],
    primaryProgramme: 'silk-stilettos',
    pathway: 'Textile Arts',
    tags: ['dyeing', 'colour', 'textiles', 'customization'],
    
    difficulty: 'beginner',
    duration: '50 mins',
    
    format: 'step-by-step',
    rovGuide: 'ROV-C',
    
    steps: [
      {
        step: 1,
        title: 'Fibre Matters',
        description: 'Natural fibres (cotton, linen, silk, wool) dye best. Polyester resists dye. Check fibre content before starting.',
        tip: 'Do a burn test if unsure. Don\'t waste dye on polyester.',
        rovPrompt: 'Can I dye a polyester/cotton blend?'
      },
      {
        step: 2,
        title: 'Safety First',
        description: 'Work in ventilated area. Wear gloves—dye stains skin for days. Dedicated pots and utensils (not for food). Eye protection recommended.',
        warning: 'Dyes are chemicals. Treat with respect. Keep away from children.'
      },
      {
        step: 3,
        title: 'Prepare the Fabric',
        description: 'Wash to remove sizing/oils. Weigh when dry—dye quantity depends on fabric weight. Pre-wet before dyeing for even absorption.',
        checkpoint: true
      },
      {
        step: 4,
        title: 'Choosing Dye Type',
        description: 'Fibre reactive: for cotton, linen (permanent). Acid dyes: for silk, wool. All-purpose (Dylon): compromise, less vibrant. Read labels.',
      },
      {
        step: 5,
        title: 'Mixing the Dye Bath',
        description: 'Dissolve dye completely before adding fabric. Add salt (cotton) or vinegar (silk/wool) as fixative. Maintain correct temperature.',
      },
      {
        step: 6,
        title: 'Dyeing Process',
        description: 'Submerge fabric completely. Stir constantly for even colour—at least 30-60 minutes for deep colour. Don\'t walk away.',
        tip: 'Set a timer. Stirring feels boring but prevents blotches.'
      },
      {
        step: 7,
        title: 'Rinsing',
        description: 'Rinse in gradually cooling water until water runs clear. May take many rinses. Final rinse with mild soap.',
      },
      {
        step: 8,
        title: 'Drying and Fixing',
        description: 'Dry out of direct sunlight. Heat set if recommended (iron or tumble dry). First wash separately in case of bleeding.',
      }
    ],
    
    tools: [
      { name: 'Fabric dye (fibre reactive)', price: '£5-10', cyberstoreSlug: 'fabric-dye', essential: true },
      { name: 'Rubber gloves', price: '£2-4', essential: true },
      { name: 'Large pot (not for food)', price: '£10-20', essential: true },
      { name: 'Stirring utensils', price: '£3-5', essential: true },
      { name: 'Salt or soda ash', price: '£3-5', essential: true },
      { name: 'Measuring spoons', price: '£2-3', essential: true },
      { name: 'Apron', price: '£5-10', essential: true }
    ],
    
    commonMistakes: [
      'Dyeing polyester—dye washes out',
      'Not stirring—blotchy results',
      'Too little time in dye bath—pale colour',
      'Not pre-washing fabric—sizing prevents absorption',
      'Wrong dye for fibre type—poor results'
    ],
    
    freeAccess: true,
    
    kit: {
      name: 'Fabric Dyeing Starter Kit',
      slug: 'dyeing-kit',
      price: '£34.99',
      contents: ['Fibre reactive dye set (6 colours)', 'Soda ash', 'Gloves', 'Stirring tools', 'Measuring set', 'Instruction booklet']
    },
    
    workshop: {
      title: 'Natural Dyeing Workshop',
      duration: '2 hours',
      price: '£35',
      format: 'zoom',
      bookingSlug: 'dyeing-workshop'
    },
    
    nextTutorials: ['tie-dye-techniques', 'batik-basics'],
    badgeAwarded: 'dye-basics',
    
    lastUpdated: '2024-12-26',
    version: '1.0'
  }
];

export default SILK_STILETTOS_TUTORIALS;