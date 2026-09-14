/**
 * Knowledge Commons "globe" entry — Taino ancestry in the Caribbean diaspora
 *
 * Drafted against the LOCKED taxonomy spec in ww-kc-tectonic-taxonomy
 * (Layer 1: boundary type, Layer 2: driving force, Layer 3: surface feature).
 *
 * IMPORTANT: that taxonomy is itself "not yet implemented in any migration"
 * as of the 6-7 Sept 2026 design session — it supersedes the old single
 * tectonic_tags enum (STABILITY/VOLATILITY/HOTSPOT/FLASHPOINT/GLACIER/
 * FRACTURE) currently live in V71/V72, but that migration hasn't shipped.
 * This file is therefore the FORWARD-LOOKING shape, not something you can
 * paste into the current live schema as-is. Two things need deciding before
 * it can move from draft to real seed data:
 *   1. The taxonomy migration itself (boundary_type/driving_force/
 *      surface_feature columns don't exist yet).
 *   2. Whether "the globe" is scoped to live/current dynamics only, or also
 *      holds settled historical REEFs like this one — the open question
 *      flagged for Lahontan/Adario applies here too, just less acutely,
 *      since this entry does have a live present-day thread (Puerto Rico's
 *      active Taino-recognition movement) that Lahontan/Adario lacks.
 *
 * ALSO NOTE: the globe's base layer (continents/oceans/seas/WW's own
 * sourced country boundaries) and the map/globe UI itself are both
 * explicitly deferred as of the most recent backend session — "no
 * scraper feed, no scoring formula, no map/globe UI, no ROV/Maya
 * routing" was logged as out of scope for the live-tier schema work
 * that shipped. This file supplies THEMATIC OVERLAY DATA only (the
 * tectonic-taxonomy analytical layer, plus a separate ethnographic
 * concentration layer below), not the base map or its rendering —
 * those are a distinct, not-yet-started build.
 */

export type KcConfidence = 'CORROBORATED' | 'SINGLE_SOURCE' | 'UNVERIFIED';
export type KcStatus = 'DRAFT' | 'PENDING_REVIEW' | 'PUBLISHED';

// Layer 1 — relational/causal core
export type KcBoundaryType =
  | 'CONVERGENT_SUBDUCTION'
  | 'CONVERGENT_COLLISION'
  | 'DIVERGENT'
  | 'TRANSFORM';

// Layer 2 — driving force; array because the spec requires supporting a
// contested/multiple-candidate value rather than forcing one cause per entry
export type KcDrivingForce =
  | 'SLAB_PULL'
  | 'RIDGE_PUSH'
  | 'MANTLE_PLUME'
  | 'TIDAL_DRAG'
  | 'DIASPORA_FLOW';

// Layer 3 — descriptive, subordinate to Layers 1-2
export type KcSurfaceFeature =
  | 'REEF'
  | 'ACCESS_DENIED'
  | 'CLIFF'
  | 'UNDERSEA_BANK'
  | 'ABYSSAL_PLAIN'
  | 'OCEANIC_PLATEAU'
  | 'UNRECOGNIZED_DE_FACTO'
  | 'SEISMIC_GAP';

// Point markers anchoring a specific citation/study — NOT population
// distribution. Use KcEthnographicConcentration below for that.
export interface KcGeoPin {
  location: string;
  lat: number;
  lng: number;
  pin_type: 'high_signal' | 'contrast';
  finding: string;
  source_note: string;
}

// Region/country-level population overlay — renders as a choropleth-style
// layer on the base map (continents/oceans/seas/WW's own sourced country
// boundaries), distinct from the point pins above. This is the actual
// "ethnographic concentration" layer.
export interface KcEthnographicConcentration {
  region: string;
  country_code: string; // ISO 3166-1 alpha-2, for choropleth join to the base map
  metric: string; // what's being measured, since mtDNA % and nuclear-ancestry % are not interchangeable
  value_pct: number;
  colonial_administration: 'Spanish' | 'English' | 'French' | 'Dutch';
  source_note: string;
}

export interface KcImpactProfileEntry {
  group: string;
  dimension: string;
  description: string;
}

export interface KcTectonicLiveEntry {
  title: string;
  subject: string;
  body: string;
  last_verified: string; // ISO date
  confidence: KcConfidence;
  boundary_type: KcBoundaryType;
  driving_force: KcDrivingForce[]; // array — see Layer 2 note above
  surface_feature: KcSurfaceFeature;
  // Required per spec: any MANTLE_PLUME-tagged entry needs a cross-link back
  // to the fixed root cause. No dedicated KC entry currently documents the
  // Spanish vs. English/French colonial administration/demographic-scale
  // differential itself — flagging this as a genuine gap, not filling it
  // with a fabricated link.
  historical_precedent: string | null;
  geo_pins: KcGeoPin[];
  ethnographic_concentration: KcEthnographicConcentration[];
  impact_profile: KcImpactProfileEntry[];
  cross_links: string[];
  status: KcStatus;
}

export const kcTainoAncestryEntry: KcTectonicLiveEntry = {
  title: 'Taino Ancestry in the Caribbean Diaspora: A Documented, Unevenly Distributed Reef',
  subject: 'Roots — diaspora ancestry (Indigenous American branch)',
  body:
    'Taino maternal DNA is well-corroborated across independent genetic ' +
    'studies as prominent in the former Spanish Caribbean — Puerto Rico, ' +
    'Cuba, and the Dominican Republic — at roughly 22-61% of maternal ' +
    'lineages by haplogroup, with an average of around 15% Native American ' +
    'nuclear ancestry in Puerto Ricans specifically. It is essentially ' +
    'absent in the former English and French Caribbean: 0.5% in Jamaica, ' +
    '0% in Haiti. Ancient DNA recovered from pre-contact Puerto Rico ' +
    'matches mtDNA haplotypes still found in modern Caribbean islanders, ' +
    'confirming genuine biological continuity rather than inference alone. ' +
    'The split tracks colonial timeline and demographic scale — earlier, ' +
    'sustained Spanish-era admixture versus later, larger-scale English/' +
    'French plantation-economy African importation that numerically ' +
    'diluted the surviving indigenous signal — not chance. The finding is ' +
    'a REEF: a dense, real structure invisible from the surface (most ' +
    'people encountering "Guyanese"/"Puerto Rican"/"Cuban" as ethnonyms ' +
    'have no reason to know an Indigenous American lineage sits inside ' +
    'them), documented rather than hidden, and it is not evenly ' +
    'distributed — the unevenness is itself part of the finding.',
  last_verified: '2026-09-14',
  confidence: 'CORROBORATED',
  boundary_type: 'DIVERGENT',
  driving_force: ['DIASPORA_FLOW', 'MANTLE_PLUME'],
  surface_feature: 'REEF',
  historical_precedent: null, // GAP — see interface comment above
  geo_pins: [
    {
      location: 'Puerto Rico',
      lat: 18.2208,
      lng: -66.5901,
      pin_type: 'high_signal',
      finding: '~61% A2 haplogroup frequency; ~15% average Native American nuclear ancestry',
      source_note: 'RSPH4A founder-mutation ancestry study; multiple mtDNA haplogroup studies',
    },
    {
      location: 'Cuba',
      lat: 21.5218,
      lng: -77.7812,
      pin_type: 'high_signal',
      finding: 'Taino maternal DNA prominent (22-61% range across ex-Spanish colonies)',
      source_note: 'Taino and African maternal heritage in the Greater Antilles (ScienceDirect)',
    },
    {
      location: 'Dominican Republic',
      lat: 18.7357,
      lng: -70.1627,
      pin_type: 'high_signal',
      finding: 'Pre-contact La Caleta site mtDNA links to modern DR/Caribbean populations',
      source_note: 'Lalueza-Fox et al., mtDNA from extinct Tainos (Annals of Human Genetics)',
    },
    {
      location: 'Jamaica',
      lat: 18.1096,
      lng: -77.2975,
      pin_type: 'contrast',
      finding: 'Taino maternal DNA ~0.5% — near-absent',
      source_note: 'Taino and African maternal heritage in the Greater Antilles (ScienceDirect)',
    },
    {
      location: 'Haiti',
      lat: 18.9712,
      lng: -72.2852,
      pin_type: 'contrast',
      finding: 'Taino maternal DNA 0.0% — absent in this dataset',
      source_note: 'Taino and African maternal heritage in the Greater Antilles (ScienceDirect)',
    },
  ],
  ethnographic_concentration: [
    {
      region: 'Puerto Rico',
      country_code: 'PR',
      metric: 'average nuclear Native American ancestry',
      value_pct: 15,
      colonial_administration: 'Spanish',
      source_note: 'RSPH4A founder-mutation ancestry study (64% Eur / 21% Afr / 15% Native American average)',
    },
    {
      region: 'Puerto Rico',
      country_code: 'PR',
      metric: 'A2 mtDNA haplogroup frequency (maternal, not equivalent to nuclear %)',
      value_pct: 61,
      colonial_administration: 'Spanish',
      source_note: 'Multiple mtDNA haplogroup studies, most abundant Taino maternal lineage',
    },
    {
      region: 'Cuba',
      country_code: 'CU',
      metric: 'Taino maternal (mtDNA) lineage frequency',
      value_pct: 33,
      colonial_administration: 'Spanish',
      source_note: 'Taino and African maternal heritage in the Greater Antilles (ScienceDirect)',
    },
    {
      region: 'Dominican Republic',
      country_code: 'DO',
      metric: 'Taino maternal (mtDNA) lineage frequency — upper end of ex-Spanish-colony range',
      value_pct: 61.3,
      colonial_administration: 'Spanish',
      source_note: 'Taino and African maternal heritage in the Greater Antilles (ScienceDirect); range across ex-Spanish colonies is 22.0-61.3%',
    },
    {
      region: 'Jamaica',
      country_code: 'JM',
      metric: 'Taino maternal (mtDNA) lineage frequency',
      value_pct: 0.5,
      colonial_administration: 'English',
      source_note: 'Taino and African maternal heritage in the Greater Antilles (ScienceDirect)',
    },
    {
      region: 'Haiti',
      country_code: 'HT',
      metric: 'Taino maternal (mtDNA) lineage frequency',
      value_pct: 0.0,
      colonial_administration: 'French',
      source_note: 'Taino and African maternal heritage in the Greater Antilles (ScienceDirect)',
    },
  ],
  impact_profile: [
    {
      group: 'Roots / Pageturners (Equiano Principle)',
      dimension: 'ancestral',
      description:
        'Documents an Indigenous American ancestral thread already inside ' +
        'the Caribbean diaspora bloodline — not a comparative parallel ' +
        'drawn from outside it.',
    },
    {
      group: 'Puerto Rico Taino-recognition movement',
      dimension: 'live/contemporary',
      description:
        'Genetic continuity data is actively cited in present-day identity ' +
        'and recognition debates — gives this entry a live thread that ' +
        'purely historical entries (e.g. Lahontan/Adario) lack.',
    },
  ],
  cross_links: ['kc-lahontan-adario-archive', 'ww-pageturners', 'ww-source-vetting-pipeline'],
  status: 'DRAFT',
};