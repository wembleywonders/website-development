// ═══════════════════════════════════════════════════════════════
// PROGRAMME FACILITATION DATA
// ═══════════════════════════════════════════════════════════════
// 8-week session guides for all 12 programmes.
// One FacilitationEngine component renders any programme.
//
// Week structure follows standard 45-min session:
//   Spark Opener (3m) → Core (25m) → Break (2m) →
//   Applied Task (8m) → Spark Closer (5m) → Reflection (2m)
//
// Easy Street overrides to 90-min sessions (see sparkData.ts).
// ═══════════════════════════════════════════════════════════════

export interface WeekGuide {
  week: number;
  title: string;
  focus: string;
  coreActivity: string;
  appliedTask: string;
  facilitatorNotes: string;
  materials: string[];
  sandboxLink?: string;
  sparkHint?: 'opener' | 'closer'; // suggested spark type emphasis
  beforeSession: string[];
  afterSession: string[];
}

export interface ProgrammeFacilitation {
  programmeId: string;
  totalWeeks: number;
  overview: string;
  weeklyGuides: WeekGuide[];
}

// ═══════════════════════════════════════════════════════════════
// STEMgeneers — 8 weeks
// Guide: Kofi 🔧
// ═══════════════════════════════════════════════════════════════

export const STEMGENEERS_FACILITATION: ProgrammeFacilitation = {
  programmeId: 'stemgeneers',
  totalWeeks: 8,
  overview: 'Build thinking before building things. Each week layers a new engineering mindset — from observation through hypothesis to prototyping — so by Week 8 participants can tackle real problems systematically.',
  weeklyGuides: [
    {
      week: 1, title: 'How Engineers See', focus: 'Observation & pattern recognition',
      coreActivity: 'Walk participants through everyday objects that contain hidden engineering — a door hinge, a zip, a bridge photo. Ask: What problem does this solve? What would fail if you removed one part? Discussion-heavy, no building yet.',
      appliedTask: 'Participants photograph or sketch 3 "hidden engineers" in their own home. Share back.',
      facilitatorNotes: 'Resist the urge to jump into building. This week is about seeing. The participants who learn to observe first will build better later. If someone says "I\'m not an engineer" — that\'s the belief we\'re dissolving.',
      materials: ['Photos of everyday engineering (bridges, hinges, zips, packaging)', 'Shared Google Doc for observations'],
      sandboxLink: '/programmes/stemgeneers/sandbox',
      beforeSession: ['Prepare 6-8 photos of everyday engineering', 'Test screen sharing'],
      afterSession: ['Compile observation photos into shared gallery', 'Note who showed strong analytical thinking'],
    },
    {
      week: 2, title: 'What If?', focus: 'Hypothesis thinking & experimental design',
      coreActivity: 'Introduce the "What if we changed X?" framework. Present 3 scenarios (what if bridges had no curves? what if phones had no screens? what if shoes had no laces?) and guide groups to predict outcomes using logic, not guessing.',
      appliedTask: 'Each participant writes one "What if?" question about something in their life. Group votes on most interesting.',
      facilitatorNotes: 'Celebrate wild hypotheses but always follow with "and how would we test that?" — building the experimental mindset.',
      materials: ['What-If scenario cards', 'Hypothesis template doc'],
      beforeSession: ['Print/share What-If cards', 'Prepare hypothesis template'],
      afterSession: ['Collect What-If questions for future sessions', 'Identify who thinks systematically vs. intuitively'],
    },
    {
      week: 3, title: 'Build It Wrong First', focus: 'Rapid prototyping & iteration',
      coreActivity: 'The "Worst Bridge" challenge: using only paper, build a bridge between two books that holds a phone. First attempt will fail. That\'s the point. Discuss: What broke? Why? What would you change? Rebuild.',
      appliedTask: 'Document your bridge v1 and v2. What changed? Why did v2 work better?',
      facilitatorNotes: 'This is the most important week. Failure IS the lesson. If someone\'s bridge works first time, challenge them to make it hold 2 phones. Nobody should finish without failing once.',
      materials: ['A4 paper (8 sheets per person)', 'Tape or paper clips', 'Two books and a phone per person'],
      beforeSession: ['Confirm participants have materials at home', 'Have backup digital activity ready'],
      afterSession: ['Photo gallery of bridges v1 vs v2', 'Celebrate failures as much as successes'],
    },
    {
      week: 4, title: 'Numbers Tell Stories', focus: 'Data, measurement & evidence',
      coreActivity: 'Introduce measurement as storytelling. Present a simple dataset (school journey times, pocket money spending, sleep hours) and guide participants to find the story in the numbers. What does the data say? What doesn\'t it say?',
      appliedTask: 'Collect one dataset from your own life this week (screen time, steps, sleep). Bring it next week.',
      facilitatorNotes: 'Many participants will find "data" intimidating. Start with data they already have — phone screen time reports, step counters. Make it personal before making it abstract.',
      materials: ['Sample datasets (simple, visual)', 'Graph templates'],
      beforeSession: ['Prepare 3 simple datasets with clear stories', 'Check screen time sharing works on Zoom'],
      afterSession: ['Remind participants to collect their personal dataset', 'Note who needs maths confidence building'],
    },
    {
      week: 5, title: 'Circuit Thinking', focus: 'Systems, logic & cause-effect',
      coreActivity: 'Use the Circuit Challenge sandbox to build virtual circuits. Then discuss: circuits are just systems — input, process, output. What other systems work like circuits? (A recipe. A bus route. A conversation.)',
      appliedTask: 'Draw a "circuit diagram" of something non-electronic — a morning routine, making dinner, getting to school.',
      facilitatorNotes: 'The sandbox is the hook but the conversation is the lesson. Systems thinking is the transferable skill, not electronics.',
      materials: ['Circuit Challenge sandbox', 'System diagram templates'],
      sandboxLink: '/programmes/stemgeneers/sandbox',
      beforeSession: ['Test sandbox loads on all browsers', 'Prepare non-electronic system examples'],
      afterSession: ['Gallery of non-electronic "circuits"', 'Identify participants ready for more complex challenges'],
    },
    {
      week: 6, title: 'Code Is Instructions', focus: 'Computational thinking & sequencing',
      coreActivity: 'The "Human Robot" exercise: one participant gives verbal instructions, another follows them EXACTLY (no interpretation). Make a sandwich. Navigate a room. Hilarity and learning ensue. Then: this is what code is.',
      appliedTask: 'Write instructions for something simple that a "robot" (family member) must follow exactly. Report back on what went wrong.',
      facilitatorNotes: 'This is entry-level computational thinking without a computer. The debugging happens when instructions fail. That\'s where the learning lives.',
      materials: ['Instruction template', 'Optional: Scratch or Code.org link for those who want to try'],
      beforeSession: ['Prepare 3 "Human Robot" scenarios', 'Test any coding platform links'],
      afterSession: ['Collect "instruction failure" stories — these are gold for next session', 'Share optional coding resources'],
    },
    {
      week: 7, title: 'Solve a Real Problem', focus: 'Design thinking applied',
      coreActivity: 'Present 3 real Wembley problems (litter near the stadium, bus overcrowding at school time, noise complaints). Groups pick one and apply the full cycle: observe → hypothesise → prototype → test → iterate.',
      appliedTask: 'Breakout rooms: sketch a solution to your chosen problem. Present back in 60 seconds.',
      facilitatorNotes: 'This is where everything comes together. The problems are real and local — participants should feel ownership. Resist the urge to guide toward "right" answers.',
      materials: ['Problem briefs with photos', 'Design thinking template', 'Breakout rooms configured'],
      beforeSession: ['Prepare problem briefs with real Wembley context', 'Configure breakout rooms (3-4 per room)'],
      afterSession: ['Document all solutions proposed', 'Identify strongest ideas for potential real implementation'],
    },
    {
      week: 8, title: 'Showcase & Reflect', focus: 'Presentation, portfolio & next steps',
      coreActivity: 'Each participant presents their favourite piece of work from the 8 weeks — their bridge, their circuit, their Wembley solution, their dataset story. 2 minutes each. Community celebrates.',
      appliedTask: 'Build a mini portfolio: 3 things you made, 3 things you learned, 1 thing you\'d do differently.',
      facilitatorNotes: 'This matters. Name people. Thank them specifically. Connect completers to the next programme or to ongoing projects. Nobody should leave without knowing their next step.',
      materials: ['Portfolio template', 'Celebration slide deck', 'Next steps handout'],
      beforeSession: ['Prepare celebration slides with participant names', 'Confirm next programme dates'],
      afterSession: ['Send celebration email with portfolio template', 'Identify participants for advanced pathways', 'Document the cohort for G-Tech Casters archive'],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// TECHreneurs — 8 weeks
// Guide: Kweku 🎯
// ═══════════════════════════════════════════════════════════════

export const TECHRENEURS_FACILITATION: ProgrammeFacilitation = {
  programmeId: 'techreneurs',
  totalWeeks: 8,
  overview: 'From idea to income. Each week adds a business-building skill — not theory, but practical tools participants can use immediately to create value in their community.',
  weeklyGuides: [
    {
      week: 1, title: 'Problems Are Opportunities', focus: 'Opportunity spotting',
      coreActivity: 'Walk Wembley High Road virtually (Google Street View or photos). What\'s broken? What\'s missing? What do people complain about? Every complaint is a business waiting to happen.',
      appliedTask: 'List 5 problems you noticed this week. Star the one you\'d most like to solve.',
      facilitatorNotes: 'Don\'t let anyone say "I don\'t have ideas." Ideas come from problems. Everyone has problems. The skill is learning to see problems as raw material.',
      materials: ['Wembley High Road photos/Street View', 'Problem-spotting worksheet'],
      beforeSession: ['Prepare Wembley photos showing fixable problems', 'Test screen share for Street View walk'],
      afterSession: ['Compile problem lists', 'Note who spots genuine gaps vs. copies existing ideas'],
    },
    {
      week: 2, title: 'Who Pays?', focus: 'Customer discovery & validation',
      coreActivity: 'Take last week\'s starred problem. Who has this problem? How often? How much would they pay to fix it? Introduce the "5 Whys" customer interview technique. Practice in pairs.',
      appliedTask: 'Interview 2 people this week about your chosen problem. Do they actually care? Would they pay?',
      facilitatorNotes: 'Most first-time entrepreneurs skip this step. The lesson: your idea doesn\'t matter until someone else confirms the problem exists.',
      materials: ['Interview question template', '5 Whys worksheet'],
      beforeSession: ['Prepare interview demo with co-facilitator', 'Share interview template early'],
      afterSession: ['Collect interview results', 'Celebrate everyone who actually talked to real people'],
    },
    {
      week: 3, title: 'Make It Real', focus: 'Prototyping & MVPs',
      coreActivity: 'Build the simplest possible version of your solution. Paper prototype, landing page, Instagram post, physical mock-up — whatever proves the concept without spending money.',
      appliedTask: 'Create your MVP this week. Photograph it. Bring it next session.',
      facilitatorNotes: 'The goal is speed, not perfection. If someone spends 3 hours making it beautiful, they\'ve missed the point. Ugly and fast beats pretty and slow.',
      materials: ['MVP examples gallery', 'Landing page builder link (Carrd/Linktree)'],
      beforeSession: ['Curate 5 MVP examples from real startups', 'Test free landing page tools'],
      afterSession: ['Gallery of MVPs', 'Note who actually built vs. who just planned'],
    },
    {
      week: 4, title: 'Price It Right', focus: 'Pricing, costs & margins',
      coreActivity: 'The pricing workshop. What does it cost to make? What will people pay? What\'s left over? Introduce cost-of-materials, time-costing, and competitor pricing. Use real Wembley examples.',
      appliedTask: 'Price your product/service. Show your working. Include your time.',
      facilitatorNotes: 'Many participants will underprice because they don\'t value their time. Challenge this directly: "Would you work for £2/hour? Then why are you pricing your product that way?"',
      materials: ['Pricing calculator template', 'Local competitor price examples'],
      beforeSession: ['Research 3 local business pricing examples', 'Prepare pricing spreadsheet template'],
      afterSession: ['Review pricing submissions', 'Flag anyone pricing below cost'],
    },
    {
      week: 5, title: 'Sell Without Selling', focus: 'Marketing, storytelling & social media',
      coreActivity: 'People don\'t buy products, they buy stories. Reframe each business as a story: who is it for, what problem does it solve, why should anyone care? Create one Instagram/TikTok-ready post.',
      appliedTask: 'Post your business story somewhere real — Instagram, WhatsApp status, school notice board. Screenshot it.',
      facilitatorNotes: 'This is where the business becomes visible. Some participants will resist going public. That\'s normal. Encourage, don\'t force.',
      materials: ['Story framework template', 'Social media post templates', 'Canva/free design tool link'],
      beforeSession: ['Prepare 3 before/after marketing examples', 'Test Canva access'],
      afterSession: ['Celebrate everyone who posted publicly', 'Screenshot gallery of live posts'],
    },
    {
      week: 6, title: 'First Sale', focus: 'Sales, negotiation & customer service',
      coreActivity: 'Role-play selling to difficult customers. The skeptic. The haggler. The "I\'ll think about it." Practice handling objections without caving on price. Then: challenge everyone to make one real sale this week.',
      appliedTask: 'Make your first sale (or get your first signup/commitment). Any amount counts.',
      facilitatorNotes: 'The first sale is transformative. Even £1 changes how someone sees themselves — from "student" to "entrepreneur." Celebrate every sale, regardless of size.',
      materials: ['Sales script template', 'Objection handling guide', 'First Sale celebration template'],
      beforeSession: ['Prepare role-play scenarios', 'Brief co-facilitator on customer roles'],
      afterSession: ['CELEBRATE EVERY FIRST SALE', 'Document revenue for impact reporting'],
    },
    {
      week: 7, title: 'Scale or Sustain', focus: 'Growth planning & sustainability',
      coreActivity: 'You\'ve sold once. Now what? Introduce repeat customers, referrals, and simple scaling strategies. Also: when NOT to scale. Sometimes a side hustle is perfect as a side hustle.',
      appliedTask: 'Write your 3-month plan: what stays, what changes, what\'s the next milestone?',
      facilitatorNotes: 'Not everyone needs to build the next Amazon. Validate side hustles as legitimate. A participant earning £50/month from a real skill has achieved something remarkable.',
      materials: ['3-month plan template', 'Revenue tracking spreadsheet'],
      beforeSession: ['Prepare scaling vs. sustaining examples', 'Share planning template early'],
      afterSession: ['Review 3-month plans', 'Connect participants with ongoing mentoring'],
    },
    {
      week: 8, title: 'Pitch Night', focus: 'Presentation & celebration',
      coreActivity: 'Each participant pitches their business in 2 minutes. Real audience (invite other members, directors, local business owners if possible). Feedback is constructive and specific.',
      appliedTask: 'Final pitch deck: problem, solution, customer, price, traction, next step.',
      facilitatorNotes: 'This is their moment. Make it feel professional — proper intros, proper applause, proper feedback. Connect strongest pitches to Wembley Wonders business support.',
      materials: ['Pitch template', 'Timer', 'Feedback cards for audience', 'Celebration supplies'],
      beforeSession: ['Invite guest audience', 'Prepare feedback cards', 'Test presentation setup'],
      afterSession: ['Send pitch recordings to participants', 'Connect top pitches to business mentoring', 'Document for G-Tech Casters'],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// Pageturners — 8 weeks
// Guide: Afua 🎙️
// ═══════════════════════════════════════════════════════════════

export const PAGETURNERS_FACILITATION: ProgrammeFacilitation = {
  programmeId: 'pageturners',
  totalWeeks: 8,
  overview: 'From blank page to published work. Each week builds a different writing muscle — concision, description, dialogue, structure — culminating in a piece ready for Joystick magazine.',
  weeklyGuides: [
    { week: 1, title: 'Kill the Blank Page', focus: 'Overcoming writing fear & freewriting',
      coreActivity: 'The 3-minute freewrite: set a timer, write without stopping, no editing, no backspace. Topic: "The last time I was surprised." Then share one sentence — just one. Normalise imperfection.',
      appliedTask: 'Do one 5-minute freewrite every day this week. Don\'t read them back. Just write.',
      facilitatorNotes: 'Half the room will say "I\'m not a writer." That belief dies today. Everyone writes texts, posts, messages — they\'re already writers. The skill is intentionality.',
      materials: ['Timer', 'Freewriting guide', 'Example freewrites from published authors'],
      beforeSession: ['Prepare 5 freewrite prompts', 'Share published authors\' messy first drafts'],
      afterSession: ['Affirm everyone who shared', 'Note natural storytellers for later spotlight'],
    },
    { week: 2, title: 'Six Words', focus: 'Economy & precision',
      coreActivity: 'Hemingway\'s 6-word story: "For sale: baby shoes, never worn." Write 10 six-word stories. Share. Vote on most powerful. Discuss: what makes one better than another? Every word must earn its place.',
      appliedTask: 'Write 5 more six-word stories. Choose your best for the group gallery.',
      facilitatorNotes: 'This exercise teaches more about writing than 10 lectures. Constraints force creativity. If someone writes 7 words, make them cut one — the choosing is the skill.',
      materials: ['Six-Word Story sandbox', 'Gallery template for submissions'],
      sandboxLink: '/programmes/pageturners/sandbox',
      beforeSession: ['Prepare example six-word stories', 'Test sandbox access'],
      afterSession: ['Compile gallery of best entries', 'Share with Joystick editor as potential content'],
    },
    { week: 3, title: 'Show Don\'t Tell', focus: 'Descriptive writing & sensory detail',
      coreActivity: 'Take a bland sentence: "She was sad." Rewrite it using each of the 5 senses. What does sadness look like? Sound like? Taste like? Practice on 3 emotions: anger, joy, boredom.',
      appliedTask: 'Rewrite 3 "telling" sentences as "showing" paragraphs. Maximum 50 words each.',
      facilitatorNotes: 'This is where writing goes from functional to vivid. The participants who struggle here often need more reading — share audiobook/podcast recommendations for free listening.',
      materials: ['Telling vs. Showing worksheet', '5 senses writing template'],
      beforeSession: ['Prepare 10 "telling" sentences to rewrite', 'Share sensory detail examples'],
      afterSession: ['Compile before/after examples', 'Recommend reading for those who want it'],
    },
    { week: 4, title: 'Voice & Dialogue', focus: 'Character voice & realistic speech',
      coreActivity: 'Eavesdrop exercise: listen to a real conversation (bus, shop, family) and transcribe it roughly. How do real people talk? Then write dialogue between 2 characters who want different things.',
      appliedTask: 'Write a 200-word scene that is ONLY dialogue. No "he said/she said" — the words must tell us who\'s speaking.',
      facilitatorNotes: 'Real dialogue is messy, interrupted, incomplete. If it sounds like an essay, it\'s not dialogue. Read examples aloud — participants should hear the difference.',
      materials: ['Dialogue examples (good and bad)', 'Eavesdrop guide'],
      beforeSession: ['Prepare 3 dialogue extracts to read aloud', 'Record a short "eavesdrop" demo'],
      afterSession: ['Share strongest dialogue pieces', 'Connect to Easy Street radio drama for interested writers'],
    },
    { week: 5, title: 'Story Shape', focus: 'Narrative structure & pacing',
      coreActivity: 'Every story is: someone wants something, something gets in the way, something changes. Map 3 favourite films/shows to this structure. Then outline your own 500-word story using the same shape.',
      appliedTask: 'Write the first 200 words of your outlined story. Hook us in the first sentence.',
      facilitatorNotes: 'Structure isn\'t a cage — it\'s scaffolding. Participants who resist structure often produce the most unfocused work. Show them structure in things they already love.',
      materials: ['Story structure diagram', 'Outline template', 'Film/show structure examples'],
      beforeSession: ['Prepare 3 film structure breakdowns', 'Share outline template'],
      afterSession: ['Review opening 200 words', 'Pair strong openings with weak middles for peer editing'],
    },
    { week: 6, title: 'Edit Like a Surgeon', focus: 'Self-editing & revision',
      coreActivity: 'Take your 200 words from last week. Now cut 50 words without losing meaning. Then swap with a partner — they cut another 20. Discuss: what did cutting reveal? What was hiding?',
      appliedTask: 'Complete your 500-word story. Then edit it to 400 words. Submit both versions.',
      facilitatorNotes: 'Editing is where writing becomes craft. Many will resist cutting — "but I love that sentence!" Good. That\'s the muscle we\'re building.',
      materials: ['Editing checklist', 'Track Changes guide for Google Docs'],
      beforeSession: ['Prepare editing demo with real text', 'Set up paired editing in breakout rooms'],
      afterSession: ['Compile before/after edits', 'Note who improved most through editing'],
    },
    { week: 7, title: 'Write for Joystick', focus: 'Writing for publication',
      coreActivity: 'Introduce Joystick e-zine sections: news, features, profiles, opinion. Each has different rules. Pick a section and write a 300-word piece using the right format. Peer review in pairs.',
      appliedTask: 'Submit your Joystick-ready piece. Include a headline and a 1-sentence bio.',
      facilitatorNotes: 'This is where practice becomes publication. Frame it as professional: "You\'re submitting to an editor." That shifts identity from student to writer.',
      materials: ['Joystick style guide', 'Section templates', 'Submission form'],
      beforeSession: ['Prepare Joystick section examples', 'Brief the Joystick editor on incoming submissions'],
      afterSession: ['Forward submissions to Joystick editor', 'Celebrate every submission'],
    },
    { week: 8, title: 'Read Aloud & Celebrate', focus: 'Performance, publication & next steps',
      coreActivity: 'Open mic night: each writer reads their best piece aloud. 3 minutes max. Audience snaps (don\'t clap — it interrupts the flow). Published pieces announced. Connect to Rayd-yo for spoken word.',
      appliedTask: 'Final portfolio: 3 pieces from the 8 weeks. Choose your best. Write a 50-word reflection on what changed.',
      facilitatorNotes: 'Reading aloud is terrifying and transformative. Go first yourself. Read something imperfect. Model vulnerability. Then invite others.',
      materials: ['Portfolio template', 'Open mic running order', 'Joystick publication announcement'],
      beforeSession: ['Prepare running order', 'Confirm Joystick publication dates', 'Invite wider community audience'],
      afterSession: ['Send portfolio templates', 'Publish in Joystick', 'Connect to G-Tech Casters for podcast/radio opportunities'],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// G-Tech Casters — 8 weeks
// Guide: Afua 🎙️
// ═══════════════════════════════════════════════════════════════

export const GTECHCASTERS_FACILITATION: ProgrammeFacilitation = {
  programmeId: 'gtechcasters',
  totalWeeks: 8,
  overview: 'From consumer to creator. Every week builds a media production skill — interviewing, recording, editing, broadcasting — feeding directly into Rayd-yo radio and Joystick e-zine.',
  weeklyGuides: [
    { week: 1, title: 'Find the Story', focus: 'Newsworthiness & story angles',
      coreActivity: 'What makes something a story? Present 5 events — some newsworthy, some not. Debate which ones Rayd-yo should cover and why. Introduce the "So What?" test.',
      appliedTask: 'Spot 3 potential stories in your community this week. Write one sentence for each: what happened, why it matters.',
      facilitatorNotes: 'Most people think news is about big events. The skill is finding stories in ordinary life. A shop closing. A new mural. A neighbour\'s achievement.',
      materials: ['5 event scenarios', 'Story angle worksheet', 'So What? test card'],
      beforeSession: ['Prepare event scenarios with Wembley context', 'Share story angle examples'],
      afterSession: ['Compile story pitches', 'Star the strongest for Week 3 interviews'],
    },
    { week: 2, title: 'Ask Better Questions', focus: 'Interview technique',
      coreActivity: 'Bad questions get bad answers. Demo: closed vs. open questions, leading vs. curious questions. Practice the "3-question interview" in breakout pairs: opener, follow-up, closer.',
      appliedTask: 'Interview someone (friend, family, stranger) using only 3 questions. Record it if they consent.',
      facilitatorNotes: 'The 3-question constraint forces participants to choose wisely. Follow-up questions are the hardest skill — teach "Tell me more about..." as a universal tool.',
      materials: ['Question types handout', 'Interview consent template', '3-question framework'],
      beforeSession: ['Prepare bad vs. good question examples', 'Configure breakout room pairs'],
      afterSession: ['Listen to any recordings submitted', 'Identify natural interviewers'],
    },
    { week: 3, title: 'Record It Right', focus: 'Audio recording & technical basics',
      coreActivity: 'Phone recording technique: distance, angle, background noise, levels. Record the same sentence in 3 different environments. Listen back — hear the difference. Introduce free editing tools (Audacity/GarageBand).',
      appliedTask: 'Record a 60-second "audio postcard" — describe your street using only sounds and your voice.',
      facilitatorNotes: 'Technical skills without creative purpose are boring. The audio postcard makes the technical practice meaningful. Quality matters but content matters more.',
      materials: ['Audio Snippet sandbox', 'Recording tips handout', 'Audacity/GarageBand download links'],
      sandboxLink: '/pathways/gtechcasters/planner',
      beforeSession: ['Test Audio Snippet sandbox', 'Prepare recording comparison demos'],
      afterSession: ['Listen to audio postcards', 'Compile best ones for Rayd-yo filler content'],
    },
    { week: 4, title: 'Structure a Segment', focus: 'Podcast/radio segment planning',
      coreActivity: 'Use the Podcast Segment Planner sandbox. Every segment needs: hook (why listen?), body (what\'s the story?), sign-off (what should they do/think/feel?). Plan a 2-minute segment.',
      appliedTask: 'Record your planned segment. Submit audio file.',
      facilitatorNotes: 'The hook is everything. If the first 10 seconds don\'t grab attention, nothing else matters. Play examples of great podcast openings.',
      materials: ['Podcast Segment Planner sandbox', 'Segment template', 'Great hooks compilation'],
      sandboxLink: '/pathways/gtechcasters/planner',
      beforeSession: ['Compile 5 great podcast hooks to play', 'Test sandbox'],
      afterSession: ['Review submitted segments', 'Select best for Rayd-yo pilot'],
    },
    { week: 5, title: 'Edit & Polish', focus: 'Audio editing basics',
      coreActivity: 'Take last week\'s raw recording. Cut the ums, fix the levels, add a simple intro sound. Learn: cut, fade, normalise, export. That\'s 80% of editing.',
      appliedTask: 'Re-edit your segment to broadcast quality. Maximum 2 minutes.',
      facilitatorNotes: 'Editing is where amateur becomes professional. But don\'t let perfection kill progress — "good enough for broadcast" is the standard, not "studio perfect."',
      materials: ['Editing tutorial video (pre-recorded)', 'Free sound effects library link'],
      beforeSession: ['Prepare step-by-step editing walkthrough', 'Share editing software links'],
      afterSession: ['Compare raw vs. edited versions', 'Select pieces for Rayd-yo broadcast'],
    },
    { week: 6, title: 'Go Live', focus: 'Live presenting & broadcast confidence',
      coreActivity: 'Simulate a live Rayd-yo broadcast. 3 participants present 2-minute segments back-to-back with live handovers. Practice: cue timing, speaking to camera/mic, recovering from mistakes.',
      appliedTask: 'Write and rehearse a 1-minute live read. Deliver it next session without notes.',
      facilitatorNotes: 'Live is terrifying. That\'s why we practice in a safe environment first. Mistakes are celebrated here — they\'re not allowed to be celebrated on air, so we learn to handle them now.',
      materials: ['Mock broadcast running order', 'Cue cards template', 'Timer'],
      beforeSession: ['Prepare running order', 'Brief participants on their slots'],
      afterSession: ['Record the mock broadcast', 'Feedback on delivery (private, constructive)'],
    },
    { week: 7, title: 'Document the Community', focus: 'Event coverage & photo journalism',
      coreActivity: 'If a Wembley Wonders event is happening, cover it live. If not, simulate: photograph/record a "community event" (could be as simple as a busy cafe or park). Practice: what to capture, who to interview, how to write it up.',
      appliedTask: 'Submit a mini event report: 3 photos, 2 quotes, 200-word write-up.',
      facilitatorNotes: 'This is where G-Tech Casters fulfils its purpose — documenting community life. The report feeds directly into Joystick. Real publication, real byline.',
      materials: ['Event coverage checklist', 'Photo composition guide', 'Write-up template'],
      beforeSession: ['Identify a coverable event or location', 'Prepare coverage checklist'],
      afterSession: ['Forward reports to Joystick editor', 'Archive audio/photos'],
    },
    { week: 8, title: 'Your Rayd-yo Debut', focus: 'First broadcast & celebration',
      coreActivity: 'Compile the best work from 8 weeks into a 15-minute Rayd-yo special. Participants introduce their own segments. Broadcast live (or record for scheduled broadcast). Community listens.',
      appliedTask: 'Final portfolio: your best interview, your best segment, your best event report.',
      facilitatorNotes: 'This is the payoff. Real broadcast, real audience, real bylines. Make it feel professional. Name everyone. Thank everyone. Connect completers to ongoing Rayd-yo production roles.',
      materials: ['Broadcast running order', 'Portfolio template', 'Rayd-yo scheduling system'],
      beforeSession: ['Finalise running order', 'Test broadcast setup', 'Invite community listeners'],
      afterSession: ['Archive the broadcast', 'Publish portfolios', 'Recruit for ongoing Rayd-yo team'],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// Kaywana's Court — 8 weeks
// Guide: Anansewa 🎭
// ═══════════════════════════════════════════════════════════════

export const KAYWANAS_COURT_FACILITATION: ProgrammeFacilitation = {
  programmeId: 'kaywanas_court',
  totalWeeks: 8,
  overview: 'From opinion to argument. Each week builds a different reasoning and performance skill — perspective-taking, structured debate, cultural analysis, and stage confidence — rooted in Caribbean heritage and diasporic experience.',
  weeklyGuides: [
    { week: 1, title: 'Take a Side', focus: 'Forming and defending positions',
      coreActivity: 'Present 3 fun debates (pineapple on pizza, homework abolition, school uniforms). Participants must pick a side INSTANTLY — no sitting on the fence. 30-second arguments. Celebrate the strongest reasoning, not the loudest voice.',
      appliedTask: 'Find one issue you care about. Write 3 sentences defending your position.',
      facilitatorNotes: 'The point is speed and commitment, not depth. Depth comes later. This week breaks the habit of "I don\'t know" and replaces it with "I think... because..."',
      materials: ['Debate topic cards', 'Position statement template'],
      beforeSession: ['Prepare 5 debate topics (fun ones)', 'Practice the format yourself'],
      afterSession: ['Note who shows natural debating instinct', 'Compile position statements'],
    },
    { week: 2, title: 'Steel Man', focus: 'Arguing the opposite side',
      coreActivity: 'Take your position from last week. Now argue the OPPOSITE. The "Steel Man" technique: make the strongest possible case for the side you disagree with. Why is this harder? What did you learn?',
      appliedTask: 'Write 3 sentences defending a position you personally disagree with.',
      facilitatorNotes: 'This is the hardest and most valuable exercise. Empathy is a reasoning skill, not just an emotional one. If someone can argue both sides, they understand the issue.',
      materials: ['Steel Man guide', 'Perspective-switching worksheet'],
      beforeSession: ['Prepare Steel Man examples', 'Brief on the emotional difficulty of this exercise'],
      afterSession: ['Discuss: what surprised you about arguing the other side?'],
    },
    { week: 3, title: 'Culture on Trial', focus: 'Cultural debate & heritage reasoning',
      coreActivity: 'Introduce a Caribbean cultural topic: "Should Carnival be funded by the council?" or "Does speaking Patois at school help or harm students?" Real debates with real stakes. Ground the arguments in evidence and experience.',
      appliedTask: 'Interview an elder about a cultural practice that\'s changing. What do they think? What do you think?',
      facilitatorNotes: 'This is where debate meets identity. Handle with care. There are no wrong answers about cultural experience, only weak and strong arguments. Validate lived experience as evidence.',
      materials: ['Cultural debate briefs', 'Elder interview guide', 'Heritage reasoning framework'],
      beforeSession: ['Prepare culturally sensitive debate topics', 'Test that topics land appropriately for the group'],
      afterSession: ['Compile elder interviews', 'Share with Auntie Anansi\'s Kitchen if relevant'],
    },
    { week: 4, title: 'Evidence vs. Emotion', focus: 'Distinguishing fact from feeling',
      coreActivity: 'Present arguments that mix facts and feelings. Can participants separate them? "Crime is rising" (feeling?) vs. "Crime statistics show..." (fact?). Practice: make the same argument twice — once with data, once with story. Which is more persuasive?',
      appliedTask: 'Rewrite one of your previous arguments using only evidence. Then only emotion. Compare.',
      facilitatorNotes: 'Neither evidence nor emotion is "better" — both are tools. The skill is knowing which you\'re using and when to switch. Many adults can\'t do this.',
      materials: ['Evidence vs. emotion worksheet', 'Statistics vs. stories examples'],
      beforeSession: ['Prepare mixed fact/feeling statements', 'Research local statistics for examples'],
      afterSession: ['Review argument rewrites', 'Note who handles nuance well'],
    },
    { week: 5, title: 'Character in Court', focus: 'Role-play & perspective performance',
      coreActivity: 'The Courtroom: present a scenario (neighbourhood dispute, school policy, family disagreement). Assign roles: prosecution, defence, witness, judge. Perform the "trial" using structured arguments.',
      appliedTask: 'Write closing arguments for your assigned role. 60 seconds, from memory.',
      facilitatorNotes: 'This combines debate skill with performance confidence. The "character" gives shy participants permission to be bold — they\'re not speaking as themselves.',
      materials: ['Scenario briefs', 'Role cards', 'Courtroom structure guide'],
      sandboxLink: '/programmes/kaywanas-court/sandbox',
      beforeSession: ['Prepare scenario and role assignments', 'Configure breakout rooms if needed'],
      afterSession: ['Record closing arguments', 'Connect strongest performers to Easy Street drama'],
    },
    { week: 6, title: 'The Ethical Edge', focus: 'Moral reasoning & dilemmas',
      coreActivity: 'Present genuine ethical dilemmas with no clear right answer: the trolley problem, the wallet dilemma, AI decision-making. Discussion format: 30 seconds silence, then structured debate. No consensus required.',
      appliedTask: 'Write about an ethical dilemma you\'ve personally faced. What did you decide? Would you change your mind now?',
      facilitatorNotes: 'Resist the urge to steer toward "right" answers. The goal is quality of reasoning, not correctness. Name the reasoning frameworks being used even if participants don\'t know the terms.',
      materials: ['Ethical dilemma cards', 'Reasoning framework reference sheet'],
      beforeSession: ['Prepare 5 dilemmas scaled by intensity', 'Read through them for cultural sensitivity'],
      afterSession: ['Compile personal dilemma writings', 'Note whose reasoning showed growth'],
    },
    { week: 7, title: 'Public Speaking', focus: 'Speech craft & delivery',
      coreActivity: 'Write and deliver a 2-minute speech on something you care about. Structure: hook, 3 points, close. Practice: eye contact (look at camera), pace (slower than you think), pauses (they\'re powerful).',
      appliedTask: 'Rehearse your speech 5 times. Record the 5th attempt. Compare to the 1st.',
      facilitatorNotes: 'Most people speak too fast and don\'t pause. Teach the power of silence. A 3-second pause feels like eternity to the speaker and emphasis to the audience.',
      materials: ['Speech structure template', 'Delivery checklist', 'Recording guide'],
      beforeSession: ['Prepare speech demo (do one yourself)', 'Share structure template early'],
      afterSession: ['Compare 1st vs. 5th recordings', 'Identify candidates for community speaking roles'],
    },
    { week: 8, title: 'The Grand Debate', focus: 'Formal debate & celebration',
      coreActivity: 'Full formal debate: motion, proposition, opposition, floor questions. Topic chosen by the group. Audience votes. Winner celebrated. Then: everyone reflects on how their thinking has changed over 8 weeks.',
      appliedTask: 'Portfolio: your strongest argument from the 8 weeks. Reflection: "I used to think... now I think..."',
      facilitatorNotes: 'The formal debate should feel like an EVENT. Invite an audience. Have a real motion. Use proper debate language. These participants can now out-argue most adults. Celebrate that.',
      materials: ['Debate format guide', 'Formal motion template', 'Voting cards', 'Portfolio template'],
      beforeSession: ['Agree motion with group', 'Invite audience', 'Prepare formal debate structure'],
      afterSession: ['Record the debate for Rayd-yo', 'Publish portfolios', 'Connect to Silk Stilettos for leadership pathway'],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// Remaining programmes — compact format
// ═══════════════════════════════════════════════════════════════

export const SILK_STILETTOS_FACILITATION: ProgrammeFacilitation = {
  programmeId: 'silk_stilettos', totalWeeks: 8,
  overview: 'From hesitation to presence. Each week builds a confidence and leadership skill for women — articulation, poise, negotiation, self-advocacy — in a supportive, women-only space.',
  weeklyGuides: [
    { week: 1, title: 'I Am Someone Who...', focus: 'Self-introduction & identity', coreActivity: 'Power pose. Then: complete "I am someone who..." — not job title, not role, but identity. Share. No apologies. No qualifiers.', appliedTask: 'Write 5 versions of your "I am" statement. Test the strongest one on someone real.', facilitatorNotes: 'Women habitually qualify themselves. "I\'m just a..." "I only..." Ban those words this week. This sets the tone for everything.', materials: ['I Am statement template'], beforeSession: ['Prepare your own I Am statement to model'], afterSession: ['Compile I Am statements into gallery'] },
    { week: 2, title: 'No Filler Words', focus: 'Articulation & verbal precision', coreActivity: 'Speak for 30 seconds on any topic. No ums, likes, sort-ofs, basically. Partners count fillers. Repeat. Track improvement. Then: why do we use fillers? What are they covering?', appliedTask: 'Record yourself talking for 60 seconds. Count your fillers. Try again.', facilitatorNotes: 'This isn\'t about perfection — it\'s about awareness. Once you hear your fillers, you start choosing words instead.', materials: ['Filler word counter sheet', 'Recording guide'], beforeSession: ['Prepare filler-counting exercise'], afterSession: ['Compare filler counts from start vs. end of session'] },
    { week: 3, title: 'Negotiate This', focus: 'Negotiation & assertive communication', coreActivity: 'Role-play: negotiate a raise, negotiate a better deal, say no to an unreasonable request. Practice the three-part response: acknowledge, state your position, propose alternative.', appliedTask: 'Negotiate something real this week. Report back.', facilitatorNotes: 'Many women have never been taught to negotiate. Frame it as a learnable skill, not a personality trait.', materials: ['Negotiation scenarios', 'Three-part response template'], beforeSession: ['Prepare 3 role-play scenarios'], afterSession: ['Celebrate real-world negotiations'] },
    { week: 4, title: 'Feedback Without Fear', focus: 'Giving and receiving critique', coreActivity: 'Practice giving feedback using the SBI model (Situation, Behavior, Impact). Then practice receiving it: listen, thank, decide what to keep. No defending.', appliedTask: 'Give SBI feedback to someone. Receive feedback from someone. Journal both.', facilitatorNotes: 'The receiving is harder than the giving. Model it yourself first.', materials: ['SBI framework card', 'Feedback journal template'], beforeSession: ['Prepare SBI examples'], afterSession: ['Discuss what surprised participants'] },
    { week: 5, title: 'Own the Room', focus: 'Physical presence & body language', coreActivity: 'Camera ON. Stand up. Take up space. Practice: entering a room, sitting at a table, greeting someone with authority. What changes when you lead with your body instead of your words?', appliedTask: 'Change one physical habit this week: posture, eye contact, handshake, voice projection.', facilitatorNotes: 'This is about the body, not the clothes. Presence is free. Teach it like a martial art — stance, breath, eye line.', materials: ['Body language guide', 'Presence checklist'], beforeSession: ['Research Amy Cuddy power pose (critique and value)', 'Prepare physical exercises'], afterSession: ['Check in on the physical habit change'] },
    { week: 6, title: 'The Pitch', focus: 'Selling yourself & your ideas', coreActivity: 'The 30-second elevator pitch for YOU. Not a business — you. Who are you, what do you do, why should someone listen? Practice, refine, deliver. Then: pitch an idea to the group.', appliedTask: 'Deliver your pitch to 3 people this week. Get feedback.', facilitatorNotes: 'Self-promotion feels uncomfortable for many women. Reframe: it\'s not bragging, it\'s informing. People can\'t support you if they don\'t know what you do.', materials: ['Pitch structure template', 'Feedback form'], beforeSession: ['Prepare pitch demo (yourself)'], afterSession: ['Compile pitch recordings'] },
    { week: 7, title: 'Lead From Where You Are', focus: 'Leadership without title', coreActivity: 'You don\'t need a title to lead. Discuss: moments when you led without being asked. How? What happened? Practice: take charge of a group task without being assigned leader.', appliedTask: 'Lead one thing this week — a conversation, a project, a meeting. Reflect.', facilitatorNotes: 'Many women lead daily without recognising it. Naming it is the first step to owning it.', materials: ['Leadership reflection worksheet'], beforeSession: ['Prepare everyday leadership examples'], afterSession: ['Share leadership stories'] },
    { week: 8, title: 'The Women\'s Circle', focus: 'Celebration & commitment', coreActivity: 'Each woman speaks for 2 minutes: what she learned, what changed, what she\'s committing to next. Circle format. Everyone faces everyone. Snap instead of clap.', appliedTask: 'Portfolio: your I Am statement (week 1 vs now), your pitch, your reflection.', facilitatorNotes: 'This is sacred space. No phones. No multitasking. Full presence. End with a collective commitment.', materials: ['Portfolio template', 'Circle guidelines', 'Commitment card'], beforeSession: ['Prepare celebration format', 'Send portfolio reminder early'], afterSession: ['Archive commitment cards', 'Connect to ongoing network'] },
  ],
};

export const BRIGHT_SPARKS_FACILITATION: ProgrammeFacilitation = {
  programmeId: 'bright_sparks', totalWeeks: 8,
  overview: 'Discovery, not specialisation. Each week exposes young minds to a different programme\'s thinking style — engineering, writing, debate, music, business — so they find what lights them up before committing.',
  weeklyGuides: [
    { week: 1, title: 'What Lights You Up?', focus: 'Self-discovery & interest mapping', coreActivity: 'Rapid taster: try 4 mini-challenges from different programmes (5 mins each). No pressure. Just notice: which one made time disappear?', appliedTask: 'Tell someone what you tried. What surprised you?', facilitatorNotes: 'This week is pure exploration. No teaching, no correction, no "you should try this." Let curiosity lead.', materials: ['SparkDiscoveryJourney sandbox', '4 mini-challenge components'], sandboxLink: '/programmes/bright-sparks/sandbox', beforeSession: ['Test all sandbox challenges load'], afterSession: ['Note which challenges drew the most engagement'] },
    { week: 2, title: 'Think Like a Scientist', focus: 'STEMgeneers crossover', coreActivity: 'STEMgeneers-style session: hypothesis thinking, the paper bridge challenge, pattern spotting. Guided by Kofi.', appliedTask: 'One "What if?" question about something you noticed this week.', facilitatorNotes: 'Use STEMgeneers sparks this week. This isn\'t about recruiting — it\'s about exposing thinking styles.', materials: ['Paper, tape for bridge', 'What-If cards'], beforeSession: ['Coordinate with STEMgeneers facilitator if available'], afterSession: ['Who thrived? Note for pathway recommendation.'] },
    { week: 3, title: 'Tell a Story', focus: 'Pageturners crossover', coreActivity: 'Pageturners-style: 6-word stories, freewriting, show-don\'t-tell. Everyone writes. Everyone shares one sentence.', appliedTask: 'Write something — anything — every day this week. Even a text message counts.', facilitatorNotes: 'Use Pageturners sparks. For participants who say "I can\'t write" — they already do. Every day.', materials: ['Six-Word Story sandbox', 'Freewrite prompts'], sandboxLink: '/programmes/pageturners/sandbox', beforeSession: ['Prepare freewrite prompts'], afterSession: ['Who surprised themselves? Note for Pageturners.'] },
    { week: 4, title: 'Make Some Noise', focus: 'Trubble n Bass crossover', coreActivity: 'Rhythm rounds, beat-making on the Drum Loop sandbox, collaborative groove building. Energy HIGH.', appliedTask: 'Find a song that tells a story. Share it next week with one sentence about why.', facilitatorNotes: 'Use Trubble n Bass sparks. This is the most physical/energetic session. Plan accordingly.', materials: ['Drum Loop sandbox'], sandboxLink: '/programmes/trubble-n-bass/sandbox', beforeSession: ['Test audio through Zoom', 'Prepare call-and-response exercise'], afterSession: ['Who found their rhythm? Note for TnB.'] },
    { week: 5, title: 'Argue Your Corner', focus: 'Kaywana\'s Court crossover', coreActivity: 'Quick debates, steel man arguments, the pineapple pizza defence. Fast, fun, forceful.', appliedTask: 'Argue the opposite of something you believe. With a friend. See what happens.', facilitatorNotes: 'Use Kaywana\'s Court sparks. Debate is the most transferable skill — it shows up everywhere.', materials: ['Debate topic cards', 'Character Creator sandbox'], sandboxLink: '/programmes/kaywanas-court/sandbox', beforeSession: ['Prepare debate topics appropriate for the age group'], afterSession: ['Who debated well? Note for KC.'] },
    { week: 6, title: 'Build a Business', focus: 'TECHreneurs crossover', coreActivity: '£10 startup challenge: what business could you start right now with £10? Pitch it in 30 seconds.', appliedTask: 'Ask 3 people if they\'d buy your idea. Report back honestly.', facilitatorNotes: 'Use TECHreneurs sparks. Many young people already sell things informally — validate that.', materials: ['Business canvas (simplified)', 'Pitch template'], beforeSession: ['Prepare local business examples teens can relate to'], afterSession: ['Who has entrepreneurial instinct? Note for TECHreneurs.'] },
    { week: 7, title: 'Create Something', focus: 'Cross-programme project', coreActivity: 'Using skills from weeks 2-6, create ONE thing that combines at least 2 programme areas. A business pitch written as a story. A debate about technology. A podcast about food.', appliedTask: 'Finish your cross-programme creation. Prepare to present it.', facilitatorNotes: 'This is where the discovery crystallises into direction. Watch what combinations each participant gravitates toward.', materials: ['Project brief template', 'All sandbox links'], beforeSession: ['Prepare example cross-programme projects'], afterSession: ['Note each participant\'s natural combination'] },
    { week: 8, title: 'Your Spark Report', focus: 'Pathway recommendation & celebration', coreActivity: 'Each participant presents their creation (2 mins). Then receive their personalised "Spark Report" — which programmes lit them up, recommended next steps, and an invitation to join a specific pathway.', appliedTask: 'Choose your next programme. Sign up. Tell someone.', facilitatorNotes: 'The Spark Report is the whole point. Every participant should leave knowing EXACTLY what to do next. No vagueness. No "come back sometime." A specific programme, a specific date.', materials: ['Spark Report template', 'Programme calendar', 'Signup links'], beforeSession: ['Prepare personalised Spark Reports', 'Confirm next programme dates'], afterSession: ['Track conversions from Bright Sparks to programmes', 'Celebrate every signup'] },
  ],
};

export const TRUBBLE_N_BASS_FACILITATION: ProgrammeFacilitation = {
  programmeId: 'trubble_n_bass', totalWeeks: 8,
  overview: 'From listener to creator. Every week builds a music production or performance skill — rhythm, arrangement, recording, mixing — resulting in a track ready for Rayd-yo broadcast.',
  weeklyGuides: [
    { week: 1, title: 'Feel the Rhythm', focus: 'Rhythm, timing & body percussion', coreActivity: 'Clap-along rhythms, body percussion, call-and-response. No instruments, no tech — just bodies making sound. Build a group groove from scratch.', appliedTask: 'Record a 15-second rhythm using only household objects. Share in group chat.', facilitatorNotes: 'Start with the body, not the screen. Rhythm is physical before it\'s digital. Zoom latency means call-and-response, not simultaneous.', materials: ['Rhythm pattern cards', 'Household percussion guide'], beforeSession: ['Prepare 5 rhythm patterns', 'Test audio through Zoom'], afterSession: ['Listen to household rhythms', 'Note who has natural timing'] },
    { week: 2, title: 'Build a Beat', focus: 'Drum machine & pattern creation', coreActivity: 'Use the Drum Loop sandbox. Build a 4-bar loop. Layer kick, snare, hi-hat. Introduce the concept of the grid. Share beats via screen share.', appliedTask: 'Create 3 different beats. Save screenshots. Which one grooves?', facilitatorNotes: 'The sandbox is the entry point but BandLab/GarageBand is the destination. Show the connection.', materials: ['Drum Loop sandbox', 'Beat genre reference (4-on-the-floor, breakbeat, trap)'], sandboxLink: '/programmes/trubble-n-bass/sandbox', beforeSession: ['Test sandbox', 'Prepare genre examples'], afterSession: ['Gallery of beats created', 'Share DAW installation guides'] },
    { week: 3, title: 'Add a Bassline', focus: 'Melody basics & bass patterns', coreActivity: 'A beat without bass is just a skeleton. Introduce 3-note basslines over last week\'s beats. Use free DAW or Trubble n Bass Pro if available. Discuss: why does bass make you feel things?', appliedTask: 'Add a bassline to your beat. Record and share.', facilitatorNotes: 'Bass is felt, not just heard. Play examples through speakers, not laptop — the physical vibration matters for understanding.', materials: ['Bassline pattern guide', 'DAW tutorial (pre-recorded)'], beforeSession: ['Prepare bassline examples in 3 genres', 'Test audio quality for bass frequencies'], afterSession: ['Review bass + beat combos', 'Connect strongest to advanced production'] },
    { week: 4, title: 'Sample & Flip', focus: 'Sampling, chopping & creative reuse', coreActivity: 'What is sampling? Play 5 famous samples and their originals. Then: chop a provided sample and rearrange it into something new. Discuss: creativity, copyright, culture.', appliedTask: 'Find a sound (nature, voice, kitchen) and sample it into your beat.', facilitatorNotes: 'Sampling is where Caribbean culture meets digital production. Discuss sound system culture, versioning, dubplates — this has roots.', materials: ['Sample packs', 'Copyright basics handout', 'Chopping tutorial'], beforeSession: ['Prepare sample recognition quiz', 'Clear copyright on provided samples'], afterSession: ['Listen to flipped samples', 'Discuss cultural context of sampling'] },
    { week: 5, title: 'Arrangement', focus: 'Song structure & arrangement', coreActivity: 'A loop isn\'t a song. Introduce: intro, verse, chorus, bridge, outro. Map a favourite song\'s structure. Then: arrange your beat into a 1-minute track with at least 3 sections.', appliedTask: 'Arrange your track. Export it. It should have a beginning, middle, and end.', facilitatorNotes: 'This is the leap from beatmaker to producer. The arrangement is where the story lives.', materials: ['Song structure diagrams', 'Arrangement template'], beforeSession: ['Prepare structure analysis of 3 well-known tracks'], afterSession: ['Review arrangements', 'Note who understands musical storytelling'] },
    { week: 6, title: 'Mix It Down', focus: 'Basic mixing: levels, panning, EQ', coreActivity: 'Why do some tracks sound professional and others don\'t? Introduce: volume balance, left/right panning, EQ (cut before boost). Mix last week\'s arrangement.', appliedTask: 'A/B test: share your "before mixing" and "after mixing" versions. Which is better? Why?', facilitatorNotes: 'Mixing is where most beginners get lost. Keep it simple: levels, pan, one EQ move. That\'s it. Resist the urge to teach compression this early.', materials: ['Mixing basics tutorial', 'A/B comparison examples'], beforeSession: ['Prepare before/after mixing examples', 'Simplify the mixing checklist'], afterSession: ['Compare mixes', 'Celebrate improvement over perfection'] },
    { week: 7, title: 'Collaborate', focus: 'Working with others & live performance', coreActivity: 'Pair up. Combine elements from two people\'s tracks into one collaboration. Or: one person produces, another writes/performs over it. The skill is negotiation and creative compromise.', appliedTask: 'Finish your collaboration. Credit both artists. Export final version.', facilitatorNotes: 'Collaboration is where ego meets art. Some will struggle to share creative control. That\'s the learning.', materials: ['Collaboration agreement template', 'File sharing guide'], beforeSession: ['Pair participants thoughtfully', 'Prepare collaboration brief'], afterSession: ['Listen to collaborations', 'Note how partnerships formed'] },
    { week: 8, title: 'Release Day', focus: 'Playback, feedback & Rayd-yo broadcast', coreActivity: 'Listening party: play every track through proper speakers (or best available). Community audience if possible. Each artist introduces their track: what they made, what they learned, what\'s next.', appliedTask: 'Final portfolio: your best beat, your best track, your collaboration. Artist bio (50 words).', facilitatorNotes: 'Make it feel like a real release. Proper intros. Proper applause. Rayd-yo broadcast date announced. These are producers now.', materials: ['Listening party running order', 'Portfolio template', 'Rayd-yo scheduling'], beforeSession: ['Prepare running order', 'Test playback quality', 'Invite audience'], afterSession: ['Schedule Rayd-yo broadcasts', 'Publish artist profiles', 'Connect to ongoing production opportunities'] },
  ],
};

export const AUNTIE_ANANSI_FACILITATION: ProgrammeFacilitation = {
  programmeId: 'auntie_anansi', totalWeeks: 8,
  overview: 'Preserve before it\'s lost. Each week documents a different aspect of Caribbean and diasporic food heritage — recipes, stories, techniques, rituals — building a living archive that belongs to the community.',
  weeklyGuides: [
    { week: 1, title: 'The Kitchen Table', focus: 'Memory, food & identity', coreActivity: '"What\'s one dish that means home?" Everyone shares. No recipes yet — just memories. What did it smell like? Who made it? When? This is oral history dressed as cooking.', appliedTask: 'Ask an elder: "What\'s the one dish you\'d want remembered?" Record their answer.', facilitatorNotes: 'Go slow. These memories carry weight. Don\'t rush anyone. Tears are okay. Laughter is okay. Both are heritage.', materials: ['Memory prompt cards', 'Audio recording guide'], beforeSession: ['Prepare your own food memory to share first'], afterSession: ['Compile food memories', 'Transcribe any recordings'] },
    { week: 2, title: 'Measure by Heart', focus: 'Documenting unmeasured recipes', coreActivity: 'How do you write down "a handful" or "cook it till it smells right"? Practice converting intuitive measurements to written form WITHOUT losing the soul. Demonstrate: document a recipe live.', appliedTask: 'Document one family recipe. Include the measurements AND the stories around them.', facilitatorNotes: 'The recipe is the skeleton. The story is the body. Both matter. A recipe without context is just instructions.', materials: ['Family Recipe sandbox', 'Recipe documentation template'], sandboxLink: '/programmes/auntie-anansis-kitchen/sandbox', beforeSession: ['Test Family Recipe sandbox', 'Prepare demo recipe documentation'], afterSession: ['Review recipe submissions', 'Note which carry the richest stories'] },
    { week: 3, title: 'Ingredients Tell Stories', focus: 'Food history & trade routes', coreActivity: 'Where does ackee come from? Why is rice so central? Trace 3 ingredients from origin to plate. Every ingredient carries history — colonialism, trade, migration, survival. Food IS history.', appliedTask: 'Research one ingredient your family uses regularly. Where did it come from? How did it get to Wembley?', facilitatorNotes: 'This is history through the kitchen. For participants who say "I\'m not academic" — you just researched a supply chain spanning 500 years.', materials: ['Ingredient history cards', 'Trade route maps'], beforeSession: ['Prepare 3 ingredient histories with Caribbean context'], afterSession: ['Compile ingredient research', 'Create visual timeline if possible'] },
    { week: 4, title: 'The Technique', focus: 'Cooking methods & cultural knowledge', coreActivity: 'What\'s the difference between how your grandmother cooks and how a recipe book teaches? Discuss: techniques passed down by watching, not reading. Season by taste, not tablespoon. Document 3 techniques.', appliedTask: 'Record an elder demonstrating a technique. Even 30 seconds is valuable.', facilitatorNotes: 'This is the knowledge most at risk of being lost. Video is essential. Don\'t wait for perfect conditions — record now.', materials: ['Technique documentation template', 'Video recording tips'], beforeSession: ['Prepare examples of documented techniques'], afterSession: ['Archive all video recordings', 'Transcribe key techniques'] },
    { week: 5, title: 'Food & Gathering', focus: 'Meals as social infrastructure', coreActivity: 'When does food build community? Sunday dinner. Funeral food. Festival cooking. Nine-night. Discuss: what role does food play beyond nutrition? Map the social functions of meals in your family/community.', appliedTask: 'Describe one meal that was about more than food. What was really happening?', facilitatorNotes: 'Food is the excuse for gathering. The gathering is the infrastructure. This is community development through cuisine.', materials: ['Social meal mapping template', 'Community function cards'], beforeSession: ['Prepare examples of meals as community infrastructure'], afterSession: ['Compile social meal descriptions', 'Connect to Impact Labs for community analysis angle'] },
    { week: 6, title: 'Modern Kitchen', focus: 'Adapting heritage for today', coreActivity: 'How do you cook saltfish when you live in a studio flat? How do you make callaloo when the nearest Caribbean shop is 40 minutes away? Practical adaptation without losing authenticity.', appliedTask: 'Adapt a traditional recipe for modern constraints. Document both versions.', facilitatorNotes: 'Adaptation isn\'t betrayal. The tradition survives by evolving. But name what you\'re changing and why.', materials: ['Adaptation template', 'Ingredient substitution guide'], beforeSession: ['Research local ingredient availability', 'Prepare adaptation examples'], afterSession: ['Compare traditional vs. adapted versions', 'Note creative solutions'] },
    { week: 7, title: 'Publish the Heritage', focus: 'Creating the community cookbook', coreActivity: 'Compile all recipes, stories, techniques, and adaptations into a community cookbook format. Each participant contributes at least one complete entry. Design the layout. Choose photos.', appliedTask: 'Final entry: your best recipe, your elder\'s story, your ingredient research. Submit for the cookbook.', facilitatorNotes: 'This is where documentation becomes publication. Frame it as: "Your grandmother\'s knowledge, preserved for your grandchildren."', materials: ['Cookbook template', 'Layout examples', 'Photo selection guide'], beforeSession: ['Prepare cookbook template', 'Collect all previous submissions'], afterSession: ['Compile cookbook draft', 'Forward to G-Tech Casters for production'] },
    { week: 8, title: 'The Table Is Set', focus: 'Celebration & tasting', coreActivity: 'If in person: everyone brings one dish. If online: everyone cooks simultaneously on camera. Share the food, share the stories, share the gratitude. The archive is launched.', appliedTask: 'Cook your documented recipe. Share a photo. Tag it as part of the collection.', facilitatorNotes: 'This should feel like a family gathering, not a class ending. The cookbook/archive is the legacy. Every participant\'s name is in it.', materials: ['Cookbook launch materials', 'Photo sharing platform', 'Archive link'], beforeSession: ['Confirm format (in-person vs. online)', 'Prepare cookbook launch announcement'], afterSession: ['Publish cookbook/archive', 'Send to all contributors', 'Connect to Rayd-yo for food show opportunity'] },
  ],
};

export const IMPACT_LABS_FACILITATION: ProgrammeFacilitation = {
  programmeId: 'impact_labs', totalWeeks: 8,
  overview: 'Research that leads to action. Each week builds a different civic reasoning skill — problem definition, evidence gathering, stakeholder mapping, solution design — culminating in a genuine community proposal.',
  weeklyGuides: [
    { week: 1, title: 'What\'s Actually Wrong?', focus: 'Problem definition vs. complaint', coreActivity: '"Wembley has too much litter" is a complaint. "Litter bins on High Road are overflowing by 2pm because collection happens at 6am" is a problem definition. Practise converting complaints into researchable questions.', appliedTask: 'Convert 3 complaints you hear regularly into problem definitions.', facilitatorNotes: 'This is the most important lesson. Most community projects fail because they solve the wrong problem. Precision matters.', materials: ['Complaint → Problem worksheet', 'Local issue examples'], beforeSession: ['Collect 5 real Wembley complaints from social media/forums'], afterSession: ['Review problem definitions', 'Star the most precise'] },
    { week: 2, title: 'Who\'s Affected?', focus: 'Stakeholder mapping', coreActivity: 'Every problem has multiple stakeholders who see it differently. Map them: who causes it, who suffers, who benefits from the status quo, who has power to change it. Use the litter example, then apply to participant problems.', appliedTask: 'Create a stakeholder map for your problem. Interview one stakeholder this week.', facilitatorNotes: 'The stakeholder who benefits from the status quo is the one most people miss. Finding them is where analysis gets sharp.', materials: ['Stakeholder mapping template', 'Interview guide'], beforeSession: ['Prepare stakeholder map example', 'Share interview template'], afterSession: ['Review stakeholder maps', 'Identify power dynamics'] },
    { week: 3, title: 'Find the Evidence', focus: 'Research methods (simple)', coreActivity: 'Three ways to find evidence: observation (go look), interview (ask people), data (find numbers). Practice all three for the same problem. Compare: which tells you the most?', appliedTask: 'Collect evidence for your problem using all 3 methods. Bring findings.', facilitatorNotes: 'Keep it simple. A 20-minute observation counts. A 3-question interview counts. A Google search for local statistics counts. The skill is triangulation.', materials: ['Evidence collection template', 'Local data sources list'], beforeSession: ['Compile accessible local data sources', 'Prepare observation guide'], afterSession: ['Review evidence quality', 'Teach source evaluation basics'] },
    { week: 4, title: 'What\'s Already Tried?', focus: 'Existing solutions & gaps', coreActivity: 'Before proposing solutions, find out what\'s been tried. Research existing approaches to your problem. What worked? What didn\'t? Why? Don\'t reinvent the wheel — improve it.', appliedTask: 'Find 3 existing approaches to your problem. Analyse strengths and weaknesses.', facilitatorNotes: 'This prevents the "why hasn\'t anyone thought of this before?" trap. Usually someone has. The question is why it failed.', materials: ['Solution analysis template', 'Web research guide'], beforeSession: ['Prepare examples of attempted solutions'], afterSession: ['Review analyses', 'Identify genuine gaps'] },
    { week: 5, title: 'Design a Solution', focus: 'Proposal design & theory of change', coreActivity: 'Your solution must answer: what will you do, who will it help, how will you know it worked? Introduce simple theory of change: if we do X, then Y will change, because Z. Build proposals.', appliedTask: 'Write your proposal: problem, evidence, solution, expected outcome. One page.', facilitatorNotes: 'Theory of change sounds academic but it\'s just "if...then...because." Make it practical. Every proposal should be something Wembley Wonders could actually implement.', materials: ['Theory of change template', 'Proposal template'], beforeSession: ['Prepare theory of change examples'], afterSession: ['Review proposals', 'Identify feasible ones for real consideration'] },
    { week: 6, title: 'Budget It', focus: 'Resource planning & costing', coreActivity: 'Solutions cost money, time, and people. Estimate all three for your proposal. What can be done for free? What needs funding? What could Wembley Wonders provide? Be realistic.', appliedTask: 'Add a budget to your proposal. Include volunteer time as a real cost.', facilitatorNotes: 'Costing volunteer time teaches participants their labour has value — even when unpaid. This connects to the CIC\'s anti-extraction philosophy.', materials: ['Budget template', 'Resource estimation guide'], beforeSession: ['Prepare budget examples from real community projects'], afterSession: ['Review budgets for realism', 'Flag unrealistic assumptions kindly'] },
    { week: 7, title: 'Present to Power', focus: 'Presenting proposals to decision-makers', coreActivity: 'Practice presenting your proposal as if to the council, a funder, or a director. 3 minutes. Clear, evidence-based, solution-focused. Q&A from peers acting as decision-makers.', appliedTask: 'Refine based on feedback. Prepare final presentation.', facilitatorNotes: 'The Q&A practice is crucial. Decision-makers ask hard questions. Teach: "I don\'t know, but I\'ll find out" is a strong answer.', materials: ['Presentation template', 'Q&A preparation guide'], beforeSession: ['Brief peer panel on asking tough questions'], afterSession: ['Note strongest presenters for real council/board opportunities'] },
    { week: 8, title: 'The Pitch to the Board', focus: 'Real proposal & celebration', coreActivity: 'Present final proposals to Wembley Wonders directors (Judith, Flora, Michael if available). Best proposals get considered for real implementation. Every participant gets feedback.', appliedTask: 'Portfolio: problem definition, evidence, stakeholder map, proposal, budget, presentation.', facilitatorNotes: 'This should feel consequential. Proposals that are good enough should genuinely be considered. This isn\'t a school exercise — it\'s community development.', materials: ['Director briefing pack', 'Portfolio template', 'Feedback forms'], beforeSession: ['Brief directors on proposals', 'Prepare feedback forms', 'Confirm attendance'], afterSession: ['Follow up on feasible proposals', 'Connect participants to CIC governance pathway', 'Document for impact reporting'] },
  ],
};

export const CREATOR_FACTORY_FACILITATION: ProgrammeFacilitation = {
  programmeId: 'creator_factory', totalWeeks: 8,
  overview: 'Make things under constraints. Each week sets a creative challenge with tight limits — time, materials, format — building the muscle of producing under pressure and iterating fast.',
  weeklyGuides: [
    { week: 1, title: '90-Second Logo', focus: 'Rapid creation & constraint-based design', coreActivity: '90 seconds to design a logo using only 2 letters. Go. Then: 90 seconds to redesign it. And again. The third attempt is always better. Why? Discuss: iteration > perfection.', appliedTask: 'Design 5 logos for imaginary businesses. Spend max 2 minutes each.', facilitatorNotes: 'Speed kills perfectionism. That\'s the point. The participants who struggle most with time pressure are the ones who need this most.', materials: ['Paper/digital drawing tool', 'Timer'], beforeSession: ['Prepare logo challenge brief', 'Test timer visibility'], afterSession: ['Gallery of logos', 'Vote on favourites'] },
    { week: 2, title: '3 Shapes, 2 Colours', focus: 'Working within material constraints', coreActivity: 'Create a poster for Wembley Wonders using only 3 geometric shapes and 2 colours. No text. No photos. Can it still communicate? Discuss: when constraints force clarity.', appliedTask: 'Create 3 posters for 3 different events. Same constraint: 3 shapes, 2 colours.', facilitatorNotes: 'Constraints aren\'t limitations — they\'re creative fuel. The best design often comes from the tightest brief.', materials: ['Design tools (Canva/paper)', 'Constraint brief card'], beforeSession: ['Prepare constraint brief', 'Show examples of constrained design'], afterSession: ['Gallery of posters', 'Discuss which communicated most clearly'] },
    { week: 3, title: 'Redesign the Ordinary', focus: 'Observation & improvement thinking', coreActivity: 'Take an everyday object (a bus stop, a menu, a receipt). What\'s wrong with it? Redesign it. Sketch. Prototype. Present: here\'s what I changed and why.', appliedTask: 'Photograph 3 badly designed things. Sketch improvements for one.', facilitatorNotes: 'This is design thinking made physical. Once you start seeing bad design, you can\'t stop. That\'s the mindset shift.', materials: ['Bad design gallery', 'Redesign template', 'Sketch tools'], beforeSession: ['Curate 5 examples of bad everyday design'], afterSession: ['Gallery of redesigns', 'Vote on most improved'] },
    { week: 4, title: 'Emoji Story', focus: 'Visual communication & narrative', coreActivity: 'Tell a story using only 5 emojis. Others decode. Then: design a set of 3 custom icons that explain a process (making tea, catching a bus, applying for a job). Visual language without words.', appliedTask: 'Design a 5-icon instruction set for something complex. Test it on someone — do they understand?', facilitatorNotes: 'This teaches information hierarchy and visual logic. If your icons need explanation, they\'re not working yet.', materials: ['Icon design brief', 'User testing template'], beforeSession: ['Prepare emoji story examples'], afterSession: ['Test icon sets on external users'] },
    { week: 5, title: 'Sound Design', focus: 'Audio as creative medium', coreActivity: 'Create a 30-second soundscape for a Wembley location. No music — just environmental sounds, layered. What does the market sound like? The park? The stadium on match day?', appliedTask: 'Record and edit your soundscape. Submit audio file.', facilitatorNotes: 'Sound is underused in most creative work. This challenges visual-dominant thinking.', materials: ['Audio recording tips', 'Free editing tools', 'Layering tutorial'], beforeSession: ['Prepare soundscape examples', 'Test audio sharing'], afterSession: ['Listening session for soundscapes', 'Connect to Trubble n Bass and G-Tech Casters'] },
    { week: 6, title: '24-Hour Project', focus: 'Rapid production under deadline', coreActivity: 'Announce a brief at the START of the session. Participants have until the NEXT session (1 week, but framed as urgent) to complete it. Brief: create a 1-minute video/audio/visual piece that answers "What does Wembley need?"', appliedTask: 'Complete the brief. Submit before next session. Late = not accepted.', facilitatorNotes: 'The deadline IS the lesson. Real creative work has deadlines. Practice meeting them.', materials: ['Creative brief', 'Submission form with deadline'], beforeSession: ['Prepare brief (keep it open-ended)'], afterSession: ['Screening of all submissions', 'Discuss: what did time pressure reveal?'] },
    { week: 7, title: 'Collaborate Under Pressure', focus: 'Team creation & creative conflict', coreActivity: 'Teams of 3. One brief. 30 minutes. Create a campaign (poster + tagline + 30-second audio) for a real Wembley Wonders event. Present to the group. Vote.', appliedTask: 'Reflect: what was hardest about collaborating? What worked?', facilitatorNotes: 'Creative collaboration is a skill, not a natural state. Conflict over creative direction is normal and healthy when managed well.', materials: ['Campaign brief', 'Team assignments', 'Voting cards'], beforeSession: ['Assign teams strategically', 'Prepare brief with real event context'], afterSession: ['Winning campaign used for real event if quality allows'] },
    { week: 8, title: 'Portfolio & Premiere', focus: 'Curation, presentation & next steps', coreActivity: 'Each participant curates their 3 best pieces into a portfolio. Present: what you made, what you learned, what you\'d do next. Community screening/gallery of all work.', appliedTask: 'Final portfolio: 3 pieces, 50-word artist statement, 1 piece nominated for Joystick publication.', facilitatorNotes: 'Curation is the final skill — knowing what to show and what to hide. An artist statement forces articulation of creative intent.', materials: ['Portfolio template', 'Artist statement guide', 'Screening/gallery format'], beforeSession: ['Prepare screening format', 'Invite wider community'], afterSession: ['Publish portfolios', 'Forward Joystick nominations', 'Connect to ongoing projects'] },
  ],
};

// Easy Street already has full facilitation guides at /workshops/easy-street/facilitation
// Reference only:
export const EASY_STREET_FACILITATION: ProgrammeFacilitation = {
  programmeId: 'easy_street', totalWeeks: 6,
  overview: 'Radio drama from scratch. 6-week intensive writing lab that produces a complete drama series bible for G-Tech Casters production. See /workshops/easy-street/facilitation for full session guides.',
  weeklyGuides: [
    { week: 1, title: 'The World', focus: 'World-building & setting', coreActivity: 'Full session guide at /workshops/easy-street/facilitation', appliedTask: 'See facilitation guide', facilitatorNotes: 'Use the dedicated Easy Street facilitation page for this programme.', materials: ['See Easy Street facilitation guide'], beforeSession: ['Review Easy Street facilitation guide Week 1'], afterSession: ['Follow Easy Street after-session checklist'] },
    { week: 2, title: 'The People', focus: 'Character development', coreActivity: 'See facilitation guide', appliedTask: 'See facilitation guide', facilitatorNotes: '', materials: [], beforeSession: [], afterSession: [] },
    { week: 3, title: 'The Conflict', focus: 'Plot & dramatic tension', coreActivity: 'See facilitation guide', appliedTask: 'See facilitation guide', facilitatorNotes: '', materials: [], beforeSession: [], afterSession: [] },
    { week: 4, title: 'The Voices', focus: 'Dialogue & sound', coreActivity: 'See facilitation guide', appliedTask: 'See facilitation guide', facilitatorNotes: '', materials: [], beforeSession: [], afterSession: [] },
    { week: 5, title: 'The Climax', focus: 'Rising action & resolution', coreActivity: 'See facilitation guide', appliedTask: 'See facilitation guide', facilitatorNotes: '', materials: [], beforeSession: [], afterSession: [] },
    { week: 6, title: 'The Bible', focus: 'Series bible & handover', coreActivity: 'See facilitation guide', appliedTask: 'See facilitation guide', facilitatorNotes: '', materials: [], beforeSession: [], afterSession: [] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// MASTER INDEX
// ═══════════════════════════════════════════════════════════════

export const ALL_FACILITATIONS: Record<string, ProgrammeFacilitation> = {
  stemgeneers: STEMGENEERS_FACILITATION,
  techreneurs: TECHRENEURS_FACILITATION,
  pageturners: PAGETURNERS_FACILITATION,
  gtechcasters: GTECHCASTERS_FACILITATION,
  kaywanas_court: KAYWANAS_COURT_FACILITATION,
  silk_stilettos: SILK_STILETTOS_FACILITATION,
  bright_sparks: BRIGHT_SPARKS_FACILITATION,
  trubble_n_bass: TRUBBLE_N_BASS_FACILITATION,
  auntie_anansi: AUNTIE_ANANSI_FACILITATION,
  impact_labs: IMPACT_LABS_FACILITATION,
  creator_factory: CREATOR_FACTORY_FACILITATION,
  easy_street: EASY_STREET_FACILITATION,
};

export function getFacilitationByParam(param: string): ProgrammeFacilitation | null {
  if (ALL_FACILITATIONS[param]) return ALL_FACILITATIONS[param];
  const underscored = param.replace(/-/g, '_');
  if (ALL_FACILITATIONS[underscored]) return ALL_FACILITATIONS[underscored];
  return null;
}