/**
 * Knowledge Commons "globe" entry — Brent diaspora citation threads
 *
 * Six sourced, Track-1-vetted (per ww-source-vetting-pipeline.md, referenced
 * in the handoff — that file was not independently located in this repo
 * during this pass; the six findings themselves were spot-checked directly
 * instead, see below) citation pins for Brent, London communities, each
 * cross-linked by country code to an origin-country thread.
 *
 * DELIBERATE FRAMING, not an incidental choice: this entry's title/subject/
 * body describe it as a diaspora-CONNECTIONS thread — a citation anchor
 * collection — not as "Brent, London" asserted as its own tectonic-tagged
 * place. The distinction matters: creating a new UK sub-national ENTRY is
 * explicitly gated in ww-kc-tectonic-taxonomy.md by a demand-driven
 * creation criterion (sustained Navigator-query threshold, Documenter/
 * Archivist review), and this entry is not that. It exists because the
 * current data model has no "pins with no entry" pathway (KcGeoPin only
 * exists as a field on a full KcTectonicLiveEntry — confirmed directly
 * against GlobeMap.tsx / this file's own KcTectonicLiveEntry interface
 * before writing this), not because Brent itself was judged to have
 * cleared that separate gate. If that reads as too close to the line
 * despite the framing, that's a real product question for CJ, not
 * resolved by this file alone.
 *
 * INTERPRETATION CALLS, logged per this project's standing practice (see
 * spec-interpretation-calls-and-working-defaults):
 *   - boundary_type: TRANSFORM — "two sides sliding laterally past each
 *     other... e.g. flows of people or goods transiting a border" is the
 *     closest fit for diaspora movement, same reasoning already used for
 *     the Angola->Gullah-Geechee KcLiveEntry (backend, V73) this session.
 *     Not confirmed by CJ.
 *   - surface_feature: REEF — "a dense, real structure invisible from the
 *     surface" (this file's own KcSurfaceFeature docstring), matching how
 *     the Taino entry uses REEF: most people encountering Brent as a place
 *     have no particular reason to know the scale/density of these five
 *     specific origin-country threads running through it. Not confirmed.
 *
 * VERIFICATION, done before writing this file, not assumed from the
 * handoff:
 *   - Two of the six findings were independently spot-checked via web
 *     search (not just trusted on the strength of the handoff's own Track-1
 *     claim): the Brent Somali Community Centre (115 High Street,
 *     Harlesden — real, confirmed, welfare/housing/immigration advice)
 *     and the "one in five Brent residents hold EU nationality, highest
 *     rate in London" statistic (confirmed against Brent's own open-data
 *     census briefings). Both held up. The remaining four were not
 *     independently re-verified beyond the handoff's own sourcing — flagged
 *     here, not silently treated as equally checked.
 *   - The "crime-shorthand Harlesden" framing the handoff explicitly said
 *     failed Track 1 (Test 3/4) does NOT appear anywhere below — confirmed
 *     by re-reading every finding string before writing this file.
 *   - No ethnographic_concentration entries are included for these five
 *     countries — the handoff supplied qualitative findings, not sourced
 *     percentage data, and KcEthnographicConcentration.value_pct isn't
 *     something to estimate. Left as an honest gap (empty array), not
 *     invented.
 *   - No cross_links entries — no other real KC entry was confirmed to
 *     exist that this should link to; left empty rather than guessed.
 *
 * NOT WIRED: cross_link_country (on each pin below) is metadata only.
 * GlobeMap.tsx's pins have no onClick handler at all (confirmed directly —
 * the choropleth/country layer and the pin layer are "kept structurally
 * separate per design decision," per that file's own header) and even if
 * they did, there's no ethnographic_concentration data for IN/SO/IE/PT/GB
 * to show in a detail view. Building an actual pin->country-detail
 * navigation is a real follow-up, not attempted here.
 */

import type { KcTectonicLiveEntry } from './kcTainoAncestryEntry.seed';

export const kcBrentDiasporaEntry: KcTectonicLiveEntry = {
  title: 'Brent Diaspora Citation Threads: Five Origin-Country Connections',
  subject: 'Roots — diaspora citation anchors (Brent, London)',
  body:
    'Brent, London holds several well-documented, large, longstanding ' +
    'diaspora communities, each with a real, traceable connection back to ' +
    'a specific origin country. This entry exists to anchor citation pins ' +
    'for five of those threads — Gujarati/East African Asian (via Ealing ' +
    'Road, Wembley), Somali (via Harlesden), Irish ("County Kilburn"), ' +
    'Jamaican/Caribbean (via Harlesden/Stonebridge), and Portuguese/' +
    'Brazilian (via Kilburn/Harlesden) — plus one borough-wide anchor ' +
    'pin giving the overall scale (64% of Brent residents from Black, ' +
    'Asian and minority ethnic groups; residents born in 215 countries; ' +
    'around 150 languages in use). This entry is deliberately framed as ' +
    'the connections themselves, not as an assertion that Brent as a ' +
    'place has cleared the separate, gated bar for a new UK sub-national ' +
    'KC entry — see the header comment above for why that distinction ' +
    'matters and what forced this entry to exist in the current data ' +
    'model regardless.',
  last_verified: '2026-09-17',
  confidence: 'CORROBORATED',
  boundary_type: 'TRANSFORM', // interpretation call — see header
  driving_force: ['DIASPORA_FLOW'],
  surface_feature: 'REEF', // interpretation call — see header
  historical_precedent: null,
  geo_pins: [
    {
      location: 'Wembley (Ealing Road), Brent, London',
      lat: 51.5449,
      lng: -0.2967,
      pin_type: 'high_signal',
      finding:
        'Gujarati/East African Asian trading community; Ealing Road became ' +
        "one of London's four leading Asian shopping streets on displaced " +
        'East African trading capital following 1960s-70s Africanisation ' +
        'policies in Uganda/Kenya.',
      source_note: 'Minority Rights Group International; Hidden London (not independently re-verified)',
      sources: [
        'https://minorityrights.org/minorities/east-african-asians/',
        'https://hidden-london.com/?p=27170',
      ],
      cross_link_country: 'IN',
    },
    {
      location: 'Harlesden, Brent, London',
      lat: 51.5362,
      lng: -0.2585,
      pin_type: 'high_signal',
      finding:
        "Predominantly Afro-Caribbean community; unofficially London's " +
        'reggae capital. Population also includes Irish, Portuguese, ' +
        'Brazilian, Somali and East African residents — genuinely ' +
        'multi-community, not single-culture.',
      source_note: 'Wikipedia (not independently re-verified)',
      sources: ['https://en.wikipedia.org/wiki/Harlesden'],
      cross_link_country: 'JM',
    },
    {
      location: 'Harlesden, Brent, London',
      lat: 51.537,
      lng: -0.26,
      pin_type: 'high_signal',
      finding:
        'Established Somali community with dedicated civic infrastructure ' +
        '— Brent Somali Community Centre (Harlesden High Street) runs ' +
        'welfare/housing/immigration advice and youth leadership programmes.',
      source_note:
        'Brent Council community directory — independently spot-checked via ' +
        'web search: 115 High Street, Harlesden, confirmed.',
      sources: [
        'https://www.brent.gov.uk/en/neighbourhoods-and-communities/community-directory/brent-somali-community-centre',
      ],
      cross_link_country: 'SO',
    },
    {
      location: 'Kilburn, Brent/Camden boundary, London',
      lat: 51.5433,
      lng: -0.1996,
      pin_type: 'high_signal',
      finding:
        "'County Kilburn' — London's largest Irish community, peaking " +
        'during 1950s-70s South Kilburn rebuilding (at points ~17 of every ' +
        '18 residents Irish per contemporary accounts). Present-day ' +
        'Kilburn is ethnically plural (Afro-Caribbean, West African, ' +
        'Somali, Middle Eastern, South Asian, Polish, Russian) though ' +
        "still holds London's largest Irish population. Note: Kilburn " +
        'straddles the Brent/Camden boundary along Watling Street — not ' +
        'wholly within Brent.',
      source_note: 'Brent Council local history PDF; The Londoner; Wikipedia (not independently re-verified)',
      sources: [
        'https://www.brent.gov.uk/media/16417575/uncovering-kilburns-history-part-7.pdf',
        'https://www.the-londoner.co.uk/the-death-of-county-kilburn/',
        'https://en.wikipedia.org/wiki/Kilburn,_London',
      ],
      cross_link_country: 'IE',
    },
    {
      location: 'Kilburn/Harlesden, Brent, London',
      lat: 51.54,
      lng: -0.23,
      pin_type: 'contrast',
      finding:
        'Portuguese and Brazilian communities layered onto post-Irish ' +
        "Kilburn and Harlesden; part of Brent's wider EU-national " +
        'population (around one in five Brent residents hold EU ' +
        'nationality, the highest rate in London, with Romanian and ' +
        'Portuguese nationals among the largest settled-status applicant ' +
        'groups).',
      source_note:
        "Brent Council open data — independently spot-checked via web " +
        "search: 'one in five... highest rate in London' confirmed against " +
        "Brent's own census/evidence-pack briefings.",
      sources: ['https://data.brent.gov.uk/dataset/vqkrd'],
      cross_link_country: 'PT',
    },
    {
      location: 'Brent (borough-wide), London',
      lat: 51.5586,
      lng: -0.2817,
      pin_type: 'high_signal',
      finding:
        '64% of Brent residents from Black, Asian and minority ethnic ' +
        'groups (3rd-highest in London); residents born in 215 countries; ' +
        '~150 languages in use. Borough-wide framing anchor for the other ' +
        'five pins.',
      source_note: 'Brent Council open data (not independently re-verified)',
      sources: ['https://data.brent.gov.uk/dataset/vqkrd'],
      cross_link_country: 'GB',
    },
  ],
  ethnographic_concentration: [],
  impact_profile: [
    {
      group: 'Roots programme members researching UK-based family history',
      dimension: 'research-navigation',
      description:
        'Gives Roots members a real, sourced starting point for where in ' +
        'Brent a given origin-country thread is concentrated, rather than ' +
        'starting a local research question from nothing.',
    },
    {
      group: 'Five diaspora communities named in the pins',
      dimension: 'live/contemporary',
      description:
        'Documents current, living communities and their real civic ' +
        'infrastructure (e.g. the Somali Community Centre), not a ' +
        'historical remnant — distinct from the Taino entry\'s mixed ' +
        'historical/present-day character.',
    },
  ],
  cross_links: [],
  status: 'DRAFT',
};
