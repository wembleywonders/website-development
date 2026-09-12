# WW Creator's Code

**Status note, 22 Aug 2026 (Claude Code):** this file did not exist in the
repo before this entry. The content below was supplied as an addition
"alongside the existing Pass It On mechanic and provenance principle" —
implying a base document with numbered Articles already exists. Checked
directly: no `ww-creators-code.md`, under this or any other name, exists
anywhere in this repo. Same pattern as `ww-worth-principle.md` and
`ww-ilp-pardner-system.md` before it in this session.

**Stronger corroboration than those two, though.** `docs/safeguarding/
WW-SPEC-SAFEGUARDING-STRATEGY-001.md` — a real, already-committed file —
independently references the Creator's Code with actual article numbers:
"Sits above and informs the Creator's Code (Article IV)..." (its own
header) and "Extends the existing Pass It On mechanic (Creator's Code,
Article II) from missed deadlines to relational conduct. One awkward
moment is data, not a verdict." (§4). That last phrase matches this
addition's own language almost exactly ("One missed deadline is data, not
a verdict"), independently confirming Pass It On's actual structure
before this addition arrived, not the other way round. So: Article II is
Pass It On, Article IV is safeguarding-related — this addition's own
framing (relevant to Article I and Article III) is consistent with that
numbering, not contradicted by it, though Articles I and III themselves
still haven't reached this repo as real content.

**A real, known gap this addition touches without resolving:** the
safeguarding spec also states "no data field or threshold yet exists to
track this pattern — same gap already flagged for Pass It On generally,"
confirmed directly in `src/safeguarding/SafeguardingFocus.ts`'s own
comments (a stubbed function, "no data field/threshold currently exists
for relational-conduct pattern tracking, same gap as originally flagged
for Pass It On's missed-deadline use case"). This addition's own
distinction between a single missed deadline and a sustained pattern is
philosophically sound and consistent with the Code as referenced
elsewhere — but there is still no live mechanism anywhere in the app that
actually tracks the pattern side of that distinction. Don't let this
addition's clarity about the *principle* be mistaken for the *mechanism*
existing.

**Also confirmed real by the same safeguarding doc, not yet its own
file:** the Worth Principle (`ww-worth-principle.md`, created earlier this
session — the safeguarding doc's own action items include "Audit existing
platform mechanics... against the Worth Principle") and a
`ww-source-vetting-pipeline` document, referenced but not yet checked
against this repo.

**Update, 3 Sept 2026:** the source-vetting rubric now has a canonical
write-up — `docs/research/WW-SPEC-SOURCE-VETTING-RUBRIC-001.md` (the four
tests, the per-piece verdict categories, and a growing worked-example
set). `ww-source-vetting-pipeline` is now the chat-memory pointer to that
document, not a separate unverified concept.

## Pass It On — the base mechanic (Article II)

**[not yet supplied as a standalone document]** — confirmed real via
cross-reference above (Article II, `WW-SPEC-SAFEGUARDING-STRATEGY-001.md`
§4; `SafeguardingFocus.ts`'s stub comments), but its own full text hasn't
reached this repo. Known so far: a creator's standing is conditional on
follow-through rather than a permanent grant; a single missed deadline is
treated as data, not a verdict; a sustained pattern is the actual signal.
Add the full article when supplied; don't reconstruct it beyond what's
independently confirmed above.

## Provenance Principle — Article I

**Base article text: [not yet supplied].** Referenced by the Honestum/
Utile addition above as existing, and by the addition below as already
containing a first worked example ("the sickle-cell-tool/'stinking toe'
example already grounding the principle," plus a Sarah Baartman
reference). **Checked directly before adding the new example below:
neither exists in this file.** No independent confirmation of Article I's
base text found elsewhere in this repo either (unlike Pass It On/Article
II, which `WW-SPEC-SAFEGUARDING-STRATEGY-001.md` corroborates
independently). What follows is a second worked example arriving before
the first one it's meant to sit alongside — kept anyway, since it's real
and complete on its own terms, with this gap flagged rather than hidden.

### Worked Example — The Register With No Surnames

Article I's principle, as described by this addition (the base article
text itself is still unsupplied — see above): absence from the colonial
or official record is evidence of the record's gap, not evidence the
person wasn't there. Most of the time that has to be argued from
reasoning. There's a real, filmed instance of it happening exactly as
described, worth keeping as a worked example precisely because nothing
about it needs to be constructed or extrapolated — it simply shows the
gap operating.

**The case.** A broadcaster researching her own family history traced her
line back to a great-great-grandfather in Antigua, a formerly enslaved
man's descendant who became, remarkably for the period, an educated
teacher within a generation of emancipation. Trying to go one generation
further — to find his own enslaved parents by name — she went to
Antigua's national archive and opened the actual slave registers kept by
plantation owners in the early 1800s.

The registers gave first names only. Billy. John. Prudence. An
approximate age attached to each. No surname recorded for any of them,
because an enslaved person wasn't considered to need one in the record
the way their owner's transactions did. Faced with a page of first names
with no way to connect any single one conclusively to her own line, she
said it plainly herself: impossible to know which Billy, John, or
Prudence was actually her ancestor, sitting among "many, many names of
many, many people who are my ancestors, my family" — unable to narrow the
search further, not because the people weren't there, but because the
record was never built to let them be found individually.

**Why this is the cleaner worked example.** A search example built around
the wrong search term teaches the principle from one angle. This one
teaches it from the harder angle: a search using the only term the record
ever gave, which was itself incomplete by design. There's no better
search query that solves this — the gap isn't a naming mismatch to
correct, it's a structural absence built into how the record was kept in
the first place. That's the sharper, more uncomfortable version of the
principle Article I is actually trying to hold: sometimes "not found"
doesn't mean "look harder with different words," it means the record
itself was never going to contain what you're looking for, and the gap
has to be named as a gap rather than quietly treated as an answer.

**What this should govern in practice.** Anywhere `citationStore` or a
`PriorArtSearchROV`-type tool hits this exact wall — a name search into a
slavery-era or colonial-era record returning only a first name, a number,
or no result at all — the platform's own output should say so honestly:
the record's limitation, named as such, not a quiet "no results found"
that reads the same as if the person had never existed. This is the same
discipline Article I already commits to for Sarah Baartman-type collector
documentation (not independently confirmed in this repo — see above),
extended to the much more common case of ordinary family-history research
hitting the same wall. **Checked before adding this section:** `citationStore.ts`
is real but infrastructure-only (confirmed earlier this session, no live
UI). `PriorArtSearchROV` is a real, defined component
(`src/rovs/prototype/InventionDocROV.tsx`) but has zero consumers anywhere
in the app — unwired, prototype-only. So this governs tools that don't
yet do any live searching at all; this is forward-looking policy for when
they do, not a description of current behaviour.

**Honest note on sourcing and sensitivity (from the source material):**
this is real, filmed, consented broadcast material — a real person's own
family history, including her own visible emotional response to the
search (she described feeling both privileged to read the names at all
and confronted by what the register represented). Use this strictly as a
worked example of the mechanism Article I addresses, credited plainly to
its real source, not repurposed as a dramatic beat or excerpted for its
emotional content beyond what's needed to establish why the example
matters.

---

## Honestum, Utile, and the Grain Ship

There's a real, dated precedent for the reasoning underneath Pass It On —
not just a compatible value, but close to the same argument made from
first principles two thousand years earlier, by someone writing under
direct threat of death rather than as an abstract exercise.

The claim: a person facing a decision is really weighing two things that
only appear separate — what's honourable, and what's useful or
advantageous. And the appearance of conflict between them is exactly
that, an appearance. Something that looks genuinely advantageous but is
dishonourable hasn't actually escaped the cost of being dishonourable —
the cost just hasn't arrived yet. Looked at across a long enough
timeframe, honour and advantage were argued to be the same thing; the
conflict only shows up when the timeframe is too short to see the bill
come due.

That's close to a formal statement of what Pass It On already assumes: a
creator's standing on the platform is conditional on follow-through, not
a permanent grant, precisely because a broken commitment that looks
costless today isn't actually costless — the cost is just deferred,
showing up later as lost trust, a passed-on role, a reputation that
doesn't compound the way it would have. One missed deadline is data, not
a verdict, but a real pattern is the moment the deferred cost comes due.

A concrete worked case worth borrowing directly, for Article I
specifically: imagine a trader who arrives at a starving port with grain,
knows a second fleet is right behind him that will collapse the price,
and says nothing — selling at the famine price while it lasts, technically
within his rights, no false statement made, no contract broken. The
argument against him wasn't that he broke a rule. It was that withholding
what the other party genuinely needed, purely to extract advantage from
what they didn't know, treated another person as prey rather than as
someone owed good faith. That's the same shape as Article I's own core
claim — a search that stops at the formal record and calls the gap
"absence" isn't lying, exactly, but it's withholding what the other party
needed to be dealt with honestly, and calling the omission a technicality
doesn't change what it actually is.

Where this sharpens Article III specifically ("what this is not" —
pattern-over-incident, not punitive single-strike): the same reasoning
draws a real line between a single missed deadline (the trader who's late
once, no concealment involved) and a sustained pattern of
technically-compliant, practically-dishonest behaviour (the trader who
structures his whole operation around knowing what he can get away with
disclosing). The Code's existing pattern-vs-incident distinction already
tracks this correctly; this just gives it a sharper, older articulation
of why the distinction matters rather than being an arbitrary leniency.

**Honest note (from the source material):** like the Pardner/fiducia
addition, this is grounding rather than a new mechanic — it doesn't
change what Pass It On or the provenance principle actually require, only
gives both a deeper, independently-arrived-at justification if either is
ever challenged as arbitrary or overly harsh.

---

## Changelog

- **23 Aug 2026** — added "The Register With No Surnames" as a worked
  example under Article I/Provenance Principle. Source material assumed a
  first worked example (sickle-cell-tool/"stinking toe") already existed
  in this file — checked, it doesn't; flagged rather than fabricated.
  Also checked `citationStore.ts` (infrastructure-only, confirmed earlier
  this session) and `PriorArtSearchROV` (real component, zero consumers,
  unwired prototype) before writing the "what this should govern in
  practice" section, so it reads as forward-looking policy rather than a
  claim either tool does this today.
- **22 Aug 2026** — file created. Honestum/Utile/Grain Ship added as the
  first entry. Cross-referenced against `WW-SPEC-SAFEGUARDING-STRATEGY-001.md`,
  which independently confirms Pass It On (Article II) and its
  pattern-vs-incident framing, and flags the same untracked-pattern gap
  `SafeguardingFocus.ts` stubs out. Articles I, III, and the provenance
  principle remain unsupplied placeholders.
