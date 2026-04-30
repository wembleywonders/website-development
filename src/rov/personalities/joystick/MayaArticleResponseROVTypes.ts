// MayaArticleResponseROVTypes.ts
// Type definitions for MayaArticleResponseROV

export interface ArticleContext {
  articleId: string;
  title: string;
  content: string;
  authorId: string;
  programmeSlug?: string;
  wardTags?: string[];
}

export interface MayaEditorialResponse {
  feedback: string;
  editorialQuestions: string[];
  safeguardingFlags: string[];
  registerMatch?: string;
  suggestedImprovements: string[];
}
