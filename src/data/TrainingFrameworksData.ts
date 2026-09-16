/**
 * WW-TRAINING-FRAMEWORKS-001 (v2)
 * "Why We Frame It This Way" — the frameworks behind Wembley Wonders'
 * internal practice, structured for use in a staff/governance/ROV
 * training UI.
 *
 * v1 (4 frameworks: Bronfenbrenner, PVEST, SROI, Bushell) was delivered
 * to CJ/Judith as WW-TRAINING-FRAMEWORKS-001.docx. v2 adds a 5th entry,
 * Trauma-Informed Co-Regulation — deliberately marked status:
 * "framing-only-pending-consultancy", NOT "embedded" like the other
 * four. That distinction is load-bearing: entries 1-4 describe things
 * already true of WW's real design; entry 5 is a language/culture
 * adoption only, with no operational protocol behind it yet. See
 * PENDING_DECISIONS below before wiring entry 5 into anything that
 * looks like clinical policy.
 */

export type FrameworkStatus =
  | "embedded" // already reflected in real WW design/practice
  | "framing-only-pending-consultancy"; // language/culture shift adopted now; full operational design not yet built and must not be treated as clinical policy

export interface FrameworkSection {
  id: string;
  order: number;
  title: string;
  originator: string;
  whatItIs: string;
  whyWWUsesIt: string;
  howItLivesInWW: string;
  roleImplication: string;
  status: FrameworkStatus;
  /** Only set when status is "framing-only-pending-consultancy". Must be
   * surfaced visibly wherever this framework is rendered — not buried. */
  caveat?: string;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
}

export interface ReflectionPrompt {
  frameworkId: string;
  prompt: string;
}

export const TRAINING_MODULE_ID = "WW-TRAINING-FRAMEWORKS-001";
export const TRAINING_MODULE_TITLE = "Why We Frame It This Way";
export const TRAINING_MODULE_SUBTITLE =
  "The frameworks behind Wembley Wonders' internal practice";
export const TRAINING_MODULE_AUDIENCE =
  "Directors, staff, curators, and every ROV custodian (Narrator, Maker, Merchant, Keeper, Weaver, Spark, Guardian, Elder) and ROV trainee.";

export const TRAINING_OUTCOMES: string[] = [
  "Name four real, established frameworks — Bronfenbrenner's Ecological Systems Theory, PVEST, SROI, and the assessment-bias critique associated with Waveney Bushell — and explain each in a sentence.",
  "Point to the specific part of Wembley Wonders' own design that already puts each framework into practice.",
  "Explain, in your own words, why your own role is part of the evidence trail these frameworks describe — not just an admin step.",
  "Use this framing when talking to a funder, a Brent Council commissioner, a new member, or a new ROV trainee about why WW is built the way it is.",
  "Tell the difference between a framework that's already embedded in WW's real design (Bronfenbrenner, PVEST, SROI, Bushell) and one that's currently a framing shift only, still awaiting proper clinical design (trauma-informed co-regulation) — and not treat the second as if it were the first.",
];

export const FRAMEWORKS: FrameworkSection[] = [
  {
    id: "bronfenbrenner",
    order: 1,
    title: "Bronfenbrenner's Ecological Systems Theory",
    originator: "Urie Bronfenbrenner (1979)",
    whatItIs:
      "Describes a person's development as shaped by nested layers of environment: the immediate people and settings around them (microsystem), the connections between those settings (mesosystem), the wider systems that affect them indirectly (exosystem), and the broad cultural/economic conditions surrounding all of it (macrosystem).",
    whyWWUsesIt:
      "Brent is documented by the Greater London Authority as one of London's most financially excluded areas. A member there isn't usually missing one single thing — they're missing the connective tissue between things that already exist: talent, family, school, and any route into sustainable work rarely talk to each other.",
    howItLivesInWW:
      "This is the real argument for WW being thirteen interconnected programmes rather than thirteen separate charities. The cross-connection principle already in the curator roster — real historical specialists as 'cables' running between programmes, interchange stations where several lines cross — is the mesosystem, built on purpose (e.g. a Roots research project feeding a Pageturners vignette, or a STEMgeneers case study feeding a Scrap Cat build).",
    roleImplication:
      "If a member's project keeps getting nudged sideways into another programme instead of staying in its lane, that's deliberate mesosystem-building, not lost focus.",
    status: "embedded",
  },
  {
    id: "pvest",
    order: 2,
    title: "PVEST — Phenomenological Variant of Ecological Systems Theory",
    originator: "Dr Margaret Beale Spencer",
    whatItIs:
      "Extends Bronfenbrenner's model for young people navigating race, structural stress, and marginalisation. Its central move: stop measuring minority youth against a 'deficit lens' (what's wrong/missing) and instead study their resiliency and coping mechanisms as sophisticated adaptations worth recognising in their own right.",
    whyWWUsesIt:
      "Most formal education and assessment carries a deficit lens built in — measuring a member against a Eurocentric baseline and recording where they fall short of it.",
    howItLivesInWW:
      "Functionally what Pageturners' Equiano Principle already does with the Roots Knowledge Archive: identity-formation framed around resilience and continuity, not deficit. Also the underlying logic of the badge system's Explorer → Builder → Innovator → Leader progression — recognised for demonstrated capability as it's built, not benchmarked against day-one gaps.",
    roleImplication:
      "A Guardian or Elder sign-off that asks 'what can this member now do' rather than 'where does this member still fall short' is PVEST in action, whether or not the member ever hears the term.",
    status: "embedded",
  },
  {
    id: "sroi",
    order: 3,
    title: "SROI — Social Return on Investment",
    originator: "Standard commissioning/funding methodology",
    whatItIs:
      "A recognised method commissioners and funders use to put a value on social outcomes, not just financial ones — translating 'this programme is good for the community' into evidenced, measurable impact a funding body can assess a bid against.",
    whyWWUsesIt:
      "A CIC lives or dies on grants, contracts, and commissioning tenders. 'Trust us, it works' is not a funding case. Evidence is.",
    howItLivesInWW:
      "The real, practical reason the badge/ROV sign-off chain exists in its current form: every badge requires a documented output independent of the member's own claim, a named ROV custodian's sign-off, and — at Practitioner level and above — a peer witness. That three-part chain is an SROI evidence trail being built one member action at a time.",
    roleImplication:
      "Insisting on the documented artefact rather than taking a member's word for it is not bureaucracy — it's building the only kind of evidence a funder will actually accept.",
    status: "embedded",
  },
  {
    id: "bushell",
    order: 4,
    title: "The Assessment-Bias Critique (Waveney Bushell)",
    originator: "Waveney Bushell, first Black educational psychologist in the UK (Guyanese-born)",
    whatItIs:
      "In the 1960s–70s, Bushell proved that standard British IQ/assessment tools were culturally biased against Caribbean immigrant children, leading schools to wrongly place them in 'Educationally Subnormal' (ESN) provision — forcing a national reckoning with the idea that a test built for one culture isn't neutral when applied to another.",
    whyWWUsesIt:
      "Any competency/accreditation system risks repeating this exact mistake if it borrows testing instruments wholesale from institutions never built with WW's membership in mind.",
    howItLivesInWW:
      "The reasoning underneath the badge system's whole design: recognition built from a documented, applied output (a cooked demonstration, a produced broadcast, a built object, a published piece of writing) rather than a standardised test at a single sitting. Also the direct throughline connecting Bushell, Mollie Hunte, and the child-development curator roster to the badge/accreditation system itself.",
    roleImplication:
      "If a member struggles with a conventional test but can clearly do the thing in practice, WW's system is built to see and credit that — that's not a workaround, it's the point.",
    status: "embedded",
  },
  {
    id: "co-regulation",
    order: 5,
    title: "Trauma-Informed Co-Regulation (framing layer only)",
    originator: "General trauma-informed care / neurodevelopmental literature — not a single named framework",
    whatItIs:
      "A shift in behavioural-support language and posture away from punitive measures (time-outs, behaviour charts) and toward co-regulation: an emotionally attuned adult helping a dysregulated young person's nervous system settle, on the understanding that chronic stress affects executive-functioning capacity before it looks like 'bad behaviour.'",
    whyWWUsesIt:
      "Economic exclusion, unstable housing, and general post-pandemic conditions mean some young people in the community carry real chronic stress load. Language and posture around behaviour matter, and a punitive default can misread stress response as defiance.",
    howItLivesInWW:
      "NOT YET EMBEDDED. This is adopted now only as a language/framing shift for staff and ROV custodians to use day-to-day — talk about behaviour in co-regulation terms rather than punitive terms. No operational protocol, screening tool, or formal behavioural policy has been designed around this, and none should be inferred from this entry.",
    roleImplication:
      "If a member is visibly dysregulated, default to calm, attuned, predictable presence over sanction-based response — but this is a posture shift, not a clinical intervention. Do not treat this entry as a trauma-response protocol.",
    status: "framing-only-pending-consultancy",
    caveat:
      "This framing was adopted directly from general literature, not designed by a qualified trauma-informed-care practitioner. It must not be presented anywhere as clinical policy or a behavioural protocol until a paid consultancy review has actually happened. See PENDING_DECISIONS below — this is a live, unresolved gap, not a completed design.",
  },
];

export const PENDING_DECISIONS: string[] = [
  "Trauma-informed co-regulation (Framework 5) is framing-only. A short paid consultancy engagement with a qualified trauma-informed-care practitioner is needed before any operational protocol, screening tool, or formal behavioural policy is built on top of this framing. Do not let this framing quietly harden into policy by repetition — treat it as explicitly unresolved until that consultancy happens.",
];

export const REFLECTION_PROMPTS: ReflectionPrompt[] = [
  { frameworkId: "bronfenbrenner", prompt: "What other programme, person, or system did this piece of work connect to, that the member might not have connected on their own?" },
  { frameworkId: "pvest", prompt: "What did this sign-off recognise the member could now do, rather than measure them against what they couldn't?" },
  { frameworkId: "sroi", prompt: "If a funder asked you to prove this member's progress happened, what's the actual documented evidence — not your word, theirs?" },
  { frameworkId: "bushell", prompt: "Was the member assessed on a real, applied output, or against a standardised benchmark that might not fit them?" },
  { frameworkId: "co-regulation", prompt: "Think of a recent moment where a young person's behaviour felt disruptive. Would naming it as dysregulation rather than defiance have changed how you responded — and where's the line where that's genuinely useful versus where it needs a trained professional, not you?" },
];

export const GLOSSARY: GlossaryEntry[] = [
  { term: "Mesosystem", definition: "The connections between the different settings in a person's life (e.g. home and school) — Bronfenbrenner's term for the connective tissue WW's cross-programme design deliberately builds." },
  { term: "Deficit lens", definition: "Judging someone by what they lack against an outside standard, rather than by what they can actually do. PVEST and WW's badge system are both built to avoid this." },
  { term: "PVEST", definition: "Phenomenological Variant of Ecological Systems Theory — Margaret Beale Spencer's framework for studying minority youth resilience and coping rather than deficit." },
  { term: "SROI", definition: "Social Return on Investment — a recognised method for evidencing a programme's social impact to funders and commissioners." },
  { term: "ESN", definition: "“Educationally Subnormal” — the discredited 1960s–70s UK school classification Waveney Bushell's work exposed as biased against Caribbean children." },
  { term: "ROV", definition: "Registered Oversight/Verification role — the named sign-off custodian (Narrator, Maker, Merchant, Keeper, Weaver, Spark, Guardian, Elder) confirming a member's documented output before a badge is issued." },
  { term: "Evidence trail", definition: "The documented output + sign-off + peer witness chain behind every badge — the raw material an SROI case is eventually built from." },
  { term: "Co-regulation", definition: "An adult helping a stressed or dysregulated young person's nervous system settle through calm, attuned presence, rather than responding to the behaviour with sanctions. A framing shift only at WW currently — not a designed clinical protocol." },
  { term: "Dysregulation", definition: "A state where stress has outpaced a person's (often a child's) capacity to self-manage their emotional or behavioural response — distinct from deliberate defiance, though the two can look similar from outside." },
];

export const SEE_ALSO: string[] = [
  "The badge/accreditation system — for the full Explorer→Builder→Innovator→Leader sign-off chain this module explains the reasoning behind.",
  "Pageturners' Equiano Principle and the Roots Knowledge Archive — for PVEST in practice.",
  "The programme curator roster's cross-connection principle — for Bronfenbrenner's mesosystem in practice.",
  "The child-development specialist entries (Bushell, Hunte, Conolly, Garrison, Clark) — for the full detail behind Framework 4.",
];
