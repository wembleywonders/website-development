/**
 * ══════════════════════════════════════════════════════════════════════════════
 * WEMBLEY WONDERS CIC — Knowledge Commons
 * Epistemological Framework  ·  Data Layer  ·  Version 1.0  ·  March 2026
 *
 * The structured data encoding of the Knowledge Commons Epistemological
 * Framework document. This file is the single source of truth that ROVs,
 * the validation UI, the submission checklist, and the rovPromptBuilder
 * all read from.
 *
 * Place at: src/data/epistemologicalFramework.ts
 *
 * Family Knowledge = Family Investment
 * ══════════════════════════════════════════════════════════════════════════════
 */

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type ConceptId =
  | 'first-step'
  | 'ambient-certainty'
  | 'credential-trap'
  | 'red-pill-architecture'
  | 'institutional-rhetoric'
  | 'premise-audit';

export type RovId =
  | 'esi'
  | 'stemgeneers'
  | 'techreneurs'
  | 'gtechcasters'
  | 'pageturners'
  | 'auntie-anansis'
  | 'roots'
  | 'bright-sparks';

export type ValidationOutcome =
  | 'verified'       // passes all 6 — enters archive as verified knowledge
  | 'notated'        // fails 1-2 — enters with notation, contributor invited to revise
  | 'contextualised' // fails 3-4 — classified as oral tradition/testimony pending revision
  | 'returned';      // fails 5-6 — returned with detailed notes, revision session offered

export interface Concept {
  id: ConceptId;
  number: number;
  name: string;
  source: string;
  sourceDescription: string;
  principle: string;
  commonsApplication: string;
  coreQuestion: string;
  failurePattern: string;
  corrective: string;
}

export interface ChecklistQuestion {
  id: string;
  number: number;
  question: string;
  elaboration: string;
  conceptId: ConceptId;
  failureMode: string;
  passIndicator: string;
  failIndicator: string;
}

export interface ValidationOutcomeTier {
  outcome: ValidationOutcome;
  questionsFailedRange: string;
  label: string;
  archiveStatus: string;
  action: string;
  notation: string | null;
}

export interface RovProfile {
  id: RovId;
  name: string;
  icon: string;
  domain: string;
  primaryConcepts: ConceptId[];
  validationQuestions: string[];
  commonFailureModes: string[];
  exampleIntervention: string;
  returnNoteTemplate: string;
}

// ─── THE SIX CONCEPTS ────────────────────────────────────────────────────────

export const SIX_CONCEPTS: Concept[] = [
  {
    id: 'first-step',
    number: 1,
    name: 'The First Step Principle',
    source: 'Dan Wilson v. Steve Kirsch — Pangburn Philosophy vaccine debate',
    sourceDescription:
      'A molecular biologist dismantled an antivaccine entrepreneur\'s analysis of Czech ' +
      'Republic data by asking one question relentlessly: did you make sure your two groups ' +
      'were comparable before you drew any conclusions? The entrepreneur had not. Everything ' +
      'else he had done — the models, the GitHub repository, the technical vocabulary — was ' +
      'irrelevant once the foundational step had been skipped.',
    principle:
      'Before evaluating the conclusions of any analysis, verify that the foundational ' +
      'methodology is sound. In comparative studies, this means confirming that the groups, ' +
      'periods, or bodies of evidence being compared are actually comparable — that confounding ' +
      'variables have been accounted for before any inference is drawn. A chain of logic is only ' +
      'as strong as its first step. Transparently bad mathematics is still bad mathematics.',
    commonsApplication:
      'When a heritage claim compares two communities, two time periods, or two bodies of ' +
      'evidence, Esi asks whether the comparison is valid before engaging with what it claims to ' +
      'show. A claim that "Black British cultural production declined after X" requires ' +
      'comparability checks — are we measuring the same types of output, in the same geographic ' +
      'range, with equivalent access to documentation? — before the decline is treated as real ' +
      'rather than as an artefact of the measurement.',
    coreQuestion: 'Did you do the first step?',
    failurePattern:
      'Sophisticated analysis built on an unexamined foundation. Technical vocabulary and ' +
      'complex models presented as if they substitute for basic methodological validity.',
    corrective:
      'Name the first step explicitly. Return to it when the discussion drifts toward ' +
      'conclusions. Do not move on until it is answered.',
  },

  {
    id: 'ambient-certainty',
    number: 2,
    name: 'The Ambient Certainty Problem',
    source: 'Adam Mockler v. Sadi — Jubilee Conservative College Students debate',
    sourceDescription:
      'A young conservative activist arrived at a filmed debate certain that leftist ' +
      'politicians called Trump "Hitler" constantly. When asked to name one specific elected ' +
      'politician who had done so, she could not. Her certainty was real. Her evidence was not. ' +
      'She had absorbed the belief from the cultural atmosphere of her media environment — ' +
      'repetition, consensus, the general feel of what "everyone knows" — without ever checking ' +
      'a single traceable source.',
    principle:
      'A belief absorbed from cultural atmosphere — from repetition, from community consensus, ' +
      'from the general feel of a media environment — is not the same as a belief supported by ' +
      'specific, traceable evidence. Confidence is not corroboration. The inability to name a ' +
      'single specific source for a widely-held claim is evidence that the claim rests on ' +
      'atmosphere, not fact. This is not a failure of intelligence. It is what happens when ' +
      'closed information environments substitute for primary sources.',
    commonsApplication:
      'Contributors to the Knowledge Commons are asked to distinguish between what they know ' +
      'from documented sources and what they have absorbed from community consensus. Both are ' +
      'valid starting points; neither is a finished submission. Community oral tradition, ' +
      'received knowledge, and lived experience are all valuable — they are categorised ' +
      'accurately in the archive rather than mislabelled as independently verified fact.',
    coreQuestion:
      'Can you name one specific, traceable source — not "everyone knows", not community ' +
      'consensus, just one named source?',
    failurePattern:
      '"It\'s obvious." "Everyone knows this." "I\'ve always understood that..." Certainty ' +
      'presented as if it were evidence. Vague collective attribution: "people say", "it is ' +
      'widely believed", "the community has always known".',
    corrective:
      'Force specificity. Ask for one name, one date, one document. If none exists, classify ' +
      'accurately: community consensus, oral tradition, or personal testimony — all legitimate ' +
      'categories that belong in the archive with honest labelling.',
  },

  {
    id: 'credential-trap',
    number: 3,
    name: 'The Credential Trap',
    source: 'Joan v. Nico — flat earth troll debate, Rationality Rules analysis',
    sourceDescription:
      'An ex-military, ex-NATO officer who had actually built aircraft walked into a debate ' +
      'with a bad-faith troll and lost — not because she was wrong about the shape of the Earth, ' +
      'but because she led with her credentials rather than her evidence. The moment she made ' +
      'herself the argument, her credibility rather than the physics became the battleground. ' +
      'Credibility is infinitely easier to attack than verified data. She was right about ' +
      'everything and lost anyway.',
    principle:
      'In adversarial or sceptical contexts, presenting personal credentials as the primary ' +
      'evidence for a claim creates a target rather than a defence. Credentials corroborate; ' +
      'they do not substitute. Evidence must be capable of standing independently of who ' +
      'presents it. The moment the argument becomes "you should believe this because of who I ' +
      'am", it has moved from claim to credential — and credential can always be challenged, ' +
      'undermined, or reframed as institutional capture.',
    commonsApplication:
      'The Knowledge Commons values expertise and lived experience deeply. But submissions must ' +
      'ground claims in evidence that stands independently of the contributor\'s identity. ' +
      '"I have worked in this field for thirty years" is important context for how to read the ' +
      'submission. It is not sufficient support for a contested historical or empirical claim. ' +
      'The provenance model separates contributor identity from claim validity — both are ' +
      'recorded, and both matter, but they are recorded separately.',
    coreQuestion:
      'Does this evidence stand if we remove the contributor\'s credentials from consideration?',
    failurePattern:
      'Leading with title, role, years of experience, or institutional affiliation as if that ' +
      'settles the question. "I was there so I know." "As someone who has spent decades in this ' +
      'field..." used as the primary support rather than as context.',
    corrective:
      'Separate the contributor from the claim. Record both. Ask what evidence supports the ' +
      'claim independently of the contributor\'s presence or authority.',
  },

  {
    id: 'red-pill-architecture',
    number: 4,
    name: 'The Red Pill Architecture',
    source:
      'Tucker Carlson epistemology analysis — false precision, bandwagon fallacy, post hoc ' +
      'fallacy, false dichotomy, loaded language, awakening narrative',
    sourceDescription:
      'A detailed analysis of a Tucker Carlson monologue mapped the full architecture of a ' +
      'self-sealing belief system: a personal experience presented as cosmic truth, a claim ' +
      'that every culture throughout history agrees, a post hoc causal chain from the atomic ' +
      'bomb to secularism to decline, a false dichotomy between spiritual awareness and blind ' +
      'modernism, and a conclusion that anyone who disagrees is either asleep or evil. Each ' +
      'move reinforced the others. No evidence could challenge the framework because challenge ' +
      'was built into the system as proof of the challenger\'s blindness.',
    principle:
      'A self-sealing belief system is one designed so that any challenge to it becomes, within ' +
      'the system\'s own logic, further proof of the system\'s truth. This is the hallmark of ' +
      'conspiratorial thinking: the framework is unfalsifiable by design. Once inside it, ' +
      'disagreement proves blindness, evidence proves conspiracy, and confidence substitutes ' +
      'for verification. The awakening narrative — the conviction that one has finally seen ' +
      'what others cannot — is the most socially powerful form of this architecture.',
    commonsApplication:
      'The Knowledge Commons explicitly rejects unfalsifiable frameworks — whether they come ' +
      'from mainstream historiography that cannot acknowledge its own omissions, or from ' +
      'community narratives that cannot be questioned without being labelled as betrayal. ' +
      'Every claim in the archive must be, in principle, falsifiable: capable of being shown ' +
      'wrong by new evidence. This is not a concession to sceptics. It is the condition that ' +
      'makes the archive trustworthy enough to be built upon.',
    coreQuestion:
      'Could new evidence change this claim? If the answer is no, the framework is closed — ' +
      'and closed frameworks do not belong in an open archive.',
    failurePattern:
      'Any challenge to the claim is absorbed as further proof of the claim. Disagreement ' +
      'is reframed as ignorance, bias, or institutional capture. The claim cannot be wrong ' +
      'because the framework defines wrongness as impossible.',
    corrective:
      'Ask explicitly: what evidence would change your mind about this? If there is no answer, ' +
      'classify the claim as community conviction — a different and legitimate category, but ' +
      'not empirical knowledge.',
  },

  {
    id: 'institutional-rhetoric',
    number: 5,
    name: 'Institutional Rhetoric as Architecture',
    source: 'Dennis Prager / PragerU epistemology analysis — Rationality Rules',
    sourceDescription:
      'A detailed analysis of a Dennis Prager "master class" on secularism revealed a ' +
      'systematic architecture of rhetorical manipulation: the central term "secularism" was ' +
      'never defined so it could mean whatever the argument needed it to mean; the audience ' +
      'was told that disagreement proved intellectual dishonesty rather than evidential dispute; ' +
      'imagery of violence and anarchy was used to represent one side while the other was ' +
      'represented by calm authority; and the production quality of the videos did significant ' +
      'rhetorical work that had no relationship to the quality of the arguments.',
    principle:
      'Arguments made by institutions — especially those with production budgets, confident ' +
      'presenters, and the aesthetic trappings of authority — often smuggle contested premises ' +
      'inside confident framing. The production quality signals credibility. The undefined key ' +
      'term is never pinned down so it can mean whatever the argument needs it to mean. The ' +
      'intellectual honesty trap frames disagreement as moral failure rather than evidential ' +
      'dispute. This is the primary mechanism through which colonial historiography has ' +
      'operated: authoritative, well-produced, widely cited, built on undefended premises about ' +
      'who counts as a historical subject.',
    commonsApplication:
      'The Knowledge Commons pays particular attention to submissions that derive authority ' +
      'from institutional sources — official histories, government records, academic consensus ' +
      'positions — without examining the premises those sources rest on. The question is not ' +
      'whether the source is authoritative but whether the specific claim being made from that ' +
      'source is supported by the evidence in it. Institutional authority is context, not proof.',
    coreQuestion:
      'Are all key terms explicitly defined? Is the foundational premise defended with evidence, ' +
      'or asserted with authority?',
    failurePattern:
      'Undefined central terms used flexibly to cover multiple meanings. Institutional citation ' +
      'as if the institution\'s authority transfers to the specific claim. Framing disagreement ' +
      'as moral or intellectual failure rather than evidential dispute.',
    corrective:
      'Define key terms before proceeding. Separate the institution\'s general authority from ' +
      'the specific claim being made. Ask whether the premise is defended or merely stated ' +
      'confidently.',
  },

  {
    id: 'premise-audit',
    number: 6,
    name: 'The Premise Audit',
    source:
      'Ben Shapiro / argument from change analysis — Rationality Rules, with philosopher ' +
      'Joe Schmidt',
    sourceDescription:
      'A detailed philosophical analysis of a Ben Shapiro argument for God\'s existence ' +
      'demonstrated that a logically valid argument — one whose conclusion followed from its ' +
      'premises — is not the same as a sound argument. The first premise (that all change is ' +
      'the actualisation of potential) was asserted as self-evident when it is in fact ' +
      'extremely controversial in metaphysics and rejected by the majority of contemporary ' +
      'philosophers. Every subsequent step was technically valid. The entire argument collapsed ' +
      'because the first premise had never been defended.',
    principle:
      'A logically valid argument is not the same as a sound argument. Soundness requires that ' +
      'the premises themselves be true and defended. Many confident, technically sophisticated ' +
      'arguments rest on premises that are asserted without evidence, that assume what they are ' +
      'trying to prove, or that depend on frameworks the vast majority of relevant experts ' +
      'reject. Identifying the first undefended premise is more important than engaging with ' +
      'the conclusion. What can be asserted without evidence can be dismissed without evidence.',
    commonsApplication:
      'Every significant claim entering the Knowledge Commons is subject to a premise audit: ' +
      'identify the claim, identify the premises it depends on, and verify that each premise ' +
      'is supported rather than assumed. This is particularly important for historical claims ' +
      'where the narrative structure often conceals the premises — the "of course" moments ' +
      'where the argument assumes what it needs to prove. The colonial archive is full of ' +
      'asserted-as-self-evident premises about civilisation, development, and the hierarchy ' +
      'of cultures. The counter-archive names them.',
    coreQuestion:
      'What is the first premise this argument depends on, and is it supported by evidence ' +
      'rather than assumed?',
    failurePattern:
      'Premises stated as if they were universally agreed when they are contested. "Obviously." ' +
      '"Of course." "Everyone accepts that..." used to skip past the foundational assumption. ' +
      'Technical validity presented as if it proves soundness.',
    corrective:
      'Slow down at the first premise. Name it explicitly. Ask for the evidence that supports ' +
      'it independently of the argument it is being used to support.',
  },
];

// ─── VALIDATION CHECKLIST ────────────────────────────────────────────────────

export const VALIDATION_CHECKLIST: ChecklistQuestion[] = [
  {
    id: 'Q1',
    number: 1,
    question:
      'Is the foundational methodology sound? Have the groups, periods, or bodies of evidence ' +
      'been made comparable before the comparison is drawn?',
    elaboration:
      'If the submission compares two things — communities, time periods, datasets, cultural ' +
      'practices — verify that the comparison is valid before engaging with what it shows. ' +
      'Confounding variables (age, access to documentation, geographic scope, recording bias) ' +
      'must be acknowledged. If the methodology cannot be verified, the conclusions must be ' +
      'qualified accordingly.',
    conceptId: 'first-step',
    failureMode: 'Flawed methodology poisons every conclusion it produces',
    passIndicator:
      'The submission explicitly addresses how its comparison groups were selected and why ' +
      'they are comparable, or explicitly acknowledges the limits of the comparison.',
    failIndicator:
      'The submission draws confident conclusions from a comparison without examining whether ' +
      'the comparison is valid.',
  },
  {
    id: 'Q2',
    number: 2,
    question:
      'Can you name one specific, traceable source for each significant claim — not "everyone ' +
      'knows", not community consensus, just one named source?',
    elaboration:
      'A named source means a document, a dated account, a named individual, a specific ' +
      'publication, or a datable event. Community oral tradition and lived experience are valid ' +
      'and important — they are categorised accurately rather than mislabelled as independently ' +
      'verified fact. The question is not whether the source is formal or institutional, but ' +
      'whether it is traceable.',
    conceptId: 'ambient-certainty',
    failureMode: 'Confidence without traceability is atmosphere, not evidence',
    passIndicator:
      'Each significant claim in the submission is attributable to a specific, named source, ' +
      'or is explicitly labelled as community consensus, oral tradition, or personal testimony.',
    failIndicator:
      'Significant claims are stated as established fact without attribution, or attributed ' +
      'vaguely to "the community" or "general knowledge".',
  },
  {
    id: 'Q3',
    number: 3,
    question:
      'Does the claim stand if the contributor\'s credentials and identity are removed from ' +
      'consideration?',
    elaboration:
      'Test the submission by removing all references to who made it. Does the evidence still ' +
      'support the claim? If the claim only works because of who is making it — because of ' +
      'their authority, their years of experience, their institutional affiliation — it needs ' +
      'additional independent support. Contributor identity is recorded in the provenance layer ' +
      'and is genuinely important context. It is not the argument.',
    conceptId: 'credential-trap',
    failureMode: 'Evidence must be independent of who presents it',
    passIndicator:
      'The evidence and reasoning in the submission would support the claim even if the ' +
      'contributor\'s identity were unknown.',
    failIndicator:
      'The primary support for the claim is the contributor\'s personal authority, experience, ' +
      'or institutional affiliation rather than independent evidence.',
  },
  {
    id: 'Q4',
    number: 4,
    question:
      'Could new evidence, in principle, change this claim? Is the framework falsifiable?',
    elaboration:
      'Ask explicitly: what evidence would cause this claim to be revised or withdrawn? If ' +
      'there is no answer — if the claim is structured so that any challenge becomes further ' +
      'proof of the claim — the framework is unfalsifiable and cannot enter the archive as ' +
      'verified knowledge. It can enter as community conviction, which is a different and ' +
      'legitimate category. The archive is honest about what it knows and how it knows it.',
    conceptId: 'red-pill-architecture',
    failureMode: 'Unfalsifiable claims cannot be corrected when wrong',
    passIndicator:
      'The contributor can articulate what evidence would change or qualify the claim, and ' +
      'the submission acknowledges its own limits and conditions.',
    failIndicator:
      'The claim is framed so that disagreement proves the disagreer\'s bias, blindness, or ' +
      'bad faith. There is no evidence that could in principle change it.',
  },
  {
    id: 'Q5',
    number: 5,
    question:
      'Are all key terms explicitly defined? Is the foundational premise defended with ' +
      'evidence, or asserted with authority?',
    elaboration:
      'Identify the central terms in the claim and verify they are defined consistently. ' +
      'Undefined key terms — "community", "achievement", "decline", "tradition", "authentic", ' +
      '"original" — allow the argument to shift meaning as needed. Then identify the ' +
      'foundational premise and ask whether it is defended with evidence or stated as if it ' +
      'were obvious. Institutional authority is context, not proof.',
    conceptId: 'institutional-rhetoric',
    failureMode:
      'Undefined terms and undefended premises are the primary tools of narrative capture',
    passIndicator:
      'Key terms are explicitly defined and used consistently. The foundational premise is ' +
      'stated clearly and supported by evidence rather than asserted with confidence.',
    failIndicator:
      'Central terms shift meaning through the submission. The foundational premise is stated ' +
      'as self-evident, "obvious", or supported solely by institutional authority.',
  },
  {
    id: 'Q6',
    number: 6,
    question:
      'What is the first premise this argument depends on, and is it supported by evidence ' +
      'rather than assumed?',
    elaboration:
      'Work backwards from the conclusion to find the claim that everything else rests on. ' +
      'State that premise explicitly and test it independently of the argument it supports. ' +
      'This is the premise audit. A technically valid chain of reasoning built on an ' +
      'undefended first premise produces a valid but unsound argument — one whose conclusion ' +
      'cannot be trusted regardless of how carefully the subsequent steps were constructed.',
    conceptId: 'premise-audit',
    failureMode: 'A chain of logic is only as strong as its first link',
    passIndicator:
      'The first premise is stated explicitly and supported by evidence that does not merely ' +
      'restate the conclusion.',
    failIndicator:
      '"Obviously." "Of course." "It goes without saying." The first premise is assumed ' +
      'rather than defended.',
  },
];

// ─── VALIDATION OUTCOME TIERS ────────────────────────────────────────────────

export const VALIDATION_OUTCOME_TIERS: ValidationOutcomeTier[] = [
  {
    outcome: 'verified',
    questionsFailedRange: '0',
    label: 'Verified knowledge',
    archiveStatus:
      'Enters the archive as verified knowledge. Attributed, dated, sourced, and accessible ' +
      'to all.',
    action: 'Publish to archive with full provenance record.',
    notation: null,
  },
  {
    outcome: 'notated',
    questionsFailedRange: '1–2',
    label: 'Verified with notation',
    archiveStatus:
      'Enters the archive with a clear notation indicating which questions it did not fully ' +
      'satisfy and why.',
    action:
      'Publish with notation. Contributor receives specific notes and an invitation to revise ' +
      'for the next version.',
    notation:
      'This submission has been validated with the following qualification: [specify question ' +
      'numbers and brief reason]. Contributors are invited to provide additional sourcing.',
  },
  {
    outcome: 'contextualised',
    questionsFailedRange: '3–4',
    label: 'Community testimony / oral tradition',
    archiveStatus:
      'Classified as community consensus or oral tradition pending revision. Enters the archive ' +
      'in the testimony section, not the verified knowledge section. Not suppressed — ' +
      'contextualised.',
    action:
      'Return to contributor with detailed notes. Offer classification as oral tradition or ' +
      'community testimony, which enters the archive immediately in the appropriate section.',
    notation:
      'This submission has been classified as community testimony or oral tradition. It is ' +
      'valuable and is preserved in the archive accurately. It has not yet met the evidential ' +
      'threshold for the verified knowledge section. Notes: [specify].',
  },
  {
    outcome: 'returned',
    questionsFailedRange: '5–6',
    label: 'Returned for revision',
    archiveStatus:
      'Not published in any section at this stage. Returned to contributor with specific, ' +
      'numbered notes.',
    action:
      'Return with specific notes referencing each failed question by number. A second ' +
      'submission is permitted. If the second submission fails at the same points, the ROV ' +
      'offers a guided revision session before a third attempt.',
    notation: null,
  },
];

// ─── ROV PROFILES ────────────────────────────────────────────────────────────

export const ROV_PROFILES: RovProfile[] = [
  {
    id: 'esi',
    name: 'Esi',
    icon: '🗂️',
    domain: 'Heritage Discovery — Black British history and the counter-archive',
    primaryConcepts: [
      'first-step',
      'ambient-certainty',
      'institutional-rhetoric',
      'premise-audit',
    ],
    validationQuestions: [
      'What primary or contemporary secondary sources support this historical claim?',
      'If this is a comparison across time periods, have the conditions been made comparable — ' +
        'same geographic range, equivalent access to documentation, same types of cultural output?',
      'Is the claim falsifiable — could new archival evidence change it?',
      'Are key terms (e.g. "community", "achievement", "decline", "tradition") explicitly ' +
        'defined and used consistently throughout?',
      'What is the foundational premise, and where is it supported independently of the ' +
        'argument it is being used to support?',
      'Does this submission engage with the institutional sources it draws on critically — ' +
        'acknowledging that official historical records have their own omissions and biases?',
    ],
    commonFailureModes: [
      'Heritage claims stated as established fact that rest on community oral tradition — ' +
        'valuable but needing accurate classification.',
      'Comparisons across time periods that do not account for changes in documentation ' +
        'practices, geographic boundaries, or what counted as recordable activity.',
      'Institutional sources cited as if their authority transfers to the specific claim, ' +
        'without examining the premises those sources rest on.',
      'The ambient certainty problem: "it is well known that..." used to skip over claims ' +
        'that are not in fact well-sourced.',
    ],
    exampleIntervention:
      'That is a significant historical claim. Before we can place it in the archive as ' +
      'verified knowledge, I need you to trace it to one primary source — a document, a ' +
      'record, a dated account. Community consensus that something happened is a valid ' +
      'starting point. It is not yet an archive entry. Would you like help finding the ' +
      'primary source, or would you prefer to classify this as community testimony for now?',
    returnNoteTemplate:
      'Thank you for this submission to the Knowledge Commons. The following questions from ' +
      'the validation checklist need to be addressed before this can enter the verified ' +
      'knowledge section: [Q numbers and specific reasons]. This submission would enter the ' +
      'archive immediately as community testimony if you would prefer that classification ' +
      'while you work on sourcing. Please let me know how you would like to proceed.',
  },

  {
    id: 'stemgeneers',
    name: 'STEMgeneers Specialist',
    icon: '⚡',
    domain: 'Technical knowledge — repair, device literacy, applied science',
    primaryConcepts: ['first-step', 'credential-trap', 'premise-audit'],
    validationQuestions: [
      'Has this technique been tested under comparable conditions, or described from a single ' +
        'case with a specific device?',
      'Can the result be replicated by someone following these instructions without the ' +
        'contributor\'s prior knowledge or tools?',
      'Are safety implications explicitly addressed, or explicitly noted as outside the scope ' +
        'of this entry?',
      'Are the tools, materials, conditions, and failure modes specified with enough precision ' +
        'to be genuinely useful to someone with no prior knowledge of this repair?',
      'Is the contributor\'s personal experience with this technique the primary evidence, or ' +
        'is there additional corroboration?',
    ],
    commonFailureModes: [
      'Repair guides described from one experience with one specific device, presented as ' +
        'generalisable without qualification.',
      'Safety implications omitted because the contributor is experienced enough not to think ' +
        'about them — the Dunning-Kruger gap in reverse.',
      'Technical vocabulary used to signal expertise rather than to convey information, making ' +
        'the guide inaccessible to the audience it is intended for.',
      'Tools and materials specified by brand preference rather than function, making the guide ' +
        'unusable for someone without access to those specific products.',
    ],
    exampleIntervention:
      'This repair guide is based on your experience with one specific device model. That is ' +
      'valuable knowledge. For the archive, we need either a note confirming it is ' +
      'device-specific and the model number, or evidence that the technique generalises to ' +
      'the device family. Which fits what you actually know from your experience?',
    returnNoteTemplate:
      'This technical submission is valuable. To enter the verified knowledge section, the ' +
      'following need to be addressed: [Q numbers and specific reasons]. The most important ' +
      'is [primary issue]. I can help you reframe this accurately — the goal is to make sure ' +
      'the entry is as useful as possible to someone attempting this repair without your ' +
      'background knowledge.',
  },

  {
    id: 'techreneurs',
    name: 'TECHreneurs Specialist',
    icon: '💻',
    domain: 'Commercial knowledge — business models, market claims, financial assertions',
    primaryConcepts: [
      'first-step',
      'ambient-certainty',
      'institutional-rhetoric',
      'premise-audit',
    ],
    validationQuestions: [
      'Is this market claim based on documented data or on personal experience and observation?',
      'If this is a comparative claim (e.g. "our model outperforms X"), are the comparison ' +
        'groups genuinely comparable — same market, same time period, equivalent conditions?',
      'Are projections clearly labelled as projections and distinguished from current ' +
        'performance data?',
      'Can you name one independent source that supports the core business assertion?',
      'Is the foundational premise of the business model stated explicitly and supported by ' +
        'evidence, or assumed as self-evident?',
    ],
    commonFailureModes: [
      'Market claims stated as established fact based on personal experience in one context, ' +
        'without acknowledging that the market may behave differently in other contexts.',
      'Projections presented alongside current performance data without clear labelling, ' +
        'creating an implied equivalence.',
      'Comparative claims that compare the best-case scenario for one model against the ' +
        'worst-case scenario for another.',
      'The premise audit failure: foundational business assumptions treated as self-evident ' +
        'when they are actually contestable.',
    ],
    exampleIntervention:
      'The 55/25/20 revenue model is documented and verifiable. The claim that it outperforms ' +
      'standard platform models needs a comparable baseline — what are you measuring against, ' +
      'under what conditions, and over what time period? If you have that data, it makes this ' +
      'a much stronger entry. If you don\'t, we can note the claim as an observation from ' +
      'your experience rather than a verified comparative finding.',
    returnNoteTemplate:
      'This business knowledge submission has real value for the community. To enter the ' +
      'verified section, the following need to be addressed: [Q numbers and specific reasons]. ' +
      'The key issue is [primary issue]. I can help you distinguish between what you know ' +
      'from your own experience and what is independently verifiable — both are worth ' +
      'preserving accurately.',
  },

  {
    id: 'gtechcasters',
    name: 'G-Tech Casters Specialist',
    icon: '🎙️',
    domain: 'Broadcast and media knowledge — editorial standards, attribution, framing',
    primaryConcepts: [
      'ambient-certainty',
      'institutional-rhetoric',
      'red-pill-architecture',
      'credential-trap',
    ],
    validationQuestions: [
      'Is every factual claim in this script or feature attributable to a named, traceable source?',
      'Has the framing been examined for loaded language — terms that provoke feeling rather ' +
        'than convey information?',
      'If this is a comparison or a ranking, are the criteria for comparison explicit and ' +
        'consistently applied?',
      'Has the piece been checked for the ambient certainty problem — claims stated as obvious ' +
        'or established that have not actually been traced to a source?',
      'Is the piece structured so that disagreement or counter-evidence could be addressed, ' +
        'or is it structured to close down that possibility?',
    ],
    commonFailureModes: [
      'Factual claims stated without attribution because the contributor assumes the audience ' +
        'already knows the source.',
      'Loaded language used unconsciously — terms with built-in evaluative weight that the ' +
        'contributor has absorbed from their media environment.',
      'The ambient certainty problem in broadcast form: things stated as obviously true that ' +
        'the contributor has not actually sourced.',
      'Framing that presents one perspective as default and others as requiring explanation, ' +
        'without the contributor being aware they have done this.',
    ],
    exampleIntervention:
      'This script has three factual claims in the first minute that are stated as established ' +
      'fact. Before broadcast, I want to help you source each one — not because I doubt them, ' +
      'but because attribution makes the broadcast more credible and protects you if anyone ' +
      'challenges it. Which of the three would you like to start with?',
    returnNoteTemplate:
      'This piece is strong editorially. Before it can be published or broadcast from the ' +
      'Knowledge Commons, the following need to be addressed: [Q numbers and specific reasons]. ' +
      'The editorial standard is the same for every piece — these are the same questions we ' +
      'would ask of a submission from any broadcaster. I can help you work through them.',
  },

  {
    id: 'pageturners',
    name: 'Pageturners Specialist',
    icon: '✍️',
    domain:
      'Written knowledge — creative non-fiction, community histories, oral history transcription',
    primaryConcepts: [
      'ambient-certainty',
      'credential-trap',
      'premise-audit',
      'red-pill-architecture',
    ],
    validationQuestions: [
      'Where the piece presents personal testimony as historical record, is that distinction ' +
        'clearly marked for the reader?',
      'Have named individuals been given the opportunity to review their representation in ' +
        'the piece?',
      'If this is a community history, has the piece been checked against at least one other ' +
        'account of the same events?',
      'Are claims about causation (X caused Y) clearly distinguished from observations of ' +
        'correlation, sequence, or pattern?',
      'Is the piece\'s own perspective on events explicit, so the reader can calibrate ' +
        'accordingly, rather than presented as neutral?',
    ],
    commonFailureModes: [
      'Personal testimony presented as objective historical record without acknowledging the ' +
        'contributor\'s perspective and position.',
      'Named individuals represented in ways they have not had the opportunity to review — ' +
        'particularly for sensitive or contested events.',
      'Causal claims stated confidently when the evidence only supports sequence or correlation.',
      'The pretence of neutrality: a perspective presented as if it were no perspective, ' +
        'making it harder for the reader to calibrate.',
    ],
    exampleIntervention:
      'This oral history is rich and important. One section attributes a specific decision to ' +
      'the Council without a source, and describes it as the cause of a subsequent community ' +
      'change. We can handle this in two ways: either source the decision, or reframe it as ' +
      '"in the community\'s understanding at the time, this decision led to..." Both are valid. ' +
      'Which fits your intent?',
    returnNoteTemplate:
      'This piece is genuinely valuable community history. To enter the verified knowledge ' +
      'section, the following need to be addressed: [Q numbers and specific reasons]. None ' +
      'of these require you to change your account — they require you to be explicit about ' +
      'what kind of account it is. That honesty is what makes it trustworthy.',
  },

  {
    id: 'auntie-anansis',
    name: 'Auntie Anansi\'s Kitchen Specialist',
    icon: '🍲',
    domain: 'Cultural and culinary knowledge — food heritage, recipe provenance, diaspora foodways',
    primaryConcepts: [
      'ambient-certainty',
      'institutional-rhetoric',
      'premise-audit',
      'credential-trap',
    ],
    validationQuestions: [
      'Is the cultural lineage of this dish or technique stated explicitly, and is it traceable ' +
        'to a specific community, region, family tradition, or oral source?',
      'If there are multiple variant traditions for this dish, are they acknowledged rather ' +
        'than erased by a single authoritative version?',
      'Is ingredient substitution guidance clearly marked as adaptation rather than original, ' +
        'so the tradition and the adaptation are both preserved?',
      'Does the provenance record clearly distinguish between received knowledge (from family ' +
        'or community) and the contributor\'s own innovations to the recipe?',
      'Are claims about a dish\'s origin or cultural significance traceable to a source, or ' +
        'are they community consensus presented as established fact?',
    ],
    commonFailureModes: [
      'A single family\'s version of a dish presented as the authoritative version, erasing ' +
        'the regional and diaspora variation that is part of the dish\'s actual history.',
      'Adaptations (ingredient substitutions, technique modifications for available equipment) ' +
        'mixed into the original recipe without being marked as such.',
      'Origin stories stated confidently that rest on community oral tradition rather than ' +
        'traceable sources.',
      'The premise that there is one correct version of a traditional dish — a premise that ' +
        'is almost always false and that does a disservice to the actual richness of the tradition.',
    ],
    exampleIntervention:
      'The jerk seasoning recipe is attributed to a Jamaican family tradition — and that is ' +
      'exactly the right kind of provenance. If you have adapted the proportions or the method ' +
      'for ingredients available in the UK, that adaptation should be noted separately. Not ' +
      'because it diminishes the recipe — it doesn\'t — but because both the tradition and ' +
      'your version deserve to be preserved accurately. Future contributors can then add ' +
      'their own versions.',
    returnNoteTemplate:
      'This culinary heritage submission is exactly the kind of knowledge the archive is ' +
      'built to preserve. To enter the verified section, the following need to be addressed: ' +
      '[Q numbers and specific reasons]. The most important is [primary issue]. The goal is ' +
      'to preserve both the tradition and your relationship to it as accurately as possible.',
  },

  {
    id: 'roots',
    name: 'Roots Specialist',
    icon: '🌿',
    domain: 'Body sovereignty and wellness knowledge — hair science, health literacy, self-advocacy',
    primaryConcepts: [
      'first-step',
      'credential-trap',
      'institutional-rhetoric',
      'premise-audit',
    ],
    validationQuestions: [
      'Is a distinction maintained between documented scientific evidence and community ' +
        'practice or personal testimony?',
      'Where health claims are made, are they consistent with current clinical consensus, ' +
        'and is that consensus cited?',
      'Are the limits of this knowledge explicitly acknowledged — conditions under which the ' +
        'guidance does not apply, or populations for whom it may not be appropriate?',
      'Is the source of this knowledge (trichologist, family tradition, personal experience, ' +
        'community practice) clearly attributed so the reader can calibrate accordingly?',
      'Does the piece acknowledge that individual variation is real — that what works for one ' +
        'person\'s hair or body may not work for another?',
    ],
    commonFailureModes: [
      'Personal experience presented as universal guidance without acknowledging individual ' +
        'variation — particularly significant in hair and skin care where variation is the norm.',
      'Community practice presented as scientifically validated when the scientific evidence ' +
        'is limited, contested, or simply absent.',
      'The limits of the guidance not stated — the conditions under which it does not apply, ' +
        'or the cases where professional consultation is needed.',
      'Institutional health advice cited as if it applies uniformly to all communities, without ' +
        'acknowledging that much clinical research has historically excluded Black and brown ' +
        'bodies — making the community practice sometimes more accurate than the official guidance.',
    ],
    exampleIntervention:
      'This hair care guide references the protein-moisture balance as established fact — and ' +
      'it is a well-documented principle. The specific ratios you cite are from one school of ' +
      'trichological practice. We should note that explicitly, so readers know this is a ' +
      'documented approach with good evidence behind it, rather than the only approach. That ' +
      'framing actually makes the guide more credible, not less.',
    returnNoteTemplate:
      'This wellness knowledge submission is valuable and will be useful to the community. ' +
      'To enter the verified section, the following need to be addressed: [Q numbers and ' +
      'specific reasons]. The key issue is [primary issue]. I can help you frame this in a ' +
      'way that is both accurate and empowering — those are not in tension.',
  },

  {
    id: 'bright-sparks',
    name: 'Bright Sparks Specialist',
    icon: '✨',
    domain: 'Entry-level and exploratory knowledge — the curiosity threshold',
    primaryConcepts: [
      'ambient-certainty',
      'credential-trap',
      'premise-audit',
    ],
    validationQuestions: [
      'Is the contributor clear on what they know from direct experience versus what they have ' +
        'been told or absorbed from their environment?',
      'Can they identify where their knowledge comes from — even if the source is informal, ' +
        'familial, or community-based?',
      'Are they comfortable distinguishing between what they know and what they believe or ' +
        'assume — without that distinction undermining the value of what they carry?',
      'What is the first question they cannot yet answer about their own knowledge — and is ' +
        'that question documented for the archive as a thread worth following?',
      'Is the contributor being asked to produce more certainty than they actually have? ' +
        'If so, the problem is with the request, not with the contributor.',
    ],
    commonFailureModes: [
      'Applying the same evidential standard to exploratory knowledge as to verified ' +
        'knowledge — the Bright Sparks specialist\'s primary job is to prevent this.',
      'Contributors being discouraged by the validation process rather than supported by it.',
      'The curiosity question — the thing the contributor doesn\'t yet know — being lost ' +
        'because the process only captures what they do know.',
      'Treating "I\'m not sure" as a failure rather than as the beginning of good epistemology.',
    ],
    exampleIntervention:
      'You know more than you think you know. And you know enough to know where the edge of ' +
      'your knowledge is — which is exactly where the interesting work starts. Let\'s document ' +
      'both: what you know and the question you\'re carrying. The question is as valuable to ' +
      'the archive as the answer.',
    returnNoteTemplate:
      'This is a Bright Sparks submission — which means the standard is not the same as for ' +
      'a fully developed heritage claim. What you have shared here is valuable as it is. ' +
      'I have documented your knowledge accurately and noted the question you are still ' +
      'exploring. When you have followed that question further, I would like to hear what ' +
      'you find.',
  },
];

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────

/**
 * Returns a concept by ID.
 */
export function getConcept(id: ConceptId): Concept | undefined {
  return SIX_CONCEPTS.find(c => c.id === id);
}

/**
 * Returns a checklist question by ID.
 */
export function getChecklistQuestion(id: string): ChecklistQuestion | undefined {
  return VALIDATION_CHECKLIST.find(q => q.id === id);
}

/**
 * Returns a ROV profile by ID.
 */
export function getRovProfile(id: RovId): RovProfile | undefined {
  return ROV_PROFILES.find(r => r.id === id);
}

/**
 * Returns the outcome tier for a given number of failed questions.
 */
export function getOutcomeTier(failedCount: number): ValidationOutcomeTier {
  if (failedCount === 0) return VALIDATION_OUTCOME_TIERS[0];
  if (failedCount <= 2) return VALIDATION_OUTCOME_TIERS[1];
  if (failedCount <= 4) return VALIDATION_OUTCOME_TIERS[2];
  return VALIDATION_OUTCOME_TIERS[3];
}

/**
 * Returns the validation questions for a given ROV, enriched with the
 * full concept definition for each primary concept.
 * Used by rovPromptBuilder.ts to assemble the ROV system prompt.
 */
export function getRovFrameworkPromptBlock(rovId: RovId): string {
  const rov = getRovProfile(rovId);
  if (!rov) return '';

  const conceptSummaries = rov.primaryConcepts
    .map(cid => {
      const concept = getConcept(cid);
      if (!concept) return '';
      return `— ${concept.name}: "${concept.coreQuestion}"`;
    })
    .filter(Boolean)
    .join('\n');

  const questionList = rov.validationQuestions
    .map((q, i) => `${i + 1}. ${q}`)
    .join('\n');

  return (
    `EPISTEMOLOGICAL FRAMEWORK — ${rov.name.toUpperCase()}\n` +
    `Domain: ${rov.domain}\n\n` +
    `Primary concepts to apply:\n${conceptSummaries}\n\n` +
    `Validation questions for this domain:\n${questionList}\n\n` +
    `Example intervention language:\n"${rov.exampleIntervention}"\n\n` +
    `When returning a submission with notes, use this template structure:\n` +
    `"${rov.returnNoteTemplate}"`
  );
}

/**
 * Returns a contributor-facing self-check prompt — the six questions
 * in plain language for the submission form.
 * Used by the Knowledge Commons submission UI.
 */
export function getContributorSelfCheck(): Array<{
  id: string;
  question: string;
  hint: string;
}> {
  return VALIDATION_CHECKLIST.map(q => ({
    id: q.id,
    question: q.question,
    hint: q.elaboration,
  }));
}

/**
 * Returns the full framework context for injection into the
 * Knowledge Commons shell — used by the Maya receptionist on the
 * heritage page to orient new contributors.
 */
export const FRAMEWORK_OVERVIEW = {
  title: 'The Knowledge Commons Epistemological Framework',
  version: '1.0',
  date: 'March 2026',
  summary:
    'Six named concepts, a six-question validation checklist, and a per-ROV application ' +
    'guide that together define how knowledge enters, is evaluated, and is preserved in the ' +
    'Wembley Wonders Knowledge Commons. The standard is the same for everyone. The reasoning ' +
    'behind each standard is transparent and named. The framework itself is open to challenge ' +
    'through the same process it applies to submissions.',
  equianoPrinciple:
    'Olaudah Equiano documented his own experience with the rigour of someone who knew his ' +
    'testimony would be challenged. He met the burden. The Knowledge Commons stands in that ' +
    'tradition — not because it expects its contributors to bear an unfair burden, but because ' +
    'it refuses to let the quality of community knowledge be used as a reason to dismiss it.',
  coreCommitment:
    'The answer to bad epistemology is not no epistemology. It is better epistemology, applied ' +
    'consistently, transparently, and in the community\'s own interest.',
};
