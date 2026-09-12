# WW-DISCOVERY-PROVENANCE-RESALE-ROYALTY-001

**Status:** Discovery brief — not a decision, not yet scoped as a build
**Prepared:** 3 Sep 2026
**For:** Blake (financial/compliance input) — CJ and Judith to review together first
**Origin:** Surfaced while resolving the PricingMode question in
WW-SPEC-CYBERSTORE-TRADING-READY-001. Not part of that spec's scope —
flagged here to be picked up separately once there's capacity.

Filed verbatim into the repo (Claude Code, 3 Sep 2026) per the standing
rule that findings are logged here rather than left only in chat. No
accounting or legal judgement has been made on any of it — the six
questions below are open and are Blake's to answer.

---

## The core idea

CJ's observation: fashion and craft, like art, can appreciate in value
over time — and rarity plus documented provenance is what drives that
appreciation. A bespoke, one-off piece with a full, verifiable maker
story (who made it, when, the technique, the lineage) is exactly the kind
of item a collector market values more of over time, not less.

WW already has the infrastructure this depends on, largely without having
set out to build it for this purpose:

- The Equiano Principle provenance system and C2PA manifests already
  attach a verifiable maker/origin/lineage record to work.
- The counter-archive token minting (`mintJourneyToken` in
  `creatorJourneyIntegration.ts`) already creates a per-creator,
  sequential, timestamped record — the technical backbone of a
  resale-authentication chain.
- `ATELIER_AUCTION` already exists as a named revenue model, scoped to
  Silk Stilettos' bespoke/commissioned work — the natural first home for
  this.

**The gap:** none of WW's current revenue models capture what happens on
a second sale. STANDARD, SERVICE, and the two ATELIER_* models all price
a single, original transaction. If a piece resells later for more —
because it turned out to be rare, or the maker became known — under the
current design that uplift goes entirely to whoever happens to own and
resell the piece. The original maker sees nothing from it.

## The precedent: UK Artist's Resale Right (ARR)

Real, existing UK law, worth knowing before inventing something from
scratch:

- **What it does:** gives visual artists (or their estate) a royalty
  every time a qualifying original work resells through an "art market
  professional" (auction house, gallery, dealer).
- **Rate:** sliding scale — 4% on the portion of sale price up to
  £50,000, stepping down to 0.25% above £500,000, capped at £12,500 per
  sale.
- **Threshold:** applies only to resales at £1,000 or above.
- **Duration:** the artist's lifetime plus 70 years (estate continues to
  benefit).
- **Scope:** covers paintings, drawings, sculpture, ceramics, tapestry,
  glassware, photographs, and authorised limited editions — narrowly
  defined "original works of art," not general fashion or craft goods.
- **Mechanism:** compulsory collective management — royalties are
  collected and distributed via a collecting society (DACS in the UK),
  not chased individually by each artist.
- **Why it likely doesn't apply to WW directly:** Silk Stilettos'
  bespoke garments/accessories almost certainly fall outside ARR's
  statutory definition of "work of art," and WW's Cyberstore isn't an
  "art market professional" in the regulatory sense. This is not
  something WW needs to comply with — it's a precedent to borrow the
  shape of, not a law WW needs a lawyer to satisfy.

## What a voluntary WW version could look like

Since ARR's mechanism doesn't require ARR's legal status to replicate:

- **A contract term, not a statute:** every provenance-tagged item sold
  through Cyberstore carries a resale-royalty clause the buyer agrees to
  at purchase — e.g., "on any future resale of this item through Wembley
  Wonders, X% of the resale price goes to the original maker."
- **Technically enforced, not honour-system:** a resale event checks the
  item's counter-archive token history; if it has one, the royalty routes
  automatically at the point of resale, the same way the original sale's
  split does now.
- **Scoped narrowly at first** — Silk Stilettos bespoke/commissioned
  pieces (where `ATELIER_AUCTION` already lives), not a platform-wide
  feature from day one.

This is explicitly **not** what Phase 2 of the trading-readiness spec
needs, and shouldn't be conflated with it — Phase 2 is about a first sale
working at all. This is a second, later mechanism layered on top.

## Scoping — which categories/programmes are candidates, and why

The rule only makes sense where an item is genuinely non-fungible —
physical or one-of-one, tied to a single identifiable maker, with
verifiable provenance. It does not apply just because something is
creative or culturally significant. That test divides WW's existing
Cyberstore categories cleanly:

**Clear candidates:**

- **Textiles & Fashion (Silk Stilettos)** — the original case. Bespoke
  garments, accessories, jewellery: physical, one-off,
  wearable-collectible. Already has a natural home in `ATELIER_AUCTION`.
- **Visual Art & Print** — the closest match to ARR's own statutory
  categories (paintings, prints, photographs). If any of this category's
  work is sold as a limited or signed print rather than an infinite
  download, it's the most directly analogous category on the platform.
- **Craft & Making (STEMgeneers)** — currently scoped mostly as repair
  guides and reproducible patterns (not candidates), but if this category
  ever sells an actual finished handmade object — furniture, woodwork, a
  one-off piece — that object fits the same logic as Silk Stilettos work.
- **Performance & Drama (Kaywana's Court)** — not the recordings
  (infinitely reproducible), but an original signed script or manuscript
  would qualify, on the same logic as a rare book or manuscript in
  fine-art/collectibles markets.

**An existing precedent already live in the codebase, worth Blake seeing
directly:** the Beat licensing wizard's "Exclusive Rights" tier
(`CyberstoreListingWizard.tsx`, `DEFAULT_LICENSE_TIERS`) already
implements a rarity mechanic today — full ownership transfer, and the
beat is removed from the store on purchase. Once sold, it becomes
genuinely one-of-one by design. This isn't hypothetical or aspirational —
it's shipped code that already creates exactly the kind of scarcity a
resale royalty would apply to, in Music & Audio, a category not otherwise
flagged above.

**Clearly not candidates — the majority of the current catalog:** Food &
Heritage recipe packs, Written Works, Digital & Tech templates,
Educational Resources, Wellness guides, Knowledge Commons archive. All
reproducible digital downloads — no scarcity, nothing to resell that
isn't identical to what everyone else already bought.

**Why this scoping matters for Blake's review:** it keeps the six
questions below grounded in a small, concrete set of real cases (a
handful of categories, one already-shipped mechanic) rather than implying
the feature should apply platform-wide — a much bigger and messier claim
than what's actually being proposed.

## Questions for Blake

1. **Enforceability:** is a resale-royalty contract term actually
   enforceable against a buyer once they own the item and choose to
   resell it — including if they resell it off-platform, not through WW's
   own Cyberstore? (ARR solves this by only applying when an "art market
   professional" is involved in the resale — WW would need to decide
   whether it only wants to capture royalty on resales that happen
   through WW, and treat off-platform resale as simply
   unenforceable/out of scope.)
2. **Tax treatment:** how would an ongoing resale royalty be treated for
   the maker (is it trading income each time, like the original sale, or
   something else) and for WW itself if any share of the resale royalty
   flows through the platform's own accounts?
3. **VAT:** does a resale royalty trigger VAT considerations differently
   from an original sale?
4. **CIC asset-lock implications:** does an ongoing right that follows an
   item indefinitely (or for some set duration) create any complication
   under CIC governance/asset-lock rules, given it's a standing
   obligation rather than a one-off transaction?
5. **Practical duration/cap:** ARR runs for the artist's life plus 70
   years and caps payouts at £12,500 per sale — both exist to keep the
   scheme proportionate and enforceable. What would a sane WW-scale
   equivalent look like, given WW's items will generally sell for far
   less than fine art?
6. **Collection mechanism:** ARR uses a collecting society precisely
   because individual artists can't practically chase each resale
   themselves. Does WW's existing token/provenance infrastructure
   genuinely substitute for that, or is there a real administrative
   burden being underestimated here?

## Explicitly not decided yet

- Whether WW builds this at all.
- Rate, threshold, or duration, if it does.
- Whether it launches Silk-Stilettos-only or platform-wide.
- Relationship to the still-open PricingMode / `SaleRecord.java` backend
  question in the trading-readiness spec — that question is being left
  alone (not retired, not built out) until this is scoped, since a resale
  mechanism would likely need its own model in `revenueModels.ts` and its
  own record type, and deciding PricingMode's fate before this is scoped
  risks building the wrong backend shape twice.

**Next step:** CJ and Judith review this together first; if it holds up
as worth pursuing, take Blake's answers to the six questions above before
any design or build work starts.
