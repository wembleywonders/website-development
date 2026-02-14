/**
 * G-TECH CASTERS TUTORIALS
 * ========================
 * 
 * 3 free tutorials per pathway = 9 free total
 * ROV-M (Media) guide throughout
 */

import { Tutorial } from './index';

export const GTECH_CASTERS_TUTORIALS: Tutorial[] = [
  // ========================================
  // STREAMING PATHWAY
  // ========================================
  {
    id: 'obs-setup-basics',
    slug: 'obs-setup-basics',
    title: 'OBS Setup Basics',
    description: 'The free software that powers most streams. Learn to install, configure, and create your first scene.',
    icon: '🎬',
    programmes: ['gtech-casters', 'raydyo'],
    primaryProgramme: 'gtech-casters',
    pathway: 'Streaming',
    tags: ['obs', 'streaming', 'setup', 'software'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    steps: [
      { step: 1, title: 'Download and Install', description: 'obsproject.com - free, open source. Windows, Mac, Linux. Run the auto-configuration wizard on first launch.', tip: 'Auto-config wizard tests your system and sets sensible defaults.' },
      { step: 2, title: 'Understanding Scenes and Sources', description: 'Scene = a layout (like "Gaming" or "Just Chatting"). Sources = elements in that scene (camera, game capture, images).', rovPrompt: 'Explain scenes and sources with examples.' },
      { step: 3, title: 'Add Your First Source', description: 'Click + in Sources. Start with Display Capture (shows your screen) or Video Capture Device (webcam).', checkpoint: true },
      { step: 4, title: 'Set Output Resolution', description: 'Settings → Video. Base = your monitor. Output = what you stream. 1080p ideal, 720p if internet slow. 30 or 60fps.' },
      { step: 5, title: 'Audio Setup', description: 'Settings → Audio. Select your mic as Mic/Auxiliary. Select desktop audio. Test levels in mixer—should hit yellow, not red.' },
      { step: 6, title: 'Connect to Twitch/YouTube', description: 'Settings → Stream. Select platform. Get stream key from platform (keep secret!). Paste into OBS.', warning: 'Never show your stream key on stream. People can hijack your channel.' },
      { step: 7, title: 'Create a Basic Scene', description: 'Add game/screen capture. Add webcam, resize to corner. Add text for your name. This is your basic layout.' },
      { step: 8, title: 'Test Before Going Live', description: 'Click "Start Recording" to test locally. Watch playback. Check audio levels, video quality, no lag. Then try "Start Streaming" for real.', tip: 'Do a test stream to an unlisted YouTube video first.' }
    ],
    tools: [
      { name: 'OBS Studio', price: 'Free', essential: true },
      { name: 'Computer (mid-range+)', price: 'Already have', essential: true },
      { name: 'Webcam', price: '£30-100', essential: false, cyberstoreSlug: 'webcams' },
      { name: 'Microphone', price: '£30-100', essential: true, cyberstoreSlug: 'usb-mics' },
      { name: 'Twitch/YouTube account', price: 'Free', essential: true }
    ],
    commonMistakes: ['Streaming at too high quality for internet', 'Audio too quiet or peaking', 'Forgetting to add audio sources', 'Showing stream key', 'Not testing first'],
    freeAccess: true,
    kit: { name: 'Streaming Starter Kit', slug: 'streaming-starter', price: '£89.99', contents: ['USB webcam', 'USB microphone', 'Ring light', 'Setup guide'] },
    workshop: { title: 'OBS Masterclass', duration: '2 hours', price: '£30', format: 'zoom', bookingSlug: 'obs-masterclass' },
    nextTutorials: ['stream-layout-design', 'chat-engagement'],
    badgeAwarded: 'obs-basics',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'stream-layout-design',
    slug: 'stream-layout-design',
    title: 'Stream Layout Design',
    description: 'Make your stream look professional with overlays, alerts, and consistent branding. No design skills needed.',
    icon: '🎨',
    programmes: ['gtech-casters'],
    primaryProgramme: 'gtech-casters',
    pathway: 'Streaming',
    tags: ['overlay', 'design', 'branding', 'layout'],
    difficulty: 'beginner',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    alternativeGuides: ['ROV-C'],
    steps: [
      { step: 1, title: 'Why Layout Matters', description: 'First impressions count. Professional layout = credibility. Consistent branding = memorable. Clean design = watchable.' },
      { step: 2, title: 'Choose Your Colours', description: 'Pick 2-3 colours that represent your brand. Use consistently across all elements. Canva color palette generator helps.', tip: 'Check colours on different monitors. Some look different on phones.' },
      { step: 3, title: 'Free Overlay Sources', description: 'StreamElements, Streamlabs, Canva, Kapwing. Free templates you can customize. Don\'t need to design from scratch.', rovPrompt: 'What are the best free overlay sources right now?' },
      { step: 4, title: 'Essential Layout Elements', description: 'Webcam frame, name/social handles, recent follower/sub, game info. Don\'t overcrowd—leave space for the content.', checkpoint: true },
      { step: 5, title: 'Webcam Positioning', description: 'Usually bottom left or right corner. Size: visible but not dominant. Your face adds personality but game is the main content.' },
      { step: 6, title: 'Adding Overlays in OBS', description: 'Image sources for static elements. Browser sources for animated overlays or StreamElements widgets. Layer order matters.' },
      { step: 7, title: 'Create Multiple Scenes', description: 'Starting Soon scene (before you appear). Gaming scene. Just Chatting scene (bigger webcam). BRB scene. Ending scene.' },
      { step: 8, title: 'Scene Transitions', description: 'Settings → Scene Transitions. Stinger transitions look professional. Or simple fade. Avoid cheesy effects.', tip: 'Subtle transitions look more professional than flashy ones.' }
    ],
    tools: [
      { name: 'OBS Studio', price: 'Free', essential: true },
      { name: 'Canva', price: 'Free', essential: true },
      { name: 'StreamElements/Streamlabs', price: 'Free', essential: true },
      { name: 'Image editor (Photopea free)', price: 'Free', essential: false }
    ],
    commonMistakes: ['Too cluttered (less is more)', 'Inconsistent colours', 'Webcam too large', 'No "Starting Soon" scene', 'Busy background distracts'],
    freeAccess: true,
    kit: { name: 'Stream Branding Pack', slug: 'branding-pack', price: '£24.99', contents: ['Custom overlay template', 'Scene package', 'Alert animations', 'Colour guide'] },
    workshop: { title: 'Stream Design Workshop', duration: '2 hours', price: '£35', format: 'zoom', bookingSlug: 'stream-design' },
    nextTutorials: ['chat-engagement', 'alerts-and-notifications'],
    badgeAwarded: 'layout-designer',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'chat-engagement',
    slug: 'chat-engagement',
    title: 'Chat Engagement Strategies',
    description: 'Turn viewers into community. How to read chat, respond naturally, and build connections while playing.',
    icon: '💬',
    programmes: ['gtech-casters', 'raydyo'],
    primaryProgramme: 'gtech-casters',
    pathway: 'Streaming',
    tags: ['chat', 'engagement', 'community', 'interaction'],
    difficulty: 'beginner',
    duration: '30 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    steps: [
      { step: 1, title: 'Chat Is Your Community', description: 'Not just comments—it\'s a room full of people. Treat them like friends in your room watching you play.', tip: 'Use viewers\' names. "Hey Sarah, good to see you!" makes people feel seen.' },
      { step: 2, title: 'Reading Chat While Gaming', description: 'Glance during loading screens, deaths, slow moments. Don\'t stare at chat while action happens. Balance attention.', rovPrompt: 'How do I balance gaming and chat attention?' },
      { step: 3, title: 'Second Monitor Setup', description: 'Chat on second monitor or phone. Much easier than tabbing out. If no second monitor, use phone on stand.', checkpoint: true },
      { step: 4, title: 'Welcome New Viewers', description: '"Hey [name], welcome in!" Acknowledge new arrivals. First interaction determines if they stay.' },
      { step: 5, title: 'Ask Questions', description: 'Don\'t just answer questions—ask them. "What should I do here?" "Anyone played this before?" Makes chat feel involved.' },
      { step: 6, title: 'Handle Silence', description: 'Small streams = quiet chat. Fill silence with commentary on what you\'re doing. Narrate your gameplay. Think out loud.' },
      { step: 7, title: 'Moderation Basics', description: 'Set clear rules. Appoint trusted mods. Don\'t engage trolls—delete, timeout, ban. Protect your community.', warning: 'Arguing with trolls gives them what they want.' },
      { step: 8, title: 'Call to Action', description: 'Remind viewers to follow (don\'t beg). "If you\'re enjoying the stream, follow button helps." Once per hour max.' }
    ],
    tools: [
      { name: 'Second monitor or phone', price: 'Phone works', essential: true },
      { name: 'Chat bot (Nightbot/StreamElements)', price: 'Free', essential: true },
      { name: 'Mod team (trusted friends)', price: 'Free', essential: false }
    ],
    commonMistakes: ['Ignoring chat completely', 'Staring at chat instead of playing', 'Not welcoming new people', 'Begging for follows', 'Engaging trolls'],
    freeAccess: true,
    workshop: { title: 'Community Building', duration: '1.5 hours', price: '£25', format: 'zoom', bookingSlug: 'community-building' },
    nextTutorials: ['building-community', 'mod-team-management'],
    badgeAwarded: 'chat-engager',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // VIDEO PRODUCTION PATHWAY
  // ========================================
  {
    id: 'phone-video-quality',
    slug: 'phone-video-quality',
    title: 'Getting Professional Video from Your Phone',
    description: 'Your phone can shoot great video. Learn settings, stabilization, and techniques that make the difference.',
    icon: '📱',
    programmes: ['gtech-casters', 'raydyo', 'joystick'],
    primaryProgramme: 'gtech-casters',
    pathway: 'Video Production',
    tags: ['phone', 'video', 'mobile', 'filming'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    steps: [
      { step: 1, title: 'Camera Settings', description: 'Use highest resolution available (4K or 1080p). 30fps for normal content, 60fps for action/gaming. Lock settings for consistency.', tip: 'Film in 4K, export in 1080p. Gives you room to crop/stabilize.' },
      { step: 2, title: 'Lock Your Exposure', description: 'Tap and hold on your face to lock focus and exposure. Prevents camera hunting and brightness changes mid-shot.', checkpoint: true },
      { step: 3, title: 'Stabilization', description: 'Use a tripod (£15-30). Or prop phone against stable objects. Handheld = shaky. Gimbal (£80-150) for smooth movement.', rovPrompt: 'What\'s the best budget tripod for phone video?' },
      { step: 4, title: 'Lighting Is Everything', description: 'Face a window for natural light. Or use ring light. Light in FRONT of you, not behind. Bad lighting = bad video regardless of phone.' },
      { step: 5, title: 'Audio Quality', description: 'Phone mic is okay for close-up. For better: lavalier mic (£20-50) or wireless mic. Audio matters more than video quality.', warning: 'Great video with bad audio is unwatchable. Prioritize audio.' },
      { step: 6, title: 'Framing and Composition', description: 'Rule of thirds. Eyes in upper third. Headroom appropriate. Check background—what\'s behind you matters.' },
      { step: 7, title: 'Airplane Mode', description: 'Turn on airplane mode while filming. No calls, no notifications, no interruptions. Nothing ruins a take like a phone call.', tip: 'Also frees up processing power for recording.' },
      { step: 8, title: 'Storage Management', description: '4K video fills storage fast. 1 minute ≈ 350MB at 4K. Transfer to computer regularly. Cloud backup important.' }
    ],
    tools: [
      { name: 'Modern smartphone', price: 'Already have', essential: true },
      { name: 'Phone tripod', price: '£15-30', essential: true, cyberstoreSlug: 'phone-tripods' },
      { name: 'Ring light', price: '£20-40', essential: true, cyberstoreSlug: 'ring-lights' },
      { name: 'Lavalier microphone', price: '£20-50', essential: false, cyberstoreSlug: 'lav-mics' }
    ],
    commonMistakes: ['Filming vertical for horizontal content', 'Not locking exposure', 'Backlit (window behind you)', 'Using phone mic in noisy room', 'Running out of storage mid-shoot'],
    freeAccess: true,
    kit: { name: 'Phone Video Kit', slug: 'phone-video-kit', price: '£59.99', contents: ['Phone tripod', 'Ring light', 'Lavalier mic', 'Phone mount', 'Carrying case'] },
    workshop: { title: 'Phone Filmmaking', duration: '2 hours', price: '£30', format: 'zoom', bookingSlug: 'phone-filmmaking' },
    nextTutorials: ['basic-editing-workflow', 'thumbnail-creation'],
    badgeAwarded: 'phone-filmmaker',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'basic-editing-workflow',
    slug: 'basic-editing-workflow',
    title: 'Basic Video Editing Workflow',
    description: 'From raw footage to finished video. A simple, repeatable process using free software.',
    icon: '✂️',
    programmes: ['gtech-casters', 'raydyo'],
    primaryProgramme: 'gtech-casters',
    pathway: 'Video Production',
    tags: ['editing', 'video', 'post-production', 'workflow'],
    difficulty: 'beginner',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    steps: [
      { step: 1, title: 'Choose Your Editor', description: 'DaVinci Resolve (free, powerful). CapCut (free, easy). iMovie (Mac, free). Don\'t pay until you outgrow free options.', tip: 'DaVinci Resolve is industry-standard and completely free.' },
      { step: 2, title: 'Organize Before Editing', description: 'Create folders: Raw Footage, Audio, Graphics, Project Files. Name files clearly. Organization saves hours later.' },
      { step: 3, title: 'Import and Create Project', description: 'Import all footage. Create project at correct resolution (1080p or 4K). Match frame rate to footage.', checkpoint: true },
      { step: 4, title: 'Rough Cut First', description: 'Place all clips on timeline in order. Remove obvious mistakes. Get the structure right. Don\'t perfect yet.' },
      { step: 5, title: 'Tighten the Edit', description: 'Remove ums, pauses, rambling. Cut to the point. Every second should earn its place. When in doubt, cut it out.', rovPrompt: 'How do I know what to cut?' },
      { step: 6, title: 'Add B-Roll', description: 'Cutaway footage hides jump cuts and adds visual interest. Gameplay footage, stock clips, screen recordings. Layer over voice.' },
      { step: 7, title: 'Audio Balancing', description: 'Voice should be -6 to -12 dB. Music -20 to -30 dB (under voice). Sound effects match scene. Consistent throughout.' },
      { step: 8, title: 'Export Settings', description: 'YouTube: MP4, H.264, 1080p 30fps, 8-12 Mbps. Larger file = better quality but longer upload. Match platform requirements.' }
    ],
    tools: [
      { name: 'DaVinci Resolve', price: 'Free', essential: true },
      { name: 'Computer (decent specs)', price: 'Already have', essential: true },
      { name: 'External hard drive', price: '£50-80', essential: false, cyberstoreSlug: 'storage' },
      { name: 'Headphones', price: '£20-50', essential: true }
    ],
    commonMistakes: ['Not organizing footage', 'Perfecting before rough cut done', 'Music too loud', 'Leaving in too much', 'Wrong export settings'],
    freeAccess: true,
    kit: { name: 'Editor Starter Pack', slug: 'editor-pack', price: '£34.99', contents: ['Sound effects library', 'Music pack (royalty-free)', 'Transition presets', 'Colour LUTs'] },
    workshop: { title: 'DaVinci Resolve Basics', duration: '3 hours', price: '£40', format: 'zoom', bookingSlug: 'davinci-basics' },
    nextTutorials: ['thumbnail-creation', 'colour-correction-basics'],
    badgeAwarded: 'video-editor',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'thumbnail-creation',
    slug: 'thumbnail-creation',
    title: 'Thumbnail Creation That Gets Clicks',
    description: 'Thumbnails decide if people watch. Learn what works, what doesn\'t, and how to create them quickly.',
    icon: '🖼️',
    programmes: ['gtech-casters', 'raydyo'],
    primaryProgramme: 'gtech-casters',
    pathway: 'Video Production',
    tags: ['thumbnail', 'youtube', 'design', 'ctr'],
    difficulty: 'beginner',
    duration: '30 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    alternativeGuides: ['ROV-C'],
    steps: [
      { step: 1, title: 'Why Thumbnails Matter', description: 'Thumbnail + title = 80% of click decision. Best video with bad thumbnail = no views. Worth the time investment.', tip: 'Spend as much time on thumbnail as editing.' },
      { step: 2, title: 'The Formula That Works', description: 'Face with emotion + bright colours + minimal text + clear subject. Study successful channels in your niche.', rovPrompt: 'Show me examples of good gaming thumbnails.' },
      { step: 3, title: 'Face = Engagement', description: 'Human faces draw attention. Expressive faces (shock, joy, curiosity) get clicks. Use your face if comfortable.', checkpoint: true },
      { step: 4, title: 'Text Rules', description: 'Maximum 3-4 words. HUGE font. Readable at mobile size. Don\'t repeat title exactly. Add intrigue.' },
      { step: 5, title: 'Colour Psychology', description: 'Yellow/red = attention. Blue = trust. Contrast with YouTube red. Bright, saturated. Don\'t blend into feed.' },
      { step: 6, title: 'Tools to Use', description: 'Canva (free, templates). Photopea (free Photoshop alternative). Thumbnail size: 1280x720 pixels.' },
      { step: 7, title: 'Remove Backgrounds', description: 'Remove.bg (free) removes background from photos. Layer yourself over game art or coloured background. Looks professional.' },
      { step: 8, title: 'Test and Iterate', description: 'Make 3 thumbnail versions. Use YouTube A/B testing (if available) or change if CTR low. Data beats opinion.' }
    ],
    tools: [
      { name: 'Canva', price: 'Free', essential: true },
      { name: 'Remove.bg', price: 'Free (limited)', essential: true },
      { name: 'Good photo of yourself', price: 'Take one!', essential: false }
    ],
    commonMistakes: ['Too much text', 'Unreadable on mobile', 'Dark/muddy colours', 'No face or emotion', 'Repeating title exactly'],
    freeAccess: true,
    kit: { name: 'Thumbnail Template Pack', slug: 'thumbnail-pack', price: '£14.99', contents: ['50 thumbnail templates', 'Font pack', 'Expression guide', 'Colour palettes'] },
    workshop: { title: 'Thumbnail Masterclass', duration: '1.5 hours', price: '£25', format: 'zoom', bookingSlug: 'thumbnail-masterclass' },
    nextTutorials: ['title-optimization', 'analytics-basics'],
    badgeAwarded: 'thumbnail-creator',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // GAMING CONTENT PATHWAY
  // ========================================
  {
    id: 'game-capture-setup',
    slug: 'game-capture-setup',
    title: 'Game Capture Setup',
    description: 'Capture PC and console games cleanly. Software capture, capture cards, and optimization for smooth recording.',
    icon: '🎮',
    programmes: ['gtech-casters'],
    primaryProgramme: 'gtech-casters',
    pathway: 'Gaming Content',
    tags: ['capture', 'gaming', 'recording', 'capture card'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    alternativeGuides: ['ROV-T'],
    steps: [
      { step: 1, title: 'PC Game Capture', description: 'OBS Game Capture source: right-click → Add → Game Capture. Select specific game. Better performance than Display Capture.', tip: 'Run game first, then add capture. OBS needs to see the game.' },
      { step: 2, title: 'Console Capture Options', description: 'Need capture card: Elgato HD60, AVerMedia, cheaper options exist. HDMI from console → capture card → PC → OBS.', rovPrompt: 'What capture card should I get for my budget?' },
      { step: 3, title: 'Capture Card Setup', description: 'Install drivers. In OBS: Add Video Capture Device. Select capture card. May need to set resolution/fps manually.', checkpoint: true },
      { step: 4, title: 'PS5/Xbox Audio', description: 'Console audio through capture card. Or use optical/HDMI audio extractor. Test that game audio appears in OBS.' },
      { step: 5, title: 'Recording vs Streaming', description: 'Recording: higher bitrate possible, larger files. Streaming: limited by upload speed. Can do both simultaneously in OBS.' },
      { step: 6, title: 'Output Settings (Recording)', description: 'Settings → Output → Recording. MKV format (recoverable if crash). CQP quality 18-20. NVENC if Nvidia GPU.', tip: 'MKV can be remuxed to MP4 after recording. Safer format.' },
      { step: 7, title: 'Performance Optimization', description: 'Close unnecessary programs. Game mode in Windows. Lower game graphics if needed. Smooth 30fps > stuttery 60fps.' },
      { step: 8, title: 'Test Recording', description: 'Record 5 minutes. Check: no stuttering, audio synced, quality acceptable. Fix issues before real content.' }
    ],
    tools: [
      { name: 'OBS Studio', price: 'Free', essential: true },
      { name: 'Capture card (for console)', price: '£100-200', essential: false, cyberstoreSlug: 'capture-cards' },
      { name: 'HDMI cables', price: '£10-20', essential: true },
      { name: 'Gaming PC or console', price: 'Already have', essential: true }
    ],
    commonMistakes: ['Display Capture instead of Game Capture', 'No audio from console', 'Recording while game stutters', 'Wrong output format', 'Not testing before recording session'],
    freeAccess: true,
    kit: { name: 'Capture Setup Kit', slug: 'capture-kit', price: '£129.99', contents: ['Budget capture card', 'HDMI cables', 'USB hub', 'Setup guide'] },
    workshop: { title: 'Game Capture Workshop', duration: '2 hours', price: '£35', format: 'zoom', bookingSlug: 'game-capture' },
    nextTutorials: ['commentary-techniques', 'gaming-highlights'],
    badgeAwarded: 'game-capture',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'commentary-techniques',
    slug: 'commentary-techniques',
    title: 'Gaming Commentary Techniques',
    description: 'Turn silent gameplay into engaging content. What to say, how to say it, and filling dead air naturally.',
    icon: '🎙️',
    programmes: ['gtech-casters'],
    primaryProgramme: 'gtech-casters',
    pathway: 'Gaming Content',
    tags: ['commentary', 'voiceover', 'personality', 'content'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    steps: [
      { step: 1, title: 'Live vs Post Commentary', description: 'Live: talk while playing (harder, more authentic). Post: record voice after (easier, more polished). Most do live.', tip: 'Start with games you know well—less mental load.' },
      { step: 2, title: 'The Three Types of Talk', description: 'Narration (what\'s happening), reaction (how you feel), analysis (why it matters). Mix all three.', rovPrompt: 'Give me examples of each commentary type.' },
      { step: 3, title: 'Narrate Your Thought Process', description: '"I\'m going to try flanking here because..." "That didn\'t work, let\'s try..." Viewers want to understand WHY.', checkpoint: true },
      { step: 4, title: 'Genuine Reactions', description: 'Shock, frustration, joy—let it out. Authentic emotion is engaging. Over-the-top fake reactions are cringe.' },
      { step: 5, title: 'Filling Dead Air', description: 'Walking between objectives? Talk about the game, your strategy, ask chat questions, share relevant story. Never just silence.' },
      { step: 6, title: 'Energy Management', description: 'Start strong—hook them early. Maintain energy but vary it. Constant hype is exhausting. Peaks and valleys.' },
      { step: 7, title: 'Finding Your Voice', description: 'Don\'t imitate other creators. What makes YOU interesting? Your perspective, your humor, your knowledge. Be authentically you.' },
      { step: 8, title: 'Practice by Recording', description: 'Record gameplay with commentary. Watch back. Cringe. Improve. Repeat. Everyone\'s first recordings are rough.', tip: 'You\'ll hate your voice at first. Everyone does. Push through.' }
    ],
    tools: [
      { name: 'Good microphone', price: '£50-100', essential: true, cyberstoreSlug: 'usb-mics' },
      { name: 'Recording software', price: 'Free (OBS)', essential: true },
      { name: 'Willingness to practice', price: 'Priceless', essential: true }
    ],
    commonMistakes: ['Long silences', 'Constant screaming', 'Copying other creators', 'Not explaining decisions', 'Monotone delivery'],
    freeAccess: true,
    workshop: { title: 'Commentary Workshop', duration: '1.5 hours', price: '£25', format: 'zoom', bookingSlug: 'commentary-workshop' },
    nextTutorials: ['building-community', 'content-planning'],
    badgeAwarded: 'commentator',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'building-community',
    slug: 'building-community',
    title: 'Building a Gaming Community',
    description: 'Beyond views and follows: creating a community that supports each other and keeps coming back.',
    icon: '👥',
    programmes: ['gtech-casters'],
    primaryProgramme: 'gtech-casters',
    pathway: 'Gaming Content',
    tags: ['community', 'discord', 'engagement', 'growth'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    steps: [
      { step: 1, title: 'Community vs Audience', description: 'Audience watches. Community participates, returns, connects with each other. Community is sustainable. Audience is fragile.', tip: 'Small engaged community > large passive audience.' },
      { step: 2, title: 'Start a Discord', description: 'Free. Central hub for your community. Channels for different topics. Place for viewers to connect even when you\'re offline.', checkpoint: true },
      { step: 3, title: 'Set Clear Rules', description: 'What\'s acceptable, what\'s not. Enforce consistently. Create a safe, welcoming space. Toxic communities die.', rovPrompt: 'What rules should a gaming Discord have?' },
      { step: 4, title: 'Recognize Regulars', description: 'Learn names. Remember details they share. Shout out loyal viewers. Make people feel seen and valued.' },
      { step: 5, title: 'Community Events', description: 'Game nights with viewers. Tournaments. Watch parties. Events create memories and bonds.' },
      { step: 6, title: 'Empower Moderators', description: 'Trusted community members as mods. They help maintain culture. Recognize their contribution. Build leadership.' },
      { step: 7, title: 'Consistency Matters', description: 'Stream on schedule. People build habits around you. Disappearing kills communities. Communicate if you need breaks.' },
      { step: 8, title: 'Give More Than You Take', description: 'Provide value beyond content. Help, encourage, celebrate others. Community is about what you give, not what you get.' }
    ],
    tools: [
      { name: 'Discord', price: 'Free', essential: true },
      { name: 'Consistent schedule', price: 'Discipline', essential: true },
      { name: 'Genuine care for viewers', price: 'Mindset', essential: true }
    ],
    commonMistakes: ['Focusing only on growth numbers', 'Inconsistent schedule', 'Not moderating toxicity', 'Ignoring regulars for new viewers', 'All take, no give'],
    freeAccess: true,
    workshop: { title: 'Community Building Intensive', duration: '2 hours', price: '£35', format: 'zoom', bookingSlug: 'community-intensive' },
    nextTutorials: ['monetization-basics', 'collaboration-strategies'],
    badgeAwarded: 'community-builder',
    lastUpdated: '2024-12-26',
    version: '1.0'
  }
];

export default GTECH_CASTERS_TUTORIALS;