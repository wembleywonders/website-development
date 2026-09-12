# WW Research Vessel Principle

Referenced from CLAUDE.md's "What Wembley Wonders actually is" section and
from docs/research/WW-RESEARCH-ELEMENT-BY-PROGRAMME.md. This is the full
context behind both — read this when either points here.

CJ's own framing (21 Aug 2026): "Wembley Wonders was designed as a research
vessel, not just an archive and academy." An archive presents settled
answers. An academy teaches what's already known and resolved. A research
vessel does something different: it goes looking, and it's allowed to come
back with a real lead, an uncorroborated claim, and a genuinely open
question — all at once, held honestly rather than forced into a false
resolution.

## Where this crystallised from

During the 21 Aug 2026 diversity-initiative research session, a lead on
Gaspar Yanga (Afro-Mexican maroon leader, founded a free self-governing
settlement in Veracruz c.1570-1618) turned up a real, compelling figure —
but with one uncorroborated claim (a single source describing him as "a
rebellious Muslim from Nigeria," not corroborated elsewhere) and one
genuinely unresolved question (whether his real credential —
settlement-founding and defensive leadership — fits STEMgeneers'
engineering slot, or belongs somewhere else entirely). Rather than force a
lock either way, the finding was reported openly, flagged, and left
unresolved. CJ's response was that this openness is not a gap in the
platform — it IS the platform doing what it's for. Full detail on this
specific thread: see docs/research/WW-OPEN-INVESTIGATIONS.md.

## Continuous with existing discipline, not a new one

This principle names what several individual honesty practices already
built into this project were doing collectively:

- The source-vetting pipeline's "conditional pass" category (usable
  material exists but isn't fully corroborated yet).
- The curator roster's repeated practice of writing "genuinely unclear"
  rather than rounding a thin signal up to a confident answer — e.g.
  Arsenio Rodríguez's succession-based teaching credential, Paul Nabor's
  influence-through-presence credential, Eusebia Cosme's
  pioneering-without-named-protégé credential — all honestly flagged as
  thinner than the strongest entries, not hidden.

## Real product implication — flagged 21 Aug 2026, built 28 Aug 2026

Some content on the platform might not need to wait for full lock/
resolution before members ever see it. An "active investigation" status,
honestly labelled as such, could be something WW actually shows people —
not just internal working notes kept hidden until resolved — framed as
"here's what we're still figuring out, want to help dig?" rather than a
finished lesson. This is a genuinely different content shape from anything
else on the platform (which otherwise ships as LOCKED, complete, vetted
material): what it looks like, where it lives, how a member would actually
encounter and contribute to it, how it graduates into settled content once
resolved.

**Built 28 Aug 2026.** The surface now exists at route `/investigations`
(`src/components/investigations/ActiveInvestigations.tsx`, with
`investigationsData.ts` and `Investigations.css`), linked from the Header
"Our Work" menu and the Knowledge Commons footer. Each investigation
renders as: a one-paragraph summary, an explicit scope boundary, a "why
this is held open" note, then four labelled blocks — Confirmed (verified,
sourced), Uncorroborated/contested (competing claims kept visibly
separate), Open questions (each with "why it matters" and "what would close
it"), and Corrections made (the "provided ≠ verified" catches, shown as
findings in their own right) — followed by a "want to help dig?" panel that
routes contributions to admin@ via mailto (no localStorage dead-drop, per
the standing rule). The first published investigation is the Guiana Shield
diasporic-economy entry (`docs/research/KC-GUIANA-SHIELD-DIASPORIC-ECONOMY-001.md`
is its full working file). "Graduates into settled content once resolved"
is handled editorially for now — when a thread closes, its entry moves into
a Knowledge Commons entry or a programme's course material, and the trail
stays in `WW-OPEN-INVESTIGATIONS.md`. No automated graduation mechanism was
built.

## Why this matters beyond internal discipline

WW doesn't just train, teach, and record — it does real research, and
that's rare for a CIC. Most Community Interest Companies are
service-delivery organisations working from already-settled material. WW
produces original findings as part of what it is. The 21 Aug 2026 session
is itself an instance of that, not just a description of it: genuine
primary-source-adjacent investigative work happened live (verifying
living-person status via direct source-checking, tracing import graphs to
correct an earlier claim about ROVRegistry.ts being "live," discovering the
TNB-2.4 "platform-wide" claim was false, reassigning curators after
research showed they didn't match their first assumed home). The research
wasn't a preamble to building content — it WAS the work, and its findings
changed real decisions in real time.

This research capacity is specifically what will attract academics seeking
to improve cultural understanding of the societies the diaspora has
developed in their communities — what died, what survived, and how that
process actually happened, community by community, not as a single
flattened narrative. CJ named this as the thing that "cannot be
emphasised enough" in terms of WW's present and future value to
generations of knowledge seekers from all walks of life — not just
diaspora community members using the platform for identity/heritage
reasons, but a genuinely wider academic and scholarly audience drawn to WW
specifically because it produces real findings about cultural survival and
loss, not just packaged teaching material. This is a real external value
proposition and potential point of academic credibility/partnership —
distinct from, and larger than, the internal session-discipline framing
this principle first got written up under.
