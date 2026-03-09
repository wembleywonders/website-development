// src/types/creatorRegistry.ts
//
// Creator registry — the single source of truth for all creators
// on the platform. Judith is instance #1. Every subsequent creator
// follows the same schema; no new component code required.
//
// Data sources (in order of priority):
//   1. Live:  GET /api/creators/{id}/journey  (Spring Boot backend)
//   2. Seed:  CREATOR_REGISTRY below          (static until API is wired)
//
// Backend alignment notes (update these when Creator.java is shared):
//   Creator.java           → CreatorRegistryEntry.profile
//   ProvenanceRecord.java  → CreatorRegistryEntry.events
//   Transaction.java       → CreatorRegistryEntry.economics
//   CreatorStage enum      → CreatorRegistryEntry.profile.stage
//   LicenseType enum       → CyberstoreProduct.category

import {
  CyberstoreProduct,
  CalendarEvent,
  PodcastEpisode,
  CreatorProfile,
  CounterArchiveToken,
  JUDITH_PRODUCTS,
  JUDITH_CALENDAR_EVENTS,
  JUDITH_PROFILE,
} from './creatorJourney';

// ─── Registry entry ───────────────────────────────────────────────────────────
// One entry per creator. Add a creator → their section appears everywhere.

export interface CreatorRegistryEntry {
  profile: CreatorProfile;
  products: CyberstoreProduct[];
  events: CalendarEvent[];
  episodes: PodcastEpisode[];
  tokens: CounterArchiveToken[];

  // Display config — creator controls their own presentation
  display: {
    accentColour: string;      // primary accent for their section
    secondaryColour: string;   // secondary / highlight
    sectionTitle: string;      // e.g. "Judith's Range" / "Marcus's Beats"
    sectionTagline: string;    // one-line description of their journey
    programmeLinks: {          // which programmes their work connects to
      label: string;
      href: string;
    }[];
    externalLinks?: {
      label: string;
      href: string;
      icon: string;
    }[];
  };

  // Backend API endpoint — populated once Spring Boot endpoint is live.
  // Until then, static data above is used.
  // Shape: GET /api/creators/{creatorId}/journey
  // Returns: { profile, products, events, episodes, tokens }
  apiEndpoint?: string;
}

// ─── Registry ─────────────────────────────────────────────────────────────────
// Add entries here as creators onboard. Order = display order on Cyberstore.

export const CREATOR_REGISTRY: CreatorRegistryEntry[] = [
  // ── Instance #1: Judith Fontanelle ──────────────────────────────────────────
  {
    profile: JUDITH_PROFILE,
    products: JUDITH_PRODUCTS,
    events: JUDITH_CALENDAR_EVENTS,
    episodes: [],   // populated when Rayd-yo episodes go live
    tokens: [],     // populated by blockchain layer
    display: {
      accentColour: '#86b880',
      secondaryColour: '#D4A853',
      sectionTitle: "Judith's Range",
      sectionTagline:
        'Hair science, chemical literacy, and body sovereignty — documented from a trichologist\'s chair in Ealing to the Roots Knowledge Archive.',
      programmeLinks: [
        { label: 'Roots Knowledge Archive', href: '/programmes/roots' },
        { label: 'Rayd-yo', href: 'https://rayd-yo.wembleywonders.org' },
        { label: 'K2K Radio Course', href: '/programmes/gtechcasters' },
      ],
      externalLinks: [
        {
          label: 'Healthy Hair Studio, Ealing',
          href: 'https://www.healthyhairstudio.co.uk/',
          icon: '🩺',
        },
      ],
    },
    apiEndpoint: '/api/creators/judith-fontanelle/journey',
  },

  // ── Stub: second creator slot ────────────────────────────────────────────────
  // Remove the `disabled` flag and populate products/events when ready.
  // {
  //   profile: { id: 'next-creator', name: '...', ... },
  //   products: [],
  //   events: [],
  //   episodes: [],
  //   tokens: [],
  //   display: { accentColour: '#60a5fa', ... },
  //   apiEndpoint: '/api/creators/next-creator/journey',
  // },
];

// ─── Registry helpers ─────────────────────────────────────────────────────────

export const getCreatorById = (id: string): CreatorRegistryEntry | undefined =>
  CREATOR_REGISTRY.find(c => c.profile.id === id);

export const getCreatorProducts = (id: string): CyberstoreProduct[] =>
  getCreatorById(id)?.products ?? [];

export const getCreatorEvents = (id: string): CalendarEvent[] =>
  getCreatorById(id)?.events ?? [];

// All live products across all creators — used by Cyberstore product grid
export const getAllLiveProducts = (): CyberstoreProduct[] =>
  CREATOR_REGISTRY.flatMap(c => c.products.filter(p => p.status === 'live'));

// All coming-soon products — used for "notify me" / preview list
export const getAllComingSoonProducts = (): CyberstoreProduct[] =>
  CREATOR_REGISTRY.flatMap(c => c.products.filter(p => p.status === 'coming-soon'));

// All public events across all creators — feeds the site Calendar
export const getAllPublicJourneyEvents = (): (CalendarEvent & { creatorName: string; accentColour: string })[] =>
  CREATOR_REGISTRY.flatMap(c =>
    c.events
      .filter(e => e.isPublic)
      .map(e => ({
        ...e,
        creatorName: c.profile.name,
        accentColour: c.display.accentColour,
      }))
  );

// ─── API fetch — swap static data for live API once backend endpoint is ready ─
// Usage: const entry = await fetchCreatorJourney('judith-fontanelle');
// Falls back to static registry if API unavailable.

export async function fetchCreatorJourney(
  creatorId: string
): Promise<CreatorRegistryEntry | null> {
  const entry = getCreatorById(creatorId);
  if (!entry?.apiEndpoint) return entry ?? null;

  try {
    const res = await fetch(entry.apiEndpoint, {
      headers: { 'Content-Type': 'application/json' },
      // Auth header added by axios interceptor in production:
      // Authorization: `Bearer ${token}`
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    // Merge live API data over static seed — API wins on conflicts
    return {
      ...entry,
      profile:  data.profile  ?? entry.profile,
      products: data.products ?? entry.products,
      events:   data.events   ?? entry.events,
      episodes: data.episodes ?? entry.episodes,
      tokens:   data.tokens   ?? entry.tokens,
    };
  } catch {
    // API not yet live — fall back to static registry silently
    return entry;
  }
}