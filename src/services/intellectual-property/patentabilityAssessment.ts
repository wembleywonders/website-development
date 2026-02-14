export type AssessmentResult = 'patentable' | 'potentially-patentable' | 'not-patentable' | 'needs-more-info';
export interface PatentabilityAssessment { id: string; disclosureId: string; criteria: Record<string, { score: number; notes: string }>; result: AssessmentResult; }
class PatentabilityAssessmentService {
  private assessments: Map<string, PatentabilityAssessment> = new Map();
  create(disclosureId: string) { const a = { id: `pa-${Date.now()}`, disclosureId, criteria: { novelty: { score: 0, notes: '' }, 'inventive-step': { score: 0, notes: '' }, 'industrial-applicability': { score: 0, notes: '' } }, result: 'needs-more-info' as AssessmentResult }; this.assessments.set(a.id, a); return a; }
  updateCriteria(id: string, criterion: string, score: number, notes: string) { const a = this.assessments.get(id); if (a) { a.criteria[criterion] = { score, notes }; const avg = Object.values(a.criteria).reduce((s, c) => s + c.score, 0) / 3; a.result = avg >= 7 ? 'patentable' : avg >= 5 ? 'potentially-patentable' : 'not-patentable'; } return !!a; }
  get(id: string) { return this.assessments.get(id) || null; }
}
export const patentabilityAssessmentService = new PatentabilityAssessmentService();
export default patentabilityAssessmentService;
