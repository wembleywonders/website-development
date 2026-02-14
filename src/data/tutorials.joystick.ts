/**
 * JOYSTICK TUTORIALS
 * ==================
 * 
 * 3 free tutorials per pathway = 9 free total
 * ROV-M (Media) guide throughout
 */

import { Tutorial } from '../../types/tutorial';

export const JOYSTICK_TUTORIALS: Tutorial[] = [
  // ========================================
  // GAMING JOURNALISM PATHWAY
  // ========================================
  {
    id: 'game-review-writing',
    slug: 'game-review-writing',
    title: 'Writing Game Reviews',
    description: 'Beyond "it\'s good" or "it\'s bad." Craft reviews that inform, entertain, and build your voice.',
    icon: '⭐',
    programmes: ['joystick'],
    primaryProgramme: 'joystick',
    pathway: 'Gaming Journalism',
    tags: ['review', 'writing', 'journalism', 'criticism'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    steps: [
      { step: 1, title: 'Play the Game Properly', description: 'Finish the story. Try multiplayer. Explore systems. You can\'t review what you haven\'t experienced. Take notes while playing.', tip: 'Screenshot or clip interesting moments for reference.' },
      { step: 2, title: 'Know Your Audience', description: 'Who reads your reviews? Casual gamers? Hardcore? Genre fans? Write for them. What do THEY need to know?', rovPrompt: 'How do I identify my target audience for game reviews?' },
      { step: 3, title: 'Structure Your Review', description: 'Hook → Context (genre, developer) → Gameplay → Story → Technical → Verdict. Readers should be able to skim or deep read.', checkpoint: true },
      { step: 4, title: 'Describe, Don\'t Just Rate', description: '"The combat is satisfying" is vague. "Each swing carries weight, with enemies staggering realistically" is specific. Show, don\'t tell.' },
      { step: 5, title: 'Compare Thoughtfully', description: '"Like Dark Souls but..." only works if the comparison is apt. Don\'t compare everything to the same games. Know your references.' },
      { step: 6, title: 'Address Who It\'s For', description: 'A great game isn\'t for everyone. "Fans of X will love this. If you bounced off Y, this won\'t change your mind." Help readers self-select.' },
      { step: 7, title: 'Scores and Verdicts', description: 'If you use scores, be consistent. 7/10 must mean the same thing every time. Many prefer verdict summary over numbers.' },
      { step: 8, title: 'Your Voice Matters', description: 'Reviews are opinion. Own yours. Don\'t hedge everything. Strong takes (well-argued) build readership.' }
    ],
    tools: [
      { name: 'The game', price: 'Varies (review copies later)', essential: true },
      { name: 'Note-taking system', price: 'Free', essential: true },
      { name: 'Time to play properly', price: 'Commitment', essential: true }
    ],
    commonMistakes: ['Reviewing without finishing', 'All description, no opinion', 'Same structure every time', 'Not considering audience', 'Score doesn\'t match text'],
    freeAccess: true,
    kit: { name: 'Review Writing Pack', slug: 'review-pack', price: '£9.99', contents: ['Review templates', 'Note-taking sheets', 'Example reviews analysed', 'Pitch templates'] },
    workshop: { title: 'Game Review Workshop', duration: '2 hours', price: '£30', format: 'zoom', bookingSlug: 'review-workshop' },
    nextTutorials: ['feature-writing', 'building-portfolio'],
    badgeAwarded: 'game-reviewer',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'feature-writing',
    slug: 'feature-writing',
    title: 'Feature Writing for Games',
    description: 'Beyond reviews: essays, investigations, and long-form pieces that explore games deeply.',
    icon: '📰',
    programmes: ['joystick', 'pageturners'],
    primaryProgramme: 'joystick',
    pathway: 'Gaming Journalism',
    tags: ['feature', 'essay', 'journalism', 'long-form'],
    difficulty: 'intermediate',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    steps: [
      { step: 1, title: 'What Is a Feature?', description: 'Not news (timely). Not review (consumer guide). Feature explores, investigates, argues. Has a thesis. Takes time.' },
      { step: 2, title: 'Finding Your Angle', description: 'What hasn\'t been said? What connection do you see? What question are you answering? "I\'m writing about X" needs "because Y."', checkpoint: true },
      { step: 3, title: 'Research and Reporting', description: 'Features need evidence. Play games, read widely, talk to developers/players. Your insight must be supported.', rovPrompt: 'How do I research for a gaming feature?' },
      { step: 4, title: 'Structure for Features', description: 'Hook → Establish stakes → Build argument → Evidence/examples → Counter-argument → Conclusion. Logic matters.' },
      { step: 5, title: 'Personal vs Analytical', description: 'Personal essays: your experience is the subject. Analytical: games are the subject. Know which you\'re writing. Both valid.' },
      { step: 6, title: 'Interviews and Sources', description: 'Quotes from developers, players, experts add credibility. Learn basic interview skills. Attribute properly.' },
      { step: 7, title: 'Word Count and Pacing', description: 'Features are longer (1,500-5,000+ words). But every section must earn its place. Cut ruthlessly. Long ≠ good.' },
      { step: 8, title: 'Pitching Features', description: 'Publications want pitches before finished pieces. Show: what, why now, why you, word count, deadline. Be professional.' }
    ],
    tools: [
      { name: 'Research materials', price: 'Free-varies', essential: true },
      { name: 'Interview equipment', price: 'Phone recorder works', essential: false },
      { name: 'Writing time', price: 'Significant', essential: true }
    ],
    commonMistakes: ['No clear thesis', 'Not enough research', 'Too long without substance', 'No original insight', 'Writing feature before pitching'],
    freeAccess: true,
    workshop: { title: 'Feature Writing Intensive', duration: '3 hours', price: '£40', format: 'zoom', bookingSlug: 'feature-intensive' },
    nextTutorials: ['interview-skills', 'pitching-editors'],
    badgeAwarded: 'feature-writer',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'building-portfolio',
    slug: 'building-portfolio',
    title: 'Building a Games Writing Portfolio',
    description: 'No clips? No problem. Creating work samples that get you hired, even starting from zero.',
    icon: '📁',
    programmes: ['joystick', 'gtech-casters'],
    primaryProgramme: 'joystick',
    pathway: 'Gaming Journalism',
    tags: ['portfolio', 'career', 'freelance', 'clips'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    alternativeGuides: ['ROV-B'],
    steps: [
      { step: 1, title: 'Start Where You Are', description: 'No publications yet? Write anyway. Your blog counts. Medium counts. Spec work counts. Start now.', tip: 'Write the pieces you want to be hired for.' },
      { step: 2, title: 'Choose Your Niche', description: 'What do you want to write about? RPGs? Indies? Esports? Niche expertise gets noticed faster than "general games."', checkpoint: true },
      { step: 3, title: 'Create 3-5 Strong Pieces', description: 'Quality over quantity. One excellent feature beats ten mediocre reviews. Make each portfolio piece your best work.', rovPrompt: 'What types of pieces should be in my portfolio?' },
      { step: 4, title: 'Personal Site Setup', description: 'yourname.com with your best work. WordPress, Squarespace, Cargo—keep it simple. Make work easy to find and read.' },
      { step: 5, title: 'Unpaid Work Strategy', description: 'Some unpaid work is necessary starting out. Be strategic: for clips, for relationships, for learning. Not forever.', warning: 'Know when to stop writing for free. Your work has value.' },
      { step: 6, title: 'Small Publications First', description: 'Don\'t pitch IGN day one. Smaller sites, community blogs, zines. Build clips, build relationships, build up.' },
      { step: 7, title: 'Social Presence', description: 'Twitter/Bluesky for games writing community. Share your work. Engage thoughtfully. Editors notice. Don\'t be annoying.' },
      { step: 8, title: 'Keep Creating', description: 'Portfolio is never done. Regular new work. Skills improve. Replace old pieces with better ones.' }
    ],
    tools: [
      { name: 'Writing platform (blog)', price: 'Free', essential: true },
      { name: 'Personal website', price: 'Free-£10/month', essential: true },
      { name: 'Social media presence', price: 'Free', essential: true }
    ],
    commonMistakes: ['Waiting to start', 'Too broad a focus', 'Only spec reviews', 'Ugly website', 'Stopping when you get one clip'],
    freeAccess: true,
    kit: { name: 'Portfolio Building Pack', slug: 'portfolio-pack', price: '£14.99', contents: ['Website templates', 'Portfolio piece prompts', 'Pitch templates', 'Publication list'] },
    workshop: { title: 'Portfolio Building Workshop', duration: '2 hours', price: '£30', format: 'zoom', bookingSlug: 'portfolio-workshop' },
    nextTutorials: ['pitching-editors', 'freelance-basics'],
    badgeAwarded: 'portfolio-builder',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // E-ZINE PRODUCTION PATHWAY
  // ========================================
  {
    id: 'zine-planning',
    slug: 'zine-planning',
    title: 'Planning Your E-Zine',
    description: 'From concept to content plan. Defining your zine\'s identity and building sustainable editorial calendar.',
    icon: '📐',
    programmes: ['joystick'],
    primaryProgramme: 'joystick',
    pathway: 'E-Zine Production',
    tags: ['zine', 'planning', 'editorial', 'publishing'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    steps: [
      { step: 1, title: 'Define Your Zine', description: 'What\'s it about? Who\'s it for? What makes it different? One sentence pitch. If you can\'t say it simply, you haven\'t defined it.', rovPrompt: 'Help me define my gaming e-zine concept.' },
      { step: 2, title: 'Recurring Sections', description: 'Regulars give structure. Reviews, features, interviews, columns, art showcase. Readers know what to expect. Writers know what to pitch.', checkpoint: true },
      { step: 3, title: 'Issue Frequency', description: 'Monthly is common. Quarterly is sustainable. Weekly is brutal. Be honest about capacity. Better consistent than ambitious then absent.' },
      { step: 4, title: 'Editorial Calendar', description: 'Plan issues ahead. Tentative themes, deadlines, publication dates. Creates predictability. Helps recruit contributors.' },
      { step: 5, title: 'Solo vs Collective', description: 'Solo: total control, all the work. Collective: distributed effort, coordination challenges. Start solo, grow to collective often works.' },
      { step: 6, title: 'Contributor Strategy', description: 'Will you pay? (You should eventually.) How will you find writers? Clear guidelines, fair treatment, good editing = return contributors.' },
      { step: 7, title: 'Digital Format Decisions', description: 'PDF (traditional zine feel), web-based (accessible), both (more work). Consider accessibility and ease of reading.' },
      { step: 8, title: 'Sustainability Planning', description: 'Free with ads? Paid? Patreon-supported? How will this exist in a year? Plan for sustainability from day one.' }
    ],
    tools: [
      { name: 'Planning document', price: 'Free', essential: true },
      { name: 'Calendar/scheduling tool', price: 'Free', essential: true },
      { name: 'Clear vision', price: 'Reflection', essential: true }
    ],
    commonMistakes: ['No clear identity', 'Over-ambitious frequency', 'No contributor plan', 'No sustainability model', 'Starting before planning'],
    freeAccess: true,
    kit: { name: 'E-Zine Planning Pack', slug: 'ezine-planning', price: '£14.99', contents: ['Editorial calendar templates', 'Contributor guidelines template', 'Budget planner', 'Launch checklist'] },
    workshop: { title: 'E-Zine Planning Session', duration: '2 hours', price: '£30', format: 'zoom', bookingSlug: 'ezine-planning' },
    nextTutorials: ['zine-layout-design', 'managing-contributors'],
    badgeAwarded: 'zine-planner',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'zine-layout-design',
    slug: 'zine-layout-design',
    title: 'E-Zine Layout & Design',
    description: 'Make your zine look as good as it reads. Layout principles, tools, and creating consistent visual identity.',
    icon: '🎨',
    programmes: ['joystick', 'silk-stilettos'],
    primaryProgramme: 'joystick',
    pathway: 'E-Zine Production',
    tags: ['design', 'layout', 'visual', 'zine'],
    difficulty: 'beginner',
    duration: '45 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    alternativeGuides: ['ROV-C'],
    steps: [
      { step: 1, title: 'Visual Identity', description: 'Logo, colours, fonts. Consistent across issues. Creates recognition. Doesn\'t need to be complex—needs to be consistent.', checkpoint: true },
      { step: 2, title: 'Choose Your Tools', description: 'Canva (free, easy). Adobe InDesign (industry standard). Affinity Publisher (affordable). Google Docs even works for simple zines.', rovPrompt: 'What\'s the best layout tool for beginners?' },
      { step: 3, title: 'Typography Basics', description: 'Two fonts maximum: heading and body. Readable size. Enough contrast. Consistent hierarchy. Bad typography = unreadable.' },
      { step: 4, title: 'Grid System', description: 'Invisible structure that aligns everything. Two or three column grids work well. Creates order without monotony.' },
      { step: 5, title: 'White Space', description: 'Empty space is not wasted space. Margins, padding, breathing room. Cramped pages are hard to read.' },
      { step: 6, title: 'Image Handling', description: 'High resolution only. Consistent treatment (borders, shapes). Credit artists. Balance text and image.' },
      { step: 7, title: 'Create Templates', description: 'Article template, review template, interview template. Speeds up production. Creates consistency.' },
      { step: 8, title: 'Accessibility', description: 'Readable fonts. Good contrast. Alt text for images. PDF should be screen-reader compatible. Everyone should be able to read it.' }
    ],
    tools: [
      { name: 'Design software', price: 'Free-£50/month', essential: true },
      { name: 'Font sources (Google Fonts)', price: 'Free', essential: true },
      { name: 'Image sources', price: 'Free (Unsplash) or paid', essential: true }
    ],
    commonMistakes: ['Too many fonts', 'No white space', 'Inconsistent style', 'Low-res images', 'Ignoring accessibility'],
    freeAccess: true,
    kit: { name: 'E-Zine Design Pack', slug: 'ezine-design', price: '£19.99', contents: ['Canva templates', 'Font pairing guide', 'Colour palette examples', 'Grid templates'] },
    workshop: { title: 'Zine Design Workshop', duration: '3 hours', price: '£40', format: 'zoom', bookingSlug: 'zine-design' },
    nextTutorials: ['cover-design', 'production-workflow'],
    badgeAwarded: 'zine-designer',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'managing-contributors',
    slug: 'managing-contributors',
    title: 'Managing Contributors',
    description: 'Editor skills: working with writers, giving feedback, hitting deadlines, building a team that returns.',
    icon: '👥',
    programmes: ['joystick'],
    primaryProgramme: 'joystick',
    pathway: 'E-Zine Production',
    tags: ['editing', 'management', 'contributors', 'team'],
    difficulty: 'intermediate',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    alternativeGuides: ['ROV-B'],
    steps: [
      { step: 1, title: 'Clear Guidelines', description: 'What you publish. Word counts. Style guide. How to pitch. Payment (be clear). Good guidelines reduce bad pitches.', tip: 'Make guidelines public. Share widely. Update as needed.' },
      { step: 2, title: 'Handling Pitches', description: 'Respond to all pitches. Yes, no, or revision. Timely responses (within a week). Respect writers\' time.', checkpoint: true },
      { step: 3, title: 'Commissioning Process', description: 'Agree: topic, angle, word count, deadline, fee. In writing. Prevent misunderstandings. Professional from the start.', rovPrompt: 'What should be in a commission agreement?' },
      { step: 4, title: 'Giving Editorial Feedback', description: 'Specific and constructive. "This section is unclear" not "this is bad." Suggest solutions. Remember: their name is on it.' },
      { step: 5, title: 'Deadline Management', description: 'Set internal deadlines before real deadlines. Follow up before deadline passes. Be firm but understanding about extensions.' },
      { step: 6, title: 'Payment', description: 'Pay promptly. Pay what you agreed. If you can\'t pay, be upfront. Unpaid work should be acknowledged appropriately.', warning: 'Late payment burns bridges. Budget for timely payment.' },
      { step: 7, title: 'Building Relationships', description: 'Good contributors return if treated well. Credit prominently. Share their work. Be someone they want to work with.' },
      { step: 8, title: 'Handling Problems', description: 'Late work, missed briefs, personal conflicts. Address professionally. Document agreements. Know when to not work with someone again.' }
    ],
    tools: [
      { name: 'Project management tool', price: 'Free (Trello, Notion)', essential: true },
      { name: 'Communication channel', price: 'Free (email, Discord)', essential: true },
      { name: 'Commission templates', price: 'In kit', essential: true }
    ],
    commonMistakes: ['Vague guidelines', 'Slow responses', 'Unclear agreements', 'Poor feedback', 'Late payment'],
    freeAccess: true,
    kit: { name: 'Editor\'s Toolkit', slug: 'editor-toolkit', price: '£14.99', contents: ['Commission template', 'Style guide template', 'Feedback framework', 'Payment tracker'] },
    workshop: { title: 'Editorial Management', duration: '2 hours', price: '£35', format: 'zoom', bookingSlug: 'editorial-management' },
    nextTutorials: ['growing-readership', 'zine-sustainability'],
    badgeAwarded: 'editor',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // GAMES INDUSTRY PATHWAY
  // ========================================
  {
    id: 'games-industry-overview',
    slug: 'games-industry-overview',
    title: 'Games Industry Overview',
    description: 'How the industry works. Publishers, developers, roles, and where you might fit.',
    icon: '🎮',
    programmes: ['joystick'],
    primaryProgramme: 'joystick',
    pathway: 'Games Industry',
    tags: ['industry', 'careers', 'overview', 'games'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    steps: [
      { step: 1, title: 'Industry Structure', description: 'Publishers (fund, market). Developers (make games). Platform holders (Sony, Microsoft, Nintendo). Indie (self-publish). Different roles in each.', rovPrompt: 'Explain the difference between publishers and developers.' },
      { step: 2, title: 'Development Roles', description: 'Design, programming, art, audio, production, QA, writing, UX. Many specialisms. Games need all of them.', checkpoint: true },
      { step: 3, title: 'Non-Development Roles', description: 'Marketing, PR, community management, esports, journalism, content creation, events. Games industry isn\'t just making games.' },
      { step: 4, title: 'AAA vs Indie', description: 'AAA: big budget, large teams, longer cycles. Indie: smaller teams, more ownership, more risk. Different experiences.' },
      { step: 5, title: 'UK Games Industry', description: 'Major studios, growing sector. Tax relief helps. London, Dundee, Leamington Spa, Brighton. UKIE, GamesIndustry.biz for news.' },
      { step: 6, title: 'Entry Points', description: 'QA is common entry (but demanding). Internships. Junior roles. Community management. Writing/content. Start where you can.', tip: 'Every role teaches you about games. Start, then move.' },
      { step: 7, title: 'Skills to Develop', description: 'Technical skills for your area. Soft skills for any role. Play games widely. Understand design, even if not a designer.' },
      { step: 8, title: 'Networking Matters', description: 'Industry is relationship-based. Events (EGX, Develop). Twitter/Discord communities. Be helpful, not pushy. Long game.' }
    ],
    tools: [
      { name: 'Industry news sources', price: 'Free (GI.biz, etc.)', essential: true },
      { name: 'Networking willingness', price: 'Courage', essential: true },
      { name: 'Skills development', price: 'Varies', essential: true }
    ],
    commonMistakes: ['Thinking only about dev roles', 'Not networking', 'Not understanding business side', 'Unrealistic entry expectations', 'Only playing one type of game'],
    freeAccess: true,
    kit: { name: 'Industry Guide Pack', slug: 'industry-guide', price: '£14.99', contents: ['Role descriptions', 'Company directory', 'Networking guide', 'Career path examples'] },
    workshop: { title: 'Games Industry Intro', duration: '2 hours', price: '£25', format: 'zoom', bookingSlug: 'industry-intro' },
    nextTutorials: ['networking-for-games', 'choosing-your-path'],
    badgeAwarded: 'industry-aware',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'networking-for-games',
    slug: 'networking-for-games',
    title: 'Networking in Games',
    description: 'Build relationships that build careers. Events, online presence, and being remembered for the right reasons.',
    icon: '🤝',
    programmes: ['joystick', 'gtech-casters'],
    primaryProgramme: 'joystick',
    pathway: 'Games Industry',
    tags: ['networking', 'career', 'relationships', 'industry'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    alternativeGuides: ['ROV-B'],
    steps: [
      { step: 1, title: 'Why Network?', description: 'Most jobs filled through connections. Learning happens in conversations. Collaborations start with relationships. Not optional.' },
      { step: 2, title: 'Online Presence', description: 'Twitter/Bluesky still central to games. LinkedIn matters for some roles. Be yourself, share work, engage genuinely.', checkpoint: true },
      { step: 3, title: 'Events to Attend', description: 'EGX, Develop, GDC (big, expensive), local meetups (free, valuable). Student events if applicable. Start local.', rovPrompt: 'What games events should I attend in the UK?' },
      { step: 4, title: 'How to Approach People', description: '"Hi, I really liked your talk about X" or "I\'ve been playing your game and..." Genuine interest. Not "can you get me a job?"' },
      { step: 5, title: 'Follow Up', description: 'Connect after events. "Great meeting you at X, I enjoyed our conversation about Y." Short, specific, memorable.' },
      { step: 6, title: 'Give Before You Take', description: 'Share their work. Offer help. Give feedback they want. Be useful. Relationships are reciprocal.' },
      { step: 7, title: 'Long Game Mindset', description: 'Networking isn\'t instant results. Person you meet today might help in two years. Build relationships, not transactions.' },
      { step: 8, title: 'Being Memorable', description: 'What do you want to be known for? Your work, your knowledge, your kindness. Cultivate a reputation intentionally.' }
    ],
    tools: [
      { name: 'Social media presence', price: 'Free', essential: true },
      { name: 'Business cards/digital alternative', price: '£10-30', essential: false },
      { name: 'Event attendance', price: 'Free-expensive', essential: true }
    ],
    commonMistakes: ['Asking for jobs immediately', 'Only taking, never giving', 'Not following up', 'Being forgettable', 'Networking only when you need something'],
    freeAccess: true,
    workshop: { title: 'Games Networking Skills', duration: '1.5 hours', price: '£25', format: 'zoom', bookingSlug: 'games-networking' },
    nextTutorials: ['personal-branding', 'informational-interviews'],
    badgeAwarded: 'networker',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'games-career-planning',
    slug: 'games-career-planning',
    title: 'Games Career Planning',
    description: 'From where you are to where you want to be. Setting goals, building skills, making moves.',
    icon: '🗺️',
    programmes: ['joystick', 'techreneurs'],
    primaryProgramme: 'joystick',
    pathway: 'Games Industry',
    tags: ['career', 'planning', 'goals', 'development'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-M',
    alternativeGuides: ['ROV-B'],
    steps: [
      { step: 1, title: 'Honest Self-Assessment', description: 'What skills do you have? What do you enjoy? What are you willing to do for years? Be honest—career is long.', rovPrompt: 'Help me assess my skills for a games career.' },
      { step: 2, title: 'Research Roles', description: 'Look at job listings for roles you want. What do they require? What experience? What skills? This is your roadmap.', checkpoint: true },
      { step: 3, title: 'Gap Analysis', description: 'Compare requirements to your current skills. What\'s missing? This is what you need to develop. Prioritize.', tip: 'Talk to people in the role. Ask what actually matters.' },
      { step: 4, title: 'Skill Development Plan', description: 'Courses, projects, practice. Break into monthly goals. Measurable progress. Adjust as you learn more.' },
      { step: 5, title: 'Building Experience', description: 'Game jams, mods, community projects, volunteer work. Real projects > credentials. Show you can do the thing.' },
      { step: 6, title: 'Portfolio Development', description: 'Evidence of skills. For artists: visual work. For writers: scripts, dialogue. For designers: design docs, prototypes. Build as you learn.' },
      { step: 7, title: 'The First Role', description: 'Entry level, adjacent role, internship. Get in, then navigate. First job rarely perfect. It\'s step one.' },
      { step: 8, title: 'Long-Term Thinking', description: 'Where do you want to be in 5 years? Each move should progress toward that. Be patient but intentional.' }
    ],
    tools: [
      { name: 'Career planning document', price: 'Free', essential: true },
      { name: 'Job listings research', price: 'Free', essential: true },
      { name: 'Skill development resources', price: 'Free-varies', essential: true }
    ],
    commonMistakes: ['No clear goal', 'Not researching requirements', 'All learning, no doing', 'Waiting for perfect opportunity', 'Ignoring adjacent paths'],
    freeAccess: true,
    kit: { name: 'Career Planning Pack', slug: 'career-planning', price: '£14.99', contents: ['Skills assessment worksheet', 'Goal setting templates', 'Portfolio guidelines', 'Job search strategy'] },
    workshop: { title: 'Games Career Planning', duration: '2 hours', price: '£35', format: 'zoom', bookingSlug: 'career-planning' },
    nextTutorials: ['cv-for-games', 'interview-preparation'],
    badgeAwarded: 'career-planner',
    lastUpdated: '2024-12-26',
    version: '1.0'
  }
];

export default JOYSTICK_TUTORIALS;