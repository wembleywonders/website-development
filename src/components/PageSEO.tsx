import React from 'react';
import { Helmet } from 'react-helmet-async';

// ============================================================
// PageSEO.tsx
// Per-page SEO meta tags via react-helmet-async
// Drop into any page for full title, description, OG, Twitter
// ============================================================

interface PageSEOProps {
  title:        string;           // Page-specific title
  description:  string;           // 150-160 chars
  path?:        string;           // e.g. '/programmes' — for canonical
  keywords?:    string;           // comma-separated
  ogType?:      'website' | 'article' | 'product';
  noIndex?:     boolean;          // for member-only pages
}

const SITE_NAME = 'Wembley Wonders CIC';
const BASE_URL  = 'https://wembleywonders.org';
const TAGLINE   = 'Family Knowledge = Family Investment';

const PageSEO: React.FC<PageSEOProps> = ({
  title,
  description,
  path       = '/',
  keywords,
  ogType     = 'website',
  noIndex    = false,
}) => {
  const fullTitle    = `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${BASE_URL}${path}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description"  content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots"       content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical"     href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type"        content={ogType} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:locale"      content="en_GB" />

      {/* Twitter/X */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default PageSEO;

// ── Per-page SEO data ─────────────────────────────────────
// Usage: <PageSEO {...SEO_DATA.homepage} />
// Add new pages here as the platform grows

export const SEO_DATA = {

  homepage: {
    title:       TAGLINE,
    description: 'Wembley Wonders is a community creator economy platform. 13 programmes, a provenance market, Black British heritage archive, and community radio. Creators keep 55% of everything they make.',
    path:        '/',
    keywords:    'Wembley community, Black British heritage, community creator economy, family knowledge, provenance market, cultural knowledge, community radio Wembley',
  },

  programmes: {
    title:       'Our Programmes',
    description: 'Thirteen community programmes in Wembley — from STEMgeneers and TECHreneurs to Pageturners, G-Tech Casters, Kaywana\'s Court, and Roots. Find your door.',
    path:        '/programmes',
    keywords:    'community programmes Wembley, creative workshops London, STEM Wembley, music production Wembley, heritage programmes, body sovereignty',
  },

  brightSparks: {
    title:       'Bright Sparks — The Curiosity Threshold',
    description: 'Not sure where to start? Bright Sparks is the room before the rooms. Saturday mornings, free, no commitment. Come and find out what you carry.',
    path:        '/programmes/bright-sparks',
    keywords:    'Wembley community workshop, free workshop Wembley, Saturday learning Wembley',
  },

  techreneurs: {
    title:       'TECHreneurs — Launch Something You Own',
    description: 'Build a product around what you already know. First sale within the programme. 55% yours from day one. Not a coding bootcamp — a business launch platform.',
    path:        '/programmes/techreneurs',
    keywords:    'tech entrepreneur Wembley, digital business workshop, community business support London',
  },

  roots: {
    title:       'Roots — Body Sovereignty & Hair Science',
    description: 'The knowledge that should have been handed down. Hair science, chemical literacy, legal rights. Women-led, women-directed, women-managed. Led by Judith Fontanelle, Flora Agba, and Natalie.',
    path:        '/programmes/roots',
    keywords:    'hair sovereignty UK, natural hair science, Black hair health, body sovereignty women, hair discrimination legal rights UK',
  },

  heritage: {
    title:       'Knowledge Commons — The Black British Heritage Archive',
    description: 'A publicly accessible counter-archive of Black British history. Pioneer profiles, deep-dive threads, oral history, and the institutional map of post-colonial London. Free. No login required.',
    path:        '/heritage',
    keywords:    'Black British heritage archive, Black history London, Arthur Wharton, Claudia Jones, Samuel Coleridge-Taylor, Black British pioneers, post-colonial London history',
  },

  shop: {
    title:       'The Cyberstore — Provenance Market',
    description: 'A provenance market for community knowledge. Every item carries its maker\'s story, cultural lineage, and programme provenance. Creators keep 55% of every sale.',
    path:        '/shop',
    keywords:    'community marketplace Wembley, Black British art for sale, heritage recipes, cultural knowledge products, community music beats',
  },

  about: {
    title:       'About Wembley Wonders CIC',
    description: 'Wembley Wonders CIC was founded by Claude and Judith Fontanelle. Seventeen years on the High Road, self-financed, no extraction. Company No. 12960817.',
    path:        '/about',
    keywords:    'Wembley Wonders CIC about, community interest company Wembley, Claude Fontanelle, Judith Fontanelle',
  },

  join: {
    title:       'Join Wembley Wonders',
    description: 'Join free. Two doors — the Connoisseurs Club for men, the Passionistas Fan Club for women. Find your programme. Start building something that\'s yours.',
    path:        '/join',
    keywords:    'join community Wembley, Wembley Wonders membership, free community platform London',
  },

  calendar: {
    title:       'Programme Schedule & Calendar',
    description: 'All Wembley Wonders programme sessions — when we meet, what\'s running, how to join. Updated weekly.',
    path:        '/calendar',
    keywords:    'Wembley community schedule, workshop timetable Wembley, community events Wembley',
  },

};
