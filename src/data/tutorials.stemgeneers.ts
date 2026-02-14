/**
 * STEMGENEERS TUTORIALS (REWRITTEN)
 * ==================================
 * 
 * Technical Production Crew Training for Caribbean Theatre & Radio
 * 
 * 3 free tutorials per pathway = 9 free total
 * ROV-T (Tech) guide throughout
 * 
 * Focus: Behind-the-scenes technical skills for Kaywana's Court productions and Rayd-yo broadcasts
 * Cross-programme: Kaywana's Court (performance), Rayd-yo (broadcast), Silk Stilettos (exhibition lighting)
 * 
 * Who It's For:
 * - Tech-Minded Creators: Love figuring out how things work
 * - Audio Enthusiasts: Recording, mixing, broadcast engineering
 * - Behind-the-Scenes Builders: Make the magic happen backstage
 */

import { Tutorial } from '../types/tutorial';

export const STEMGENEERS_TUTORIALS: Tutorial[] = [
  // ========================================
  // SOUND ENGINEERING PATHWAY
  // ========================================
  {
    id: 'radio-drama-recording',
    slug: 'radio-drama-recording',
    title: 'Radio Drama Recording Basics',
    description: 'Capture professional dialogue for Caribbean radio dramas. Multi-track recording, mic placement, and directing actors for audio-only performance.',
    icon: '🎙️',
    programmes: ['stemgeneers', 'raydyo', 'kaywanas-court'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Sound Engineering',
    tags: ['recording', 'radio-drama', 'microphone', 'multi-track', 'dialogue'],
    difficulty: 'beginner',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Radio Drama Is Different', description: 'No visuals to carry weak audio. Every breath, rustle, and room tone matters. Caribbean radio drama has rich tradition—from Jamaica\'s "Doily Simmonds" to BBC Caribbean Voices. You\'re joining history.', tip: 'Listen to classic BBC Radio 4 dramas and Caribbean radio archives. Study what makes audio storytelling work.' },
      { step: 2, title: 'Studio vs Location', description: 'Studio: controlled, quiet, consistent. Location: authentic atmosphere but noise challenges. Most radio dramas: record dialogue in studio, add atmosphere in post. Start with what you can control.', checkpoint: true },
      { step: 3, title: 'Microphone Selection', description: 'Large diaphragm condenser: studio dialogue standard. Cardioid pattern rejects room noise. One mic per actor for drama—allows independent control. Rode NT1, Audio-Technica AT2020 are solid starters.', rovPrompt: 'What microphones work best for radio drama on a budget?' },
      { step: 4, title: 'Mic Placement for Dialogue', description: '6-8 inches from mouth. Slightly off-axis (45 degrees) to reduce plosives. Pop filter essential. Height: mouth level. Mark positions with tape for consistency between takes.' },
      { step: 5, title: 'Multi-Track Recording', description: 'Each actor on separate track. Allows individual editing, level adjustment, effects. DAW setup: Audacity, Reaper, or Logic. Arm each track, monitor all, record simultaneously.' },
      { step: 6, title: 'Directing for Audio', description: 'Actors must project emotion without visual cues. Coach them: "bigger" performances, clear diction, consistent distance from mic. Movement = unwanted noise. Mark scripts for sound cues.' },
      { step: 7, title: 'Room Tone and Silence', description: 'Record 30-60 seconds of "silence" in every location. This is your room tone—essential for seamless edits. Different rooms have different silence. Capture it.' },
      { step: 8, title: 'Production Planning', description: 'Script breakdown: how many actors, how many scenes, sound effects needed. Schedule efficiently—group scenes by cast to minimize setup changes. Plan = fewer problems.' }
    ],
    tools: [
      { name: 'Condenser microphone', price: '£100-200', essential: true, cyberstoreSlug: 'condenser-mics' },
      { name: 'Audio interface (2+ inputs)', price: '£80-150', essential: true, cyberstoreSlug: 'audio-interfaces' },
      { name: 'Pop filters', price: '£10-20 each', essential: true, cyberstoreSlug: 'pop-filters' },
      { name: 'Mic stands', price: '£20-40 each', essential: true, cyberstoreSlug: 'mic-stands' },
      { name: 'Headphones (closed-back)', price: '£50-100', essential: true, cyberstoreSlug: 'studio-headphones' },
      { name: 'DAW software', price: 'Free-£200', essential: true }
    ],
    commonMistakes: ['Mic too far from actor', 'Not recording room tone', 'All actors on one track', 'Ignoring clothing rustle', 'No pop filter', 'Room echo not treated'],
    freeAccess: true,
    kit: { name: 'Radio Drama Starter Kit', slug: 'radio-drama-starter', price: '£199.99', contents: ['2x Condenser mics', '2-channel interface', 'Pop filters', 'Mic stands', 'Cables', 'Headphones', 'Acoustic panels 4-pack'], savings: 'Save £60 vs buying separately' },
    workshop: { title: 'Radio Drama Recording Intensive', duration: '3 hours', price: '£45', format: 'in-person', bookingSlug: 'radio-drama-workshop' },
    nextTutorials: ['audio-mixing-drama', 'live-sound-reinforcement'],
    relatedTutorials: ['podcast-equipment-basics', 'interview-techniques'],
    badgeAwarded: 'drama-recordist',
    lastUpdated: '2024-12-27',
    version: '1.0'
  },
  {
    id: 'audio-mixing-drama',
    slug: 'audio-mixing-drama',
    title: 'Mixing Audio for Radio Drama',
    description: 'Transform raw recordings into immersive audio theatre. Dialogue editing, sound effects, atmosphere, music beds, and the final mix.',
    icon: '🎚️',
    programmes: ['stemgeneers', 'raydyo', 'kaywanas-court'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Sound Engineering',
    tags: ['mixing', 'editing', 'sound-effects', 'radio-drama', 'post-production'],
    difficulty: 'intermediate',
    duration: '50 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'The Mix Creates the World', description: 'In radio drama, your mix IS the set, the lighting, the location. A door sound places us in a room. Distant traffic = urban setting. Your choices create the listener\'s imagination.', tip: 'Close your eyes while mixing. If you can\'t "see" the scene, the mix isn\'t working yet.' },
      { step: 2, title: 'Dialogue Editing First', description: 'Clean each take: remove breaths (some, not all), mouth clicks, room rumble. Crossfade between takes. Maintain natural rhythm—don\'t make it robotic.', checkpoint: true },
      { step: 3, title: 'EQ for Voice Clarity', description: 'High-pass filter at 80-100Hz (removes rumble). Gentle boost at 2-4kHz (presence/clarity). Cut any muddy frequencies (200-400Hz if needed). Each voice is different—listen, adjust.', rovPrompt: 'How do I EQ dialogue to cut through a busy mix?' },
      { step: 4, title: 'Compression for Consistency', description: 'Dialogue needs even levels. Gentle compression: 3:1 ratio, threshold catching peaks. Don\'t squash it—maintain dynamics for emotional performance. Listen for pumping.' },
      { step: 5, title: 'Sound Effects Design', description: 'Foley (created sounds) vs library effects. Layer multiple sounds for richness. A "door close" might be: handle, latch, wood thud, room reverb. Build your SFX library over time.' },
      { step: 6, title: 'Atmosphere and Ambience', description: 'Continuous background creates location. Market scene: crowd murmur, distant vendors, traffic. Kitchen: fridge hum, clock tick, occasional bird outside. Subtle but essential.' },
      { step: 7, title: 'Music Beds', description: 'Underscore supports emotion without dominating. Duck music under dialogue (-15 to -20dB). Match music mood to scene. Transitions: music bridges scene changes.' },
      { step: 8, title: 'The Final Mix', description: 'Dialogue: front and center (-12 to -6dB peaks). SFX: support dialogue, never compete. Atmosphere: barely noticed but always felt. Music: emotional support. Master to -14 LUFS for broadcast.' }
    ],
    tools: [
      { name: 'DAW with multitrack', price: 'Free-£200', essential: true },
      { name: 'Reference headphones', price: '£100-200', essential: true, cyberstoreSlug: 'reference-headphones' },
      { name: 'Sound effects library', price: 'Free-£50', essential: true, cyberstoreSlug: 'sfx-library' },
      { name: 'Plugin bundle (EQ, comp)', price: 'Free (stock plugins)', essential: true },
      { name: 'Loudness meter', price: 'Free (Youlean)', essential: true }
    ],
    commonMistakes: ['Dialogue buried under music', 'SFX too loud or fake-sounding', 'No room tone between edits', 'Over-compressed dialogue', 'Inconsistent levels between scenes', 'Forgetting stereo field for atmosphere'],
    freeAccess: true,
    kit: { name: 'Audio Mixing Toolkit', slug: 'mixing-toolkit', price: '£49.99', contents: ['SFX library (500+ sounds)', 'Caribbean atmosphere packs', 'Mixing templates', 'Reference tracks', 'Plugin presets'] },
    workshop: { title: 'Radio Drama Mixing Masterclass', duration: '4 hours', price: '£55', format: 'in-person', bookingSlug: 'drama-mixing-masterclass' },
    nextTutorials: ['live-sound-reinforcement', 'broadcast-engineering-basics'],
    relatedTutorials: ['audio-editing-basics', 'podcast-mixing'],
    badgeAwarded: 'drama-mixer',
    lastUpdated: '2024-12-27',
    version: '1.0'
  },
  {
    id: 'live-sound-reinforcement',
    slug: 'live-sound-reinforcement',
    title: 'Live Sound Reinforcement',
    description: 'Run sound for Kaywana\'s Court performances. Wireless mics, stage monitors, front-of-house mixing, and keeping the show running when things go wrong.',
    icon: '🔊',
    programmes: ['stemgeneers', 'kaywanas-court', 'trubble-n-bass'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Sound Engineering',
    tags: ['live-sound', 'theatre', 'wireless', 'mixing', 'performance'],
    difficulty: 'intermediate',
    duration: '50 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Live Is Different', description: 'No second takes. Audience is there. Problems must be solved in real-time, invisibly. This is high-stakes technical work. Preparation is everything.', tip: 'The best live sound engineers are invisible—audience never notices them. That\'s the goal.' },
      { step: 2, title: 'System Signal Flow', description: 'Mics → Stage box → Mixer → Processing → Amps → Speakers. Monitors are separate send. Understand the chain—troubleshooting requires knowing where signal goes.', checkpoint: true },
      { step: 3, title: 'Wireless Microphone Management', description: 'Frequency coordination: avoid interference. Battery protocol: fresh for each show, backups ready. Bodypack placement: secure, no rustle. Lavalier placement: consistent, hidden but clear.', rovPrompt: 'How do I manage wireless mics for a theatre production with 8 actors?' },
      { step: 4, title: 'Stage Monitor Mixing', description: 'Actors need to hear themselves and cues. Each monitor mix may differ. Vocalists want more of themselves. Feedback happens when monitor picks up its own sound—know the frequencies, cut them.' },
      { step: 5, title: 'Front of House Mixing', description: 'What audience hears. Balance all sources. Ride faders for dynamics—bring up quiet moments, control loud ones. Follow the script: know when songs, effects, scene changes happen.' },
      { step: 6, title: 'Soundcheck Protocol', description: 'Line check: every mic, every channel, every speaker. Individual levels. Build the mix. Run problem sections. Note settings. Leave time—rushed soundcheck = show problems.' },
      { step: 7, title: 'Show Running', description: 'Follow script/cue sheet. Anticipate changes. Mute unused mics (prevents mistakes). Watch the stage—if actor moves unexpectedly, adapt. Stay calm. Solutions, not panic.' },
      { step: 8, title: 'When Things Go Wrong', description: 'Mic dies: backup ready, swap quickly. Feedback: identify and cut frequency. Speaker fails: route to backup. Cable issue: spare cables, fast swap. Every problem has a solution—practice finding them.' }
    ],
    tools: [
      { name: 'Digital mixer', price: '£300-1000', essential: true, cyberstoreSlug: 'digital-mixers' },
      { name: 'Wireless mic system', price: '£150-500 per channel', essential: true, cyberstoreSlug: 'wireless-mics' },
      { name: 'Stage monitors', price: '£150-300 each', essential: true, cyberstoreSlug: 'stage-monitors' },
      { name: 'DI boxes', price: '£30-80 each', essential: true, cyberstoreSlug: 'di-boxes' },
      { name: 'Cable kit', price: '£100-200', essential: true, cyberstoreSlug: 'cable-kit' },
      { name: 'Spare batteries', price: '£20-40', essential: true }
    ],
    commonMistakes: ['No soundcheck', 'Not following the script', 'Leaving unused mics open', 'Poor wireless frequency coordination', 'No backup plan', 'Panic when problems occur'],
    freeAccess: true,
    kit: { name: 'Live Sound Essentials', slug: 'live-sound-essentials', price: '£79.99', contents: ['Cable kit (XLR, Jack, adapters)', 'DI box', 'Gaffer tape', 'Torch', 'Spare batteries', 'Cue sheet templates', 'Troubleshooting guide'] },
    workshop: { title: 'Live Sound for Theatre', duration: '4 hours', price: '£60', format: 'in-person', bookingSlug: 'live-sound-theatre' },
    nextTutorials: ['broadcast-engineering-basics', 'stage-automation-effects'],
    relatedTutorials: ['running-a-dance', 'live-pa-setup'],
    badgeAwarded: 'live-sound-tech',
    lastUpdated: '2024-12-27',
    version: '1.0'
  },

  // ========================================
  // LIGHTING & VISUAL TECH PATHWAY
  // ========================================
  {
    id: 'stage-lighting-fundamentals',
    slug: 'stage-lighting-fundamentals',
    title: 'Stage Lighting Fundamentals',
    description: 'Light tells the story. Learn fixture types, colour theory, angles, and creating mood for Caribbean theatre productions.',
    icon: '💡',
    programmes: ['stemgeneers', 'kaywanas-court'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Lighting & Visual Tech',
    tags: ['lighting', 'stage', 'theatre', 'design', 'fixtures'],
    difficulty: 'beginner',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Light Is Emotion', description: 'Warm golden light = comfort, home, Caribbean sunshine. Cool blue = night, mystery, isolation. Harsh shadows = tension, danger. Soft wash = peace. You\'re painting with light.', tip: 'Watch films with the sound off. Notice how lighting creates mood before a word is spoken.' },
      { step: 2, title: 'The Three-Point System', description: 'Key light: main illumination, creates shadows. Fill light: softens shadows. Back light: separates subject from background. This basic system works for theatre, exhibitions, everything.', checkpoint: true },
      { step: 3, title: 'Fixture Types', description: 'Fresnel: soft-edged wash, adjustable beam. Profile/ellipsoidal: hard-edged, can use gobos for patterns. PAR: punchy, fixed beam. LED panels: colour mixing, energy efficient. Know what each does.', rovPrompt: 'What fixtures do I need for a small theatre production?' },
      { step: 4, title: 'Colour Theory for Stage', description: 'Additive colour: red + green + blue = white (lights). Complementary colours create contrast. Warm/cool creates depth. Caribbean theatre: consider vibrant colours of Carnival, market scenes, sunset skies.' },
      { step: 5, title: 'Angles and Position', description: 'Front: visibility but flat. Side: sculptural, dramatic. Back: silhouettes, atmosphere. Top: isolation, intensity. 45-degree angle: classic theatre lighting, natural-looking.' },
      { step: 6, title: 'Creating a Lighting Plot', description: 'Plan on paper first. Mark fixture positions, types, colours, channels. What does each scene need? Day vs night. Interior vs exterior. Build the plot scene by scene.' },
      { step: 7, title: 'Focus and Rigging', description: 'Safety first: secure fixtures properly. Focus: aim each light precisely. Lock off adjustments. Label cables. Document everything—you\'ll thank yourself during the run.' },
      { step: 8, title: 'Working with Directors', description: 'Lighting serves the story. Discuss vision before designing. Show options. Be ready to adjust. Collaboration creates the best results. Ego doesn\'t help anyone.' }
    ],
    tools: [
      { name: 'Basic LED par kit', price: '£200-400 for 4', essential: true, cyberstoreSlug: 'led-par-kit' },
      { name: 'Lighting stands', price: '£30-60 each', essential: true, cyberstoreSlug: 'lighting-stands' },
      { name: 'DMX controller (basic)', price: '£50-150', essential: true, cyberstoreSlug: 'dmx-controller' },
      { name: 'DMX cables', price: '£10-20 each', essential: true, cyberstoreSlug: 'dmx-cables' },
      { name: 'Gels/colour filters', price: '£5-15 per sheet', essential: false, cyberstoreSlug: 'lighting-gels' },
      { name: 'Safety cables', price: '£5-10 each', essential: true }
    ],
    commonMistakes: ['Lighting too bright/flat', 'Ignoring back light', 'No colour contrast', 'Unsafe rigging', 'Not enough time for focus', 'Designing without understanding the script'],
    freeAccess: true,
    kit: { name: 'Stage Lighting Starter', slug: 'lighting-starter', price: '£299.99', contents: ['4x LED par cans', '2x stands', 'DMX controller', 'Cables', 'Safety cables', 'Gel sample pack', 'Lighting plot templates'], savings: 'Complete starter rig, save £80' },
    workshop: { title: 'Stage Lighting Design', duration: '4 hours', price: '£55', format: 'in-person', bookingSlug: 'lighting-design-workshop' },
    nextTutorials: ['dmx-programming-control', 'exhibition-interior-lighting'],
    relatedTutorials: ['zine-layout-design', 'feature-writing'],
    badgeAwarded: 'lighting-designer',
    lastUpdated: '2024-12-27',
    version: '1.0'
  },
  {
    id: 'dmx-programming-control',
    slug: 'dmx-programming-control',
    title: 'DMX Programming & Control',
    description: 'Master the language of theatre lighting. Program cues, create chases, sync with music, and run complex shows with confidence.',
    icon: '🎛️',
    programmes: ['stemgeneers', 'kaywanas-court', 'trubble-n-bass'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Lighting & Visual Tech',
    tags: ['dmx', 'programming', 'control', 'cues', 'automation'],
    difficulty: 'intermediate',
    duration: '50 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'What Is DMX?', description: 'Digital Multiplex: industry standard protocol. 512 channels per universe. Each fixture uses channels for intensity, colour, position, etc. One cable controls many fixtures. Universal language.', tip: 'DMX is just numbers (0-255) on channels. Once you understand that, everything else is configuration.' },
      { step: 2, title: 'Addressing Fixtures', description: 'Each fixture needs unique start address. A 4-channel fixture at address 1 uses channels 1-4. Next fixture starts at 5. Plan addresses before patching—saves headaches.', checkpoint: true },
      { step: 3, title: 'Patching Your Rig', description: 'Tell the controller what\'s connected where. Select fixture type (profile), assign to channel/address. Match exactly to your physical rig. Test each fixture individually.', rovPrompt: 'How do I patch a lighting rig in QLC+?' },
      { step: 4, title: 'Creating Looks', description: 'A "look" is a lighting state. Build looks for each scene/moment. Save as scenes/presets. Name clearly: "Scene 1 - Morning Kitchen" not "Look 7." Future you will be grateful.' },
      { step: 5, title: 'Programming Cues', description: 'Cues are timed transitions between looks. Fade time: how long to transition. Delay: wait before starting. Build cue stack: sequence of cues for the show.' },
      { step: 6, title: 'Chases and Effects', description: 'Automated sequences: colour cycles, movement patterns, strobes. Speed and direction adjustable. Useful for music, dance, transitions. Don\'t overuse—effects should serve the story.' },
      { step: 7, title: 'Running the Show', description: 'Cue sheet: what happens when. "Go" triggers next cue. Manual overrides for problems. Mark script with cue points. Follow performance—adapt timing to actors.' },
      { step: 8, title: 'Software Options', description: 'QLC+ (free, powerful). Chamsys MagicQ (free PC version). Commercial: ETC Eos family, MA Lighting. Start free, learn principles, upgrade when needed.' }
    ],
    tools: [
      { name: 'DMX software (QLC+)', price: 'Free', essential: true },
      { name: 'USB-DMX interface', price: '£30-80', essential: true, cyberstoreSlug: 'usb-dmx-interface' },
      { name: 'DMX cables (various lengths)', price: '£10-25 each', essential: true, cyberstoreSlug: 'dmx-cables' },
      { name: 'DMX tester', price: '£30-50', essential: false, cyberstoreSlug: 'dmx-tester' },
      { name: 'Laptop', price: 'Already have', essential: true }
    ],
    commonMistakes: ['Wrong fixture profiles', 'Address conflicts', 'Forgetting to save', 'Cues not named clearly', 'No backup of show file', 'Effects overwhelming the drama'],
    freeAccess: true,
    kit: { name: 'DMX Control Kit', slug: 'dmx-control-kit', price: '£89.99', contents: ['USB-DMX interface', 'DMX cables 3-pack', 'DMX tester', 'QLC+ setup guide', 'Sample show files', 'Fixture library'] },
    workshop: { title: 'DMX Programming Intensive', duration: '4 hours', price: '£55', format: 'in-person', bookingSlug: 'dmx-programming' },
    nextTutorials: ['exhibition-interior-lighting', 'stage-automation-effects'],
    relatedTutorials: ['production-problem-solving', 'live-sound-reinforcement'],
    badgeAwarded: 'dmx-programmer',
    lastUpdated: '2024-12-27',
    version: '1.0'
  },
  {
    id: 'exhibition-interior-lighting',
    slug: 'exhibition-interior-lighting',
    title: 'Exhibition & Interior Lighting',
    description: 'Extend your lighting skills beyond theatre. Light fashion shows, art exhibitions, pop-up markets, and retail spaces. Partner with Silk Stilettos for complete event design.',
    icon: '✨',
    programmes: ['stemgeneers', 'silk-stilettos'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Lighting & Visual Tech',
    tags: ['exhibition', 'interior', 'fashion', 'retail', 'events'],
    difficulty: 'intermediate',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    alternativeGuides: ['ROV-C'],
    steps: [
      { step: 1, title: 'Beyond Theatre', description: 'Same principles, different contexts. Fashion shows need runway lighting. Art exhibitions need precise object lighting. Pop-up markets need atmosphere and product visibility. Skills transfer.', tip: 'Silk Stilettos designers + STEMgeneers lighting = complete event team. Cross-programme collaboration creates unique services.' },
      { step: 2, title: 'Fashion Show Lighting', description: 'Runway: even front light, no shadows on face. Colour wash for mood. Dramatic entrance lighting. Coordinate with music cues. Work with designers to enhance garment colours.', checkpoint: true },
      { step: 3, title: 'Art Exhibition Lighting', description: 'Paintings: 30-degree angle from above, even coverage. Sculptures: multiple angles for dimension. Avoid UV damage to sensitive works. Adjustable track lighting is standard.', rovPrompt: 'How do I light a mixed-media art exhibition?' },
      { step: 4, title: 'Retail and Pop-Up Spaces', description: 'Ambient: overall comfortable level. Accent: highlight products, focal points. Task: checkout, detailed viewing. 80% accent, 20% ambient is common retail formula.' },
      { step: 5, title: 'Colour Temperature Matters', description: 'Warm (2700-3000K): intimate, comfortable, flattering. Cool (4000-5000K): clean, modern, alert. Match to mood and product. Food looks better warm. Jewellery may need cooler light.' },
      { step: 6, title: 'Battery and Portable Options', description: 'Not every venue has power where you need it. LED panels on batteries. Rechargeable tube lights. Solar-charged options for outdoor markets. Know your portable options.' },
      { step: 7, title: 'Working with Clients', description: 'Understand the brand/vision. Provide mood board examples. Manage expectations on budget vs results. Document everything—professional approach builds reputation.' },
      { step: 8, title: 'Pricing Event Lighting', description: 'Equipment hire + design time + setup + operation + strike. Day rate vs project rate. Include transport. Add contingency for problems. TECHreneurs module covers business side in depth.' }
    ],
    tools: [
      { name: 'Battery LED panels', price: '£50-150 each', essential: true, cyberstoreSlug: 'battery-led-panels' },
      { name: 'LED tube lights', price: '£30-80 each', essential: false, cyberstoreSlug: 'led-tube-lights' },
      { name: 'Adjustable stands', price: '£30-60 each', essential: true, cyberstoreSlug: 'adjustable-stands' },
      { name: 'Extension leads and distribution', price: '£30-50', essential: true, cyberstoreSlug: 'power-distribution' },
      { name: 'Clamps and mounting hardware', price: '£20-40', essential: true, cyberstoreSlug: 'mounting-hardware' }
    ],
    commonMistakes: ['Ignoring colour temperature', 'Poor power planning', 'Shadows on products/art', 'Not coordinating with event team', 'Underpricing services', 'No site visit before event'],
    freeAccess: true,
    kit: { name: 'Event Lighting Kit', slug: 'event-lighting-kit', price: '£199.99', contents: ['2x Battery LED panels', '2x LED tube lights', 'Stands', 'Clamps', 'Power distribution', 'Carry bags', 'Client proposal templates'] },
    workshop: { title: 'Event Lighting Design', duration: '3 hours', price: '£45', format: 'in-person', bookingSlug: 'event-lighting-workshop' },
    nextTutorials: ['production-problem-solving', 'stage-automation-effects'],
    relatedTutorials: ['client-communication-basics', 'pricing-your-work'],
    badgeAwarded: 'event-lighting-designer',
    lastUpdated: '2024-12-27',
    version: '1.0'
  },

  // ========================================
  // STAGE TECH & BROADCAST PATHWAY
  // ========================================
  {
    id: 'broadcast-engineering-basics',
    slug: 'broadcast-engineering-basics',
    title: 'Broadcast Engineering Basics',
    description: 'Run Rayd-yo radio broadcasts and live streams. Signal chains, streaming platforms, broadcast standards, and keeping shows on-air.',
    icon: '📡',
    programmes: ['stemgeneers', 'raydyo', 'gtech-casters'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Stage Tech & Broadcast',
    tags: ['broadcast', 'streaming', 'radio', 'live', 'engineering'],
    difficulty: 'intermediate',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'Broadcast vs Recording', description: 'Recording: fix mistakes in post. Broadcast: live to audience NOW. Higher stakes, different mindset. Everything must work the first time. Preparation is survival.', tip: 'Build redundancy into everything. Two of everything critical. When (not if) something fails, you need backup.' },
      { step: 2, title: 'The Broadcast Chain', description: 'Source (mics, music) → Mixer → Processing → Encoder → Platform → Listener. Every link matters. Signal quality only goes down, never up—start clean.', checkpoint: true },
      { step: 3, title: 'Streaming Platforms', description: 'Radio: Mixcloud Live, Airtime Pro, RadioCo. Video: OBS to YouTube/Twitch. Multi-platform: Restream. Choose based on audience, budget, complexity.', rovPrompt: 'What streaming platform works best for community radio?' },
      { step: 4, title: 'Audio Processing for Broadcast', description: 'Broadcast audio is heavily processed. Compression: even levels, louder presence. Limiting: prevent peaks/distortion. EQ: clarity for small speakers. This is why radio "sounds like radio."' },
      { step: 5, title: 'Stream Quality Settings', description: 'Audio bitrate: 128kbps for speech, 256kbps for music. Sample rate: 44.1kHz standard. Buffer settings balance quality vs latency. Test before going live.' },
      { step: 6, title: 'Scheduling and Automation', description: 'Not everything is live. Pre-recorded shows, playlists, automation. Software: Mixxx, RadioDJ, PlayIt Live. Schedule content, maintain broadcast 24/7.' },
      { step: 7, title: 'Live Show Management', description: 'Countdown to air. Switch to live. Monitor levels. Watch chat/feedback. Manage guests. Transition to breaks. Back to content. Sign off. Sounds simple. Requires practice.' },
      { step: 8, title: 'When Streams Fail', description: 'Internet drops: backup connection, mobile hotspot. Software crashes: quick restart, filler content ready. Hardware fails: swap fast. Keep talking while fixing—dead air is death.' }
    ],
    tools: [
      { name: 'Broadcast mixer', price: '£150-400', essential: true, cyberstoreSlug: 'broadcast-mixers' },
      { name: 'Streaming software (OBS)', price: 'Free', essential: true },
      { name: 'Broadcast processor (software)', price: 'Free-£100', essential: true },
      { name: 'Reliable internet (wired)', price: 'Monthly cost', essential: true },
      { name: 'Backup internet (mobile)', price: 'Monthly cost', essential: true },
      { name: 'Streaming encoder/interface', price: '£100-300', essential: true, cyberstoreSlug: 'streaming-interfaces' }
    ],
    commonMistakes: ['No backup internet', 'Untested before going live', 'Levels too hot', 'No filler content ready', 'Ignoring chat/feedback', 'Not monitoring actual stream output'],
    freeAccess: true,
    kit: { name: 'Broadcast Starter Kit', slug: 'broadcast-starter', price: '£249.99', contents: ['Broadcast mixer', 'Streaming interface', 'Processing software license', 'Backup mic', 'Cables', 'Emergency checklist', 'Rayd-yo templates'] },
    workshop: { title: 'Broadcast Engineering for Radio', duration: '4 hours', price: '£55', format: 'in-person', bookingSlug: 'broadcast-engineering' },
    nextTutorials: ['stage-automation-effects', 'production-problem-solving'],
    relatedTutorials: ['podcast-concept-planning', 'streaming-setup'],
    badgeAwarded: 'broadcast-engineer',
    lastUpdated: '2024-12-27',
    version: '1.0'
  },
  {
    id: 'stage-automation-effects',
    slug: 'stage-automation-effects',
    title: 'Stage Automation & Special Effects',
    description: 'Build the magic. Automated platforms, flying rigs, roboteering, drone tracks, RC racing trails, jump scares, pyrotechnics (safely), and theatrical illusions.',
    icon: '⚙️',
    programmes: ['stemgeneers', 'kaywanas-court'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Stage Tech & Broadcast',
    tags: ['automation', 'effects', 'robotics', 'theatrical', 'mechanisms'],
    difficulty: 'advanced',
    duration: '55 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'The Hidden Theatre', description: 'The best effects are invisible—until they happen. Trapdoors, flying rigs, moving scenery, automated reveals. Audience sees magic; you see engineering. That\'s the job.', tip: 'Study theatre history: Elizabethan stagecraft, Victorian spectacular, modern West End. Innovation comes from tradition.' },
      { step: 2, title: 'Safety Is Primary', description: 'Moving set pieces can crush. Flying rigs can fall. Pyro can burn. Never compromise on safety. Certifications exist for a reason. Start simple, build experience, get trained for complex work.', warning: 'This tutorial covers concepts and simple mechanisms. Flying, pyrotechnics, and complex automation require professional training and certification.' },
      { step: 3, title: 'Simple Automation', description: 'Start achievable: motorized turntables, pneumatic reveals, drop panels, trapdoor mechanisms. Arduino/Raspberry Pi control. Limit switches for safety. Build skills progressively.', checkpoint: true },
      { step: 4, title: 'Roboteering for Theatre', description: 'Animatronic puppets, mechanical creatures, controlled props. Servo motors for small movements. Stepper motors for precision. Remote triggers or programmed sequences.', rovPrompt: 'How do I build a simple animatronic puppet mechanism?' },
      { step: 5, title: 'Racing Tracks and Courses', description: 'Indoor/outdoor tracks for drone racing, RC vehicles. Timing systems, gates, obstacles. Lighting integration for dramatic effect. Event production meets tech competition.' },
      { step: 6, title: 'Jump Scares and Reveals', description: 'Horror theatre and immersive experiences. Timing is everything. Pneumatic pop-outs, drop panels, sound-synced reveals. Test on volunteers before audiences—effectiveness matters.' },
      { step: 7, title: 'Integration with Lighting and Sound', description: 'Effects rarely standalone. Sync with sound cues: crash cover reveals. Lighting supports: spotlight follows movement. Control systems talk to each other: MIDI, DMX, timecode.' },
      { step: 8, title: 'Scaling Up', description: 'Complex automation requires: engineering expertise, safety certification, insurance. Build portfolio with simple effects. Assist on larger productions. Get formal training. This is a career path.' }
    ],
    tools: [
      { name: 'Arduino/Raspberry Pi', price: '£20-50', essential: true, cyberstoreSlug: 'microcontrollers' },
      { name: 'Servo motors (various)', price: '£10-50', essential: true, cyberstoreSlug: 'servo-motors' },
      { name: 'Basic pneumatics kit', price: '£50-100', essential: false, cyberstoreSlug: 'pneumatics-starter' },
      { name: 'Limit switches', price: '£5-15 pack', essential: true, cyberstoreSlug: 'limit-switches' },
      { name: 'Remote trigger system', price: '£30-80', essential: true, cyberstoreSlug: 'remote-triggers' },
      { name: 'Basic fabrication tools', price: '£100-200', essential: true }
    ],
    commonMistakes: ['Skipping safety testing', 'Over-complex first projects', 'No maintenance plan', 'Ignoring weight limits', 'Insufficient rehearsal time', 'Not documenting builds'],
    freeAccess: true,
    kit: { name: 'Stage Effects Starter', slug: 'effects-starter', price: '£79.99', contents: ['Arduino kit', 'Servo motors 4-pack', 'Limit switches', 'Remote trigger', 'Wire and connectors', 'Project plans', 'Safety checklist'] },
    workshop: { title: 'Stage Automation Fundamentals', duration: '5 hours', price: '£65', format: 'in-person', bookingSlug: 'stage-automation' },
    nextTutorials: ['production-problem-solving', 'advanced-automation'],
    relatedTutorials: ['dmx-programming-control', 'live-sound-reinforcement'],
    badgeAwarded: 'stage-automator',
    lastUpdated: '2024-12-27',
    version: '1.0'
  },
  {
    id: 'production-problem-solving',
    slug: 'production-problem-solving',
    title: 'Production Problem Solving (Stagehand/Roadie)',
    description: 'The show must go on. Troubleshooting under pressure, quick fixes, emergency protocols, and the mindset that keeps productions running when everything breaks.',
    icon: '🔧',
    programmes: ['stemgeneers', 'kaywanas-court', 'trubble-n-bass'],
    primaryProgramme: 'stemgeneers',
    pathway: 'Stage Tech & Broadcast',
    tags: ['troubleshooting', 'stagehand', 'roadie', 'problem-solving', 'emergency'],
    difficulty: 'intermediate',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-T',
    steps: [
      { step: 1, title: 'The Stagehand Mindset', description: 'Calm under pressure. Solutions-focused. No ego—the show matters, not who\'s right. Prepared for anything. This is a skill and a temperament. Both can be developed.', tip: 'Experience builds calm. Every problem you solve makes the next one less scary. Seek challenges.' },
      { step: 2, title: 'Systematic Troubleshooting', description: 'Signal chain: trace from source to output. Swap method: replace one component at a time. Isolation: narrow down where the problem is. Don\'t guess—diagnose.', checkpoint: true },
      { step: 3, title: 'Common Sound Problems', description: 'No signal: cable, mute, phantom power, channel assignment. Hum: ground loop—lift ground on DI. Feedback: EQ, monitor position, mic technique. Distortion: gain staging.', rovPrompt: 'How do I quickly diagnose a dead channel during a live show?' },
      { step: 4, title: 'Common Lighting Problems', description: 'Fixture not responding: address, cable, power. Flicker: loose connection, failing lamp/LED. Wrong colour: profile/patch mismatch. DMX chain: terminator, cable damage, address clash.' },
      { step: 5, title: 'Emergency Kit', description: 'Gaffer tape (solves 40% of problems). Spare cables (every type). Batteries. Torch. Multimeter. Basic tools. Zip ties. Velcro. Sharpies. This kit goes everywhere you go.' },
      { step: 6, title: 'Communication Under Pressure', description: 'Clear, short, specific. "Stand by for blackout" not "um, we might need to..." Headset protocol. Hand signals when silent. Confirm understanding. Panic is contagious—don\'t spread it.' },
      { step: 7, title: 'When to Stop the Show', description: 'Safety issue: immediate stop. Actor injury: medical response first. Equipment dangerous: stop and fix. Aesthetic problem: probably keep going. Know the difference. Have authority.' },
      { step: 8, title: 'Post-Mortem Learning', description: 'After every show: what worked, what didn\'t. Document problems and solutions. Share with team. Build checklist items from failures. Every problem is a learning gift.' }
    ],
    tools: [
      { name: 'Emergency toolkit', price: '£50-100', essential: true, cyberstoreSlug: 'emergency-toolkit' },
      { name: 'Multimeter', price: '£20-40', essential: true, cyberstoreSlug: 'digital-multimeter' },
      { name: 'Cable tester', price: '£20-40', essential: true, cyberstoreSlug: 'cable-tester' },
      { name: 'Head torch', price: '£10-25', essential: true, cyberstoreSlug: 'head-torch' },
      { name: 'Gaffer tape (quality)', price: '£10-15', essential: true, cyberstoreSlug: 'gaffer-tape' },
      { name: 'Spare cables assortment', price: '£50-100', essential: true, cyberstoreSlug: 'cable-kit' }
    ],
    commonMistakes: ['Panicking visibly', 'Random troubleshooting (not systematic)', 'Inadequate spares kit', 'Poor communication', 'Not learning from problems', 'Ego in crisis situations'],
    freeAccess: true,
    kit: { name: 'Stagehand Emergency Kit', slug: 'stagehand-kit', price: '£89.99', contents: ['Tool roll', 'Cable tester', 'Multimeter', 'Head torch', 'Gaffer tape', 'Spare cables', 'Spare batteries', 'First aid basics', 'Troubleshooting cards'] },
    workshop: { title: 'Production Problem Solving', duration: '4 hours', price: '£55', format: 'in-person', bookingSlug: 'problem-solving-workshop' },
    nextTutorials: ['advanced-troubleshooting', 'production-management'],
    relatedTutorials: ['live-sound-reinforcement', 'dmx-programming-control'],
    badgeAwarded: 'master-troubleshooter',
    lastUpdated: '2024-12-27',
    version: '1.0'
  }
];

export default STEMGENEERS_TUTORIALS;