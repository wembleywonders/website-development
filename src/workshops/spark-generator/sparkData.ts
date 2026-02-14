// ═══════════════════════════════════════════════════════════════
// SPARK GENERATOR — DATA LAYER (v2: Connected)
// ═══════════════════════════════════════════════════════════════

export interface Programme {
  id: string; name: string; icon: string; color: string; colorLight: string;
  tagline: string; sparkName: string; sparkIcon: string; skills: string[];
  routes: { programme: string; sandbox: string; facilitation?: string; sessions?: string; };
  sessionTemplate: { duration: number; structure: SessionSegment[]; zoomTips: string[]; };
  sandboxChallenges: SandboxChallenge[];
  guide?: { name: string; emoji: string };
}
export interface SessionSegment {
  phase: 'spark-opener'|'core-activity'|'break'|'applied-task'|'spark-closer'|'reflection';
  label: string; duration: number; description: string; sparkType?: 'opener'|'closer';
}
export interface SandboxChallenge { title: string; description: string; duration: string; component?: string; route?: string; }
export interface Spark { prompt: string; type: 'opener'|'closer'; energy: 'low'|'medium'|'high'; mode: 'chat-storm'|'breakout'|'volunteer'|'discuss'; }
export interface ModeNote { label: string; icon: string; description: string; facilitation: string; builds: string; }

const S45: SessionSegment[] = [
  { phase: 'spark-opener', label: 'Spark Opener', duration: 3, description: 'High-energy cognitive primer. Sets the tone.', sparkType: 'opener' },
  { phase: 'core-activity', label: 'Core Workshop', duration: 25, description: 'Main teaching/activity. Linked to sandbox or facilitation guide.' },
  { phase: 'break', label: 'Breather', duration: 2, description: 'Quick stretch, cameras off. Prevents Zoom fatigue.' },
  { phase: 'applied-task', label: 'Applied Task', duration: 8, description: 'Participants apply what they learned. Can use breakout rooms.' },
  { phase: 'spark-closer', label: 'Spark Closer', duration: 5, description: 'Skill-linked challenge reinforcing the session topic.', sparkType: 'closer' },
  { phase: 'reflection', label: 'Reflection', duration: 2, description: '"What worked? What surprised you?"' },
];
const ZT = [
  'Start the Spark within 60 seconds of session start — no long intros',
  'Use Gallery View so everyone sees each other during Chat Storms',
  'For Breakout Rooms: 3-4 people max, 2 minutes max, one person reports back',
  'Never cold-call — always ask for volunteers',
  'Read out 3-4 chat answers, never rank them',
  'End the Spark while energy is still high — leave them wanting more',
  'Name specific people when celebrating contributions',
];

export const PROGRAMMES: Record<string, Programme> = {
  stemgeneers: {
    id: 'stemgeneers', name: 'STEMgeneers', icon: '🤖', color: '#3b82f6', colorLight: '#dbeafe',
    tagline: 'Build. Code. Engineer.', sparkName: 'Mad Scientist Minute', sparkIcon: '🧪',
    skills: ['Hypothesis thinking', 'Pattern recognition', 'Analytical reasoning', 'Problem decomposition'],
    routes: { programme: '/pathways/stemgeneers', sandbox: '/programmes/stemgeneers/sandbox', sessions: '/sessions?programme=stemgeneers' },
    sessionTemplate: { duration: 45, structure: S45, zoomTips: [...ZT, 'For pattern/number sparks: give 10 seconds thinking time before asking for chat answers', 'Circuit Challenge sandbox works well as the Applied Task segment'] },
    sandboxChallenges: [{ title: 'Wire a Simple Circuit', description: 'Connect battery → resistor → LED visually', duration: '5 min', component: 'CircuitChallenge.tsx', route: '/programmes/stemgeneers/sandbox' }],
    guide: { name: 'Kofi', emoji: '🔧' },
  },
  techreneurs: {
    id: 'techreneurs', name: 'TECHreneurs', icon: '💼', color: '#8b5cf6', colorLight: '#ede9fe',
    tagline: 'Build Businesses. Create Impact.', sparkName: 'Innovation Spark', sparkIcon: '💡',
    skills: ['Creative problem-solving', 'Pitching', 'Entrepreneurial thinking', 'Value creation'],
    routes: { programme: '/pathways/techreneurs', sandbox: '/programmes/techreneurs/sandbox', sessions: '/sessions?programme=techreneurs' },
    sessionTemplate: { duration: 45, structure: S45, zoomTips: [...ZT, 'Pitching sparks: give participants 30 seconds prep before asking for volunteers', 'Business Canvas sandbox works well as the Applied Task segment'] },
    sandboxChallenges: [{ title: 'Business Model Canvas', description: 'Map out a micro-business idea', duration: '10 min', route: '/programmes/techreneurs/sandbox' }],
    guide: { name: 'Kweku', emoji: '🎯' },
  },
  pageturners: {
    id: 'pageturners', name: 'Pageturners', icon: '✍️', color: '#f59e0b', colorLight: '#fef3c7',
    tagline: 'Write. Share. Publish.', sparkName: 'Word Catalyst', sparkIcon: '📚',
    skills: ['Vocabulary precision', 'Storytelling', 'Descriptive reasoning', 'Concise expression'],
    routes: { programme: '/pathways/pageturners', sandbox: '/programmes/pageturners/sandbox', sessions: '/sessions?programme=pageturners' },
    sessionTemplate: { duration: 45, structure: S45, zoomTips: [...ZT, 'Writing sparks work best as Chat Storms — everyone types simultaneously', 'Six-Word Story sandbox is a great opener warm-up on its own', 'For the 200-word challenge: use a shared Google Doc in breakout rooms'] },
    sandboxChallenges: [
      { title: 'Six-Word Story', description: 'Tell a complete story in exactly 6 words', duration: '5 min', component: 'SixWordStoryChallenge.tsx', route: '/programmes/pageturners/sandbox' },
      { title: 'Micro Story', description: '200 words max flash fiction', duration: '10 min', component: 'MicroStorySandbox.tsx' },
      { title: 'Headline Challenge', description: '10 headlines, 60 chars each', duration: '5 min', component: 'HeadlineChallengeSandbox.tsx' },
    ],
    guide: { name: 'Afua', emoji: '🎙️' },
  },
  gtechcasters: {
    id: 'gtechcasters', name: 'G-Tech Casters', icon: '🎙️', color: '#ef4444', colorLight: '#fee2e2',
    tagline: 'Create. Broadcast. Engage.', sparkName: 'Broadcast Burst', sparkIcon: '📡',
    skills: ['Interview skills', 'Narrative structure', 'Audience engagement', 'Media literacy'],
    routes: { programme: '/pathways/gtech-casters', sandbox: '/programmes/gtechcasters/sandbox', sessions: '/sessions?programme=gtechcasters' },
    sessionTemplate: { duration: 45, structure: S45, zoomTips: [...ZT, 'Interview sparks: pair participants in breakout rooms for 90-second practice interviews', 'Podcast Segment Planner sandbox is ideal for the Applied Task', 'Record the session (with consent) — participants can use clips for their portfolios'] },
    sandboxChallenges: [
      { title: 'Podcast Segment Planner', description: 'Plan a 2-min segment with hook + structure', duration: '5 min', component: 'PodcastSegmentChallenge.tsx', route: '/programmes/gtechcasters/sandbox' },
      { title: 'Audio Snippet', description: '60 seconds max recording', duration: '5 min', component: 'AudioSnippetSandbox.tsx' },
    ],
    guide: { name: 'Afua', emoji: '🎙️' },
  },
  kaywanas_court: {
    id: 'kaywanas_court', name: "Kaywana's Court", icon: '🎭', color: '#ec4899', colorLight: '#fce7f3',
    tagline: 'Culture. Heritage. Performance.', sparkName: 'Argument Arena', sparkIcon: '⚖️',
    skills: ['Structured debate', 'Perspective-taking', 'Cultural reasoning', 'Performance confidence'],
    routes: { programme: '/pathways/kaywanas-court', sandbox: '/programmes/kaywanas-court/sandbox', sessions: '/sessions?programme=kaywanas-court' },
    sessionTemplate: { duration: 45, structure: S45, zoomTips: [...ZT, 'Debate sparks: assign sides RANDOMLY — arguing a position you disagree with builds empathy', 'Character Creator sandbox works well as Applied Task for drama sessions', 'Give 30 seconds silent thinking before inviting discussion responses'] },
    sandboxChallenges: [{ title: 'Character Creator', description: 'Build a character: want vs need + secret', duration: '5 min', component: 'CharacterCreatorChallenge.tsx', route: '/programmes/kaywanas-court/sandbox' }],
    guide: { name: 'Anansewa', emoji: '🎭' },
  },
  silk_stilettos: {
    id: 'silk_stilettos', name: 'Silk Stilettos', icon: '👠', color: '#db2777', colorLight: '#fdf2f8',
    tagline: 'Women Creating. Women Leading.', sparkName: 'Poise Drill', sparkIcon: '✨',
    skills: ['Articulation', 'Composure', 'Leadership presence', 'Persuasion'],
    routes: { programme: '/pathways/silk-stilettos', sandbox: '/programmes/silk-stilettos/sandbox', sessions: '/sessions?programme=silk-stilettos' },
    sessionTemplate: { duration: 45, structure: S45, zoomTips: [...ZT, 'Power Pose sparks: everyone stands, cameras ON — modelling vulnerability builds trust', 'Style Look sandbox works as creative warm-up before confidence sessions', "For 'no filler words' challenges: be the first to try it yourself, imperfectly"] },
    sandboxChallenges: [{ title: 'Style a Look', description: 'Put together an outfit for a specific occasion', duration: '5 min', component: 'StyleLookChallenge.tsx', route: '/programmes/silk-stilettos/sandbox' }],
    guide: { name: 'Anansewa', emoji: '🎭' },
  },
  bright_sparks: {
    id: 'bright_sparks', name: 'Bright Sparks', icon: '⚡', color: '#fbbf24', colorLight: '#fefce8',
    tagline: 'Young Minds. Big Ideas.', sparkName: 'Curiosity Burst', sparkIcon: '🔍',
    skills: ['Inquiry mindset', 'Cause-effect reasoning', 'Imagination', 'Quick thinking'],
    routes: { programme: '/pathways/bright-sparks', sandbox: '/programmes/bright-sparks/sandbox', sessions: '/sessions?programme=bright-sparks' },
    sessionTemplate: { duration: 45, structure: S45, zoomTips: [...ZT, 'Bright Sparks sessions are discovery — rotate through different programme sparks each week', 'Use the SparkDiscoveryJourney sandbox as the core activity', 'Let participants try sparks from 2-3 programmes per session to find their fit'] },
    sandboxChallenges: [{ title: 'Spark Discovery Journey', description: 'Try 3 mini-challenges from different programmes', duration: '45 min', component: 'SparkDiscoveryJourney.tsx', route: '/programmes/bright-sparks/sandbox' }],
    guide: { name: 'Esi', emoji: '📚' },
  },
  trubble_n_bass: {
    id: 'trubble_n_bass', name: 'Trubble n Bass', icon: '🎵', color: '#10b981', colorLight: '#d1fae5',
    tagline: 'Sound. Story. Get Heard.', sparkName: 'Rhythm Round', sparkIcon: '🥁',
    skills: ['Pattern creation', 'Timing', 'Collaborative rhythm', 'Creative expression'],
    routes: { programme: '/pathways/trubble-n-bass', sandbox: '/programmes/trubble-n-bass/sandbox', sessions: '/sessions?programme=trubble-n-bass' },
    sessionTemplate: { duration: 45, structure: S45, zoomTips: [...ZT, 'Rhythm sparks have latency on Zoom — do call-and-response NOT simultaneous clapping', 'Drum Loop sandbox is the star Applied Task for this programme', 'Use screen share for BandLab or GarageBand demos during Core Workshop'] },
    sandboxChallenges: [{ title: 'Build a 4-Bar Loop', description: '16-step drum sequencer with presets', duration: '5 min', component: 'DrumLoopChallenge.tsx', route: '/programmes/trubble-n-bass/sandbox' }],
    guide: { name: 'Afua', emoji: '🎙️' },
  },
  auntie_anansi: {
    id: 'auntie_anansi', name: "Auntie Anansi's Kitchen", icon: '🍲', color: '#f97316', colorLight: '#ffedd5',
    tagline: 'Preserve Culture. Reclaim Heritage.', sparkName: 'Heritage Flash', sparkIcon: '🌍',
    skills: ['Cultural memory', 'Oral storytelling', 'Descriptive language', 'Intergenerational connection'],
    routes: { programme: '/pathways/aunties-kitchen', sandbox: '/programmes/auntie-anansis-kitchen/sandbox', sessions: '/sessions?programme=auntie-anansi' },
    sessionTemplate: { duration: 45, structure: S45, zoomTips: [...ZT, 'Heritage sparks invite personal stories — give extra time and space, never rush responses', 'Family Recipe sandbox is perfect as Applied Task for heritage documentation sessions', "These sessions often run quieter — that's okay, depth matters more than volume"] },
    sandboxChallenges: [{ title: 'Document a Family Recipe', description: 'Recipe from memory with cultural story context', duration: '5 min', component: 'FamilyRecipeChallenge.tsx', route: '/programmes/auntie-anansis-kitchen/sandbox' }],
    guide: { name: 'Esi', emoji: '📚' },
  },
  impact_labs: {
    id: 'impact_labs', name: 'Impact Labs', icon: '🔬', color: '#0ea5e9', colorLight: '#e0f2fe',
    tagline: 'Research. Design. Change.', sparkName: 'Ethical Edge', sparkIcon: '🧭',
    skills: ['Moral reasoning', 'Systems thinking', 'Empathy', 'Solution design'],
    routes: { programme: '/pathways', sandbox: '/sandbox', sessions: '/sessions?programme=impact-labs' },
    sessionTemplate: { duration: 45, structure: S45, zoomTips: [...ZT, 'Ethical sparks need SILENCE before discussion — give 30 seconds minimum thinking time', 'Never rush to consensus — the goal is quality of reasoning, not agreement', "Use 'Would you rather' framings to make abstract ethics feel concrete and personal"] },
    sandboxChallenges: [], guide: undefined,
  },
  creator_factory: {
    id: 'creator_factory', name: 'Creator Factory', icon: '🎨', color: '#a855f7', colorLight: '#f3e8ff',
    tagline: 'Make Things That Matter.', sparkName: 'Constraint Chaos', sparkIcon: '🎲',
    skills: ['Creativity under limits', 'Rapid prototyping', 'Design thinking', 'Iteration'],
    routes: { programme: '/factory', sandbox: '/sandbox', sessions: '/sessions?programme=creator-factory' },
    sessionTemplate: { duration: 45, structure: S45, zoomTips: [...ZT, 'Constraint sparks: the tighter the constraint, the more creative the output', "Drawing challenges: 'hold to camera' works better than screen-share for quick sketches", 'Emoji stories are great Chat Storms — fast, fun, universal'] },
    sandboxChallenges: [], guide: undefined,
  },
  easy_street: {
    id: 'easy_street', name: 'Easy Street', icon: '📻', color: '#6366f1', colorLight: '#e0e7ff',
    tagline: 'Radio Drama Development Lab.', sparkName: 'Scene Starter', sparkIcon: '🎬',
    skills: ['Dialogue writing', 'Character voice', 'Dramatic tension', 'Collaborative storytelling'],
    routes: { programme: '/workshops/easy-street', sandbox: '/workshops/easy-street/content', facilitation: '/workshops/easy-street/facilitation', sessions: '/sessions?programme=easy-street' },
    sessionTemplate: { duration: 90, structure: [
      { phase: 'spark-opener', label: 'Scene Starter', duration: 5, description: 'Quick dialogue or character prompt to warm up the writers.', sparkType: 'opener' },
      { phase: 'core-activity', label: 'Main Writing/Development', duration: 45, description: "Guided by the week's facilitation guide — world-building, character, plot, etc." },
      { phase: 'break', label: 'Break', duration: 5, description: 'Stretch, refill drinks, cameras off.' },
      { phase: 'applied-task', label: 'Group Writing Exercise', duration: 25, description: 'Breakout rooms working on scenes, character sheets, or plot development.' },
      { phase: 'spark-closer', label: 'Scene Closer', duration: 5, description: 'Share-out: read one line from what you wrote. No explanation needed.', sparkType: 'closer' },
      { phase: 'reflection', label: 'Reflection & Next Week', duration: 5, description: "What to notice between sessions. Preview next week's focus." },
    ], zoomTips: [...ZT, 'Easy Street has full facilitation guides for each week — use them', 'Dialogue sparks: ask participants to READ ALOUD, not just type', 'Recording permission: get consent at Week 1, remind at each session', "The 'noticing' assignment between sessions builds observational writing skills"] },
    sandboxChallenges: [], guide: undefined,
  },
};

export const PROGRAMME_SPARKS: Record<string, Spark[]> = {
  stemgeneers: [
    { prompt: 'If humans could breathe underwater, what 3 inventions would we need?', type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: 'Why might ice melt faster on metal than wood? Rapid guesses — no wrong answers.', type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'What would happen if gravity doubled for one hour? Think through the chain reaction.', type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: 'Spot the pattern: 2, 6, 12, 20, ___. Drop your answer and reasoning in chat.', type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: '"We tested plant growth by shouting at one and whispering to another." What\'s wrong with this experiment?', type: 'closer', energy: 'medium', mode: 'discuss' },
    { prompt: 'You can only use 3 materials to build a bridge. What do you choose and why?', type: 'closer', energy: 'high', mode: 'breakout' },
    { prompt: 'If you could add one sense to humans beyond the five we have, what would change?', type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: 'Estimate: How many tennis balls fit in this room? Walk us through your thinking.', type: 'closer', energy: 'medium', mode: 'discuss' },
  ],
  techreneurs: [
    { prompt: 'Design the most USELESS invention imaginable. 2 minutes. Then pitch it in 30 seconds.', type: 'opener', energy: 'high', mode: 'breakout' },
    { prompt: 'You have £10 to start a business right now. What do you do? Go.', type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: 'What will classrooms look like in 20 years? Paint the picture.', type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: "What's one annoying problem students face daily? Drop answers in chat — rapid fire.", type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: "Sell a pencil like it's the most revolutionary product ever made. 30 seconds. Go.", type: 'closer', energy: 'high', mode: 'volunteer' },
    { prompt: "Your competitor just launched the same product cheaper. What's your move?", type: 'closer', energy: 'medium', mode: 'discuss' },
    { prompt: "Name a business that didn't exist 10 years ago but now everyone uses. Why did it work?", type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'If you could fix ONE thing about Wembley High Road, what would it be and how would you fund it?', type: 'closer', energy: 'high', mode: 'discuss' },
  ],
  pageturners: [
    { prompt: '"The dog ran." Make it dramatic. Make it scary. Make it funny. Three versions, go.', type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: 'Tell a complete story in exactly 6 words. Drop it in chat.', type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'Ban these words: good, bad, nice, said, went. Now describe your morning.', type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: 'Replace 3 weak verbs in this sentence: "She went to the shop and got some things and came back."', type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: '"I can\'t believe this happened." Deliver it angry. Then excited. Then suspicious. Then heartbroken.', type: 'closer', energy: 'high', mode: 'volunteer' },
    { prompt: 'Write a text message conversation — 4 messages — between two people. One has a secret. Go.', type: 'closer', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'Rewrite the ending of any fairy tale to make it more honest.', type: 'closer', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'Describe an object without naming it. Others guess in chat.', type: 'opener', energy: 'high', mode: 'chat-storm' },
  ],
  gtechcasters: [
    { prompt: "You're a reporter. Something just happened outside. Describe it in 30 seconds like a news flash.", type: 'opener', energy: 'high', mode: 'volunteer' },
    { prompt: "Write a podcast hook — the first 15 seconds that makes someone NOT skip. Drop it in chat.", type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'Interview someone in your breakout room. You have 2 questions and 90 seconds. Find the story.', type: 'closer', energy: 'high', mode: 'breakout' },
    { prompt: "What's the most boring topic you can think of? Now make it sound fascinating in one sentence.", type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: "Describe today's weather like you're narrating a movie trailer.", type: 'opener', energy: 'high', mode: 'volunteer' },
    { prompt: "You have 20 seconds of airtime. What's the one thing Wembley needs to hear today?", type: 'closer', energy: 'medium', mode: 'volunteer' },
    { prompt: "Plan a 2-minute podcast segment: What's your hook, your guest question, and your sign-off?", type: 'closer', energy: 'medium', mode: 'breakout' },
    { prompt: "Read this headline: 'Local Heroes Transform Empty Space.' Now give us the first line of the story.", type: 'opener', energy: 'medium', mode: 'chat-storm' },
  ],
  kaywanas_court: [
    { prompt: 'Defend this: Pineapple absolutely belongs on pizza. Build the strongest case you can.', type: 'opener', energy: 'high', mode: 'volunteer' },
    { prompt: 'You find £50 in a wallet. No ID. What should you do? And why?', type: 'opener', energy: 'medium', mode: 'discuss' },
    { prompt: '"Homework should be abolished." Pick a side instantly. 30-second argument. Go.', type: 'opener', energy: 'high', mode: 'volunteer' },
    { prompt: 'Should everyone get the same reward, or should rewards reflect effort? Which is fairer?', type: 'closer', energy: 'medium', mode: 'discuss' },
    { prompt: 'A robot must choose: save one person or five. What should it do? And who decides?', type: 'closer', energy: 'medium', mode: 'discuss' },
    { prompt: "Your friend copies your work. They say it's because they were struggling. What do you do?", type: 'closer', energy: 'medium', mode: 'discuss' },
    { prompt: 'Is it ever okay to break a rule? Give us the best example you can think of.', type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: "Two truths and a logical impossibility. Can the group spot which is impossible?", type: 'opener', energy: 'high', mode: 'chat-storm' },
  ],
  silk_stilettos: [
    { prompt: 'Everyone stands. Power pose. Now give us one sentence: "I am someone who..."', type: 'opener', energy: 'high', mode: 'volunteer' },
    { prompt: '30 seconds to convince us why your favourite snack is elite. No ums, no likes.', type: 'opener', energy: 'high', mode: 'volunteer' },
    { prompt: 'Speak for 20 seconds on ANY topic. No filler words. Ready? Go.', type: 'opener', energy: 'high', mode: 'volunteer' },
    { prompt: 'Give feedback to an imaginary colleague: "Your work is great, but..." — how do you finish that?', type: 'closer', energy: 'medium', mode: 'discuss' },
    { prompt: "Introduce yourself as if you're already the person you want to be in 5 years.", type: 'opener', energy: 'high', mode: 'volunteer' },
    { prompt: "What's one thing women in your community don't get enough credit for? 15 seconds.", type: 'closer', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'Someone dismisses your idea in a meeting. What do you say? Practice the response.', type: 'closer', energy: 'medium', mode: 'discuss' },
    { prompt: 'Elevator pitch: You have 20 seconds to tell someone what Wembley Wonders does. Go.', type: 'closer', energy: 'high', mode: 'volunteer' },
  ],
  bright_sparks: [
    { prompt: 'What if gravity switched off for 10 seconds every day? What would change?', type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: 'What if animals could talk — which animal would be the most annoying? And which the wisest?', type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: "Apple, Banana, Carrot, Mango — which doesn't belong? There's more than one right answer.", type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: '"I speak without a mouth and hear without ears. I have no body, but I come alive with wind." What am I?', type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'Design a superpower — but it MUST have one weakness. What is it?', type: 'closer', energy: 'high', mode: 'chat-storm' },
    { prompt: 'If you could ask the Prime Minister one question and they HAD to answer honestly, what?', type: 'closer', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'What if homework disappeared tomorrow? What would replace it?', type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: 'Combine 3 random objects into one invention. Explain why someone would buy it.', type: 'closer', energy: 'high', mode: 'breakout' },
  ],
  trubble_n_bass: [
    { prompt: 'Clap a rhythm. Everyone repeats. Now someone adds to it. Build a groove together.', type: 'opener', energy: 'high', mode: 'volunteer' },
    { prompt: 'Describe your mood right now using ONLY a sound. Not a word — a sound.', type: 'opener', energy: 'high', mode: 'volunteer' },
    { prompt: "What's the most memorable sound you heard this week? Describe it so we can hear it.", type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'If this week had a soundtrack, what genre would it be? Why?', type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'Create a 4-beat pattern by tapping your desk. Someone else layers on top. Build the track.', type: 'closer', energy: 'high', mode: 'volunteer' },
    { prompt: 'Name a song that changed your perspective on something. One sentence on why.', type: 'closer', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'Sound effects challenge: describe a scene using only sounds. No words allowed.', type: 'closer', energy: 'high', mode: 'volunteer' },
    { prompt: "If you were a DJ, what would your name be and what's your signature sound?", type: 'opener', energy: 'high', mode: 'chat-storm' },
  ],
  auntie_anansi: [
    { prompt: "What's one dish that means 'home' to you? One sentence. Drop it in chat.", type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: "Describe a family recipe WITHOUT naming the ingredients. Can we guess?", type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: 'What food tradition did your family keep that you want to pass on?', type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'If your grandmother could teach one lesson to the whole of Wembley, what would it be?', type: 'closer', energy: 'medium', mode: 'discuss' },
    { prompt: "Tell us about a meal that wasn't about the food. What was it really about?", type: 'closer', energy: 'medium', mode: 'discuss' },
    { prompt: "What's the most unusual food combination you grew up with that others find strange?", type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: "Finish this: 'In my family, we never ate without first...'", type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'What ingredient can you identify by smell alone? What memory does it trigger?', type: 'closer', energy: 'medium', mode: 'chat-storm' },
  ],
  impact_labs: [
    { prompt: 'You see someone drop their lunch money. What are 3 things you could do? Which is best?', type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: "Should AI be allowed to make decisions about people's lives? Where's the line?", type: 'opener', energy: 'medium', mode: 'discuss' },
    { prompt: 'A shop is closing on your street. Is that a problem or an opportunity? Both?', type: 'closer', energy: 'medium', mode: 'discuss' },
    { prompt: 'If you had £1000 to improve one thing in Wembley, what would you spend it on?', type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: "Is it better to give someone a fish or teach them to fish? What if they're hungry RIGHT NOW?", type: 'closer', energy: 'medium', mode: 'discuss' },
    { prompt: "What's one community problem everyone talks about but nobody fixes? Why?", type: 'closer', energy: 'medium', mode: 'discuss' },
    { prompt: 'Would you rather have perfect fairness or perfect kindness? You can only choose one.', type: 'opener', energy: 'medium', mode: 'discuss' },
    { prompt: 'Name something that was invented to help people but ended up causing harm.', type: 'opener', energy: 'medium', mode: 'chat-storm' },
  ],
  creator_factory: [
    { prompt: 'Draw a superhero using only triangles. Hold it up in 60 seconds.', type: 'opener', energy: 'high', mode: 'volunteer' },
    { prompt: 'Design a logo using just 2 letters. Any two. Sketch it now.', type: 'opener', energy: 'high', mode: 'volunteer' },
    { prompt: 'Write a tagline for Wembley in exactly 6 words. Drop it in chat.', type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'Redesign a common object to solve a different problem. What did you change?', type: 'closer', energy: 'medium', mode: 'breakout' },
    { prompt: 'You have 3 shapes and 2 colours. Design a poster. You have 90 seconds.', type: 'closer', energy: 'high', mode: 'volunteer' },
    { prompt: "What's the ugliest thing you see every day? How would you make it beautiful?", type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'Tell an emoji story in chat — max 5 emojis — others decode it.', type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: "Name one everyday object that's perfectly designed. What makes it perfect?", type: 'closer', energy: 'medium', mode: 'discuss' },
  ],
  easy_street: [
    { prompt: "Write a text conversation — 4 messages — where someone is hiding something. Drop it in chat.", type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: 'Give us a character: name, job, secret. Three words each. Go.', type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: '"I need to tell you something." What comes next? Write the scene in 30 seconds.', type: 'opener', energy: 'medium', mode: 'chat-storm' },
    { prompt: "Two characters. Same doorway. Different reasons to be there. What do they say?", type: 'closer', energy: 'medium', mode: 'breakout' },
    { prompt: "Describe a Wembley street scene using only dialogue. No description — just voices.", type: 'closer', energy: 'medium', mode: 'chat-storm' },
    { prompt: '"That\'s not what happened and you know it." What happened?', type: 'opener', energy: 'high', mode: 'chat-storm' },
    { prompt: '"I\'m not going back there." Read it out loud like you mean it. Now change the meaning without changing a word.', type: 'closer', energy: 'high', mode: 'volunteer' },
    { prompt: 'Name a Wembley location. Now give it a secret. Something that only happens after dark.', type: 'opener', energy: 'high', mode: 'chat-storm' },
  ],
};

export const UNIVERSAL_SPARKS: Spark[] = [
  { prompt: "How's your brain feeling today? One word in chat. No explanation needed.", type: 'opener', energy: 'low', mode: 'chat-storm' },
  { prompt: 'If your week was a weather forecast, what would it be?', type: 'opener', energy: 'low', mode: 'chat-storm' },
  { prompt: "Count backwards from 100 in 7s. As a team. In chat. Don't repeat what someone already said.", type: 'opener', energy: 'medium', mode: 'chat-storm' },
  { prompt: "Explain something simple — like making toast — as if you're a professor. 20 seconds.", type: 'closer', energy: 'high', mode: 'volunteer' },
  { prompt: 'Two truths and one lie. Drop yours in chat. We guess the lie.', type: 'opener', energy: 'high', mode: 'chat-storm' },
  { prompt: "What's one skill you have that nobody in this room knows about?", type: 'opener', energy: 'medium', mode: 'chat-storm' },
  { prompt: '"If I ran Wembley Wonders for a day..." Finish that sentence.', type: 'closer', energy: 'high', mode: 'chat-storm' },
  { prompt: "Reverse thinking: What's the WORST way to prepare for an exam? Be creative.", type: 'opener', energy: 'high', mode: 'chat-storm' },
  { prompt: 'Speed categories: Name 5 countries in 10 seconds. Ready? Go!', type: 'opener', energy: 'high', mode: 'chat-storm' },
  { prompt: 'Change one thing about today. Just one. What is it?', type: 'closer', energy: 'low', mode: 'chat-storm' },
];

export const MODE_NOTES: Record<string, ModeNote> = {
  'chat-storm': { label: 'Chat Storm', icon: '💬', description: 'Everyone drops answers in chat simultaneously', facilitation: "Count down 3-2-1, then say 'Go!' — everyone types at once. Read out 3-4 interesting answers. Don't rank them.", builds: 'Confidence in sharing, processing speed, peer learning' },
  breakout: { label: 'Breakout Room', icon: '🚪', description: 'Small groups (3-4 people) collaborate', facilitation: 'Assign roles: one person types, one person presents back. Keep to 2 minutes in rooms. Bring back for 1-minute share-outs.', builds: 'Collaboration, communication precision, role responsibility' },
  volunteer: { label: 'Volunteer Spotlight', icon: '🎤', description: 'Brave souls take the mic — never force it', facilitation: "Ask 'Who wants to go first?' — never cold-call. Celebrate attempts, not perfection. 'That was brilliant because...'", builds: 'Composure under attention, articulation, performance confidence' },
  discuss: { label: 'Open Discussion', icon: '🗣️', description: 'Guided conversation — think-pair-share style', facilitation: "Give 30 seconds silent thinking first. Then invite responses. Build on each other's ideas: 'Building on what X said...'", builds: 'Active listening, perspective-taking, intellectual humility, structured reasoning' },
};

export const ENERGY_LABELS: Record<string, { label: string; color: string; icon: string }> = {
  low: { label: 'Gentle', color: '#94a3b8', icon: '🌊' },
  medium: { label: 'Warm', color: '#f59e0b', icon: '☀️' },
  high: { label: 'Electric', color: '#ef4444', icon: '⚡' },
};

export function getProgrammeByParam(param: string): Programme | null {
  if (PROGRAMMES[param]) return PROGRAMMES[param];
  const underscored = param.replace(/-/g, '_');
  if (PROGRAMMES[underscored]) return PROGRAMMES[underscored];
  const match = Object.values(PROGRAMMES).find(
    p => p.id === param || p.name.toLowerCase().replace(/[^a-z]/g, '') === param.replace(/-/g, '')
  );
  return match || null;
}