/**
 * sandboxToStoreService.ts
 * Wembley Wonders CIC
 *
 * The pipeline between creation and sale.
 * A creator finishes something in a sandbox — this service
 * carries the work, its provenance, and its metadata
 * directly into a Cyberstore listing draft.
 *
 * No manual re-upload. No broken journey.
 * Make it → list it → sell it.
 *
 * Integration points:
 *   API base: /api/store/listings
 *   Provenance: /api/provenance (ProvenanceController.java)
 *   Creator profile: /api/creators/:id (CreatorMetricsController.java)
 *   Stripe: handled server-side in PaymentServiceImpl.java
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProgrammeSlug =
  | 'trubble-n-bass'
  | 'joystick'
  | 'kaywanas-court'
  | 'pageturners'
  | 'silk-stilettos'
  | 'stemgeneers'
  | 'techreneurs'
  | 'gtechcasters'
  | 'easy-street'
  | 'auntie-anansis-kitchen'
  | 'roots'
  | 'bright-sparks'
  | 'raydyo';

export type ProductType =
  | 'DIGITAL_DOWNLOAD'    // WAV, MP3, PDF, EPUB, ZIP — buyer gets a file
  | 'COMMISSION'          // Creator sells their capability — custom work
  | 'SESSION'             // Workshop, consultation, mentoring — booked time
  | 'SUBSCRIPTION_CONTENT'; // Recipes, archives, ongoing access

export type ListingStatus =
  | 'DRAFT'               // Created, not yet published
  | 'PENDING_REVIEW'      // Submitted, awaiting moderation (future)
  | 'LIVE'                // On sale
  | 'PAUSED'              // Creator paused it
  | 'SOLD_OUT';           // Limited edition, all gone

export type FileFormat =
  | 'WAV' | 'MP3' | 'FLAC'           // Audio
  | 'PDF' | 'EPUB' | 'DOCX' | 'MD'   // Documents
  | 'MP4' | 'MOV'                     // Video
  | 'PNG' | 'SVG' | 'AI' | 'FIGMA'   // Design
  | 'ZIP'                             // Bundle
  | 'JSON';                           // Data/structured

/** What the sandbox hands to the pipeline */
export interface SandboxExportPayload {
  // From the sandbox itself
  programmeSlug: ProgrammeSlug;
  sessionId: string;                  // The workspace session ID
  creatorId: string;
  exportedAt: Date;

  // The work
  title: string;                      // Pre-filled from session title
  description?: string;               // Optional — creator may have added notes
  fileFormat: FileFormat;
  fileSizeBytes: number;
  fileUrl: string;                    // Temporary signed URL from your storage
  thumbnailUrl?: string;              // Preview image if generated

  // Provenance — from ProvenanceRecord
  provenanceId: string;               // Links to existing provenance_records row
  creationDurationMinutes?: number;   // How long they worked on it
  toolsUsed?: string[];               // Which sandbox tools were used

  // Optional signals for listing pre-population
  suggestedTags?: string[];
  bpmIfAudio?: number;                // Trubble n Bass specific
  genreIfAudio?: string;
  wordCountIfText?: number;
}

/** The listing draft that goes to the Cyberstore */
export interface StoreListing {
  id?: string;                        // Assigned by backend on save
  creatorId: string;
  programmeSlug: ProgrammeSlug;
  provenanceId: string;               // Permanent link to creation record
  sessionId: string;

  // Listing content
  title: string;
  description: string;
  productType: ProductType;
  fileFormat?: FileFormat;
  fileSizeBytes?: number;

  // Pricing
  priceGBP: number | null;            // null = creator hasn't set it yet
  isFreeDownload: boolean;
  limitedEdition: boolean;
  editionSize?: number;               // If limited, how many copies

  // Media
  fileUrl: string;
  thumbnailUrl?: string;
  previewUrl?: string;                // 30-second preview for audio, first page for docs

  // Discovery
  tags: string[];
  wardTag?: string;                   // Brent ward geographic tag (from Joystick system)

  // Status
  status: ListingStatus;
  createdAt?: Date;
  publishedAt?: Date;

  // Revenue split (display only — enforced server-side)
  creatorSharePercent: 55;
  reserveSharePercent: 25;
  operationsSharePercent: 20;
}

/** What the API returns after saving a draft */
export interface StoreListingDraftResponse {
  listing: StoreListing;
  editUrl: string;                    // /cyberstore/listings/:id/edit
  previewUrl: string;                 // /cyberstore/listings/:id/preview
  publishUrl: string;                 // /cyberstore/listings/:id/publish
}

// ─── Programme metadata ───────────────────────────────────────────────────────

const PROGRAMME_CONFIG: Record<ProgrammeSlug, {
  label: string;
  defaultProductType: ProductType;
  defaultTags: string[];
  suggestedFormats: FileFormat[];
  pricingHint: string;
}> = {
  'trubble-n-bass': {
    label: 'Trubble n Bass',
    defaultProductType: 'DIGITAL_DOWNLOAD',
    defaultTags: ['music', 'beats', 'audio', 'trubble-n-bass'],
    suggestedFormats: ['WAV', 'MP3'],
    pricingHint: 'Original beats typically list at £2–£15. Exclusive rights command more.',
  },
  'joystick': {
    label: 'Joystick',
    defaultProductType: 'DIGITAL_DOWNLOAD',
    defaultTags: ['writing', 'gaming', 'joystick', 'culture'],
    suggestedFormats: ['PDF', 'EPUB'],
    pricingHint: 'Long-form pieces and guides typically list at £1–£8.',
  },
  'kaywanas-court': {
    label: "Kaywana's Court",
    defaultProductType: 'DIGITAL_DOWNLOAD',
    defaultTags: ['drama', 'script', 'performance', 'kaywanas-court'],
    suggestedFormats: ['PDF', 'DOCX'],
    pricingHint: 'Scripts and performance guides typically list at £3–£20.',
  },
  'pageturners': {
    label: 'Pageturners',
    defaultProductType: 'DIGITAL_DOWNLOAD',
    defaultTags: ['writing', 'literature', 'pageturners'],
    suggestedFormats: ['EPUB', 'PDF'],
    pricingHint: 'Original writing typically lists at £2–£12.',
  },
  'silk-stilettos': {
    label: 'Silk Stilettos',
    defaultProductType: 'COMMISSION',
    defaultTags: ['fashion', 'design', 'wearable', 'silk-stilettos'],
    suggestedFormats: ['PNG', 'AI', 'SVG'],
    pricingHint: 'Custom designs and commissions — set your rate per project.',
  },
  'stemgeneers': {
    label: 'STEMgeneers',
    defaultProductType: 'DIGITAL_DOWNLOAD',
    defaultTags: ['stem', 'engineering', 'design', 'stemgeneers'],
    suggestedFormats: ['PDF', 'ZIP'],
    pricingHint: 'Technical guides and plans typically list at £5–£30.',
  },
  'techreneurs': {
    label: 'TECHreneurs',
    defaultProductType: 'COMMISSION',
    defaultTags: ['tech', 'ip', 'business', 'techreneurs'],
    suggestedFormats: ['PDF'],
    pricingHint: 'Consultations and strategy sessions — set your hourly or project rate.',
  },
  'gtechcasters': {
    label: 'G-Tech Casters',
    defaultProductType: 'DIGITAL_DOWNLOAD',
    defaultTags: ['video', 'production', 'casting', 'gtechcasters'],
    suggestedFormats: ['MP4', 'MOV'],
    pricingHint: 'Video content typically lists at £3–£25.',
  },
  'easy-street': {
    label: 'Easy Street',
    defaultProductType: 'DIGITAL_DOWNLOAD',
    defaultTags: ['radio-drama', 'audio', 'easy-street'],
    suggestedFormats: ['MP3', 'WAV'],
    pricingHint: 'Radio drama episodes typically list at £1–£5.',
  },
  'auntie-anansis-kitchen': {
    label: "Auntie Anansi's Kitchen",
    defaultProductType: 'DIGITAL_DOWNLOAD',
    defaultTags: ['recipes', 'food', 'heritage', 'auntie-anansi'],
    suggestedFormats: ['PDF', 'EPUB'],
    pricingHint: 'Recipe collections typically list at £3–£15.',
  },
  'roots': {
    label: 'Roots Knowledge Archive',
    defaultProductType: 'SESSION',
    defaultTags: ['heritage', 'roots', 'knowledge', 'community'],
    suggestedFormats: ['PDF'],
    pricingHint: 'Heritage consultations and workshops — set your session rate.',
  },
  'bright-sparks': {
    label: 'Bright Sparks',
    defaultProductType: 'SESSION',
    defaultTags: ['education', 'youth', 'bright-sparks'],
    suggestedFormats: ['PDF'],
    pricingHint: 'Educational sessions — set your session rate.',
  },
  'raydyo': {
    label: 'Rayd-yo',
    defaultProductType: 'DIGITAL_DOWNLOAD',
    defaultTags: ['radio', 'audio', 'broadcast', 'raydyo'],
    suggestedFormats: ['MP3', 'WAV'],
    pricingHint: 'Broadcast recordings typically list at £1–£8.',
  },
};

// ─── Pipeline functions ───────────────────────────────────────────────────────

/**
 * Core pipeline function.
 * Takes a sandbox export and returns a pre-populated listing draft.
 * No API call yet — this builds the draft locally for the creator to review.
 */
export function buildListingDraft(
  payload: SandboxExportPayload,
  creatorDisplayName: string
): StoreListing {
  const config = PROGRAMME_CONFIG[payload.programmeSlug];

  // Merge suggested tags with programme defaults, deduplicated
  const tags = Array.from(new Set([
    ...config.defaultTags,
    ...(payload.suggestedTags ?? []),
    ...(payload.genreIfAudio ? [payload.genreIfAudio.toLowerCase()] : []),
  ]));

  // Build a sensible default description if the creator hasn't written one
  const defaultDescription = buildDefaultDescription(payload, config.label, creatorDisplayName);

  return {
    creatorId: payload.creatorId,
    programmeSlug: payload.programmeSlug,
    provenanceId: payload.provenanceId,
    sessionId: payload.sessionId,

    title: payload.title,
    description: payload.description ?? defaultDescription,
    productType: config.defaultProductType,
    fileFormat: payload.fileFormat,
    fileSizeBytes: payload.fileSizeBytes,

    priceGBP: null,                   // Creator must set — we never assume
    isFreeDownload: false,
    limitedEdition: false,

    fileUrl: payload.fileUrl,
    thumbnailUrl: payload.thumbnailUrl,

    tags,

    status: 'DRAFT',
    createdAt: new Date(),

    // Display only — enforced server-side
    creatorSharePercent: 55,
    reserveSharePercent: 25,
    operationsSharePercent: 20,
  };
}

function buildDefaultDescription(
  payload: SandboxExportPayload,
  programmeLabel: string,
  creatorName: string
): string {
  const parts: string[] = [];

  parts.push(`An original work by ${creatorName}, created through the ${programmeLabel} programme at Wembley Wonders.`);

  if (payload.bpmIfAudio) {
    parts.push(`${payload.bpmIfAudio} BPM.`);
  }
  if (payload.genreIfAudio) {
    parts.push(`Genre: ${payload.genreIfAudio}.`);
  }
  if (payload.wordCountIfText) {
    parts.push(`${payload.wordCountIfText.toLocaleString()} words.`);
  }
  if (payload.creationDurationMinutes && payload.creationDurationMinutes > 30) {
    const hours = Math.round(payload.creationDurationMinutes / 60 * 10) / 10;
    parts.push(`${hours} hours in the making.`);
  }

  parts.push(`Provenance verified. This work was created and documented on the Wembley Wonders platform.`);

  return parts.join(' ');
}

/**
 * Gets the pricing hint for a given programme.
 * Shown to the creator when they're setting their price.
 */
export function getPricingHint(programmeSlug: ProgrammeSlug): string {
  return PROGRAMME_CONFIG[programmeSlug].pricingHint;
}

/**
 * Gets programme display label.
 */
export function getProgrammeLabel(programmeSlug: ProgrammeSlug): string {
  return PROGRAMME_CONFIG[programmeSlug].label;
}

/**
 * Validates a listing draft before submission.
 * Returns array of error messages — empty means valid.
 */
export function validateListingDraft(listing: StoreListing): string[] {
  const errors: string[] = [];

  if (!listing.title?.trim()) {
    errors.push('Your listing needs a title.');
  }
  if (listing.title?.length > 120) {
    errors.push('Title must be 120 characters or fewer.');
  }
  if (!listing.description?.trim()) {
    errors.push('Please add a description — buyers need to know what they\'re getting.');
  }
  if (listing.description?.length > 2000) {
    errors.push('Description must be 2000 characters or fewer.');
  }
  if (!listing.isFreeDownload && (listing.priceGBP === null || listing.priceGBP === undefined)) {
    errors.push('Please set a price, or mark this as a free download.');
  }
  if (listing.priceGBP !== null && listing.priceGBP !== undefined) {
    if (listing.priceGBP < 0) errors.push('Price cannot be negative.');
    if (listing.priceGBP > 999) errors.push('Maximum listing price is £999.');
    if (listing.priceGBP > 0 && listing.priceGBP < 0.50) {
      errors.push('Minimum paid price is £0.50.');
    }
  }
  if (listing.limitedEdition && (!listing.editionSize || listing.editionSize < 1)) {
    errors.push('Limited edition listings need an edition size.');
  }

  return errors;
}

// ─── API calls ────────────────────────────────────────────────────────────────
// Wire these to your Spring Boot backend.
// Mirrors the pattern in services/creatorMetricsApi.ts

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

/**
 * Saves a listing draft to the backend.
 * POST /api/store/listings/draft
 */
export async function saveListingDraft(
  listing: StoreListing,
  token: string
): Promise<StoreListingDraftResponse> {
  const res = await fetch(`${API_BASE}/api/store/listings/draft`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(listing),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? `Failed to save listing draft (${res.status})`);
  }

  return res.json();
}

/**
 * Publishes a draft listing — makes it live in the Cyberstore.
 * POST /api/store/listings/:id/publish
 */
export async function publishListing(
  listingId: string,
  token: string
): Promise<StoreListing> {
  const res = await fetch(`${API_BASE}/api/store/listings/${listingId}/publish`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? `Failed to publish listing (${res.status})`);
  }

  return res.json();
}

/**
 * Fetches a creator's store listings.
 * GET /api/store/listings?creatorId=:id
 */
export async function getCreatorListings(
  creatorId: string,
  token: string
): Promise<StoreListing[]> {
  const res = await fetch(
    `${API_BASE}/api/store/listings?creatorId=${creatorId}`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );

  if (!res.ok) throw new Error('Failed to fetch listings');
  return res.json();
}