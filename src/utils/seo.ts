// src/utils/seo.ts
// Single source of truth for all page metadata.
// Usage in any page:
//   import { pageMeta } from '@utils/seo'
//   const meta = pageMeta['easy-street']
//   <Helmet>
//     <title>{meta.title}</title>
//     <meta name="description" content={meta.description} />
//     ...
//   </Helmet>

export interface PageMeta {
  title: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
  ogType?: string
  canonical?: string
}

const SITE = 'Wembley Wonders CIC'
const SITE_URL = 'https://wembleywonders.org'

export const pageMeta: Record<string, PageMeta> = {

  // ── HOME ───────────────────────────────────────────────────────────────
  home: {
    title: `${SITE} | Digital Skills & Community Programmes in Wembley`,
    description: 'Community-led digital literacy, STEM education, creative workshops and cultural programmes in Wembley. Free and low-cost training for local residents.',
    keywords: 'Wembley community, digital skills, STEM education, workshops, community programmes, digital literacy, Wembley Wonders, Brent, North West London',
    ogTitle: `${SITE} | Digital Skills & Community Programmes`,
    ogDescription: 'Community-led digital literacy, STEM education, creative workshops and cultural programmes in Wembley.',
  },

  // ── EASY STREET ────────────────────────────────────────────────────────
  'easy-street': {
    title: `Easy Street — Community Radio Drama | ${SITE}`,
    description: 'A Caribbean British radio drama written by its community. John and Marsha. Pearl and Aubrey. Brenda back from Florida. Stories from Wembley High Road — written, produced, and broadcast by the people who live them.',
    keywords: 'Caribbean British radio drama, community storytelling Wembley, radio drama workshop London, Caribbean diaspora stories, community writing programme, Wembley Wonders, RAPP Brixton, Jamal Ali, Black British theatre',
    ogTitle: 'Easy Street — A Community Radio Drama',
    ogDescription: 'Caribbean British stories written by their community. John and Marsha. Thirty years. A good shirt on a Sunday morning. Wembley Wonders CIC.',
    canonical: `${SITE_URL}/programmes/easy-street`,
  },

  'easy-street-sandbox': {
    title: `Write Your Scene — Easy Street Sandbox | ${SITE}`,
    description: 'Read Scene 1.01 of Easy Street, then write what happens next. Your grandmother\'s kitchen. Your uncle who always dressed too well. Write it, record it, bring it to the writing room. Your name on the broadcast.',
    keywords: 'write radio drama, radio drama workshop Wembley, community writing workshop London, Caribbean storytelling, write your own scene, Wembley Wonders, creative writing Brent',
    ogTitle: 'Easy Street Sandbox — Write Your Scene',
    ogDescription: 'Read the scene. Then write what happens next. Your family\'s truth inside this world. Produced, broadcast, archived with your name on it.',
    canonical: `${SITE_URL}/programmes/easy-street/sandbox`,
  },

  // ── G-TECH CASTERS ─────────────────────────────────────────────────────
  'gtechcasters': {
    title: `G-Tech Casters — Podcast & Radio Production | ${SITE}`,
    description: 'Learn audio production, podcasting, and radio broadcasting in Wembley. Record, edit, mix and publish your own show. Community radio skills for the creator economy.',
    keywords: 'podcast production Wembley, radio production course London, audio engineering workshop, community radio Brent, G-Tech Casters, Wembley Wonders, podcasting for beginners',
    ogTitle: 'G-Tech Casters — Podcast & Radio Production',
    ogDescription: 'Record, edit, mix, publish. Community radio production skills in Wembley.',
    canonical: `${SITE_URL}/programmes/gtechcasters`,
  },

  'gtechcasters-sandbox': {
    title: `G-Tech Casters Sandbox — Try Audio Production | ${SITE}`,
    description: 'Try audio production hands-on before committing to the full programme. Record a voice note, edit a clip, hear what your voice sounds like in a produced show.',
    keywords: 'try podcast production, audio production taster Wembley, radio skills beginner, community media London, Wembley Wonders',
    ogTitle: 'G-Tech Casters Sandbox — Hear Your Voice',
    ogDescription: 'Try audio production before you commit. Record, edit, hear the difference.',
    canonical: `${SITE_URL}/programmes/gtechcasters/sandbox`,
  },

  // ── PAGETURNERS ────────────────────────────────────────────────────────
  pageturners: {
    title: `Pageturners — Writing & Publishing Programme | ${SITE}`,
    description: 'A writing and publishing programme for community storytellers in Wembley. Write, edit, publish and archive your work with your name on it. For the stories that deserve to exist.',
    keywords: 'writing workshop Wembley, community publishing London, storytelling programme Brent, creative writing course North West London, Pageturners Wembley Wonders',
    ogTitle: 'Pageturners — Write It. Publish It. Own It.',
    ogDescription: 'Community writing and publishing in Wembley. Your story, your name, your archive.',
    canonical: `${SITE_URL}/programmes/pageturners`,
  },

  'pageturners-sandbox': {
    title: `Pageturners Sandbox — Start Writing | ${SITE}`,
    description: 'Start writing in the Pageturners sandbox. A structured first session to find your voice, your story, and your reason to keep going.',
    keywords: 'start writing Wembley, creative writing taster London, community storytelling workshop, Pageturners, Wembley Wonders',
    ogTitle: 'Pageturners Sandbox — Find Your Voice',
    ogDescription: 'A structured first writing session. Find your voice. Find your story.',
    canonical: `${SITE_URL}/programmes/pageturners/sandbox`,
  },

  // ── KAYWANA'S COURT ────────────────────────────────────────────────────
  'kaywanas-court': {
    title: `Kaywana's Court — Caribbean Music Heritage | ${SITE}`,
    description: 'Trace Caribbean musical lineages across the Black Atlantic diaspora. Rayd-yo playlists, oral history, and cultural preservation for the music that built communities.',
    keywords: 'Caribbean music history, Black Atlantic diaspora, Caribbean heritage London, Kaywana\'s Court, Wembley Wonders, calypso ska reggae soul, Black British music history',
    ogTitle: "Kaywana's Court — Caribbean Music Heritage",
    ogDescription: 'Tracing Caribbean musical lineages across the Black Atlantic diaspora. Wembley Wonders CIC.',
    canonical: `${SITE_URL}/programmes/kaywanas-court`,
  },

  'kaywanas-court-sandbox': {
    title: `Kaywana's Court Sandbox — Build Your Playlist | ${SITE}`,
    description: 'Build a Rayd-yo playlist that traces a musical lineage. Start with one song, find the thread, follow it back. The Black Atlantic in your own curation.',
    keywords: 'Caribbean music playlist, music heritage project, Black Atlantic music, diaspora music curation, Wembley Wonders',
    ogTitle: "Kaywana's Court Sandbox — Build Your Lineage",
    ogDescription: 'One song. Find the thread. Follow it back. Your Caribbean musical lineage.',
    canonical: `${SITE_URL}/programmes/kaywanas-court/sandbox`,
  },

  // ── TRUBBLE N BASS ─────────────────────────────────────────────────────
  'trubble-n-bass': {
    title: `Trubble n Bass — Music Production Programme | ${SITE}`,
    description: 'Learn music production in Wembley. Beat-making, sound design, mixing and mastering — bridging elder analogue knowledge with youth digital skills. AI music tools and the creator economy.',
    keywords: 'music production course Wembley, beat making workshop London, music production for beginners Brent, Trubble n Bass, Wembley Wonders, producer course North West London',
    ogTitle: 'Trubble n Bass — Music Production in Wembley',
    ogDescription: 'Beat-making, sound design, mixing. Analogue knowledge meets digital skills.',
    canonical: `${SITE_URL}/programmes/trubble-n-bass`,
  },

  'trubble-n-bass-sandbox': {
    title: `Trubble n Bass Sandbox — Make Your First Beat | ${SITE}`,
    description: 'Make your first beat in the Trubble n Bass sandbox. No equipment needed. Browser-based production tools to hear what you can do before committing to the full programme.',
    keywords: 'make a beat online, music production taster, beat making beginner Wembley, Trubble n Bass, Wembley Wonders',
    ogTitle: 'Trubble n Bass Sandbox — Make Your First Beat',
    ogDescription: 'No equipment needed. Make your first beat in the browser.',
    canonical: `${SITE_URL}/programmes/trubble-n-bass/sandbox`,
  },

  // ── STEMGENEERS ────────────────────────────────────────────────────────
  // UPDATED: Matches the rebuilt page — Bruk-up, repair economics, six layers,
  // community credential. Not a coding bootcamp. Not for commercial orgs.
  stemgeneers: {
    title: `STEMgeneers — The Person Your Community Calls | ${SITE}`,
    description: 'Applied technical skills that build a community role in Wembley. Repair, diagnosis, fabrication, and home maintenance — the knowledge that stops your household paying £80 for a £1.50 washer. Named for Bruk-up. Built for everyone the system didn\'t build a room for.',
    keywords: 'appliance repair Wembley, technical skills community London, repair skills Brent, watch battery repair, washing machine repair community, STEMgeneers Wembley Wonders, 3D printing spare parts, household repair skills North West London',
    ogTitle: 'STEMgeneers — The Person Your Community Calls',
    ogDescription: 'Fix it. Understand why it broke. Build a reputation. The community already knows what that person is worth.',
    canonical: `${SITE_URL}/programmes/stemgeneers`,
  },

  'stemgeneers-sandbox': {
    title: `STEMgeneers Sandbox — Diagnostic Trainer | ${SITE}`,
    description: 'Work through a real fault diagnosis in the STEMgeneers sandbox. Randomised symptom variants, scored reasoning, optional physics explanation. Each session counts toward your layer credential.',
    keywords: 'appliance diagnosis trainer, repair skills taster Wembley, fault diagnosis workshop London, STEMgeneers sandbox, Wembley Wonders, learn appliance repair',
    ogTitle: 'STEMgeneers Sandbox — Diagnostic Trainer',
    ogDescription: 'A real fault. Your reasoning. Scored. Each session builds your credential.',
    canonical: `${SITE_URL}/programmes/stemgeneers/sandbox`,
  },

  // ── TECHRENEURS ────────────────────────────────────────────────────────
  techreneurs: {
    title: `TECHreneurs — Tech Business & IP Programme | ${SITE}`,
    description: 'Build a tech business and protect your intellectual property in Wembley. Revenue modelling, IP strategy, licensing, venture building. For the entrepreneur who builds with code.',
    keywords: 'tech business programme Wembley, intellectual property workshop London, startup course Brent, TECHreneurs, Wembley Wonders, creator economy IP, tech entrepreneur North West London',
    ogTitle: 'TECHreneurs — Build a Tech Business',
    ogDescription: 'Revenue models, IP strategy, licensing, venture building in Wembley.',
    canonical: `${SITE_URL}/programmes/techreneurs`,
  },

  'techreneurs-sandbox': {
    title: `TECHreneurs Sandbox — Model Your Revenue | ${SITE}`,
    description: 'Build a revenue model for your tech idea in the TECHreneurs sandbox. See how IP strategy, licensing, and the 55/25/20 model work in practice.',
    keywords: 'revenue model builder, IP strategy taster, tech business Wembley, TECHreneurs, Wembley Wonders',
    ogTitle: 'TECHreneurs Sandbox — Model Your Revenue',
    ogDescription: 'Build a revenue model. See IP strategy in practice.',
    canonical: `${SITE_URL}/programmes/techreneurs/sandbox`,
  },

  // ── SILK STILETTOS ─────────────────────────────────────────────────────
  'silk-stilettos': {
    title: `Silk & Stilettos — Fashion Design & Wearable Tech | ${SITE}`,
    description: 'Fashion design, pattern making, and wearable technology in Wembley. For designers who want to own their patterns, protect their IP, and build a fashion business.',
    keywords: 'fashion design course Wembley, wearable technology workshop London, pattern making Brent, Silk Stilettos, Wembley Wonders, fashion business IP',
    ogTitle: 'Silk & Stilettos — Fashion Design & Wearable Tech',
    ogDescription: 'Design. Make. Patent. Fashion and wearable tech in Wembley.',
    canonical: `${SITE_URL}/programmes/silk-stilettos`,
  },

  'silk-stilettos-sandbox': {
    title: `Silk & Stilettos Sandbox — Design Your First Pattern | ${SITE}`,
    description: 'Start designing in the Silk & Stilettos sandbox. Create a pattern, register a design, see how fashion IP protection works.',
    keywords: 'fashion design taster Wembley, pattern making beginner, wearable tech workshop London, Silk Stilettos, Wembley Wonders',
    ogTitle: 'Silk & Stilettos Sandbox — Design Your Pattern',
    ogDescription: 'Create a pattern. Register a design. Fashion IP made practical.',
    canonical: `${SITE_URL}/programmes/silk-stilettos/sandbox`,
  },

  // ── BRIGHT SPARKS ──────────────────────────────────────────────────────
  'bright-sparks': {
    title: `Bright Sparks — Young Innovators Programme | ${SITE}`,
    description: 'A programme for young innovators in Wembley aged 11–16. Invention, creativity, and problem-solving for the students the system doesn\'t quite fit.',
    keywords: 'young innovators Wembley, children invention programme London, creativity workshop teenagers Brent, Bright Sparks, Wembley Wonders',
    ogTitle: 'Bright Sparks — Young Innovators',
    ogDescription: 'Invention and creativity for young people in Wembley who think differently.',
    canonical: `${SITE_URL}/programmes/bright-sparks`,
  },

  'bright-sparks-sandbox': {
    title: `Bright Sparks Sandbox — Invent Something | ${SITE}`,
    description: 'Try the Bright Sparks invention challenge. Identify a problem, design a solution, document your idea. A taster of the full young innovators programme.',
    keywords: 'invention challenge kids Wembley, young innovators taster London, creativity workshop children, Bright Sparks, Wembley Wonders',
    ogTitle: 'Bright Sparks Sandbox — Invent Something',
    ogDescription: 'Spot a problem. Design a solution. Your first invention.',
    canonical: `${SITE_URL}/programmes/bright-sparks/sandbox`,
  },

  // ── MONEY RESET ────────────────────────────────────────────────────────
  'money-reset': {
    title: `Money Reset — Financial Literacy Programme | ${SITE}`,
    description: 'Financial literacy, tax basics, and money management for community members in Wembley. Practical sessions on budgeting, self-employment, and the creator economy.',
    keywords: 'financial literacy Wembley, money management workshop London, tax basics self-employed Brent, Money Reset, Wembley Wonders, financial wellbeing community',
    ogTitle: 'Money Reset — Financial Literacy in Wembley',
    ogDescription: 'Budgeting, tax, self-employment, and the creator economy. Practical money skills.',
    canonical: `${SITE_URL}/programmes/money-reset`,
  },

  'money-reset-sandbox': {
    title: `Money Reset Sandbox — Run Your Numbers | ${SITE}`,
    description: 'Run a real financial scenario in the Money Reset sandbox. Income, tax, expenses, savings. See where you actually stand before the full programme.',
    keywords: 'financial calculator Wembley, money management taster London, tax workshop self-employed, Money Reset, Wembley Wonders',
    ogTitle: 'Money Reset Sandbox — Run Your Numbers',
    ogDescription: 'Income. Tax. Expenses. See where you actually stand.',
    canonical: `${SITE_URL}/programmes/money-reset/sandbox`,
  },

  // ── AUNTIE ANANSI'S KITCHEN ────────────────────────────────────────────
  'auntie-anansis-kitchen': {
    title: `Auntie Anansi's Kitchen — Food Heritage & Culture | ${SITE}`,
    description: 'Preserve and share Caribbean food heritage in Wembley. Recipe documentation, oral history, and cultural archiving for the dishes that carry community memory.',
    keywords: 'Caribbean food heritage Wembley, recipe oral history London, food culture Caribbean diaspora, Auntie Anansi Kitchen, Wembley Wonders, community food archive',
    ogTitle: "Auntie Anansi's Kitchen — Food Heritage & Memory",
    ogDescription: 'Caribbean food, family recipes, community memory. Preserved for the archive.',
    canonical: `${SITE_URL}/programmes/auntie-anansis-kitchen`,
  },

  'auntie-anansis-kitchen-sandbox': {
    title: `Auntie Anansi's Kitchen Sandbox — Document a Recipe | ${SITE}`,
    description: 'Document a family recipe in the Auntie Anansi\'s Kitchen sandbox. Ingredients, method, the story behind the dish. Your first contribution to the community food archive.',
    keywords: 'document family recipe, food heritage project Wembley, Caribbean recipe archive London, Auntie Anansi Kitchen, Wembley Wonders',
    ogTitle: "Auntie Anansi's Kitchen Sandbox — Document a Recipe",
    ogDescription: 'The recipe. The story behind it. Your first archive contribution.',
    canonical: `${SITE_URL}/programmes/auntie-anansis-kitchen/sandbox`,
  },

  // ── SCRAP CAT ──────────────────────────────────────────────────────────
  'scrap-cat': {
    title: `Scrap Cat — Upcycling & Maker Programme | ${SITE}`,
    description: 'Upcycling, making, and circular economy skills in Wembley. Turn waste materials into products, art, and income. For makers who see what others throw away.',
    keywords: 'upcycling workshop Wembley, maker programme London, circular economy Brent, Scrap Cat, Wembley Wonders, craft making teenagers',
    ogTitle: 'Scrap Cat — Make Something From Nothing',
    ogDescription: 'Upcycling, making, circular economy. Turn waste into products in Wembley.',
    canonical: `${SITE_URL}/programmes/scrap-cat`,
  },

  'scrap-cat-sandbox': {
    title: `Scrap Cat Sandbox — Design an Upcycled Product | ${SITE}`,
    description: 'Design an upcycled product in the Scrap Cat sandbox. Start with what you have, turn it into something new. A taster of the full maker programme.',
    keywords: 'upcycling project Wembley, maker taster London, scrap materials workshop, Scrap Cat, Wembley Wonders',
    ogTitle: 'Scrap Cat Sandbox — Design an Upcycled Product',
    ogDescription: 'Start with what you have. Turn it into something new.',
    canonical: `${SITE_URL}/programmes/scrap-cat/sandbox`,
  },

  // ── JOYSTICK ───────────────────────────────────────────────────────────
  joystick: {
    title: `Joystick — Community Games & Digital Media Magazine | ${SITE}`,
    description: 'A community digital media magazine in Wembley covering games, culture, and technology. Write, design, and publish for Joystick. Your voice in the community press.',
    keywords: 'community magazine Wembley, digital media publication London, games journalism Brent, Joystick, Wembley Wonders, community press North West London',
    ogTitle: 'Joystick — Community Digital Media',
    ogDescription: 'Games, culture, technology. The community magazine from Wembley Wonders.',
    canonical: `${SITE_URL}/programmes/joystick`,
  },

  // ── RAYD-YO ────────────────────────────────────────────────────────────
  raydyo: {
    title: `Rayd-yo — Community Radio | ${SITE}`,
    description: 'Wembley Wonders community radio. Programmes, music, drama, and oral history broadcast from Wembley. Tune in. Contribute. Your community, your frequency.',
    keywords: 'community radio Wembley, online radio Brent, Caribbean music radio London, Rayd-yo, Wembley Wonders, community broadcast',
    ogTitle: 'Rayd-yo — Wembley Community Radio',
    ogDescription: 'Community radio from Wembley. Programmes, music, drama, oral history.',
    canonical: `${SITE_URL}/raydyo`,
  },

  // ── MEMBERSHIP ─────────────────────────────────────────────────────────
  membership: {
    title: `Membership | ${SITE}`,
    description: 'Join Wembley Wonders CIC. Community membership with real benefits — access to programmes, creative spaces, business support, and a share in what we build together.',
    keywords: 'join Wembley Wonders, community membership Wembley, CIC membership Brent, community interest company London',
    ogTitle: 'Join Wembley Wonders CIC',
    ogDescription: 'Community membership with real benefits. Access, ownership, belonging.',
    canonical: `${SITE_URL}/membership`,
  },

}

// ── HELMET HELPER ──────────────────────────────────────────────────────────
// Convenience function to use in each page's <Helmet> block.
// Usage: const meta = getPageMeta('easy-street')
export function getPageMeta(key: string): PageMeta {
  return pageMeta[key] ?? pageMeta['home']
}