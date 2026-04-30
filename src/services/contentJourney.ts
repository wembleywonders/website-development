/*
 * contentJourney.ts
 * ─────────────────────────────────────────────────────────────
 * Wembley Wonders CIC · Content Journey Service
 * Company No. 12960817
 *
 * The service layer for the platform's connective tissue.
 *
 * Functions that record, query, surface, and
 * route content journeys across programmes.
 *
 * This is not a CMS. It is not a content management system
 * in the enterprise sense. It is the system that ensures
 * a piece of writing knows where it came from,
 * where it can go, and who made it.
 *
 * The Coronation Street warning lives here:
 * every function that touches content asks whether
 * the humanStory is present before it proceeds.
 * Content without a human story cannot be published.
 * Content without a human story is a feature, not a story.
 * ─────────────────────────────────────────────────────────────
 */

import {
  PlatformContent,
  ContentJourneySummary,
  ContentFeedItem,
  ProgrammeContentStats,
  ProgrammeId,
  ContentStatus,
  ContentFormat,
  JourneyStop,
  CrossProgrammeConnection,
  PROGRAMME_LABELS,
  hasHumanStory,
  hasCrossedProgrammes,
  getJourneyHighlights,
  generateSocialPost,
  generateRadyoIntro,
  advanceJourney,
} from '../types/platform-content';

// ─────────────────────────────────────────
// IN-MEMORY STORE
// In production, replace with API calls.
// The interface is designed to be a drop-in
// replacement for a real backend.
// ─────────────────────────────────────────

const contentStore: Map<string, PlatformContent> = new Map();

// ─────────────────────────────────────────
// CORE CRUD
// ─────────────────────────────────────────

export function registerContent(content: PlatformContent): PlatformContent {
  if (!hasHumanStory(content)) {
    console.warn(
      `[ContentJourney] Content "${content.id}" registered without a humanStory.`,
      `The originStory field is required before publication.`,
      `This content will be flagged as incomplete.`
    );
  }
  contentStore.set(content.id, content);
  return content;
}

export function getContent(id: string): PlatformContent | undefined {
  return contentStore.get(id);
}

export function updateContent(content: PlatformContent): PlatformContent {
  contentStore.set(content.id, { ...content, updatedAt: new Date().toISOString() });
  return contentStore.get(content.id)!;
}

// ─────────────────────────────────────────
// JOURNEY RECORDING
// Every time content moves through a programme,
// it leaves a record. The record is the connective
// tissue made visible.
// ─────────────────────────────────────────

export function recordJourneyStep(
  contentId: string,
  programme: ProgrammeId,
  action: JourneyStop['action'],
  note?: string,
  url?: string
): PlatformContent | null {
  const content = contentStore.get(contentId);
  if (!content) {
    console.error(`[ContentJourney] Content "${contentId}" not found`);
    return null;
  }

  const updated = advanceJourney(content, programme, action, note, url);
  contentStore.set(contentId, updated);

  // Log the journey step — this is the moment the connective tissue fires
  console.info(
    `[ContentJourney] "${content.title}" by ${content.humanStory.displayName}`,
    `→ ${PROGRAMME_LABELS[programme]} (${action})`,
    note ? `· ${note}` : ''
  );

  return updated;
}

// ─────────────────────────────────────────
// CROSS-PROGRAMME ROUTING
// Given a piece of content, return the
// programmes that should know about it —
// based on format, tags, archive connections,
// and existing journey stops.
// ─────────────────────────────────────────

const FORMAT_PROGRAMME_MAP: Partial<Record<ContentFormat, ProgrammeId[]>> = {
  'story':              ['pageturners', 'joystick', 'kaywanas-court'],
  'poem':               ['pageturners', 'joystick', 'kaywanas-court', 'rayd-yo'],
  'script':             ['pageturners', 'kaywanas-court', 'rayd-yo', 'gtechcasters'],
  'essay':              ['pageturners', 'joystick'],
  'long-read':          ['pageturners', 'joystick'],
  'investigative':      ['pageturners', 'joystick', 'knowledge-commons'],
  'profile':            ['knowledge-commons', 'joystick', 'pageturners'],
  'testimony':          ['oral-history', 'knowledge-commons', 'pageturners'],
  'interview':          ['joystick', 'rayd-yo'],
  'review':             ['joystick', 'pageturners'],
  'debate':             ['gtechcasters', 'joystick', 'rayd-yo'],
  'research':           ['knowledge-commons', 'pageturners'],
  'broadcast-segment':  ['rayd-yo', 'joystick'],
  'performance-piece':  ['kaywanas-court', 'rayd-yo', 'pageturners'],
  'game-narrative':     ['gtechcasters', 'pageturners', 'bright-sparks'],
  'anansi-retelling':   ['auntie-anansis-kitchen', 'pageturners', 'bright-sparks', 'rayd-yo', 'knowledge-commons'],
  'seed':               [],
};

export function suggestRelevantProgrammes(
  content: PlatformContent
): ProgrammeId[] {
  const formatSuggestions = FORMAT_PROGRAMME_MAP[content.format] ?? [];

  // Add archive-linked programmes if there's a KC connection
  const archiveSuggestions: ProgrammeId[] = content.archiveProfileId
    ? ['knowledge-commons', 'pageturners']
    : [];

  // Age-based routing
  const ageSuggestions: ProgrammeId[] = [];
  if (content.humanStory.ageAtCreation) {
    const age = content.humanStory.ageAtCreation;
    if (age <= 13) ageSuggestions.push('bright-sparks', 'auntie-anansis-kitchen');
    if (age >= 14 && age <= 18) ageSuggestions.push('gtechcasters', 'pageturners');
    if (age >= 16) ageSuggestions.push('silk-stilettos', 'kaywanas-court');
  }

  const all = [
    ...formatSuggestions,
    ...archiveSuggestions,
    ...ageSuggestions,
  ].filter(p => p !== content.originProgramme);

  // Deduplicate
  return [...new Set(all)];
}

// ─────────────────────────────────────────
// QUERYING
// Surfaces content for programme feeds,
// editorial queues, and social media.
// ─────────────────────────────────────────

export function getContentByProgramme(
  programmeId: ProgrammeId,
  includeRelevant = true
): PlatformContent[] {
  return Array.from(contentStore.values()).filter(c =>
    c.originProgramme === programmeId ||
    (includeRelevant && c.relevantProgrammes.includes(programmeId))
  );
}

export function getContentByStatus(status: ContentStatus): PlatformContent[] {
  return Array.from(contentStore.values()).filter(c => c.status === status);
}

export function getPublishedContent(
  programmeId?: ProgrammeId
): PlatformContent[] {
  return Array.from(contentStore.values()).filter(c => {
    const isPublished = c.status === 'published' ||
                        c.status === 'broadcast' ||
                        c.status === 'archived';
    const matchesProgramme = programmeId
      ? c.originProgramme === programmeId || c.relevantProgrammes.includes(programmeId)
      : true;
    return isPublished && matchesProgramme;
  });
}

export function getCrossProgrammeContent(): PlatformContent[] {
  return Array.from(contentStore.values()).filter(hasCrossedProgrammes);
}

export function getContentByCreator(displayName: string): PlatformContent[] {
  const normalised = displayName.toLowerCase().trim();
  return Array.from(contentStore.values()).filter(
    c => c.humanStory.displayName.toLowerCase().trim() === normalised
  );
}

export function getContentByArchiveProfile(
  profileId: string
): PlatformContent[] {
  return Array.from(contentStore.values()).filter(
    c => c.archiveProfileId === profileId
  );
}

// ─────────────────────────────────────────
// COMPLETENESS CHECK
// The Coronation Street warning, implemented.
// Content without a humanStory cannot be published.
// This function tells you what's missing.
// ─────────────────────────────────────────

export interface CompletenessReport {
  contentId: string;
  title: string;
  isComplete: boolean;
  missingFields: string[];
  canPublish: boolean;
  warning?: string;
}

export function checkCompleteness(
  content: PlatformContent
): CompletenessReport {
  const missing: string[] = [];

  if (!content.humanStory.displayName.trim()) {
    missing.push('humanStory.displayName — who made this?');
  }
  if (!content.humanStory.originStory.trim()) {
    missing.push(
      'humanStory.originStory — the one sentence that explains how this came to exist. ' +
      'This is the most important field on the platform. It cannot be empty.'
    );
  }
  if (content.journey.length === 0) {
    missing.push('journey — at least one stop must be recorded');
  }

  const isComplete = missing.length === 0;
  const canPublish = isComplete && hasHumanStory(content);

  return {
    contentId: content.id,
    title: content.title,
    isComplete,
    missingFields: missing,
    canPublish,
    warning: !isComplete
      ? `This content is missing ${missing.length} required field${missing.length > 1 ? 's' : ''}. ` +
        `It cannot be published until the humanStory is complete.`
      : undefined,
  };
}

// ─────────────────────────────────────────
// CONTENT FEED BUILDER
// Generates feed items for programme displays,
// Rayd-yo listings, and social media.
// ─────────────────────────────────────────

export function buildFeedItem(content: PlatformContent): ContentFeedItem {
  const summary: ContentJourneySummary = {
    contentId:         content.id,
    title:             content.title,
    format:            content.format,
    humanStory:        content.humanStory,
    originProgramme:   content.originProgramme,
    currentStatus:     content.status,
    journeyHighlights: getJourneyHighlights(content),
    connections:       content.connections,
    publishedAt:       content.publishedAt,
  };

  const socialPost = generateSocialPost(content);

  const raydyoIntro = (
    content.format === 'broadcast-segment' ||
    content.format === 'performance-piece' ||
    content.format === 'poem' ||
    content.format === 'anansi-retelling' ||
    content.format === 'script'
  ) ? generateRadyoIntro(content) : undefined;

  return { content: summary, socialPost, raydyoIntro };
}

export function buildProgrammeFeed(
  programmeId: ProgrammeId,
  limit = 20
): ContentFeedItem[] {
  return getPublishedContent(programmeId)
    .sort((a, b) =>
      new Date(b.publishedAt ?? b.updatedAt).getTime() -
      new Date(a.publishedAt ?? a.updatedAt).getTime()
    )
    .slice(0, limit)
    .map(buildFeedItem);
}

// ─────────────────────────────────────────
// SOCIAL MEDIA CONTENT ENGINE
// Given a programme, return the ready-to-post
// social content for the most recent
// completed journeys.
// This is the coherent voice the platform needs.
// ─────────────────────────────────────────

export interface SocialMediaBundle {
  programme: ProgrammeId;
  programmeName: string;
  generatedAt: string;
  posts: Array<{
    contentId: string;
    title: string;
    humanStory: string;  // the originStory — always the hook
    short: string;
    medium: string;
    long: string;
    raydyoIntro?: string;
    journeyLength: number;
    crossedProgrammes: boolean;
  }>;
}

export function generateSocialMediaBundle(
  programmeId: ProgrammeId,
  limit = 5
): SocialMediaBundle {
  const feed = buildProgrammeFeed(programmeId, limit);

  return {
    programme:     programmeId,
    programmeName: PROGRAMME_LABELS[programmeId],
    generatedAt:   new Date().toISOString(),
    posts: feed.map(item => ({
      contentId:        item.content.contentId,
      title:            item.content.title,
      humanStory:       item.content.humanStory.originStory,
      short:            item.socialPost.short,
      medium:           item.socialPost.medium,
      long:             item.socialPost.long,
      raydyoIntro:      item.raydyoIntro,
      journeyLength:    item.content.journeyHighlights.length,
      crossedProgrammes: item.content.journeyHighlights.length > 1,
    })),
  };
}

// ─────────────────────────────────────────
// PROGRAMME STATS
// For dashboards and impact reporting.
// Answers the human question:
// how many lives has this programme touched?
// ─────────────────────────────────────────

export function getProgrammeStats(
  programmeId: ProgrammeId
): ProgrammeContentStats {
  const allContent = getContentByProgramme(programmeId);
  const published = allContent.filter(c =>
    c.status === 'published' ||
    c.status === 'broadcast' ||
    c.status === 'archived'
  );
  const broadcast = allContent.filter(c => c.status === 'broadcast');
  const crossProgramme = allContent.filter(hasCrossedProgrammes);
  const completed = allContent.filter(c => c.status === 'archived');

  const uniqueCreators = new Set(
    published.map(c => c.humanStory.displayName.toLowerCase().trim())
  );

  const totalRevenue = published.reduce(
    (sum, c) => sum + (c.revenue?.totalEarned ?? 0),
    0
  );

  return {
    programmeId,
    totalContent:        allContent.length,
    publishedContent:    published.length,
    broadcastContent:    broadcast.length,
    crossProgrammeContent: crossProgramme.length,
    completedJourneys:   completed.length,
    activeHumanStories:  uniqueCreators.size,
    revenueGenerated:    totalRevenue > 0 ? totalRevenue : undefined,
  };
}

// ─────────────────────────────────────────
// CONNECTION BUILDER
// Creates typed connections between content.
// ─────────────────────────────────────────

export function connectContent(
  sourceId: string,
  targetId: string,
  type: CrossProgrammeConnection['type'],
  label: string,
  targetProgramme: ProgrammeId
): void {
  const source = contentStore.get(sourceId);
  const target = contentStore.get(targetId);

  if (!source || !target) {
    console.error(`[ContentJourney] Cannot connect: one or both content items not found`);
    return;
  }

  const connection: CrossProgrammeConnection = {
    type,
    programme: targetProgramme,
    contentId:  targetId,
    label,
  };

  updateContent({
    ...source,
    connections: [...source.connections, connection],
    relevantProgrammes: source.relevantProgrammes.includes(targetProgramme)
      ? source.relevantProgrammes
      : [...source.relevantProgrammes, targetProgramme],
  });
}

// ─────────────────────────────────────────
// ANANSI SEED TRACKER
// Tracks which seeds have been used,
// which journeys they've generated,
// and which have made it to Rayd-yo.
// ─────────────────────────────────────────

export interface SeedJourneyRecord {
  seedId: string;
  contentIds: string[];          // all content that originated from this seed
  raydyoBroadcasts: string[];    // content IDs that made it to broadcast
  brightSparksCount: number;     // how many Bright Sparks used this seed
  pageturnersCount: number;      // how many Pageturners writers used this seed
  mostRecentUse?: string;        // ISO date
}

const seedJourneyStore: Map<string, SeedJourneyRecord> = new Map();

export function recordSeedUse(
  seedId: string,
  contentId: string,
  programme: 'bright-sparks' | 'pageturners'
): void {
  const existing = seedJourneyStore.get(seedId) ?? {
    seedId,
    contentIds: [],
    raydyoBroadcasts: [],
    brightSparksCount: 0,
    pageturnersCount: 0,
  };

  seedJourneyStore.set(seedId, {
    ...existing,
    contentIds: [...existing.contentIds, contentId],
    brightSparksCount: programme === 'bright-sparks'
      ? existing.brightSparksCount + 1
      : existing.brightSparksCount,
    pageturnersCount: programme === 'pageturners'
      ? existing.pageturnersCount + 1
      : existing.pageturnersCount,
    mostRecentUse: new Date().toISOString(),
  });
}

export function recordSeedBroadcast(seedId: string, contentId: string): void {
  const existing = seedJourneyStore.get(seedId);
  if (!existing) return;
  seedJourneyStore.set(seedId, {
    ...existing,
    raydyoBroadcasts: [...existing.raydyoBroadcasts, contentId],
  });
}

export function getSeedJourney(seedId: string): SeedJourneyRecord | undefined {
  return seedJourneyStore.get(seedId);
}

export function getMostProductiveSeeds(limit = 5): SeedJourneyRecord[] {
  return Array.from(seedJourneyStore.values())
    .sort((a, b) => b.contentIds.length - a.contentIds.length)
    .slice(0, limit);
}