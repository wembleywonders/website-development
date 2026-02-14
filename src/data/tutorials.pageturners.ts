/**
 * PAGETURNERS TUTORIALS
 * =====================
 * 
 * 3 free tutorials per pathway = 9 free total
 * ROV-H (Heritage) guide throughout
 */

import { Tutorial } from '../types/tutorial';

export const PAGETURNERS_TUTORIALS: Tutorial[] = [
  // ========================================
  // READING & BOOK CLUBS PATHWAY
  // ========================================
  {
    id: 'starting-book-club',
    slug: 'starting-book-club',
    title: 'Starting a Book Club',
    description: 'Create community around books. Planning, selecting, and keeping a book club alive.',
    icon: '📚',
    programmes: ['pageturners'],
    primaryProgramme: 'pageturners',
    pathway: 'Reading & Book Clubs',
    tags: ['book club', 'community', 'reading', 'organizing'],
    difficulty: 'beginner',
    duration: '30 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    steps: [
      { step: 1, title: 'Define Your Focus', description: 'All books? Caribbean literature? Business books? Memoir? Focus attracts the right members. Too broad = unclear identity.', rovPrompt: 'What makes a good book club theme?' },
      { step: 2, title: 'Find Your People', description: 'Start with 4-8 committed members. Quality over quantity. Ask: friends, colleagues, social media, existing groups.', checkpoint: true },
      { step: 3, title: 'Decide Meeting Format', description: 'In-person, virtual, or hybrid. Monthly is standard. Same day/time each month. Consistency builds habit.' },
      { step: 4, title: 'Book Selection Process', description: 'Options: rotate who chooses, vote from shortlist, theme by month. Mix approaches. Everyone should feel heard.', tip: 'Create a "to-read" list together. Plan several books ahead.' },
      { step: 5, title: 'Structure Your Meetings', description: 'Casual chat (15 mins) → Discussion (45-60 mins) → Next book decision (15 mins). Having structure helps quieter members.' },
      { step: 6, title: 'Discussion Questions', description: 'Prepare 5-8 questions. Mix: plot, characters, themes, personal connection. Open-ended questions create conversation.' },
      { step: 7, title: 'Handling Different Opinions', description: 'Disagreement is healthy. Create safe space for different views. "What did you think?" not "Didn\'t you think it was great?"' },
      { step: 8, title: 'Keeping Momentum', description: 'Reminders 1 week before. Recap for those who didn\'t finish. Occasional author events or social meetups. Celebrate milestones.' }
    ],
    tools: [
      { name: 'Meeting space (or Zoom)', price: 'Free-varies', essential: true },
      { name: 'Communication channel (WhatsApp/Slack)', price: 'Free', essential: true },
      { name: 'Discussion questions', price: 'Free (prepare)', essential: true }
    ],
    commonMistakes: ['Too many members too fast', 'No meeting structure', 'Same person always chooses books', 'Not accommodating different reading speeds', 'Letting dominating personalities take over'],
    freeAccess: true,
    kit: { name: 'Book Club Starter Pack', slug: 'bookclub-starter', price: '£9.99', contents: ['Discussion question templates', 'Meeting agenda templates', 'Book tracking sheets', 'Caribbean reading list'] },
    workshop: { title: 'Book Club Leadership', duration: '1.5 hours', price: '£20', format: 'zoom', bookingSlug: 'bookclub-leadership' },
    nextTutorials: ['leading-discussions', 'caribbean-literature-intro'],
    badgeAwarded: 'book-club-founder',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'leading-discussions',
    slug: 'leading-discussions',
    title: 'Leading Book Discussions',
    description: 'Facilitate conversations that go deeper. Drawing out quiet members, handling tangents, and creating insight.',
    icon: '💬',
    programmes: ['pageturners', 'kaywanas-court'],
    primaryProgramme: 'pageturners',
    pathway: 'Reading & Book Clubs',
    tags: ['facilitation', 'discussion', 'leadership', 'books'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    steps: [
      { step: 1, title: 'Preparation Is Key', description: 'Read the book. Make notes. Prepare questions. Research author/context. Your preparation sets the quality ceiling.', tip: 'Flag pages with sticky notes for specific discussion points.' },
      { step: 2, title: 'Opening the Discussion', description: 'Start with low-stakes question: "What was your first impression?" Warm up before deep questions. Build confidence.', checkpoint: true },
      { step: 3, title: 'Question Types', description: 'Text questions: "What happened when..." Theme questions: "How does this explore..." Personal questions: "Did this remind you of..."', rovPrompt: 'Give me discussion questions for a Caribbean novel.' },
      { step: 4, title: 'Drawing Out Quiet Members', description: 'Direct questions gently: "[Name], you mentioned earlier... what did you mean?" Create space. Don\'t force. Follow up later privately.' },
      { step: 5, title: 'Managing Dominant Voices', description: '"Great point—let\'s hear from others." "We haven\'t heard from everyone on this." Redirect without embarrassing.' },
      { step: 6, title: 'Handling Tangents', description: 'Some tangents are valuable. Redirect gently: "Interesting—let\'s note that and come back. First, what about..." Balance spontaneity and structure.' },
      { step: 7, title: 'Going Deeper', description: '"Why do you think that?" "Can you point to a passage?" "How does that connect to...?" Push beyond surface reactions.' },
      { step: 8, title: 'Closing Strong', description: 'Summarize key insights. Ask: "What will you take away?" Preview next book. Thank everyone. End on time.' }
    ],
    tools: [
      { name: 'Prepared questions', price: 'Free', essential: true },
      { name: 'The book', price: 'Varies', essential: true },
      { name: 'Facilitation skills', price: 'This tutorial', essential: true }
    ],
    commonMistakes: ['No preparation', 'Talking more than listening', 'Not redirecting dominant voices', 'Surface-level questions only', 'Running over time'],
    freeAccess: true,
    workshop: { title: 'Discussion Facilitation', duration: '2 hours', price: '£25', format: 'zoom', bookingSlug: 'discussion-facilitation' },
    nextTutorials: ['caribbean-literature-intro', 'theme-discussions'],
    badgeAwarded: 'facilitator',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'caribbean-literature-intro',
    slug: 'caribbean-literature-intro',
    title: 'Introduction to Caribbean Literature',
    description: 'From Naipaul to Kincaid, Selvon to Danticat. Understanding the tradition and finding your reading path.',
    icon: '🏝️',
    programmes: ['pageturners'],
    primaryProgramme: 'pageturners',
    pathway: 'Reading & Book Clubs',
    tags: ['caribbean', 'literature', 'heritage', 'reading'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    steps: [
      { step: 1, title: 'Why Caribbean Literature?', description: 'Stories of our experiences. Migration, identity, colonialism, home, belonging. Literature that speaks to and for us.', rovPrompt: 'What are the key themes in Caribbean literature?' },
      { step: 2, title: 'The Pioneers', description: 'Sam Selvon, George Lamming, V.S. Naipaul, Derek Walcott. Mid-20th century foundation. Windrush generation writing experience.', checkpoint: true },
      { step: 3, title: 'Women\'s Voices', description: 'Jamaica Kincaid, Edwidge Danticat, Andrea Levy, Zadie Smith. Different perspectives, different stories. Essential reading.' },
      { step: 4, title: 'Poetry Tradition', description: 'Derek Walcott, Kamau Brathwaite, Lorna Goodison, Claudia Rankine. Poetry as powerful vehicle for Caribbean experience.' },
      { step: 5, title: 'The Diaspora Experience', description: 'Caryl Phillips, Bernardine Evaristo, NoViolet Bulawayo. Caribbean literature extends beyond the islands. Migration continues.' },
      { step: 6, title: 'Contemporary Voices', description: 'Marlon James, Kei Miller, Nicole Dennis-Benn, Ingrid Persaud. Prize-winning, boundary-pushing, right now.', tip: 'Follow Caribbean literary prizes: Bocas, OCM, Jhalak.' },
      { step: 7, title: 'Where to Start', description: 'Sam Selvon "The Lonely Londoners." Andrea Levy "Small Island." Jamaica Kincaid "A Small Place." Begin here.' },
      { step: 8, title: 'Building Your Reading', description: 'Mix classics and contemporary. Fiction and non-fiction. Different islands, different experiences. Build your library.' }
    ],
    tools: [
      { name: 'Library card', price: 'Free', essential: true },
      { name: 'Reading list', price: 'In kit', essential: true },
      { name: 'Time to read', price: 'Priceless', essential: true }
    ],
    commonMistakes: ['Only reading one author', 'Ignoring poetry', 'Not including women writers', 'Only classic, not contemporary', 'Not reading widely across islands'],
    freeAccess: true,
    kit: { name: 'Caribbean Reading Pack', slug: 'caribbean-reading', price: '£14.99', contents: ['Essential reading list', 'Author biographies', 'Discussion guides', 'Literary timeline'] },
    workshop: { title: 'Caribbean Literature Journey', duration: '2 hours', price: '£25', format: 'zoom', bookingSlug: 'caribbean-lit' },
    nextTutorials: ['theme-discussions', 'building-home-library'],
    badgeAwarded: 'caribbean-reader',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // CREATIVE WRITING PATHWAY
  // ========================================
  {
    id: 'finding-your-voice',
    slug: 'finding-your-voice',
    title: 'Finding Your Writing Voice',
    description: 'What makes YOUR writing yours? Developing the authentic voice that makes your work distinctive.',
    icon: '✍️',
    programmes: ['pageturners'],
    primaryProgramme: 'pageturners',
    pathway: 'Creative Writing',
    tags: ['voice', 'style', 'authenticity', 'writing'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    steps: [
      { step: 1, title: 'What Is Voice?', description: 'Your distinctive way of seeing and saying. Not technique (that\'s craft). Voice is personality on the page. You have one already.', rovPrompt: 'How do I know if I\'ve found my voice?' },
      { step: 2, title: 'Read to Find Yourself', description: 'Read widely. Notice what resonates. What makes you think "I want to write like that"? Those are clues to your voice.' },
      { step: 3, title: 'Write Like Yourself', description: 'Don\'t perform sophistication. Write how you think, how you talk (refined). Your background is not a weakness—it\'s your material.', checkpoint: true },
      { step: 4, title: 'The Imitation Phase', description: 'Copying voices you admire is part of learning. Through imitation, you find what fits. Eventually, synthesis creates something new.', tip: 'Deliberately imitate three different writers. Notice what emerges.' },
      { step: 5, title: 'Language and Heritage', description: 'Your languages, your dialects, your code-switching—this is richness, not error. Caribbean writers use Creole and Standard. So can you.' },
      { step: 6, title: 'Exercise: Freewriting', description: '15 minutes. Don\'t stop. Don\'t edit. Don\'t think. Just write. Your voice emerges when your internal editor is asleep.' },
      { step: 7, title: 'Exercise: Voice Experiment', description: 'Write the same scene three ways: formal, casual, in dialect. Which feels most like you? Which serves the story?' },
      { step: 8, title: 'Consistency Develops', description: 'Voice becomes clearer with practice. The more you write, the more your voice solidifies. Trust the process.' }
    ],
    tools: [
      { name: 'Notebook or document', price: 'Free', essential: true },
      { name: 'Time to write (daily)', price: 'Priceless', essential: true },
      { name: 'Books you love', price: 'Library', essential: true }
    ],
    commonMistakes: ['Forcing a voice', 'Suppressing your natural speech', 'Only imitating one writer', 'Thinking voice is permanent (it evolves)', 'Editing before drafting'],
    freeAccess: true,
    workshop: { title: 'Voice Workshop', duration: '2 hours', price: '£30', format: 'zoom', bookingSlug: 'voice-workshop' },
    nextTutorials: ['writing-habit-building', 'short-story-structure'],
    badgeAwarded: 'voice-finder',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'writing-habit-building',
    slug: 'writing-habit-building',
    title: 'Building a Writing Habit',
    description: 'Writers write. Creating the sustainable practice that produces work, even when you don\'t feel like it.',
    icon: '📅',
    programmes: ['pageturners'],
    primaryProgramme: 'pageturners',
    pathway: 'Creative Writing',
    tags: ['habit', 'discipline', 'productivity', 'writing'],
    difficulty: 'beginner',
    duration: '30 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    steps: [
      { step: 1, title: 'Waiting for Inspiration Fails', description: 'Inspiration visits those who show up. Write regularly, and ideas come. Wait for motivation, and you wait forever.' },
      { step: 2, title: 'Find Your Time', description: 'When can you consistently write? Early morning? Lunch break? After kids sleep? Find time you can protect. Same time daily.', checkpoint: true },
      { step: 3, title: 'Start Small', description: '15 minutes daily beats 4 hours once a week. Consistency builds momentum. Small habits become big outputs.', rovPrompt: 'Help me design a writing schedule that works.' },
      { step: 4, title: 'Remove Barriers', description: 'Set up the night before. Close other tabs. Use app blockers. Make starting as easy as possible. Resistance kills.' },
      { step: 5, title: 'Word Count Goals', description: '200 words/day = novel draft in a year. 500 words/day = faster. Goals should be achievable. Exceeding feels great.', tip: 'Track your word count. Seeing progress motivates more progress.' },
      { step: 6, title: 'Protect the Time', description: 'This is not optional. This is important. Don\'t give it away because others ask. Boundaries protect your writing.' },
      { step: 7, title: 'Handle Off Days', description: 'Some days are hard. Write anyway—even badly. Or: write about why you can\'t write. Showing up is the win.' },
      { step: 8, title: 'Reward Consistency', description: 'Track streaks. Celebrate milestones. Tell supportive people. Positive reinforcement helps habits stick.' }
    ],
    tools: [
      { name: 'Writing space', price: 'Free', essential: true },
      { name: 'Timer', price: 'Phone has one', essential: true },
      { name: 'Tracking method', price: 'Free (spreadsheet or app)', essential: true }
    ],
    commonMistakes: ['Starting too big', 'No consistent time', 'Not tracking', 'Perfectionism stopping progress', 'Breaking streak and not restarting'],
    freeAccess: true,
    workshop: { title: 'Writing Habit Bootcamp', duration: '1.5 hours', price: '£20', format: 'zoom', bookingSlug: 'habit-bootcamp' },
    nextTutorials: ['short-story-structure', 'overcoming-blocks'],
    badgeAwarded: 'consistent-writer',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'short-story-structure',
    slug: 'short-story-structure',
    title: 'Short Story Structure',
    description: 'Craft complete narratives in limited space. The architecture of short fiction that satisfies.',
    icon: '📖',
    programmes: ['pageturners'],
    primaryProgramme: 'pageturners',
    pathway: 'Creative Writing',
    tags: ['short story', 'structure', 'fiction', 'craft'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    steps: [
      { step: 1, title: 'What Is a Short Story?', description: 'Not a small novel. Different form. One main character, one central conflict, one significant change. Focus is everything.' },
      { step: 2, title: 'The Hook', description: 'First paragraph must grab. Start in motion, in tension, in interest. Readers decide quickly. Earn their attention.', checkpoint: true },
      { step: 3, title: 'Character and Desire', description: 'Your character wants something. Badly. The story is them pursuing that want. Clear desire = clear story.', rovPrompt: 'How do I create a compelling character quickly?' },
      { step: 4, title: 'Conflict and Obstacle', description: 'Something blocks the desire. External (another person, situation) or internal (fear, flaw). No conflict = no story.' },
      { step: 5, title: 'Rising Action', description: 'Stakes escalate. Complications arise. Each scene raises tension. Building toward the peak.' },
      { step: 6, title: 'The Turn', description: 'Something shifts. Character learns, fails, succeeds, realizes. The moment the story pivots. Often near the end.' },
      { step: 7, title: 'Resolution', description: 'The new state after the turn. Doesn\'t need to be happy. Needs to feel complete. Avoid tidy explanations.' },
      { step: 8, title: 'Economy of Words', description: 'Short stories require discipline. Every sentence must work. Cut everything that doesn\'t serve the story.' }
    ],
    tools: [
      { name: 'Story idea', price: 'Free (yours)', essential: true },
      { name: 'Structure template', price: 'In kit', essential: false },
      { name: 'Model short stories to study', price: 'Library', essential: true }
    ],
    commonMistakes: ['Too many characters', 'No clear conflict', 'Weak opening', 'Over-explaining ending', 'Story that\'s really a scene'],
    freeAccess: true,
    kit: { name: 'Short Story Toolkit', slug: 'story-toolkit', price: '£12.99', contents: ['Structure templates', 'Example stories with analysis', 'Prompt cards', 'Editing checklist'] },
    workshop: { title: 'Short Story Writing', duration: '3 hours', price: '£40', format: 'zoom', bookingSlug: 'short-story' },
    nextTutorials: ['dialogue-basics', 'revision-editing'],
    badgeAwarded: 'storyteller',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // PUBLISHING PATHWAY
  // ========================================
  {
    id: 'publishing-paths',
    slug: 'publishing-paths',
    title: 'Understanding Publishing Paths',
    description: 'Traditional, indie, self-publishing explained. The options, trade-offs, and what fits your goals.',
    icon: '🛤️',
    programmes: ['pageturners', 'techreneurs'],
    primaryProgramme: 'pageturners',
    pathway: 'Publishing',
    tags: ['publishing', 'traditional', 'self-publishing', 'indie'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    alternativeGuides: ['ROV-B'],
    steps: [
      { step: 1, title: 'Three Main Paths', description: 'Traditional (publisher pays you). Self-publishing (you control everything). Indie press (middle ground). Each has trade-offs.' },
      { step: 2, title: 'Traditional Publishing', description: 'Agent → Publisher → Editing → Production → Distribution. You get advance + royalties (10-15%). Long process. Gatekept.', checkpoint: true },
      { step: 3, title: 'Pros of Traditional', description: 'No upfront cost. Professional editing/design. Bookstore distribution. Prestige. Marketing support (sometimes).', rovPrompt: 'Is traditional publishing still worth pursuing?' },
      { step: 4, title: 'Cons of Traditional', description: 'Years to get deal. Low royalties. Lose creative control. Can go out of print. Most submissions rejected.' },
      { step: 5, title: 'Self-Publishing', description: 'You do everything (or hire it). 35-70% royalties. Total control. Immediate publication. All costs upfront.' },
      { step: 6, title: 'Pros of Self-Publishing', description: 'Full control. Higher royalties per book. Fast to market. Rights remain yours. No gatekeepers.' },
      { step: 7, title: 'Cons of Self-Publishing', description: 'Upfront costs. You handle everything. Harder to get bookstore placement. Stigma (decreasing). Marketing is all you.' },
      { step: 8, title: 'Choosing Your Path', description: 'Goals matter. Fame/prestige? Traditional. Control/income? Self. Literary respect? Maybe indie press. No wrong answer—just fit.' }
    ],
    tools: [
      { name: 'Understanding of your goals', price: 'Reflection', essential: true },
      { name: 'Market research', price: 'Free (online)', essential: true },
      { name: 'Patience', price: 'Priceless', essential: true }
    ],
    commonMistakes: ['Thinking one path is "best"', 'Not understanding royalties', 'Rushing into decision', 'Ignoring hybrid options', 'Underestimating self-pub work'],
    freeAccess: true,
    kit: { name: 'Publishing Path Guide', slug: 'pub-guide', price: '£14.99', contents: ['Decision framework', 'Cost comparison', 'Timeline examples', 'Publisher/agent list'] },
    workshop: { title: 'Publishing Options Explored', duration: '2 hours', price: '£30', format: 'zoom', bookingSlug: 'pub-options' },
    nextTutorials: ['query-letter-writing', 'self-publishing-basics'],
    badgeAwarded: 'publishing-aware',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'query-letter-writing',
    slug: 'query-letter-writing',
    title: 'Writing a Query Letter',
    description: 'The letter that opens doors. How to pitch your book to agents and publishers in 300 words.',
    icon: '✉️',
    programmes: ['pageturners'],
    primaryProgramme: 'pageturners',
    pathway: 'Publishing',
    tags: ['query', 'agents', 'traditional publishing', 'pitching'],
    difficulty: 'intermediate',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    steps: [
      { step: 1, title: 'What\'s a Query Letter?', description: 'One-page pitch to literary agents. First impression. Gets you read or rejected. The most important 300 words you\'ll write.' },
      { step: 2, title: 'Research the Agent', description: 'Query agents who represent your genre. Mention specific books they\'ve represented that relate to yours. Personalization matters.', checkpoint: true },
      { step: 3, title: 'The Hook', description: 'First sentence grabs attention. Character + situation + stakes in one compelling line. Practice until perfect.', rovPrompt: 'Help me write a hook for my novel.' },
      { step: 4, title: 'The Story Summary', description: 'One paragraph. Main character, what they want, what\'s stopping them, what happens if they fail. End before the climax—leave them wanting.' },
      { step: 5, title: 'Comparative Titles', description: '"My book is X meets Y" or "Fans of X will enjoy this." Show where your book fits. Choose recent, successful comps.' },
      { step: 6, title: 'Your Bio', description: 'Relevant credentials only. Publication history, platform, expertise relevant to book. No fluff. No life story.' },
      { step: 7, title: 'Closing', description: 'Thank them. Word count and genre. Full manuscript available on request. Professional sign-off.' },
      { step: 8, title: 'Revision and Feedback', description: 'Get feedback before sending. Multiple revisions. Query writing groups exist. One typo can sink you.' }
    ],
    tools: [
      { name: 'Completed, polished manuscript', price: 'Your work', essential: true },
      { name: 'Agent research', price: 'Free (QueryTracker, etc.)', essential: true },
      { name: 'Feedback from others', price: 'Writing community', essential: true }
    ],
    commonMistakes: ['Querying before manuscript is ready', 'Generic opening', 'Plot summary too long', 'No personality', 'Not researching agent'],
    freeAccess: true,
    kit: { name: 'Query Kit', slug: 'query-kit', price: '£12.99', contents: ['Query templates', 'Example successful queries', 'Agent tracking spreadsheet', 'Comp title guide'] },
    workshop: { title: 'Query Letter Workshop', duration: '2 hours', price: '£35', format: 'zoom', bookingSlug: 'query-workshop' },
    nextTutorials: ['synopsis-writing', 'submission-strategy'],
    badgeAwarded: 'query-writer',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'self-publishing-basics',
    slug: 'self-publishing-basics',
    title: 'Self-Publishing Basics',
    description: 'From manuscript to marketplace. The essential steps to publish your book yourself, professionally.',
    icon: '📕',
    programmes: ['pageturners', 'techreneurs'],
    primaryProgramme: 'pageturners',
    pathway: 'Publishing',
    tags: ['self-publishing', 'amazon', 'ebook', 'print'],
    difficulty: 'beginner',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-H',
    alternativeGuides: ['ROV-B'],
    steps: [
      { step: 1, title: 'When Manuscript Is Ready', description: 'Revised. Beta read. Edited (professionally). This is not optional. Unpolished books damage your reputation.', warning: 'Do not skip professional editing. Readers can tell.' },
      { step: 2, title: 'Editing Levels', description: 'Developmental (structure). Line editing (prose). Copy editing (grammar). Proofreading (errors). Budget for at least copy edit.', checkpoint: true },
      { step: 3, title: 'Cover Design', description: 'Covers sell books. Hire a professional. Study your genre\'s covers. Budget £100-500 for good cover.', rovPrompt: 'Where can I find affordable book cover designers?' },
      { step: 4, title: 'Interior Formatting', description: 'Ebook (.epub, .mobi) and print formatting. Different requirements. Tools: Vellum (Mac), Reedsy, Atticus. Or hire.', tip: 'Reedsy offers free formatting and connects you with professionals.' },
      { step: 5, title: 'Amazon KDP', description: 'Biggest platform. Free to publish. 35% or 70% royalties depending on price. Kindle Unlimited exclusivity optional.' },
      { step: 6, title: 'Wide Distribution', description: 'Non-exclusive: IngramSpark (libraries, bookshops), Kobo, Apple Books, Google Play. More complex, wider reach.' },
      { step: 7, title: 'Pricing Strategy', description: 'Ebooks: £2.99-9.99 for 70% royalty. Print: cost + margin. Research comparable books. Don\'t underprice—devalues work.' },
      { step: 8, title: 'Launch Planning', description: 'Build audience before launch. Reviews ready day one. Launch is beginning, not end. Marketing is ongoing.' }
    ],
    tools: [
      { name: 'Polished manuscript', price: 'Your work', essential: true },
      { name: 'Professional cover', price: '£100-500', essential: true },
      { name: 'Formatting software', price: 'Free-£250', essential: true },
      { name: 'Amazon KDP account', price: 'Free', essential: true }
    ],
    commonMistakes: ['Skipping professional editing', 'DIY cover', 'No launch plan', 'Wrong pricing', 'Expecting instant sales'],
    freeAccess: true,
    kit: { name: 'Self-Pub Starter Pack', slug: 'self-pub-pack', price: '£24.99', contents: ['Publishing checklist', 'Service provider directory', 'Pricing calculator', 'Launch timeline template'] },
    workshop: { title: 'Self-Publishing Masterclass', duration: '3 hours', price: '£50', format: 'zoom', bookingSlug: 'self-pub-master' },
    nextTutorials: ['book-marketing', 'building-author-platform'],
    badgeAwarded: 'self-publisher',
    lastUpdated: '2024-12-26',
    version: '1.0'
  }
];

export default PAGETURNERS_TUTORIALS;