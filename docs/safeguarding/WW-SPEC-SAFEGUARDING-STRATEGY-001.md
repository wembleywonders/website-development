# WW-SPEC-SAFEGUARDING-STRATEGY-001

Wembley Wonders — Underpinning Safeguarding Strategy

Drafted 21 August 2026. Sits above and informs the Creator's Code (Article IV), badge accreditation's Guardian/Elder sign-off roles, and Community Governance's Stewards Council. Those documents reference this one rather than reinventing pieces of it independently.

Implementation note: the shared types, constants, and pure functions this
document specifies are implemented in `src/safeguarding/SafeguardingFocus.ts`.
Any ROV — regardless of which of Wembley Wonders' two ROV systems it
belongs to (the 12 Children of Anansi identity layer in `src/rov/`, or the
functional-capability layer in `src/services/rovs/ROVCapabilities.ts`) —
imports its safeguarding posture from that file directly, so this
document's principles live in exactly one place in code rather than being
re-implemented per ROV.

## 0. Why this document exists

Prompted by a real 2026 court case (a public figure's retrial on rape and assault charges involving a fan) and grounded against historical pattern rather than a single incident: Bill Cosby, Elijah Muhammad and the Nation of Islam's 1963 paternity scandal, Tim Westwood, Benjamin Boateng, and the 2004 Janet Jackson/Justin Timberlake Super Bowl case. Read together, these cases do not describe isolated bad actors so much as a small number of recurring mechanisms — access, silence, deniability, deterrence that arrives too late to matter. This document treats those mechanisms as the actual design problem, not the individuals.

The founding insight, restated as plainly as possible: public exposure risk does not deter the small transgressions that precede a scandal, because at that scale nobody is weighing a small act against career-ending consequence — the two never feel connected. Deterrence only ever operated after the fact, as consequence, never as a brake beforehand. A safeguarding system that relies on the threat of eventual exposure has already failed at the point where prevention was possible.

CJ's grandmother's framing, which this document treats as its working thesis: everyone tells on themselves at some point, and it's usually over little things first. The corollary, also CJ's own: give an inch, and they will take a mile — to get caught. There is no reliable internal brake at the small-transgression stage. The only thing that reliably interrupts the pattern is external correction, applied early, applied small, applied certainly. This document exists to make WW capable of being that early interruption.

## 1. Governance model

One Designated Safeguarding Lead (DSL): Judith, on the strength of her child-development specialism.

One named deputy — not yet decided. Flora's risk-assessment background makes her a plausible fit, though she currently sits in an advisory rather than decision-authority capacity; formalising her (or naming someone else) into the deputy role is an open action item from this document.

The deputy exists so there is never a single point of failure, and so a concern involving CJ, or someone close to him, has a route that does not dead-end at CJ.

All tutor, curator, and ROV safeguarding flags route to the DSL + deputy pair. No individual tutor, curator, or ROV actions a safeguarding concern unilaterally.

## 2. Independence of review

A Guardian sign-off role must never be structurally dependent — reporting to, mentored by, financially or reputationally reliant on — the person or programme it reviews. This is the direct lesson of the Nation of Islam case: a strong internal accountability structure (the "trial" system) existed, and was captured by the very person it should have checked, with the consequence falling on the less powerful parties instead.

This applies at founder/Director level too. CJ and Judith require review of each other's programmes — or an external Guardian — rather than self-certification. No figure at WW, however senior or founding, sits permanently outside review.

## 3. Trust-scaled scrutiny

Structural visibility — recorded sessions, logged one-to-one contact, reviewed output — should increase with a mentor's trust and access level over time, not decrease once someone is established. This inverts the ordinary instinct, which is to relax scrutiny on a proven mentor. The evidence across every case examined points the other way: the more trusted and higher-access a relationship becomes, the more the ordinary friction that would otherwise surface a problem gets removed. No mentor relationship, regardless of seniority, is permanently exempt from review.

## 4. Pattern-based, not incident-based, detection

Extends the existing Pass It On mechanic (Creator's Code, Article II) from missed deadlines to relational conduct. One awkward moment is data, not a verdict. A repeated pattern of boundary-testing or refusal-override across sessions is the actual signal worth escalating. (Open build item: no data field or threshold yet exists to track this pattern — same gap already flagged for Pass It On generally.)

## 5. Content as diagnostic layer

Lyrics, scripts, and how a member approaches a topic in their own creative work are the most honest unwatched record of how they think about consent and other people's agency — produced without an audience watching for it in real time. Reviewed through the existing Guardian/Keeper sign-off chain for creative output; this is a diagnostic lens, not a new censorship layer.

Worked example: "Blurred Lines" (2013) is a case where the title was the thesis — content that markets ambiguity of consent as charm, rather than merely containing a flawed line. This is the specific pattern the source-vetting pipeline's proposed fifth lens is built to catch (see §9).

## 6. The ROV/tutor confidential relationship as the primary sensing channel

Private, trusting mentoring exchanges are where micro-transgression patterns actually surface first — precisely because they bypass the public-exposure calculation entirely. A member will tell a trusted tutor or ROV the unguarded true version of something long before it appears anywhere public.

This is not to be built as surveillance. The model adopted is the same one every UK teacher, counsellor, and youth worker already operates under: professional confidentiality with a disclosed safeguarding override.

Stated to members upfront, not covert:

> "What you tell me stays between us — except where it touches on someone's safety. Then I have a duty to pass it up."

The override routes to the DSL/deputy pair. It is never actioned unilaterally by the tutor or ROV. Diaries, logs, social posts, and group chats are legitimate evidence sources for a DSL investigation once a concern has already been raised through this channel — never proactively trawled or monitored beforehand, which would collapse the trust the whole mechanism depends on.

## 7. Recognition, not only detection

Good relational conduct — handling disagreement well, treating collaborators (real or fictional, in a member's own creative work) as full agents rather than obstacles — should be actively named and rewarded, made visible the same way craft already is on the platform. A purely punitive system teaches avoidance of detection, not the underlying value.

## 8. Assessment design

Reflective, scenario-based self-account prompts, scored for accountability language versus deflection, rather than pass/fail quizzes. Deflection under review is itself a known behavioural marker — the assessment format is diagnostic, not just evaluative.

## 9. Root conditions, not just conduct

Four mechanisms, named directly from this session's discussion, sit beneath individual incidents and explain why "everyone tells on themselves over little things first":

- **Cultural conditioning.** Decades of pimp/gangster anti-hero glorification in music and film are direct ancestry of manosphere attitudes, predating the term by fifty-plus years. Addressed via the existing source-vetting rubric (WW's four constitutional tests) — a proposed fifth lens: does this content model domination as aspirational, regardless of whether its individual claims pass sourcing?
- **Closeted behaviour and codes of silence.** Silence is often actively enforced — loyalty, reputation, not embarrassing the organisation — not accidental. This is the exact mechanism behind the Nation of Islam's internal "trials" punishing the women rather than the leader. WW's own reporting layer must be built to survive internal social and status pressure, including from senior figures.
- **Attitude and example.** Who gets held up as exemplary — curators, canon characters, "hall of fame" figures — is itself curriculum. WW already vets curators for substantive historical grounding; the same discipline needs applying to who models relational conduct, not only craft.
- **Discontent with one's lot.** Grievance and resentment are radicalisation's actual entry point, regardless of ideology. The manosphere's real product is belonging and status for the resentful, not misogyny as such — a parallel drawn directly to Facebook's own origin (Facemash, built in the aftermath of a breakup, rating women without consent: personal resentment scaled into infrastructure). WW's existing badge/ILP/Pardner economic-mobility architecture — real belonging and real earned status through legitimate production — functions as a structural countermeasure to this entry point, not merely a parallel good.

Self-check implication: WW's own platform mechanics (leaderboards, badge comparisons, follower/visibility counts) require the same audit against the Worth Principle ("worth is not comparative") as any external content. A platform can encode its own founder's or early culture's resentment, or reward-comparison mechanics, into itself quietly — the same way individual behaviour creeps before becoming incident.

## 10. Risk categories

Four distinct access mechanisms, not to be treated as interchangeable:

| Category | Mechanism | Worked example |
|---|---|---|
| Fame-based | Public platform confers presumed trustworthiness ("he'd never") | Bill Cosby |
| Institution-based | A trusted structure (mentorship, religious authority, broadcaster) is the access route itself | Elijah Muhammad/NOI; Tim Westwood/BBC |
| Inherited/conferred status | Access and impunity ride on a parent's or mentor's standing, not anything earned | Benjamin Boateng |
| Backstage/logistics access | Physical or logistical access plus informal authority over someone junior, with zero public reputation at stake — not even delayed deterrence | Roadies, security/event staff, shift supervisors |

A fifth pattern, consequence-transfer, sits alongside these: a transgression is planned with deniability engineered in advance, so a less powerful collaborator absorbs the reputational cost while the instigator's account goes unquestioned (Timberlake/Jackson, 2004). The "micro" here is the blame being pre-positioned to land elsewhere the moment exposure happens, not the act itself escalating quietly.

Design consequence: a member arriving already trusted because of who their parent, mentor, or family is within WW should not get a lighter scrutiny path than someone building trust from nothing — if anything the reverse, since conferred trust has not been tested by Pass It On's pattern-check the way earned trust has.

## 11. Deterrence-scale mismatch — the design conclusion

Public-exposure risk was maximal in every case examined and deterred none of the early transgressions that preceded the eventual scandal. It functioned only as consequence after the fact. Consequence has to operate at the same scale as the transgression, not at the scale of the eventual worst case. Certainty of a small, immediate correction beats severity of a distant, hypothetical one.

This is the strongest grounding for Pass It On's existing proportionate, near-term consequence model over reliance on Guardian/DSL escalation alone. Day-to-day tutor/curator-level friction on small boundary-pushing is where correction has to actually land, in real time. DSL escalation is the backstop for patterns that persist past that — not the system's only mechanism.

## 12. Explicit boundary: informed by psychology, never performs it

WW draws on established research on grooming, coercive control, and abuse-of-trust patterns to shape what ROVs and Guardians are trained to notice. WW does not perform individual psychological assessment or diagnosis of members. No clinical mandate exists — Judith and Flora are specialist and advisory, not licensed clinicians. False positives from amateur profiling would disproportionately misflag neurodivergent, anxious, or culturally different members. And the real failure in every case examined was unacted-on visible behaviour, not a missed diagnosis. Concerning behaviour is tracked and escalated outward to real professionals or safeguarding services once a threshold is met — never assessed in-house.

## 13. Progressive reapplication across the Creator's Journey

- **Bright Sparks:** awareness-level content only, not badge-gated (Bright Sparks is a feeder/taster tier). Explicit posture: does not assume a shared starting line — some members will not have had this modelled as wrong before, and the tone should teach rather than presume.
- **Explorer/Builder:** personal conduct — reliability, how members treat collaborators, what they post about others.
- **Innovator:** public-facing conduct — members are now shipping visible work; audience-facing behaviour starts to matter.
- **Leader:** full structural weight. Real visibility and real power asymmetry (an established member with fans, collaborators, or a public platform). Existing Guardian (safeguarding/consent co-sign) and Elder (human endorsement from Judith or CJ) sign-off gates already sit here and are the natural home for this document's heaviest application.

## 14. Closing synthesis

Every case examined is "Blurred Lines in action over time" (CJ's framing): boundaries rarely cross in one visible step. They blur incrementally until the line has moved too far for anyone to point to the moment it happened. Content that markets the blur itself as charm — the literal thesis of the 2013 song used as this document's worked example — is not incidental to that pattern; it is culturally rehearsing it in advance.

CJ's closing correction to the old proverb stands as this document's final word: "Give an inch, and they will take a mile — to get caught." Not opportunistic calculation with a natural stopping point. No internal brake. The taking stops only at external interruption. This is why the safeguarding system's job is to be that interruption — early, small, and reliable — since nothing else arrives in time.

## Open action items

1. Confirm the DSL deputy (Flora, or another named person).
2. Build the Pass It On pattern-tracking field/threshold for relational conduct (currently unbuilt, same gap flagged for the original missed-deadline use case).
3. Write the fifth source-vetting lens (domination-as-aspirational) into ww-source-vetting-pipeline proper.
4. Draft the tutor-facing plain-language confidentiality-override script for actual delivery to members (this document states the principle; a shorter practitioner-facing version is still needed).
5. Audit existing platform mechanics (leaderboards, comparisons, visibility counts) against the Worth Principle.
6. Decide whether Article IV of the Creator's Code is written as a full standalone article or references this document directly rather than duplicating it.
