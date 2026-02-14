/**
 * STEMGENEERS TUTORIALS
 * =====================
 * 
 * 3 free tutorials per pathway = 9 free total
 * ROV-T (Tech) guide throughout
 */

import { Tutorial } from './index';

export const STEMGENEERS_TUTORIALS: Tutorial[] = [
  // ========================================
  // DEVICES & PHONES PATHWAY
  // ========================================
  {
    id: 'phone-screen-protector',
    slug: 'phone-screen-protector',
    title: 'Phone Screen Protector Installation',
    description: 'Perfect bubble-free installation every time. The skill that builds trust with customers.',
    icon: '📱',
    programmes: ['stemgeneers'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Devices & Phones',
    tags: ['phone', 'screen', 'installation', 'beginner'],
    difficulty: 'beginner',
    duration: '15 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Clean Your Workspace', description: 'Find a dust-free area. Bathroom after a hot shower works well—steam settles dust.', tip: 'Use a desk lamp to spot dust particles.' },
      { step: 2, title: 'Remove Old Protector', description: 'Slide a plastic card under the corner. Lift slowly and evenly.', warning: 'Never use metal tools on the screen surface.' },
      { step: 3, title: 'Clean the Screen', description: 'Use alcohol wipe in circular motions from center outward. Dry with microfiber cloth.', tip: 'Hold phone at angle to light—dust shows up better.' },
      { step: 4, title: 'Remove Dust Particles', description: 'Use dust removal sticker to dab away remaining particles. Don\'t wipe—dab and lift.' },
      { step: 5, title: 'Align the Protector', description: 'Peel back bottom tab only. Align with top edge first—speakers, cameras, sensors.', tip: 'Some protectors have alignment frames. Use them.' },
      { step: 6, title: 'Apply and Smooth', description: 'Once aligned, slowly lower the protector. Use squeegee card to push bubbles from center to edges.', warning: 'Work slowly. Rushing causes bubbles.' },
      { step: 7, title: 'Remove Remaining Bubbles', description: 'Small bubbles often disappear within 24-48 hours. For stubborn ones, lift nearest edge slightly and re-smooth.' },
      { step: 8, title: 'Final Check', description: 'Test touch sensitivity. Check edges are adhered. Clean fingerprints from top surface.', tip: 'Take a photo for your portfolio.' }
    ],
    tools: [
      { name: 'Screen protector (tempered glass)', price: '£3-8', essential: true, cyberstoreSlug: 'screen-protectors' },
      { name: 'Alcohol wipes', price: '£2', essential: true },
      { name: 'Microfiber cloth', price: '£1-3', essential: true },
      { name: 'Dust removal stickers', price: '£2', essential: true },
      { name: 'Squeegee card', price: 'Usually included', essential: true }
    ],
    commonMistakes: ['Working in dusty environment', 'Rushing the alignment', 'Using too much pressure', 'Not checking under light', 'Peeling whole backing at once'],
    freeAccess: true,
    kit: { name: 'Screen Protector Installation Kit', slug: 'screen-kit', price: '£12.99', contents: ['10x screen protectors', 'Alcohol wipes', 'Microfiber cloths', 'Dust stickers', 'Alignment tools'] },
    workshop: { title: 'Phone Repair Basics', duration: '1 hour', price: '£15', format: 'zoom', bookingSlug: 'phone-basics' },
    nextTutorials: ['phone-port-cleaning', 'phone-battery-health'],
    badgeAwarded: 'screen-installer',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'phone-port-cleaning',
    slug: 'phone-port-cleaning',
    title: 'Charging Port Cleaning & Diagnosis',
    description: 'The #1 reason phones "won\'t charge" is a dirty port. Learn to diagnose and fix in minutes.',
    icon: '🔌',
    programmes: ['stemgeneers'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Devices & Phones',
    tags: ['phone', 'charging', 'cleaning', 'diagnosis'],
    difficulty: 'beginner',
    duration: '20 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Gather Information', description: 'Ask: Does cable feel loose? Charge sometimes? Dropped in water?', tip: 'If they\'ve tried multiple cables—it\'s almost certainly the port.' },
      { step: 2, title: 'Visual Inspection', description: 'Use flashlight to look inside port. Look for lint, debris, corrosion, bent pins.', warning: 'If you see corrosion, this is more complex repair.' },
      { step: 3, title: 'Power Off Device', description: 'Always power off before working on ports. Prevents short circuits.' },
      { step: 4, title: 'Compressed Air', description: 'Short bursts at an angle. Don\'t blast directly in—might push debris deeper.', tip: 'Hold can upright to avoid propellant liquid.' },
      { step: 5, title: 'Manual Debris Removal', description: 'Use plastic toothpick or spudger. Gently scrape along bottom and sides.', warning: 'NEVER use metal tools inside the port.' },
      { step: 6, title: 'Isopropyl Alcohol', description: 'For stubborn residue, dip wooden toothpick in 99% isopropyl. Clean gently.', tip: 'Wait 5 minutes before testing—let it evaporate.' },
      { step: 7, title: 'Test Connection', description: 'Power on. Try charging cable. Should click in firmly.' },
      { step: 8, title: 'Customer Education', description: 'Show them the debris. Recommend port covers. Easy upsell, genuine value.', tip: 'Sell port covers from Cyberstore.' }
    ],
    tools: [
      { name: 'Compressed air can', price: '£5-8', essential: true, cyberstoreSlug: 'compressed-air' },
      { name: 'Plastic spudger', price: '£1-2', essential: true, cyberstoreSlug: 'spudger-set' },
      { name: 'Wooden toothpicks', price: '£1', essential: true },
      { name: 'Isopropyl alcohol 99%', price: '£5-8', essential: true },
      { name: 'Flashlight', price: '£3-10', essential: true }
    ],
    commonMistakes: ['Using metal tools', 'Blasting air straight in', 'Not powering off first', 'Using water or household cleaners', 'Rushing'],
    freeAccess: true,
    kit: { name: 'Phone Repair Starter Kit', slug: 'phone-starter-kit', price: '£24.99', contents: ['Spudger set', 'Compressed air', 'Isopropyl alcohol', 'Cleaning tools', 'Port covers'] },
    workshop: { title: 'Phone Diagnostics', duration: '1 hour', price: '£20', format: 'zoom', bookingSlug: 'phone-diagnostics' },
    nextTutorials: ['phone-battery-health', 'phone-screen-replacement'],
    badgeAwarded: 'port-cleaner',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'phone-battery-health',
    slug: 'phone-battery-health',
    title: 'Battery Health Check & Diagnosis',
    description: 'Learn to diagnose battery issues, check health stats, and advise customers on replacement.',
    icon: '🔋',
    programmes: ['stemgeneers'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Devices & Phones',
    tags: ['phone', 'battery', 'diagnosis', 'health'],
    difficulty: 'beginner',
    duration: '25 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Customer Interview', description: 'How old is phone? How fast does it drain? Random shutoffs? Getting hot? Back bulging?', warning: 'If back is bulging—swollen battery. STOP. Handle with care.' },
      { step: 2, title: 'Check Battery Health (iPhone)', description: 'Settings → Battery → Battery Health. Below 80% = needs replacing.', tip: '"Peak Performance" throttled means battery degraded.' },
      { step: 3, title: 'Check Battery Health (Android)', description: 'Settings → Battery → Battery Health (varies). Or dial *#*#4636#*#* for hidden info.' },
      { step: 4, title: 'Physical Inspection', description: 'Check for bulging, screen lifting from frame, excessive heat during normal use.', warning: 'Swollen battery is fire hazard. Do NOT charge.' },
      { step: 5, title: 'Check Charging Behavior', description: 'Does it reach 100%? Percentage jump around? Die at 20-30%? These indicate issues.' },
      { step: 6, title: 'Background App Check', description: 'Settings → Battery → Usage. Rogue apps drain battery faster than hardware issues.', tip: 'Facebook and TikTok are notorious battery killers.' },
      { step: 7, title: 'Make Diagnosis', description: 'Below 80% health = replacement. Apps the culprit = optimize. Swollen = urgent replacement.' },
      { step: 8, title: 'Quote & Advise', description: 'Clear quote for replacement. Explain process and timeline. For old phones, discuss if repair is worth it.', tip: 'Be honest—5+ year old phone might not be worth a new battery.' }
    ],
    tools: [
      { name: 'Your knowledge', price: 'Free', essential: true },
      { name: 'Battery health app (Android)', price: 'Free', essential: false },
      { name: 'Customer trust', price: 'Priceless', essential: true }
    ],
    commonMistakes: ['Recommending replacement without checking apps', 'Not asking about phone age', 'Missing signs of swelling', 'Quoting without checking parts availability', 'Not explaining quick drain vs calibration'],
    freeAccess: true,
    kit: { name: 'Battery Replacement Kit', slug: 'battery-kit', price: '£15-40', contents: ['Model-specific battery', 'Opening tools', 'Adhesive strips', 'Spudger'] },
    workshop: { title: 'Battery Replacement Workshop', duration: '1.5 hours', price: '£25', format: 'zoom', bookingSlug: 'battery-workshop' },
    nextTutorials: ['phone-screen-replacement', 'phone-battery-replacement'],
    badgeAwarded: 'battery-diagnostics',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // WHEELS & MOBILITY PATHWAY
  // ========================================
  {
    id: 'ebike-puncture-repair',
    slug: 'ebike-puncture-repair',
    title: 'E-Bike Puncture Repair',
    description: 'The most common e-bike issue. Fast turnaround, builds customer trust, leads to bigger jobs.',
    icon: '🚲',
    programmes: ['stemgeneers'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Wheels & Mobility',
    tags: ['ebike', 'puncture', 'repair', 'tyre'],
    difficulty: 'beginner',
    duration: '30 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Safety First', description: 'Turn off e-bike. Disconnect motor cable if rear wheel. Prevents accidental activation.', warning: 'Never work with battery connected and power on.' },
      { step: 2, title: 'Remove the Wheel', description: 'Most have quick-release or 15mm nuts. For hub motors, note cable routing before removal.', tip: 'Photo of cable connections before disconnecting.' },
      { step: 3, title: 'Release Remaining Air', description: 'Press valve core. Presta: unscrew tip first. Schrader: press center pin.' },
      { step: 4, title: 'Remove the Tyre', description: 'Insert lever opposite valve. Hook onto spoke. Insert second 10cm away, slide around.', warning: 'Avoid metal levers—can damage rims. Plastic is safer.' },
      { step: 5, title: 'Find the Puncture', description: 'Pull out tube. Inflate slightly and listen/feel. Submerge in water if needed—bubbles show location.', tip: 'Inspect inside tyre for the cause—remove it!' },
      { step: 6, title: 'Patch or Replace', description: 'Small puncture: rough up, apply cement, wait tacky, apply patch. Large hole: replace tube.' },
      { step: 7, title: 'Reassemble', description: 'Partially inflate new/patched tube. Tuck valve through rim first. Work bead back on with hands.', warning: 'Check tube isn\'t pinched before fully inflating.' },
      { step: 8, title: 'Inflate & Test', description: 'Inflate to pressure on sidewall. Check for wobbles. Reinstall wheel, reconnect motor. Test ride.', tip: 'Recommend puncture-resistant tyres for repeat customers.' }
    ],
    tools: [
      { name: 'Tyre levers (plastic)', price: '£3-5', essential: true, cyberstoreSlug: 'tyre-levers' },
      { name: 'Puncture repair kit', price: '£5-8', essential: true, cyberstoreSlug: 'puncture-kit' },
      { name: 'Spare inner tubes', price: '£5-10', essential: true, cyberstoreSlug: 'inner-tubes' },
      { name: 'Track pump with gauge', price: '£20-40', essential: true, cyberstoreSlug: 'track-pump' },
      { name: '15mm spanner', price: '£5-10', essential: true }
    ],
    commonMistakes: ['Not finding cause of puncture', 'Pinching tube during reassembly', 'Wrong tube size', 'Under-inflating', 'Forgetting to reconnect motor cables'],
    freeAccess: true,
    kit: { name: 'E-Bike Puncture Kit', slug: 'ebike-puncture-kit', price: '£19.99', contents: ['Tyre levers', 'Patch kit', 'Spare tubes', 'Portable pump', '15mm spanner'] },
    workshop: { title: 'E-Bike Basics', duration: '1.5 hours', price: '£25', format: 'zoom', bookingSlug: 'ebike-basics' },
    nextTutorials: ['ebike-brake-adjustment', 'ebike-battery-basics'],
    badgeAwarded: 'puncture-pro',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'ebike-brake-adjustment',
    slug: 'ebike-brake-adjustment',
    title: 'E-Bike Brake Adjustment & Pad Check',
    description: 'Brakes are safety-critical. Learn to adjust cable tension, check pads, and ensure safe stopping.',
    icon: '🛑',
    programmes: ['stemgeneers'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Wheels & Mobility',
    tags: ['ebike', 'brakes', 'safety', 'adjustment'],
    difficulty: 'beginner',
    duration: '25 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Safety Check', description: 'E-bikes are heavy and fast. Good brakes essential. Inspect both front and rear.', warning: 'If pads worn to metal—don\'t adjust, replace immediately.' },
      { step: 2, title: 'Identify Brake Type', description: 'Rim brakes: pads on wheel rim. Disc brakes: pads on rotor. Most e-bikes have disc.', tip: 'Hydraulic disc brakes are self-adjusting for wear.' },
      { step: 3, title: 'Check Pad Wear', description: 'New pads: 3-4mm material. Replace under 1mm or when indicator visible. Uneven = alignment issue.' },
      { step: 4, title: 'Check Rotor Condition', description: 'Look for deep grooves, warping, blue discoloration. Spin wheel—rotor shouldn\'t rub.', warning: 'Never touch rotor with bare hands—oils affect braking.' },
      { step: 5, title: 'Adjust Cable Tension', description: 'Find barrel adjuster on lever or caliper. Counter-clockwise tightens. Lever should engage halfway.', tip: 'Quarter turns at a time. Test after each adjustment.' },
      { step: 6, title: 'Caliper Alignment', description: 'If rubbing: loosen caliper bolts slightly, squeeze lever to center, hold and tighten evenly.' },
      { step: 7, title: 'Test Braking Power', description: 'Spin wheel, apply brake—should stop promptly. No squealing. Both brakes should feel similar.', tip: 'Rear wears faster due to weight distribution.' },
      { step: 8, title: 'Road Test', description: 'Low speed first. Gradually test harder braking. Front should be stronger. Smooth, no grabbing.', warning: 'Grabbing or pulsing = warped rotor, recommend replacement.' }
    ],
    tools: [
      { name: 'Allen key set (3,4,5mm)', price: '£5-10', essential: true, cyberstoreSlug: 'allen-keys' },
      { name: 'Brake pad alignment tool', price: '£5-8', essential: false },
      { name: 'Isopropyl alcohol + cloth', price: '£5', essential: true },
      { name: 'Torx keys (T25)', price: '£5-8', essential: false },
      { name: 'Replacement brake pads', price: '£10-25', essential: false, cyberstoreSlug: 'brake-pads' }
    ],
    commonMistakes: ['Contaminating pads/rotor with fingers', 'Over-tightening cable', 'Not checking both brakes', 'Adjusting hydraulic like cable', 'Missing warped rotor signs'],
    freeAccess: true,
    kit: { name: 'E-Bike Brake Service Kit', slug: 'brake-kit', price: '£29.99', contents: ['Allen keys', 'Brake pads set', 'Rotor cleaner', 'Alignment tools'] },
    workshop: { title: 'E-Bike Brake Workshop', duration: '1 hour', price: '£25', format: 'zoom', bookingSlug: 'brake-workshop' },
    nextTutorials: ['ebike-battery-basics', 'ebike-motor-diagnosis'],
    badgeAwarded: 'brake-technician',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'ebike-battery-basics',
    slug: 'ebike-battery-basics',
    title: 'E-Bike Battery Health & Diagnosis',
    description: 'Battery is the most expensive component. Learn to diagnose issues before recommending replacement.',
    icon: '🔋',
    programmes: ['stemgeneers'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Wheels & Mobility',
    tags: ['ebike', 'battery', 'diagnosis', 'health'],
    difficulty: 'beginner',
    duration: '30 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Customer Interview', description: 'How old? Current vs original range? Storage conditions? Charging habits? Error codes?', tip: 'Batteries stored full or empty degrade faster.' },
      { step: 2, title: 'Visual Inspection', description: 'Check for damage, swelling, contact corrosion, water ingress. Check key slot and mounts.', warning: 'If swollen, bulging, or smells burnt—DO NOT charge.' },
      { step: 3, title: 'Check Display Readings', description: 'Turn on. Note percentage, error codes, estimated range. Compare to manufacturer specs.' },
      { step: 4, title: 'Voltage Check', description: '36V system: 42V full, 30V empty. 48V system: 54.6V full, 40V empty. Lower = degraded cells.', tip: 'Voltage dropping rapidly under load = weak cells.' },
      { step: 5, title: 'Charge Test', description: 'Charge fully. Note time (longer = degraded). Check if reaches 100%—degraded stop at 80-90%.' },
      { step: 6, title: 'Range Test', description: 'Test ride or note customer\'s reported range vs original. 70% of original = battery aging.', tip: 'Account for assist level, terrain, weight, tyre pressure.' },
      { step: 7, title: 'Connection Check', description: 'Clean contacts with isopropyl. Check connector for corrosion/bent pins. Poor connection mimics battery issues.' },
      { step: 8, title: 'Make Diagnosis', description: '3+ years with range loss: likely needs replacement. Newer with issues: could be BMS, charger, or connection.', tip: 'Test with known good charger before recommending battery replacement.' }
    ],
    tools: [
      { name: 'Digital multimeter', price: '£15-40', essential: true, cyberstoreSlug: 'multimeter' },
      { name: 'Isopropyl alcohol + cloth', price: '£5', essential: true },
      { name: 'Contact cleaner spray', price: '£8-12', essential: false },
      { name: 'Battery spec knowledge', price: 'Free (research)', essential: true }
    ],
    commonMistakes: ['Recommending replacement without testing charger', 'Not accounting for age', 'Ignoring storage conditions', 'Missing connection issues', 'Handling damaged batteries unsafely'],
    freeAccess: true,
    kit: { name: 'E-Bike Diagnostic Kit', slug: 'ebike-diagnostic-kit', price: '£34.99', contents: ['Multimeter', 'Contact cleaner', 'Connector kit', 'Reference cards'] },
    workshop: { title: 'E-Bike Electrics', duration: '2 hours', price: '£35', format: 'zoom', bookingSlug: 'ebike-electrics' },
    nextTutorials: ['ebike-motor-diagnosis', 'ebike-controller-basics'],
    badgeAwarded: 'battery-diagnostician',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // HOME TECH & STUDIO PATHWAY
  // ========================================
  {
    id: 'pc-cleaning-thermal',
    slug: 'pc-cleaning-thermal',
    title: 'PC Cleaning & Thermal Paste Replacement',
    description: 'The #1 fix for overheating PCs. Dust buildup kills performance. Learn proper cleaning technique.',
    icon: '🖥️',
    programmes: ['stemgeneers'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Home Tech & Studio',
    tags: ['pc', 'cleaning', 'thermal paste', 'overheating'],
    difficulty: 'beginner',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Preparation', description: 'Power off completely. Unplug from wall. Press power to discharge. Work on non-carpeted surface.', tip: 'Ground yourself by touching metal case.' },
      { step: 2, title: 'Open the Case', description: 'Remove side panel (thumbscrews or latches). Photo cable routing before starting.', warning: 'Opening may void warranty. Check first.' },
      { step: 3, title: 'Initial Dust Removal', description: 'Use compressed air from top to bottom, inside to outside. Short bursts, hold fans still.', warning: 'Hold fans still—spinning generates electricity.' },
      { step: 4, title: 'Deep Clean Fans', description: 'Use cotton swabs for blades. Consider removing case fans for thorough cleaning.' },
      { step: 5, title: 'CPU Cooler Removal', description: 'Disconnect fan cable. Unscrew/unlatch cooler. Twist gently to break seal. Lift straight up.', tip: 'Run PC 5 mins first—warm paste easier.' },
      { step: 6, title: 'Clean Old Thermal Paste', description: 'Isopropyl 90%+ and lint-free cloth. Clean both CPU and cooler base to mirror finish.', warning: 'Don\'t touch CPU after cleaning—oils affect transfer.' },
      { step: 7, title: 'Apply New Paste', description: 'Small pea-sized dot in center. Don\'t spread—cooler pressure does that. Too much is bad.', tip: 'Different pastes, different consistencies. Pea works for most.' },
      { step: 8, title: 'Reassemble & Test', description: 'Reseat cooler evenly, reconnect fan. Replace panel. Boot to BIOS, check temp. Should be 30-50°C idle.', tip: 'Run stress test to verify temps under load.' }
    ],
    tools: [
      { name: 'Compressed air can', price: '£5-8', essential: true, cyberstoreSlug: 'compressed-air' },
      { name: 'Isopropyl alcohol 90%+', price: '£5-8', essential: true },
      { name: 'Lint-free cloths', price: '£3-5', essential: true },
      { name: 'Thermal paste (quality)', price: '£8-15', essential: true, cyberstoreSlug: 'thermal-paste' },
      { name: 'Phillips screwdriver', price: '£3-5', essential: true },
      { name: 'Cotton swabs', price: '£2', essential: true }
    ],
    commonMistakes: ['Spinning fans with air', 'Too much thermal paste', 'Not grounding yourself', 'Forgetting to reconnect CPU fan', 'Using household cleaners'],
    freeAccess: true,
    kit: { name: 'PC Cleaning & Thermal Kit', slug: 'pc-thermal-kit', price: '£24.99', contents: ['Compressed air 2x', 'Thermal paste', 'Isopropyl', 'Lint-free cloths', 'Screwdriver set'] },
    workshop: { title: 'PC Maintenance', duration: '1.5 hours', price: '£25', format: 'zoom', bookingSlug: 'pc-maintenance' },
    nextTutorials: ['pc-storage-upgrade', 'pc-ram-upgrade'],
    badgeAwarded: 'thermal-technician',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'pc-storage-upgrade',
    slug: 'pc-storage-upgrade',
    title: 'SSD Installation & Data Migration',
    description: 'The single best upgrade for any old PC. SSD makes everything faster. Learn to install and migrate data.',
    icon: '💾',
    programmes: ['stemgeneers'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Home Tech & Studio',
    tags: ['pc', 'ssd', 'upgrade', 'storage'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Determine SSD Type', description: 'Check what PC supports: 2.5" SATA, M.2 SATA, or M.2 NVMe. Check motherboard manual.', tip: 'M.2 slots are small horizontal. SATA uses cables.' },
      { step: 2, title: 'Backup Data', description: 'Before any drive work, backup to external drive or cloud.', warning: 'Never skip this. Data loss is permanent.' },
      { step: 3, title: 'Install 2.5" SATA', description: 'Mount in drive bay or adapter. Connect SATA data to motherboard. Connect SATA power from PSU.', tip: 'SSDs have no moving parts—orientation doesn\'t matter.' },
      { step: 4, title: 'Install M.2', description: 'Insert at 30° angle. Press down gently. Secure with small screw. Reinstall heatsink if present.' },
      { step: 5, title: 'Option A: Fresh Install', description: 'Boot from Windows USB. Select new SSD. Windows formats and installs.', tip: 'Have Windows key ready. Microsoft account activates automatically.' },
      { step: 6, title: 'Option B: Clone Drive', description: 'Use Macrium Reflect (free) or Samsung Magician. Clone old to new. Takes 30-60 mins.' },
      { step: 7, title: 'Change Boot Order', description: 'Enter BIOS (Del, F2, or F12). Set new SSD as first boot device. Save and exit.', tip: 'If won\'t boot after clone, boot order is usually the issue.' },
      { step: 8, title: 'Verify & Optimize', description: 'Boot into Windows. Check Disk Management for correct size. Verify AHCI mode for best performance.', tip: 'Keep old drive as backup for a week before wiping.' }
    ],
    tools: [
      { name: 'SSD (2.5" or M.2)', price: '£40-100', essential: true, cyberstoreSlug: 'ssd-drives' },
      { name: 'SATA cable', price: '£3-5', essential: false },
      { name: 'Mounting bracket', price: '£5-8', essential: false },
      { name: 'Small Phillips screwdriver', price: '£3-5', essential: true },
      { name: 'USB for Windows install', price: '£8-12', essential: false },
      { name: 'Cloning software', price: 'Free', essential: false }
    ],
    commonMistakes: ['Wrong SSD type for PC', 'Not backing up', 'Forgetting boot order', 'Not checking clone success', 'Buying cheap unknown brands'],
    freeAccess: true,
    kit: { name: 'Storage Upgrade Kit', slug: 'storage-kit', price: '£49.99', contents: ['500GB SSD', 'USB enclosure', 'SATA cables', 'Mounting brackets', 'Cloning guide'] },
    workshop: { title: 'PC Upgrades Workshop', duration: '1.5 hours', price: '£30', format: 'zoom', bookingSlug: 'pc-upgrades' },
    nextTutorials: ['pc-ram-upgrade', 'pc-full-build'],
    badgeAwarded: 'storage-upgrader',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'streaming-audio-setup',
    slug: 'streaming-audio-setup',
    title: 'Streaming Audio Setup',
    description: 'Good audio is the difference between amateur and professional streams. Learn USB mic setup and OBS audio.',
    icon: '🎙️',
    programmes: ['stemgeneers', 'gtech-casters', 'raydyo'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Home Tech & Studio',
    tags: ['streaming', 'audio', 'microphone', 'obs'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    alternativeGuides: ['ROV-M'],
    steps: [
      { step: 1, title: 'Microphone Selection', description: 'USB mics easiest: Blue Yeti, Rode NT-USB Mini, Fifine. Condenser picks up more (including room noise). Dynamic more forgiving.', tip: 'Start USB. XLR needs audio interface—later upgrade.' },
      { step: 2, title: 'Physical Setup', description: 'Mount on arm if possible (reduces desk vibration). Position 6-8 inches from mouth, slightly off-axis.' },
      { step: 3, title: 'Connect & Install', description: 'Plug USB in. Windows should recognize. Check Device Manager if not detected.', tip: 'Try USB 2.0 port if issues—some mics don\'t like USB 3.0.' },
      { step: 4, title: 'Windows Audio Settings', description: 'Right-click speaker → Sound Settings → Input. Select mic as default. Set volume to 80%. Test with Voice Recorder.', warning: 'Don\'t set to 100%—introduces noise.' },
      { step: 5, title: 'OBS Audio Setup', description: 'Settings → Audio. Set Mic/Auxiliary to your USB mic. Add Audio Input Capture if needed. Test levels—peak yellow, never red.' },
      { step: 6, title: 'Basic Audio Filters', description: 'Right-click audio → Filters. Add: Noise Suppression (RNNoise), Noise Gate, Compressor.', tip: 'Order matters: Suppression first, Gate, then Compressor.' },
      { step: 7, title: 'Room Treatment', description: 'Hard surfaces cause echo. Add soft furnishings: carpet, curtains, cushions. Foam panels help.', tip: 'Closet full of clothes = surprisingly good recording booth.' },
      { step: 8, title: 'Test Recording', description: 'Record test. Listen on headphones. Check for: noise, echo, volume consistency, plosives. Adjust and repeat.', warning: 'What sounds fine to you may sound different to viewers.' }
    ],
    tools: [
      { name: 'USB microphone', price: '£40-120', essential: true, cyberstoreSlug: 'usb-mics' },
      { name: 'Mic arm/boom', price: '£20-40', essential: false, cyberstoreSlug: 'mic-arms' },
      { name: 'Pop filter', price: '£8-15', essential: false, cyberstoreSlug: 'pop-filters' },
      { name: 'Headphones', price: '£20-50', essential: true },
      { name: 'OBS Studio', price: 'Free', essential: true }
    ],
    commonMistakes: ['Mic too far away', 'Gain too high', 'Not using headphones', 'Ignoring room acoustics', 'Over-processing with filters'],
    freeAccess: true,
    kit: { name: 'Streaming Audio Starter Kit', slug: 'stream-audio-kit', price: '£79.99', contents: ['USB microphone', 'Boom arm', 'Pop filter', 'Shock mount', 'XLR upgrade path guide'] },
    workshop: { title: 'Streaming Setup Workshop', duration: '1.5 hours', price: '£30', format: 'zoom', bookingSlug: 'streaming-setup' },
    nextTutorials: ['streaming-camera-setup', 'obs-advanced'],
    badgeAwarded: 'audio-engineer',
    lastUpdated: '2024-12-26',
    version: '1.0'
  }
];

export default STEMGENEERS_TUTORIALS;