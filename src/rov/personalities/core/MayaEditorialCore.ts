export type ProgrammeContext = 'joystick'|'raydyo'|'heritage'|'trubble-n-bass'|'kaywanas-court'|'pageturners'|'auntie-anansis-kitchen'|'stemgeneers'|'techreneurs'|'silk-stilettos'|'bright-sparks'|'roots'|'easy-street'|'gtechcasters';
export type EditorialRegister = 'terrace'|'behind-footlights'|'kitchen-table'|'under-arches'|'between-aisles'|'in-queue'|'broadcast'|'archive'|'youth'|'technical';
export interface EditorialContext { programmeContext: ProgrammeContext; wardTag?: string; contentType?: string; wordCount?: number; isYouthContent?: boolean; }
export interface SafeguardingAssessment { requiresRedirection: boolean; requiresHumanReview: boolean; redirectionPrompt?: string; reviewReason?: string; }
export interface PortfolioNote { oneLiner: string; practicePosition?: string; }
export const EDITORIAL_QUESTIONS = [
  { id: 'EQ1', question: "Does this contribute something to the archive that wasn't there before?", guidance: 'Original testimony, memory, analysis, or creation.' },
  { id: 'EQ2', question: 'Does this speak from experience or from assumption?', guidance: 'Grounded in lived reality or clearly framed as interpretation.' },
  { id: 'EQ3', question: 'Is this accountable to the community it describes?', guidance: 'Treats the people it names with dignity and accuracy.' },
  { id: 'EQ4', question: 'Could this harm someone - directly or by omission?', guidance: 'Physical, reputational, emotional, or structural harm.' },
  { id: 'EQ5', question: 'Does this add to understanding or does it perform it?', guidance: 'Genuine insight or the appearance of insight?' },
  { id: 'EQ6', question: 'Ten years from now, will this still matter to someone?', guidance: 'Archival thinking. Does this earn its place in the permanent record?' },
] as const;
export function assessSafeguarding(content: string, context: EditorialContext): SafeguardingAssessment {
  const hardViolations = [
    { pattern: /\b(kill|murder|attack|hurt)\s+(him|her|them|you)\b/i, reason: 'Possible threat' },
    { pattern: /\b(where\s+you\s+live|find\s+you)\b/i, reason: 'Possible location threat' },
  ];
  for (const v of hardViolations) {
    if (v.pattern.test(content)) return { requiresRedirection: false, requiresHumanReview: true, reviewReason: v.reason };
  }
  if (context.isYouthContent && /\b(sex|violence|drug|alcohol|weapon)\b/i.test(content)) {
    return { requiresRedirection: true, requiresHumanReview: true, redirectionPrompt: 'This content needs review.', reviewReason: 'Youth content' };
  }
  const venting = [/fuck\s+(brent|council|government)/i, /\b(hate|useless)\s+(council|government)\b/i];
  for (const p of venting) {
    if (p.test(content)) {
      const prompt = /council|government|housing/i.test(content)
        ? "That sounds like real frustration. What specifically did they do, when, and who was affected? The archive will still have the testimony in ten years."
        : "There's something real here. What specifically happened? Who was affected? The more concrete, the more powerful.";
      return { requiresRedirection: true, requiresHumanReview: false, redirectionPrompt: prompt };
    }
  }
  return { requiresRedirection: false, requiresHumanReview: false };
}
export function getRegisterForProgramme(p: ProgrammeContext): EditorialRegister {
  const m: Record<ProgrammeContext,EditorialRegister> = {
    'joystick':'between-aisles','raydyo':'broadcast','heritage':'archive',
    'trubble-n-bass':'under-arches','kaywanas-court':'behind-footlights',
    'pageturners':'kitchen-table','auntie-anansis-kitchen':'kitchen-table',
    'stemgeneers':'technical','techreneurs':'technical','silk-stilettos':'behind-footlights',
    'bright-sparks':'youth','roots':'kitchen-table','easy-street':'broadcast','gtechcasters':'broadcast',
  };
  return m[p];
}
export function generatePortfolioNote(title: string, p: ProgrammeContext, wordCount?: number, tags?: string[]): PortfolioNote {
  const labels: Record<ProgrammeContext,string> = {
    'joystick':'published writing','raydyo':'broadcast work','heritage':'heritage documentation',
    'trubble-n-bass':'music production','kaywanas-court':'dramatic writing','pageturners':'literary work',
    'auntie-anansis-kitchen':'culinary heritage','stemgeneers':'technical design',
    'techreneurs':'entrepreneurial practice','silk-stilettos':'fashion and design',
    'bright-sparks':'educational contribution','roots':'community knowledge',
    'easy-street':'audio drama','gtechcasters':'broadcast production',
  };
  const tagNote = tags && tags.length > 0 ? ' focused on ' + tags.slice(0,2).join(' and ') : '';
  return { oneLiner: title + ' - ' + labels[p] + tagNote + ' through Wembley Wonders.', practicePosition: undefined };
}
export function buildCoreSystemPrompt(context: EditorialContext): string {
  const register = getRegisterForProgramme(context.programmeContext);
  return 'You are Maya, the editorial intelligence of Wembley Wonders CIC'
    + ' - a community platform in Brent, London, built for the Forgotten 60%.\n\n'
    + 'You are not a gatekeeper. You are the editor every contributor deserved.\n'
    + 'Never tell someone their contribution was rejected - tell them how to improve it.\n\n'
    + 'THE SIX EDITORIAL QUESTIONS:\n'
    + '1. Does this contribute something to the archive that was not there before?\n'
    + '2. Does this speak from experience or from assumption?\n'
    + '3. Is this accountable to the community it describes?\n'
    + '4. Could this harm someone - directly or by omission?\n'
    + '5. Does this add to understanding or does it perform it?\n'
    + '6. Ten years from now, will this still matter to someone?\n\n'
    + 'Register: ' + register + '\n'
    + 'Programme: ' + context.programmeContext + '\n'
    + 'Ward: ' + (context.wardTag || 'Brent') + '\n\n'
    + "Never say 'Great question' or 'Certainly' or 'As an AI'."
    + ' Sound like someone who has read widely, lives locally, and cares deeply.';
}
export const MayaEditorialCore = { EDITORIAL_QUESTIONS, assessSafeguarding, getRegisterForProgramme, generatePortfolioNote, buildCoreSystemPrompt };
export default MayaEditorialCore;
