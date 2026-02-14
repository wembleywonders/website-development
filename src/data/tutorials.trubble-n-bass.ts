/**
 * TRUBBLE N BASS TUTORIALS
 * ========================
 * 
 * 3 free tutorials per pathway = 9 free total
 * ROV-P (Performance) guide throughout
 */

import { Tutorial } from '../types/tutorial';

export const TRUBBLE_N_BASS_TUTORIALS: Tutorial[] = [
  // ========================================
  // SOUND SYSTEM CULTURE PATHWAY
  // ========================================
  {
    id: 'sound-system-history',
    slug: 'sound-system-history',
    title: 'Sound System History & Culture',
    description: 'From Kingston to London: understand the roots before you build. The culture that shaped UK bass music.',
    icon: '📻',
    programmes: ['trubble-n-bass'],
    primaryProgramme: 'trubble-n-bass',
    pathway: 'Sound System Culture',
    tags: ['history', 'culture', 'caribbean', 'heritage', 'sound system'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    alternativeGuides: ['ROV-H'],
    steps: [
      { step: 1, title: 'Jamaica: Where It Began', description: '1950s Kingston. No radio played local music. Sound systems filled the gap. Coxsone, Duke Reid, King Tubby—the originators.', rovPrompt: 'Tell me more about the original Jamaican sound systems.' },
      { step: 2, title: 'The Sound System Setup', description: 'Selector (plays records), MC/DJ (chats over tracks), operator (runs the sound). Each role essential. Teamwork creates magic.' },
      { step: 3, title: 'Dub Plates & Specials', description: 'Exclusive tracks cut just for your sound. Your secret weapon. Having dubplates nobody else has = reputation.', checkpoint: true },
      { step: 4, title: 'Sound Clash Culture', description: 'Two sounds battle. Crowd decides winner. Not just volume—selection, MCing, dubplates, crowd control. Musical warfare.' },
      { step: 5, title: 'Windrush & UK Sound Systems', description: '1948 onwards. Caribbean migrants brought sound system culture to UK. Notting Hill Carnival, blues parties, shebeens.' },
      { step: 6, title: 'UK Evolution', description: 'Reggae → Lovers Rock → Jungle → Drum & Bass → Grime → Dubstep. Sound system DNA runs through all UK bass music.', tip: 'Listen to early Jungle—you\'ll hear the reggae basslines.' },
      { step: 7, title: 'Modern Sound Systems', description: 'Channel One, Aba Shanti-I, Mungo\'s Hi Fi, Young Echo. Tradition continues. New technology, same principles.' },
      { step: 8, title: 'Your Place in the Lineage', description: 'You\'re not just playing music—you\'re carrying forward a tradition. Respect the roots. Add your voice. Pass it on.' }
    ],
    tools: [
      { name: 'Documentary: "Rewind & Come Again"', price: 'Free (YouTube)', essential: true },
      { name: 'Book: "Bass Culture" by Lloyd Bradley', price: '£12-15', essential: false },
      { name: 'Curiosity and respect', price: 'Free', essential: true }
    ],
    commonMistakes: ['Ignoring the history', 'Thinking it\'s just about loud speakers', 'Cultural appropriation without understanding', 'Disrespecting the lineage', 'All technology, no soul'],
    freeAccess: true,
    workshop: { title: 'Sound System Heritage Session', duration: '2 hours', price: '£20', format: 'in-person', bookingSlug: 'sound-heritage' },
    nextTutorials: ['speaker-basics', 'selector-fundamentals'],
    badgeAwarded: 'culture-keeper',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'speaker-basics',
    slug: 'speaker-basics',
    title: 'Speaker & Amplifier Basics',
    description: 'Understanding watts, ohms, and why your neighbours hate you. The science behind the bass.',
    icon: '🔊',
    programmes: ['trubble-n-bass', 'stemgeneers'],
    primaryProgramme: 'trubble-n-bass',
    pathway: 'Sound System Culture',
    tags: ['speakers', 'amplifiers', 'audio', 'technical'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    alternativeGuides: ['ROV-T'],
    steps: [
      { step: 1, title: 'How Speakers Work', description: 'Electrical signal → magnet moves cone → cone moves air → sound. Bigger cone = more air moved = more bass.' },
      { step: 2, title: 'Understanding Watts', description: 'Watts = power. More watts = louder potential. But watts aren\'t everything. Efficiency matters more.', tip: 'A 100W speaker at 98dB sensitivity is louder than 200W at 88dB.' },
      { step: 3, title: 'Understanding Ohms', description: 'Impedance (resistance). Common: 4Ω, 8Ω, 16Ω. Match your amp to your speakers. Mismatch = damage.', warning: 'Running 4Ω speakers on an 8Ω amp can blow your amp.' },
      { step: 4, title: 'Frequency Response', description: 'Measured in Hz. Subwoofers: 20-200Hz. Mids: 200-2000Hz. Highs: 2000-20000Hz. Sound systems split frequencies.', checkpoint: true },
      { step: 5, title: 'Active vs Passive', description: 'Active: amp built in, plug and play. Passive: separate amp needed, more flexibility, traditional sound system style.' },
      { step: 6, title: 'Amplifier Classes', description: 'Class A/B: warm, heavy, power-hungry. Class D: efficient, light, modern. Both work. Different character.' },
      { step: 7, title: 'Crossovers', description: 'Split signal by frequency. Send bass to subs, mids to mids, highs to tweeters. Each speaker does its job.', rovPrompt: 'How do I set up a crossover for my system?' },
      { step: 8, title: 'Start Small, Learn Big', description: 'Begin with powered speakers. Learn the principles. Scale up as you understand. Expensive mistakes hurt.' }
    ],
    tools: [
      { name: 'Powered speakers (pair)', price: '£200-500', essential: true, cyberstoreSlug: 'powered-speakers' },
      { name: 'Subwoofer', price: '£300-600', essential: false, cyberstoreSlug: 'subwoofers' },
      { name: 'Speaker cables', price: '£20-40', essential: true },
      { name: 'Multimeter', price: '£15-30', essential: false }
    ],
    commonMistakes: ['Mismatching impedance', 'Underpowering speakers (causes damage)', 'Ignoring room acoustics', 'All bass no clarity', 'Cheap cables on expensive gear'],
    freeAccess: true,
    kit: { name: 'Sound System Starter Kit', slug: 'sound-starter', price: '£89.99', contents: ['Speaker cables', 'XLR cables', 'Cable tester', 'Reference guide'] },
    workshop: { title: 'Sound System Building', duration: '3 hours', price: '£45', format: 'in-person', bookingSlug: 'sound-building' },
    nextTutorials: ['building-first-stack', 'amp-matching'],
    badgeAwarded: 'speaker-tech',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'selector-fundamentals',
    slug: 'selector-fundamentals',
    title: 'Selector Fundamentals',
    description: 'Reading the crowd, building a set, knowing when to drop the dubplate. The art of selection.',
    icon: '🎧',
    programmes: ['trubble-n-bass'],
    primaryProgramme: 'trubble-n-bass',
    pathway: 'Sound System Culture',
    tags: ['djing', 'selection', 'crowd', 'performance'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    steps: [
      { step: 1, title: 'Selector vs DJ', description: 'DJ focuses on mixing. Selector focuses on song choice and journey. Both skills matter, but selection is the foundation.' },
      { step: 2, title: 'Know Your Music', description: 'Deep knowledge of your collection. Know the energy, the key, the breakdown, the drop. Music is your vocabulary.', tip: 'Tag your tracks: energy level, when to play, key moments.' },
      { step: 3, title: 'Reading the Room', description: 'Watch the crowd. Dancing? Talking? Drinking? Phone out? Adjust accordingly. The crowd tells you what they need.', checkpoint: true },
      { step: 4, title: 'Building Energy', description: 'Don\'t peak too early. Build tension. Rise and fall. Save your biggest tunes for the right moment.', rovPrompt: 'How do I structure a 2-hour set?' },
      { step: 5, title: 'The Pull-Up', description: 'Rewind and play again. Use sparingly. Only for massive tunes that the crowd demands. Overuse kills impact.' },
      { step: 6, title: 'Working with the MC', description: 'Selector and MC are partners. Communicate. Create space for chat. Don\'t clash. Elevate each other.' },
      { step: 7, title: 'When Things Go Wrong', description: 'Track skips, wrong tune, dead crowd. Stay calm. Recover gracefully. Every selector has bad nights. Learn and move on.' },
      { step: 8, title: 'Developing Your Style', description: 'What makes your selection unique? Your taste, your journey, your connections. Authenticity beats imitation.' }
    ],
    tools: [
      { name: 'DJ controller or decks', price: '£150-500', essential: true, cyberstoreSlug: 'dj-controllers' },
      { name: 'Headphones', price: '£50-150', essential: true, cyberstoreSlug: 'dj-headphones' },
      { name: 'Music collection', price: 'Ongoing', essential: true },
      { name: 'Practice space', price: 'Free (home)', essential: true }
    ],
    commonMistakes: ['Playing for yourself not the crowd', 'Peaking too early', 'Too many pull-ups', 'Ignoring the MC', 'Not knowing your tunes'],
    freeAccess: true,
    workshop: { title: 'Selector Masterclass', duration: '2 hours', price: '£35', format: 'in-person', bookingSlug: 'selector-masterclass' },
    nextTutorials: ['mc-basics', 'clash-preparation'],
    badgeAwarded: 'selector',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // MUSIC PRODUCTION PATHWAY
  // ========================================
  {
    id: 'daw-basics',
    slug: 'daw-basics',
    title: 'DAW Basics: Your Digital Studio',
    description: 'Get set up with free software and make your first beat. No expensive equipment needed to start.',
    icon: '💻',
    programmes: ['trubble-n-bass', 'raydyo'],
    primaryProgramme: 'trubble-n-bass',
    pathway: 'Music Production',
    tags: ['daw', 'production', 'software', 'beginner'],
    difficulty: 'beginner',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    alternativeGuides: ['ROV-M'],
    steps: [
      { step: 1, title: 'What Is a DAW?', description: 'Digital Audio Workstation. Software for making music. Records, edits, mixes, produces. Your virtual studio.' },
      { step: 2, title: 'Free DAW Options', description: 'LMMS (free, open source). GarageBand (Mac, free). Cakewalk (Windows, free). Start free, upgrade when you outgrow.', tip: 'Reaper has unlimited free trial and costs £48 for personal use.' },
      { step: 3, title: 'Interface Overview', description: 'Arrangement view (timeline). Mixer (volume/effects). Browser (sounds/samples). Piano roll (notes). Learn these four areas.', checkpoint: true },
      { step: 4, title: 'Your First Project', description: 'Create new project. Set tempo (140 BPM for jungle, 170 for DnB, 70 for half-time). Set key if you know it.' },
      { step: 5, title: 'Adding Drums', description: 'Find drum samples. Drag to timeline. Build a basic pattern: kick on 1, snare on 2 and 4, hi-hats for movement.', rovPrompt: 'Where can I find good free drum samples?' },
      { step: 6, title: 'Adding Bass', description: 'Use built-in synth or bass sample. Keep it simple. Follow the kick. Sub bass lives 30-80Hz.' },
      { step: 7, title: 'Arrangement', description: 'Intro → Build → Drop → Breakdown → Drop 2 → Outro. Copy, paste, vary. 3-5 minutes for a full track.' },
      { step: 8, title: 'Export Your Track', description: 'File → Export → WAV or MP3. 320kbps MP3 minimum for sharing. WAV for mastering or DJ use.' }
    ],
    tools: [
      { name: 'Computer', price: 'Already have', essential: true },
      { name: 'DAW software', price: 'Free', essential: true },
      { name: 'Headphones', price: '£30-100', essential: true },
      { name: 'MIDI keyboard', price: '£40-100', essential: false, cyberstoreSlug: 'midi-keyboards' }
    ],
    commonMistakes: ['Buying expensive DAW before learning basics', 'Too many plugins too soon', 'Ignoring arrangement', 'Overcomplicating first tracks', 'Not finishing tracks'],
    freeAccess: true,
    kit: { name: 'Producer Starter Pack', slug: 'producer-starter', price: '£29.99', contents: ['Sample pack', 'Preset pack', 'Tutorial videos', 'Project templates'] },
    workshop: { title: 'Beat Making Basics', duration: '2 hours', price: '£30', format: 'zoom', bookingSlug: 'beat-basics' },
    nextTutorials: ['sampling-basics', 'bass-sound-design'],
    badgeAwarded: 'producer-basics',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'sampling-basics',
    slug: 'sampling-basics',
    title: 'Sampling: The Art of Flipping',
    description: 'Take a piece of something old, make it something new. The foundation of hip-hop and jungle production.',
    icon: '📀',
    programmes: ['trubble-n-bass'],
    primaryProgramme: 'trubble-n-bass',
    pathway: 'Music Production',
    tags: ['sampling', 'production', 'creative', 'hip-hop'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    steps: [
      { step: 1, title: 'What Is Sampling?', description: 'Taking a piece of existing recording and using it in new music. Drums, vocals, melodies, textures. Hip-hop and jungle are built on this.' },
      { step: 2, title: 'Finding Samples', description: 'Vinyl digging, YouTube, sample packs, field recordings. Listen differently—hear the potential in everything.', tip: 'Old soul, funk, reggae records are goldmines. Library music too.' },
      { step: 3, title: 'Legal Considerations', description: 'Using uncleared samples in released music = risk. Sample packs are pre-cleared. Learn the rules before breaking them.', warning: 'Major releases need sample clearance. Can be expensive or impossible.' },
      { step: 4, title: 'Chopping', description: 'Cut the sample into pieces. Isolate the bit you want. Remove what you don\'t. The chop is where creativity begins.', checkpoint: true },
      { step: 5, title: 'Time-Stretching', description: 'Match sample tempo to your track. Stretching changes character. Extreme stretch creates new textures.', rovPrompt: 'How do I time-stretch without losing quality?' },
      { step: 6, title: 'Pitch-Shifting', description: 'Change the key. Transpose to fit your track. Pitching down = darker, heavier. Pitching up = brighter, faster.' },
      { step: 7, title: 'Processing', description: 'Filter, EQ, reverb, distortion. Make the sample yours. The more you transform, the more original it becomes.' },
      { step: 8, title: 'The Flip', description: 'Rearrange the chops. Create new melody from old. The sample is raw material—your arrangement is the art.' }
    ],
    tools: [
      { name: 'DAW with sampler', price: 'Free (LMMS)', essential: true },
      { name: 'Sample sources', price: 'Free-£30', essential: true },
      { name: 'Audio editor', price: 'Free (Audacity)', essential: true }
    ],
    commonMistakes: ['Using obvious samples without transformation', 'Ignoring copyright on releases', 'Not matching tempo/key', 'Over-processing until unrecognizable (sometimes)', 'Not crediting or clearing'],
    freeAccess: true,
    workshop: { title: 'Sample Flipping Workshop', duration: '2 hours', price: '£35', format: 'zoom', bookingSlug: 'sample-flipping' },
    nextTutorials: ['bass-sound-design', 'jungle-breaks'],
    badgeAwarded: 'sample-flipper',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'bass-sound-design',
    slug: 'bass-sound-design',
    title: 'Bass Sound Design',
    description: 'Create the bass sounds that shake the dance. Sub bass, reese bass, wobbles, and growls.',
    icon: '〰️',
    programmes: ['trubble-n-bass'],
    primaryProgramme: 'trubble-n-bass',
    pathway: 'Music Production',
    tags: ['bass', 'sound design', 'synthesis', 'production'],
    difficulty: 'intermediate',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    steps: [
      { step: 1, title: 'Why Bass Matters', description: 'In sound system music, bass is king. The sub frequencies you feel in your chest. This is what moves the crowd.' },
      { step: 2, title: 'Sub Bass Basics', description: 'Pure sine wave, 30-80Hz. Clean, powerful, felt more than heard. Foundation of every track.', tip: 'Mono your sub bass. Stereo sub = muddy.' },
      { step: 3, title: 'Synthesizer Basics', description: 'Oscillators (sound source), filters (shape tone), envelopes (control over time), LFOs (movement). These four = bass sound design.', checkpoint: true },
      { step: 4, title: 'The Reese Bass', description: 'Two detuned saw waves. Slight pitch difference creates movement. Named after Kevin Saunderson\'s "Just Want Another Chance."', rovPrompt: 'Walk me through creating a Reese bass.' },
      { step: 5, title: 'Adding Movement', description: 'LFO on filter cutoff = wobble. LFO on pitch = vibrato. Automate for builds and drops.' },
      { step: 6, title: 'Distortion & Saturation', description: 'Adds harmonics, makes bass audible on small speakers. Don\'t destroy the sub—process mids separately.' },
      { step: 7, title: 'Layering', description: 'Sub layer (clean sine) + mid layer (character) + top layer (presence). Each does its job. Don\'t overlap frequencies.' },
      { step: 8, title: 'Reference & Compare', description: 'Compare your bass to tracks you love. Match the weight, the presence, the movement. Reference is your teacher.' }
    ],
    tools: [
      { name: 'Software synthesizer', price: 'Free (Vital, Surge)', essential: true },
      { name: 'Subwoofer or good headphones', price: '£50-300', essential: true },
      { name: 'Spectrum analyzer', price: 'Free (plugin)', essential: true }
    ],
    commonMistakes: ['Sub bass too loud', 'Stereo sub bass', 'No high-frequency content (disappears on phones)', 'Fighting with kick drum', 'Over-processing'],
    freeAccess: true,
    kit: { name: 'Bass Design Pack', slug: 'bass-pack', price: '£24.99', contents: ['Bass presets', 'Processing chains', 'Reference tracks', 'Tutorial project files'] },
    workshop: { title: 'Bass Sound Design', duration: '2 hours', price: '£40', format: 'zoom', bookingSlug: 'bass-design' },
    nextTutorials: ['mixing-bass', 'advanced-synthesis'],
    badgeAwarded: 'bass-designer',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // LIVE PERFORMANCE PATHWAY
  // ========================================
  {
    id: 'mc-basics',
    slug: 'mc-basics',
    title: 'MC Basics: Chatting on the Mic',
    description: 'Lyrics, flow, crowd control. The voice of the sound system. From hype man to lyricist.',
    icon: '🎤',
    programmes: ['trubble-n-bass', 'kaywanas-court'],
    primaryProgramme: 'trubble-n-bass',
    pathway: 'Live Performance',
    tags: ['mc', 'vocals', 'performance', 'lyrics'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    steps: [
      { step: 1, title: 'MC Traditions', description: 'From Jamaican toasting to UK MC culture. U-Roy, Shabba, Tenor Fly, Skibadee, Stevie Hyper D. Know your lineage.', rovPrompt: 'Who are the most influential MCs in UK bass music?' },
      { step: 2, title: 'Finding Your Voice', description: 'Don\'t imitate. Find YOUR sound. Your accent, your rhythm, your energy. Authenticity connects.' },
      { step: 3, title: 'Basic Breath Control', description: 'Breathe from diaphragm. Know where to breathe in your bars. Running out of breath = amateur.', checkpoint: true },
      { step: 4, title: 'Writing Bars', description: 'Start simple. 4 bars, end rhyme. Build complexity. Write constantly. Fill notebooks. Quality comes from quantity.' },
      { step: 5, title: 'Flow and Rhythm', description: 'Ride the beat. Lock to the kick and snare. Push against the rhythm then snap back. Flow is musical.' },
      { step: 6, title: 'Crowd Interaction', description: '"When I say X, you say Y." Call and response. Make them move. Make them participate. Energy exchange.' },
      { step: 7, title: 'Working with the Selector', description: 'Know the music. Anticipate the drop. Create space for each other. Partnership not competition.' },
      { step: 8, title: 'Practice Routine', description: 'Record yourself. Listen back (painful but essential). Practice to instrumentals. Freestyle daily. Progress takes time.' }
    ],
    tools: [
      { name: 'Microphone', price: '£30-100', essential: true, cyberstoreSlug: 'dynamic-mics' },
      { name: 'Recording device', price: 'Phone works', essential: true },
      { name: 'Notebook', price: '£3', essential: true },
      { name: 'Instrumentals to practice over', price: 'Free (YouTube)', essential: true }
    ],
    commonMistakes: ['Copying other MCs exactly', 'Ignoring the beat', 'Running out of breath', 'Same flow every bar', 'Not practicing enough'],
    freeAccess: true,
    workshop: { title: 'MC Foundations', duration: '2 hours', price: '£30', format: 'in-person', bookingSlug: 'mc-foundations' },
    nextTutorials: ['advanced-lyricism', 'stage-presence-basics'],
    badgeAwarded: 'mc-basics',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'running-a-dance',
    slug: 'running-a-dance',
    title: 'Running a Dance: Event Basics',
    description: 'From bedroom to dance hall. Planning, promoting, and running your own events.',
    icon: '🎉',
    programmes: ['trubble-n-bass', 'techreneurs'],
    primaryProgramme: 'trubble-n-bass',
    pathway: 'Live Performance',
    tags: ['events', 'promotion', 'business', 'community'],
    difficulty: 'beginner',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    alternativeGuides: ['ROV-B'],
    steps: [
      { step: 1, title: 'Start Small', description: 'House party, community hall, small bar. Build reputation before scaling. Every big promoter started small.', tip: 'First events lose money. Budget for learning.' },
      { step: 2, title: 'Know Your Audience', description: 'Who are you throwing this for? What do they want? Where do they go? Build community first, events second.' },
      { step: 3, title: 'Venue Selection', description: 'Capacity, sound restrictions, licensing, location, cost. Visit in person. Ask about previous events. Check reviews.', checkpoint: true },
      { step: 4, title: 'Budgeting', description: 'Venue + sound + artists + promotion + door staff + contingency = costs. Ticket price × expected attendance = income. Be conservative.', rovPrompt: 'Help me create a budget for a 100-person event.' },
      { step: 5, title: 'Sound System', description: 'Hire vs own. Match system to venue. Always sound check. Have backup equipment. Sound quality = reputation.' },
      { step: 6, title: 'Promotion', description: 'Instagram, flyers, radio, word of mouth. Start 4-6 weeks out. Build anticipation. Personal invites matter most.' },
      { step: 7, title: 'On the Night', description: 'Arrive early. Check everything. Brief your team. Stay sober. Handle problems calmly. Be everywhere.', warning: 'Don\'t get drunk at your own event. You\'re working.' },
      { step: 8, title: 'After the Event', description: 'Pay everyone promptly. Thank your team. Review what worked. Learn from mistakes. Plan the next one.' }
    ],
    tools: [
      { name: 'Venue', price: '£100-500+', essential: true },
      { name: 'Sound system (hire)', price: '£100-300', essential: true },
      { name: 'Promotion budget', price: '£50-200', essential: true },
      { name: 'Event insurance', price: '£50-100', essential: true }
    ],
    commonMistakes: ['Venue too big for crowd', 'Underestimating costs', 'Poor sound quality', 'Starting promotion too late', 'No contingency budget'],
    freeAccess: true,
    kit: { name: 'Event Planning Pack', slug: 'event-pack', price: '£19.99', contents: ['Budget template', 'Timeline template', 'Venue checklist', 'Promotion guide', 'Contract templates'] },
    workshop: { title: 'Event Promotion 101', duration: '2 hours', price: '£35', format: 'zoom', bookingSlug: 'event-promotion' },
    nextTutorials: ['building-brand', 'scaling-events'],
    badgeAwarded: 'event-runner',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'live-pa-setup',
    slug: 'live-pa-setup',
    title: 'Live PA Setup',
    description: 'Performing your productions live. Controllers, synths, and making electronic music human.',
    icon: '🎹',
    programmes: ['trubble-n-bass'],
    primaryProgramme: 'trubble-n-bass',
    pathway: 'Live Performance',
    tags: ['live', 'performance', 'hardware', 'ableton'],
    difficulty: 'intermediate',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    alternativeGuides: ['ROV-T'],
    steps: [
      { step: 1, title: 'What Is a Live PA?', description: 'Not DJing—performing your music live. Triggering, manipulating, creating in real-time. Higher risk, higher reward.' },
      { step: 2, title: 'Software Approach', description: 'Ableton Live Session View designed for this. Launch clips, scenes, effects in real-time. Most accessible starting point.' },
      { step: 3, title: 'Hardware Controllers', description: 'Launchpad, Push, APC. Trigger clips without looking at screen. Makes performance visual and physical.', checkpoint: true },
      { step: 4, title: 'Structuring for Live', description: 'Break tracks into stems/sections. Each clip = element you can control. Verse, chorus, drop, breakdown as separate clips.', rovPrompt: 'How do I prepare my tracks for live performance?' },
      { step: 5, title: 'Effects for Performance', description: 'Map effects to knobs/faders. Filter sweeps, delays, reverb throws. Create moments that only happen live.' },
      { step: 6, title: 'Hardware Integration', description: 'External synths, drum machines, grooveboxes. MIDI sync keeps everything together. More gear = more complexity.' },
      { step: 7, title: 'Backup Plans', description: 'Computer crashes happen. Have backup laptop, USB stick with DJ set, knowledge to troubleshoot.', warning: 'Never perform without a backup plan.' },
      { step: 8, title: 'Practice Performing', description: 'Record practice sets. Watch back. What\'s engaging? What\'s boring? Performance is a skill separate from production.' }
    ],
    tools: [
      { name: 'Ableton Live', price: '£69-539', essential: true },
      { name: 'MIDI controller', price: '£80-500', essential: true, cyberstoreSlug: 'midi-controllers' },
      { name: 'Audio interface', price: '£80-300', essential: true, cyberstoreSlug: 'audio-interfaces' },
      { name: 'Laptop stand', price: '£20-50', essential: true }
    ],
    commonMistakes: ['No backup plan', 'Too complex setup', 'Not practicing enough', 'Just pressing play', 'Staring at laptop screen'],
    freeAccess: true,
    kit: { name: 'Live Performance Kit', slug: 'live-kit', price: '£49.99', contents: ['Ableton templates', 'Effect racks', 'MIDI mappings', 'Setup guide'] },
    workshop: { title: 'Live Electronic Performance', duration: '3 hours', price: '£50', format: 'in-person', bookingSlug: 'live-performance' },
    nextTutorials: ['advanced-live-setup', 'hybrid-dj-live'],
    badgeAwarded: 'live-performer',
    lastUpdated: '2024-12-26',
    version: '1.0'
  }
];

export default TRUBBLE_N_BASS_TUTORIALS;