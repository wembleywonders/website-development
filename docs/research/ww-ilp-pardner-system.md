# WW ILP/Pardner System Reference

**Status note, 22 Aug 2026 (Claude Code):** this file did not exist in the
repo before this entry. The content below was supplied as an addition
"alongside the existing 'not welfare, community investment' framing" —
implying a base document already covers Pardner's mechanics in full.
Checked directly: no `ww-ilp-pardner-system.md`, under this or any other
name, exists anywhere in this repo. Same pattern as `ww-worth-principle.md`
and `ww-guardian-physics-cosmology.md` before it in this session.

**Unlike those two files, though, this isn't ungrounded lore** — Pardner
is a real, live platform mechanic, and the specific claims in the addition
below were checked against actual code before this file was written, not
assumed:

- **"Not welfare — community investment"** is the platform's own existing
  language, verbatim: `src/pages/HowItWorksPage.tsx:129` — "15% of the
  reserve funds floor payments for creators earning below £150/month
  average. Named after the Caribbean Pardner tradition. Maximum 3
  quarters. Not welfare — community investment." `src/features/pardner/
  PardnerEngine.ts`'s own header comment: "Named after the Caribbean
  Pardner/Sou-Sou tradition: mutual, trust-based, dignified. Not charity.
  Community."
- **The 55/25/20 split** is real and wired throughout the app —
  `src/blockchain/config/revenueModels.ts:49` ("Standard platform split —
  the 55/25/20 pardner-hand model"), referenced in `WhatYouBuildPage.tsx`,
  `SessionSandbox.tsx`, and others.
- **ROCE tracking** is real: `src/utils/revenue/roce.ts`, consumed by
  `ImpactLabPage.tsx` and others.
- **Tier structure** is real: `src/features/pardner/PardnerEngine.ts`,
  `src/services/pardnerApi.ts`, `src/features/pardner/CultivationPardnerTab.tsx`.

So this addition is grounding for mechanics that genuinely exist, not for
a base document that doesn't — the base document is missing, the base
*system* isn't. Worth noting: `CultivationPardnerTab.tsx` and
`pardnerApi.ts` were flagged elsewhere in this project's tracking
(`WW-OUTSTANDING-TASKS.md`) as two disconnected Pardner API clients with
an unresolved "which is canonical" decision — unrelated to this addition,
which is framing/philosophy, not implementation, but worth knowing if
this framing is ever surfaced through either of those two code paths.

## Not Welfare, Community Investment — the base framing

**[not yet supplied as a standalone document]** — the phrase itself is
real and live in the app (see citations above); a fuller written framing
document, if one exists, hasn't reached this repo. Add when supplied;
don't reconstruct it from the addition below, which extends the framing
rather than defines it.

---

## Fiducia and the Foundation of Trust

The Pardner mechanism already rejects the welfare frame in favour of
trust extended between members on the strength of the circle itself, not
on collateral or formal verification. There's a real, named precedent for
exactly that structure, two thousand years older than the modern
financial vocabulary around it.

The Romans had a specific word for this kind of trust: *fiducia* —
something handed to another person on the understanding they'll hold it
as faithfully as if it were their own, binding not because a contract
enumerated every possible failure mode, but because good faith itself was
treated as the foundation the whole arrangement rested on. The claim
attached to it was blunt: take away that good faith, and there's no
partnership, no estate held for an heir, no capital entrusted to a
manager — nothing left but everyone charging everyone else the highest
price the moment they had the leverage to.

That's a precise, independent description of what a susu or Pardner hand
actually is. Nobody in the circle can force another member to pay in —
the whole system runs on people honouring an obligation before there's
any mechanism to compel them to. The trust is extended in advance of
verification, which is exactly what makes it valuable, and exactly what
makes it vulnerable if that faith isn't honoured. This isn't a
coincidence worth treating as a curiosity — it's the same real economic
mechanism, named independently by two very different traditions arriving
at the same structural truth: a rotating trust circle and a Roman fiducia
arrangement both work for the identical reason, and fail for the
identical reason.

Worth keeping in mind for how Pardner gets explained to members,
especially anyone encountering the "not welfare" framing for the first
time: the point isn't that trust is a nice sentiment layered on top of
the mechanism. The trust is the mechanism. Everything else — the
55/25/20 split, the ROCE tracking, the tier structure — is the accounting
sitting on top of something that only works because people keep faith
with each other first.

**Honest note (from the source material):** this is a grounding/framing
addition, not a new mechanic — it doesn't change how Pardner actually
operates, only how the existing "not welfare, community investment"
framing can be explained and defended if it's ever challenged or needs a
deeper justification than "this is how we've chosen to do it."

---

## Changelog

- **22 Aug 2026** — file created. Fiducia/Foundation of Trust added as the
  first entry, verified against real Pardner mechanics in code
  (`PardnerEngine.ts`, `roce.ts`, `revenueModels.ts`, `HowItWorksPage.tsx`)
  before being written in. Base "not welfare, community investment"
  written framing (if a standalone document exists beyond the in-app
  copy) left as an open placeholder.
