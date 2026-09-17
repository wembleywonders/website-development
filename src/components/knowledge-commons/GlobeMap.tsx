import React, { useMemo, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { CommonsContext } from './KnowledgeCommonsShell';

// ─────────────────────────────────────────────────────────────────────────────
// GLOBE MAP (flat SVG, Natural Earth projection)
//
// Two distinct data layers, kept structurally separate per design decision:
//   1. Choropleth fill  — KcEthnographicConcentration (region-level %,
//      renders as country shading; this is POPULATION data)
//   2. Point markers    — KcGeoPin (citation/study anchors; NOT population
//      data — do not conflate with layer 1, see prior session notes)
//
// Ported here 14 Sept 2026 from src/pages/heritage/GlobeMap.tsx, per the
// decision to add this feature to the live, routed Shell (this directory)
// rather than route traffic to the unrouted pages/heritage/ fork. This is a
// deliberate second copy of the component — the two KnowledgeCommonsShell
// trees have genuinely diverged (different CSS token systems: this one
// bridges to HomePage.css's --hp-* tokens, pages/heritage/ has its own
// self-contained --kc-* tokens) so the component itself couldn't be shared
// as-is without picking a token system. The underlying seed data
// (kcTainoAncestryEntry, world-110m.json) is NOT duplicated — both copies
// import it from src/pages/heritage/, its original location.
//
// Both items this component originally needed verified before wiring in
// (CommonsContext shape match; vendored topology id format) were checked
// directly against the real files when first wired into pages/heritage/'s
// Shell — see that file's own header for the specifics. This copy's
// CommonsContext is re-confirmed identical in shape to that one.
// ─────────────────────────────────────────────────────────────────────────────

// Numeric ISO 3166-1 → alpha-2, covering only the codes the current seed data
// needs. Verified directly against the real vendored topology's `id` field —
// extend this map before adding a country whose code isn't already listed
// here.
//
// 2026-09-17: extended for the Brent diaspora pins entry, mirroring the
// same extension made to src/pages/heritage/GlobeMap.tsx (the two trees
// are unshared but kept structurally in sync by hand — see this file's
// own header comment on why). The five new codes were re-verified the
// same way as the original five, read directly out of world-110m.json's
// geometries rather than assumed from memory.
const ISO_NUMERIC_TO_ALPHA2: Record<string, string> = {
  '630': 'PR', // Puerto Rico
  '192': 'CU', // Cuba
  '214': 'DO', // Dominican Republic
  '388': 'JM', // Jamaica
  '332': 'HT', // Haiti
  '356': 'IN', // India
  '706': 'SO', // Somalia
  '372': 'IE', // Ireland
  '620': 'PT', // Portugal
  '826': 'GB', // United Kingdom
};

export interface KcEthnographicConcentration {
  region: string;
  country_code: string; // alpha-2
  metric: string;
  value_pct: number;
  colonial_administration: 'Spanish' | 'English' | 'French' | 'Dutch';
  source_note: string;
}

export interface KcGeoPin {
  location: string;
  lat: number;
  lng: number;
  pin_type: 'high_signal' | 'contrast';
  finding: string;
  source_note: string;
  /**
   * Added 2026-09-17 for the Brent diaspora pins entry — both optional so
   * the existing Taino entry's pins (source_note only) need no migration.
   * cross_link_country is metadata for now: clicking a pin does nothing
   * (see header note — pin and choropleth/country layers are deliberately
   * separate), so this isn't wired to any navigation yet.
   */
  sources?: string[];
  /** ISO 3166-1 alpha-2 — must resolve via ISO_NUMERIC_TO_ALPHA2 above to
   *  actually align with a rendered country polygon; not enforced at the
   *  type level. */
  cross_link_country?: string;
}

interface GlobeMapProps {
  ctx: CommonsContext;
  concentration: KcEthnographicConcentration[];
  pins: KcGeoPin[];
  /** World Atlas 110m topology — passed in rather than imported directly
   *  here, so this component doesn't hardcode a data-loading strategy the
   *  rest of this Shell might not use. Sourced from
   *  src/pages/heritage/world-110m.json (not duplicated here). */
  topology: Topology;
}

const ADMIN_COLOURS: Record<KcEthnographicConcentration['colonial_administration'], string> = {
  Spanish: '#d4a853',
  English: '#3ecfcf',
  French: '#9b7fe8',
  Dutch: '#f97316',
};

const PIN_COLOURS: Record<KcGeoPin['pin_type'], string> = {
  high_signal: '#4ade80',
  contrast: '#f87171',
};

const GlobeMap: React.FC<GlobeMapProps> = ({ ctx, concentration, pins, topology }) => {
  const [activeCountry, setActiveCountry] = useState<string | null>(
    ctx.activeId ?? null
  );

  const projection = useMemo(() => geoNaturalEarth1().scale(160).translate([400, 250]), []);
  const path = useMemo(() => geoPath(projection), [projection]);

  const countries = useMemo(() => {
    const obj = topology.objects.countries as GeometryCollection;
    return (feature(topology, obj) as any).features as Array<{
      id: string;
      properties: { name: string };
      geometry: any;
    }>;
  }, [topology]);

  // Group concentration entries by country for quick lookup during render.
  // A country can have more than one metric (e.g. Puerto Rico has both
  // nuclear-ancestry % and mtDNA-haplogroup %) — keep the highest value_pct
  // for fill intensity, but retain all entries for the detail panel.
  const concentrationByCountry = useMemo(() => {
    const map = new Map<string, KcEthnographicConcentration[]>();
    for (const entry of concentration) {
      const list = map.get(entry.country_code) ?? [];
      list.push(entry);
      map.set(entry.country_code, list);
    }
    return map;
  }, [concentration]);

  const openCountry = (alpha2: string) => {
    setActiveCountry(alpha2);
    ctx.setActiveId(alpha2);
  };

  const closeCountry = () => {
    setActiveCountry(null);
    ctx.setActiveId(null);
  };

  const activeEntries = activeCountry ? concentrationByCountry.get(activeCountry) : null;

  if (activeCountry && activeEntries) {
    const primary = activeEntries[0];
    return (
      <div className="kc-marker-detail">
        <button className="kc-back-btn" onClick={closeCountry}>← World map</button>

        <div
          className="kc-marker-detail-header"
          style={{ '--marker-colour': ADMIN_COLOURS[primary.colonial_administration] } as React.CSSProperties}
        >
          <div className="kc-marker-type-badge">{primary.colonial_administration} colonial administration</div>
          <h2 className="kc-marker-detail-name">{primary.region}</h2>
        </div>

        <div className="kc-marker-sections">
          {activeEntries.map((entry, i) => (
            <div className="kc-marker-section" key={i}>
              <span className="kc-marker-section-label">{entry.metric}</span>
              <p className="kc-marker-section-text">
                {entry.value_pct}% — {entry.source_note}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="kc-map kc-globe-map">
      <svg viewBox="0 0 800 500" className="kc-globe-svg" role="img" aria-label="World map, ethnographic concentration overlay">
        {countries.map((c) => {
          const alpha2 = ISO_NUMERIC_TO_ALPHA2[c.id];
          const entries = alpha2 ? concentrationByCountry.get(alpha2) : undefined;
          const maxEntry = entries?.reduce((a, b) => (a.value_pct > b.value_pct ? a : b));
          const fill = maxEntry
            ? ADMIN_COLOURS[maxEntry.colonial_administration]
            : '#2a2f3a';
          const opacity = maxEntry ? 0.35 + (maxEntry.value_pct / 100) * 0.6 : 0.15;

          return (
            <path
              key={c.id}
              d={path(c.geometry) ?? undefined}
              className={`kc-globe-country${maxEntry ? ' kc-globe-country--data' : ''}`}
              style={{ fill, fillOpacity: opacity }}
              onClick={() => alpha2 && entries && openCountry(alpha2)}
            >
              <title>{c.properties.name}</title>
            </path>
          );
        })}

        {pins.map((pin, i) => {
          const [x, y] = projection([pin.lng, pin.lat]) ?? [0, 0];
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={4}
              className="kc-globe-pin"
              style={{ fill: PIN_COLOURS[pin.pin_type] }}
            >
              <title>{`${pin.location}: ${pin.finding}`}</title>
            </circle>
          );
        })}
      </svg>

      <div className="kc-globe-legend">
        <span className="kc-filter-label">Colonial administration</span>
        {(Object.keys(ADMIN_COLOURS) as Array<keyof typeof ADMIN_COLOURS>).map((k) => (
          <span key={k} className="kc-globe-legend-item">
            <span className="kc-globe-legend-dot" style={{ background: ADMIN_COLOURS[k] }} />
            {k}
          </span>
        ))}
        <span className="kc-filter-label" style={{ marginLeft: '1rem' }}>Citation pins</span>
        {(Object.keys(PIN_COLOURS) as Array<keyof typeof PIN_COLOURS>).map((k) => (
          <span key={k} className="kc-globe-legend-item">
            <span className="kc-globe-legend-dot" style={{ background: PIN_COLOURS[k] }} />
            {k === 'high_signal' ? 'High signal' : 'Contrast'}
          </span>
        ))}
      </div>

      <p className="kc-map-footnote">
        Boundaries: World Atlas (Natural Earth), vendored snapshot. Shading =
        ethnographic concentration data. Dots = citation anchors, not
        population data.
      </p>
    </div>
  );
};

export default GlobeMap;
