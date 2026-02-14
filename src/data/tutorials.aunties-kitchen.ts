/**
 * AUNTIE'S KITCHEN TUTORIALS
 * ==========================
 * 
 * 3 free tutorials per pathway = 9 free total
 * ROV-H (Heritage) guide throughout
 */

import { Tutorial } from '../types/tutorial';

export const AUNTIES_KITCHEN_TUTORIALS: Tutorial[] = [
  // ========================================
  // CARIBBEAN COOKING FOUNDATIONS PATHWAY
  // ========================================
  {
    id: 'perfect-rice-and-peas',
    slug: 'perfect-rice-and-peas',
    title: 'Perfect Rice and Peas',
    description: 'The foundation of Caribbean Sunday dinner. Coconut milk, kidney beans, and the secret to fluffy, flavourful rice.',
    icon: '🍚',
    programmes: ['aunties-kitchen'],
    primaryProgramme: 'aunties-kitchen',
    pathway: 'Caribbean Cooking Foundations',
    tags: ['rice', 'caribbean', 'jamaican', 'foundation', 'vegan'],
    difficulty: 'beginner',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    steps: [
      { step: 1, title: 'Prepare Your Peas', description: 'Dried kidney beans: soak overnight, boil until tender (1-2 hours). Tinned: drain and rinse. Dried gives better flavour.', tip: 'Add a pinch of bicarbonate of soda when boiling dried peas—softens faster.' },
      { step: 2, title: 'The Coconut Milk', description: 'Full fat, not light. One tin (400ml) per cup of rice. This is non-negotiable. The fat carries flavour.', rovPrompt: 'Can I make fresh coconut milk instead?' },
      { step: 3, title: 'Season the Liquid', description: 'Coconut milk + water (equal parts). Add: scotch bonnet (whole, don\'t burst), thyme sprigs, garlic, salt, black pepper.', checkpoint: true },
      { step: 4, title: 'Toast the Rice', description: 'Rinse rice until water runs clear. Toast in pot with a little oil for 2 minutes. Brings out nutty flavour.' },
      { step: 5, title: 'The Ratio', description: '1 cup rice : 1.5 cups liquid (coconut milk + water combined). Adjust slightly for your pot and stove.' },
      { step: 6, title: 'Add Peas and Liquid', description: 'Add cooked peas to rice. Pour in seasoned liquid. Stir once. Bring to boil, then immediately reduce to lowest heat.' },
      { step: 7, title: 'The Steam', description: 'Cover tightly. Do NOT lift lid for 20 minutes. Resist the urge. Steam does the work.', warning: 'Lifting the lid releases steam and ruins the texture.' },
      { step: 8, title: 'Rest and Fluff', description: 'After 20 mins, remove from heat. Let sit 5 mins covered. Then fluff with fork. Remove scotch bonnet and thyme. Serve.' }
    ],
    tools: [
      { name: 'Heavy-bottomed pot with tight lid', price: '£20-40', essential: true },
      { name: 'Measuring cups', price: '£5', essential: true },
      { name: 'Fork for fluffing', price: 'Already have', essential: true }
    ],
    commonMistakes: ['Using light coconut milk', 'Wrong rice:liquid ratio', 'Lifting the lid', 'Not rinsing rice', 'Bursting the scotch bonnet (too hot!)'],
    freeAccess: true,
    kit: { name: 'Caribbean Staples Kit', slug: 'caribbean-staples', price: '£24.99', contents: ['Coconut milk 4-pack', 'Dried kidney beans', 'Scotch bonnet peppers', 'Dried thyme', 'All-purpose seasoning'] },
    workshop: { title: 'Caribbean Sunday Dinner', duration: '2.5 hours', price: '£40', format: 'in-person', bookingSlug: 'sunday-dinner' },
    nextTutorials: ['curry-base-mastery', 'jerk-seasoning'],
    badgeAwarded: 'rice-and-peas-master',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'curry-base-mastery',
    slug: 'curry-base-mastery',
    title: 'Caribbean Curry Base Mastery',
    description: 'The golden foundation for curry chicken, goat, and vegetables. Different from Indian curry—distinctly Caribbean.',
    icon: '🍛',
    programmes: ['aunties-kitchen'],
    primaryProgramme: 'aunties-kitchen',
    pathway: 'Caribbean Cooking Foundations',
    tags: ['curry', 'caribbean', 'base', 'foundation'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    steps: [
      { step: 1, title: 'Caribbean vs Indian Curry', description: 'Caribbean curry: yellow, milder, uses more turmeric. Came via indentured workers from India, evolved in the islands.', rovPrompt: 'Tell me about the history of curry in the Caribbean.' },
      { step: 2, title: 'The Curry Powder', description: 'Use Caribbean/Jamaican curry powder. More turmeric, less heat than Madras. Or make your own blend.', tip: 'Toast curry powder in dry pan for 30 seconds—awakens the oils.' },
      { step: 3, title: 'Build the Base', description: 'Oil (hot) → onions (soft) → garlic, ginger, scotch bonnet → curry powder (toast 1 min) → tomatoes.', checkpoint: true },
      { step: 4, title: 'The Bloom', description: 'Curry powder needs to "bloom" in hot oil. This releases flavour. Don\'t skip this step. Don\'t burn it.', warning: 'Burnt curry powder = bitter dish. Medium heat, keep it moving.' },
      { step: 5, title: 'Liquid and Simmer', description: 'Add stock or water. Bring to boil, then simmer. The longer it simmers, the deeper the flavour develops.' },
      { step: 6, title: 'Potato Question', description: 'Potatoes in curry = traditional. They absorb flavour and thicken sauce. Add early for soft, late for firm.' },
      { step: 7, title: 'Finish with Freshness', description: 'Fresh thyme at the end. Some add coconut milk for richness. Adjust salt. The base is ready.' },
      { step: 8, title: 'Adapt for Proteins', description: 'Chicken: brown first, add to base. Goat: longer simmer. Fish: add at end, barely cook. Vegetables: layer by cooking time.' }
    ],
    tools: [
      { name: 'Heavy pot or Dutch oven', price: '£25-60', essential: true },
      { name: 'Wooden spoon', price: '£3', essential: true },
      { name: 'Sharp knife', price: '£15-40', essential: true }
    ],
    commonMistakes: ['Not toasting curry powder', 'Burning the spices', 'Not enough cooking time', 'Adding tomatoes before spices bloom', 'Using wrong curry powder'],
    freeAccess: true,
    workshop: { title: 'Curry Masterclass', duration: '2 hours', price: '£35', format: 'in-person', bookingSlug: 'curry-masterclass' },
    nextTutorials: ['jerk-seasoning', 'curry-goat'],
    badgeAwarded: 'curry-master',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'jerk-seasoning',
    slug: 'jerk-seasoning',
    title: 'Authentic Jerk Seasoning',
    description: 'Make your own jerk marinade from scratch. Scotch bonnet, allspice, thyme—the real thing, not the bottle.',
    icon: '🌶️',
    programmes: ['aunties-kitchen'],
    primaryProgramme: 'aunties-kitchen',
    pathway: 'Caribbean Cooking Foundations',
    tags: ['jerk', 'jamaican', 'seasoning', 'marinade', 'spicy'],
    difficulty: 'beginner',
    duration: '30 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    steps: [
      { step: 1, title: 'Jerk History', description: 'Maroon tradition from Jamaica. Escaped enslaved people preserved and spiced meat in the mountains. Pimento wood smoke is traditional.', rovPrompt: 'Tell me more about the Maroon origins of jerk.' },
      { step: 2, title: 'The Essential Ingredients', description: 'Scotch bonnet, allspice (pimento), thyme, garlic, ginger, scallion. These are non-negotiable. Everything else varies by family.', checkpoint: true },
      { step: 3, title: 'Fresh vs Dried Allspice', description: 'Fresh pimento berries are best, crushed. Dried ground allspice works. This is THE flavour of jerk—don\'t skimp.' },
      { step: 4, title: 'Heat Level', description: '2-3 scotch bonnets = medium-hot. Adjust to taste. Remove seeds for less heat. Warn your guests.', warning: 'Wear gloves when handling scotch bonnets. Don\'t touch your eyes.' },
      { step: 5, title: 'The Blend', description: 'Blender or food processor. Blend all ingredients with oil and vinegar/lime juice. Should be wet paste, not powder.' },
      { step: 6, title: 'Additional Flavours', description: 'Optional: soy sauce, brown sugar, nutmeg, cinnamon. Each family has secrets. Start classic, then make it yours.' },
      { step: 7, title: 'Marinating', description: 'Score meat so marinade penetrates. Overnight minimum for chicken. 24-48 hours for pork or goat. Refrigerate.' },
      { step: 8, title: 'Storage', description: 'Keeps 2 weeks refrigerated. Freeze in portions for longer. Make a big batch—you\'ll use it.' }
    ],
    tools: [
      { name: 'Blender or food processor', price: '£25-80', essential: true },
      { name: 'Gloves', price: '£3', essential: true },
      { name: 'Airtight containers', price: '£5', essential: true }
    ],
    commonMistakes: ['Not enough allspice', 'Using wrong peppers (must be scotch bonnet)', 'Not marinating long enough', 'Forgetting the gloves', 'Making it too wet/thin'],
    freeAccess: true,
    kit: { name: 'Jerk Making Kit', slug: 'jerk-kit', price: '£19.99', contents: ['Scotch bonnet peppers', 'Whole allspice', 'Fresh thyme', 'Recipe cards', 'Container'] },
    workshop: { title: 'Jerk Masterclass', duration: '2 hours', price: '£35', format: 'in-person', bookingSlug: 'jerk-masterclass' },
    nextTutorials: ['jerk-chicken', 'bbq-techniques'],
    badgeAwarded: 'jerk-maker',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // RECIPE HERITAGE PATHWAY
  // ========================================
  {
    id: 'documenting-family-recipes',
    slug: 'documenting-family-recipes',
    title: 'Documenting Family Recipes',
    description: 'Capture Granny\'s recipes before they\'re lost. Interview techniques, measurement conversion, and preservation.',
    icon: '📝',
    programmes: ['aunties-kitchen', 'pageturners'],
    primaryProgramme: 'aunties-kitchen',
    pathway: 'Recipe Heritage',
    tags: ['heritage', 'family', 'documentation', 'preservation'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    steps: [
      { step: 1, title: 'Why This Matters', description: 'Recipes are cultural memory. When elders pass, recipes go with them. Documentation is preservation. This is urgent work.', tip: 'Start now. Don\'t wait until it\'s too late.' },
      { step: 2, title: 'The Interview Approach', description: 'Don\'t interrogate—cook together. Record the session. Let them talk while they cook. Stories come with the food.', rovPrompt: 'What questions should I ask when documenting recipes?' },
      { step: 3, title: 'Recording Methods', description: 'Phone video is perfect. Capture hands, techniques, the whole process. Audio alone misses too much.', checkpoint: true },
      { step: 4, title: 'Converting "Likkle Bit" to Measurements', description: '"Likkle bit" = approximately 1/4 tsp. "Good amount" = 1-2 tbsp. Watch them, then measure what they did.' },
      { step: 5, title: 'Technique Over Ingredients', description: 'The technique is often more important than exact amounts. How they stir, when they add, how they know it\'s ready.' },
      { step: 6, title: 'The Stories Behind the Food', description: 'Ask: "Where did you learn this?" "When do you make it?" "What does it remind you of?" Context is content.' },
      { step: 7, title: 'Testing and Refining', description: 'Make the recipe yourself. Does it taste right? Adjust, test again. Get their approval on your version.' },
      { step: 8, title: 'Sharing and Preserving', description: 'Type up the recipe with the story. Share with family. Consider Recipe Heritage Keeper tool. These are living documents.' }
    ],
    tools: [
      { name: 'Phone for recording', price: 'Already have', essential: true },
      { name: 'Notebook', price: '£3', essential: true },
      { name: 'Measuring spoons and cups', price: '£8', essential: true }
    ],
    commonMistakes: ['Waiting too long to start', 'Only capturing ingredients, not technique', 'Not recording video', 'Forgetting the stories', 'Not testing the recipe yourself'],
    freeAccess: true,
    kit: { name: 'Recipe Documentation Kit', slug: 'recipe-doc-kit', price: '£14.99', contents: ['Recipe cards', 'Family tree template', 'Interview question guide', 'Measurement conversion chart'] },
    workshop: { title: 'Recipe Heritage Documentation', duration: '1.5 hours', price: '£25', format: 'zoom', bookingSlug: 'recipe-heritage' },
    nextTutorials: ['oral-history-techniques', 'creating-family-cookbook'],
    badgeAwarded: 'recipe-keeper',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'island-variations',
    slug: 'island-variations',
    title: 'Understanding Island Variations',
    description: 'Jamaican vs Trini vs Bajan. How the same dish differs across the Caribbean and why.',
    icon: '🏝️',
    programmes: ['aunties-kitchen'],
    primaryProgramme: 'aunties-kitchen',
    pathway: 'Recipe Heritage',
    tags: ['caribbean', 'culture', 'regional', 'heritage'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    steps: [
      { step: 1, title: 'One Caribbean, Many Traditions', description: 'Each island has unique history, influences, and ingredients. African, Indian, Chinese, European, Indigenous—all blended differently.', rovPrompt: 'Explain the different cultural influences across Caribbean islands.' },
      { step: 2, title: 'Jamaican Characteristics', description: 'Heavy on allspice, scotch bonnet, thyme. Jerk tradition. Brown stew. Ackee and saltfish. Strong African and British influence.' },
      { step: 3, title: 'Trinidadian Characteristics', description: 'Indian influence strong—doubles, roti, curry. Callaloo with crab. More pepper sauce variation. Chinese influence too.', checkpoint: true },
      { step: 4, title: 'Bajan Characteristics', description: 'Flying fish and cou cou. More British influence. Sweeter preparations. Pudding and souse. Fish cakes.' },
      { step: 5, title: 'Guyanese Characteristics', description: 'Strong Indian influence—pepperpot, cook-up rice. Six peoples heritage. Unique blend of everything.' },
      { step: 6, title: 'The Same Dish, Different Ways', description: 'Rice and peas: Jamaica uses kidney beans, Trinidad uses pigeon peas. Curry: Jamaica mild, Trinidad hotter. Know the differences.' },
      { step: 7, title: 'Respecting Origins', description: 'Don\'t claim Jamaican food is "Caribbean" when it\'s specifically Jamaican. Credit the specific island and tradition.', warning: 'Each island\'s food is distinct. Don\'t homogenize.' },
      { step: 8, title: 'Learning Multiple Traditions', description: 'Try recipes from different islands. Understand the "why" behind variations. Expand your Caribbean cooking vocabulary.' }
    ],
    tools: [
      { name: 'Cookbooks from different islands', price: '£10-20 each', essential: false },
      { name: 'Curiosity', price: 'Free', essential: true },
      { name: 'People from different islands to talk to', price: 'Community', essential: true }
    ],
    commonMistakes: ['Assuming all Caribbean food is the same', 'Only knowing one island\'s food', 'Misattributing dishes', 'Not understanding the history', 'Cultural homogenization'],
    freeAccess: true,
    workshop: { title: 'Caribbean Food Tour', duration: '3 hours', price: '£45', format: 'in-person', bookingSlug: 'caribbean-tour' },
    nextTutorials: ['trinidadian-basics', 'bajan-basics'],
    badgeAwarded: 'island-scholar',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'seasonal-celebrations',
    slug: 'seasonal-celebrations',
    title: 'Food for Seasonal Celebrations',
    description: 'Christmas sorrel, Easter bun, Nine Night traditions. The foods that mark Caribbean calendar.',
    icon: '🎄',
    programmes: ['aunties-kitchen'],
    primaryProgramme: 'aunties-kitchen',
    pathway: 'Recipe Heritage',
    tags: ['celebrations', 'christmas', 'easter', 'traditions', 'seasonal'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    steps: [
      { step: 1, title: 'Food as Calendar', description: 'Caribbean celebrations have specific foods. The food IS the celebration. Without the food, it\'s not complete.', rovPrompt: 'What are the most important food traditions in Caribbean culture?' },
      { step: 2, title: 'Christmas Foods', description: 'Sorrel drink (hibiscus), rum punch, black cake, ham, gungo peas instead of kidney beans. Preparation starts weeks early.', checkpoint: true },
      { step: 3, title: 'Black Cake Tradition', description: 'Fruit soaked in rum for months (even years). Rich, dense, boozy. Passed down through generations. No Christmas without it.' },
      { step: 4, title: 'Easter Foods', description: 'Spiced bun and cheese. Hot cross bun\'s Caribbean cousin. The combination of sweet bun and hard cheese is essential.' },
      { step: 5, title: 'Nine Night Foods', description: 'When someone dies: fish tea, hard food, fried fish. Feeding the community who comes to sit with the family. Food as comfort.' },
      { step: 6, title: 'Carnival Foods', description: 'Trinidad: doubles, corn soup. Notting Hill: jerk chicken, curry goat. Food fuels the celebration.' },
      { step: 7, title: 'Sunday Dinner Tradition', description: 'The most important weekly celebration. Rice and peas, chicken (roast or stew), vegetables, coleslaw. Family gathering.' },
      { step: 8, title: 'Keeping Traditions Alive', description: 'Cook the foods. Tell the stories. Include the young people. Traditions survive through practice.' }
    ],
    tools: [
      { name: 'Calendar of celebrations', price: 'In kit', essential: true },
      { name: 'Seasonal ingredients', price: 'Varies', essential: true },
      { name: 'Family and community', price: 'Priceless', essential: true }
    ],
    commonMistakes: ['Only cooking these foods occasionally', 'Not involving younger generation', 'Forgetting the stories behind the food', 'Using shortcuts that lose meaning', 'Not starting preparation early enough'],
    freeAccess: true,
    kit: { name: 'Seasonal Celebrations Pack', slug: 'seasonal-pack', price: '£29.99', contents: ['Sorrel dried', 'Spices for black cake', 'Recipe cards', 'Celebration calendar', 'Story booklet'] },
    workshop: { title: 'Christmas Caribbean Cooking', duration: '3 hours', price: '£50', format: 'in-person', bookingSlug: 'christmas-cooking' },
    nextTutorials: ['sorrel-making', 'black-cake'],
    badgeAwarded: 'tradition-keeper',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // FOOD BUSINESS PATHWAY
  // ========================================
  {
    id: 'costing-your-dishes',
    slug: 'costing-your-dishes',
    title: 'Costing Your Dishes',
    description: 'Know exactly what each dish costs you. The maths behind profitable food business.',
    icon: '💰',
    programmes: ['aunties-kitchen', 'techreneurs'],
    primaryProgramme: 'aunties-kitchen',
    pathway: 'Food Business',
    tags: ['business', 'pricing', 'costing', 'profit'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    alternativeGuides: ['ROV-B'],
    steps: [
      { step: 1, title: 'Why Costing Matters', description: 'Most food businesses fail because they don\'t know their costs. Busy and broke is common. Know your numbers.', tip: 'If you can\'t calculate your food cost, you can\'t price properly.' },
      { step: 2, title: 'Ingredient Costing', description: 'List every ingredient. Price per unit (per kg, per tin). Calculate cost per portion used. Be precise.', checkpoint: true },
      { step: 3, title: 'The Costing Spreadsheet', description: 'Ingredient | Unit Cost | Amount Used | Cost per Dish. Total = raw food cost. This is your baseline.', rovPrompt: 'Help me create a costing spreadsheet for curry chicken.' },
      { step: 4, title: 'Hidden Costs', description: 'Oil for cooking, gas/electric, packaging, napkins, sauce cups. Small things add up. Include everything.' },
      { step: 5, title: 'Food Cost Percentage', description: 'Food cost ÷ selling price × 100 = food cost percentage. Target: 28-35% for most dishes. Lower = more profit.' },
      { step: 6, title: 'Pricing Formula', description: 'Food cost × 3 = minimum selling price. Adjust for market, perceived value, competition. Never go below 3x.' },
      { step: 7, title: 'Waste Factor', description: 'Account for waste: trim, spoilage, mistakes. Add 5-10% to food cost. Reality is messier than recipes.' },
      { step: 8, title: 'Regular Review', description: 'Ingredient prices change. Review costs monthly. Adjust prices or portions as needed. Stay profitable.' }
    ],
    tools: [
      { name: 'Calculator', price: 'Phone has one', essential: true },
      { name: 'Spreadsheet (Google Sheets)', price: 'Free', essential: true },
      { name: 'Digital scale', price: '£10-20', essential: true },
      { name: 'Receipt collection habit', price: 'Discipline', essential: true }
    ],
    commonMistakes: ['Guessing instead of calculating', 'Forgetting hidden costs', 'Not accounting for waste', 'Pricing based on competitors not costs', 'Not reviewing regularly'],
    freeAccess: true,
    kit: { name: 'Food Business Numbers Pack', slug: 'food-numbers', price: '£12.99', contents: ['Costing templates', 'Pricing calculator', 'Waste tracker', 'Profit margin guide'] },
    workshop: { title: 'Food Business Finances', duration: '2 hours', price: '£35', format: 'zoom', bookingSlug: 'food-finances' },
    nextTutorials: ['food-safety-basics', 'market-stall-setup'],
    badgeAwarded: 'food-costing',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'food-safety-basics',
    slug: 'food-safety-basics',
    title: 'Food Safety Basics',
    description: 'Keep people safe and stay legal. Temperature control, hygiene, and the regulations you need to know.',
    icon: '🧤',
    programmes: ['aunties-kitchen'],
    primaryProgramme: 'aunties-kitchen',
    pathway: 'Food Business',
    tags: ['safety', 'hygiene', 'legal', 'regulations'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    alternativeGuides: ['ROV-B'],
    steps: [
      { step: 1, title: 'Why Food Safety?', description: 'People can get seriously ill from unsafe food. Your reputation can be destroyed overnight. And it\'s the law.', warning: 'Food poisoning kills. Take this seriously.' },
      { step: 2, title: 'Temperature Danger Zone', description: '5°C - 63°C is the danger zone. Bacteria multiply rapidly. Keep cold food cold (<5°C), hot food hot (>63°C).', checkpoint: true },
      { step: 3, title: 'The 2-Hour Rule', description: 'Food shouldn\'t be in the danger zone for more than 2 hours total. Clock is always running. Plan accordingly.' },
      { step: 4, title: 'Cross-Contamination', description: 'Raw meat bacteria spreads to other foods via hands, surfaces, utensils. Separate boards, separate storage, wash hands.', rovPrompt: 'What colour chopping boards should I use for what?' },
      { step: 5, title: 'Handwashing', description: '20 seconds with soap. Before cooking, after raw meat, after toilet, after touching face/phone. More than you think.' },
      { step: 6, title: 'Allergen Awareness', description: '14 major allergens must be declared. Nuts, gluten, dairy, etc. Ask customers. Label clearly. Take it seriously.' },
      { step: 7, title: 'Food Hygiene Rating', description: 'Environmental Health will inspect you. Ratings 0-5. Anything below 4 hurts business. Aim for 5. It\'s achievable.' },
      { step: 8, title: 'Level 2 Food Hygiene Certificate', description: 'Online course, £15-30, takes 2-3 hours. Required for most food business. Do it before you start selling.' }
    ],
    tools: [
      { name: 'Food thermometer', price: '£10-20', essential: true, cyberstoreSlug: 'food-thermometer' },
      { name: 'Colour-coded chopping boards', price: '£15-25', essential: true },
      { name: 'Handwashing station', price: 'Setup varies', essential: true },
      { name: 'Level 2 Food Hygiene Certificate', price: '£15-30', essential: true }
    ],
    commonMistakes: ['Temperature guessing', 'Same board for meat and veg', 'Not washing hands enough', 'Ignoring allergens', 'Hoping inspector won\'t come'],
    freeAccess: true,
    kit: { name: 'Food Safety Starter Kit', slug: 'safety-kit', price: '£39.99', contents: ['Digital thermometer', 'Colour-coded boards set', 'Temperature log sheets', 'Allergen guide', 'Handwashing poster'] },
    workshop: { title: 'Food Safety for Business', duration: '2 hours', price: '£30', format: 'zoom', bookingSlug: 'food-safety' },
    nextTutorials: ['market-stall-setup', 'scaling-production'],
    badgeAwarded: 'food-safe',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'market-stall-setup',
    slug: 'market-stall-setup',
    title: 'Market Stall Setup',
    description: 'From kitchen to market. What you need, how to set up, and making your stall stand out.',
    icon: '🏪',
    programmes: ['aunties-kitchen', 'techreneurs'],
    primaryProgramme: 'aunties-kitchen',
    pathway: 'Food Business',
    tags: ['market', 'stall', 'business', 'setup'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    alternativeGuides: ['ROV-B'],
    steps: [
      { step: 1, title: 'Finding Your Market', description: 'Research local markets. Food focus vs general. Indoor vs outdoor. Pitch fees. Customer type. Visit first before applying.', tip: 'Talk to existing traders. They\'ll tell you the truth.' },
      { step: 2, title: 'Legal Requirements', description: 'Food hygiene certificate. Register with council. Public liability insurance (£2-5 million). Food business registration. Get these FIRST.', checkpoint: true },
      { step: 3, title: 'Equipment Essentials', description: 'Gazebo (3x3m), folding table, tablecloth, serving equipment, cash box, card reader, extension lead, weights for gazebo.', rovPrompt: 'What\'s a complete equipment list for a market stall?' },
      { step: 4, title: 'Hot Food Requirements', description: 'Hot holding equipment. Bain-marie or chafing dishes. Gas or electric. Fire extinguisher. Check market\'s gas policy.' },
      { step: 5, title: 'Display and Signage', description: 'Clear menu with prices. Allergen information visible. Photos of food help. Your brand/name prominent. Make it attractive.' },
      { step: 6, title: 'Prep and Transport', description: 'Cook at registered kitchen. Transport in insulated containers. Keep temperature logs. Arrive early to set up properly.' },
      { step: 7, title: 'Pricing for Markets', description: 'Check competitors\' prices. Factor in pitch fee. Round numbers work (£7, £10). Have a premium option and an affordable option.' },
      { step: 8, title: 'First Market Tips', description: 'Bring more food than you think. Bring business cards. Engage with customers. Note what sells. Review after and improve.' }
    ],
    tools: [
      { name: 'Gazebo (3x3m)', price: '£80-200', essential: true, cyberstoreSlug: 'gazebo' },
      { name: 'Folding table', price: '£40-80', essential: true },
      { name: 'Hot holding equipment', price: '£50-150', essential: true },
      { name: 'Card reader', price: '£20-50', essential: true, cyberstoreSlug: 'card-readers' },
      { name: 'Signage', price: '£30-100', essential: true }
    ],
    commonMistakes: ['No insurance', 'Underestimating setup time', 'Not enough float/change', 'Poor display', 'Not engaging customers'],
    freeAccess: true,
    kit: { name: 'Market Stall Starter Pack', slug: 'market-starter', price: '£49.99', contents: ['Menu templates', 'Allergen cards', 'Price list templates', 'Setup checklist', 'Legal requirements guide'] },
    workshop: { title: 'Market Trading Bootcamp', duration: '3 hours', price: '£45', format: 'in-person', bookingSlug: 'market-bootcamp' },
    nextTutorials: ['building-regulars', 'scaling-to-kitchen'],
    badgeAwarded: 'market-trader',
    lastUpdated: '2024-12-26',
    version: '1.0'
  }
];

export default AUNTIES_KITCHEN_TUTORIALS;