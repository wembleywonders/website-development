// src/components/investigations/investigationsData.ts
// Active Investigations — the research-vessel principle made member-facing.
//
// Wembley Wonders does real research, not only teaching and archiving. Some of
// that research turns up a genuine lead with an uncorroborated claim and an
// unresolved question, all at once. Rather than force a false resolution or
// quietly drop it, those threads are held open — honestly labelled — and shown
// to members as "here's what we're still figuring out, want to help dig?"
//
// Full principle: docs/research/WW-RESEARCH-VESSEL-PRINCIPLE.md
// Internal working files live under docs/research/ (KC-*, WW-OPEN-INVESTIGATIONS).

export type InvestigationStatus = 'active' | 'stabilising' | 'resolved';

export const STATUS_CONFIG: Record<
  InvestigationStatus,
  { label: string; note: string; colour: string }
> = {
  active: {
    label: 'Active investigation',
    note: 'Load-bearing facts are still moving. Revisited, not settled.',
    colour: '#d4a853',
  },
  stabilising: {
    label: 'Stabilising',
    note: 'The open questions are narrowing. Not yet locked.',
    colour: '#6ea8fe',
  },
  resolved: {
    label: 'Resolved',
    note: 'Closed out. Kept here for the trail.',
    colour: '#7bc47f',
  },
};

export interface Finding {
  claim: string;
  detail?: string;
}

export interface OpenQuestion {
  question: string;
  whyItMatters: string;
  whatWouldCloseIt: string;
}

export interface Correction {
  wasClaimed: string;
  actually: string;
  caughtOn: string;
}

export interface ContributeAsk {
  label: string;
  detail: string;
}

export interface CrossLink {
  label: string;
  href: string;
  /** true = in-app route, false/undefined = external URL */
  internal?: boolean;
}

export interface Source {
  label: string;
  url: string;
}

export interface Investigation {
  id: string;
  slug: string;
  title: string;
  status: InvestigationStatus;
  opened: string;
  lastReviewed: string;
  /** research lens — e.g. "Comparative structural research" */
  lens: string;
  region: string;
  /** one-paragraph "what we're tracking" */
  summary: string;
  /** deliberately narrow scope boundary */
  scopeNote: string;
  /** why this is held open rather than locked */
  whyOpen: string;
  confirmed: Finding[];
  uncorroborated: Finding[];
  openQuestions: OpenQuestion[];
  corrections: Correction[];
  contribute: {
    lead: string;
    asks: ContributeAsk[];
    email: string;
    emailSubject: string;
  };
  crossLinks: CrossLink[];
  /** repo-relative path to the full working file (provenance, not a link) */
  sourceDoc: string;
  sources: Source[];
}

// ─────────────────────────────────────────────────────────────────────────────

export const INVESTIGATIONS: Investigation[] = [
  {
    id: 'guiana-shield-diasporic-economy',
    slug: 'guiana-shield-diasporic-economy',
    title: 'The Guiana Shield as one interconnected diasporic economy',
    status: 'active',
    opened: '28 August 2026',
    lastReviewed: '28 August 2026',
    lens: 'Comparative structural research, with historiographical correction',
    region: 'Guyana · Suriname · French Guiana · wider CARICOM',
    summary: `Guyana's oil boom is inverting a fifty-year regional wealth hierarchy across
      the three Guianas — pulling labour from Suriname and the wider Caribbean, and leaving
      French Guiana structurally exposed as an EU dependency sitting between two increasingly
      wealthy sovereign neighbours. For Windrush-generation Guyanese-British families, it is
      the first time in living memory that the ancestral homeland is the richer place. We are
      tracking the economics, the institutional shifts, and what that inversion means for the
      historical diaspora.`,
    scopeNote: `Deliberately narrow: Guyana's boom and its labour pull, French Guiana's
      dependency bind, France's new role as a security partner, and the diaspora angle. This
      is not a full Venezuela / Essequibo geopolitical essay — that material appears only
      where it bears directly on the above.`,
    whyOpen: `Several load-bearing facts are genuinely unresolved in real time: the ICJ
      ruling on the 1899 border award is not expected until 2027–2028; the post-Maduro
      Venezuelan transition has an unknown endpoint and directly determines whether the
      Essequibo annexation risk rises or falls; Essequibo tension is a moving snapshot; and
      whether Guyana's oil fund resists elite capture is, in the IMF's own words, undecided.
      Locking this now would date it within months.`,
    confirmed: [
      {
        claim: 'Guyana grew 43.6% in 2024 — a fifth straight year of double-digit growth.',
        detail:
          'Oil output rose to about 616,000 barrels/day (from ~391,000 in 2023). Oil sector +57.7%, non-oil sector +13.1%. 2025 growth came in higher still, around 19%.',
      },
      {
        claim:
          'Guyana is the first-ever Heavily Indebted Poor Countries participant to reach high-income status.',
        detail:
          'It took HIPC debt relief in 1997 and 2000–2003; the World Bank reclassified it as high-income in July 2023. The IMF projects roughly 14%/year growth over the following five years.',
      },
      {
        claim:
          'The Natural Resource Fund held about US$3.1 billion at end-2024 — but its governance is contested.',
        detail:
          'The enabling law passed on a one-seat majority without broad consultation; watchdogs warned of capture risk. Guyana fell to 92nd of 180 on the 2024 Corruption Perceptions Index (from 87th in 2023), with Transparency International citing "state capture by political and economic elites."',
      },
      {
        claim:
          'On 4 July 2023, CARICOM agreed to extend freedom of movement to all its nationals.',
        detail:
          'IOM analysis names Guyana\'s oil and gas industry as "one important economic game changer — with potential large social implications" behind the timing. Guyana\'s own commentators frame it as a "brain drain / brain gain" gamble.',
      },
      {
        claim: 'Georgetown already hosts the CARICOM Secretariat.',
        detail:
          'Guyana holds the institutional seat of Caribbean integration — it is not petitioning for a role in it.',
      },
      {
        claim:
          "France opened its first resident embassy in Georgetown in September 2025 — the first EU country at that level.",
        detail:
          'It comes with a Joint Working Group on defence, climate, food security and infrastructure, a July 2024 military cooperation agreement, joint exercises (Fer de Lance 2025), and Guyanese acquisition of French maritime patrol assets — a security-partner role that lands directly on the Essequibo dispute. Bilateral trade, by contrast, was around €20 million in 2018.',
      },
      {
        claim:
          'Suriname is several years behind Guyana on the same trajectory.',
        detail:
          'The GranMorgu project offshore Suriname (Block 58) took its Final Investment Decision in October 2024 — a ~US$10.5 billion development by TotalEnergies (40%), APA Corporation (40%) and Staatsolie (20%), first oil targeted for 2028, FPSO capacity up to 220,000 bpd.',
      },
      {
        claim:
          "French Guiana is not a sovereign state — it is a French overseas department, legally part of France and the EU.",
        detail:
          'If Guyana\'s income per head keeps climbing toward the ~US$38,000 projected for 2028 while French Guiana stays dependent on transfers from Paris, it becomes the visibly poorer, dependency-model neighbour — a sharpened version of the grievance that drove the 2017 general strike there.',
      },
    ],
    uncorroborated: [
      {
        claim:
          'Whether the boom strengthens CARICOM or splits it is genuinely contested.',
        detail:
          'The 2023 free-movement decision is landmark integration. But the same forces could split the bloc into an oil-wealthy tier (Guyana, Suriname, Trinidad & Tobago) and a tourism / remittance-dependent island tier. Source material names this as "the open question," not a prediction.',
      },
      {
        claim:
          'The characterisation of the three Guianas as a "geopolitical labyrinth" is a framing from the academic literature, not a hard fact.',
        detail:
          'Retained as a useful lens — an interface between Caribbean, South American and European spheres rather than a coherent bloc — but it is an argument, not a measurement.',
      },
      {
        claim:
          "Guyana's internal pre-oil history is contested terrain within Guyana itself.",
        detail:
          'The Burnham vs. Jagan / PNC vs. PPP argument over the 1970s–80s economic collapse is live and ethnically charged. Any account has to present the nationalisation-era collapse without adopting one party\'s version wholesale.',
      },
    ],
    openQuestions: [
      {
        question:
          'Does the post-Maduro transition in Venezuela raise or lower the Essequibo annexation risk?',
        whyItMatters:
          'A US-aligned Venezuela with reopened oil access has less incentive for territorial adventurism — but a chaotic Venezuelan state collapse spilling across the border would be a different and possibly larger regional threat. Delcy Rodríguez, installed after the 3 January 2026 US capture of Maduro, comes from within the governing structure, not the opposition, and her hold on power is internally contested.',
        whatWouldCloseIt:
          'A stabilised Venezuelan government with a clear posture toward the border, or a clear read on which failure mode is more likely.',
      },
      {
        question:
          'Can Guyana\'s institutions resist capture by oil money the way Venezuela\'s and Nigeria\'s did not?',
        whyItMatters:
          'This determines whether the boom becomes broad-based development or a resource curse. The 2024 CPI decline and Transparency International\'s "state capture by elites" language point the wrong way; the sovereign wealth fund architecture and IMF relationship point the other way.',
        whatWouldCloseIt:
          'Several years of fund disbursement data, audited and public, plus whether the IMF\'s deficit-closure timeline is actually met.',
      },
      {
        question:
          'What does the inversion mean for Windrush-generation Guyanese-British families?',
        whyItMatters:
          'This is the part only Wembley Wonders can research — through the community\'s own relationships. Around 55% of Guyanese citizens live abroad and over 80% of university-educated Guyanese have emigrated; many left in the 1970s–80s when leaving was framed as permanent. "There was nothing to go back to" is abruptly no longer obviously true. A GDP chart cannot show what that does to a family.',
        whatWouldCloseIt:
          'First-person testimony from families who lived the emigration and are now watching the boom — gathered with consent, ideally spanning the generation that left, the generation born in Britain, and anyone considering return.',
      },
      {
        question:
          'When does the ICJ rule on the validity of the 1899 border award?',
        whyItMatters:
          'The substantive judgment in Guyana v. Venezuela is the legal anchor for the whole Essequibo question. Provisional-measures orders exist; the merits ruling does not.',
        whatWouldCloseIt:
          'The ICJ judgment itself, expected 2027–2028.',
      },
    ],
    corrections: [
      {
        wasClaimed:
          'Suriname\'s offshore project was "TotalEnergies alone... $1.5 billion", first oil 2028.',
        actually:
          'It is the GranMorgu development — a ~$10.5 billion project with APA Corporation as a co-equal 40% partner alongside TotalEnergies and Staatsolie, Final Investment Decision October 2024. First oil 2028 is correct.',
        caughtOn: '28 August 2026',
      },
      {
        wasClaimed:
          'Guyana ranked "87th of 180" on Transparency International\'s Corruption Perceptions Index.',
        actually:
          'That was the 2023 rank. On the 2024 index Guyana scored 39 and ranked 92nd of 180 — a decline — with Transparency International explicitly citing state capture by political and economic elites.',
        caughtOn: '28 August 2026',
      },
      {
        wasClaimed:
          'The relevant ICJ case is a "genocide case".',
        actually:
          'The Guyana v. Venezuela case at the ICJ concerns the validity of the 1899 border arbitration, not genocide. The "ruling is years away, do not treat as resolved" point still stands.',
        caughtOn: '28 August 2026',
      },
      {
        wasClaimed:
          '2025 growth was "revised upward to 15.2%".',
        actually:
          'That was an early-2025 forecast. The 2025 outturn came in materially higher, around 19%.',
        caughtOn: '28 August 2026',
      },
    ],
    contribute: {
      lead: `This investigation has a verified fact base and a clear priority next step —
        Windrush-generation testimony — that we cannot get from public sources. If your
        family's story runs through Guyana, Suriname or French Guiana, you can help move
        this from a well-sourced summary to original research.`,
      asks: [
        {
          label: 'Family testimony',
          detail:
            'What was said, at the time of leaving, about whether Guyana had a future? How was it talked about at home while the children grew up in Britain? What has the boom changed?',
        },
        {
          label: 'Correction or a better source',
          detail:
            'If a figure here is wrong or out of date, or you have a stronger source, tell us. Catching a false claim is a real contribution, on the same footing as a finding.',
        },
        {
          label: 'A lead we have missed',
          detail:
            'Documents, local reporting, academic work, or a person we should talk to — especially on the Suriname and French Guiana side, which is thinner here.',
        },
      ],
      email: 'admin@wembleywonders.org',
      emailSubject: 'Active Investigation: Guiana Shield',
    },
    crossLinks: [
      {
        label: 'Contribute oral history testimony',
        href: '/oral-history',
        internal: true,
      },
      {
        label: 'Knowledge Commons — the counter-archive',
        href: '/heritage',
        internal: true,
      },
    ],
    sourceDoc: 'docs/research/KC-GUIANA-SHIELD-DIASPORIC-ECONOMY-001.md',
    sources: [
      {
        label: 'IMF — Guyana 2025 Article IV consultation (staff statement & press release)',
        url: 'https://www.imf.org/en/news/articles/2025/05/07/pr-25132-guyana-imf-executive-board-concludes-2025-article-iv-consultation',
      },
      {
        label: 'Reuters — "Oil output, exports drove Guyana economy\'s growth of 43.6% in 2024"',
        url: 'https://money.usnews.com/investing/news/articles/2025-01-17/oil-output-exports-drove-guyana-economys-growth-of-43-6-in-2024',
      },
      {
        label: 'World Bank reclassifies Guyana as high-income (Stabroek News)',
        url: 'https://www.stabroeknews.com/2023/07/14/news/guyana/world-bank-reclassifies-guyana-as-high-income-country/',
      },
      {
        label: 'UN / IOM — CARICOM freedom of movement, 50th anniversary',
        url: 'https://easterncaribbean.un.org/en/243743-caricom%E2%80%99s-50th-anniversary-gift-its-citizens-freedom-movement-step-towards-closer',
      },
      {
        label: 'TotalEnergies & APA — Final Investment Decision for GranMorgu, Block 58 Suriname',
        url: 'https://investor.apacorp.com/news-releases/news-release-details/apa-announces-final-investment-decision-first-oil-development',
      },
      {
        label: 'OilNOW — "$10.5 billion GranMorgu project could reshape Suriname\'s economy"',
        url: 'https://oilnow.gy/news/10-5-billion-granmorgu-project-could-reshape-surinames-economy-over-the-next-decade/',
      },
      {
        label: 'France Diplomatie — opening of the French Embassy in Georgetown',
        url: 'https://www.diplomatie.gouv.fr/en/presse-et-ressources/decouvrir-et-informer/actualites/guyana-ouverture-de-l-ambassade-de-france',
      },
      {
        label: 'UPI — "Guyana strengthens territorial defense with French military support"',
        url: 'https://www.upi.com/Top_News/World-News/2025/10/08/guyana-guyana0-Essequibo-region-France-Venezuela/4241759932176/',
      },
      {
        label: 'Congressional Research Service R49186 — Venezuela\'s Post-Maduro Political Transition and U.S. Policy',
        url: 'https://www.congress.gov/crs-product/R49186',
      },
      {
        label: 'Transparency International — Guyana / Corruption Perceptions Index 2024',
        url: 'https://www.transparency.org/en/countries/guyana',
      },
      {
        label: 'Britannica — Guyana economy (pre-oil commodity base)',
        url: 'https://www.britannica.com/place/Guyana/Economy',
      },
      {
        label: 'Library of Congress Country Studies — Guyana: Emigration',
        url: 'https://countrystudies.us/guyana/27.htm',
      },
    ],
  },
];

export function getInvestigation(slug: string | null): Investigation | undefined {
  if (!slug) return undefined;
  return INVESTIGATIONS.find((inv) => inv.slug === slug || inv.id === slug);
}
