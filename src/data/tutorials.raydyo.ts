/**
 * RAYD-YO TUTORIALS
 * =================
 * 
 * 3 free tutorials per pathway = 9 free total
 * ROV-M (Media) guide throughout
 */

import { Tutorial } from '../types/tutorial';

export const RAYDYO_TUTORIALS: Tutorial[] = [
  // ========================================
  // PODCAST FOUNDATIONS PATHWAY
  // ========================================
  {
    id: 'podcast-concept-planning',
    slug: 'podcast-concept-planning',
    title: 'Podcast Concept & Planning',
    description: 'Before you hit record: define your show, find your niche, and plan for consistency.',
    icon: '📋',
    programmes: ['raydyo'],
    primaryProgramme: 'raydyo',
    pathway: 'Podcast Foundations',
    tags: ['planning', 'concept', 'niche', 'podcast'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    steps: [
      { step: 1, title: 'Why a Podcast?', description: 'What do you want to say? Who do you want to reach? What gap exists? If you can\'t answer these, you\'re not ready.', tip: 'Passion sustains you through the hard episodes. Choose something you care about.' },
      { step: 2, title: 'Finding Your Niche', description: 'Broad = competing with everyone. Specific = owning a space. "Caribbean tech entrepreneurs under 30" beats "business podcast."', rovPrompt: 'Help me narrow down my podcast niche.' },
      { step: 3, title: 'Format Options', description: 'Solo: easiest to schedule. Interview: requires guests. Co-hosted: needs chemistry. Panel: complex but dynamic. Start simple.', checkpoint: true },
      { step: 4, title: 'Episode Length', description: 'Match content to length. News update: 15 mins. Deep dive: 60 mins. Commute-friendly: 25-35 mins. Consistent length builds habits.' },
      { step: 5, title: 'Release Schedule', description: 'Weekly is standard. Bi-weekly is sustainable. Daily is brutal. Choose what you can maintain for a year. Consistency beats frequency.' },
      { step: 6, title: 'Name and Branding', description: 'Clear name > clever name. Searchable. Available as domain and social handles. Check before you commit.', tip: 'Say the name out loud. Does it work in conversation?' },
      { step: 7, title: 'Plan Your First 10 Episodes', description: 'If you can\'t plan 10, you don\'t have enough content. List episode ideas. Mix formats. Build momentum before launch.' },
      { step: 8, title: 'Success Metrics', description: 'What does success look like? Downloads? Community? Sponsors? Influence? Define it now. You\'ll need it when motivation dips.' }
    ],
    tools: [
      { name: 'Notebook/planning doc', price: 'Free', essential: true },
      { name: 'Competitor research', price: 'Free (listen to others)', essential: true },
      { name: 'Name availability checker', price: 'Free', essential: true }
    ],
    commonMistakes: ['Too broad a niche', 'Copying existing podcasts', 'No consistent schedule planned', 'Not enough episode ideas', 'Starting without clear purpose'],
    freeAccess: true,
    kit: { name: 'Podcast Planning Pack', slug: 'podcast-planning', price: '£14.99', contents: ['Planning templates', 'Episode tracker', 'Niche finder worksheet', 'Launch checklist'] },
    workshop: { title: 'Podcast Planning Session', duration: '1.5 hours', price: '£25', format: 'zoom', bookingSlug: 'podcast-planning' },
    nextTutorials: ['recording-remotely', 'podcast-equipment-basics'],
    badgeAwarded: 'podcast-planner',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'recording-remotely',
    slug: 'recording-remotely',
    title: 'Recording Guests Remotely',
    description: 'Professional remote interviews without expensive studios. Software, setup, and getting great audio from guests.',
    icon: '🌐',
    programmes: ['raydyo', 'gtech-casters'],
    primaryProgramme: 'raydyo',
    pathway: 'Podcast Foundations',
    tags: ['remote', 'recording', 'interview', 'guests'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    steps: [
      { step: 1, title: 'Platform Choice', description: 'Zoom (easy, compressed audio). Riverside.fm (local recording, better quality). Zencastr (free tier). SquadCast (reliable).', tip: 'Riverside records locally on each device—much better audio quality.' },
      { step: 2, title: 'Your Setup', description: 'Quiet room. Good mic. Headphones (prevents echo). Stable internet. Backup recording always.', checkpoint: true },
      { step: 3, title: 'Guest Preparation', description: 'Send instructions in advance: quiet room, headphones, stable internet, looking at camera. Make it easy for them.', rovPrompt: 'Give me a guest preparation email template.' },
      { step: 4, title: 'The Technical Check', description: 'Test call 10 mins early. Check levels, lighting, internet. Fix problems before official start. Saves embarrassment.' },
      { step: 5, title: 'Backup Recording', description: 'Always have backup. Local recording on your end. Ask guest to record on phone. Cloud fails. Prepare for disaster.', warning: 'I\'ve lost interviews to tech failures. Always have backup.' },
      { step: 6, title: 'Internet Issues', description: 'Wired connection > WiFi. Close other apps. If guest\'s connection is bad, switch to audio only or reschedule.' },
      { step: 7, title: 'Recording Separate Tracks', description: 'Most platforms can record each person separately. Essential for editing. Makes mixing much easier.' },
      { step: 8, title: 'After the Recording', description: 'Download all files immediately. Label clearly with date and guest. Backup to cloud. Don\'t lose your work.' }
    ],
    tools: [
      { name: 'Riverside.fm or similar', price: 'Free-£15/month', essential: true },
      { name: 'Good microphone', price: '£50-150', essential: true, cyberstoreSlug: 'usb-mics' },
      { name: 'Headphones', price: '£30-100', essential: true },
      { name: 'Stable internet', price: 'Already have', essential: true }
    ],
    commonMistakes: ['No backup recording', 'Guest without headphones (echo)', 'Not testing before starting', 'Poor internet', 'Not recording separate tracks'],
    freeAccess: true,
    kit: { name: 'Remote Recording Kit', slug: 'remote-kit', price: '£59.99', contents: ['USB microphone', 'Headphones', 'Pop filter', 'Guest instruction cards'] },
    workshop: { title: 'Remote Interview Masterclass', duration: '1.5 hours', price: '£30', format: 'zoom', bookingSlug: 'remote-interview' },
    nextTutorials: ['interview-techniques', 'audio-editing-basics'],
    badgeAwarded: 'remote-recorder',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'interview-techniques',
    slug: 'interview-techniques',
    title: 'Interview Techniques',
    description: 'Get great stories from guests. Preparation, questioning, and creating conversations people want to hear.',
    icon: '🎙️',
    programmes: ['raydyo', 'pageturners'],
    primaryProgramme: 'raydyo',
    pathway: 'Podcast Foundations',
    tags: ['interview', 'questions', 'conversation', 'guests'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    steps: [
      { step: 1, title: 'Research Your Guest', description: 'Read their book/work. Listen to other interviews. Find the angle others missed. Go beyond the bio.', tip: 'Guests appreciate when you\'ve done homework. It shows respect.' },
      { step: 2, title: 'Prepare Questions, Not Scripts', description: 'Have 8-10 prepared questions. But follow interesting threads. Best moments are often unplanned.', checkpoint: true },
      { step: 3, title: 'Open-Ended Questions', description: '"Tell me about..." "How did you..." "What was it like when..." These open conversation. Closed questions close it.', rovPrompt: 'Show me examples of great interview questions.' },
      { step: 4, title: 'The Power of Silence', description: 'Ask question. Wait. Don\'t fill silence. Guests will elaborate to fill the space. Magic happens in the pause.' },
      { step: 5, title: 'Active Listening', description: 'React genuinely. Follow up on what they actually said, not your next planned question. Be present.' },
      { step: 6, title: 'The Hard Questions', description: 'Build rapport first. Ask difficult questions later. Be direct but kind. "I have to ask..." gives them preparation.' },
      { step: 7, title: 'Story Questions', description: '"Take me back to..." "Walk me through..." "What were you thinking when..." Stories are more interesting than opinions.' },
      { step: 8, title: 'The Final Question', description: '"What did I not ask that you wish I had?" Often produces the best moment. Let them have the last word.' }
    ],
    tools: [
      { name: 'Question preparation document', price: 'Free', essential: true },
      { name: 'Guest research', price: 'Free (time)', essential: true },
      { name: 'Recording capability', price: 'From previous tutorial', essential: true }
    ],
    commonMistakes: ['No research', 'Reading questions robotically', 'Talking over the guest', 'Filling silences', 'Not following interesting threads'],
    freeAccess: true,
    workshop: { title: 'Interview Skills Workshop', duration: '2 hours', price: '£35', format: 'zoom', bookingSlug: 'interview-skills' },
    nextTutorials: ['audio-editing-basics', 'building-guest-list'],
    badgeAwarded: 'interviewer',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // AUDIO PRODUCTION PATHWAY
  // ========================================
  {
    id: 'podcast-equipment-basics',
    slug: 'podcast-equipment-basics',
    title: 'Podcast Equipment on a Budget',
    description: 'Start with what you can afford. The minimum viable setup that sounds professional.',
    icon: '🎧',
    programmes: ['raydyo', 'stemgeneers'],
    primaryProgramme: 'raydyo',
    pathway: 'Audio Production',
    tags: ['equipment', 'microphone', 'setup', 'budget'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    alternativeGuides: ['ROV-T'],
    steps: [
      { step: 1, title: 'The Minimum Setup', description: 'Decent USB mic + headphones + quiet room. That\'s it. Start here. Upgrade later when you know what you need.', tip: 'Many successful podcasts started on £50 mics.' },
      { step: 2, title: 'Microphone Options', description: 'USB: plug and play (Rode NT-USB Mini, Audio-Technica ATR2100x, Fifine K669). XLR: better quality, needs interface.', rovPrompt: 'What microphone should I buy for my budget?' },
      { step: 3, title: 'Headphones Are Essential', description: 'Monitor your audio. Hear problems before they\'re baked in. Any closed-back headphones work. £30-50 is fine.', checkpoint: true },
      { step: 4, title: 'Room Treatment', description: 'Soft furnishings absorb echo. Record in closet, bedroom with curtains, not empty room. Cheap treatment: blankets on stands.' },
      { step: 5, title: 'Mic Position', description: '6-8 inches from mouth. Slightly off-axis (not directly in front). Pop filter or windscreen for plosives (P, B sounds).' },
      { step: 6, title: 'Recording Software', description: 'Audacity (free). GarageBand (Mac, free). Adobe Audition (paid). OBS for video podcasts. Free is fine to start.' },
      { step: 7, title: 'Upgrade Path', description: 'USB mic → XLR mic + interface → multi-person setup → studio. Know where you\'re going but don\'t jump ahead.', tip: 'Don\'t buy more gear until your current setup limits you.' },
      { step: 8, title: 'What Actually Matters', description: 'Content > equipment. A great story on a mediocre mic beats boring content on expensive gear. Invest in yourself first.' }
    ],
    tools: [
      { name: 'USB microphone', price: '£50-100', essential: true, cyberstoreSlug: 'usb-mics' },
      { name: 'Headphones', price: '£30-60', essential: true },
      { name: 'Pop filter', price: '£10-20', essential: true, cyberstoreSlug: 'pop-filters' },
      { name: 'Mic arm (optional)', price: '£20-50', essential: false, cyberstoreSlug: 'mic-arms' }
    ],
    commonMistakes: ['Spending too much too early', 'No headphones', 'Ignoring room acoustics', 'Mic too far away', 'Obsessing over gear instead of content'],
    freeAccess: true,
    kit: { name: 'Podcast Starter Kit', slug: 'podcast-starter', price: '£89.99', contents: ['USB microphone', 'Pop filter', 'Headphones', 'Mic stand', 'Setup guide'] },
    workshop: { title: 'Podcast Setup Workshop', duration: '1.5 hours', price: '£25', format: 'zoom', bookingSlug: 'podcast-setup' },
    nextTutorials: ['audio-editing-basics', 'recording-remotely'],
    badgeAwarded: 'podcast-setup',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'audio-editing-basics',
    slug: 'audio-editing-basics',
    title: 'Audio Editing Basics',
    description: 'Clean up recordings, remove mistakes, add music. The post-production that makes podcasts professional.',
    icon: '✂️',
    programmes: ['raydyo', 'trubble-n-bass'],
    primaryProgramme: 'raydyo',
    pathway: 'Audio Production',
    tags: ['editing', 'post-production', 'audio', 'software'],
    difficulty: 'beginner',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    steps: [
      { step: 1, title: 'Choose Your Software', description: 'Audacity (free, powerful). GarageBand (Mac, free). Descript (edit audio like text). Hindenburg (made for podcasts).', tip: 'Audacity does everything you need. Start there.' },
      { step: 2, title: 'Import and Organize', description: 'Import all tracks. Label them clearly (Host, Guest, etc.). Save project before doing anything. Backup original files.' },
      { step: 3, title: 'The First Listen', description: 'Listen through with notepad. Mark timestamps of problems: ums, coughs, dead air, tangents. Plan your cuts.', checkpoint: true },
      { step: 4, title: 'Basic Cuts', description: 'Select bad section → delete. Leave tiny pauses (0.3-0.5 seconds) to sound natural. Don\'t cut too tight.', rovPrompt: 'How do I remove an "um" cleanly in Audacity?' },
      { step: 5, title: 'Volume Leveling', description: 'All voices should be similar volume. Use normalization or compression. Target -16 to -14 LUFS for podcasts.' },
      { step: 6, title: 'Noise Reduction', description: 'Find section of pure room noise. Use it to profile → apply noise reduction. Light touch—too much sounds robotic.' },
      { step: 7, title: 'Adding Music and Intros', description: 'Import intro/outro music. Fade in/out. Music under speech at -20dB or lower. Use royalty-free music.' },
      { step: 8, title: 'Export Settings', description: 'MP3, 128kbps for speech is fine. 192-320kbps if music heavy. Mono for solo podcasts, stereo for music/multiple speakers.' }
    ],
    tools: [
      { name: 'Audacity', price: 'Free', essential: true },
      { name: 'Royalty-free music', price: 'Free-£10/month', essential: false },
      { name: 'Time and patience', price: 'Priceless', essential: true }
    ],
    commonMistakes: ['Not saving project before editing', 'Cutting too tight', 'Over-processing noise reduction', 'Music too loud', 'Not listening back before publishing'],
    freeAccess: true,
    kit: { name: 'Audio Editing Pack', slug: 'audio-edit-pack', price: '£19.99', contents: ['Intro/outro music tracks', 'Sound effects', 'Audacity presets', 'Editing checklist'] },
    workshop: { title: 'Podcast Editing Workshop', duration: '2 hours', price: '£35', format: 'zoom', bookingSlug: 'podcast-editing' },
    nextTutorials: ['advanced-audio-processing', 'music-and-sound-design'],
    badgeAwarded: 'audio-editor',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'podcast-mixing',
    slug: 'podcast-mixing',
    title: 'Podcast Mixing & Mastering',
    description: 'Consistent sound across all episodes. EQ, compression, and the final polish.',
    icon: '🎚️',
    programmes: ['raydyo', 'trubble-n-bass'],
    primaryProgramme: 'raydyo',
    pathway: 'Audio Production',
    tags: ['mixing', 'mastering', 'eq', 'compression'],
    difficulty: 'intermediate',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    steps: [
      { step: 1, title: 'Why Mixing Matters', description: 'Inconsistent audio is amateur. Listeners adjust volume, then give up. Professional = consistent, pleasant listening.', tip: 'Listeners may not notice good mixing, but they notice bad mixing.' },
      { step: 2, title: 'EQ for Voice', description: 'High-pass filter at 80Hz (removes rumble). Cut mud around 200-300Hz. Boost presence at 3-5kHz. Subtle moves.', checkpoint: true },
      { step: 3, title: 'Compression Basics', description: 'Evens out loud and quiet parts. Ratio 3:1 to 4:1 for speech. Threshold so it catches peaks. Don\'t over-compress.', rovPrompt: 'Walk me through setting up voice compression.' },
      { step: 4, title: 'De-essing', description: 'Harsh "S" sounds can pierce. De-esser plugin tames them. Set frequency around 5-8kHz. Gentle reduction.' },
      { step: 5, title: 'Loudness Standards', description: 'Spotify/Apple Podcasts: -14 to -16 LUFS integrated loudness. Use loudness meter. Too loud = distortion. Too quiet = turning up reveals noise.' },
      { step: 6, title: 'Create a Template', description: 'Once you have settings that work, save as template. Same processing on every episode = consistent sound.' },
      { step: 7, title: 'Multi-Track Mixing', description: 'If separate tracks: mix each voice to same level. Pan slightly if multiple speakers. Leave music centered.' },
      { step: 8, title: 'The Final Check', description: 'Listen on multiple devices: phone speaker, headphones, car if possible. Problems reveal themselves differently.' }
    ],
    tools: [
      { name: 'DAW with plugins', price: 'Free (Audacity + free plugins)', essential: true },
      { name: 'Loudness meter plugin', price: 'Free (Youlean)', essential: true },
      { name: 'Reference headphones', price: '£50-100', essential: true }
    ],
    commonMistakes: ['Over-compression (pumping sound)', 'Too much EQ', 'Not checking loudness', 'Different processing per episode', 'Not listening on different devices'],
    freeAccess: true,
    kit: { name: 'Mixing Template Pack', slug: 'mixing-pack', price: '£24.99', contents: ['Audacity presets', 'Processing chain guide', 'Reference tracks', 'Loudness guide'] },
    workshop: { title: 'Podcast Mixing Masterclass', duration: '2.5 hours', price: '£40', format: 'zoom', bookingSlug: 'podcast-mixing' },
    nextTutorials: ['advanced-sound-design', 'audio-restoration'],
    badgeAwarded: 'mixer',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // GROWING YOUR SHOW PATHWAY
  // ========================================
  {
    id: 'podcast-launch-strategy',
    slug: 'podcast-launch-strategy',
    title: 'Podcast Launch Strategy',
    description: 'How to launch with momentum. Building anticipation, leveraging networks, and making your first episodes count.',
    icon: '🚀',
    programmes: ['raydyo', 'techreneurs'],
    primaryProgramme: 'raydyo',
    pathway: 'Growing Your Show',
    tags: ['launch', 'marketing', 'promotion', 'strategy'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    alternativeGuides: ['ROV-B'],
    steps: [
      { step: 1, title: 'Pre-Launch Preparation', description: 'Record 3-5 episodes before announcing. Gives buffer, ensures quality, allows adjustments. Don\'t launch with only one episode.', tip: 'Having episodes banked reduces panic and improves quality.' },
      { step: 2, title: 'Build Anticipation', description: '4-6 weeks before launch: announce coming soon. Tease content. Share behind-the-scenes. Build email list.', checkpoint: true },
      { step: 3, title: 'Your Network Is Your First Audience', description: 'Personal contacts first. Ask friends, family, colleagues to subscribe, review, share. These early numbers matter for algorithms.' },
      { step: 4, title: 'Launch Day Strategy', description: 'Release 3 episodes at once. Gives listeners options. More downloads = better chart position. More chances to hook them.', rovPrompt: 'Should I launch with multiple episodes?' },
      { step: 5, title: 'Platform Submission', description: 'Submit to Apple, Spotify, Google, Amazon, etc. Use aggregator like Anchor, Buzzsprout, Podbean. Takes 3-5 days to appear everywhere.' },
      { step: 6, title: 'Reviews Strategy', description: 'Ask listeners directly for reviews. First 10-20 reviews help visibility enormously. Make it easy—share direct link.' },
      { step: 7, title: 'Social Promotion', description: 'Audiograms (video with waveform), quote graphics, behind-the-scenes. Native content for each platform. Don\'t just post links.' },
      { step: 8, title: 'Post-Launch Momentum', description: 'Maintain consistent schedule. Respond to every comment/review. Keep promoting. The first months set the trajectory.' }
    ],
    tools: [
      { name: 'Podcast hosting platform', price: 'Free-£15/month', essential: true },
      { name: 'Social media accounts', price: 'Free', essential: true },
      { name: 'Audiogram maker (Headliner)', price: 'Free tier', essential: true },
      { name: 'Email list', price: 'Free (Mailchimp)', essential: false }
    ],
    commonMistakes: ['Launching with one episode', 'Not asking for reviews', 'Announcing too late', 'Not submitting to all platforms', 'Inconsistent posting after launch'],
    freeAccess: true,
    kit: { name: 'Launch Strategy Pack', slug: 'launch-pack', price: '£19.99', contents: ['Launch timeline template', 'Email templates', 'Social media templates', 'Platform submission guide'] },
    workshop: { title: 'Podcast Launch Bootcamp', duration: '2 hours', price: '£35', format: 'zoom', bookingSlug: 'launch-bootcamp' },
    nextTutorials: ['growing-your-audience', 'podcast-monetization'],
    badgeAwarded: 'launched',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'growing-your-audience',
    slug: 'growing-your-audience',
    title: 'Growing Your Podcast Audience',
    description: 'Beyond launch: sustainable growth strategies that don\'t require a marketing budget.',
    icon: '📈',
    programmes: ['raydyo', 'gtech-casters'],
    primaryProgramme: 'raydyo',
    pathway: 'Growing Your Show',
    tags: ['growth', 'audience', 'marketing', 'promotion'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    alternativeGuides: ['ROV-B'],
    steps: [
      { step: 1, title: 'Reality Check', description: 'Most podcasts grow slowly. Overnight success is rare. Patience + consistency + quality = growth. Expect months, not weeks.' },
      { step: 2, title: 'Be Discoverable', description: 'SEO for podcasts: clear titles with keywords, detailed descriptions, show notes with links. Help people find you.', checkpoint: true },
      { step: 3, title: 'Guest Cross-Promotion', description: 'Guests share episodes with their audience. Choose guests with audiences. Make it easy for them to share.', tip: 'Create shareable assets for guests: graphics, clips, quotes.' },
      { step: 4, title: 'Be a Guest Yourself', description: 'Appear on other podcasts in your niche. Reach their audience. Build relationships. Guest swaps work well.', rovPrompt: 'How do I pitch myself as a podcast guest?' },
      { step: 5, title: 'Community Building', description: 'Discord, Facebook Group, WhatsApp. Turn listeners into community. Engaged community promotes for you.' },
      { step: 6, title: 'Repurpose Content', description: 'One episode = blog post, Twitter thread, Instagram carousel, YouTube video, TikTok clips. Maximize every piece of content.' },
      { step: 7, title: 'Collaborations', description: 'Crossover episodes with similar podcasts. Shared audiences. Both shows benefit. Network, don\'t compete.' },
      { step: 8, title: 'Patience and Persistence', description: 'Episode 100 will have more listeners than episode 10. Keep publishing. Quality improves. Trust compounds.' }
    ],
    tools: [
      { name: 'Social media presence', price: 'Free', essential: true },
      { name: 'Podcast network/community', price: 'Free', essential: true },
      { name: 'Content repurposing tools', price: 'Free-£20/month', essential: false }
    ],
    commonMistakes: ['Expecting fast growth', 'Not engaging with listeners', 'Only promoting on launch', 'Not building community', 'Giving up too early'],
    freeAccess: true,
    workshop: { title: 'Podcast Growth Strategy', duration: '2 hours', price: '£35', format: 'zoom', bookingSlug: 'podcast-growth' },
    nextTutorials: ['podcast-monetization', 'advanced-promotion'],
    badgeAwarded: 'growth-mindset',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'podcast-monetization',
    slug: 'podcast-monetization',
    title: 'Podcast Monetization',
    description: 'Turning listeners into income. Sponsorships, memberships, products, and realistic expectations.',
    icon: '💷',
    programmes: ['raydyo', 'techreneurs'],
    primaryProgramme: 'raydyo',
    pathway: 'Growing Your Show',
    tags: ['monetization', 'sponsorship', 'income', 'business'],
    difficulty: 'intermediate',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    alternativeGuides: ['ROV-B'],
    steps: [
      { step: 1, title: 'When to Monetize', description: 'Not immediately. Build audience first. 1,000-5,000 downloads per episode is realistic starting point for sponsorship.', tip: 'Smaller, engaged audience is more valuable than large, passive one.' },
      { step: 2, title: 'Direct Support', description: 'Patreon, Buy Me a Coffee, Ko-fi. Fans pay directly. Works even with small audiences. Offer bonus content.', checkpoint: true },
      { step: 3, title: 'Sponsorships and Ads', description: 'Host-read ads pay best. CPM (cost per thousand) model: £15-50 per 1,000 downloads. Niche audiences command premium.', rovPrompt: 'How do I pitch sponsors for my podcast?' },
      { step: 4, title: 'Affiliate Marketing', description: 'Recommend products, earn commission. Amazon Associates, relevant niche products. Authentic recommendations only—trust is valuable.' },
      { step: 5, title: 'Your Own Products', description: 'Courses, merchandise, services. Podcast builds audience, products convert them. Direct relationship = more profit.' },
      { step: 6, title: 'Live Events', description: 'Ticket sales, merchandise, sponsorship. Requires audience size. Start small—live recordings, meetups.' },
      { step: 7, title: 'Premium Content', description: 'Ad-free episodes, early access, exclusive episodes. Platforms: Apple Subscriptions, Supercast, Patreon.' },
      { step: 8, title: 'Realistic Expectations', description: 'Most podcasters don\'t get rich. Some income is achievable. Podcast as business funnel often more valuable than direct podcast income.' }
    ],
    tools: [
      { name: 'Patreon or similar', price: 'Free (they take %)', essential: false },
      { name: 'Media kit', price: 'Free (create yourself)', essential: true },
      { name: 'Podcast statistics', price: 'From hosting platform', essential: true }
    ],
    commonMistakes: ['Monetizing too early', 'Only focusing on sponsorship', 'Undisclosed ads (illegal)', 'Over-promising to sponsors', 'Losing authenticity for money'],
    freeAccess: true,
    kit: { name: 'Monetization Toolkit', slug: 'monetization-kit', price: '£24.99', contents: ['Media kit template', 'Sponsor pitch templates', 'Rate card examples', 'Patreon guide'] },
    workshop: { title: 'Podcast Business Model', duration: '2 hours', price: '£40', format: 'zoom', bookingSlug: 'podcast-business' },
    nextTutorials: ['sponsorship-pitching', 'building-products'],
    badgeAwarded: 'monetized',
    lastUpdated: '2024-12-26',
    version: '1.0'
  }
];

export default RAYDYO_TUTORIALS;