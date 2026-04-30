/**
 * MayaArticleResponseROV.ts
 * Wembley Wonders CIC
 *
 * The Joystick editorial interlocutor.
 * Extends MayaEditorialCore with Joystick-specific domain knowledge.
 *
 * Functions:
 *   — generatePreseedQuestion: the opening question Maya has ready when
 *     an article publishes. Specific, not generic. Never "what did you think?"
 *   — generateEditorialResponse: Maya's response to a reader contribution
 *   — generateAuthorFeedback: Maya's note to the author on publication
 *   — generateArchiveConnections: surfaces related archive material
 *   — assessContribution: applies editorial questions + safeguarding
 *
 * Place in: src/rov/personalities/joystick/MayaArticleResponseROV.ts
 */

import MayaEditorialCore, {
  EditorialContext,
  SafeguardingAssessment,
  ArchiveConnection,
  PortfolioNote,
  buildCoreSystemPrompt,
  assessSafeguarding,
  generatePortfolioNote,
  EDITORIAL_QUESTIONS,
} from '../core/MayaEditorialCore';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface JoystickArticle {
  id: string;
  title: string;
  body: string;
  authorId: string;
  authorDisplayName: string;
  wardTag?: string;
  tags: string[];
  contributionType: string;
  wordCount: number;
  publishedAt?: Date;
  programmeContext: 'joystick';
}

export interface ArticlePreseed {
  articleId: string;
  openingQuestion: string;       // shown to readers below the article
  authorFeedback: string;        // sent to the author on publication
  portfolioNote: PortfolioNote;  // stored with the article for portfolio builder
  archiveConnections: string[];  // search terms for archive lookup
  editorialSummary: string;      // what the piece does well / could develop
  generatedAt: Date;
}

export interface ReaderContribution {
  content: string;
  authorId?: string;
  isAnonymous: boolean;
  articleId: string;
  wardTag?: string;
}

export interface ContributionAssessment {
  safeguarding: SafeguardingAssessment;
  mayaResponse: string;
  shouldPublish: boolean;
  requiresHumanReview: boolean;
  editorialGuidance?: string;
}

// ─── Joystick-specific system prompt extension ────────────────────────────────

export function buildJoystickSystemPrompt(
  article: JoystickArticle,
  mode: 'preseed' | 'reader-response' | 'author-feedback'
): string {
  const corePrompt = buildCoreSystemPrompt({
    programmeContext: 'joystick',
    wardTag: article.wardTag as any,
    contentType: article.contributionType,
    wordCount: article.wordCount,
  });

  const joystickExtension = `

## Joystick e-zine context

Joystick is Wembley Wonders' community e-zine. It covers gaming, culture, creativity, and the texture of life in Brent. It has 16 contribution types — from personal essay to game review to oral history to investigative piece.

The Joystick editorial voice is "between the aisles" — ordinary Brent life observed with precision and care. Nothing too grand. Nothing dismissed as too small.

Ward-level geographic tagging across all 9 Brent wards connects every piece to its place. A piece from Stonebridge carries different context than a piece from Kilburn. You know both.

Joystick is a permanent archive. Ten years from now, someone will read what gets published here trying to understand what it was like to live in Brent right now. That weight is present in every editorial decision.

## The article you are responding to

Title: "${article.title}"
Author: ${article.authorDisplayName}
Contribution type: ${article.contributionType}
Ward: ${article.wardTag || 'untagged'}
Tags: ${article.tags.join(', ')}
Word count: ${article.wordCount}

Article text:
---
${article.body.slice(0, 2000)}${article.body.length > 2000 ? '\n[...article continues]' : ''}
---

## Your mode for this response

${getModeInstructions(mode)}`;

  return corePrompt + joystickExtension;
}

function getModeInstructions(mode: string): string {
  const instructions: Record<string, string> = {
    'preseed': `Generate a PRESEED OPENING QUESTION for readers.

This question will appear below the article before any readers have responded.
It is Maya's first move in the conversation.

Requirements:
- Specific to THIS article — not a generic "what did you think?"
- Draws on something the article actually says, implies, or omits
- Opens genuine inquiry — not a comprehension check
- Ward-aware if the article is tagged to a specific area
- One or two sentences maximum
- Ends with a question mark
- Sounds like a person, not a system

Good example: "The article describes the youth club closing in 2019 but doesn't say what replaced it. Does anyone know what happened to the community that used it?"

Bad example: "What are your thoughts on the themes explored in this article?"`,

    'reader-response': `Generate a RESPONSE to a reader contribution.

You have read the contribution. Now respond as a thinking editor would:
- If it adds something: acknowledge specifically what and invite more
- If it vents without grounding: use the redirection prompt to invite testimony
- If it challenges the article: engage the challenge genuinely
- If it shares personal experience: honour that and connect it to the archive
- If it raises a safeguarding concern: flag it, don't publish, redirect warmly

One paragraph. Specific. Never generic.`,

    'author-feedback': `Generate AUTHOR FEEDBACK for the creator on publication.

This is sent to the author when their piece publishes.
Not praise. Not criticism. Observation.

What does this piece do that the author might not have noticed?
What thread could they pull further in a future piece?
What does this piece reveal about their practice?

Two or three sentences. Warm but precise. Like a note from a reader who really read it.`,
  };

  return instructions[mode] || instructions['preseed'];
}

// ─── Core functions ───────────────────────────────────────────────────────────

/**
 * Generates the full preseed package when an article is published.
 * This runs server-side via the pre-seeding endpoint.
 *
 * The API call to Anthropic happens in the Spring Boot backend.
 * This function builds the prompt and parses the expected response shape.
 */
export function buildPreseedPrompt(article: JoystickArticle): {
  systemPrompt: string;
  userPrompt: string;
  expectedFormat: string;
} {
  const systemPrompt = buildJoystickSystemPrompt(article, 'preseed');

  const userPrompt = `Generate the preseed package for this Joystick article.

Return a JSON object with exactly these fields:
{
  "openingQuestion": "The specific question for readers — one or two sentences",
  "authorFeedback": "Two or three sentences for the author — observation, not praise",
  "editorialSummary": "One sentence: what this piece does well and one sentence: what it could develop",
  "archiveSearchTerms": ["term1", "term2", "term3"]
}

The archiveSearchTerms are 3-5 words or phrases that would surface related Joystick articles, Heritage records, or oral histories from the platform archive.

Return only the JSON object. No preamble. No explanation.`;

  const expectedFormat = `{
  "openingQuestion": "string",
  "authorFeedback": "string",
  "editorialSummary": "string",
  "archiveSearchTerms": ["string"]
}`;

  return { systemPrompt, userPrompt, expectedFormat };
}

/**
 * Builds the prompt for Maya's response to a reader contribution.
 */
export function buildReaderResponsePrompt(
  article: JoystickArticle,
  contribution: ReaderContribution
): {
  systemPrompt: string;
  userPrompt: string;
  safeguardingAssessment: SafeguardingAssessment;
} {
  const safeguardingAssessment = assessSafeguarding(
    contribution.content,
    {
      programmeContext: 'joystick',
      wardTag: contribution.wardTag as any,
      isYouthContent: false,
    }
  );

  // If human review required, don't call the LLM
  if (safeguardingAssessment.requiresHumanReview && !safeguardingAssessment.requiresRedirection) {
    return {
      systemPrompt: '',
      userPrompt: '',
      safeguardingAssessment,
    };
  }

  const systemPrompt = buildJoystickSystemPrompt(article, 'reader-response');

  // If redirection needed, include the redirection context
  const redirectionContext = safeguardingAssessment.requiresRedirection
    ? `\n\nNOTE: This contribution needs editorial redirection. Use this approach:\n${safeguardingAssessment.redirectionPrompt}`
    : '';

  const userPrompt = `Reader contribution to "${article.title}":

"${contribution.content}"

${redirectionContext}

Generate Maya's response. One paragraph. Specific to what this person actually said.
Apply the editorial questions where relevant but don't name them explicitly.
Sound like a person, not a system.`;

  return { systemPrompt, userPrompt, safeguardingAssessment };
}

/**
 * Builds the portfolio note for the article author.
 */
export function buildArticlePortfolioNote(
  article: JoystickArticle
): PortfolioNote {
  return generatePortfolioNote(
    article.title,
    'joystick',
    article.wordCount,
    article.tags
  );
}

/**
 * Formats an archive connection for display.
 */
export function formatArchiveConnection(connection: ArchiveConnection): string {
  return `${connection.title} — ${connection.relevanceNote}`;
}

// ─── Export ───────────────────────────────────────────────────────────────────

export const MayaArticleResponseROV = {
  buildJoystickSystemPrompt,
  buildPreseedPrompt,
  buildReaderResponsePrompt,
  buildArticlePortfolioNote,
  formatArchiveConnection,
};

export default MayaArticleResponseROV;