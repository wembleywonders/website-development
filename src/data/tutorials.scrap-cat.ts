/**
 * SCRAP CAT REPAIR TUTORIALS
 * ==========================
 * 
 * 3 free tutorials per pathway = 9 free total
 * ROV-T (Neville) guide throughout
 * 
 * Focus: Repair skills → Certification → Income
 * Ecosystem: Cyberstore (parts) → TECHreneurs (business) → Joystick/Rayd-yo (customers)
 */

import { Tutorial } from '../types/tutorial';

export const SCRAP_CAT_TUTORIALS: Tutorial[] = [
  // ========================================
  // DEVICE REVIVAL PATHWAY
  // ========================================
  {
    id: 'phone-screen-replacement',
    slug: 'phone-screen-replacement',
    title: 'Phone Screen Replacement',
    description: 'The most common repair request. Learn to replace cracked screens on popular phone models and start earning £35-45 per repair.',
    icon: '📱',
    programmes: ['scrap-cat'],
    primaryProgramme: 'scrap-cat',
    pathway: 'Device Revival',
    tags: ['phone', 'screen', 'repair', 'income', 'certification'],
    difficulty: 'beginner',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Assessment First', description: 'Check what\'s actually broken. Screen cracked but display works? Just glass. Black screen? LCD/OLED damage. Water inside? Different problem. Accurate diagnosis = accurate quote.', tip: 'Always test touch response in all corners before quoting. Partial touch failure means full screen replacement.' },
      { step: 2, title: 'Know Your Phones', description: 'iPhone screens need different tools than Samsung. Budget Androids vary wildly. Start with 2-3 common models in your area. Master those before expanding.', rovPrompt: 'What are the most common phone models to learn first?' },
      { step: 3, title: 'Tools You Need', description: 'Precision screwdriver set, plastic pry tools, suction cup, tweezers, heat gun or hair dryer, magnetic mat. Quality tools prevent damage. Cheap tools cost more long-term.', checkpoint: true },
      { step: 4, title: 'Heat and Separate', description: 'Adhesive holds screens in place. Heat softens it. Work slowly around edges. Rushing cracks the frame or damages cables. Patience is the skill here.' },
      { step: 5, title: 'Cable Disconnection', description: 'Battery first—always. Then display cables, digitizer cables. Note positions. Take photos before disconnecting. Forced connectors = destroyed phone.', warning: 'Never pry directly on cables. Lift connector locks first. Damaged flex cables mean starting over with new parts.' },
      { step: 6, title: 'New Screen Installation', description: 'Reverse the process. Connect cables, test BEFORE sealing. Check touch, display, brightness, Face ID/fingerprint. Seal only when everything works.' },
      { step: 7, title: 'Quality Check', description: 'Full touch grid test. Brightness levels. True Tone if iPhone. No dust under screen. Happy customer = referrals. Quality control is your reputation.' },
      { step: 8, title: 'Pricing Your Work', description: 'Parts cost + your time + skill premium. Screen £15-25, charge £50-70. That\'s £35-45 profit for 30-45 minutes work. TECHreneurs module covers pricing strategy in depth.', rovPrompt: 'How do I price phone repairs competitively?' }
    ],
    tools: [
      { name: 'Precision screwdriver set', price: '£15-25', essential: true, cyberstoreSlug: 'precision-screwdriver-set' },
      { name: 'Plastic pry tool set', price: '£5-10', essential: true, cyberstoreSlug: 'pry-tools' },
      { name: 'Suction cup', price: '£3-5', essential: true, cyberstoreSlug: 'suction-cup' },
      { name: 'Heat gun / hair dryer', price: '£15-30', essential: true },
      { name: 'Magnetic work mat', price: '£8-15', essential: true, cyberstoreSlug: 'magnetic-mat' },
      { name: 'Anti-static wrist strap', price: '£5-8', essential: false, cyberstoreSlug: 'anti-static-strap' }
    ],
    commonMistakes: ['Skipping battery disconnect', 'Rushing the heat phase', 'Forcing cable connectors', 'Not testing before sealing', 'Using cheap replacement screens', 'No photos of original state'],
    freeAccess: true,
    kit: { name: 'Phone Repair Starter Kit', slug: 'phone-repair-starter', price: '£49.99', contents: ['Precision screwdriver set', 'Pry tools', 'Suction cups', 'Magnetic mat', 'Practice screen', 'Tutorial access'], savings: 'Save £20 vs buying separately' },
    workshop: { title: 'Phone Screen Replacement Hands-On', duration: '2 hours', price: '£35', format: 'in-person', bookingSlug: 'phone-screen-workshop' },
    nextTutorials: ['battery-swap-basics', 'charging-port-repair'],
    badgeAwarded: 'screen-surgeon',
    lastUpdated: '2024-12-27',
    version: '1.0'
  },
  {
    id: 'battery-swap-basics',
    slug: 'battery-swap-basics',
    title: 'Battery Swap Basics',
    description: 'Phones dying by 2pm? Batteries are consumables. Learn safe removal and replacement. Quick jobs, good profit margin.',
    icon: '🔋',
    programmes: ['scrap-cat'],
    primaryProgramme: 'scrap-cat',
    pathway: 'Device Revival',
    tags: ['battery', 'phone', 'repair', 'safety', 'income'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Battery Health Check', description: 'Before replacing, confirm battery is the problem. iPhone: Settings → Battery → Battery Health. Android: AccuBattery app. Under 80% health = replacement time.', rovPrompt: 'How do I diagnose a failing battery vs other issues?' },
      { step: 2, title: 'Safety First', description: 'Lithium batteries are no joke. Puncture = fire. Work on non-flammable surface. Have sand or fire extinguisher nearby. Never use metal tools to pry batteries.', warning: 'Swollen batteries: stop immediately. Do not puncture. Take to professional disposal. Seriously.' },
      { step: 3, title: 'Access the Battery', description: 'Remove screen (iPhones) or back panel (most Androids). Disconnect battery cable first before touching anything else. This is the golden rule.', checkpoint: true },
      { step: 4, title: 'Adhesive Removal', description: 'Pull-tabs if present—pull slowly and horizontally. No tabs? Isopropyl alcohol underneath, heat gently, pry with plastic cards. Bending battery = danger.' },
      { step: 5, title: 'Quality Replacement Parts', description: 'OEM batteries are best but expensive. High-quality aftermarket works. Avoid ultra-cheap batteries—poor capacity, safety risk. Cyberstore stocks tested parts.', tip: 'Check battery voltage with multimeter before installing. Should match original specs.' },
      { step: 6, title: 'Installation', description: 'Position new battery with fresh adhesive. Connect cable firmly but gently. Reassemble device. Full charge before returning to customer.' },
      { step: 7, title: 'Calibration', description: 'First charge to 100%, let drain to 20%, charge again. This calibrates the battery meter. Tell customers this is part of the service.' },
      { step: 8, title: 'Income Reality', description: 'Battery cost: £8-15. Charge: £30-40. Profit: £20-25 for 20-30 minutes. Faster than screen repairs, lower risk. Good bread-and-butter work.' }
    ],
    tools: [
      { name: 'Plastic pry cards', price: '£5-8', essential: true, cyberstoreSlug: 'pry-cards' },
      { name: 'Isopropyl alcohol 99%', price: '£5-8', essential: true, cyberstoreSlug: 'isopropyl-alcohol' },
      { name: 'Battery adhesive strips', price: '£5 for 10', essential: true, cyberstoreSlug: 'battery-adhesive' },
      { name: 'Multimeter', price: '£15-25', essential: false, cyberstoreSlug: 'multimeter' },
      { name: 'Heat mat', price: '£20-30', essential: false, cyberstoreSlug: 'heat-mat' }
    ],
    commonMistakes: ['Prying with metal tools', 'Ignoring swollen batteries', 'Cheap replacement batteries', 'Forgetting to disconnect before removal', 'Bending battery during removal', 'Skipping calibration'],
    freeAccess: true,
    kit: { name: 'Battery Replacement Kit', slug: 'battery-kit', price: '£29.99', contents: ['Pry cards', 'Adhesive strips 20-pack', 'Isopropyl alcohol', 'Safety gloves', '3 common batteries'], savings: 'Includes your first 3 battery sales' },
    workshop: { title: 'Battery Replacement Certification', duration: '1.5 hours', price: '£25', format: 'in-person', bookingSlug: 'battery-workshop' },
    nextTutorials: ['charging-port-repair', 'water-damage-assessment'],
    badgeAwarded: 'battery-tech',
    lastUpdated: '2024-12-27',
    version: '1.0'
  },
  {
    id: 'charging-port-repair',
    slug: 'charging-port-repair',
    title: 'Charging Port Repair',
    description: '"My phone won\'t charge" — sometimes it\'s just lint. Sometimes it\'s the port. Learn to diagnose and fix the most frustrating phone problem.',
    icon: '🔌',
    programmes: ['scrap-cat'],
    primaryProgramme: 'scrap-cat',
    pathway: 'Device Revival',
    tags: ['charging', 'port', 'repair', 'diagnosis', 'income'],
    difficulty: 'intermediate',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Diagnose Before Disassembly', description: 'Try different cables first. Try different chargers. Wireless charging works? Port issue confirmed. 70% of "won\'t charge" is pocket lint. Check that first.', tip: 'Use wooden toothpick or plastic tool to gently remove lint. You\'d be amazed what lives in there.' },
      { step: 2, title: 'The Lint Check', description: 'Shine light into port. Compressed air first. Then gentle scraping with plastic/wooden tool. This fixes 40% of charging complaints. Charge £10-15 for cleaning.', checkpoint: true },
      { step: 3, title: 'Port Damage Assessment', description: 'Visually inspect pins. Bent? Corroded? Burned? Loose when cable inserted? Physical damage = replacement needed. Quote accordingly.', rovPrompt: 'How do I tell if a charging port needs replacement vs cleaning?' },
      { step: 4, title: 'Replacement Options', description: 'Some ports are modular (easy swap). Some are soldered to logic board (advanced). Some are on flex cables with other components. Know your phone models.' },
      { step: 5, title: 'Flex Cable Ports', description: 'Many phones: charging port on flex cable with mic/speaker. Replace whole flex. Disconnect battery, old flex, connect new flex. Test before sealing.' },
      { step: 6, title: 'Soldered Ports (Advanced)', description: 'Requires soldering station and micro-soldering skills. This is Level 2 certification territory. Don\'t attempt without training—you\'ll destroy the phone.', warning: 'Micro-soldering is a separate skill. Refer these jobs until you\'re trained, or sub-contract to someone certified.' },
      { step: 7, title: 'Testing Protocol', description: 'Multiple cables. Multiple chargers. Fast charging if supported. Data transfer. Verify everything before declaring fixed.' },
      { step: 8, title: 'Pricing Structure', description: 'Lint cleaning: £10-15. Flex cable replacement: £35-45. Soldered port: £50-70. Be honest about what\'s needed—trust builds business.' }
    ],
    tools: [
      { name: 'Wooden/plastic picks', price: '£3-5', essential: true, cyberstoreSlug: 'cleaning-picks' },
      { name: 'Compressed air', price: '£5-8', essential: true },
      { name: 'Magnifying glass/loupe', price: '£8-15', essential: true, cyberstoreSlug: 'magnifier-loupe' },
      { name: 'Bright flashlight', price: '£5-10', essential: true },
      { name: 'Multiple test cables', price: '£10-15', essential: true }
    ],
    commonMistakes: ['Skipping the lint check', 'Using metal tools in port', 'Attempting soldering without training', 'Not testing with multiple cables', 'Misdiagnosing software issues as port problems'],
    freeAccess: true,
    kit: { name: 'Charging Port Diagnostic Kit', slug: 'charging-port-kit', price: '£24.99', contents: ['Cleaning picks', 'Magnifier loupe', 'Test cables set', 'Compressed air', 'Common flex cables 3-pack'] },
    workshop: { title: 'Charging Port Repair', duration: '2 hours', price: '£35', format: 'in-person', bookingSlug: 'charging-port-workshop' },
    nextTutorials: ['water-damage-assessment', 'laptop-diagnosis'],
    badgeAwarded: 'port-specialist',
    lastUpdated: '2024-12-27',
    version: '1.0'
  },

  // ========================================
  // WHEELS & RIDES PATHWAY
  // ========================================
  {
    id: 'ebike-puncture-repair',
    slug: 'ebike-puncture-repair',
    title: 'E-Bike Puncture Repair',
    description: 'Delivery riders can\'t afford downtime. Learn fast puncture repair and earn loyal repeat customers who need you on speed-dial.',
    icon: '🚲',
    programmes: ['scrap-cat'],
    primaryProgramme: 'scrap-cat',
    pathway: 'Wheels & Rides',
    tags: ['ebike', 'puncture', 'tyre', 'delivery', 'mobile-repair'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'The Delivery Rider Market', description: 'UberEats, Deliveroo, Just Eat riders—e-bikes are their income. Puncture = no earnings. They\'ll pay premium for fast fix. Build relationships, get repeat business.', tip: 'Hang around delivery hotspots. Word spreads fast among riders. One good repair = five referrals.' },
      { step: 2, title: 'E-Bike vs Regular Bike', description: 'Heavier wheels, often hub motors in rear. May need to disconnect motor cable. Battery weight adds complexity. Otherwise, same puncture repair principles.', checkpoint: true },
      { step: 3, title: 'Wheel Removal', description: 'E-bikes: check for motor cables before removing wheel. Quick-release or bolted axle? Support bike properly—heavier than regular bikes. Note washer positions.', rovPrompt: 'How do I safely remove a rear hub motor wheel?' },
      { step: 4, title: 'Find the Puncture', description: 'Remove tyre with levers. Extract tube. Inflate and listen. Still can\'t find it? Submerge in water, watch for bubbles. Mark the spot.' },
      { step: 5, title: 'Patch vs Replace', description: 'Small punctures: patch kit works fine. Multiple punctures, valve damage, or large tears: new tube. Carry both options. Tubes are £5-8, patches pennies.' },
      { step: 6, title: 'Proper Patching', description: 'Roughen area with sandpaper. Apply vulcanizing glue. Wait until tacky (2-3 mins). Apply patch with pressure. Hold for 60 seconds. Let cure before reinstalling.' },
      { step: 7, title: 'Reinstallation', description: 'Slightly inflate tube before fitting—prevents pinching. Work tyre back on with hands, not levers if possible. Check tube isn\'t pinched. Full inflation.' },
      { step: 8, title: 'Mobile Repair Advantage', description: 'Riders can\'t take bike to shop—they\'re working. You come to them. Charge £15-20 for puncture repair, £25-30 for callout. Premium for speed, convenience.' }
    ],
    tools: [
      { name: 'Tyre levers (quality)', price: '£8-12', essential: true, cyberstoreSlug: 'tyre-levers' },
      { name: 'Puncture repair kit', price: '£5-8', essential: true, cyberstoreSlug: 'puncture-kit' },
      { name: 'Portable pump', price: '£15-25', essential: true, cyberstoreSlug: 'portable-pump' },
      { name: 'Spare inner tubes (common sizes)', price: '£5-8 each', essential: true, cyberstoreSlug: 'inner-tubes' },
      { name: 'Water bottle (for finding leaks)', price: '£2', essential: true },
      { name: 'Mobile repair bag', price: '£20-30', essential: false, cyberstoreSlug: 'repair-bag' }
    ],
    commonMistakes: ['Forgetting to disconnect motor cables', 'Pinching tube on reinstallation', 'Not finding all punctures', 'Rushing the glue cure time', 'No spare tubes for bad punctures'],
    freeAccess: true,
    kit: { name: 'E-Bike Puncture Kit', slug: 'ebike-puncture-kit', price: '£39.99', contents: ['Quality tyre levers', 'Patch kit', 'Portable pump', '3 common tubes', 'Repair bag', 'Business cards template'], savings: 'Everything for mobile puncture service' },
    workshop: { title: 'E-Bike Puncture Repair', duration: '1.5 hours', price: '£25', format: 'in-person', bookingSlug: 'ebike-puncture-workshop' },
    nextTutorials: ['ebike-brake-adjustment', 'ebike-battery-diagnosis'],
    badgeAwarded: 'puncture-pro',
    lastUpdated: '2024-12-27',
    version: '1.0'
  },
  {
    id: 'ebike-brake-adjustment',
    slug: 'ebike-brake-adjustment',
    title: 'E-Bike Brake Adjustment',
    description: 'E-bikes are fast and heavy. Brakes matter more than ever. Safety-critical skill that riders pay well for—and keeps them alive.',
    icon: '🛑',
    programmes: ['scrap-cat'],
    primaryProgramme: 'scrap-cat',
    pathway: 'Wheels & Rides',
    tags: ['ebike', 'brakes', 'safety', 'mechanical', 'disc-brakes'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Why E-Bike Brakes Matter More', description: 'Higher speeds, heavier weight = more stopping force needed. Worn or misaligned brakes on e-bike = serious danger. This is safety-critical work. Take it seriously.', warning: 'If you\'re unsure about a brake repair, refer to professional. This isn\'t the place to guess.' },
      { step: 2, title: 'Brake Types', description: 'Most e-bikes: hydraulic disc brakes. Some budget models: mechanical disc brakes. Older/cheap: rim brakes (rare now). Each adjusts differently.', checkpoint: true },
      { step: 3, title: 'Mechanical Disc Adjustment', description: 'Cable tension first—barrel adjuster or cable clamp. Caliper alignment—loosen bolts, squeeze brake, tighten while held. Pad position—even gap both sides.', rovPrompt: 'How do I center a mechanical disc brake caliper?' },
      { step: 4, title: 'Hydraulic Brake Bleeding', description: 'Spongy lever = air in system. Bleeding removes air. Each brand (Shimano, Tektro, etc.) has specific procedure. Learn the common ones. Requires bleed kit.' },
      { step: 5, title: 'Pad Inspection', description: 'Minimum thickness: 1mm of compound. Contaminated pads (oil, grease) = replace, can\'t fix. Glazed pads = sand lightly or replace. Cheap to replace, expensive consequences if worn.' },
      { step: 6, title: 'Rotor Check', description: 'Warped rotor = pulsing brakes. Check by spinning wheel, watching gap. Slight warps can be trued with rotor truing tool. Severe warps = replacement.' },
      { step: 7, title: 'Lever Reach Adjustment', description: 'Many riders don\'t know this exists. Adjusting lever reach for hand size = better control. Small service that impresses customers.' },
      { step: 8, title: 'Safety Sign-Off', description: 'Test ride (or have customer test) before release. Both brakes working? Stopping distance acceptable? Document the work. Safety work needs paper trail.' }
    ],
    tools: [
      { name: 'Brake bleed kit (Shimano/Tektro)', price: '£25-40', essential: true, cyberstoreSlug: 'brake-bleed-kit' },
      { name: 'Rotor truing tool', price: '£10-15', essential: true, cyberstoreSlug: 'rotor-truing-tool' },
      { name: 'Brake pads (assorted)', price: '£8-15 per pair', essential: true, cyberstoreSlug: 'brake-pads' },
      { name: 'Allen key set (metric)', price: '£10-15', essential: true, cyberstoreSlug: 'allen-keys' },
      { name: 'Torque wrench', price: '£25-40', essential: false, cyberstoreSlug: 'torque-wrench' },
      { name: 'Isopropyl alcohol', price: '£5-8', essential: true }
    ],
    commonMistakes: ['Contaminating pads with finger oils', 'Over-tightening caliper bolts', 'Wrong brake fluid type', 'Ignoring rotor condition', 'Not test riding after adjustment', 'Skipping safety documentation'],
    freeAccess: true,
    kit: { name: 'E-Bike Brake Service Kit', slug: 'brake-service-kit', price: '£59.99', contents: ['Bleed kit', 'Rotor truing tool', 'Brake pads set', 'Allen keys', 'Cleaning supplies', 'Service checklist'] },
    workshop: { title: 'E-Bike Brake Certification', duration: '2.5 hours', price: '£40', format: 'in-person', bookingSlug: 'brake-certification' },
    nextTutorials: ['ebike-battery-diagnosis', 'full-ebike-service'],
    badgeAwarded: 'brake-specialist',
    lastUpdated: '2024-12-27',
    version: '1.0'
  },
  {
    id: 'ebike-battery-diagnosis',
    slug: 'ebike-battery-diagnosis',
    title: 'E-Bike Battery Diagnosis',
    description: 'The most expensive component. Learn to diagnose battery issues, advise on replacement, and help riders get maximum life from their investment.',
    icon: '⚡',
    programmes: ['scrap-cat'],
    primaryProgramme: 'scrap-cat',
    pathway: 'Wheels & Rides',
    tags: ['ebike', 'battery', 'diagnosis', 'lithium', 'range'],
    difficulty: 'intermediate',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Battery Economics', description: 'E-bike batteries: £200-600. Replacing unnecessarily = waste. But failing battery = stranded rider. Your job: accurate diagnosis. Saves money or prevents breakdown.', tip: 'Many "dead batteries" are actually connector issues or BMS resets. Diagnosis before replacement saves customers hundreds.' },
      { step: 2, title: 'Common Battery Types', description: '36V, 48V, 52V most common. Lithium-ion cells in packs. BMS (Battery Management System) controls charging/discharging. Understanding the system helps diagnosis.', checkpoint: true },
      { step: 3, title: 'Symptom Assessment', description: 'Won\'t turn on? Won\'t charge? Reduced range? Cuts out under load? Each symptom points to different issue. Listen carefully to customer description.', rovPrompt: 'What do different e-bike battery symptoms indicate?' },
      { step: 4, title: 'Voltage Testing', description: 'Multimeter on battery terminals. Compare to rated voltage. 48V battery reading 42V? Needs charge. Reading 30V? Cell damage. Reading 0V? BMS lockout or dead cells.' },
      { step: 5, title: 'Charger Testing', description: 'Often the charger fails, not battery. Test charger output with multimeter. Should read slightly above battery voltage (e.g., 54.6V for 48V battery). No output = charger issue.' },
      { step: 6, title: 'Connection Issues', description: 'Loose or corroded connectors cause intermittent problems. Clean with contact cleaner. Check for bent pins. Wiggle test while connected. Often the simple fix.' },
      { step: 7, title: 'Range Estimation', description: 'Battery degradation is gradual. 80% capacity after 500-800 cycles is normal. Help customers understand realistic expectations. Replacement isn\'t always needed yet.' },
      { step: 8, title: 'When to Refer', description: 'Cell replacement, BMS repair, battery rebuilding = specialist work. Know your limits. Build relationship with battery specialist for referrals. Diagnosis fee still earned.' }
    ],
    tools: [
      { name: 'Digital multimeter', price: '£20-40', essential: true, cyberstoreSlug: 'digital-multimeter' },
      { name: 'Battery connector set', price: '£15-25', essential: true, cyberstoreSlug: 'battery-connectors' },
      { name: 'Contact cleaner', price: '£8-12', essential: true, cyberstoreSlug: 'contact-cleaner' },
      { name: 'Battery voltage chart', price: 'Free (in kit)', essential: true },
      { name: 'Insulated gloves', price: '£10-15', essential: true, cyberstoreSlug: 'insulated-gloves' }
    ],
    commonMistakes: ['Replacing battery when charger is faulty', 'Ignoring connection issues', 'Not checking voltage before diagnosis', 'Attempting cell replacement without training', 'Over-promising on range restoration'],
    freeAccess: true,
    kit: { name: 'Battery Diagnosis Kit', slug: 'battery-diagnosis-kit', price: '£44.99', contents: ['Digital multimeter', 'Connector set', 'Contact cleaner', 'Voltage charts', 'Insulated gloves', 'Diagnosis flowchart'] },
    workshop: { title: 'E-Bike Battery Diagnosis', duration: '2 hours', price: '£35', format: 'in-person', bookingSlug: 'battery-diagnosis-workshop' },
    nextTutorials: ['full-ebike-service', 'escooter-maintenance'],
    badgeAwarded: 'battery-diagnostician',
    lastUpdated: '2024-12-27',
    version: '1.0'
  },

  // ========================================
  // HOME TECH PATHWAY
  // ========================================
  {
    id: 'pc-cleaning-thermal',
    slug: 'pc-cleaning-thermal',
    title: 'PC Cleaning & Thermal Paste',
    description: 'Slow computer? Loud fans? Often just dust and dried thermal paste. Simple maintenance that transforms performance and impresses clients.',
    icon: '🖥️',
    programmes: ['scrap-cat'],
    primaryProgramme: 'scrap-cat',
    pathway: 'Home Tech',
    tags: ['pc', 'cleaning', 'thermal', 'maintenance', 'performance'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'The Hidden Problem', description: 'Dust clogs fans. Thermal paste dries out. CPU overheats. Computer throttles performance. Customer thinks they need new PC. You know better.', tip: 'Ask "when did you last have it cleaned?" Most people: never. That\'s your opportunity.' },
      { step: 2, title: 'External Assessment', description: 'Listen: loud fans = dust buildup or failing bearings. Feel: hot exhaust = overheating. Look: dust visible in vents = definitely needs cleaning. Set expectations.', checkpoint: true },
      { step: 3, title: 'Safe Opening', description: 'Power off, unplug, wait 30 seconds. Ground yourself—touch metal case. Side panels usually thumbscrews or slides. Document cable positions with photos.', rovPrompt: 'What precautions should I take when opening a PC?' },
      { step: 4, title: 'Dust Removal', description: 'Compressed air is your friend. Short bursts—don\'t spin fans with air (damages bearings). Work outside or in well-ventilated area. Hold fans still while cleaning them.' },
      { step: 5, title: 'Heatsink Removal', description: 'CPU cooler: usually 4 screws or push-pins. Twist gently to break thermal paste seal. Lift straight up. AMD and Intel mounts differ—know both.' },
      { step: 6, title: 'Thermal Paste Application', description: 'Clean old paste with isopropyl alcohol and lint-free cloth. Apply new paste: pea-sized dot in center. Don\'t spread—mounting pressure does that. Less is more.', warning: 'Thermal paste on motherboard components = bad news. Work carefully. Clean immediately if spillage.' },
      { step: 7, title: 'Reassembly and Testing', description: 'Remount cooler evenly—opposite corners. Reconnect fans. Close up. Boot and monitor temps with HWMonitor. Should see 10-20°C improvement.' },
      { step: 8, title: 'Service Pricing', description: 'Basic cleaning: £30-40. Full thermal paste replacement: £40-50. Add SSD upgrade for £50-70 more (see next tutorial). Bundle services for better value perception.' }
    ],
    tools: [
      { name: 'Compressed air cans', price: '£8-12 for 2', essential: true, cyberstoreSlug: 'compressed-air' },
      { name: 'Thermal paste (quality)', price: '£8-15', essential: true, cyberstoreSlug: 'thermal-paste' },
      { name: 'Isopropyl alcohol 99%', price: '£5-8', essential: true, cyberstoreSlug: 'isopropyl-alcohol' },
      { name: 'Lint-free cloths', price: '£5-8', essential: true, cyberstoreSlug: 'lint-free-cloths' },
      { name: 'Anti-static wrist strap', price: '£5-8', essential: true, cyberstoreSlug: 'anti-static-strap' },
      { name: 'Screwdriver set', price: '£10-15', essential: true, cyberstoreSlug: 'screwdriver-set' }
    ],
    commonMistakes: ['Spinning fans with compressed air', 'Too much thermal paste', 'Forgetting to reconnect fan cables', 'Static discharge damage', 'Not monitoring temps after service'],
    freeAccess: true,
    kit: { name: 'PC Cleaning Kit', slug: 'pc-cleaning-kit', price: '£34.99', contents: ['Compressed air 2-pack', 'Thermal paste', 'Isopropyl alcohol', 'Lint-free cloths', 'Anti-static strap', 'Service checklist'] },
    workshop: { title: 'PC Maintenance Workshop', duration: '2 hours', price: '£30', format: 'in-person', bookingSlug: 'pc-maintenance-workshop' },
    nextTutorials: ['ssd-upgrade-migration', 'home-network-troubleshooting'],
    badgeAwarded: 'pc-tech',
    lastUpdated: '2024-12-27',
    version: '1.0'
  },
  {
    id: 'ssd-upgrade-migration',
    slug: 'ssd-upgrade-migration',
    title: 'SSD Upgrade & Data Migration',
    description: 'The single biggest upgrade for old computers. Turn a 5-minute boot into 20 seconds. High perceived value, straightforward work.',
    icon: '💾',
    programmes: ['scrap-cat'],
    primaryProgramme: 'scrap-cat',
    pathway: 'Home Tech',
    tags: ['ssd', 'upgrade', 'data', 'migration', 'performance'],
    difficulty: 'beginner',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'The Magic Upgrade', description: 'Old spinning hard drive → SSD is dramatic. Computer feels new. Customers are amazed. This builds your reputation faster than almost any other repair.', tip: 'Under-promise: "It\'ll be noticeably faster." Then they experience it and tell everyone.' },
      { step: 2, title: 'SSD Types', description: '2.5" SATA: fits most laptops, desktops with adapter. M.2 SATA: newer laptops. M.2 NVMe: fastest, newer systems only. Check compatibility before buying.', checkpoint: true },
      { step: 3, title: 'Capacity Planning', description: 'Check current drive usage. 256GB minimum for most users. 500GB comfortable. 1TB if budget allows. Always some headroom—full drives slow down.', rovPrompt: 'How do I choose the right SSD size for a customer?' },
      { step: 4, title: 'Cloning vs Fresh Install', description: 'Cloning: copies everything, customer keeps settings. Fresh install: clean system, customer needs to reinstall apps. Cloning is usually what customers want.' },
      { step: 5, title: 'Cloning Process', description: 'Connect new SSD via USB adapter. Use Macrium Reflect (free) or Samsung/Crucial software. Clone drive. This takes 30-90 minutes depending on data.' },
      { step: 6, title: 'Physical Swap', description: 'Power off. Open laptop/desktop. Remove old drive (note cable/screw positions). Install new SSD. Some laptops have easy access panels; some require full disassembly.' },
      { step: 7, title: 'Post-Upgrade Checks', description: 'Boot into Windows. Check all drives recognized. Verify data intact. Run disk optimization. Enable TRIM. Test speed with CrystalDiskMark for before/after comparison.' },
      { step: 8, title: 'Pricing Strategy', description: 'Labour: £30-50. SSD cost: pass through + small markup. Total service: £80-120 depending on SSD size. Keep old drive for 2 weeks in case of issues—customer keeps as backup.' }
    ],
    tools: [
      { name: 'USB to SATA adapter', price: '£10-15', essential: true, cyberstoreSlug: 'usb-sata-adapter' },
      { name: 'Precision screwdriver set', price: '£15-25', essential: true, cyberstoreSlug: 'precision-screwdriver-set' },
      { name: 'SSDs (stock common sizes)', price: '£30-80', essential: true, cyberstoreSlug: 'ssd-drives' },
      { name: 'Cloning software', price: 'Free (Macrium)', essential: true },
      { name: 'Anti-static supplies', price: '£5-10', essential: true }
    ],
    commonMistakes: ['Wrong SSD type for system', 'Cloning to smaller drive without shrinking partition', 'Forgetting to change boot order', 'Not testing before returning to customer', 'Discarding old drive too soon'],
    freeAccess: true,
    kit: { name: 'SSD Upgrade Kit', slug: 'ssd-upgrade-kit', price: '£29.99', contents: ['USB to SATA adapter', 'Screwdriver set', 'Anti-static strap', 'Software guide', 'Before/after benchmark template'] },
    workshop: { title: 'SSD Upgrade Masterclass', duration: '2 hours', price: '£35', format: 'in-person', bookingSlug: 'ssd-upgrade-workshop' },
    nextTutorials: ['home-network-troubleshooting', 'laptop-diagnosis'],
    badgeAwarded: 'storage-specialist',
    lastUpdated: '2024-12-27',
    version: '1.0'
  },
  {
    id: 'home-network-troubleshooting',
    slug: 'home-network-troubleshooting',
    title: 'Home Network Troubleshooting',
    description: '"The WiFi is slow" — the most common home tech complaint. Learn to diagnose, fix, and optimize home networks. Every household needs this.',
    icon: '📶',
    programmes: ['scrap-cat'],
    primaryProgramme: 'scrap-cat',
    pathway: 'Home Tech',
    tags: ['wifi', 'network', 'router', 'troubleshooting', 'home-service'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'The Universal Complaint', description: 'Everyone has WiFi. Everyone complains about WiFi. Most problems are simple. Router placement, channel congestion, outdated equipment. You can fix this.', tip: 'Ask specific questions: "Slow everywhere or just one room?" "All devices or just one?" Narrows diagnosis fast.' },
      { step: 2, title: 'Basic Diagnostics', description: 'Speed test at router (wired if possible). Speed test where they complain. Compare to ISP promised speed. This tells you where the problem is.', checkpoint: true },
      { step: 3, title: 'Router Placement', description: 'Central location. Elevated (not on floor). Away from microwaves, cordless phones, fish tanks. Not in cupboard. Simple repositioning often fixes everything.', rovPrompt: 'Where is the optimal router placement in a typical home?' },
      { step: 4, title: 'Channel Optimization', description: 'Use WiFi Analyzer app. See what channels neighbors use. Switch to less congested channel. 2.4GHz: channels 1, 6, or 11 only. 5GHz: more options.' },
      { step: 5, title: 'Firmware Updates', description: 'Old router firmware = security holes and bugs. Log into router admin. Check for updates. This alone can improve performance and stability.' },
      { step: 6, title: 'WiFi Extenders vs Mesh', description: 'Extenders: cheap but halve speed. Mesh systems: better but pricier. For larger homes, mesh is worth it. Advise based on budget and layout.' },
      { step: 7, title: 'Wired Where Possible', description: 'Smart TVs, gaming consoles, work-from-home PCs—wire them if possible. Powerline adapters work too. Frees up WiFi bandwidth for mobile devices.' },
      { step: 8, title: 'Service Packages', description: 'Diagnosis and optimization: £30-40. Equipment setup (extender/mesh): £40-50 plus hardware. Monthly "WiFi health check" subscription: £10/month for regular customers.' }
    ],
    tools: [
      { name: 'Laptop with WiFi', price: 'Already have', essential: true },
      { name: 'Ethernet cable (long)', price: '£8-15', essential: true, cyberstoreSlug: 'ethernet-cable' },
      { name: 'WiFi Analyzer app', price: 'Free', essential: true },
      { name: 'Speed test bookmarks', price: 'Free', essential: true },
      { name: 'Powerline adapter set (demo)', price: '£30-50', essential: false, cyberstoreSlug: 'powerline-adapters' }
    ],
    commonMistakes: ['Not testing wired speed first', 'Recommending expensive solutions for simple problems', 'Ignoring ISP-side issues', 'Setting up extender in dead zone', 'Forgetting to document router credentials'],
    freeAccess: true,
    kit: { name: 'Network Troubleshooting Kit', slug: 'network-kit', price: '£24.99', contents: ['Long ethernet cable', 'Cable tester', 'Quick reference guide', 'Customer WiFi report template', 'Channel optimization guide'] },
    workshop: { title: 'Home Network Setup & Troubleshooting', duration: '2 hours', price: '£30', format: 'in-person', bookingSlug: 'network-workshop' },
    nextTutorials: ['smart-home-setup', 'security-camera-install'],
    badgeAwarded: 'network-tech',
    lastUpdated: '2024-12-27',
    version: '1.0'
  }
];

export default SCRAP_CAT_TUTORIALS;