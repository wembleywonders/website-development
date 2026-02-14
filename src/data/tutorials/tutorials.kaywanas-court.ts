/**
 * KAYWANA'S COURT TUTORIALS
 * =========================
 * 
 * 3 free tutorials per pathway = 9 free total
 * ROV-P (Performance) guide throughout
 */

import { Tutorial } from './index';

export const KAYWANAS_COURT_TUTORIALS: Tutorial[] = [
  // ========================================
  // PERFORMANCE PATHWAY
  // ========================================
  {
    id: 'stage-presence-basics',
    slug: 'stage-presence-basics',
    title: 'Stage Presence Fundamentals',
    description: 'Own the space before you speak a word. Body language, energy, and connection that commands attention.',
    icon: '🎭',
    programmes: ['kaywanas-court', 'trubble-n-bass'],
    primaryProgramme: 'kaywanas-court',
    pathway: 'Performance',
    tags: ['stage', 'presence', 'performance', 'confidence'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    steps: [
      { step: 1, title: 'The Power of Stillness', description: 'Before you move, be still. Rushed entrances show nerves. Walk on, plant your feet, breathe, then begin.', tip: 'Count to 3 in your head before starting. It feels long. It looks confident.' },
      { step: 2, title: 'Grounding Your Body', description: 'Feet hip-width apart. Weight even. Knees soft, not locked. Shoulders back but relaxed. This is your home base.', rovPrompt: 'Show me grounding exercises for before going on stage.' },
      { step: 3, title: 'Eye Contact Strategy', description: 'Don\'t scan constantly. Pick 3-5 spots around the room. Hold each for a phrase or thought. Include all areas.', checkpoint: true },
      { step: 4, title: 'Using Your Hands', description: 'Hands show emotion. Open palms = trust. Clenched = tension. Varied gestures = engaged. Dead hands = boring.', tip: 'Film yourself. See what your hands actually do.' },
      { step: 5, title: 'Moving With Purpose', description: 'Every move means something. Walk to a new position = new idea. Stand still = important point. Never pace aimlessly.' },
      { step: 6, title: 'Vocal Energy', description: 'Match energy to space. Living room vs hall vs outdoor. Bigger space = bigger voice AND bigger gestures.' },
      { step: 7, title: 'Handling Nerves', description: 'Nerves are energy. Redirect into performance. Breathe deep before entrance. Shake out tension backstage.', tip: 'The audience wants you to succeed. They\'re on your side.' },
      { step: 8, title: 'The Exit', description: 'Don\'t rush off. Finish your last line. Hold for a beat. Then exit with the same intention you entered. Clean ending.' }
    ],
    tools: [
      { name: 'Mirror or camera', price: 'Free', essential: true },
      { name: 'Space to move', price: 'Free', essential: true },
      { name: 'Willing audience (even 1 person)', price: 'Free', essential: false }
    ],
    commonMistakes: ['Rushing the entrance', 'Constant pacing', 'Looking at floor', 'Monotone delivery', 'Trailing off at exit'],
    freeAccess: true,
    workshop: { title: 'Stage Presence Intensive', duration: '2 hours', price: '£35', format: 'zoom', bookingSlug: 'stage-presence' },
    nextTutorials: ['voice-projection', 'blocking-fundamentals'],
    badgeAwarded: 'stage-presence',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'voice-projection',
    slug: 'voice-projection',
    title: 'Voice Projection & Control',
    description: 'Be heard in the back row without shouting. Breath control, resonance, and clarity for performers.',
    icon: '🗣️',
    programmes: ['kaywanas-court', 'raydyo'],
    primaryProgramme: 'kaywanas-court',
    pathway: 'Performance',
    tags: ['voice', 'projection', 'breathing', 'diction'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    steps: [
      { step: 1, title: 'Breath Is Everything', description: 'Projection starts with breath. Shallow chest breathing = weak voice. Deep diaphragm breathing = power and control.', tip: 'Put hand on belly. It should move out on inhale.' },
      { step: 2, title: 'Diaphragm Exercise', description: 'Lie on back. Book on stomach. Breathe so book rises and falls. This is diaphragmatic breathing. Practice until natural.', checkpoint: true },
      { step: 3, title: 'Finding Your Resonance', description: 'Hum until you feel vibration in face/chest. This is resonance. Speak from this place, not just throat.', rovPrompt: 'Guide me through resonance exercises.' },
      { step: 4, title: 'Projection vs Shouting', description: 'Shouting: throat tightens, pitch rises, sounds strained. Projection: throat open, supported by breath, sounds effortless.' },
      { step: 5, title: 'Articulation Exercises', description: 'Tongue twisters build clarity. "Red lorry, yellow lorry." "Unique New York." Over-articulate in practice, natural in performance.', tip: 'Warm up mouth muscles before performing. Chew imaginary gum.' },
      { step: 6, title: 'Pace and Pause', description: 'Nervous = fast. Confident = varied pace. Pause before important words. Silence is powerful. Don\'t fill every moment.' },
      { step: 7, title: 'Caring for Your Voice', description: 'Water (room temperature). Rest before big performance. Avoid dairy (creates mucus). Warm up, don\'t cold start.', warning: 'If voice hurts, stop. Pain means damage.' },
      { step: 8, title: 'Projecting Emotion', description: 'Volume isn\'t just loud/quiet. Anger can be quiet. Joy can be controlled. Match vocal quality to emotional truth.' }
    ],
    tools: [
      { name: 'Space to practice (ideally large)', price: 'Free', essential: true },
      { name: 'Water bottle', price: '£1', essential: true },
      { name: 'Recording device', price: 'Phone works', essential: false }
    ],
    commonMistakes: ['Shouting instead of projecting', 'Shallow breathing', 'Speaking too fast', 'No warm-up', 'Ignoring vocal strain'],
    freeAccess: true,
    workshop: { title: 'Voice for Performance', duration: '1.5 hours', price: '£30', format: 'zoom', bookingSlug: 'voice-performance' },
    nextTutorials: ['blocking-fundamentals', 'accent-and-dialect'],
    badgeAwarded: 'voice-projection',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'blocking-fundamentals',
    slug: 'blocking-fundamentals',
    title: 'Blocking Fundamentals',
    description: 'Where to stand, when to move, why it matters. The geography of storytelling on stage.',
    icon: '📍',
    programmes: ['kaywanas-court'],
    primaryProgramme: 'kaywanas-court',
    pathway: 'Performance',
    tags: ['blocking', 'movement', 'staging', 'direction'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    steps: [
      { step: 1, title: 'Stage Geography', description: 'Upstage (back), downstage (front), stage left/right (actor\'s perspective). Centre is powerful. Know your landmarks.', tip: 'Left and right are from YOUR view facing audience, not theirs.' },
      { step: 2, title: 'Why Blocking Matters', description: 'Position tells story. Dominant character downstage centre. Vulnerable character upstage corner. Space has meaning.', rovPrompt: 'What does each area of the stage communicate?' },
      { step: 3, title: 'Sight Lines', description: 'Can everyone see you? Including sides? Don\'t hide behind furniture or other actors. Cheat toward audience.', checkpoint: true },
      { step: 4, title: 'Motivation for Movement', description: 'Never move without reason. Going to look out window. Angry so pacing. Moving closer for intimacy. Why are you moving?' },
      { step: 5, title: 'Counter-Movement', description: 'When one person moves, others may need to adjust. Keep stage picture balanced. Counter maintains sight lines.' },
      { step: 6, title: 'Levels and Planes', description: 'Standing vs sitting vs lying. Different heights create visual interest and power dynamics. Vary levels in scenes.' },
      { step: 7, title: 'Crossing Patterns', description: 'Cross downstage of furniture (between it and audience). Cross upstage of other actors unless blocking is the point.' },
      { step: 8, title: 'Recording Your Blocking', description: 'Write it down. "X DSL" = cross to downstage left. Draw diagrams. You WILL forget otherwise.', tip: 'Take photos of key positions at rehearsal.' }
    ],
    tools: [
      { name: 'Rehearsal space', price: 'Programme provides', essential: true },
      { name: 'Tape for marking positions', price: '£3', essential: false },
      { name: 'Notebook for blocking notes', price: '£2', essential: true }
    ],
    commonMistakes: ['Moving without motivation', 'Blocking sight lines', 'Standing in a line', 'Forgetting blocking between rehearsals', 'Not cheating to audience'],
    freeAccess: true,
    workshop: { title: 'Blocking Workshop', duration: '2 hours', price: '£30', format: 'in-person', bookingSlug: 'blocking-workshop' },
    nextTutorials: ['scene-work-basics', 'working-with-props'],
    badgeAwarded: 'blocking-basics',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // TECHNICAL THEATRE PATHWAY
  // ========================================
  {
    id: 'basic-lighting-setup',
    slug: 'basic-lighting-setup',
    title: 'Basic Stage Lighting Setup',
    description: 'Light the performer, set the mood, don\'t blind the audience. Fundamentals of theatrical lighting.',
    icon: '💡',
    programmes: ['kaywanas-court', 'stemgeneers'],
    primaryProgramme: 'kaywanas-court',
    pathway: 'Technical Theatre',
    tags: ['lighting', 'technical', 'stage', 'production'],
    difficulty: 'beginner',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    alternativeGuides: ['ROV-T'],
    steps: [
      { step: 1, title: 'Purpose of Stage Lighting', description: 'Visibility (see performers), mood (emotional atmosphere), focus (where to look), composition (visual picture).', tip: 'Lighting is invisible when done well. You notice the performers, not the lights.' },
      { step: 2, title: 'Basic Light Types', description: 'Fresnel: soft edges, good for wash. PAR: intense beam, good for specials. LED panel: versatile, colour mixing.', rovPrompt: 'What lights should we start with on a small budget?' },
      { step: 3, title: 'The Three-Point Setup', description: 'Key light (main, front 45°), fill light (softer, other side), back light (behind, creates depth). Start here.', checkpoint: true },
      { step: 4, title: 'Hanging and Angling', description: 'Lights typically 45° down. Too steep = harsh shadows. Too flat = no depth. Secure all lights properly.', warning: 'Unsecured lights can fall. Always use safety cables.' },
      { step: 5, title: 'Colour Basics', description: 'Gels (plastic sheets) add colour. Warm (orange/yellow) = day, comfort. Cool (blue) = night, tension. Less is more.' },
      { step: 6, title: 'Focus and Coverage', description: 'Focus = where light points. Coverage = how much area. Overlap slightly to avoid dark spots between areas.' },
      { step: 7, title: 'Avoiding Common Problems', description: 'Spill on audience (use barn doors). Hot spots (adjust angle). Performer shadows on back wall (add top light).' },
      { step: 8, title: 'Cue to Cue', description: 'Programming light changes. Label each look. Practice transitions. Smooth fades usually better than snaps.' }
    ],
    tools: [
      { name: 'Stage lights (LED pars work well)', price: '£50-150 each', essential: true, cyberstoreSlug: 'stage-lights' },
      { name: 'Light stands or rig', price: '£30-100', essential: true },
      { name: 'DMX controller (or app)', price: '£30-100', essential: false, cyberstoreSlug: 'dmx-controller' },
      { name: 'Colour gels', price: '£10-20', essential: false },
      { name: 'Safety cables', price: '£5-10', essential: true }
    ],
    commonMistakes: ['Lights in audience eyes', 'No back light (flat look)', 'Too many colours', 'Forgetting safety cables', 'Not labeling cues'],
    freeAccess: true,
    kit: { name: 'Basic Lighting Kit', slug: 'lighting-kit', price: '£149.99', contents: ['2x LED PAR lights', 'Stands', 'DMX cables', 'Basic controller', 'Gel pack', 'Safety cables'] },
    workshop: { title: 'Lighting for Theatre', duration: '3 hours', price: '£45', format: 'in-person', bookingSlug: 'lighting-theatre' },
    nextTutorials: ['sound-check-process', 'lighting-design-basics'],
    badgeAwarded: 'lighting-basics',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'sound-check-process',
    slug: 'sound-check-process',
    title: 'The Sound Check Process',
    description: 'Running a sound check efficiently. Microphones, monitors, levels, and keeping everyone happy.',
    icon: '🔊',
    programmes: ['kaywanas-court', 'trubble-n-bass', 'raydyo'],
    primaryProgramme: 'kaywanas-court',
    pathway: 'Technical Theatre',
    tags: ['sound', 'audio', 'technical', 'microphones'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    alternativeGuides: ['ROV-T', 'ROV-M'],
    steps: [
      { step: 1, title: 'Preparation Before Anyone Arrives', description: 'Check all equipment powers on. Test each mic and channel. Identify problems BEFORE performers arrive.', tip: 'Problems are easier to fix without an audience waiting.' },
      { step: 2, title: 'Line Check vs Sound Check', description: 'Line check: verify signal from each source (quick). Sound check: set levels and EQ (takes time). Do both.', checkpoint: true },
      { step: 3, title: 'Microphone Placement', description: 'Handheld: 2-3 inches from mouth. Lapel: on chest, away from fabric rustle. Headset: at cheek, toward mouth corner.', rovPrompt: 'What mic type works best for theatre?' },
      { step: 4, title: 'Setting Gain Structure', description: 'Input gain first (at preamp). Then channel fader. Don\'t max one and minimize other. Balanced levels throughout.' },
      { step: 5, title: 'Monitor Levels', description: 'What performers hear on stage. Start quiet, add as requested. Too loud causes feedback and vocal strain.', warning: 'Monitors pointing at mics cause feedback. Angle away.' },
      { step: 6, title: 'Front of House Levels', description: 'What audience hears. Check from different positions in room. Front row shouldn\'t be painful. Back row should hear.' },
      { step: 7, title: 'Dealing with Feedback', description: 'Reduce mic gain, reduce monitor level, or EQ the problem frequency. Don\'t just turn everything down.', tip: 'Feedback is usually one specific frequency. Find and cut it.' },
      { step: 8, title: 'Sound Check Etiquette', description: 'Be patient with performers. They\'re nervous. Be efficient—everyone\'s time matters. Stay calm—stress spreads.' }
    ],
    tools: [
      { name: 'Mixer/audio interface', price: '£100-500', essential: true, cyberstoreSlug: 'audio-mixers' },
      { name: 'Microphones', price: '£30-200 each', essential: true, cyberstoreSlug: 'microphones' },
      { name: 'Monitors/speakers', price: '£100-300', essential: true },
      { name: 'XLR cables', price: '£10-20 each', essential: true },
      { name: 'DI boxes', price: '£20-50', essential: false }
    ],
    commonMistakes: ['Not testing before performers arrive', 'Monitors too loud', 'Ignoring feedback until crisis', 'Rushing performers', 'Not checking from audience position'],
    freeAccess: true,
    kit: { name: 'Sound Check Kit', slug: 'sound-kit', price: '£79.99', contents: ['Spare XLR cables', 'Mic clips', 'Batteries', 'Gaffa tape', 'Cable ties', 'Sound check checklist'] },
    workshop: { title: 'Live Sound Basics', duration: '3 hours', price: '£45', format: 'in-person', bookingSlug: 'live-sound' },
    nextTutorials: ['mixing-for-theatre', 'wireless-mic-management'],
    badgeAwarded: 'sound-tech',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'stage-management-intro',
    slug: 'stage-management-intro',
    title: 'Introduction to Stage Management',
    description: 'The glue that holds production together. Communication, organization, and keeping everyone on track.',
    icon: '📋',
    programmes: ['kaywanas-court'],
    primaryProgramme: 'kaywanas-court',
    pathway: 'Technical Theatre',
    tags: ['stage management', 'organization', 'production', 'communication'],
    difficulty: 'beginner',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    steps: [
      { step: 1, title: 'What Stage Managers Do', description: 'Schedule, communicate, problem-solve, call cues, keep everyone informed. The hub of production information.', tip: 'SM is not director, not designer, not performer. SM is enabler.' },
      { step: 2, title: 'The Prompt Book', description: 'Master document. Script with all blocking, cues, notes. If SM is hit by bus, show continues from this book.', checkpoint: true },
      { step: 3, title: 'Scheduling Rehearsals', description: 'Who needs to be where, when. Respect people\'s time. Publish in advance. Confirm day before.', rovPrompt: 'Show me a rehearsal schedule template.' },
      { step: 4, title: 'Running Rehearsals', description: 'Start on time. Track what\'s covered. Note blocking changes. Collect props/costume notes. End on time.' },
      { step: 5, title: 'Communication Systems', description: 'Contact list for everyone. WhatsApp/email for updates. Clear, factual, timely. Over-communicate rather than under.' },
      { step: 6, title: 'Calling the Show', description: '"Stand by lights." "Lights go." Cues called in advance so operators are ready. Consistent language every time.', warning: 'Never say "go" in conversation. Operators will go.' },
      { step: 7, title: 'Problem-Solving Mindset', description: 'Things will go wrong. Stay calm. Find solutions. Actor ill? Understudy or cut scene. Prop missing? Improvise. Panic helps nobody.' },
      { step: 8, title: 'Show Reports', description: 'After each performance: timing, issues, notes for next show. Record keeps improving quality.' }
    ],
    tools: [
      { name: 'Prompt book/folder', price: '£10-20', essential: true },
      { name: 'Stopwatch', price: 'Phone works', essential: true },
      { name: 'Communication headset', price: '£30-100', essential: false },
      { name: 'First aid kit', price: '£15-30', essential: true },
      { name: 'Torch/flashlight', price: '£5-15', essential: true }
    ],
    commonMistakes: ['Not documenting changes', 'Inconsistent cue calling', 'Starting late habitually', 'Not distributing information', 'Trying to do everyone\'s job'],
    freeAccess: true,
    kit: { name: 'Stage Manager Kit', slug: 'sm-kit', price: '£34.99', contents: ['Prompt book', 'Stopwatch', 'Torch', 'Tape assortment', 'First aid basics', 'Stationery set'] },
    workshop: { title: 'Stage Management Basics', duration: '3 hours', price: '£40', format: 'in-person', bookingSlug: 'sm-basics' },
    nextTutorials: ['advanced-cue-calling', 'production-management'],
    badgeAwarded: 'stage-manager',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // HERITAGE STORYTELLING PATHWAY
  // ========================================
  {
    id: 'anansi-story-structure',
    slug: 'anansi-story-structure',
    title: 'Anansi Story Structure',
    description: 'The trickster spider\'s tales follow patterns. Learn the structure to adapt, create, and perform Anansi stories.',
    icon: '🕷️',
    programmes: ['kaywanas-court', 'aunties-kitchen', 'pageturners'],
    primaryProgramme: 'kaywanas-court',
    pathway: 'Heritage Storytelling',
    tags: ['anansi', 'folklore', 'caribbean', 'storytelling', 'heritage'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    alternativeGuides: ['ROV-H'],
    steps: [
      { step: 1, title: 'Who Is Anansi?', description: 'West African spider god, brought to Caribbean. Trickster who uses wit over strength. The underdog who wins.', rovPrompt: 'Tell me more about Anansi\'s journey from Africa to Caribbean.' },
      { step: 2, title: 'The Setup', description: 'Anansi wants something. Food, respect, the prize, to avoid work. His desire drives the story. Make it clear early.' },
      { step: 3, title: 'The Challenge', description: 'Something blocks Anansi. Stronger animal, impossible task, authority figure. The obstacle seems insurmountable.', checkpoint: true },
      { step: 4, title: 'The Trick', description: 'Anansi uses cleverness, not strength. Disguise, misdirection, reverse psychology, exploiting weakness. The brain beats brawn.' },
      { step: 5, title: 'The Complication', description: 'The trick works... but creates new problem. Or almost fails. Tension rises. Audience worries for Anansi.' },
      { step: 6, title: 'The Resolution', description: 'Anansi escapes, wins, or transforms situation. Sometimes he gets away with it. Sometimes he learns lesson.' },
      { step: 7, title: 'The Moral (Sometimes)', description: 'Many Anansi stories have lesson. But not always obvious. Sometimes the trickster just wins. That\'s also the point.', tip: 'Don\'t force a moral. Let story speak.' },
      { step: 8, title: 'The Storyteller\'s Signature', description: 'Traditional openings: "Crick!" (audience: "Crack!"). Closings: "Jack Mandora, me no choose none." Make it your own.' }
    ],
    tools: [
      { name: 'Traditional story collection', price: 'Library free', essential: true },
      { name: 'Recording device', price: 'Phone', essential: false },
      { name: 'Audience to practice with', price: 'Free', essential: true }
    ],
    commonMistakes: ['Making Anansi too heroic (he\'s flawed)', 'Forgetting the cleverness element', 'Over-explaining the moral', 'Losing Caribbean voice', 'Stories too long for performance'],
    freeAccess: true,
    kit: { name: 'Anansi Story Pack', slug: 'anansi-pack', price: '£12.99', contents: ['Story collection booklet', 'Structure templates', 'Performance notes', 'Audio examples'] },
    workshop: { title: 'Anansi Storytelling', duration: '2 hours', price: '£25', format: 'zoom', bookingSlug: 'anansi-storytelling' },
    nextTutorials: ['oral-storytelling-techniques', 'adapting-folktales'],
    badgeAwarded: 'anansi-storyteller',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'oral-storytelling-techniques',
    slug: 'oral-storytelling-techniques',
    title: 'Oral Storytelling Techniques',
    description: 'The ancient art of telling stories without a book. Voice, rhythm, audience engagement, and memory techniques.',
    icon: '🎤',
    programmes: ['kaywanas-court', 'aunties-kitchen', 'pageturners', 'raydyo'],
    primaryProgramme: 'kaywanas-court',
    pathway: 'Heritage Storytelling',
    tags: ['storytelling', 'oral', 'performance', 'heritage'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    alternativeGuides: ['ROV-H'],
    steps: [
      { step: 1, title: 'Story vs Script', description: 'Oral storytelling isn\'t reciting. You know the story, not exact words. Each telling is unique. That\'s the magic.', tip: 'Learn the skeleton (plot points), flesh it out fresh each time.' },
      { step: 2, title: 'Finding Your Voice', description: 'Not acting—storytelling. Your voice, your style. Authentic to you and to the story\'s tradition.', rovPrompt: 'How do I develop my storytelling voice?' },
      { step: 3, title: 'Rhythm and Pace', description: 'Stories have rhythm like music. Fast for excitement. Slow for tension. Pause for impact. Feel the pulse.' },
      { step: 4, title: 'Character Voices', description: 'Don\'t need to be voice actor. Small changes: pitch shift, pace change, posture shift. Enough to distinguish.', checkpoint: true },
      { step: 5, title: 'The "Crick-Crack" Call and Response', description: 'Audience participation is traditional. "Crick!" "Crack!" "Wire bend!" "Story end!" Keeps them engaged.', tip: 'Teach the responses before you begin.' },
      { step: 6, title: 'Sensory Details', description: 'Don\'t say "he was scared." Describe the sweat, the heartbeat, the shaking hands. Let audience feel it.' },
      { step: 7, title: 'Memory Techniques', description: 'Memory palace: visualize story as journey through space. Key images at each location. Walk through to remember.' },
      { step: 8, title: 'Handling Mistakes', description: 'You\'ll forget something. Keep going. Audience doesn\'t know the "right" version. Adapt, don\'t apologize.' }
    ],
    tools: [
      { name: 'Stories to tell', price: 'Free (research)', essential: true },
      { name: 'Practice audience', price: 'Free', essential: true },
      { name: 'Recording device', price: 'Phone', essential: false }
    ],
    commonMistakes: ['Memorizing exact words', 'Racing through', 'No audience interaction', 'Generic description', 'Apologizing for mistakes'],
    freeAccess: true,
    workshop: { title: 'Oral Storytelling Circle', duration: '2 hours', price: '£20', format: 'in-person', bookingSlug: 'storytelling-circle' },
    nextTutorials: ['audience-engagement', 'story-collection'],
    badgeAwarded: 'oral-storyteller',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'audience-engagement',
    slug: 'audience-engagement',
    title: 'Audience Engagement Techniques',
    description: 'Turn passive watchers into active participants. Call and response, questions, involvement that makes stories live.',
    icon: '👥',
    programmes: ['kaywanas-court', 'raydyo', 'gtech-casters'],
    primaryProgramme: 'kaywanas-court',
    pathway: 'Heritage Storytelling',
    tags: ['audience', 'engagement', 'participation', 'interaction'],
    difficulty: 'beginner',
    duration: '30 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-P',
    steps: [
      { step: 1, title: 'Why Engage?', description: 'Engaged audience remembers more, enjoys more, shares more. Passive watching is forgettable. Participation is memorable.' },
      { step: 2, title: 'Call and Response', description: 'You say something, they respond. "Crick!" "Crack!" Can be any phrase. Establish early, use throughout.', tip: 'Practice the response with them before starting properly.' },
      { step: 3, title: 'Rhetorical Questions', description: '"And what do you think Anansi did?" Pause. Let them wonder. Sometimes take answers, sometimes continue.', checkpoint: true },
      { step: 4, title: 'Physical Participation', description: 'Clap this rhythm. Stand up when you hear this word. Simple actions keep bodies engaged, which keeps minds engaged.', rovPrompt: 'What participation works for different age groups?' },
      { step: 5, title: 'Volunteer Involvement', description: 'Bring someone up to be a character. Give them simple line or action. Hero moment for them, engagement for all.' },
      { step: 6, title: 'Sound Effects Chorus', description: 'Audience makes the sounds. Wind, rain, animal noises, crowd murmur. Divide into sections for different effects.' },
      { step: 7, title: 'Reading the Room', description: 'Energy dropping? More engagement. Too chaotic? Pull back. Adjust in real-time. Watch and respond.' },
      { step: 8, title: 'Closing the Loop', description: 'Thank them for participation. Acknowledge their contribution. They helped tell the story. Shared ownership.' }
    ],
    tools: [
      { name: 'Story with engagement moments', price: 'Planned in advance', essential: true },
      { name: 'Confidence to invite participation', price: 'Practice builds this', essential: true }
    ],
    commonMistakes: ['Too much engagement (exhausting)', 'Too little (boring)', 'Not establishing responses', 'Ignoring audience energy', 'Forgetting to thank them'],
    freeAccess: true,
    workshop: { title: 'Interactive Storytelling', duration: '2 hours', price: '£25', format: 'in-person', bookingSlug: 'interactive-storytelling' },
    nextTutorials: ['stories-for-different-ages', 'workshop-facilitation'],
    badgeAwarded: 'audience-engager',
    lastUpdated: '2024-12-26',
    version: '1.0'
  }
];

export default KAYWANAS_COURT_TUTORIALS;